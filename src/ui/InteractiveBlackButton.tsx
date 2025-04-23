import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const BlackButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8em 1em;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  overflow: hidden;

  --mouse-x: 50%;
  --mouse-y: 50%;

  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle 110px at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 60%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.9s ease;
    pointer-events: none;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  span {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }
`;

interface InteractiveBlackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function InteractiveBlackButton({
  children,
  ...props
}: InteractiveBlackButtonProps) {
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

  return (
    <BlackButton ref={buttonRef} onMouseMove={handleMouseMove} {...props}>
      <span>{children}</span>
    </BlackButton>
  );
}
