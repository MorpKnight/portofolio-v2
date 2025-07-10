import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Experience() {
  const { t } = useTranslation();
  const employmentHistory = t('employmentHistory.entries', { returnObjects: true }) || [];

  return (
    <section id="experience" className="py-16 md:py-24 bg-[color:var(--background-1)] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Building2 className="mx-auto text-[color:var(--primary)] mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-[color:var(--text)]">{t('employmentHistory.title')}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {employmentHistory.map((job, index) => (
            <div key={index} className="bg-[color:var(--card-bg)] backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[color:var(--card-border)]">
              <h3 className="text-xl font-semibold text-[color:var(--secondary)]">{job.position}</h3>
              <p className="text-[color:var(--primary)] font-medium">{job.company} - {job.location}</p>
              <p className="text-sm text-[color:var(--text)] mb-2">{job.period}</p>
              <ul className="list-disc list-inside text-[color:var(--text)]/90 text-sm space-y-1">
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