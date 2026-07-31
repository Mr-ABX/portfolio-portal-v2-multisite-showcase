import { motion, MotionValue, useTransform } from 'framer-motion';

interface AnimatedLetterProps {
  char: string;
  progress: MotionValue<number>;
  index: number;
  totalChars: number;
}

export function AnimatedLetter({ char, progress, index, totalChars }: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  // Calculate the range over which this character fades in
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}
