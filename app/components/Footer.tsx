'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  FacebookIcon,
  MapPinIcon,
  GlobeIcon,
  ExternalLinkIcon,
} from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div>
            <Image
              src="/images/logos/club-logo.png"
              alt="The Infinity Creators"
              width={60}
              height={60}
              className="footer-brand-logo"
            />
            <h3>The Infinity Creators</h3>
            <p style={{ marginBottom: '0.5rem' }}>
              MATH CLUB of KM/KM/ Al-Ashraq MMV (National School), Nintavur
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Established 2026 · Think. Explore. Solve. Create.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/vision-mission">Vision & Mission</Link>
              <Link href="/committee">Committee</Link>
              <Link href="/members">Members</Link>
              <Link href="/activities">Activities</Link>
              <Link href="/achievements">Achievements</Link>
            </div>
          </div>

          {/* More Links */}
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <Link href="/committee#teachers">Teachers & Mentors</Link>
              <Link href="/gallery">Gallery & Albums</Link>
              <Link href="/gallery?tab=showcase">Student Showcase</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/#contact">Contact Us</Link>
            </div>
          </div>

          {/* School Info */}
          <div>
            <h3>School</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Image
                src="/images/logos/school-logo.png"
                alt="School Logo"
                width={44}
                height={44}
                style={{ borderRadius: '8px', background: 'rgba(255,255,255,0.1)', padding: '4px' }}
              />
              <div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: 600 }}>
                  KM/KM/ Al-Ashraq MMV
                </p>
                <p style={{ fontSize: '0.75rem' }}>(National School)</p>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem' }}>Nintavur, Sri Lanka</p>
            <p style={{ fontSize: '0.8rem' }}>Estd: 1946</p>
          </div>
        </div>

        {/* Wedit Solutions Partner Showcase */}
        <div className="wedit-showcase-section">
          <div className="wedit-showcase-container">
            {/* Logo Outside of the Box - Big with Curved Edge */}
            <a
              href="https://wedit-website.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="wedit-outside-logo-card"
              title="Visit Wedit Solutions Website"
            >
              <div className="wedit-outside-logo-wrapper">
                <Image
                  src="/images/logos/wedit-logo.jpg"
                  alt="Wedit Solutions"
                  width={200}
                  height={80}
                  className="wedit-outside-logo-img"
                  priority
                />
              </div>
              <span className="wedit-badge">
                <GlobeIcon size={13} /> Official Technology Partner
              </span>
            </a>

            {/* The Contact Details Box */}
            <div className="wedit-contact-box">
              <div className="wedit-contact-header">
                <div>
                  <h4 className="wedit-title">Designed & Developed by Wedit Solutions</h4>
                  <p style={{ fontSize: '0.82rem', color: '#93C5FD', margin: '2px 0 6px 0', fontWeight: 500, letterSpacing: '0.2px' }}>
                    For your Digital solution websites &amp; apps feel free to contact us
                  </p>
                  <a
                    href="https://maps.google.com/?q=Main+Street+Oluvil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wedit-address-link"
                    title="View Location on Google Maps"
                  >
                    <MapPinIcon size={14} color="#60A5FA" />
                    <span>387/3, 5th Cross Lane, Main Street, Oluvil - 02</span>
                  </a>
                </div>

                {/* Direct Website Button */}
                <a
                  href="https://wedit-website.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wedit-visit-btn"
                  title="Open Wedit Solutions Website"
                >
                  <GlobeIcon size={14} />
                  <span>Visit Website</span>
                  <ExternalLinkIcon size={13} />
                </a>
              </div>

              {/* Interactive Contact Touch Navigation Chips */}
              <div className="wedit-links-grid">
                <a
                  href="tel:+9476867576"
                  className="wedit-chip"
                  title="Call Wedit Solutions at +94 76 867 576"
                >
                  <span className="wedit-chip-icon"><PhoneIcon size={14} /></span>
                  <span>+94 76 867 576</span>
                </a>

                <a
                  href="mailto:wedit2026@gmail.com"
                  className="wedit-chip"
                  title="Email Wedit Solutions at wedit2026@gmail.com"
                >
                  <span className="wedit-chip-icon"><MailIcon size={14} /></span>
                  <span>wedit2026@gmail.com</span>
                </a>

                <a
                  href="https://instagram.com/wedit_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wedit-chip"
                  title="Follow Wedit Solutions on Instagram"
                >
                  <span className="wedit-chip-icon"><InstagramIcon size={14} /></span>
                  <span>@wedit_official</span>
                </a>

                <a
                  href="https://facebook.com/wedit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wedit-chip"
                  title="Connect with Wedit Solutions on Facebook"
                >
                  <span className="wedit-chip-icon"><FacebookIcon size={14} /></span>
                  <span>wedit</span>
                </a>

                <a
                  href="https://wedit-website.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wedit-chip"
                  style={{ background: 'rgba(37,99,235,0.2)', borderColor: 'rgba(96,165,250,0.4)', color: '#93C5FD' }}
                  title="https://wedit-website.netlify.app"
                >
                  <span className="wedit-chip-icon"><GlobeIcon size={14} /></span>
                  <span>https://wedit-website.netlify.app</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} The Infinity Creators — MATH CLUB. All rights reserved.</p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            Empowering Mathematical Thinkers · KM/KM/ Al-Ashraq MMV (National School)
          </p>
        </div>
      </div>
    </footer>
  );
}
