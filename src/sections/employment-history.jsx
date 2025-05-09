import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Experience() {
  const { t } = useTranslation();
  const employmentHistory = t('employmentHistory.entries', { returnObjects: true }) || [];

  return (
    <section id="experience" className="py-16 md:py-24 bg-neutral-900 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Building2 className="mx-auto text-violet-400 mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-white">{t('employmentHistory.title')}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {employmentHistory.map((job, index) => (
            <div key={index} className="bg-neutral-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-violet-300">{job.position}</h3>
              <p className="text-violet-400 font-medium">{job.company} - {job.location}</p>
              <p className="text-sm text-violet-200 mb-2">{job.period}</p>
              <ul className="list-disc list-inside text-violet-200/90 text-sm space-y-1">
                {job.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;