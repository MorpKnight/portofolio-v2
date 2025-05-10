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
    <section id="contact" className="py-16 md:py-24 bg-[#212121] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Mail className="mx-auto text-violet-400 mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-white">{t('contactMe.title')}</h2>
          <p className="text-violet-200 max-w-xl mx-auto">
            {t('contactMe.description')}
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-neutral-800/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <p className="text-lg text-center text-violet-100">
            {t('contactMe.emailPrompt').replace('christoffelsihombing@gmail.com', '')}
            <a href="mailto:christoffelsihombing@gmail.com" className="underline">
              christoffelsihombing@gmail.com
            </a>
          </p>

          <div className="text-center mt-6">
            <button
              onClick={openForm}
              className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
            >
              <Send size={18} className="mr-2" />
              {t('contactMe.openFormButton')}
            </button>
          </div>

          {socialLinks && socialLinks.length > 0 && (
            <>
              <p className="text-lg text-center text-violet-100 mt-8">
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
                    className="text-violet-300 hover:text-violet-400 transition-colors"
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
              className="bg-neutral-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md relative text-violet-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-neutral-400 hover:text-violet-300 transition-colors"
                aria-label={t('contactMe.form.closeAriaLabel')}
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold mb-6 text-center text-violet-300">
                {t('contactMe.form.title')}
              </h3>
              <form action="https://formcarry.com/s/9kPHCBPmbKF" method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1" htmlFor="name">
                      {t('contactMe.form.name')}
                    </label>
                    <input
                      className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-violet-100 focus:ring-violet-500 focus:border-violet-500 placeholder-neutral-400"
                      type="text"
                      name="name"
                      id="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1" htmlFor="phone">
                      {t('contactMe.form.phone')}
                    </label>
                    <input
                      className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-violet-100 focus:ring-violet-500 focus:border-violet-500 placeholder-neutral-400"
                      type="tel"
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-violet-200 mb-1" htmlFor="email">
                    {t('contactMe.form.email')}
                  </label>
                  <input
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-violet-100 focus:ring-violet-500 focus:border-violet-500 placeholder-neutral-400"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-violet-200 mb-1" htmlFor="subject">
                    {t('contactMe.form.subject')}
                  </label>
                  <input
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-violet-100 focus:ring-violet-500 focus:border-violet-500 placeholder-neutral-400"
                    type="text"
                    name="subject"
                    id="subject"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-violet-200 mb-1" htmlFor="message">
                    {t('contactMe.form.message')}
                  </label>
                  <textarea
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-violet-100 focus:ring-violet-500 focus:border-violet-500 placeholder-neutral-400 custom-scrollbar"
                    name="message"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold p-3 rounded-lg shadow-md transition-colors transform hover:scale-105"
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