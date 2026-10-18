'use client';

import { useState, useEffect } from 'react';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import { BookOpenIcon, CalendarIcon, CompassIcon } from '../components/Icons';
import type { ClubData } from '../lib/data';

export default function AboutPage() {
  const [data, setData] = useState<ClubData | null>(null);

  useEffect(() => { setData(loadData()); }, []);
  if (!data) return null;

  const about = data.aboutContent;

  return (
    <>
      <PageHero
        title="About The Infinity Creators"
        subtitle="The official MATH CLUB of KM/KM/ Al-Ashraq MMV (National School), Nintavur"
        badge="About Us"
        badgeIcon={<BookOpenIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container about-content">
          <AnimateOnScroll>
            <h3>Introduction</h3>
            <p>{about.introduction}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>History & Establishment</h3>
            <p>{about.history}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Background</h3>
            <p>{about.background}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Importance of Mathematics</h3>
            <p>
              Mathematics is the universal language of science, engineering, technology, and research.
              It develops critical thinking, logical reasoning, and problem-solving abilities that are
              essential for success in every field. From calculating trajectories in space missions to
              optimizing algorithms in computer science, mathematics is the foundation of innovation
              and progress. Our club aims to help students appreciate this importance and develop
              mathematical skills that will serve them throughout their lives.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Club Objectives</h3>
            <p>{about.objectives}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Core Values</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {about.coreValues.split(',').map((value, i) => (
                <span key={i} style={{
                  padding: '0.35rem 1rem', borderRadius: '999px',
                  background: 'rgba(37,99,235,0.08)', color: 'var(--color-math-blue)',
                  fontSize: '0.85rem', fontWeight: 600,
                  border: '1px solid rgba(37,99,235,0.15)',
                }}>
                  {value.trim()}
                </span>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Our Motto</h3>
            <div style={{
              background: 'var(--color-light-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-light)', textAlign: 'center', marginBottom: '1rem',
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary-navy)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                &ldquo;Think. Explore. Solve. Create.&rdquo;
              </p>
              <p style={{ fontSize: '0.95rem' }}>{about.mottoMeaning}</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Membership Eligibility</h3>
            <p>{about.membershipEligibility}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Membership Responsibilities</h3>
            <p>{about.membershipResponsibilities}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Main Activities & Programs</h3>
            <p>{about.mainActivities}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Relationship with the School</h3>
            <p>{about.schoolRelationship}</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <h3>Future Development Plans</h3>
            <p>{about.futurePlans}</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Timeline */}
      <section className="section math-grid-medium">
        <div className="container container-narrow">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><CalendarIcon size={16} /></span>
                Our Journey
              </div>
              <h2 className="section-title">Club Timeline</h2>
            </div>
          </AnimateOnScroll>

          <div className="timeline">
            {data.timelineMilestones.map((ms, i) => (
              <AnimateOnScroll key={ms.id} delay={i * 100}>
                <div className="timeline-item">
                  <span className="timeline-date">{ms.date}</span>
                  <div className="timeline-content">
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{ms.title}</h4>
                    <p style={{ fontSize: '0.85rem' }}>{ms.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
