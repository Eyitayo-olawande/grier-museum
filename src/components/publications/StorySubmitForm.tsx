'use client';

import { useState, FormEvent } from 'react';
import styles from './StorySubmitForm.module.css';

export default function StorySubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', set: '', title: '', story: '' });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <h3 className={styles.successTitle}>Story received</h3>
        <p className={styles.successBody}>
          Thank you for sharing your story with us. The editorial team will review your submission and be in touch within two weeks.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => { setSubmitted(false); setForm({ name: '', set: '', title: '', story: '' }); }}
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
          <input id="s-name" name="name" type="text" className={styles.input}
            value={form.name} onChange={handleChange} required placeholder="Your full name" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="s-set">
            Set year <span className={styles.req}>*</span>
          </label>
          <input id="s-set" name="set" type="text" className={styles.input}
            value={form.set} onChange={handleChange} required placeholder="e.g. 1985" />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="s-title">
          Story title <span className={styles.req}>*</span>
        </label>
        <input id="s-title" name="title" type="text" className={styles.input}
          value={form.title} onChange={handleChange} required placeholder="A title for your story" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="s-story">
          Your story <span className={styles.req}>*</span>
        </label>
        <textarea id="s-story" name="story" className={styles.textarea}
          value={form.story} onChange={handleChange} required rows={10}
          placeholder="Share your memory of Grier House — a moment, a person, a lesson that stayed with you…" />
      </div>
      <p className={styles.note}>
        By submitting, you give the Grier House Museum permission to publish your story on this website and in print publications. You will be credited by name and set year.
      </p>
      <button type="submit" className={styles.submit}>Submit my story</button>
    </form>
  );
}
