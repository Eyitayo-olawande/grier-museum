"""Build content/content.json from the client's Google Drive export.

    python3 -I content/build_content.py "/path/to/GRIER-HOUSE-MUSEUM/CONTENT"

The output maps Strapi content type identifiers to entries. It is both the
Strapi import file (cms/scripts/import.js) and the website's fallback content
when STRAPI_URL is not set. Media fields hold {"$file": "<path under CONTENT>"}
which the import script uploads; the website ignores them without Strapi.

Text is kept as written by the Grier History and Traditions Committee. Only the
profile chips, timeline and captions are editorial, and they use facts from the
supplied documents only.
"""

import hashlib
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from profiles_meta import META  # noqa: E402

SRC = sys.argv[1]
OUT = os.path.join(HERE, "content.json")

PHOTOS = "Photo Archives "
MUSEUM = "Museum & Library "
CREATING = "Museum & Library /Creating the museum"
VIDEOS = "Video Archives"
EXTRA = "Extracurricular Activities "


def docx_lines(rel):
    text = subprocess.run(["textutil", "-convert", "txt", "-stdout", os.path.join(SRC, rel)],
                          capture_output=True, text=True, check=True).stdout
    lines = [l.strip().replace("⁠", "") for l in text.splitlines()]
    # drop blanks, stray punctuation and the letterhead repeated at the top of each document
    return [l for l in lines if l and not re.fullmatch(r"[.\s]+", l) and l != "GRIER MUSEUM & LIBRARY"]


def slugify(s):
    s = s.lower().replace("&", "and")
    s = re.sub(r"[’']", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def media(rel, alt=None):
    return {"$file": rel, "alt": alt} if alt else {"$file": rel}


def era_for(year):
    if year is None:
        return None
    if year <= 1947:
        return "Colonial"
    if year <= 1959:
        return "Post-War"
    if year <= 1989:
        return "Independence"
    return "Modern"


def is_short(line):
    return (len(line) < 75 or line.startswith("\u2022")) and not re.fullmatch(r"\*{3,}", line)


def to_markdown(lines):
    """Paragraph lines to Markdown. A run of two or more short lines is a list
    when every line is a bullet, otherwise a quoted verse block (an epigraph
    with its attribution). ***** becomes a rule."""
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if re.fullmatch(r"\*{3,}", line):
            out.append("***")
            i += 1
            continue
        j = i
        while j < len(lines) and is_short(lines[j]):
            j += 1
        run = lines[i:j]
        bullets = [l.startswith("\u2022") for l in run]
        if run and all(bullets):
            out.append("\n".join("- " + l.lstrip("\u2022\t ").strip() for l in run))
            i = j
            continue
        if len(run) >= 2:
            # each epigraph ends at its attribution line
            block = []
            for l in run:
                attribution = l.startswith("\u2022")
                block.append("> " + ("\u2014 " if attribution else "") + l.lstrip("\u2022\t ").strip())
                if attribution:
                    out.append("\n".join(block))
                    block = []
            if block:
                out.append("\n".join(block))
            i = j
            continue
        out.append(line.lstrip("\u2022\t "))
        i += 1
    return "\n\n".join(out)


# ---------------------------------------------------------------- profiles

PORTRAITS = {
    "PROFILE  AYODEJI OLULEYE": ("Oluleye Ayodeji.jpg", ["Oluleye Ayodeji"]),
    "PROFILE ADELABU": ("Adegoke5.jpg", ["Adegoke"]),
    "PROFILE ADEYEMI-WILSON": ("Adeyemi Wilson.jpg", ["Adeyemi Wilson"]),
    "PROFILE AJOMALE": (None, ["Ajomale"]),
    "PROFILE AKIN-DEKO": ("Akin Deko3.jpg", ["Akin Deko"]),
    "PROFILE AKINGBOLA AKINOLA": (None, []),
    "PROFILE ANDU": ("Andu pic.jpg", ["Andu"]),
    "PROFILE ARUBAYI": (None, []),
    "PROFILE BADEMOSI": ("Bademosi2.jpg", ["Bademosi"]),
    "PROFILE BECKLEY": (None, ["Beckley"]),
    "PROFILE BIOBAKU": ("Biobaku1.jpg", ["Biobaku"]),
    "PROFILE EKPERIGIN": ("Ekperigin1.jpg", ["Ekperigin"]),
    "PROFILE ENOBAKHARE CORRECTED": ("Enobhakare2.jpg", ["Enobhakare"]),
    "PROFILE FEYIDE": ("Feyide Secretary General OPEC 1975.jpg", ["Feyide", "Efuwape and Feyide"]),
    "PROFILE GBENGA JEGEDE CORRECTED": ("Gbenga Jegede.jpg", []),
    "PROFILE IFATUROTI": ("Ifaturoti1.jpg", ["Ifaturoti"]),
    "PROFILE OGUNMOYELA I": (None, []),
    "PROFILE OJUTALAYO": ("Ojutalayo.jpg", ["Ojutalayo"]),
    "PROFILE OLUNLOYO": ("Olunloyo.jpg", []),
    "PROFILE ONAJIN III": (None, []),
    "PROFILE OTEGBEYE": ("Otegbeye Pic4.jpg", ["Otegbeye", "Grier House Prefects 1945", "Grier House Relay Team 1944",
                                               "Grier House Athletics Team 1944", "GCI Cricket Team 1946", "NYC Protest"]),
    "PROFILE PRINCE AKENZUA": ("Prince Akenzua2.jpg", ["Prince Akenzua", "Oba of Benin Akenzua"]),
    "PROFILE ROSIJI": ("Rosiji2.jpg", ["Rosiji"]),
    "PROFILE SAGAY": (None, []),
    "PROFILE T M ALUKO": ("Aluko TM.jpg", []),
    "PROFILE WOLE SOYINKA": ("Soyinka Wole.jpg", ["Soyinka Wole", "Wole Soyinka"]),
    "ROTIMI JAIYESIMI PROFILE": ("Jaiyesimi Professor of OBGYN.jpg", ["Jaiyesimi", "Jayesimi"]),
}


def photo_files():
    files = sorted(f for f in os.listdir(os.path.join(SRC, PHOTOS)) if re.search(r"\.(jpe?g|png)$", f, re.I))
    seen, unique = {}, []
    for f in files:
        digest = hashlib.md5(open(os.path.join(SRC, PHOTOS, f), "rb").read()).hexdigest()
        if digest in seen:
            continue
        seen[digest] = f
        unique.append(f)
    return unique


def profile_docx(key):
    for f in os.listdir(os.path.join(SRC, "PROFILES")):
        if f.endswith(".docx") and f[:-5].rstrip() == key:
            return f"PROFILES/{f}"
    raise FileNotFoundError(key)


def parse_profile(key, meta, photos):
    lines = docx_lines(profile_docx(key))
    # header: "GRIERSON PROFILE", the name, then the school number and set
    end = next(i for i, l in enumerate(lines[:4]) if "School #" in l or re.search(r"\bset\b", l, re.I))
    header, body = lines[:end + 1], lines[end + 1:]
    head = " ".join(header)
    number = re.search(r"School\s*#\s*(\d+)", head)
    year = re.search(r"(\d{4})\s*set", head) or re.search(r"HSC\s*(\d{4})", head)
    set_year = int(year.group(1)) if year else None

    if "cutBioAt" in meta:
        body = body[:body.index(meta["cutBioAt"])]
    if "dropList" in meta:
        start = body.index(meta["dropList"])
        end = next(j for j in range(start + 1, len(body)) if len(body[j]) > 150)
        body = body[:start] + body[end:]

    name_line = next(l for l in header if not re.match(r"GRIERSONS? PROFILE", l, re.I))
    full = meta.get("fullName") or re.split(r",|School", name_line)[0].strip().title()

    portrait, prefixes = PORTRAITS[key]
    gallery = [f for f in photos if f != portrait and any(f.startswith(p) for p in prefixes)]

    entry = {
        "slug": slugify(meta["shortName"]),
        "fullName": full,
        "shortName": meta["shortName"],
        "surname": meta["surname"],
        "era": era_for(set_year),
        "schoolNumber": number.group(1) if number else None,
        "set": set_year,
        "fields": [{"label": f} for f in meta["fields"]],
        "heroTags": [{"label": f} for f in meta.get("heroTags", meta["fields"])],
        "distinctions": [{"label": d} for d in meta.get("distinctions", [])],
        "achievements": [{"label": a} for a in meta["achievements"]],
        "bio": "\n\n".join(body),
        "pullQuote": meta.get("pullQuote"),
        "photo": media(f"{PHOTOS}/{portrait}", meta["shortName"]) if portrait else None,
        "gallery": [media(f"{PHOTOS}/{f}", caption(f)) for f in gallery],
    }
    return entry


# ---------------------------------------------------------------- history

HISTORY = [
    ("History/GRIER MUSEUM - GRIER HOUSE A BRIEF HISTORY.docx", "Grier House: A Brief History", "Founding", "Since 1930"),
    ("History/GRIER MUSEUM - SELWYN MACGREGOR GRIER.docx", "Selwyn Macgregor Grier", "Patron", "1878–1946"),
    ("History/GRIER MUSEUM - V B V POWELL.docx", "Villiers Barcham Vaughan (V. B. V.) Powell", "First Housemaster", "From 1930"),
    ("History/GRIER MUSEUM - WHO ARE GRIERSONS.docx", "Who are Griersons?", "Griersons", "1930 to the present"),
]


def history_articles():
    out = []
    for i, (rel, title, category, era) in enumerate(HISTORY):
        lines = docx_lines(rel)[1:]  # first line is the document title
        out.append({
            "slug": slugify(title.replace("(V. B. V.) ", "")),
            "title": title,
            "section": "History",
            "category": category,
            "era": era,
            "excerpt": lines[0][:220].rsplit(" ", 1)[0] + "…",
            "body": to_markdown(lines),
            "order": i,
        })
    return out


# Every event below is stated in the supplied History, Traditions or profile documents.
TIMELINE = [
    (1929, "Government College Ibadan is Founded", "Founding",
     "Government College Ibadan is founded, beginning as a teacher training school established by Selwyn Macgregor Grier, Director of Education for the Southern Provinces. V. B. V. Powell is posted there to teach Mathematics and History."),
    (1930, "Grier House is Founded", "Founding",
     "In January 1930 Government College Ibadan becomes a secondary school and Grier House is founded as its second House, after Swanston House, with V. B. V. Powell as its first Housemaster. He names the House after Selwyn Macgregor Grier and gives it its Crest, Colour, Motto, House Prayer and House Supper."),
    (1933, "The Grier Cup is Started", "Sport",
     "V. B. V. Powell starts the Grier Cup athletic competition for secondary schools. Around the same year, the tradition of moonlight stories begins in Grier House."),
    (1935, "Red Letter Day", "Founding",
     "News reaches Grier House that Selwyn Macgregor Grier has been made Governor of the Windward Islands. The day is marked on the calendar with a red circle."),
    (1940, "Wartime Exile", "National",
     "During the Second World War, Griersons leave their dormitory and live in exile in Lagos and at St Theresa's Convent, Oke-Ado, until 1945."),
    (1945, "The Cairn", "Founding",
     "A rock is placed in front of the old Grier House to mark the end of the Second World War and the return of Griersons to their dormitory."),
    (1952, "Grier House Moves to a New Site", "Founding",
     "Grier House moves from its first site close to the main gate to a new site near Field House."),
    (1958, "First Nigerian Principal", "Notable Grierson",
     "Gilbert Nixon Imafidon Enobakhare, a Grierson of the 1933 set and former Housemaster, becomes the first Nigerian Principal of Government College Ibadan."),
    (1982, "Boarding is Abolished", "National",
     "All students are moved out of Grier House following an Oyo State Government policy abolishing boarding houses. The building falls into disrepair."),
    (1986, "Wole Soyinka Wins the Nobel Prize in Literature", "Notable Grierson",
     "Wole Soyinka, for whom Grier House was the last House he called home, becomes the first Black African awarded the Nobel Prize in Literature."),
    (2024, "A New Grier House", "Founding",
     "A new Grier House building is built through the donation of Wale Babalakin, a Grierson of the 1971 set. The first group of boys moves in during 2025."),
    (2026, "The Grier Museum and Library Opens", "Museum",
     "The Grier Museum and Library is established in October 2026 as a legacy project of the Grier History and Traditions Committee."),
]


# ---------------------------------------------------------------- traditions

TRADITION_INFO = {
    "The House Test": ("Academic", "\U0001F4DD"),
    "Banjo’s Prize": ("Academic", "\U0001F3C5"),
    "The House Supper": ("Social", "\U0001F37D️"),
    "Cup of Unity": ("Cultural", "\U0001F3C6"),
    "Honors Board": ("Leadership", "\U0001FAB5"),
    "Saturday Night Socials": ("Social", "\U0001F3B6"),
    "Pillow Fights": ("Social", "\U0001F6CF️"),
    "Treasure Hunt": ("Social", "\U0001F5FA️"),
    "Moonlight stories": ("Cultural", "\U0001F315"),
    "Saturday Morning Inspection": ("Leadership", "\U0001F9F9"),
    "Red Letter Day": ("Cultural", "\U0001F4C5"),
    "The Cairn": ("Cultural", "\U0001FAA8"),
    "Powellites": ("Leadership", "\U0001F396️"),
    "House Punishments": ("Leadership", "⚖️"),
    "Other traditions": ("Social", "\U0001F91D"),
}
TRADITION_ERAS = {"Moonlight stories": "Since about 1933", "Red Letter Day": "1935", "The Cairn": "1945"}


def traditions():
    out = []
    verses = [
        ("Traditions/GRIER MUSEUM - HOUSE SONG.docx", "The House Song", "\U0001F3B5", True),
        ("Traditions/GRIER MUSEUM - HOUSE PLEDGE.docx", "The House Pledge", "✋", False),
        ("Traditions/GRIER MUSEUM - HOUSE PRAYER.docx", "The House Prayer", "\U0001F64F", False),
    ]
    for rel, title, icon, featured in verses:
        lines = docx_lines(rel)[1:]
        out.append({"title": title, "slug": slugify(title), "category": "Cultural", "era": None,
                    "description": lines[0] + " " + lines[1], "body": "\n".join(lines),
                    "icon": icon, "featured": featured, "order": len(out)})
    for part in (1, 2, 3):
        lines = docx_lines(f"Traditions/GRIER MUSEUM - TRADITIONS {part}.docx")[1:]
        current = None
        for line in lines:
            if line in TRADITION_INFO:
                category, icon = TRADITION_INFO[line]
                current = {"title": line[0].upper() + line[1:], "slug": slugify(line), "category": category,
                           "era": TRADITION_ERAS.get(line), "description": "", "lines": [], "icon": icon,
                           "featured": False, "order": len(out)}
                out.append(current)
            else:
                current["lines"].append(line)
    for t in out:
        if "lines" in t:
            lines = t.pop("lines")
            if lines[0].startswith("\u2022"):
                t["description"] = "Further customs passed down through the generations of Griersons."
                t["body"] = to_markdown(lines)
            else:
                t["description"] = lines[0]
                t["body"] = to_markdown(lines[1:]) if len(lines) > 1 else None
    return out


# ---------------------------------------------------------------- Dare to Learn

EXCERPTS = {
    "A VISITOR TO GRIER HOUSE IN 1983": "A Visitor to Grier House in 1983",
    "BISIRIYU AND THE MUSTARD SEED": "Bisiriyu and the Mustard Seed",
    "GRIERSONS OF THE MID 1970s": "Griersons of the Mid 1970s",
    "HOW GRIER HOUSE WAS FOUNDED": "How Grier House was Founded",
    "OJUTALAYO THE LEGEND": "The Legend of Victor Ojutalayo",
    "SPORTS IN GRIER HOUSE part 2": "Sports in Grier House, Part 2",
    "SPORTS IN GRIER HOUSE part 3": "Sports in Grier House, Part 3",
    "THE BEGINNING OF SPORTS IN GRIER HOUSE": "Foundational Sports Heroes of Grier House",
    "THE END OF AN ERA": "The End of an Era",
    "THE HEAD OF HOUSE AS A SPORTS PARAGON": "The Head of Grier House as a Sports Paragon: the Onajin Example",
    "THE POST 2ND WORLD WAR GENERATION": "Griersons of the Post-Second World War Generation",
    "THE STORY OF FAMUYIWA AND MIGHTY": "The Story of Famuyiwa and ‘Mighty’",
}


def dare_to_learn():
    out = []
    for name, title in EXCERPTS.items():
        lines = docx_lines(f"News & Publications/{name}.docx")
        lines = lines[1:]  # document title
        if lines[0].startswith("–"):
            lines = lines[1:]  # subtitle folded into the title
        lines = [l for l in lines if not l.startswith("Excerpt from forthcoming book")]
        prose = next(l for l in lines if len(l) > 200)
        out.append({"title": title, "slug": slugify(title), "excerpt": prose[:240].rsplit(" ", 1)[0] + "…",
                    "body": to_markdown(lines)})
    return sorted(out, key=lambda e: e["title"])


# ---------------------------------------------------------------- single pages

def home_page():
    lines = docx_lines("Home/WELCOME TEXT.docx")
    start = next(i for i, l in enumerate(lines) if l.startswith("Grier House, founded"))
    lines = [l for l in lines[start:] if not l.startswith(("Click here", "Historical Timeline")) and l != "*****"]
    blocks, i = [], 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("\u201c") and i + 1 < len(lines) and lines[i + 1].startswith("-"):
            # a quotation followed by "- attribution"
            blocks.append(f"> {line}\n> \u2014 {lines[i + 1].lstrip('- ').rstrip('.')}")
            i += 2
            continue
        blocks.append(line)
        i += 1
    return {
        "welcomeTitle": "Welcome to the Grier House Museum and Library",
        # title given by the project owner
        "introVideo": media(f"{EXTRA}/Old Griersons and Young boys singing house anthem at 2026 Reunion.mp4",
                            "Grier House song by Old Griersons and current students at the 2026 Reunion, October 17, 2026"),
        "welcomeText": "\n\n".join(blocks),
        "featuredPhotos": [media(f"{PHOTOS}/{f}", caption(f)) for f in
                           ["Grier House 1940.jpg", "Grier House Football Team 1931.jpg", "New Grier House Building.jpg"]],
    }


def joined_paragraphs(lines):
    """Rejoin paragraphs that the documents break with soft line breaks."""
    out = []
    for line in lines:
        if out and (not re.search(r"[.?!\u201d\":]$", out[-1]) or line.startswith(",")):
            out[-1] = (out[-1] + " " + line).replace(" ,", ", ").replace("  ", " ")
        else:
            out.append(line)
    return out


def museum_page(gallery):
    why = joined_paragraphs(docx_lines(f"{MUSEUM}/WHY A LIBRARY FOR STUDENTS IN GRIER HOUSE.docx")[1:])
    signature = why.pop() if why[-1].startswith("Oladele") else None
    volumes = []
    for line in docx_lines(f"{MUSEUM}/EXAMPLES OF RARE HARDCOVER VOLUMES FOR GRIER HOUSE STUDENTS AVAILABLE IN THE GRIER LIBRARY.docx")[1:]:
        if line.startswith("-"):
            volumes.append("- " + line.lstrip("- ").strip())
        else:
            volumes.append(f"\n**{line.title()}**\n")
    return {
        "intro": "The Grier Museum and Library, established in October 2026, is a legacy project that encapsulates the narratives and aspirations of generations of Griersons.",
        "history": "## Why a Library for Students in Grier House?\n\n" + "\n\n".join(why)
                   + (f"\n\n\u2014 {signature}" if signature else ""),
        "goals": "## Examples of Rare Hardcover Volumes in the Grier Library\n" + "\n".join(volumes),
        "galleryImages": [media(f"{MUSEUM}/{f}", re.sub(r"\d*\.(jpe?g|png)$", "", f, flags=re.I).strip()) for f in gallery],
        "creatingTheMuseumTitle": "Creating the Museum, October 2026",
        "creatingTheMuseumMedia": [media(f"{CREATING}/{f}") for f in sorted(os.listdir(os.path.join(SRC, CREATING)))
                                   if re.search(r"\.(jpe?g|png|mp4)$", f, re.I)],
    }


def extracurricular():
    lines = docx_lines(f"{MUSEUM}/PROMOTING EXTRACURRICULAR ACTIVITIES FOR STUDENTS.docx")[1:]
    intro = lines[0]
    activities = [l.lstrip("- ").strip() for l in lines if l.startswith("-")]
    roles = [re.sub(r"^[abc]\)\s*", "", l) for l in lines if re.match(r"[abc]\)", l)]
    closing = lines[-1]
    band = next(a for a in activities if a.startswith("Grier House Marching Band"))
    leadership = activities[-1] + "\n\n" + "\n".join(f"- {r[0].upper() + r[1:]}" for r in roles) + "\n\n" + closing
    others = [a for a in activities[:-1] if a is not band] + [leadership]
    socials = next(l for l in docx_lines("Traditions/GRIER MUSEUM - TRADITIONS 2.docx")
                   if l.startswith("An occasion for students"))
    return [
        {"title": "About Extracurricular Activities", "slug": "about", "order": 0,
         "summary": "The wider mission of the Grier History and Traditions Committee beyond the Museum and Library.",
         "body": intro, "videos": []},
        {"title": "Marching Band", "slug": "marching-band", "order": 1,
         "summary": "Parade drums, trumpets and flutes to galvanize Grier House teams at interhouse sports.",
         "body": band, "photos": [media(f"{PHOTOS}/Grier House Marching Band.jpg", "Grier House Marching Band")]},
        {"title": "Saturday Night Socials", "slug": "saturday-night-socials", "order": 2,
         "summary": "A fun-filled evening in the prep room with debates, recitations, drama and music.",
         "body": socials},
        {"title": "Others", "slug": "others", "order": 3,
         "summary": "The Mustard Seed editorial team, the Grier Honors Board and extracurricular student leadership.",
         "body": "\n\n".join(others)},
    ]


# ---------------------------------------------------------------- archives

PEOPLE = {
    "Adegoke": "Adegoke Adelabu", "Ojutalayo Victor": "Victor Ojutalayo", "Beckley Morakinyo": "Joseph Beckley",
    "Jayesimi Rotimi": "Rotimi Jaiyesimi", "Oluleye Ayodeji": "Ayodeji Oluleye", "Babalakin Wale": "Wale Babalakin",
    "Aluko TM": "T. M. Aluko", "Famuyiwa Folorunso": "Folorunso Famuyiwa", "Enobhakare": "Gilbert Enobakhare",
    "Soyinka Wole": "Wole Soyinka", "Adeyemi Wilson": "Oluyomi Adeyemi-Wilson", "Andu pic": "Jibril Andu",
    "Andu Pic": "Jibril Andu", "Ekperigin": "Harding Ekperigin", "Feyide": "Otokiti Feyide",
    "Ifaturoti": "Michael Ifaturoti", "Otegbeye": "Tunji Otegbeye", "Rosiji": "Ayo Rosiji",
    "Bullock": "Derek John Bullock", "Jaiyesimi": "Rotimi Jaiyesimi", "Olunloyo": "Omololu Olunloyo",
    "Bademosi": "Jide Bademosi", "Biobaku": "Saburi Biobaku", "Akin Deko": "Akin Deko",
    "Prince Akenzua": "Prince Solomon Akenzua", "Oba of Benin Akenzua": "Oba Erediauwa of Benin",
    "Efuwape and Feyide": "Efuwape and Otokiti Feyide",
}
REPLACE = [("GCI", "Government College Ibadan"), ("NYC", "Nigerian Youth Congress"),
           ("OBGYN", "Obstetrics and Gynaecology"), ("Unilag VC", "Vice-Chancellor, University of Lagos"),
           ("OPEC", "OPEC"), ("Form6", "Form 6"), (" B&W", ""), (" color", " (colourised)"), (" Pic", ""), (" pic", ""), (" 1944 Otegbeye", " 1944, with Tunji Otegbeye"),
           (" 1945 Otegbeye", " 1945, with Tunji Otegbeye"), (" 1946 Otegbeye", " 1946, with Tunji Otegbeye")]
CAPTIONS = {
    "1930 Boys.png": "Government College Ibadan students, 1930",
    "1930 Boys2.png": "Government College Ibadan students, 1930 (archive record)",
    "Current Griersons.jpg": "Current Griersons at the House Supper",
    "Cadet Boys.jpg": "Cadets at the new Grier House",
    "Wole Soyinka inspecting Cadet Boys.jpg": "Wole Soyinka inspecting Grier House cadets",
    "New Grier House Building.jpg": "The new Grier House building",
    "Odiase Gentlemen 1944.jpg": "Odiase Gentlemen, 1944",
    "A Grierson Pose.jpg": "A Grierson pose",
}


def caption(filename):
    if filename in CAPTIONS:
        return CAPTIONS[filename]
    name = re.sub(r"\.(jpe?g|png)$", "", filename, flags=re.I)
    name = re.sub(r"\(\d+\)$", "", name).strip()
    name = re.sub(r"(?<=[A-Za-z])\d+$", "", name).strip()
    for prefix, person in PEOPLE.items():
        if name.startswith(prefix):
            name = person + name[len(prefix):]
            break
    for old, new in REPLACE:
        name = name.replace(old, new)
    name = re.sub(r"\s+(\d{4})_?$", r", \1", name)
    return name.strip(" _")


def archive_items(photos):
    items, titles = [], {}
    for f in photos:
        if re.match(r"[0-9a-f]{8}-", f):
            continue  # unnamed copies of photographs already in the collection
        title = caption(f)
        titles[title] = titles.get(title, 0) + 1
        if titles[title] > 1:
            title = f"{title} ({titles[title]})"
        year = re.search(r"(19\d{2}|20\d{2})", f)
        y = int(year.group(1)) if year else None
        items.append({"title": title, "type": "Photo", "era": era_for(y), "year": str(y) if y else None,
                      "description": None, "credit": "Grier House Museum and Library", "collection": "Photo Archives",
                      "media": media(f"{PHOTOS}/{f}", title)})
    videos = sorted(f for f in os.listdir(os.path.join(SRC, VIDEOS)) if f.endswith(".mp4"))
    for i, f in enumerate(videos, 1):
        if True:
            items.append({"title": f"Grier House Video, September 2026 ({i})", "type": "Video", "era": "Modern",
                          "year": "2026", "credit": "Grier House Museum and Library", "collection": "Video Archives",
                          "media": media(f"{VIDEOS}/{f}", f"Grier House video {i}")})
    return items


def main():
    photos = photo_files()
    museum_gallery = sorted(f for f in os.listdir(os.path.join(SRC, MUSEUM)) if re.search(r"\.(jpe?g|png)$", f, re.I))
    data = {
        "api::profile.profile": [parse_profile(k, m, photos) for k, m in META.items()],
        "api::article.article": history_articles(),
        "api::timeline-event.timeline-event": [{"year": y, "title": t, "category": c, "body": b} for y, t, c, b in TIMELINE],
        "api::tradition.tradition": traditions(),
        "api::dare-to-learn-excerpt.dare-to-learn-excerpt": dare_to_learn(),
        "api::extracurricular-activity.extracurricular-activity": extracurricular(),
        "api::archive-item.archive-item": archive_items(photos),
        "api::home-page.home-page": home_page(),
        "api::museum-library-page.museum-library-page": museum_page(museum_gallery),
        "api::dare-to-learn-book.dare-to-learn-book": {
            "title": "Dare to Learn: the Grier House Story",
            "description": "A forthcoming book on the history of Grier House by O. Olusanya and A. Tewe, copyright 2026. The excerpts below are arranged in alphabetical order by title.",
            "purchaseLinks": [],
        },
    }
    with open(OUT, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    for uid, value in data.items():
        print(f"{uid}: {len(value) if isinstance(value, list) else 1}")


if __name__ == "__main__":
    main()
