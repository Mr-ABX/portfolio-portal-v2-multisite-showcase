import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  toggle?: () => void;
  className?: string;
}

export function SquashHamburger({ isOpen, toggle, className = '' }: SquashHamburgerProps) {
  const springConfig = { stiffness: 300, damping: 20 };

  return (
    <div
      onClick={toggle}
      className={`relative cursor-pointer flex items-center justify-center select-none ${className}`}
      aria-label="Toggle Menu"
    >
      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial={false}
        className="w-[15px] h-[10px] sm:w-[18px] sm:h-[12px] relative flex flex-col justify-between"
      >
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 4.4 },
          }}
          transition={springConfig}
          className="w-full h-[1.2px] sm:h-[1.5px] bg-white block absolute top-0 origin-center"
        />
        <motion.span
          variants={{
            closed: { opacity: 1, scale: 1 },
            open: { opacity: 0, scale: 0 },
          }}
          transition={springConfig}
          className="w-full h-[1.2px] sm:h-[1.5px] bg-white block absolute top-1/2 -translate-y-1/2"
        />
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -4.4 },
          }}
          transition={springConfig}
          className="w-full h-[1.2px] sm:h-[1.5px] bg-white block absolute bottom-0 origin-center"
        />
      </motion.div>
    </div>
  );
}
