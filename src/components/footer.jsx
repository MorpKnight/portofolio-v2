import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function Footer({ socialLinks = [] }) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const defaultSocialLinks = [];
  const linksToUse = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer className="py-8 bg-[#212121] text-center border-t border-neutral-700/70 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-violet-300 text-sm mb-4 md:mb-0">
            {t('footer.copyright', { year: currentYear, siteName: t('siteName') })}
          </p>
          {linksToUse.length > 0 && (
            <div className="flex items-center space-x-4">
              {linksToUse.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {React.isValidElement(social.icon) ? social.icon : null}
                </a>
              ))}
            </div>
          )}
        </div>
        <p className="text-violet-500 text-xs mt-4">
          <Trans i18nKey="footer.builtWith">
            Built with <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">React</a> & <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">Tailwind CSS</a>. Deployed on <a href="#" className="hover:text-violet-400">[Your Hosting]</a>.
          </Trans>
        </p>
      </div>
    </footer>
  );
}