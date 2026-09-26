'use client';

import { useState, FormEvent } from 'react';
import styles from './ContactForm.module.css';

const ENQUIRY_TYPES = [
  'General enquiry',
  'Research access / archive visit',
  'Donate or loan an item',
  'Contribute content (article, photo, video)',
  'Old Griersons reunion information',
  'Media enquiry',
  'Other',
];

const FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? '';

type FormState = { name: string; email: string; type: string; set: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const blank: FormState = { name: '', email: '', type: '', set: '', message: '' };

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your full name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address.';
  if (!f.type) e.type = 'Please select the nature of your enquiry.';
  if (!f.message.trim()) e.message = 'Please enter your message.';
  return e;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormState>(blank);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError('Your message could not be sent. Please try again or email us directly.');
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
        <h3 className={styles.successTitle}>Message received</h3>
        <p className={styles.successBody}>
          Thank you for getting in touch. A member of the Grier History and Traditions Committee will be in touch with you.
        </p>
        <button
          className={styles.successReset}
          onClick={() => { setSubmitted(false); setForm(blank); }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Full name <span className={styles.req}>*</span>
          </label>
          <input
            id="name" name="name" type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={form.name} onChange={handleChange}
            aria-describedby={errors.name ? 'err-name' : undefined}
            placeholder="Your full name"
          />
          {errors.name && <span id="err-name" className={styles.fieldError} role="alert">{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email address <span className={styles.req}>*</span>
          </label>
          <input
            id="email" name="email" type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            value={form.email} onChange={handleChange}
            aria-describedby={errors.email ? 'err-email' : undefined}
            placeholder="your@email.com"
          />
          {errors.email && <span id="err-email" className={styles.fieldError} role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            Nature of enquiry <span className={styles.req}>*</span>
          </label>
          <select
            id="type" name="type"
            className={`${styles.select} ${errors.type ? styles.inputError : ''}`}
            value={form.type} onChange={handleChange}
            aria-describedby={errors.type ? 'err-type' : undefined}
          >
            <option value="">Select one…</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <span id="err-type" className={styles.fieldError} role="alert">{errors.type}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="set">
            Set year (if Old Grierson)
          </label>
          <input
            id="set" name="set" type="text"
            className={styles.input}
            value={form.set} onChange={handleChange}
            placeholder="e.g. 1972"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message <span className={styles.req}>*</span>
        </label>
        <textarea
          id="message" name="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          value={form.message} onChange={handleChange}
          rows={6}
          aria-describedby={errors.message ? 'err-message' : undefined}
          placeholder="Please describe your enquiry in as much detail as you can…"
        />
        {errors.message && <span id="err-message" className={styles.fieldError} role="alert">{errors.message}</span>}
      </div>

      <p className={styles.privacy}>
        Your name and email will be used only to respond to your enquiry and will not be shared with third parties.
      </p>

      {serverError && <p className={styles.serverError} role="alert">{serverError}</p>}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
