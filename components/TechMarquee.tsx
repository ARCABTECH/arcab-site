import React from 'react';

const technologies = [
  // Linguagens e Runtimes
  "PYTHON", "JAVASCRIPT", "TYPESCRIPT", "SQL", "NODE.JS",
  // Data Science & ML
  "PANDAS", "NUMPY", "SCIKIT-LEARN", "TENSORFLOW", "MATPLOTLIB", "SEABORN", "SCIPY", "PLOTLY", "JUPYTER",
  // Web Frameworks & Libraries
  "REACT", "NEXT.JS", "VITE", "FLASK", "FASTAPI", "AXIOS",
  // Frontend
  "HTML", "CSS", "TAILWIND CSS",
  // Databases & Cache
  "POSTGRESQL", "REDIS",
  // DevOps & Cloud
  "DOCKER", "KUBERNETES", "AWS", "AZURE", "GOOGLE CLOUD", "GIT",
  // Tools & Others
  "SELENIUM", "POWER BI"
];

const TechMarquee: React.FC = () => {
  return (
    <div className="bg-eco-dark text-stone-300 py-3 overflow-hidden border-y border-stone-800 relative z-20 flex select-none">
      {/* First Loop Container */}
      <div className="flex animate-marquee whitespace-nowrap shrink-0 items-center">
        {technologies.map((tech, index) => (
          <div key={`t1-${index}`} className="flex items-center gap-4 px-8 shrink-0">
            <span className="text-eco-accent text-xs">///</span>
            <span className="font-mono font-bold text-sm tracking-widest">{tech}</span>
          </div>
        ))}
      </div>
      
      {/* Second Loop Container (Duplicate for seamless effect) */}
      <div className="flex animate-marquee whitespace-nowrap shrink-0 items-center">
        {technologies.map((tech, index) => (
          <div key={`t2-${index}`} className="flex items-center gap-4 px-8 shrink-0">
            <span className="text-eco-accent text-xs">///</span>
            <span className="font-mono font-bold text-sm tracking-widest">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;