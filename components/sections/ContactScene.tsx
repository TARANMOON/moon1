'use client';

import React, { useState } from 'react';
import { TELEMETRY_CONSTANTS } from '@/lib/data/portfolioData';
import { Check, Copy, Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';

interface ContactSceneProps {
  progress: number;
}

export const ContactScene: React.FC<ContactSceneProps> = ({ progress }) => {
  const [copied, setCopied] = useState(false);

  // Visible between 0.88 and 1.00
  let opacity = 0;
  if (progress >= 0.88) {
    opacity = Math.min(1, (progress - 0.88) / 0.06);
  }

  if (opacity <= 0) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(TELEMETRY_CONSTANTS.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      className="fixed inset-0 flex flex-col justify-center items-center px-6 md:px-16 py-20 z-20 transition-opacity duration-300 pointer-events-auto"
      style={{ opacity }}
    >
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-lunar-cyan uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-lunar-cyan animate-ping" />
          COMMENCE TRANSMISSION
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
          Establish Contact
        </h2>

        <p className="text-xs sm:text-sm text-lunar-slate max-w-md mx-auto leading-relaxed">
          Available for select architecture consulting, high-impact creative engineering, and spatial interface leadership.
        </p>

        {/* Terminal transmission interactive box */}
        <div className="lunar-card p-6 rounded-xl text-left space-y-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between text-[11px] font-mono text-lunar-muted border-b border-white/10 pb-3">
            <span>TERMINAL // COMMS_ACTIVE</span>
            <span className="text-emerald-400">ENCRYPTION: {TELEMETRY_CONSTANTS.encryption}</span>
          </div>

          <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-white">
              <Mail className="w-4 h-4 text-lunar-cyan" />
              <span>{TELEMETRY_CONSTANTS.contactEmail}</span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Social Transmission Links */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
            <a
              href={TELEMETRY_CONSTANTS.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center gap-2 text-lunar-slate hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
            <a
              href={TELEMETRY_CONSTANTS.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center gap-2 text-lunar-slate hover:text-white transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X // TWITTER</span>
            </a>
            <a
              href={TELEMETRY_CONSTANTS.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center gap-2 text-lunar-slate hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
          </div>
        </div>

        {/* Footer mission attribution */}
        <div className="text-[10px] font-mono text-lunar-muted pt-4">
          TARAN MOON &copy; {new Date().getFullYear()} — LUNAR CINEMATIC SYSTEM // BUILT WITH NEXT.JS & CANVAS
        </div>
      </div>
    </section>
  );
};
