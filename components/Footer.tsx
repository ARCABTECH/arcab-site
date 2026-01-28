import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ARCABTECH',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/arcab-tech',
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/arcabtech/',
      icon: Instagram,
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/ARCABTECH',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@arcabtech',
      icon: () => (
        <svg viewBox="-.1 .2 481.2 555.9" fill="currentColor" className="w-5 h-5">
          <path d="m182 3.4c-34.4 7.7-66.1 22.2-90.1 41.1-11.7 9.3-28.9 27.1-38.3 39.8-4.7 6.4-8.6 11.9-8.6 12.2 0 .4-1.3 2.5-2.9 4.8-3.7 5.4-12.8 23.6-17.6 35.2-3.4 8.2-5.4 14.1-11.4 33.7-2.6 8.3-7.6 33.4-9.2 45.3-.6 4.9-1.6 11.9-2.1 15.5s-1.2 22.5-1.5 42.1c-.4 33.8-.3 36.5 2.1 56 1.4 11.2 3.5 25.3 4.6 31.4 2.1 11.3 8.9 37.6 11.7 44.9 15.8 41.8 30.4 65.8 55.3 90.7 18.1 18.2 32.6 28.5 55.5 39.5 15.8 7.7 35.7 14.4 52.6 17.9l12.5 2.6 55-.4c54.8-.4 54.9-.4 64.9-2.9 39.9-10.1 70.1-27.1 98-55.2 16.8-16.9 28.4-34.5 36.3-55 7.2-18.6 9.1-28 9.9-48.6 2.4-60.7-26.2-108.1-81.3-135-4.5-2.2-8.4-4.7-8.7-5.5-.4-.8-.9-4.9-1.2-9.2-1-12.3-4.9-29.9-9.5-42.5-9.9-27.2-29.7-49.9-53-61-15.5-7.3-26.9-10.3-46.2-11.8-18.2-1.5-34.4 0-52.8 4.8-7.3 1.9-21.8 8.9-30.4 14.6-12.7 8.4-31.6 27.9-31.6 32.4 0 .7 32.5 23.6 37.7 26.6.6.3 4.8-3.1 10-8.2 11.1-11 17.5-14.6 34.8-19.3 7.8-2.2 33.2-1.9 42 .4 26.5 7 41.2 23 48 52.4 1.1 4.6 1.1 5.5-.2 6-.8.3-6.4-.1-12.6-.8-14.1-1.8-58-1.8-69.2-.1-33.9 5.3-59.3 17.9-77.2 38.5-23.8 27.3-27 70.8-7.6 102.9 5.3 8.8 17.7 21.9 25.7 27.2 23.4 15.5 51.8 22.3 81.5 19.6 55.3-5.1 91.2-37.7 105.1-95.5 1.2-4.9 2.4-11.1 2.7-13.7.9-7.5 2.2-7.8 10-2 22.4 16.6 34.3 39.3 35.9 68.2 1.9 33.1-14.1 65.6-44.4 90.3-23.1 18.9-45.6 28.5-80.3 34.4-15.2 2.6-63.8 2.6-79.4 0-42.3-7.1-74.5-22.6-99.2-47.8-14.1-14.6-22.6-26.6-32-45.4-8.3-16.5-16.6-42.7-21.2-66.5-4.5-23.7-6.5-50.9-5.8-78.5.9-33.2 3.5-52.5 10.8-82.2 7.1-29.1 20.8-57.8 36.7-77.4 15.3-18.9 31.8-32.1 53.7-42.8 13.7-6.7 18.3-8.5 29.5-11.5 3-.8 8-2.1 11-2.9 8.5-2.3 25-4.6 40.7-5.7 22.6-1.5 53.3 1.1 71.8 6.1 2.2.5 5.6 1.4 7.5 1.8 8.1 1.8 23 7.5 34.4 13.1 26.3 13.1 47.7 32.2 64.1 57.3 5.7 8.8 16.5 29.7 16.5 31.9 0 .8.4 1.8.9 2.3 1.1 1.3 5.5 13.2 7.6 20.7.9 3.2 2 6 2.5 6.3.8.5 17.3-3.6 36-8.8l8.5-2.4.3-3.6c.3-3.6-5.5-22.6-10-32.5-20-44.8-41-72.3-74.8-97.9-21.6-16.3-53.9-30.5-85.5-37.6l-14-3.1-50-.2-50-.2zm112 283.6c15.7 2 22.5 3.3 23.6 4.7 2 2.3-.9 22.4-5 35.4-8.3 25.9-22.4 40.7-45.1 47-11.5 3.2-33.6 3.2-45 0-25.3-7-39.2-24.8-36.3-46.3 1.9-14 10.6-24.7 26-32.2 9.8-4.8 14.1-6 27.8-8.1 10.6-1.6 42.6-1.9 54-.5z"/>
        </svg>
      ),
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/user/ARCABTECH/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 11.889c0-.729-.596-1.323-1.329-1.323-.358 0-.681.143-.92.373-.905-.595-2.13-.975-3.485-1.023l.742-2.334 2.008.471-.003.029c0 .596.487 1.082 1.087 1.082.599 0 1.086-.485 1.086-1.082s-.488-1.082-1.087-1.082c-.46 0-.852.287-1.01.69l-2.164-.507c-.094-.023-.191.032-.22.124l-.827 2.603c-1.419.017-2.705.399-3.65 1.012-.237-.219-.552-.356-.9-.356-.732.001-1.328.594-1.328 1.323 0 .485.267.905.659 1.136-.026.141-.043.283-.043.429-.001 1.955 2.404 3.546 5.359 3.546 2.956 0 5.36-1.591 5.36-3.546 0-.137-.015-.272-.038-.405.416-.224.703-.657.703-1.16zm-8.612.908c0-.434.355-.788.791-.788.436 0 .79.353.79.788 0 .434-.355.787-.79.787-.436.001-.791-.352-.791-.787zm4.53 2.335c-.398.396-1.024.589-1.912.589l-.007-.001-.007.001c-.888 0-1.514-.193-1.912-.589-.073-.072-.073-.19 0-.262.072-.072.191-.072.263 0 .325.323.864.481 1.649.481l.007.001.007-.001c.784 0 1.324-.157 1.649-.481.073-.072.19-.072.263 0 .073.072.073.19 0 .262zm-.094-1.547c-.436 0-.79-.353-.79-.787 0-.434.355-.788.79-.788.436 0 .79.353.79.788 0 .434-.354.787-.79.787z"/>
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@arcab.tech',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@arcabtech',
      icon: Youtube,
    },
  ];

  return (
    <footer className="bg-stone-100 text-eco-dark py-12 px-4 border-t border-stone-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-4">
            <Image
              src="/assets/main-logo.svg"
              alt="ARCAB Logo"
              width={150}
              height={55}
              className="h-10 w-auto"
            />
          </div>
          <p className="font-mono text-xs text-stone-500 max-w-xs text-center md:text-left">
            Reparando e construindo o arcabouço digital com engenharia robusta e inteligência de dados.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-eco-primary transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
          <div className="font-mono text-[10px] text-stone-400 uppercase tracking-wider text-center md:text-right">
            © {new Date().getFullYear()} ARCAB. Goiânia/BR.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;