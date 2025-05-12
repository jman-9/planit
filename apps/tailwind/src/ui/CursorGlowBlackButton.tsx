import React, { useRef, useEffect } from 'react';
import styles from './CursorGlowBlackButton.module.css';

interface CursorGlowBlackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fontSize?: string;
  glowSize?: string;
}

export function CursorGlowBlackButton({children, fontSize, glowSize, ...props}: CursorGlowBlackButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;

    const animate = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      const speed = 0.05;

      current.current.x += dx * speed;
      current.current.y += dy * speed;

      if (buttonRef.current) {
        buttonRef.current.style.setProperty(
          "--mouse-x",
          `${current.current.x}px`
        );
        buttonRef.current.style.setProperty(
          "--mouse-y",
          `${current.current.y}px`
        );
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.current = { x, y };
  };

  return <button ref={buttonRef} onMouseMove={handleMouseMove} style={{fontFamily:'Inter',fontSize, ['--glow-size' as any]: glowSize}} className={`relative inline-flex items-center justify-center px-4 py-3 font-bold bg-black text-white border-none rounded-lg cursor-pointer overflow-hidden z-0 ${styles.glowButton}`} {...props}><span className="relative gap-2 z-2">{children}</span></button>;
}
