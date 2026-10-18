'use client';

import { useState, useEffect } from 'react';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import { TargetIcon, CompassIcon, SparklesIcon } from '../components/Icons';
import type { ClubData } from '../lib/data';

export default function VisionMissionPage() {
  const [data, setData] = useState<ClubData | null>(null);
  useEffect(() => { setData(loadData()); }, []);
  if (!data) return null;

  return (
    <>
      <PageHero
        title="Vision, Mission & Objectives"
        subtitle="The guiding principles that drive The Infinity Creators forward"
        badge="Our Purpose"
        badgeIcon={<TargetIcon size={16} />}
      />

      {/* Vision & Mission Cards */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', alignItems: 'stretch' }}>
            <AnimateOnScroll>
              <div className="vision-card" style={{ height: '100%' }}>
                <div className="vision-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CompassIcon size={32} color="var(--color-math-blue)" />
                </div>
                <h3>Our Vision</h3>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  &ldquo;{data.vision}&rdquo;
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="vision-card" style={{ height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--gradient-gold)' }} />
                <div className="vision-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SparklesIcon size={32} color="var(--color-gold)" />
                </div>
                <h3>Our Mission</h3>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  &ldquo;{data.mission}&rdquo;
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section math-grid-medium">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><TargetIcon size={16} /></span>
                Strategic Objectives
              </div>
              <h2 className="section-title">Our Objectives</h2>
              <p className="section-subtitle">
                The specific goals we work towards every day
              </p>
            </div>
          </AnimateOnScroll>

          <div className="objectives-list">
            {data.objectives.map((obj, i) => (
              <AnimateOnScroll key={i} delay={i * 80}>
                <div className="objective-item">
                  <div className="objective-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="objective-text">{obj}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Mathematical illustration section */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container container-narrow text-center">
          <AnimateOnScroll>
            <div style={{
              background: 'var(--color-light-bg)', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)', border: '1px solid var(--color-border-light)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-math-blue)' }}>∞</div>
              <h3 style={{ marginBottom: '0.75rem' }}>The Infinity in Our Name</h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                The infinity symbol (∞) represents the boundless nature of mathematical exploration.
                Just as numbers extend infinitely, so does our curiosity, our learning, and our
                potential to create. We are The Infinity Creators — exploring mathematics without limits.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
