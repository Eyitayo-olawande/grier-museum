'use client';

import { useState, FormEvent } from 'react';
import styles from './StorySubmitForm.module.css';

const FORM_URL = process.env.NEXT_PUBLIC_STORY_FORM_URL ?? '';

type FormState = { name: string; set: string; title: string; story: string };
type Errors = Partial<Record<keyof FormState, string>>;

const blank: FormState = { name: '', set: '', title: '', story: '' };

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your full name.';
  if (!f.set.trim()) e.set = 'Please enter your set year.';
  else if (!/^\d{4}$/.test(f.set.trim())) e.set = 'Please enter a four-digit year (e.g. 1985).';
  if (!f.title.trim()) e.title = 'Please give your story a title.';
  if (!f.story.trim()) e.story = 'Please enter your story.';
  else if (f.story.trim().length < 50) e.story = 'Please write at least a few sentences.';
  return e;
}

export default function StorySubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormState>(blank);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Story submission: ${form.title}` }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError('Your story could not be sent. Please try again or contact us directly.');
      }
    } catch {
      setServerError('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3 className={styles.successTitle}>Story received</h3>
        <p className={styles.successBody}>
          Thank you for sharing your story with us. Mr Kenny Oladipo will review your submission and be in touch.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setSubmitted(false); setForm(blank); }}
        >
          Submit another story
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="s-name">
            Full name <span className={styles.req}>*</span>
          </label>
          <input id="s-name" name="name" type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={form.name} onChange={handleChange}
            aria-describedby={errors.name ? 'serr-name' : undefined}
            placeholder="Your full name" />
          {errors.name && <span id="serr-name" className={styles.fieldError} role="alert">{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="s-set">
            Set year <span className={styles.req}>*</span>
          </label>
          <input id="s-set" name="set" type="text"
            className={`${styles.input} ${errors.set ? styles.inputError : ''}`}
            value={form.set} onChange={handleChange}
            aria-describedby={errors.set ? 'serr-set' : undefined}
            placeholder="e.g. 1985" />
          {errors.set && <span id="serr-set" className={styles.fieldError} role="alert">{errors.set}</span>}
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="s-title">
          Story title <span className={styles.req}>*</span>
        </label>
        <input id="s-title" name="title" type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          value={form.title} onChange={handleChange}
          aria-describedby={errors.title ? 'serr-title' : undefined}
          placeholder="A title for your story" />
        {errors.title && <span id="serr-title" className={styles.fieldError} role="alert">{errors.title}</span>}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="s-story">
          Your story <span className={styles.req}>*</span>
        </label>
        <textarea id="s-story" name="story"
          className={`${styles.textarea} ${errors.story ? styles.inputError : ''}`}
          value={form.story} onChange={handleChange} rows={10}
          aria-describedby={errors.story ? 'serr-story' : undefined}
          placeholder="Share your memory of Grier House: a moment, a person, a lesson that stayed with you…" />
        {errors.story && <span id="serr-story" className={styles.fieldError} role="alert">{errors.story}</span>}
      </div>
      <p className={styles.note}>
        By submitting, you give the Grier House Museum permission to publish your story on this website and in print publications. You will be credited by name and set year. Your contact details will not be published.
      </p>

      {serverError && <p className={styles.serverError} role="alert">{serverError}</p>}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? 'Sending…' : 'Submit my story'}
      </button>
    </form>
  );
}
