import React, { useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactMe({ socialLinks }) {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleFormSubmit = (event) => {
    closeForm();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[color:var(--background)] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Mail className="mx-auto text-[color:var(--primary)] mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-[color:var(--text)]">{t('contactMe.title')}</h2>
          <p className="text-[color:var(--text)] max-w-xl mx-auto">
            {t('contactMe.description')}
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-[color:var(--card-bg)]/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-[color:var(--card-border)]">
          <p className="text-lg text-center text-[color:var(--text)]">
            {t('contactMe.emailPrompt').replace('christoffelsihombing@gmail.com', '')}
            <a href="mailto:christoffelsihombing@gmail.com" className="underline">
              christoffelsihombing@gmail.com
            </a>
          </p>

          <div className="text-center mt-6">
            <button
              onClick={openForm}
              className="bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
            >
              <Send size={18} className="mr-2" />
              {t('contactMe.openFormButton')}
            </button>
          </div>

          {socialLinks && socialLinks.length > 0 && (
            <>
              <p className="text-lg text-center text-[color:var(--text)] mt-8">
                {t('contactMe.socialPrompt')}
              </p>
              <div className="flex justify-center space-x-6 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-[color:var(--secondary)] hover:text-[color:var(--primary)] transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[color:var(--card-bg)] p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md relative text-[color:var(--text)] border border-[color:var(--card-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-[color:var(--text-muted)] hover:text-[color:var(--secondary)] transition-colors"
                aria-label={t('contactMe.form.closeAriaLabel')}
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold mb-6 text-center text-[color:var(--secondary)]">
                {t('contactMe.form.title')}
              </h3>
              <form action="https://formcarry.com/s/9kPHCBPmbKF" method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text)] mb-1" htmlFor="name">
                      {t('contactMe.form.name')}
                    </label>
                    <input
                      className="w-full p-3 bg-[color:var(--background-1)] border border-[color:var(--card-border)] rounded-lg text-[color:var(--text)] focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] placeholder-[color:var(--text-muted)]"
                      type="text"
                      name="name"
                      id="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text)] mb-1" htmlFor="phone">
                      {t('contactMe.form.phone')}
                    </label>
                    <input
                      className="w-full p-3 bg-[color:var(--background-1)] border border-[color:var(--card-border)] rounded-lg text-[color:var(--text)] focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] placeholder-[color:var(--text-muted)]"
                      type="tel"
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[color:var(--text)] mb-1" htmlFor="email">
                    {t('contactMe.form.email')}
                  </label>
                  <input
                    className="w-full p-3 bg-[color:var(--background-1)] border border-[color:var(--card-border)] rounded-lg text-[color:var(--text)] focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] placeholder-[color:var(--text-muted)]"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[color:var(--text)] mb-1" htmlFor="subject">
                    {t('contactMe.form.subject')}
                  </label>
                  <input
                    className="w-full p-3 bg-[color:var(--background-1)] border border-[color:var(--card-border)] rounded-lg text-[color:var(--text)] focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] placeholder-[color:var(--text-muted)]"
                    type="text"
                    name="subject"
                    id="subject"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[color:var(--text)] mb-1" htmlFor="message">
                    {t('contactMe.form.message')}
                  </label>
                  <textarea
                    className="w-full p-3 bg-[color:var(--background-1)] border border-[color:var(--card-border)] rounded-lg text-[color:var(--text)] focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] placeholder-[color:var(--text-muted)] custom-scrollbar"
                    name="message"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full btn-theme-primary font-semibold p-3 rounded-lg shadow-md transition-colors transform hover:scale-105"
                >
                  {t('contactMe.form.sendButton')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}