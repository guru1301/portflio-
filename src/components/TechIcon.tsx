import React, { useState } from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  useImage?: boolean;
}

/**
 * Official technology logo image URLs from verified CDNs
 */
const TECH_IMAGE_URLS: Record<string, string> = {
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
  fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  'spring boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  sqlite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'tailwind css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
};

/**
 * Renders official technology SVG image logos with subtle monochrome tint that illuminates on hover,
 * with graceful fallback to curated inline SVGs.
 */
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-3.5 h-3.5',
  useImage = true,
}) => {
  const norm = name.toLowerCase().trim();
  const [imgFailed, setImgFailed] = useState(false);

  // Look for matching image URL
  const matchedKey = Object.keys(TECH_IMAGE_URLS).find((k) =>
    norm === k || norm.includes(k)
  );
  const imageUrl = matchedKey ? TECH_IMAGE_URLS[matchedKey] : null;

  if (useImage && imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        onError={() => setImgFailed(true)}
        className={`object-contain transition-all duration-300 filter grayscale brightness-125 opacity-75 hover:grayscale-0 hover:brightness-100 hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 ${className}`}
      />
    );
  }

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.7 0-4.9 1.6-4.9 3.3v1.8h5.2v.7H4.5C2.7 7.8 2 9.5 2 12.1c0 2.8 1.4 4.3 3.9 4.3h1.7v-2.3c0-1.8 1.6-3.3 3.4-3.3h5.2c1.5 0 2.7-1.2 2.7-2.7V5.3C18.9 3.5 17 2 11.9 2zm-1.8 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM12.1 22c3.7 0 4.9-1.6 4.9-3.3v-1.8h-5.2v-.7h7.7c1.8 0 2.5-1.7 2.5-4.3 0-2.8-1.4-4.3-3.9-4.3h-1.7v2.3c0 1.8-1.6 3.3-3.4 3.3H7.8c-1.5 0-2.7 1.2-2.7 2.7v2.8c0 1.8 1.9 3.3 7 3.3zm1.8-2.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
      </svg>
    );
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  // Java
  if (norm === 'java' || norm.startsWith('java')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.8 16.5c-2.3.2-3.8.8-3.8 1.5 0 .9 2.5 1.7 6.4 1.7 3.8 0 6.1-.8 6.1-1.7 0-.7-1.3-1.3-3.3-1.5.7-.3 1.5-.7 1.5-1.1 0-.6-1.5-1-3.6-1-2.4 0-4.1.4-4.1 1.1 0 .4.4.8.8 1zm3-14c1.1 1.4-1.2 3.1-.7 4.7.4 1.2 2.2 1.7 1.3 3.3-.8 1.4-2.5 1.5-2.7 2.8 1.8-.7 3.4-2 3.1-3.5-.3-1.7-2.4-2.3-1.7-4.1.6-1.5 1.4-2 1.4-3.2-.2 0-.4 0-.7 0zm-2.7 1.5c.7 1-1 2.2-.6 3.4.3.9 1.6 1.2.9 2.4-.6 1-1.8 1.1-2 2 1.3-.5 2.5-1.4 2.2-2.5-.2-1.2-1.7-1.6-1.2-2.9.4-1.1 1-1.4 1-2.3-.1-.1-.2-.1-.3-.1zM4 20.3c2.3.9 5.3 1.2 8.3 1.2 3.1 0 6.1-.3 8.3-1.2-1.8.6-4.9 1-8.3 1-3.4 0-6.5-.4-8.3-1z" />
      </svg>
    );
  }

  // Spring / Spring Boot
  if (norm.includes('spring')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.6 3.1 8.5 7.4 9.6.3-.9.6-1.9 1-2.8-2.9-.6-5.1-3.1-5.1-6.1 0-3.5 2.8-6.3 6.3-6.3 1.8 0 3.4.7 4.6 1.9l1.6-1.6C16.3 5 14.3 4.2 12 4.2zm6.7 3.8l-1.6 1.6c.9 1.1 1.4 2.6 1.4 4.1 0 3.2-2.3 5.9-5.4 6.3.3.9.6 1.9.9 2.8 4.7-.6 8.3-4.6 8.3-9.5 0-2.1-.7-4-2-5.5z" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
      </svg>
    );
  }

  // Express / Fastify / APIs
  if (norm.includes('express') || norm.includes('api')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 12h12M10 8l4 8" />
      </svg>
    );
  }

  // FastAPI
  if (norm.includes('fastapi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 14h7v8l9-12h-7l3-8h-3z" />
      </svg>
    );
  }

  // Flask
  if (norm.includes('flask')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.15 20.3a1 1 0 0 0 .85 1.7h14a1 1 0 0 0 .85-1.7L14 9.31V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
        <path d="M7 16h10" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 2.2.7 4.2 2 5.9v.1l1.5-1.5c-.9-1.3-1.5-2.8-1.5-4.5 0-4.4 3.6-8 8-8s8 3.6 8 8c0 2-.7 3.8-2 5.2l1.4 1.4c1.6-1.8 2.6-4.1 2.6-6.6 0-5.5-4.5-10-10-10zm-1 5v4h2V7h-2zm-3 6v2h8v-2H8z" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes('mongo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-.3 0-.5.2-.6.4C10.1 5.3 6 10.8 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4.2-4.1-9.7-5.4-12.6-.1-.2-.3-.4-.6-.4zm0 2.4c1.1 2.6 4.3 7.8 4.3 10.6 0 2.4-1.9 4.3-4.3 4.3V4.4z" />
      </svg>
    );
  }

  // SQL / Database
  if (norm.includes('sql') || norm.includes('database')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Power BI / Analytics / DAX / Power Query
  if (norm.includes('power bi') || norm.includes('dax') || norm.includes('power query') || norm.includes('bi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    );
  }

  // Pandas / Data
  if (norm.includes('pandas') || norm.includes('data')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18M8 8l8 8M16 8l-8 8" />
      </svg>
    );
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm-3 0h2v2H7V5zm12.5 7c-.6-.4-1.5-.5-2.2-.2-.2-.6-.6-1.1-1.2-1.5l-.6-.4-.4.6c-.3.5-.4 1.1-.3 1.6-.6.3-1.1.7-1.5 1.2H2v2.5c0 3.6 2.9 6.5 6.5 6.5h7.3c4 0 7.2-2.9 7.7-6.9.1-.6-.2-1.3-.7-1.6-.2-.3-.5-.6-.8-.8z" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  // Postman / Tools
  if (norm.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.7 0-4.4 1.3-5.1 4 1-1.3 2.2-1.8 3.6-1.4.8.2 1.4.8 2 1.5 1 1 2.3 2.1 4.9 2.1 2.7 0 4.4-1.3 5.1-4-1 1.3-2.2 1.8-3.6 1.4-.8-.2-1.4-.8-2-1.5-1-1-2.3-2.1-4.9-2.1zm-8 6c-2.7 0-4.4 1.3-5.1 4 1-1.3 2.2-1.8 3.6-1.4.8.2 1.4.8 2 1.5 1 1 2.3 2.1 4.9 2.1 2.7 0 4.4-1.3 5.1-4-1 1.3-2.2 1.8-3.6 1.4-.8-.2-1.4-.8-2-1.5-1-1-2.3-2.1-4.9-2.1z" />
      </svg>
    );
  }

  // Razorpay / Payments
  if (norm.includes('razorpay') || norm.includes('payment')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }

  // Recharts / Visualization
  if (norm.includes('recharts') || norm.includes('chart') || norm.includes('visualization')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-3 3" />
      </svg>
    );
  }

  // Default subtle code icon for any other technology
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};
