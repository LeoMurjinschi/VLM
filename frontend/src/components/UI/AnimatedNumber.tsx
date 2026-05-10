import React, { useEffect, useState, useRef } from 'react';

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const numericString = value.replace(/[^0-9]/g, '');
  const prefix = value.substring(0, value.indexOf(numericString[0])) || '';
  const suffix = value.substring(value.indexOf(numericString[numericString.length - 1]) + 1) || '';
  const targetNumber = parseInt(numericString, 10) || 0;
  
  const hasFormatting = value.includes(',');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;
    
    let startTimestamp: number;
    let animationId: number;
    const duration = 800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCurrent(Math.floor(easeOutExpo(progress) * targetNumber));
      
      if (progress < 1) {
        animationId = window.requestAnimationFrame(step);
      } else {
        setCurrent(targetNumber);
      }
    };
    
    animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
  }, [isVisible, targetNumber]);

  const displayString = targetNumber === 0 
    ? value 
    : `${prefix}${hasFormatting ? current.toLocaleString('en-US') : current}${suffix}`;

  return <span ref={ref}>{displayString}</span>;
};

export default AnimatedNumber;
