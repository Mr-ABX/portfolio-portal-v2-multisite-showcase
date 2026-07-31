import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [displayText, setDisplayText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      setHasStarted(false);
      return;
    }

    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [triggered, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastTime >= 25) {
        lastTime = now;
        frame++;

        const revealedCount = Math.floor(frame * 0.5);
        let currentText = '';

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            currentText += ' ';
            continue;
          }

          if (i < revealedCount) {
            currentText += text[i];
          } else if (i < revealedCount + 3) {
            currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            currentText += '';
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
  }, [hasStarted, text]);

  if (!triggered || !hasStarted) {
    return <span>&nbsp;</span>;
  }

  return <span>{displayText}</span>;
}
