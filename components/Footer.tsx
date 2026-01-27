import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 text-eco-dark py-12 px-4 border-t border-stone-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        
        <div>
          <div className="flex items-center mb-4">
            <Image
              src="/assets/main-logo.svg"
              alt="ARCAB Logo"
              width={150}
              height={55}
              className="h-10 w-auto"
            />
          </div>
          <p className="font-mono text-xs text-stone-500 max-w-xs">
            Reparando e construindo o arcabouço digital com engenharia robusta e inteligência de dados.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-4">
          <div className="flex gap-4">
            <a href="#" className="hover:text-eco-primary transition-colors"><Github size={20} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-eco-primary transition-colors"><Linkedin size={20} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-eco-primary transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
          </div>
          <div className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">
            © {new Date().getFullYear()} ARCAB. Goiânia/BR.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;