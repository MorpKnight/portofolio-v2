import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Education() {
  const { t } = useTranslation();
  const educationData = t('education.entries', { returnObjects: true }) || [];

  return (
    <section id="education" className="py-16 md:py-24 bg-[#212121] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <GraduationCap className="mx-auto text-violet-400 mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-white">{t('education.title')}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-neutral-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-violet-300">{edu.institution}</h3>
              <p className="text-violet-400 font-medium">{edu.degree}</p>
              <p className="text-sm text-violet-200 mb-1">{edu.period}</p>
              {edu.gpa && <p className="text-sm text-violet-200 mb-2">{t('education.gpaLabel', { gpa: edu.gpa })}</p>}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-violet-200 mt-2 mb-1">{t('education.achievementsTitle')}</h4>
                  <ul className="list-disc list-inside text-violet-200/90 text-sm space-y-1">
                    {edu.achievements.map((ach, achIndex) => (
                      <li key={achIndex}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;