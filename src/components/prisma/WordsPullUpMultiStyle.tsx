import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Flatten the segments into a list of words, maintaining the class for each word
  const wordsWithClasses = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className || '' }))
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {wordsWithClasses.map((item, i) => (
        <div key={i} className="relative overflow-hidden inline-flex items-center">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block relative ${item.className}`}
          >
            {item.word}
          </motion.span>
          <span className="inline-block">&nbsp;</span>
        </div>
      ))}
    </div>
  );
}
