'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import { TrophyIcon, AwardIcon, UserIcon, BuildingIcon } from '../components/Icons';
import type { ClubData } from '../lib/data';

const ACHIEVEMENT_CATEGORIES = [
  'All',
  'Mathematics Competition',
  'Quiz',
  'Exhibition',
  'Workshop',
  'Research',
  'Community Service',
  'Other',
];

const LEVELS = ['All Levels', 'School', 'Zonal', 'Provincial', 'National', 'International'];

export default function AchievementsPage() {
  const [data, setData] = useState<ClubData | null>(null);
  const [catFilter, setCatFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All Levels');

  useEffect(() => { setData(loadData()); }, []);
  if (!data) return null;

  let achievements = data.achievements.filter(a => a.status === 'published');
  if (catFilter !== 'All') achievements = achievements.filter(a => a.category === catFilter);
  if (levelFilter !== 'All Levels') achievements = achievements.filter(a => a.level === levelFilter);

  const featured = achievements.filter(a => a.featured);
  const others = achievements.filter(a => !a.featured);

  return (
    <>
      <PageHero
        title="Our Achievements & Milestones"
        subtitle="Celebrating the documented accomplishments of The Infinity Creators"
        badge="Achievements"
        badgeIcon={<TrophyIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          {/* Filters */}
          <AnimateOnScroll>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="filter-tabs" style={{ marginBottom: 'var(--space-sm)' }}>
                {ACHIEVEMENT_CATEGORIES.map(cat => (
                  <button key={cat} className={`filter-tab ${catFilter === cat ? 'active' : ''}`}
                    onClick={() => setCatFilter(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="filter-tabs">
                {LEVELS.map(level => (
                  <button key={level} className={`filter-tab ${levelFilter === level ? 'active' : ''}`}
                    onClick={() => setLevelFilter(level)}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Featured Achievements */}
          {featured.length > 0 && (
            <>
              <AnimateOnScroll>
                <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Featured Achievements
                </h3>
              </AnimateOnScroll>
              <div className="grid-3" style={{ marginBottom: 'var(--space-2xl)' }}>
                {featured.map((ach, i) => (
                  <AnimateOnScroll key={ach.id} delay={i * 100}>
                    <div className="achievement-card featured">
                      <div style={{
                        height: '160px', position: 'relative', overflow: 'hidden',
                        background: 'linear-gradient(135deg, #F4B942 0%, #E8A830 50%, #123B75 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(255,255,255,0.9)',
                      }}>
                        {ach.photo ? (
                          <Image src={ach.photo} alt={ach.title} fill unoptimized style={{ objectFit: 'cover' }} />
                        ) : (
                          <TrophyIcon size={44} color="#FFFFFF" />
                        )}
                      </div>
                      <div className="card-body">
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px',
                            background: 'rgba(37,99,235,0.08)', color: 'var(--color-math-blue)', fontWeight: 600,
                          }}>{ach.category}</span>
                          {ach.level && (
                            <span style={{
                              fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px',
                              background: 'rgba(244,185,66,0.12)', color: '#B8860B', fontWeight: 600,
                            }}>{ach.level}</span>
                          )}
                        </div>
                        <h4 style={{ marginBottom: '0.25rem' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{ach.date}</p>
                        <p style={{ fontSize: '0.85rem' }}>{ach.description}</p>
                        {ach.studentNames && (
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-math-blue)', marginTop: '0.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserIcon size={14} /> {ach.studentNames}
                          </p>
                        )}
                        {ach.competition && (
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <BuildingIcon size={14} /> {ach.competition}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </>
          )}

          {/* Other Achievements */}
          {others.length > 0 && (
            <>
              {featured.length > 0 && (
                <AnimateOnScroll>
                  <h3 style={{ marginBottom: 'var(--space-lg)' }}>All Achievements</h3>
                </AnimateOnScroll>
              )}
              <div className="grid-3">
                {others.map((ach, i) => (
                  <AnimateOnScroll key={ach.id} delay={i * 80}>
                    <div className="achievement-card">
                      <div style={{
                        height: '140px', position: 'relative', overflow: 'hidden',
                        background: 'var(--gradient-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(255,255,255,0.8)',
                      }}>
                        {ach.photo ? (
                          <Image src={ach.photo} alt={ach.title} fill unoptimized style={{ objectFit: 'cover' }} />
                        ) : (
                          <AwardIcon size={36} color="#FFFFFF" />
                        )}
                      </div>
                      <div className="card-body">
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px',
                            background: 'rgba(37,99,235,0.08)', color: 'var(--color-math-blue)', fontWeight: 600,
                          }}>{ach.category}</span>
                          {ach.level && (
                            <span style={{
                              fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px',
                              background: 'rgba(139,30,45,0.08)', color: 'var(--color-school-maroon)', fontWeight: 600,
                            }}>{ach.level}</span>
                          )}
                        </div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{ach.date}</p>
                        <p style={{ fontSize: '0.85rem' }}>{ach.description}</p>
                        {ach.studentNames && (
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-math-blue)', marginTop: '0.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserIcon size={14} /> {ach.studentNames}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </>
          )}

          {/* Timeline View */}
          {achievements.length > 0 && (
            <div style={{ marginTop: 'var(--space-3xl)' }}>
              <AnimateOnScroll>
                <div className="section-header">
                  <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Achievement Timeline</h2>
                </div>
              </AnimateOnScroll>
              <div className="timeline" style={{ maxWidth: '700px', margin: '0 auto' }}>
                {achievements.map((ach, i) => (
                  <AnimateOnScroll key={ach.id + '-tl'} delay={i * 80}>
                    <div className="timeline-item">
                      <span className="timeline-date">{ach.date}</span>
                      <div className="timeline-content">
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.8rem' }}>{ach.description}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {achievements.length === 0 && (
            <AnimateOnScroll>
              <div className="empty-state">
                <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                  <TrophyIcon size={48} color="var(--color-math-blue)" />
                </div>
                <h3>Our Achievements Archive</h3>
                <p>
                  This section will proudly document the accomplishments and milestones of The Infinity Creators
                  as they are achieved and verified. Every great journey begins with dedication and hard work.
                  Our achievements will be recorded here as our club grows and participates in mathematical endeavors.
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
