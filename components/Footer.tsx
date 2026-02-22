import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { XIcon, ThreadsIcon, RedditIcon, TikTokIcon } from './ui/SocialIcons';

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
      icon: XIcon,
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@arcabtech',
      icon: ThreadsIcon,
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/user/ARCABTECH/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      icon: RedditIcon,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@arcab.tech',
      icon: TikTokIcon,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61588464847607',
      icon: Facebook,
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
          <p className="font-mono text-xs text-stone-600 max-w-xs text-center md:text-left">
            Reparando e construindo o arcabouço digital com engenharia robusta e inteligência de dados.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex flex-wrap gap-2 justify-center max-w-[252px] mx-auto md:max-w-none md:mx-0 md:gap-4 md:justify-end">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-eco-primary transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
          <div className="font-mono text-xs text-stone-600 uppercase tracking-wider text-center md:text-right">
            © {new Date().getFullYear()} ARCAB. Goiânia/BR.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
