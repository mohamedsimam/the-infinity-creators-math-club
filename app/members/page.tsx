'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import {
  UsersIcon,
  SearchIcon,
  BookOpenIcon,
  AwardIcon,
  TargetIcon,
  GraduationCapIcon,
  CloseIcon,
  AvatarPlaceholder,
  ArrowRightIcon,
  CheckCircleIcon,
} from '../components/Icons';
import type { ClubData, ClubMember } from '../lib/data';

const GRADE_FILTERS = [
  { label: 'All Members', value: 'all' },
  { label: 'Grade 12 (A/L)', value: 'Grade 12' },
  { label: 'Grade 11 (O/L)', value: 'Grade 11' },
  { label: 'Grade 10', value: 'Grade 10' },
  { label: 'Grade 9', value: 'Grade 9' },
  { label: 'Grade 8', value: 'Grade 8' },
];

export default function MembersPage() {
  const [data, setData] = useState<ClubData | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  const membersList = data?.members || [];

  const filteredMembers = useMemo(() => {
    return membersList.filter((member) => {
      const matchesGrade =
        selectedGrade === 'all' || member.grade.toLowerCase().includes(selectedGrade.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesGrade;

      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.grade.toLowerCase().includes(query) ||
        (member.section && member.section.toLowerCase().includes(query)) ||
        member.interestArea.toLowerCase().includes(query) ||
        (member.badge && member.badge.toLowerCase().includes(query)) ||
        `member ${member.memberNumber}`.toLowerCase().includes(query);

      return matchesGrade && matchesSearch;
    });
  }, [membersList, selectedGrade, searchQuery]);

  if (!data) return null;

  return (
    <>
      <PageHero
        title="Club Members Directory"
        subtitle="The passionate students and mathematical thinkers driving The Infinity Creators"
        badge="Student Community"
        badgeIcon={<UsersIcon size={16} />}
      />

      {/* =========================================================================
          KEY STATS OVERVIEW
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--color-white)', paddingBottom: 'var(--space-xl)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-2xl)',
              }}
            >
              <div
                style={{
                  background: 'var(--color-light-bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-border-light)',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <UsersIcon size={28} color="var(--color-math-blue)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-math-navy)' }}>
                  150+
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
                  Active Registered Members
                </p>
              </div>

              <div
                style={{
                  background: 'var(--color-light-bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-border-light)',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <GraduationCapIcon size={28} color="var(--color-school-maroon)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-math-navy)' }}>
                  Grades 6–13
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
                  Secondary & Collegiate Streams
                </p>
              </div>

              <div
                style={{
                  background: 'var(--color-light-bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-border-light)',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <TargetIcon size={28} color="var(--color-accent-gold)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-math-navy)' }}>
                  4 Circles
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
                  Specialized Learning Groups
                </p>
              </div>

              <div
                style={{
                  background: 'var(--color-light-bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-border-light)',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <AwardIcon size={28} color="var(--color-math-blue)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-math-navy)' }}>
                  Weekly
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
                  Peer Problem Solving Circles
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Search & Filter Header */}
          <AnimateOnScroll delay={100}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                background: 'var(--color-light-bg)',
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {/* Search Field */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--color-white)',
                    border: '1px solid var(--color-border-medium)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.5rem 1rem',
                    flex: '1',
                    minWidth: '260px',
                    maxWidth: '450px',
                  }}
                >
                  <SearchIcon size={18} color="var(--color-text-secondary)" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, grade, interest..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '0.88rem',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="Clear search"
                    >
                      <CloseIcon size={14} />
                    </button>
                  )}
                </div>

                {/* Counter */}
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  Showing <span style={{ color: 'var(--color-math-blue)' }}>{filteredMembers.length}</span> of {membersList.length} members
                </div>
              </div>

              {/* Grade Filter Pills */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                {GRADE_FILTERS.map((filter) => {
                  const isActive = selectedGrade === filter.value;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedGrade(filter.value)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '999px',
                        border: isActive ? '1px solid var(--color-math-blue)' : '1px solid var(--color-border-light)',
                        background: isActive ? 'var(--color-math-blue)' : 'var(--color-white)',
                        color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* =========================================================================
          MEMBERS BLOCKS GRID (EXACT UNIFORM BOX FORMAT)
          ========================================================================= */}
      <section className="section math-grid-medium">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><BookOpenIcon size={16} /></span>
                Member Directory
              </div>
              <h2 className="section-title">Registered Club Members</h2>
              <p className="section-subtitle">
                Student members of The Infinity Creators at KM/KM/ Al-Ashraq MMV (National School)
              </p>
            </div>
          </AnimateOnScroll>

          {filteredMembers.length > 0 ? (
            <div className="committee-grid">
              {filteredMembers.map((member, i) => (
                <AnimateOnScroll key={member.id} delay={(i % 8) * 60}>
                  <div
                    className="profile-card"
                    onClick={() => setSelectedMember(member)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        height: '3px',
                        background: 'linear-gradient(90deg, var(--color-math-blue), var(--color-accent-gold))',
                      }}
                    />
                    <div className="profile-image-wrapper">
                      <div className="profile-image">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
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
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--color-math-blue)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '0.35rem',
                        }}
                      >
                        Member {String(member.memberNumber).padStart(2, '0')}
                      </div>

                      <p className="profile-name">{member.name}</p>

                      <p className="profile-position" style={{ color: 'var(--color-school-maroon)' }}>
                        {member.grade} {member.section ? `• ${member.section}` : ''}
                      </p>

                      <p className="profile-class" style={{ fontWeight: 600 }}>
                        {member.interestArea}
                      </p>

                      <p className="profile-bio">
                        {member.bio || 'Active participant in weekly mathematical circles, logic seminars, and school competitions.'}
                      </p>

                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--color-math-blue)',
                            background: 'rgba(37,99,235,0.08)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            border: '1px solid rgba(37,99,235,0.15)',
                          }}
                        >
                          {member.badge || 'Active Member'}
                        </span>

                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                            background: 'var(--color-light-bg)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            border: '1px solid var(--color-border-light)',
                          }}
                        >
                          Year: {member.joinedYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <AnimateOnScroll>
              <div className="empty-state">
                <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                  <UsersIcon size={48} color="var(--color-math-blue)" />
                </div>
                <h3>No Members Found</h3>
                <p>
                  No members match your current search or grade filter. Try selecting a different filter or clearing your search.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedGrade('all');
                    setSearchQuery('');
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  Reset Filters
                </button>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* =========================================================================
          MEMBERSHIP REGISTRATION & INFO CALLOUT
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div
              style={{
                maxWidth: '850px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, var(--color-math-navy) 0%, #172554 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-2xl)',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'rgba(217,119,6,0.15)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255,255,255,0.12)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-accent-gold)',
                    marginBottom: '1rem',
                  }}
                >
                  <CheckCircleIcon size={15} color="var(--color-accent-gold)" />
                  Join Our Mathematics Community
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '0.75rem' }}>
                  Interested in Becoming a Member?
                </h3>

                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Membership is open to all students of <strong>KM/KM/ Al-Ashraq MMV (National School)</strong> from Grade 6 to Grade 13.
                  Members participate in weekly problem-solving circles, mathematics exhibitions, logic workshops, and intra-school competitions.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircleIcon size={18} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                      Access to specialized study circles & Olympiad training
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircleIcon size={18} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                      Mentorship from mathematics faculty & student coordinators
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircleIcon size={18} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                      Certificate of participation in verified club activities
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/#contact"
                    className="btn btn-gold"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 700,
                    }}
                  >
                    Contact Secretary for Registration <ArrowRightIcon size={16} />
                  </Link>
                  <Link
                    href="/committee"
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.88rem',
                      textDecoration: 'underline',
                    }}
                  >
                    View Leadership Committee →
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* =========================================================================
          MEMBER DETAIL MODAL
          ========================================================================= */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>
                Member Profile — {selectedMember.name}
              </h3>
              <button
                className="modal-close"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                  className="profile-image"
                  style={{
                    width: '110px',
                    height: '110px',
                    margin: '0 auto 1rem',
                  }}
                >
                  {selectedMember.photo ? (
                    <Image
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      width={110}
                      height={110}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <AvatarPlaceholder size={110} />
                  )}
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--color-math-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.3rem',
                  }}
                >
                  Member {String(selectedMember.memberNumber).padStart(2, '0')}
                </div>

                <h3 style={{ marginBottom: '0.25rem' }}>{selectedMember.name}</h3>

                <p style={{ color: 'var(--color-school-maroon)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {selectedMember.grade} {selectedMember.section ? `(${selectedMember.section})` : ''}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Mathematical Focus & Passion
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  {selectedMember.interestArea}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Student Engagement Bio
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {selectedMember.bio || 'Active participant in weekly mathematical circles, logic seminars, and school competitions.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'var(--color-light-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                    Specialization Circle
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-math-blue)', fontWeight: 600, margin: 0 }}>
                    {selectedMember.badge || 'Active Member'}
                  </p>
                </div>

                <div
                  style={{
                    padding: '0.75rem',
                    background: 'var(--color-light-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                    Membership Year
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600, margin: 0 }}>
                    {selectedMember.joinedYear}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
