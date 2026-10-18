'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { loadData, ClubData, ClubEvent } from '@/app/lib/data';
import { PageHero, AnimateOnScroll } from '@/app/components/Animations';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
  CameraIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserIcon,
} from '@/app/components/Icons';

export default function EventDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const [data, setData] = useState<ClubData | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const event = (data.events || []).find((e: ClubEvent) => e.id === id);

  if (!event) {
    return (
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
        <h2>Event Not Found</h2>
        <p style={{ margin: '1rem 0' }}>The event you are looking for does not exist or has been removed.</p>
        <Link href="/activities" className="btn btn-primary">
          Back to Activities
        </Link>
      </div>
    );
  }

  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <>
      <PageHero
        title={event.title}
        subtitle={`${event.venue} • ${event.date}`}
        badge={event.category}
        badgeIcon={<CalendarIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)', paddingTop: 'var(--space-xl)' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          {/* Breadcrumb Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-xl)',
            flexWrap: 'wrap',
          }}>
            <Link href="/" style={{ color: 'var(--color-math-blue)', textDecoration: 'none', fontWeight: 500 }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/activities" style={{ color: 'var(--color-math-blue)', textDecoration: 'none', fontWeight: 500 }}>
              Activities & Events
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {event.title}
            </span>
          </div>

          {/* Main Hero Card with Cover Image */}
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            marginBottom: 'var(--space-2xl)',
          }}>
            {/* Event Cover Image Banner */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(260px, 45vw, 440px)',
              background: 'var(--gradient-primary)',
            }}>
              {event.coverImage ? (
                <>
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    unoptimized
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)',
                  }} />
                </>
              ) : null}

              {/* Status and Category Badges */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                gap: '8px',
                zIndex: 2,
                flexWrap: 'wrap',
              }}>
                <span className={`event-status ${isUpcoming ? 'upcoming' : 'completed'}`} style={{ boxShadow: 'var(--shadow-sm)' }}>
                  {isUpcoming ? 'Upcoming Event' : 'Completed Event'}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  {event.category}
                </span>
              </div>

              {/* Cover Photo Caption */}
              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                right: '20px',
                color: '#FFFFFF',
                zIndex: 2,
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'rgba(37,99,235,0.9)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  display: 'inline-block',
                  marginBottom: '8px',
                }}>
                  {event.category} &bull; {event.venue}
                </span>
                <h1 style={{
                  fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                }}>
                  {event.title}
                </h1>
              </div>
            </div>

            {/* Quick Key Facts Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: 'var(--space-lg) var(--space-xl)',
              background: 'var(--color-light-bg)',
              borderBottom: '1px solid var(--color-border-light)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37,99,235,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-math-blue)',
                  flexShrink: 0,
                }}>
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Date</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{event.date}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37,99,235,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-math-blue)',
                  flexShrink: 0,
                }}>
                  <ClockIcon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Time</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{event.time || 'All Day'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37,99,235,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-math-blue)',
                  flexShrink: 0,
                }}>
                  <MapPinIcon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Venue</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{event.venue}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37,99,235,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-math-blue)',
                  flexShrink: 0,
                }}>
                  <UsersIcon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Participants</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{event.participantCount || '12 Committee + In-charge'}</p>
                </div>
              </div>
            </div>

            {/* Event Description & Highlights */}
            <div style={{ padding: 'var(--space-2xl) var(--space-xl)' }}>
              <div style={{ maxWidth: '880px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary-navy)' }}>
                  Event Overview & Full Details
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-xl)',
                }}>
                  {event.description}
                </p>

                {/* Event Highlights Callout — show achievements if present, or purpose */}
                {(event.achievements || event.purpose) && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(217,119,6,0.05) 100%)',
                    borderLeft: '4px solid var(--color-math-blue)',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    padding: 'var(--space-lg)',
                    marginBottom: 'var(--space-xl)',
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      color: 'var(--color-primary-navy)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <AwardIcon size={18} color="var(--color-math-blue)" />
                      {event.achievements ? 'Key Achievement' : 'Purpose & Objectives'}
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)', lineHeight: 1.6, margin: 0 }}>
                      {event.achievements || event.purpose}
                    </p>
                  </div>
                )}

                {/* Key Information Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-lg)',
                  marginBottom: 'var(--space-xl)',
                }}>
                  {event.guestSpeakers && (
                    <div style={{
                      background: 'var(--color-light-bg)',
                      padding: 'var(--space-md) var(--space-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-light)',
                    }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        Keynote Speaker / Resource Person
                      </p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-navy)', margin: 0 }}>
                        {event.guestSpeakers}
                      </p>
                    </div>
                  )}

                  {event.teacherSupervisors && (
                    <div style={{
                      background: 'var(--color-light-bg)',
                      padding: 'var(--space-md) var(--space-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-light)',
                    }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        Teacher Supervision
                      </p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-navy)', margin: 0 }}>
                        {event.teacherSupervisors}
                      </p>
                    </div>
                  )}

                  {event.organizingTeam && (
                    <div style={{
                      background: 'var(--color-light-bg)',
                      padding: 'var(--space-md) var(--space-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-light)',
                    }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        Organized By
                      </p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-navy)', margin: 0 }}>
                        {event.organizingTeam}
                      </p>
                    </div>
                  )}

                  {event.outcomes && (
                    <div style={{
                      background: 'var(--color-light-bg)',
                      padding: 'var(--space-md) var(--space-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-light)',
                    }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        Key Outcomes
                      </p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-navy)', margin: 0 }}>
                        {event.outcomes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Event Schedule */}
                {event.schedule && (
                  <div style={{
                    marginBottom: 'var(--space-2xl)',
                    background: 'var(--color-white)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-lg)',
                  }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-navy)', marginBottom: '0.75rem' }}>
                      Program Schedule
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {event.schedule.split('\n').map((line, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.88rem',
                          color: 'var(--color-text-primary)',
                        }}>
                          <CheckCircleIcon size={16} color="var(--color-math-blue)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grouped Event Photo Gallery Section */}
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-md)',
            padding: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-lg)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-math-blue)',
                  background: 'rgba(37,99,235,0.08)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                }}>
                  <CameraIcon size={14} /> Official Photo Archive • {event.photos?.length || 3} Photos
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  Event Photographs
                </h3>
              </div>
              <Link href="/gallery" className="btn btn-sm btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CameraIcon size={14} /> View in Gallery Album →
              </Link>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              All photographs captured during this event are archived together as a permanent event collection:
            </p>

            {/* Photo Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)',
            }}>
              {(event.photos || []).map((photoUrl, idx) => {
                const captions = [
                  'Inter-School Mathematics Debate on Stage (President L. Mohamed Simam, Secretary MJ. Abdullah, Documentation Officer S. Muhammathu Amal)',
                  'Official Delegation Group Photo — All 12 Committee Members with Teacher In-charge at Al-Azhar Vidyalaya Kalmunai',
                  'Interactive Session & Mathematical Problem-Solving Games at tables',
                ];
                const caption = captions[idx] || `Event Photo ${idx + 1}`;

                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--color-border-light)',
                      background: 'var(--color-light-bg)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                      <Image
                        src={photoUrl}
                        alt={caption}
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '0.85rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-primary)', lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
                        {caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border-light)',
          }}>
            <Link href="/activities" className="btn btn-secondary">
              ← Back to All Activities
            </Link>
            <Link href="/gallery" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Browse Event Gallery Album <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
