import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export function ScrambleText({ text, isHovered, className = '' }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastTime >= 25) {
        lastTime = now;
        frame++;

        const revealedCount = Math.floor(frame / 4); // 4 frames per char
        let currentText = '';

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            currentText += ' ';
            continue;
          }

          if (i < revealedCount) {
            currentText += text[i];
          } else {
            currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(currentText);

        if (revealedCount >= text.length) {
          setDisplayText(text);
          return;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
}
