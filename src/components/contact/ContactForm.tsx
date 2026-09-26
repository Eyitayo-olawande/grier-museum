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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    set: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3 className={styles.successTitle}>Message received</h3>
        <p className={styles.successBody}>
          Thank you for getting in touch. A member of the Grier History and Traditions Committee will respond to your enquiry within five working days.
        </p>
        <button
          className={styles.successReset}
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', type: '', set: '', message: '' });
          }}
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
            className={styles.input}
            value={form.name} onChange={handleChange}
            required placeholder="Your full name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email address <span className={styles.req}>*</span>
          </label>
          <input
            id="email" name="email" type="email"
            className={styles.input}
            value={form.email} onChange={handleChange}
            required placeholder="your@email.com"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            Nature of enquiry <span className={styles.req}>*</span>
          </label>
          <select
            id="type" name="type"
            className={styles.select}
            value={form.type} onChange={handleChange}
            required
          >
            <option value="">Select one…</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
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
          className={styles.textarea}
          value={form.message} onChange={handleChange}
          required rows={6}
          placeholder="Please describe your enquiry in as much detail as you can…"
        />
      </div>

      <button type="submit" className={styles.submit}>
        Send message
      </button>
    </form>
  );
}
