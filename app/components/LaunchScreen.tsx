'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const LOG_MESSAGES = [
  { time: '0.12s', text: '[SYS] Initializing Quantum Academic Core v2.6...' },
  { time: '0.38s', text: '[RADAR] Surveillance Radar Locked: Sector Al-Ashraq MMV...' },
  { time: '0.65s', text: '[AUTH] Dignitary & Guest Credentials Verified. Access Granted.' },
  { time: '0.92s', text: '[CHRONO] Synchronizing Atomic Clock & Encryption Hash...' },
  { time: '1.24s', text: '[MATH] Calibrating Euler Matrix & Fibonacci Sequences (π, e, ∞)...' },
  { time: '1.58s', text: '[DATA] Synchronizing 150+ Student & Faculty Portfolios...' },
  { time: '1.92s', text: '[VAULT] Decrypting Mathematics Knowledge Base & Archives...' },
  { time: '2.25s', text: '[READY] All Telemetry Nominal. Main Propulsion Engaging...' },
  { time: '2.60s', text: '[LAUNCH] OFFICIAL PORTAL OPENED — WELCOME TO THE INFINITY CREATORS!' },
];

export default function LaunchScreen() {
  const [mounted, setMounted] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState<{ time: string; text: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [tickerMs, setTickerMs] = useState(3800);
  const [radarAngle, setRadarAngle] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // High-tech sound effects synthesizer using Web Audio API
  const playSound = (freq = 440, type: OscillatorType = 'sine', duration = 0.08, gainVal = 0.1) => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const playTick = () => {
    playSound(880, 'square', 0.04, 0.06);
  };

  const playFanfare = () => {
    if (!audioEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => playSound(freq, 'triangle', 0.45, 0.18), idx * 80);
    });
  };

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Time ticking and radar surveillance animation loop during launch
  useEffect(() => {
    if (!isLaunching || isCompleted) return;

    const radarTimer = setInterval(() => {
      setRadarAngle((prev) => (prev + 8) % 360);
    }, 25);

    const clockTimer = setInterval(() => {
      setTickerMs((prev) => {
        if (prev <= 10) return 0;
        return prev - 25;
      });
    }, 25);

    const audioTickTimer = setInterval(() => {
      playTick();
    }, 180);

    return () => {
      clearInterval(radarTimer);
      clearInterval(clockTimer);
      clearInterval(audioTickTimer);
    };
  }, [isLaunching, isCompleted]);

  const handleStartLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    playSound(587.33, 'sine', 0.2, 0.25);

    let currentLogIndex = 0;
    const totalLogs = LOG_MESSAGES.length;

    const interval = setInterval(() => {
      if (currentLogIndex < totalLogs) {
        const nextLog = LOG_MESSAGES[currentLogIndex];
        setLogs((prev) => [...prev, nextLog]);
        setProgress(Math.round(((currentLogIndex + 1) / totalLogs) * 100));
        playSound(420 + currentLogIndex * 65, 'sine', 0.09, 0.1);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        playFanfare();
        setTimeout(() => {
          setIsCompleted(true);
          document.body.style.overflow = '';
        }, 750);
      }
    }, 290);
  };

  const handleSkip = () => {
    setIsCompleted(true);
    document.body.style.overflow = '';
  };

  if (!mounted || isCompleted) return null;

  // Format millisecond timer: T-00:03.450
  const seconds = Math.floor(tickerMs / 1000);
  const remainingMs = tickerMs % 1000;
  const formattedCountdown = `T-00:0${seconds}.${remainingMs.toString().padStart(3, '0')}`;

  return (
    <div className={`launch-overlay ${isLaunching && progress === 100 ? 'launch-fade-out' : ''}`}>
      {/* Background Animated Cyber-Mathematical Grid */}
      <div className="launch-grid-bg" />
      <div className="launch-radial-glow" />

      {/* Floating Mathematical Constants in Blur Space */}
      <div className="launch-floating-symbols">
        <span style={{ top: '10%', left: '7%', animationDelay: '0s' }}>∞</span>
        <span style={{ top: '18%', right: '9%', animationDelay: '1s' }}>∑</span>
        <span style={{ bottom: '15%', left: '10%', animationDelay: '2s' }}>π ≈ 3.14159</span>
        <span style={{ bottom: '22%', right: '12%', animationDelay: '1.5s' }}>e^iπ + 1 = 0</span>
        <span style={{ top: '48%', left: '3%', animationDelay: '0.8s' }}>lim(x→∞)</span>
        <span style={{ top: '55%', right: '4%', animationDelay: '2.5s' }}>∫ f(x)dx</span>
        <span style={{ bottom: '6%', right: '35%', animationDelay: '3s' }}>∇ × B = μ₀J</span>
        <span style={{ top: '6%', left: '38%', animationDelay: '1.8s' }}>φ = 1.618</span>
      </div>

      {/* Corner Technical Crosshairs & HUD Elements */}
      <div className="launch-hud-corner hud-tl">
        <span className="hud-label">SURVEILLANCE SECTOR: 07-AL-ASHRAQ</span>
        <span className="hud-code">STATUS: {isLaunching ? 'SYSTEMS_CALIBRATING' : 'READY_TO_LAUNCH'}</span>
      </div>
      <div className="launch-hud-corner hud-tr">
        <span className="hud-label">AL-ASHRAQ MMV (NATIONAL SCHOOL)</span>
        <span className="hud-code">AUTHORIZATION: DIGNITARY_KEY_ACTIVE</span>
      </div>
      <div className="launch-hud-corner hud-bl">
        <span className="hud-label">DEPARTMENT: MATHEMATICS &amp; STEM</span>
        <span className="hud-code">CHRONO: {formattedCountdown}</span>
      </div>
      <div className="launch-hud-corner hud-br">
        <button
          onClick={handleSkip}
          className="launch-skip-btn"
          title="Directly enter website"
        >
          Skip Intro →
        </button>
      </div>

      {/* Center Main Modal Container */}
      <div className="launch-content-container">
        {/* Dual Crest Header: School & Math Club Logos */}
        <div className="launch-logos-header">
          <div className="launch-logo-card">
            <Image
              src="/images/logos/school-logo.png"
              alt="KM/KM/ Al-Ashraq MMV"
              width={76}
              height={76}
              className="launch-logo-img"
              priority
            />
            <span className="launch-logo-sub">School Crest</span>
          </div>

          <div className="launch-infinity-nexus">
            <div className="nexus-pulse" />
            <span className="nexus-symbol">∞</span>
          </div>

          <div className="launch-logo-card">
            <Image
              src="/images/logos/club-logo.png"
              alt="The Infinity Creators MATH CLUB"
              width={76}
              height={76}
              className="launch-logo-img"
              priority
            />
            <span className="launch-logo-sub">Math Club</span>
          </div>
        </div>

        {/* Institution Titles */}
        <div className="launch-titles">
          <div className="launch-institution-badge">
            <span className="badge-glow-dot" />
            KM/KM/ Al-Ashraq MMV (National School) · Nintavur
          </div>

          <h1 className="launch-main-title">
            THE INFINITY CREATORS
          </h1>
          <div className="launch-sub-title">
            OFFICIAL WEB PORTAL LAUNCH CEREMONY
          </div>
          <p className="launch-motto">
            “ Think. Explore. Solve. Create. ”
          </p>
        </div>

        {/* Launch Actions or Live Terminal Console */}
        {!isLaunching ? (
          <div className="launch-action-wrapper">
            <button
              onClick={handleStartLaunch}
              className="launch-prime-btn"
              aria-label="Launch Website"
            >
              <span className="btn-glow-ring" />
              <span className="btn-icon">🚀</span>
              <span className="btn-text">
                <span className="btn-heading">INITIALIZE OFFICIAL LAUNCH</span>
                <span className="btn-subtext">Click to Inaugurate Web Portal</span>
              </span>
              <span className="btn-arrow">➔</span>
            </button>

            <div className="launch-sound-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(e) => setAudioEnabled(e.target.checked)}
                />
                <span>Ceremonial Audio Effects {audioEnabled ? 'Active (ON)' : 'Muted (OFF)'}</span>
              </label>
            </div>
          </div>
        ) : (
          /* High-Tech Terminal & Time Ticking Surveillance Radar Console */
          <div className="launch-active-dashboard">
            {/* Surveillance Radar & Chronometer HUD Header */}
            <div className="surveillance-hud-bar">
              {/* Animated Surveillance Radar */}
              <div className="radar-scanner-box">
                <div className="radar-circle">
                  <div
                    className="radar-beam"
                    style={{ transform: `rotate(${radarAngle}deg)` }}
                  />
                  <div className="radar-crosshair-x" />
                  <div className="radar-crosshair-y" />
                  <div className="radar-ping" />
                  <div className="radar-blip blip-1" />
                  <div className="radar-blip blip-2" />
                </div>
                <div className="radar-telemetry">
                  <span className="telemetry-label">SURVEILLANCE RADAR</span>
                  <span className="telemetry-status">TARGET LOCKED · {radarAngle.toString().padStart(3, '0')}°</span>
                </div>
              </div>

              {/* High-Precision Mission Countdown Chronometer */}
              <div className="chrono-clock-box">
                <div className="chrono-header">
                  <span className="chrono-pulse-dot" />
                  <span>COUNTDOWN TO PORTAL RELEASE</span>
                </div>
                <div className="chrono-time-display">
                  {formattedCountdown}
                </div>
                <div className="chrono-sub">
                  ATOMIC TIME SYNC · ACCURACY 99.99%
                </div>
              </div>

              {/* Equalizer Frequency Signal Bars */}
              <div className="signal-spectrum-box">
                <div className="spectrum-bars">
                  <span className="bar b1" />
                  <span className="bar b2" />
                  <span className="bar b3" />
                  <span className="bar b4" />
                  <span className="bar b5" />
                  <span className="bar b6" />
                </div>
                <span className="spectrum-label">FREQ: 1420.405 MHz</span>
              </div>
            </div>

            {/* Terminal Deployment Console */}
            <div className="launch-terminal-box">
              <div className="terminal-topbar">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="terminal-title">DEPLOYMENT_TELEMETRY.LOG — 2026</span>
                <span className="terminal-percent">{progress}%</span>
              </div>

              {/* Glowing Progress Track */}
              <div className="terminal-progress-track">
                <div
                  className="terminal-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Terminal Feed Lines */}
              <div className="terminal-feed">
                {logs.map((item, idx) => (
                  <div key={idx} className="terminal-line">
                    <span className="line-time">[{item.time}]</span>
                    <span className="line-text">{item.text}</span>
                  </div>
                ))}
                {progress < 100 && (
                  <div className="terminal-cursor-line">
                    <span className="blinking-cursor">█</span>
                  </div>
                )}
              </div>

              {progress === 100 && (
                <div className="terminal-complete-banner">
                  <span className="confetti-emoji">🎉</span>
                  <span>LAUNCH COMPLETE — WELCOME TO THE INFINITY CREATORS!</span>
                  <span className="confetti-emoji">✨</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .launch-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 25, 47, 0.88);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          overflow-y: auto;
          padding: 1.5rem;
          color: #ffffff;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
        }

        .launch-fade-out {
          opacity: 0;
          transform: scale(1.06);
          filter: blur(20px);
          pointer-events: none;
        }

        /* Cyber grid background */
        .launch-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
          animation: gridPan 60s linear infinite;
        }

        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 400px 400px; }
        }

        .launch-radial-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, rgba(37, 99, 235, 0.28) 0%, rgba(139, 30, 45, 0.18) 45%, rgba(10, 25, 47, 0.95) 85%);
          pointer-events: none;
          z-index: 0;
        }

        /* Floating math symbols */
        .launch-floating-symbols span {
          position: absolute;
          color: rgba(147, 197, 253, 0.22);
          font-family: 'Space Grotesk', monospace;
          font-weight: 700;
          font-size: clamp(1rem, 2vw, 1.8rem);
          pointer-events: none;
          animation: floatSymbol 8s ease-in-out infinite;
          user-select: none;
          z-index: 1;
        }

        @keyframes floatSymbol {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(4deg); opacity: 0.45; }
        }

        /* Corner HUD telemetry */
        .launch-hud-corner {
          position: absolute;
          padding: 1rem 1.5rem;
          font-family: monospace;
          font-size: 0.68rem;
          color: rgba(147, 197, 253, 0.65);
          letter-spacing: 1px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 2;
          pointer-events: none;
        }

        .hud-tl { top: 0; left: 0; border-top: 2px solid rgba(56, 189, 248, 0.4); border-left: 2px solid rgba(56, 189, 248, 0.4); }
        .hud-tr { top: 0; right: 0; text-align: right; border-top: 2px solid rgba(244, 185, 66, 0.4); border-right: 2px solid rgba(244, 185, 66, 0.4); }
        .hud-bl { bottom: 0; left: 0; border-bottom: 2px solid rgba(56, 189, 248, 0.4); border-left: 2px solid rgba(56, 189, 248, 0.4); }
        .hud-br { bottom: 0; right: 0; pointer-events: auto; }

        .launch-skip-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .launch-skip-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        /* Center Card */
        .launch-content-container {
          position: relative;
          z-index: 10;
          max-width: 800px;
          width: 100%;
          background: rgba(15, 23, 42, 0.78);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55), 0 0 50px rgba(37, 99, 235, 0.25);
          border-radius: 28px;
          padding: clamp(1.5rem, 4vw, 2.75rem);
          text-align: center;
          margin: auto;
          backdrop-filter: blur(16px);
        }

        /* Logos Header */
        .launch-logos-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .launch-logo-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        :global(.launch-logo-img) {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
          padding: 5px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 16px rgba(56, 189, 248, 0.4);
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .launch-logo-sub {
          font-size: 0.68rem;
          font-weight: 600;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .launch-infinity-nexus {
          position: relative;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nexus-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 185, 66, 0.4) 0%, transparent 70%);
          animation: pulseNexus 2.5s infinite;
        }

        @keyframes pulseNexus {
          0%, 100% { transform: scale(0.9); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0.9; }
        }

        .nexus-symbol {
          font-size: 2.6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #F4B942, #38BDF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        /* Institution Badges & Titles */
        .launch-institution-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          background: rgba(139, 30, 45, 0.35);
          border: 1px solid rgba(244, 185, 66, 0.4);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #FDE68A;
          margin-bottom: 0.75rem;
          letter-spacing: 0.3px;
        }

        .badge-glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #F4B942;
          box-shadow: 0 0 10px #F4B942;
          animation: blinkDot 1.4s infinite;
        }

        @keyframes blinkDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .launch-main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: 1.5px;
          margin: 0;
          line-height: 1.15;
          background: linear-gradient(135deg, #FFFFFF 0%, #BAE6FD 50%, #38BDF8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(56, 189, 248, 0.4);
        }

        .launch-sub-title {
          font-size: clamp(0.85rem, 1.8vw, 1.1rem);
          font-weight: 700;
          color: #F4B942;
          letter-spacing: 2px;
          margin-top: 0.35rem;
          text-transform: uppercase;
        }

        .launch-motto {
          font-style: italic;
          color: #94A3B8;
          font-size: 0.92rem;
          margin: 0.4rem 0 1.5rem 0;
        }

        /* Launch Button */
        .launch-action-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .launch-prime-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          padding: 1.25rem 2.75rem;
          background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0284C7 100%);
          border: 2px solid rgba(244, 185, 66, 0.6);
          border-radius: 999px;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.55), 0 0 30px rgba(244, 185, 66, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .launch-prime-btn:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: #F4B942;
          box-shadow: 0 16px 50px rgba(37, 99, 235, 0.7), 0 0 40px rgba(244, 185, 66, 0.6);
        }

        .launch-prime-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .btn-glow-ring {
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          background: linear-gradient(90deg, #F4B942, #38BDF8, #8B1E2D, #F4B942);
          background-size: 300% 300%;
          animation: ringGlow 4s linear infinite;
          opacity: 0.45;
          z-index: 0;
        }

        @keyframes ringGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .btn-icon {
          font-size: 2rem;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          animation: rocketShake 3s ease-in-out infinite;
        }

        @keyframes rocketShake {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(4deg); }
        }

        .btn-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: relative;
          z-index: 1;
        }

        .btn-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.12rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ffffff;
        }

        .btn-subtext {
          font-size: 0.75rem;
          color: #FDE68A;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .btn-arrow {
          font-size: 1.4rem;
          color: #F4B942;
          position: relative;
          z-index: 1;
          transition: transform 0.2s ease;
        }

        .launch-prime-btn:hover .btn-arrow {
          transform: translateX(6px);
        }

        .launch-sound-toggle {
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .launch-sound-toggle label {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
        }

        /* Active Dashboard */
        .launch-active-dashboard {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Surveillance HUD Bar */
        .surveillance-hud-bar {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1fr;
          gap: 1rem;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 18px;
          padding: 1rem;
          align-items: center;
        }

        /* Radar Box */
        .radar-scanner-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .radar-circle {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1.5px solid rgba(56, 189, 248, 0.6);
          background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.8) 70%);
          overflow: hidden;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
          flex-shrink: 0;
        }

        .radar-crosshair-x {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(56, 189, 248, 0.3);
        }

        .radar-crosshair-y {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(56, 189, 248, 0.3);
        }

        .radar-beam {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 50%;
          transform-origin: 0% 100%;
          background: linear-gradient(45deg, rgba(56, 189, 248, 0.8) 0%, transparent 70%);
          filter: drop-shadow(0 0 6px #38BDF8);
        }

        .radar-ping {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px dashed rgba(56, 189, 248, 0.4);
        }

        .radar-blip {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F4B942;
          box-shadow: 0 0 8px #F4B942;
          animation: blipFade 1.6s infinite;
        }

        .blip-1 { top: 15px; left: 32px; }
        .blip-2 { bottom: 12px; left: 16px; animation-delay: 0.8s; }

        @keyframes blipFade {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .radar-telemetry {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .telemetry-label {
          font-family: monospace;
          font-size: 0.65rem;
          color: #94A3B8;
          letter-spacing: 0.8px;
        }

        .telemetry-status {
          font-family: monospace;
          font-size: 0.76rem;
          font-weight: 700;
          color: #38BDF8;
        }

        /* Chrono Box */
        .chrono-clock-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 0.5rem;
        }

        .chrono-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: monospace;
          font-size: 0.65rem;
          color: #F4B942;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .chrono-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #EF4444;
          box-shadow: 0 0 8px #EF4444;
          animation: blinkDot 0.8s infinite;
        }

        .chrono-time-display {
          font-family: 'Space Grotesk', 'Courier New', monospace;
          font-size: 1.55rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 2px;
          text-shadow: 0 0 15px rgba(56, 189, 248, 0.6);
          line-height: 1.2;
          margin: 2px 0;
        }

        .chrono-sub {
          font-size: 0.62rem;
          color: #94A3B8;
          font-family: monospace;
          letter-spacing: 0.5px;
        }

        /* Signal Spectrum Box */
        .signal-spectrum-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.4rem;
        }

        .spectrum-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 28px;
        }

        .spectrum-bars .bar {
          width: 6px;
          border-radius: 2px;
          background: linear-gradient(180deg, #38BDF8, #1D4ED8);
          animation: eqDance 0.8s ease-in-out infinite alternate;
        }

        .b1 { height: 12px; animation-delay: 0.1s; }
        .b2 { height: 22px; animation-delay: 0.3s; }
        .b3 { height: 16px; animation-delay: 0.15s; }
        .b4 { height: 26px; animation-delay: 0.45s; }
        .b5 { height: 18px; animation-delay: 0.25s; }
        .b6 { height: 14px; animation-delay: 0.35s; }

        @keyframes eqDance {
          0% { height: 8px; }
          100% { height: 26px; }
        }

        .spectrum-label {
          font-family: monospace;
          font-size: 0.62rem;
          color: #94A3B8;
        }

        /* Terminal Logs Console */
        .launch-terminal-box {
          background: #090D16;
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(37, 99, 235, 0.15);
          text-align: left;
        }

        .terminal-topbar {
          background: #111827;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red { background: #EF4444; }
        .dot.yellow { background: #F59E0B; }
        .dot.green { background: #10B981; }

        .terminal-title {
          font-family: monospace;
          font-size: 0.72rem;
          color: #94A3B8;
          letter-spacing: 1px;
        }

        .terminal-percent {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #38BDF8;
        }

        .terminal-progress-track {
          width: 100%;
          height: 5px;
          background: #1E293B;
        }

        .terminal-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563EB, #38BDF8, #F4B942);
          transition: width 0.25s ease-out;
        }

        .terminal-feed {
          padding: 1rem 1.25rem;
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: 0.82rem;
          min-height: 150px;
          max-height: 220px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .terminal-line {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          line-height: 1.45;
        }

        .line-time {
          color: #64748B;
          flex-shrink: 0;
        }

        .line-text {
          color: #E2E8F0;
        }

        .terminal-line:last-child .line-text {
          color: #38BDF8;
          font-weight: 600;
        }

        .terminal-cursor-line {
          color: #38BDF8;
          animation: blinkCursor 0.8s infinite;
        }

        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .terminal-complete-banner {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.25), rgba(37, 99, 235, 0.25));
          border-top: 1px solid rgba(16, 185, 129, 0.4);
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: #34D399;
          letter-spacing: 0.5px;
          text-align: center;
        }

        /* Mobile Adjustments */
        @media (max-width: 700px) {
          .launch-overlay {
            padding: 1rem;
          }

          .launch-content-container {
            padding: 1.5rem 1rem;
            border-radius: 20px;
          }

          .launch-hud-corner {
            display: none;
          }

          .hud-br {
            display: block;
            top: 10px;
            right: 10px;
            bottom: auto;
            padding: 0;
          }

          .launch-logos-header {
            gap: 0.85rem;
          }

          .launch-prime-btn {
            width: 100%;
            padding: 1rem 1.25rem;
            gap: 0.75rem;
          }

          .btn-heading {
            font-size: 0.95rem;
          }

          .surveillance-hud-bar {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            text-align: center;
          }

          .radar-scanner-box,
          .signal-spectrum-box {
            justify-content: center;
            align-items: center;
          }

          .terminal-feed {
            font-size: 0.74rem;
          }
        }
      `}</style>
    </div>
  );
}
