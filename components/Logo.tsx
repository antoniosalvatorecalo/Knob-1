import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  // Define heights for different sizes to match previous proportions
  const heightMap = {
    sm: 24,
    md: 40,
    lg: 80
  };

  const h = heightMap[size] || 40;
  // SVG viewBox is 0 0 95 28, so width/height ratio is ~3.39
  const w = h * (95 / 28);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 95 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Work Louder Logo"
    >
      {/* Semi-Circle (Right) - White */}
      <path d="M94.0457 5.69328C91.4201 2.84974 87.7724 1.16568 83.9051 1.01158C80.0379 0.857484 76.2678 2.24596 73.4242 4.87157C70.5807 7.49718 68.8966 11.1448 68.7425 15.0121C68.5884 18.8794 69.9769 22.6495 72.6025 25.493L94.0457 5.69328Z" fill="#FFFFFF" />

      {/* Cross (Left) - White */}
      <rect x="18.1602" y="26.9995" width="8" height="27" transform="rotate(179.66 18.1602 26.9995)" fill="#FFFFFF" />
      <rect y="16.9998" width="8" height="27" transform="rotate(-89.6369 0 16.9998)" fill="#FFFFFF" />

      {/* Diamond (Center) - White */}
      <path d="M34.0503 13.3048L47.8494 0L61.7313 14.3976L47.9322 27.7024L34.0503 13.3048Z" fill="#FFFFFF" />
    </svg>
  );
};