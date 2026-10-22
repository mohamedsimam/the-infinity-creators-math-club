'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { loadData } from './lib/data';
import { AnimateOnScroll, AnimatedCounter, FloatingSymbols, MathCurveSVG } from './components/Animations';
import NoticeBoardSection from './components/NoticeBoardSection';
import {
  UsersIcon,
  TargetIcon,
  CalendarIcon,
  TrophyIcon,
  AwardIcon,
  CameraIcon,
  BarChartIcon,
  BuildingIcon,
  MapPinIcon,
  AvatarPlaceholder,
  ArrowRightIcon,
  SparklesIcon,
  MailIcon,
  GraduationCapIcon,
} from './components/Icons';
import type { ClubData, GalleryAlbum } from './lib/data';

function GallerySlideshowCard({ album }: { album: GalleryAlbum }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalPhotos = album.photos.length;

  useEffect(() => {
    if (totalPhotos <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPhotos);
    }, 3800);
    return () => clearInterval(interval);
  }, [totalPhotos, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  const currentPhoto = album.photos[currentIndex] || album.photos[0];
  const relatedEventId = album.id.replace('album-', 'event-');

  return (
    <div
      className="gallery-slideshow-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border-light)',
        boxShadow: isHovered
          ? '0 20px 42px rgba(37, 99, 235, 0.16)'
          : '0 8px 24px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Slideshow Display Area */}
      <div
        style={{
          position: 'relative',
          height: '320px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        }}
      >
        {currentPhoto && (
          <Image
            key={currentPhoto.id || currentIndex}
            src={currentPhoto.url}
            alt={currentPhoto.caption || album.title}
            fill
            unoptimized
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        )}

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: '#FFFFFF',
              background: 'rgba(37, 99, 235, 0.92)',
              padding: '4px 10px',
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {album.category}
          </span>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#FFFFFF',
              background: 'rgba(15, 23, 42, 0.82)',
              padding: '4px 10px',
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <CameraIcon size={12} color="#60A5FA" />
            Photo {currentIndex + 1} of {totalPhotos}
          </span>
        </div>

        {/* Prev & Next Arrow Controls */}
        {totalPhotos > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.72)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s ease',
                opacity: isHovered ? 1 : 0.75,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.72)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.72)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s ease',
                opacity: isHovered ? 1 : 0.75,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.72)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Bottom Overlay with Caption & Slide Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 14px 12px 14px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.6) 60%, transparent 100%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {currentPhoto?.caption && (
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '0.8rem',
                lineHeight: 1.35,
                margin: 0,
                fontWeight: 500,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {currentPhoto.caption}
            </p>
          )}

          {/* Dots Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {album.photos.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`Jump to photo ${dotIdx + 1}`}
                style={{
                  height: '6px',
                  width: dotIdx === currentIndex ? '22px' : '8px',
                  borderRadius: '999px',
                  background: dotIdx === currentIndex ? '#3B82F6' : 'rgba(255, 255, 255, 0.45)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: dotIdx === currentIndex ? '0 0 8px rgba(59, 130, 246, 0.8)' : 'none',
                }}
              />
            ))}
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              {isHovered ? '⏸ Paused' : '▶ Auto-playing'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: 'var(--space-lg) var(--space-xl)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            {album.date}
          </span>
          <span style={{ color: 'var(--color-border-medium)' }}>•</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-math-blue)', fontWeight: 600 }}>
            {totalPhotos} Photo Archive
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.4,
            color: 'var(--color-primary-navy)',
            marginBottom: '0.6rem',
            fontWeight: 700,
          }}
        >
          {album.title}
        </h3>

        <p
          style={{
            fontSize: '0.86rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.55,
            marginBottom: '1.25rem',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {album.description}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--color-border-light)',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/gallery"
            className="btn btn-sm btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            <CameraIcon size={14} /> Full Album ({totalPhotos}) →
          </Link>

          <Link
            href={`/activities/${relatedEventId}`}
            className="btn btn-sm btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            <span>Read Event Blog</span>
            <ArrowRightIcon size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [data, setData] = useState<ClubData | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const committeeCount = data.committee.filter(m => m.name).length || data.committee.length;
  const coordinatorCount = data.coordinators.filter(c => c.name).length || data.coordinators.length;
  const eventCount = data.events.filter(e => e.status === 'published').length;
  const achievementCount = data.achievements.filter(a => a.status === 'published').length;
  const albumCount = data.gallery.length;

  const featuredAchievements = data.achievements.filter(a => a.featured && a.status === 'published');
  const upcomingEvents = data.events.filter(e => e.status === 'published' && new Date(e.date) >= new Date());
  const pastEvents = data.events.filter(e => e.status === 'published' && new Date(e.date) < new Date()).slice(0, 3);

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero math-grid-hero">
        <FloatingSymbols />
        <MathCurveSVG />

        {/* Large Transparent Background Watermark Logos */}
        <div className="hero-bg-watermark hero-bg-watermark-left" aria-hidden="true">
          <Image
            src="/images/logos/school-logo.png"
            alt=""
            width={560}
            height={560}
            priority
          />
        </div>
        <div className="hero-bg-watermark hero-bg-watermark-right" aria-hidden="true">
          <Image
            src="/images/logos/club-logo.png"
            alt=""
            width={560}
            height={560}
            priority
          />
        </div>

        <div className="container hero-content">
          <AnimateOnScroll>
            <h1 className="hero-title">THE INFINITY CREATORS</h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <p className="hero-school">
              MATH CLUB of KM/KM/ Al-Ashraq MMV (National School)
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <p className="hero-description">
              Exploring the beauty of mathematics, developing logical minds, solving meaningful
              problems, and inspiring the next generation of thinkers, creators, and innovators.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="hero-motto">Think. Explore. Solve. Create.</p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={400}>
            <div className="hero-actions">
              <Link href="/about" className="btn btn-primary btn-lg">
                Discover Our Club
              </Link>
              <Link href="/achievements" className="btn btn-secondary btn-lg">
                Explore Achievements
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== WELCOME MESSAGE ========== */}
      <section className="section math-grid-medium" style={{ background: 'var(--color-white)' }}>
        <div className="container container-narrow">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                Welcome
              </div>
              <h2 className="section-title">Welcome to The Infinity Creators</h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div style={{
              background: 'var(--color-light-bg)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              border: '1px solid var(--color-border-light)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div className="math-grid-fine" style={{
                position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  {data.welcomeMessage}
                </p>
                {data.presidentName && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '50%',
                      background: 'var(--color-math-grid)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      {data.presidentPhoto ? (
                        <Image src={data.presidentPhoto} alt={data.presidentName} width={50} height={50} style={{ objectFit: 'cover' }} />
                      ) : (
                        <AvatarPlaceholder size={50} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                        {data.presidentName}
                      </p>
                      <p style={{ fontSize: '0.8rem' }}>President, The Infinity Creators</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CLUB AT A GLANCE (STATS) ========== */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><BarChartIcon size={16} /></span>
                Club at a Glance
              </div>
              <h2 className="section-title">Our Club in Numbers</h2>
              <p className="section-subtitle">
                A snapshot of The Infinity Creators community and activities
              </p>
            </div>
          </AnimateOnScroll>

          <div className="stats-grid">
            {[
              { icon: <UsersIcon size={24} color="var(--color-math-blue)" />, label: 'Committee Members', value: 12, suffix: '' },
              { icon: <UsersIcon size={24} color="var(--color-math-blue)" />, label: 'Members', value: 150, suffix: '+' },
              { icon: <GraduationCapIcon size={24} color="var(--color-math-blue)" />, label: 'Teachers', value: 11, suffix: '' },
              { icon: <TrophyIcon size={24} color="var(--color-gold)" />, label: 'Achievements', value: Math.max(achievementCount, 2), suffix: '+' },
              { icon: <CalendarIcon size={24} color="var(--color-math-blue)" />, label: 'Flagship Events', value: Math.max(eventCount, 1), suffix: '' },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div className="stat-card">
                  <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                  </div>
                  <div className="stat-number">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NOTICE BOARD (GOING ON...) ========== */}
      <NoticeBoardSection />

      {/* ========== ACHIEVEMENTS BLOCK (UNDER STATS) ========== */}
      <section className="section" style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
                <span className="badge-icon"><TrophyIcon size={16} color="#D97706" /></span>
                Achievements & Milestones
              </div>
              <h2 className="section-title">Celebrating Our Milestones & Honors</h2>
              <p className="section-subtitle">
                Official recognition, academic debate honors, and institutional milestones of The Infinity Creators
              </p>
            </div>
          </AnimateOnScroll>

          {data.achievements.filter(a => a.status === 'published').length > 0 ? (
            <div className="grid-2" style={{ marginBottom: 'var(--space-2xl)' }}>
              {data.achievements.filter(a => a.status === 'published').map((ach, i) => (
                <AnimateOnScroll key={ach.id} delay={i * 120}>
                  <div
                    className="achievement-card featured"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 'var(--radius-xl)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--color-border-light)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 36px rgba(217,119,6,0.18)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    <div style={{
                      height: '210px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #1E3A8A 0%, #D97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {ach.photo ? (
                        <>
                          <Image src={ach.photo} alt={ach.title} fill unoptimized priority={i === 0} style={{ objectFit: 'cover' }} />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)',
                          }} />
                        </>
                      ) : (
                        <TrophyIcon size={48} color="#FFFFFF" />
                      )}

                      <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', zIndex: 2 }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'rgba(217,119,6,0.92)',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        }}>
                          {ach.level || 'Official Award'}
                        </span>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'rgba(15,23,42,0.85)',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}>
                          {ach.category}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', zIndex: 2 }}>
                        <p style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, margin: 0, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                          {ach.date}
                        </p>
                      </div>
                    </div>

                    <div className="card-body" style={{ padding: 'var(--space-lg) var(--space-xl)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary-navy)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {ach.title}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem', flex: 1 }}>
                        {ach.description}
                      </p>

                      {ach.studentNames && (
                        <div style={{
                          background: 'rgba(37,99,235,0.05)',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          borderLeft: '3px solid var(--color-math-blue)',
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.82rem',
                          color: 'var(--color-primary-navy)',
                          fontWeight: 600,
                        }}>
                          <UsersIcon size={15} color="var(--color-math-blue)" style={{ flexShrink: 0 }} />
                          <span>Honorees: {ach.studentNames}</span>
                        </div>
                      )}

                      {ach.competition && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                          <AwardIcon size={14} color="#D97706" /> {ach.competition}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <AnimateOnScroll>
              <div className="empty-state">
                <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                  <TrophyIcon size={48} color="var(--color-gold)" />
                </div>
                <h3>Achievements & Honors</h3>
                <p>New awards and competition milestones will be documented here as members participate in events.</p>
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={300}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <Link href="/achievements" className="btn btn-secondary">
                View Full Achievements Archive →
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== ACTIVITIES & EVENTS ========== */}
      <section className="section math-grid-medium" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><CalendarIcon size={16} /></span>
                Activities & Events
              </div>
              <h2 className="section-title">What&apos;s Happening</h2>
              <p className="section-subtitle">
                Official events, seminars, and mathematics competitions from The Infinity Creators
              </p>
            </div>
          </AnimateOnScroll>

          {/* Published Events Grid */}
          {data.events.filter(e => e.status === 'published').length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
              {data.events.filter(e => e.status === 'published').map((event, i) => {
                const isUpcoming = new Date(event.date) >= new Date();
                return (
                  <AnimateOnScroll key={event.id} delay={i * 100}>
                    <Link
                      href={`/activities/${event.id}`}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                    >
                      <div
                        className="event-card"
                        style={{
                          cursor: 'pointer',
                          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 36px rgba(37,99,235,0.18)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.transform = '';
                          (e.currentTarget as HTMLElement).style.boxShadow = '';
                        }}
                      >
                        {/* Event Card Image with Prominent Cover */}
                        <div
                          className="event-card-image"
                          style={{
                            position: 'relative',
                            height: '210px',
                            overflow: 'hidden',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {event.coverImage ? (
                            <>
                              <Image
                                src={event.coverImage}
                                alt={event.title}
                                fill
                                unoptimized
                                priority={i === 0}
                                style={{ objectFit: 'cover' }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 50%, transparent 100%)',
                                }}
                              />
                            </>
                          ) : (
                            <CalendarIcon size={44} color="rgba(255,255,255,0.8)" />
                          )}

                          {/* Category Badge on Top-Left */}
                          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: 'rgba(37,99,235,0.92)',
                                color: '#FFFFFF',
                                padding: '4px 10px',
                                borderRadius: '999px',
                                display: 'inline-block',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                              }}
                            >
                              {event.category}
                            </span>
                          </div>

                          {/* Event Date & Time on Bottom-Left */}
                          <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', zIndex: 2 }}>
                            <p
                              style={{
                                color: '#FFFFFF',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                margin: 0,
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                              }}
                            >
                              {event.date} {event.time ? `• ${event.time}` : ''}
                            </p>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span className={`event-status ${isUpcoming ? 'upcoming' : 'completed'}`}>
                              {isUpcoming ? 'Upcoming' : 'Completed'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                              Kalmunai Zonal
                            </span>
                          </div>

                          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.05rem', lineHeight: 1.4, color: 'var(--color-primary-navy)' }}>
                            {event.title}
                          </h4>

                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.55, flex: 1 }}>
                            {event.description?.slice(0, 140)}...
                          </p>

                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.75rem' }}>
                            <MapPinIcon size={14} color="var(--color-math-blue)" /> {event.venue || 'TBA'}
                          </p>

                          <div
                            style={{
                              paddingTop: '0.75rem',
                              borderTop: '1px solid var(--color-border-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.82rem',
                              color: 'var(--color-math-blue)',
                              fontWeight: 600,
                            }}
                          >
                            <span>View Full Event Details</span>
                            <ArrowRightIcon size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                );
              })}
            </div>
          ) : (
            <AnimateOnScroll>
              <div className="empty-state">
                <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                  <CalendarIcon size={48} color="var(--color-math-blue)" />
                </div>
                <h3>Events & Activities Calendar</h3>
                <p>
                  Club events and activities will be displayed here as they are planned and documented.
                </p>
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={300}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <Link href="/activities" className="btn btn-secondary">
                View All Activities & Events →
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== MEET THE TEAM & 7 COORDINATORS ========== */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><UsersIcon size={16} /></span>
                Leadership & Team
              </div>
              <h2 className="section-title">Meet Our Leadership Team</h2>
              <p className="section-subtitle">
                The dedicated teachers, executive officers, and student coordinators guiding The Infinity Creators
              </p>
            </div>
          </AnimateOnScroll>

          {/* Teacher Incharges & Coordinator */}
          <div style={{
            display: 'flex', alignItems: 'stretch', justifyContent: 'center',
            gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)',
            flexWrap: 'wrap',
          }}>
            {data.teachers.slice(0, 3).map((teacher, i) => (
              <AnimateOnScroll key={teacher.id} delay={i * 100}>
                <div className="profile-card profile-card-featured" style={{ maxWidth: '300px', width: '100%', height: '100%' }}>
                  <div className="profile-image-wrapper">
                    <div className="profile-image">
                      {teacher.photo ? (
                        <Image src={teacher.photo} alt={teacher.name} width={110} height={110} style={{ objectFit: 'cover' }} />
                      ) : (
                        <AvatarPlaceholder size={110} />
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="profile-name">{teacher.name}</p>
                    <p className="profile-position" style={{ color: 'var(--color-school-maroon)' }}>{teacher.designation}</p>
                    <p className="profile-bio">{teacher.introduction}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Executive Committee - Uniform Boxes */}
          <AnimateOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Executive Committee</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Principal officers of the MATH CLUB</p>
            </div>
          </AnimateOnScroll>

          <div className="committee-grid" style={{ marginBottom: 'var(--space-3xl)' }}>
            {data.committee.map((member, i) => (
              <AnimateOnScroll key={member.id} delay={i * 80}>
                <div className="profile-card profile-card-featured">
                  <div className="profile-image-wrapper">
                    <div className="profile-image">
                      {member.photo ? (
                        <Image src={member.photo} alt={member.name || member.position} width={110} height={110} style={{ objectFit: 'cover' }} />
                      ) : (
                        <AvatarPlaceholder size={110} />
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="profile-name">
                      {member.name || member.position}
                    </p>
                    <p className="profile-position">
                      {member.position}
                    </p>
                    <p className="profile-class">{member.classGrade || 'Grade / Section'}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        background: 'var(--color-light-bg)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        border: '1px solid var(--color-border-light)',
                      }}>
                        Term: {member.term}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Seven Coordinators - Requested By User on Home Page */}
          <AnimateOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <div className="section-badge" style={{ marginBottom: '0.5rem' }}>
                Portfolio Coordinators
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Our Seven Coordinators</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Operational leaders managing specialized portfolios and student activities
              </p>
            </div>
          </AnimateOnScroll>

          <div className="coordinators-layout">
            {/* First Row: 4 Cards */}
            <div className="coordinators-row-4">
              {data.coordinators.slice(0, 4).map((coord, i) => (
                <AnimateOnScroll key={coord.id} delay={i * 70}>
                  <div className="profile-card">
                    <div style={{
                      height: '3px',
                      background: 'var(--gradient-primary)',
                    }} />
                    <div className="profile-image-wrapper">
                      <div className="profile-image">
                        {coord.photo ? (
                          <Image
                            src={coord.photo}
                            alt={coord.name || 'Coordinator'}
                            width={110}
                            height={110}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <AvatarPlaceholder size={110} />
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="profile-name">
                        {coord.name || 'Coordinator'}
                      </p>
                      <p className="profile-position">
                        Coordinator
                      </p>
                      <p className="profile-class">{coord.classGrade || 'Grade / Section'}</p>
                      <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-light-bg)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          border: '1px solid var(--color-border-light)',
                        }}>
                          Year: {coord.academicYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Second Row: 3 Cards Centered */}
            <div className="coordinators-row-3">
              {data.coordinators.slice(4, 7).map((coord, i) => (
                <AnimateOnScroll key={coord.id} delay={(i + 4) * 70}>
                  <div className="profile-card">
                    <div style={{
                      height: '3px',
                      background: 'var(--gradient-primary)',
                    }} />
                    <div className="profile-image-wrapper">
                      <div className="profile-image">
                        {coord.photo ? (
                          <Image
                            src={coord.photo}
                            alt={coord.name || 'Coordinator'}
                            width={110}
                            height={110}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <AvatarPlaceholder size={110} />
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="profile-name">
                        {coord.name || 'Coordinator'}
                      </p>
                      <p className="profile-position">
                        Coordinator
                      </p>
                      <p className="profile-class">{coord.classGrade || 'Grade / Section'}</p>
                      <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-light-bg)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          border: '1px solid var(--color-border-light)',
                        }}>
                          Year: {coord.academicYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <AnimateOnScroll delay={500}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
              <Link href="/committee" className="btn btn-primary">
                Full Committee & Faculty →
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== LATEST GALLERY (EVENT PHOTO COLLECTIONS SLIDESHOW) ========== */}
      <section className="section math-grid-medium">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><CameraIcon size={16} /></span>
                Event Photo Archives
              </div>
              <h2 className="section-title">Latest from Our Gallery</h2>
              <p className="section-subtitle">Photographs archived together as complete event collections with live slideshow previews</p>
            </div>
          </AnimateOnScroll>

          {data.gallery.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 'var(--space-xl)',
              }}
            >
              {data.gallery.slice(0, 2).map((album, i) => (
                <AnimateOnScroll key={album.id} delay={i * 120}>
                  <GallerySlideshowCard album={album} />
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <AnimateOnScroll>
              <div className="empty-state">
                <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                  <CameraIcon size={48} color="var(--color-math-blue)" />
                </div>
                <h3>Photo Gallery</h3>
                <p>Event photographs and albums will be shared here as activities take place.</p>
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={400}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
              <Link href="/gallery" className="btn btn-secondary">
                Browse Full Gallery & Albums →
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CLOSING CTA ========== */}
      <section className="cta-section">
        <FloatingSymbols />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateOnScroll>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              &ldquo;Every great discovery begins with a question.<br />
              Every infinite journey begins with an idea.&rdquo;
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p>
              Join us in exploring the endless possibilities of mathematics.
              Discover our activities, meet our team, and be part of the journey.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={400}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/activities" className="btn btn-gold btn-lg">
                Explore Activities
              </Link>
              <Link href="/documents" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Documentation
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CONTACT SECTION (AT THE VERY LAST OF HOME PAGE) ========== */}
      <section id="contact" className="section math-grid-medium" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><MailIcon size={16} /></span>
                Contact & Inquiries
              </div>
              <h2 className="section-title">Get in Touch with Us</h2>
              <p className="section-subtitle">
                Official communication, school inquiries, and meeting schedules for The Infinity Creators
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            {/* Club Contact Card */}
            <AnimateOnScroll>
              <div className="contact-card" style={{ flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  <Image
                    src="/images/logos/club-logo.png"
                    alt="The Infinity Creators"
                    width={56}
                    height={56}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.1rem' }}>The Infinity Creators</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-math-blue)', fontWeight: 600 }}>MATH CLUB</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <BuildingIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>School</p>
                      <p style={{ fontSize: '0.85rem' }}>KM/KM/ Al-Ashraq MMV (National School)</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Nintavur, Sri Lanka</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MailIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Official Inquiries</p>
                      <p style={{ fontSize: '0.85rem' }}>Contact through school administration</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CalendarIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Meeting Schedule</p>
                      <p style={{ fontSize: '0.85rem' }}>Conducted during designated club activity sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* School Information Card */}
            <AnimateOnScroll delay={150}>
              <div className="contact-card" style={{ flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  <Image
                    src="/images/logos/school-logo.png"
                    alt="School Logo"
                    width={56}
                    height={56}
                    style={{ borderRadius: 'var(--radius-md)', background: 'var(--color-light-bg)', padding: '4px' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.1rem' }}>KM/KM/ Al-Ashraq MMV</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-school-maroon)', fontWeight: 600 }}>(National School)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPinIcon size={20} color="var(--color-school-maroon)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Location</p>
                      <p style={{ fontSize: '0.85rem' }}>Nintavur, Eastern Province, Sri Lanka</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CalendarIcon size={20} color="var(--color-school-maroon)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>School Established</p>
                      <p style={{ fontSize: '0.85rem' }}>1946</p>
                    </div>
                  </div>

                  <div style={{
                    marginTop: 'auto',
                    padding: 'var(--space-md)',
                    background: 'rgba(139,30,45,0.04)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(139,30,45,0.1)',
                  }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      For official matters regarding The Infinity Creators MATH CLUB, please contact the principal, school office, or the Teacher-in-Charge.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
