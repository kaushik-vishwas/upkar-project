import React, { useEffect, useRef, useState } from 'react';

const CountUp = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  // 🔥 Make target safe (convert to string first)
  const safeTarget = String(target || '0');

  const numericTarget = parseInt(safeTarget.replace(/\D/g, '')) || 0;
  const suffix = safeTarget.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);

      setCount(Math.floor(progressPercent * numericTarget));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, numericTarget, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}+{suffix}
    </span>
  );
};

export default CountUp;
