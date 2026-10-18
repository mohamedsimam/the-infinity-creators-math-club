'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import {
  UsersIcon,
  BuildingIcon,
  TargetIcon,
  GraduationCapIcon,
  AwardIcon,
  BookOpenIcon,
  CloseIcon,
  AvatarPlaceholder,
} from '../components/Icons';
import type { ClubData, CommitteeMember, Coordinator, Teacher, Principal } from '../lib/data';

type ProfileType = Principal | Teacher | CommitteeMember | Coordinator;

export default function CommitteePage() {
  const [data, setData] = useState<ClubData | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const principals = data.principals || [];
  const principalHead = principals[0];
  const otherPrincipals = principals.slice(1);

  const teacherIncharges = data.teachers.slice(0, 3);
  const facultyTeachers = data.teachers.slice(3);

  return (
    <>
      <PageHero
        title="Committee & Leadership"
        subtitle="The school principals, teacher in-charges, faculty mentors, and student leaders of The Infinity Creators"
        badge="Leadership Directory"
        badgeIcon={<UsersIcon size={16} />}
      />

      {/* =========================================================================
          SECTION 1 (TOP): SCHOOL ADMINISTRATION & PATRONS
          ========================================================================= */}
      <section id="administration" className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><BuildingIcon size={16} /></span>
                School Administration
              </div>
              <h2 className="section-title">Patrons & School Leadership</h2>
              <p className="section-subtitle">
                The executive leadership of KM/KM/ Al-Ashraq MMV (National School) patronizing and guiding the club
              </p>
            </div>
          </AnimateOnScroll>

          {/* Featured Principal Card */}
          {principalHead && (
            <AnimateOnScroll delay={150}>
              <div
                style={{
                  maxWidth: '750px',
                  margin: '0 auto var(--space-2xl) auto',
                  background: 'var(--color-light-bg)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onClick={() => setSelectedProfile(principalHead)}
              >
                <div
                  style={{
                    height: '4px',
                    background: 'linear-gradient(135deg, var(--color-school-maroon), var(--color-accent-gold))',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xl)',
                    padding: 'var(--space-2xl)',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    className="profile-image"
                    style={{
                      width: '140px',
                      height: '140px',
                      flexShrink: 0,
                    }}
                  >
                    {principalHead.photo ? (
                      <Image
                        src={principalHead.photo}
                        alt={principalHead.name}
                        width={140}
                        height={140}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <AvatarPlaceholder size={140} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--color-school-maroon)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Chief Patron
                    </div>
                    <h3 style={{ marginBottom: '0.25rem' }}>{principalHead.name}</h3>
                    <p
                      style={{
                        color: 'var(--color-school-maroon)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {principalHead.designation}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      KM/KM/ Al-Ashraq MMV (National School), Nintavur
                    </p>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '0.35rem 0.85rem',
                        background: 'rgba(139,30,45,0.06)',
                        borderRadius: '999px',
                        border: '1px solid rgba(139,30,45,0.15)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-school-maroon)',
                      }}
                    >
                      {principalHead.role || 'Patron of The Infinity Creators MATH CLUB'}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* Deputy & Assistant Principals Grid */}
          <div className="grid-4" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            {otherPrincipals.map((admin, i) => (
              <AnimateOnScroll key={admin.id} delay={i * 80}>
                <div
                  className="profile-card"
                  onClick={() => setSelectedProfile(admin)}
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  <div
                    style={{
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--color-school-maroon), var(--color-accent-gold))',
                    }}
                  />
                  <div className="profile-image-wrapper">
                    <div className="profile-image">
                      {admin.photo ? (
                        <Image src={admin.photo} alt={admin.name} width={110} height={110} style={{ objectFit: 'cover' }} />
                      ) : (
                        <AvatarPlaceholder size={110} />
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="profile-name" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{admin.name}</p>
                    <p className="profile-position" style={{ color: 'var(--color-school-maroon)', fontWeight: 600 }}>
                      {admin.designation}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.4rem', lineHeight: 1.5 }}>
                      {admin.role}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MATH CLUB TEACHER LEADERSHIP & INCHARGES
          ========================================================================= */}
      <section id="incharges" className="section math-grid-medium">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><AwardIcon size={16} /></span>
                Teacher In-Charges & Coordinator
              </div>
              <h2 className="section-title">Teacher Incharge & Mentors</h2>
              <p className="section-subtitle">
                The academic supervisors directly leading and advising The Infinity Creators Math Club
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {teacherIncharges.map((incharge, i) => (
              <AnimateOnScroll key={incharge.id} delay={i * 90}>
                <div
                  className="profile-card profile-card-featured"
                  onClick={() => setSelectedProfile(incharge)}
                  style={{ cursor: 'pointer', height: '100%' }}
                >
                  <div
                    style={{
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--color-math-blue), var(--color-school-maroon))',
                    }}
                  />
                  <div className="profile-image-wrapper">
                    <div className="profile-image">
                      {incharge.photo ? (
                        <Image src={incharge.photo} alt={incharge.name} width={110} height={110} style={{ objectFit: 'cover' }} />
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
                      {incharge.designation}
                    </div>
                    <p className="profile-name" style={{ fontSize: '1.05rem' }}>{incharge.name}</p>
                    <p className="profile-position" style={{ color: 'var(--color-school-maroon)' }}>
                      {incharge.subject}
                    </p>
                    <p className="profile-bio" style={{ fontSize: '0.86rem' }}>
                      {incharge.introduction}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
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
                        {incharge.role}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MATHEMATICS FACULTY (8 TEACHERS - 2 BY 4 BOXES)
          ========================================================================= */}
      <section id="teachers" className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><GraduationCapIcon size={16} /></span>
                8 Mathematics Teachers
              </div>
              <h2 className="section-title">Mathematics Faculty Directory</h2>
              <p className="section-subtitle">
                The 8 dedicated educators teaching, guiding, and mentoring students across KM/KM/ Al-Ashraq MMV
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {facultyTeachers.map((teacher, i) => (
              <AnimateOnScroll key={teacher.id} delay={(i % 4) * 80}>
                <div
                  className="profile-card"
                  onClick={() => setSelectedProfile(teacher)}
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
                      {teacher.photo ? (
                        <Image
                          src={teacher.photo}
                          alt={teacher.name}
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
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Maths Teacher {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="profile-name">{teacher.name}</p>
                    <p className="profile-position" style={{ color: 'var(--color-school-maroon)' }}>
                      {teacher.designation}
                    </p>
                    <p className="profile-class">{teacher.subject}</p>
                    <p className="profile-bio">
                      {teacher.introduction}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--color-math-blue)',
                          background: 'rgba(37,99,235,0.06)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          border: '1px solid rgba(37,99,235,0.15)',
                        }}
                      >
                        {teacher.role}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXECUTIVE COMMITTEE OFFICERS
          ========================================================================= */}
      <section className="section math-grid-medium">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><UsersIcon size={16} /></span>
                Executive Committee
              </div>
              <h2 className="section-title">Executive Committee Officers</h2>
              <p className="section-subtitle">
                The primary student leadership body responsible for managing and advancing club initiatives
              </p>
            </div>
          </AnimateOnScroll>

          <div className="committee-grid">
            {data.committee.map((member, i) => (
              <AnimateOnScroll key={member.id} delay={i * 80}>
                <div
                  className="profile-card profile-card-featured"
                  onClick={() => setSelectedProfile(member)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="profile-image-wrapper">
                    <div className="profile-image">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name || member.position}
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
                    <p className="profile-name">{member.name || member.position}</p>
                    <p className="profile-position">{member.position}</p>
                    <p className="profile-class">{member.classGrade || 'Grade / Section'}</p>
                    <p className="profile-bio">
                      {member.bio || member.responsibilities || 'Official committee portfolio.'}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-light-bg)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          border: '1px solid var(--color-border-light)',
                        }}
                      >
                        Term: {member.term}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE SEVEN COORDINATORS (4 IN TOP ROW, 3 IN CENTERED BOTTOM ROW)
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-icon"><TargetIcon size={16} /></span>
                Coordinators
              </div>
              <h2 className="section-title">Our Seven Coordinators</h2>
              <p className="section-subtitle">
                The operational coordinators managing specialized academic and organizational portfolios
              </p>
            </div>
          </AnimateOnScroll>

          <div className="coordinators-layout">
            {/* First Row: 4 Cards */}
            <div className="coordinators-row-4">
              {data.coordinators.slice(0, 4).map((coord, i) => (
                <AnimateOnScroll key={coord.id} delay={i * 70}>
                  <div
                    className="profile-card"
                    onClick={() => setSelectedProfile(coord)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        height: '3px',
                        background: 'var(--gradient-primary)',
                      }}
                    />
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
                      <p className="profile-bio">
                        {coord.bio || 'Managing dedicated projects, workshops, and mathematical student initiatives.'}
                      </p>
                      <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                            background: 'var(--color-light-bg)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            border: '1px solid var(--color-border-light)',
                          }}
                        >
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
                  <div
                    className="profile-card"
                    onClick={() => setSelectedProfile(coord)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        height: '3px',
                        background: 'var(--gradient-primary)',
                      }}
                    />
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
                      <p className="profile-bio">
                        {coord.bio || 'Managing dedicated projects, workshops, and mathematical student initiatives.'}
                      </p>
                      <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                            background: 'var(--color-light-bg)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            border: '1px solid var(--color-border-light)',
                          }}
                        >
                          Year: {coord.academicYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          UNIFIED PROFILE DETAIL MODAL
          ========================================================================= */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>
                {selectedProfile.name ||
                  ('designation' in selectedProfile
                    ? selectedProfile.designation
                    : 'position' in selectedProfile
                    ? selectedProfile.position
                    : 'Coordinator')}
              </h3>
              <button
                className="modal-close"
                onClick={() => setSelectedProfile(null)}
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
                  {selectedProfile.photo ? (
                    <Image
                      src={selectedProfile.photo}
                      alt={selectedProfile.name || 'Profile'}
                      width={110}
                      height={110}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <AvatarPlaceholder size={110} />
                  )}
                </div>
                <h3>{selectedProfile.name || 'Member Profile'}</h3>
                <p style={{ color: 'var(--color-math-blue)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {'designation' in selectedProfile
                    ? selectedProfile.designation
                    : 'position' in selectedProfile
                    ? selectedProfile.position
                    : 'Coordinator'}
                </p>
                {'subject' in selectedProfile && selectedProfile.subject && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                    {selectedProfile.subject}
                  </p>
                )}
              </div>

              {'classGrade' in selectedProfile && selectedProfile.classGrade && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Class / Grade</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProfile.classGrade}</p>
                </div>
              )}

              {'bio' in selectedProfile && selectedProfile.bio && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Biography</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProfile.bio}</p>
                </div>
              )}

              {'introduction' in selectedProfile && selectedProfile.introduction && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Introduction</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProfile.introduction}</p>
                </div>
              )}

              {'role' in selectedProfile && selectedProfile.role && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Role / Responsibilities</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProfile.role}</p>
                </div>
              )}

              {'responsibilities' in selectedProfile && selectedProfile.responsibilities && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Responsibilities</p>
                  <p style={{ fontSize: '0.9rem' }}>{selectedProfile.responsibilities}</p>
                </div>
              )}

              {('term' in selectedProfile || 'academicYear' in selectedProfile) && (
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Academic Tenure</p>
                  <p style={{ fontSize: '0.9rem' }}>
                    {'term' in selectedProfile ? selectedProfile.term : (selectedProfile as Coordinator).academicYear}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
