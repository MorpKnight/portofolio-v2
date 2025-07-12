import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DownloadCV() {
  const { t } = useTranslation();

  return (
    <section id="cv" className="py-16 md:py-24 bg-[color:var(--background-1)] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <FileText className="mx-auto text-[color:var(--primary)] mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-[color:var(--text)]">
            {t('downloadCV.title')}
          </h2>
          <p className="text-[color:var(--text)] max-w-xl mx-auto">
            {t('downloadCV.description')}
          </p>
        </div>
        <div className="text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a
              href="/Giovan_Sihombing.pdf"
              download
              className="btn-enhanced text-lg inline-flex items-center"
            >
              <Download size={20} className="mr-2" />
              {t('downloadCV.buttonText')}
            </a>
            <a
              href="/Giovan_Portofolio.pdf"
              download
              className="btn-enhanced-secondary text-lg inline-flex items-center"
            >
              <Download size={20} className="mr-2" />
              {t('downloadCV.portofolioButtonText')}
            </a>
          </div>
          <p className="text-[color:var(--text)] text-sm mt-6 bg-[color:var(--background-1)] inline-block px-4 py-2 rounded-full border border-[color:var(--card-border)]">
            {t('downloadCV.fileNameNote')}
          </p>
        </div>
      </div>
    </section>
  );
}