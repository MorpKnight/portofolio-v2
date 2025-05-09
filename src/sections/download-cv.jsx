import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DownloadCV() {
  const { t } = useTranslation();

  return (
    <section id="cv" className="py-16 md:py-24 bg-neutral-900 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <FileText className="mx-auto text-violet-400 mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-white">
            {t('downloadCV.title')}
          </h2>
          <p className="text-violet-200 max-w-xl mx-auto">
            {t('downloadCV.description')}
          </p>
        </div>
        <div className="text-center">
          <a
            href="/Giovan_Sihombing.pdf" // Potential point to check
            download
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-lg inline-flex items-center"
          >
            <Download size={20} className="mr-2" />
            {t('downloadCV.buttonText')}
          </a>
          <a
            href="/Giovan_Portofolio.pdf"
            download
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-lg inline-flex items-center ml-4"
          >
            <Download size={20} className="mr-2" />
            {t('downloadCV.portofolioButtonText')}
          </a>
          <p className="text-violet-300 text-sm mt-4">
            {t('downloadCV.fileNameNote')}
          </p>
        </div>
      </div>
    </section>
  );
}