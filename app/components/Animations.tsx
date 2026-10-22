'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateOnScroll({ children, delay = 0, className = '' }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // If already in or near viewport on mount, show immediately
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.25) {
        setIsVisible(true);
      }
    }

    // Safety fallback timer so elements are NEVER permanently trapped at opacity 0
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, Math.min(300 + delay, 700));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function FloatingSymbols() {
  const symbols = ['π', '∞', '√x', '∑', 'θ', 'Δ', 'λ', '∫', 'φ', '÷', '×', 'ε'];
  
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {symbols.map((symbol, i) => (
        <div
          key={i}
          className="floating-symbol"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 15 + 10) % 90}%`,
            fontSize: `${1.2 + (i % 3) * 0.5}rem`,
            animation: `float ${6 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.08 + (i % 3) * 0.03,
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
}

export function MathCurveSVG() {
  return (
    <svg
      className="hero-curve"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '120px', zIndex: 1 }}
    >
      <path
        d="M0,80 C240,20 480,100 720,60 C960,20 1200,90 1440,40"
        stroke="rgba(220,234,248,0.6)"
        strokeWidth="2"
        fill="none"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: 0,
          animation: 'draw-line 4s ease-in-out forwards',
        }}
      />
      <path
        d="M0,100 C360,50 720,110 1080,70 C1260,50 1380,90 1440,80"
        stroke="rgba(220,234,248,0.4)"
        strokeWidth="1.5"
        fill="none"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: 0,
          animation: 'draw-line 5s ease-in-out 0.5s forwards',
        }}
      />
    </svg>
  );
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
}

export function PageHero({ title, subtitle, badge, badgeIcon }: PageHeroProps) {
  return (
    <section className="page-hero math-grid-hero">
      <FloatingSymbols />
      <div className="container page-hero-content">
        {badge && (
          <div className="section-badge">
            {badgeIcon && <span className="badge-icon">{badgeIcon}</span>}
            {badge}
          </div>
        )}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
