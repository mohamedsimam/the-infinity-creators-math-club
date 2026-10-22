'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import { CalendarIcon, MapPinIcon, CloseIcon, FileTextIcon, ArrowRightIcon } from '../components/Icons';
import type { ClubData, ClubEvent } from '../lib/data';

const EVENT_CATEGORIES = [
  'All',
  'Mathematics Competition',
  'Quiz Competition',
  'Workshop',
  'Seminar',
  'Mathematics Day Celebration',
  'Exhibition',
  'Peer Learning Session',
  'Problem-Solving Session',
  'Other',
];

function ActivitiesContent() {
  const searchParams = useSearchParams();
  const eventIdParam = searchParams.get('eventId');
  const [data, setData] = useState<ClubData | null>(null);
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    if (eventIdParam && loaded.events && loaded.events.length > 0) {
      const match = loaded.events.find(e => e.id === eventIdParam);
      if (match) setSelectedEvent(match);
    }
  }, [eventIdParam]);
  if (!data) return null;

  const now = new Date();
  let events = data.events.filter(e => e.status === 'published');

  if (filter !== 'All') {
    events = events.filter(e => e.category === filter);
  }

  if (statusFilter === 'upcoming') {
    events = events.filter(e => new Date(e.date) >= now);
  } else if (statusFilter === 'completed') {
    events = events.filter(e => new Date(e.date) < now);
  }

  const filteredEvents = events;

  return (
    <>
      <PageHero
        title="Activities & Events"
        subtitle="Explore our mathematics activities, competitions, workshops, and events"
        badge="Activities"
        badgeIcon={<CalendarIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          {/* Filters */}
          <AnimateOnScroll>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              {/* Status Filter */}
              <div className="filter-tabs" style={{ marginBottom: 'var(--space-md)' }}>
                {(['all', 'upcoming', 'completed'] as const).map(s => (
                  <button
                    key={s}
                    className={`filter-tab ${statusFilter === s ? 'active' : ''}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s === 'all' ? 'All Events' : s === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="filter-tabs">
                {EVENT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`filter-tab ${filter === cat ? 'active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {filteredEvents.length > 0 ? (
            <div className="grid-3">
              {filteredEvents.map((event, i) => {
                const isUpcoming = new Date(event.date) >= now;
                const coverImg = event.coverImage || (event.photos && event.photos[0]) || (event.id === 'event-02' || i === 1 ? '/images/events/meeting-oct14-img3.jpg' : '/images/events/seminar-group-photo.jpg');
                return (
                  <AnimateOnScroll key={event.id} delay={i * 80}>
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
                        <div className="event-card-image" style={{
                          position: 'relative',
                          height: '200px',
                          overflow: 'hidden',
                          background: isUpcoming
                            ? 'var(--gradient-primary)'
                            : 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {coverImg ? (
                            <>
                              <Image
                                src={coverImg}
                                alt={event.title}
                                fill
                                unoptimized
                                priority={i < 4}
                                style={{ objectFit: 'cover' }}
                              />
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 50%, transparent 100%)',
                              }} />
                            </>
                          ) : isUpcoming ? (
                            <CalendarIcon size={44} color="rgba(255,255,255,0.75)" />
                          ) : (
                            <FileTextIcon size={44} color="rgba(255,255,255,0.75)" />
                          )}

                          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                            <span style={{
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
                            }}>
                              {event.category}
                            </span>
                          </div>

                          <span className="event-card-date" style={{ position: 'absolute', bottom: '10px', left: '12px', zIndex: 2 }}>
                            {event.date} {event.time ? `• ${event.time}` : ''}
                          </span>
                        </div>

                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span className={`event-status ${isUpcoming ? 'upcoming' : 'completed'}`}>
                              {isUpcoming ? 'Upcoming' : 'Completed'}
                            </span>
                            <span style={{
                              fontSize: '0.7rem', color: 'var(--color-text-secondary)',
                              padding: '2px 8px', background: 'var(--color-light-bg)',
                              borderRadius: '999px',
                            }}>
                              Kalmunai Zonal
                            </span>
                          </div>

                          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.05rem', lineHeight: 1.4, color: 'var(--color-primary-navy)' }}>
                            {event.title}
                          </h4>

                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.55, flex: 1 }}>
                            {event.description?.slice(0, 140)}...
                          </p>

                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.75rem' }}>
                            <MapPinIcon size={14} color="var(--color-math-blue)" /> {event.venue || 'TBA'}
                          </p>

                          <div style={{
                            paddingTop: '0.75rem',
                            borderTop: '1px solid var(--color-border-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem',
                            color: 'var(--color-math-blue)',
                            fontWeight: 600,
                          }}>
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
                <h3>No Events Found</h3>
                <p>
                  {filter !== 'All' || statusFilter !== 'all'
                    ? 'No events match your current filters. Try adjusting your selection.'
                    : 'Club events and activities will be documented here as they are planned and organized. Stay tuned!'}
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>{selectedEvent.title}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="modal-body">
              {/* Cover Image & Event Header */}
              {selectedEvent.coverImage ? (
                <div style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                }}>
                  <Image
                    src={selectedEvent.coverImage || '/images/events/seminar-cover-debate.jpg'}
                    alt={selectedEvent.title}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '16px',
                    right: '16px',
                    color: '#FFFFFF',
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      background: 'rgba(37,99,235,0.85)',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      display: 'inline-block',
                      marginBottom: '6px',
                    }}>
                      Cover Photo • Math Debate
                    </span>
                    <h4 style={{ fontSize: '1rem', color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {selectedEvent.title}
                    </h4>
                  </div>
                </div>
              ) : (
                <div style={{
                  height: '180px', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  <CalendarIcon size={48} color="#FFFFFF" />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className={`event-status ${new Date(selectedEvent.date) >= now ? 'upcoming' : 'completed'}`}>
                  {new Date(selectedEvent.date) >= now ? 'Upcoming' : 'Completed'}
                </span>
                <span style={{
                  fontSize: '0.7rem', padding: '2px 10px', borderRadius: '999px',
                  background: 'rgba(37,99,235,0.08)', color: 'var(--color-math-blue)', fontWeight: 600,
                }}>
                  {selectedEvent.category}
                </span>
              </div>

              {[
                { label: 'Event ID', value: selectedEvent.id },
                { label: 'Date & Time', value: `${selectedEvent.date} ${selectedEvent.time || ''}` },
                { label: 'Venue', value: selectedEvent.venue },
                { label: 'Organizing Team', value: selectedEvent.organizingTeam },
                { label: 'Participating Grades', value: selectedEvent.participatingGrades },
                { label: 'Teacher Supervisors', value: selectedEvent.teacherSupervisors },
                { label: 'Participant Count', value: selectedEvent.participantCount },
              ].map(({ label, value }) => value ? (
                <div key={label} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</p>
                  <p style={{ fontSize: '0.9rem' }}>{value}</p>
                </div>
              ) : null)}

              {selectedEvent.purpose && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Purpose & Objectives</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedEvent.purpose}</p>
                </div>
              )}

              <div style={{ marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Description</p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{selectedEvent.description}</p>
              </div>

              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div style={{ marginBottom: '1.25rem', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.6rem' }}>
                    Event Visual Gallery ({selectedEvent.photos.length} Photos)
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.75rem',
                  }}>
                    {selectedEvent.photos.map((photoUrl, idx) => (
                      <div key={idx} style={{
                        position: 'relative',
                        height: '120px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: '1px solid var(--color-border-light)',
                        boxShadow: 'var(--shadow-sm)',
                      }}>
                        <Image
                          src={photoUrl}
                          alt={`${selectedEvent.title} Photo ${idx + 1}`}
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.schedule && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Program Schedule</p>
                  <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{selectedEvent.schedule}</p>
                </div>
              )}

              {selectedEvent.outcomes && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Outcomes & Lessons Learned</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedEvent.outcomes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading activities...</div>}>
      <ActivitiesContent />
    </Suspense>
  );
}
