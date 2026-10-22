'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  VolumeUpIcon,
  VolumeOffIcon,
  PlayIcon,
  PauseIcon,
  MaximizeIcon,
  MegaphoneIcon,
  CloseIcon,
  CalendarIcon,
} from './Icons';
import { AnimateOnScroll } from './Animations';

export default function NoticeBoardSection() {
  // Video 1 (MathExpo 2026 Promo) state
  const video1Ref = useRef<HTMLVideoElement>(null);
  const [isMuted1, setIsMuted1] = useState(true);
  const [isPlaying1, setIsPlaying1] = useState(false);

  // Video 2 (Math Club Activity Reel) state
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [isMuted2, setIsMuted2] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(false);

  // Poster Lightbox Modal state
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Toggle Video 1 Mute
  const toggleMute1 = () => {
    if (video1Ref.current) {
      const nextMuted = !video1Ref.current.muted;
      video1Ref.current.muted = nextMuted;
      setIsMuted1(nextMuted);
    }
  };

  // Toggle Video 1 Play/Pause
  const togglePlay1 = () => {
    if (video1Ref.current) {
      if (video1Ref.current.paused) {
        video1Ref.current.play();
        setIsPlaying1(true);
      } else {
        video1Ref.current.pause();
        setIsPlaying1(false);
      }
    }
  };

  // Toggle Video 2 Mute
  const toggleMute2 = () => {
    if (video2Ref.current) {
      const nextMuted = !video2Ref.current.muted;
      video2Ref.current.muted = nextMuted;
      setIsMuted2(nextMuted);
    }
  };

  // Toggle Video 2 Play/Pause
  const togglePlay2 = () => {
    if (video2Ref.current) {
      if (video2Ref.current.paused) {
        video2Ref.current.play();
        setIsPlaying2(true);
      } else {
        video2Ref.current.pause();
        setIsPlaying2(false);
      }
    }
  };

  // Master Mute/Unmute All
  const [allMuted, setAllMuted] = useState(true);
  const toggleMuteAll = () => {
    const nextState = !allMuted;
    setAllMuted(nextState);
    if (video1Ref.current) {
      video1Ref.current.muted = nextState;
      setIsMuted1(nextState);
    }
    if (video2Ref.current) {
      video2Ref.current.muted = nextState;
      setIsMuted2(nextState);
    }
  };

  return (
    <section
      id="notice-board"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #FFFFFF 100%)',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle math graph background ornament */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), radial-gradient(rgba(37,99,235,0.02) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll>
          {/* Header Section */}
          <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
            <div
              className="section-badge"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                color: '#DC2626',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  boxShadow: '0 0 10px #EF4444',
                  animation: 'pulse 1.8s infinite',
                }}
              />
              <span className="badge-icon">
                <MegaphoneIcon size={14} color="#DC2626" />
              </span>
              NOTICE BOARD • GOING ON NOW
            </div>

            <h2 className="section-title">Club Notice Board — Ongoing Updates</h2>
            <p className="section-subtitle">
              Live updates, official exhibition broadcasts, announcements, and MathExpo 2026 multimedia releases.
            </p>
          </div>

          {/* Going On... Live Marquee Ticker */}
          <div
            style={{
              background: 'linear-gradient(90deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 18px',
              marginBottom: 'var(--space-2xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  animation: 'pulse 2s infinite',
                }}
              >
                🔴 Going On...
              </span>
              <span style={{ fontSize: '0.86rem', fontWeight: 500, color: 'rgba(255,255,255,0.92)' }}>
                MathExpo 2026 preparations underway • 16 Coordinators appointed • Official video releases &amp; posters broadcast below
              </span>
            </div>

            <button
              onClick={toggleMuteAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: allMuted ? 'rgba(255,255,255,0.12)' : 'rgba(37,99,235,0.9)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Toggle audio for all notice board media"
            >
              {allMuted ? (
                <>
                  <VolumeOffIcon size={14} color="#FCA5A5" />
                  <span>Unmute All Audio</span>
                </>
              ) : (
                <>
                  <VolumeUpIcon size={14} color="#86EFAC" />
                  <span>Mute All Audio</span>
                </>
              )}
            </button>
          </div>
        </AnimateOnScroll>

        {/* 3 Multimedia Notice Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'stretch',
          }}
        >
          {/* NOTICE CARD 1: MathExpo 2026 Promo Video */}
          <AnimateOnScroll delay={100}>
            <div
              className="event-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-light)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Video Player Box */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  background: '#0F172A',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={video1Ref}
                  src="/media/notice-board/mathexpo-2026-promo.mp4"
                  playsInline
                  loop
                  muted={isMuted1}
                  controls
                  onPlay={() => setIsPlaying1(true)}
                  onPause={() => setIsPlaying1(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Floating Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#60A5FA',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    🎬 Promo Video
                  </span>
                </div>

                {/* Quick Audio Mute Toggle Button */}
                <button
                  onClick={toggleMute1}
                  aria-label={isMuted1 ? 'Unmute video audio' : 'Mute video audio'}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 3,
                    background: isMuted1 ? 'rgba(15, 23, 42, 0.85)' : 'rgba(37, 99, 235, 0.95)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isMuted1 ? (
                    <>
                      <VolumeOffIcon size={14} color="#FCA5A5" />
                      <span>Audio Muted</span>
                    </>
                  ) : (
                    <>
                      <VolumeUpIcon size={14} color="#86EFAC" />
                      <span>Audio Active</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: 'var(--color-math-blue)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    MathExpo 2026
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Official Video Promo
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--color-primary-navy)',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                  }}
                >
                  MathExpo 2026 Official Broadcast Teaser
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    flex: 1,
                    marginBottom: '14px',
                  }}
                >
                  Official video release announcing MathExpo 2026 and the 80th Anniversary Celebrations. Discover the upcoming exhibits, student challenges, and mathematical showcases.
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border-light)',
                  }}
                >
                  <button
                    onClick={togglePlay1}
                    className="btn btn-sm btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      padding: '6px 14px',
                    }}
                  >
                    {isPlaying1 ? (
                      <>
                        <PauseIcon size={12} color="currentColor" /> Pause Video
                      </>
                    ) : (
                      <>
                        <PlayIcon size={12} color="currentColor" /> Play Video
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleMute1}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-math-blue)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {isMuted1 ? '🔇 Tap to Unmute' : '🔊 Mute Sound'}
                  </button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* NOTICE CARD 2: WhatsApp Announcement Poster */}
          <AnimateOnScroll delay={200}>
            <div
              className="event-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-light)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Poster Image Container */}
              <div
                onClick={() => setIsPosterModalOpen(true)}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  background: '#0F172A',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/media/notice-board/notice-board-announcement.jpeg"
                  alt="Official Notice: 80th Anniversary & MathExpo Exhibition"
                  fill
                  unoptimized
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />

                {/* Subtle gradient vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)',
                  }}
                />

                {/* Floating Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(217, 119, 6, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    }}
                  >
                    📢 Circular Poster
                  </span>
                </div>

                {/* Click to Zoom Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    zIndex: 2,
                    background: 'rgba(15, 23, 42, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MaximizeIcon size={12} color="#FFFFFF" /> Click to Expand
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#D97706',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    Exhibition Notice
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    80th Anniversary
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--color-primary-navy)',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                  }}
                >
                  Official 80th Anniversary Exhibition Notice
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    flex: 1,
                    marginBottom: '14px',
                  }}
                >
                  Official circular detailing invitations, coordinator roles, project exhibits, and schedule for the school&apos;s 80th Anniversary Celebration.
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border-light)',
                  }}
                >
                  <button
                    onClick={() => setIsPosterModalOpen(true)}
                    className="btn btn-sm btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      padding: '6px 14px',
                    }}
                  >
                    <MaximizeIcon size={12} color="#FFFFFF" /> View Full Poster
                  </button>

                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    High-Res Document
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* NOTICE CARD 3: Math Club In Action Video Reel */}
          <AnimateOnScroll delay={300}>
            <div
              className="event-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-light)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Video Player Box */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  background: '#0F172A',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={video2Ref}
                  src="/media/notice-board/math-club-promo-video.mp4"
                  playsInline
                  loop
                  muted={isMuted2}
                  controls
                  onPlay={() => setIsPlaying2(true)}
                  onPause={() => setIsPlaying2(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Floating Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#A78BFA',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(167, 139, 250, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    🎥 Event Reel
                  </span>
                </div>

                {/* Quick Audio Mute Toggle Button */}
                <button
                  onClick={toggleMute2}
                  aria-label={isMuted2 ? 'Unmute video audio' : 'Mute video audio'}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 3,
                    background: isMuted2 ? 'rgba(15, 23, 42, 0.85)' : 'rgba(37, 99, 235, 0.95)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isMuted2 ? (
                    <>
                      <VolumeOffIcon size={14} color="#FCA5A5" />
                      <span>Audio Muted</span>
                    </>
                  ) : (
                    <>
                      <VolumeUpIcon size={14} color="#86EFAC" />
                      <span>Audio Active</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: '#7C3AED',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    Club in Action
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Live Highlights
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--color-primary-navy)',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                  }}
                >
                  Mathematics In Motion — Student Activities
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    flex: 1,
                    marginBottom: '14px',
                  }}
                >
                  A dynamic video reel showing students actively participating in mathematics competitions, building models, and preparing for school-wide presentations.
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border-light)',
                  }}
                >
                  <button
                    onClick={togglePlay2}
                    className="btn btn-sm btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      padding: '6px 14px',
                    }}
                  >
                    {isPlaying2 ? (
                      <>
                        <PauseIcon size={12} color="currentColor" /> Pause Video
                      </>
                    ) : (
                      <>
                        <PlayIcon size={12} color="currentColor" /> Play Video
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleMute2}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-math-blue)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {isMuted2 ? '🔇 Tap to Unmute' : '🔊 Mute Sound'}
                  </button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Lightbox Modal for Poster */}
      {isPosterModalOpen && (
        <div
          onClick={() => setIsPosterModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              background: '#0F172A',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(30, 41, 59, 0.95)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#FFFFFF' }}>
                  Official Notice: 80th Anniversary Exhibition
                </h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                  The Infinity Creators MATH CLUB • Official Announcement Poster
                </p>
              </div>

              <button
                onClick={() => setIsPosterModalOpen(false)}
                aria-label="Close modal"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#EF4444')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              >
                <CloseIcon size={18} color="#FFFFFF" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '70vh',
                background: '#000000',
              }}
            >
              <Image
                src="/media/notice-board/notice-board-announcement.jpeg"
                alt="Full Official Notice Poster"
                fill
                unoptimized
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
