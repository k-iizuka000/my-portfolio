"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 50,
  onComplete,
}: TypewriterTextProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    count.set(0);
    const duration = (text.length * speed) / 1000;
    const controls = animate(count, text.length, {
      type: "tween",
      duration,
      ease: "linear",
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });
    return controls.stop;
  }, [text, speed, onComplete]);

  return (
    <span>
      <motion.span>{displayText}</motion.span>
      {!isComplete && <span className="animate-pulse">▌</span>}
    </span>
  );
}
