import React from "react";

export default function Logo({ className = "", size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Clip path for the 3D Egg shape */}
        <clipPath id="egg-clip-path">
          <path d="M 50 6 C 24 6 13 38 13 58 C 13 80 29 94 50 94 C 71 94 87 80 87 58 C 87 38 76 6 50 6 Z" />
        </clipPath>

        {/* Realistic 3D Sphere/Egg Shading Gradient */}
        <radialGradient
          id="egg-gloss-shading"
          cx="40%"
          cy="30%"
          r="65%"
          fx="35%"
          fy="22%"
        >
          {/* Main specular highlight */}
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          {/* Subtle light spread */}
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.35" />
          {/* Midtone (fully transparent to show the underlying flag) */}
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          {/* Core shadow on the opposite side */}
          <stop offset="85%" stopColor="#000000" stopOpacity="0.15" />
          {/* Ambient occlusion at the very edges */}
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>
      </defs>

      {/* Render the Egg logo */}
      <g clipPath="url(#egg-clip-path)">
        {/* Left half: Green */}
        <rect x="0" y="0" width="50" height="100" fill="#008751" />
        
        {/* Top Right quadrant: Yellow */}
        <rect x="50" y="0" width="50" height="50" fill="#FCD116" />
        
        {/* Bottom Right quadrant: Red */}
        <rect x="50" y="50" width="50" height="50" fill="#E8112D" />

        {/* 3D Glossy Gloss Overlay */}
        <rect x="0" y="0" width="100" height="100" fill="url(#egg-gloss-shading)" />
      </g>
    </svg>
  );
}

