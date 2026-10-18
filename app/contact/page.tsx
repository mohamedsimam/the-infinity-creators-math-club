'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import { MailIcon, BuildingIcon, CalendarIcon, MapPinIcon } from '../components/Icons';

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with The Infinity Creators MATH CLUB"
        badge="Contact"
        badgeIcon={<MailIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="grid-2">
            {/* Club Contact */}
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
                    <p style={{ fontSize: '0.8rem' }}>MATH CLUB</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BuildingIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>School</p>
                      <p style={{ fontSize: '0.85rem' }}>KM/KM/ Al-Ashraq MMV (National School)</p>
                      <p style={{ fontSize: '0.85rem' }}>Nintavur, Sri Lanka</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MailIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Official Inquiries</p>
                      <p style={{ fontSize: '0.85rem' }}>Contact through school administration</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CalendarIcon size={20} color="var(--color-math-blue)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Meeting Times</p>
                      <p style={{ fontSize: '0.85rem' }}>Scheduled during designated club activity periods</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* School Information */}
            <AnimateOnScroll delay={200}>
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
                    <p style={{ fontSize: '0.8rem' }}>(National School)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPinIcon size={20} color="var(--color-school-maroon)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Location</p>
                      <p style={{ fontSize: '0.85rem' }}>Nintavur, Sri Lanka</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div className="contact-icon" style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CalendarIcon size={20} color="var(--color-school-maroon)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>School Founded</p>
                      <p style={{ fontSize: '0.85rem' }}>1946</p>
                    </div>
                  </div>

                  <div style={{
                    marginTop: 'var(--space-sm)',
                    padding: 'var(--space-md)', background: 'rgba(139,30,45,0.04)',
                    borderRadius: 'var(--radius-md)', border: '1px solid rgba(139,30,45,0.1)',
                  }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      For official inquiries regarding The Infinity Creators MATH CLUB,
                      please contact the school administration or the Teacher-in-Charge.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick Links */}
          <AnimateOnScroll delay={400}>
            <div style={{
              marginTop: 'var(--space-2xl)',
              background: 'var(--color-light-bg)', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)', border: '1px solid var(--color-border-light)',
              textAlign: 'center',
            }}>
              <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1.2rem' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                {[
                  { label: 'About the Club', href: '/about' },
                  { label: 'Our Committee', href: '/committee' },
                  { label: 'Activities', href: '/activities' },
                  { label: 'Achievements', href: '/achievements' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Documents', href: '/documents' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="btn btn-secondary btn-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
