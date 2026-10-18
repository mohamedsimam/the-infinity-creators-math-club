'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import {
  CameraIcon,
  CloseIcon,
  MicroscopeIcon,
  CompassIcon,
  BarChartIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../components/Icons';
import type { ClubData, GalleryPhoto, ShowcaseProject } from '../lib/data';

const GALLERY_CATEGORIES = [
  'All',
  'Club establishment',
  'Inauguration',
  'Committee activities',
  'Mathematics competitions',
  'Workshops and seminars',
  'Exhibitions',
  'Student projects',
  'Award ceremonies',
  'Special events',
];

const SHOWCASE_CATEGORIES = [
  'All',
  'Mathematical models',
  'Creative projects',
  'Geometry & constructions',
  'Puzzles',
  'Problem-solving challenges',
  'Posters & infographics',
  'Research presentations',
  'Competition entries',
  'Learning resources',
  'Demonstrations',
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'showcase' ? 'showcase' : 'photos';

  const [activeTab, setActiveTab] = useState<'photos' | 'showcase'>(initialTab);
  const [data, setData] = useState<ClubData | null>(null);

  // Photo Gallery State
  const [filter, setFilter] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<{ photo: GalleryPhoto; allPhotos: GalleryPhoto[]; index: number } | null>(null);

  // Showcase State
  const [showcaseCategory, setShowcaseCategory] = useState('All');
  const [showcaseStatus, setShowcaseStatus] = useState('All');
  const [showcaseSearch, setShowcaseSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'showcase') {
      setActiveTab('showcase');
    } else if (tabParam === 'photos') {
      setActiveTab('photos');
    }
  }, [searchParams]);

  if (!data) return null;

  // Filtered Photo Albums
  let albums = data.gallery;
  if (filter !== 'All') {
    albums = albums.filter(a => a.category === filter);
  }

  // Filtered Showcase Projects
  let projects = data.showcase;
  if (showcaseCategory !== 'All') {
    projects = projects.filter(p => p.category === showcaseCategory);
  }
  if (showcaseStatus !== 'All') {
    projects = projects.filter(p => p.status === showcaseStatus);
  }
  if (showcaseSearch) {
    const q = showcaseSearch.toLowerCase();
    projects = projects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.studentName.toLowerCase().includes(q) ||
      p.concepts.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  const openLightbox = (photo: GalleryPhoto, allPhotos: GalleryPhoto[]) => {
    const index = allPhotos.findIndex(p => p.id === photo.id);
    setLightboxPhoto({ photo, allPhotos, index });
  };

  const navigateLightbox = (dir: number) => {
    if (!lightboxPhoto) return;
    const newIndex = (lightboxPhoto.index + dir + lightboxPhoto.allPhotos.length) % lightboxPhoto.allPhotos.length;
    setLightboxPhoto({
      photo: lightboxPhoto.allPhotos[newIndex],
      allPhotos: lightboxPhoto.allPhotos,
      index: newIndex,
    });
  };

  return (
    <>
      <PageHero
        title="Gallery & Showcase"
        subtitle="Explore our visual archives, memorable event moments, and student mathematical creations"
        badge="Media & Creations"
        badgeIcon={<CameraIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          {/* Main Top Tab Switcher */}
          <AnimateOnScroll>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-2xl)',
            }}>
              <div style={{
                display: 'inline-flex',
                background: 'var(--color-light-bg)',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('photos')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeTab === 'photos' ? 'var(--color-math-blue)' : 'transparent',
                    color: activeTab === 'photos' ? '#FFFFFF' : 'var(--color-text-secondary)',
                    boxShadow: activeTab === 'photos' ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
                  }}
                >
                  <CameraIcon size={16} /> Photo Albums & Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('showcase')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeTab === 'showcase' ? 'var(--color-math-blue)' : 'transparent',
                    color: activeTab === 'showcase' ? '#FFFFFF' : 'var(--color-text-secondary)',
                    boxShadow: activeTab === 'showcase' ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
                  }}
                >
                  <MicroscopeIcon size={16} /> Student Projects & Showcase
                </button>
              </div>
            </div>
          </AnimateOnScroll>

          {/* TAB 1: PHOTO ALBUMS */}
          {activeTab === 'photos' && (
            <div>
              {/* Category Filter */}
              <AnimateOnScroll>
                <div className="filter-tabs" style={{ marginBottom: 'var(--space-2xl)' }}>
                  {GALLERY_CATEGORIES.map(cat => (
                    <button key={cat} className={`filter-tab ${filter === cat ? 'active' : ''}`}
                      onClick={() => setFilter(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>
              </AnimateOnScroll>

              {albums.length > 0 ? (
                albums.map((album) => (
                  <div
                    key={album.id}
                    style={{
                      marginBottom: 'var(--space-3xl)',
                      background: 'var(--color-white)',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--color-border-light)',
                      boxShadow: 'var(--shadow-md)',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Event Group Header */}
                    <div style={{
                      padding: 'var(--space-xl)',
                      background: 'linear-gradient(to right, rgba(37,99,235,0.03), transparent)',
                      borderBottom: '1px solid var(--color-border-light)',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '0.6rem',
                      }}>
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
                          border: '1px solid rgba(37,99,235,0.15)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          <CameraIcon size={14} /> Event Photo Collection • {album.photos.length} Photos
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                          {album.date} • {album.category}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--color-primary-navy)' }}>
                        {album.title}
                      </h3>
                      {album.description && (
                        <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '900px' }}>
                          {album.description}
                        </p>
                      )}
                    </div>

                    {/* Event Grouped Photos Grid */}
                    <div style={{ padding: 'var(--space-xl)' }}>
                      <div className="gallery-grid">
                        {album.photos.map((photo, pi) => (
                          <AnimateOnScroll key={photo.id} delay={pi * 60}>
                            <div
                              className="gallery-item"
                              onClick={() => openLightbox(photo, album.photos)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Image
                                src={photo.url}
                                alt={photo.caption || album.title}
                                fill
                                unoptimized
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="gallery-item-overlay">
                                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{photo.caption}</p>
                                {photo.photographer && (
                                  <p style={{ fontSize: '0.7rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <CameraIcon size={12} /> {photo.photographer}
                                  </p>
                                )}
                              </div>
                            </div>
                          </AnimateOnScroll>
                        ))}
                      </div>
                    </div>

                    {/* Event Group Bottom Strip */}
                    <div style={{
                      padding: 'var(--space-md) var(--space-xl)',
                      background: 'var(--color-light-bg)',
                      borderTop: '1px solid var(--color-border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📁</span> All {album.photos.length} photos archived together as one event group
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link
                          href="/activities/event-01"
                          className="btn btn-sm btn-secondary"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <CalendarIcon size={14} /> View Event Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => openLightbox(album.photos[0], album.photos)}
                          className="btn btn-sm btn-primary"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <CameraIcon size={14} /> Open Full Lightbox ({album.photos.length} Photos) →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <AnimateOnScroll>
                  <div className="empty-state">
                    <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                      <CameraIcon size={48} color="var(--color-math-blue)" />
                    </div>
                    <h3>Photo Gallery</h3>
                    <p>
                      Event photographs and albums will be shared here as club activities take place.
                      Each event will have its own organized album with captions and credits.
                    </p>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          )}

          {/* TAB 2: STUDENT SHOWCASE (MERGED) */}
          {activeTab === 'showcase' && (
            <div>
              <AnimateOnScroll>
                {/* Search Bar */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                  <div className="search-wrapper">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search mathematical models, students, or concepts..."
                      value={showcaseSearch}
                      onChange={e => setShowcaseSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div className="filter-tabs" style={{ marginBottom: 'var(--space-sm)' }}>
                  {SHOWCASE_CATEGORIES.map(cat => (
                    <button key={cat} className={`filter-tab ${showcaseCategory === cat ? 'active' : ''}`}
                      onClick={() => setShowcaseCategory(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Status Filters */}
                <div className="filter-tabs" style={{ marginBottom: 'var(--space-2xl)' }}>
                  {['All', 'submitted', 'selected', 'completed', 'award-winning'].map(s => (
                    <button key={s} className={`filter-tab ${showcaseStatus === s ? 'active' : ''}`}
                      onClick={() => setShowcaseStatus(s)}>
                      {s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </AnimateOnScroll>

              {projects.length > 0 ? (
                <div className="grid-3">
                  {projects.map((project, i) => (
                    <AnimateOnScroll key={project.id} delay={i * 80}>
                      <div className="showcase-card" style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedProject(project)}>
                        <div className="showcase-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {project.category === 'Mathematical models' || project.category === 'Geometry & constructions' ? (
                            <CompassIcon size={36} color="var(--color-math-blue)" />
                          ) : project.category === 'Research presentations' || project.category === 'Posters & infographics' ? (
                            <BarChartIcon size={36} color="var(--color-math-blue)" />
                          ) : (
                            <MicroscopeIcon size={36} color="var(--color-math-blue)" />
                          )}
                        </div>
                        <div className="card-body">
                          <span className={`showcase-badge ${project.status}`}>
                            {project.status}
                          </span>
                          <h4 style={{ marginBottom: '0.25rem', fontSize: '1rem' }}>{project.title}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-math-blue)', marginBottom: '0.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <UserIcon size={14} /> {project.studentName || 'Student'} {project.classGrade ? `· ${project.classGrade}` : ''}
                          </p>
                          <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            {project.description?.slice(0, 120)}{project.description && project.description.length > 120 ? '...' : ''}
                          </p>
                          {project.concepts && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                              {project.concepts.split(',').slice(0, 3).map((c, ci) => (
                                <span key={ci} style={{
                                  fontSize: '0.7rem', padding: '1px 8px', borderRadius: '999px',
                                  background: 'rgba(37,99,235,0.06)', color: 'var(--color-math-blue)',
                                }}>
                                  {c.trim()}
                                </span>
                              ))}
                            </div>
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
                      <MicroscopeIcon size={48} color="var(--color-math-blue)" />
                    </div>
                    <h3>Student Creations & Showcase</h3>
                    <p>
                      {showcaseSearch || showcaseCategory !== 'All' || showcaseStatus !== 'All'
                        ? 'No projects match your current search or filters.'
                        : 'Student mathematical models, creative projects, puzzles, research presentations, and other learning experiences will be showcased here as they are submitted and documented.'}
                    </p>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="lightbox" onClick={() => setLightboxPhoto(null)}>
          <button
            className="lightbox-close"
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CloseIcon size={20} color="#FFFFFF" />
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: '90%' }}>
            <Image
              src={lightboxPhoto.photo.url}
              alt={lightboxPhoto.photo.caption || ''}
              width={900}
              height={600}
              unoptimized
              style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            />
            <div style={{ color: 'white', marginTop: '1rem' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>{lightboxPhoto.photo.caption}</p>
              {lightboxPhoto.photo.photographer && (
                <p style={{ fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '0.25rem' }}>
                  <CameraIcon size={12} color="#FFFFFF" /> {lightboxPhoto.photo.photographer}
                </p>
              )}
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.5rem' }}>
                {lightboxPhoto.index + 1} / {lightboxPhoto.allPhotos.length}
              </p>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}>›</button>
        </div>
      )}

      {/* Showcase Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>{selectedProject.title}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{
                height: '160px', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, var(--color-math-grid) 0%, rgba(37,99,235,0.05) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-math-blue)',
              }}>
                <MicroscopeIcon size={48} />
              </div>

              <span className={`showcase-badge ${selectedProject.status}`} style={{ marginBottom: '1rem', display: 'inline-block' }}>
                {selectedProject.status}
              </span>

              {[
                { label: 'Student / Team', value: selectedProject.studentName },
                { label: 'Class', value: selectedProject.classGrade },
                { label: 'Category', value: selectedProject.category },
                { label: 'Date', value: selectedProject.date },
              ].map(({ label, value }) => value ? (
                <div key={label} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</p>
                  <p style={{ fontSize: '0.9rem' }}>{value}</p>
                </div>
              ) : null)}

              <div style={{ marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Description</p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{selectedProject.description}</p>
              </div>

              {selectedProject.concepts && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Mathematical Concepts</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProject.concepts}</p>
                </div>
              )}

              {selectedProject.references && (
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>References & Sources</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{selectedProject.references}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryContent />
    </Suspense>
  );
}
