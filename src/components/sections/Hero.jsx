import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import Container from "../common/Container";
import { useProfileContext } from "../../contexts/ProfileContext";

const Hero = () => {
  const { profile, loading, error } = useProfileContext();

  /* -------------------------------------------------------------------------- */
  /* LOADING STATE */
  /* -------------------------------------------------------------------------- */

  if (loading) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <HeroBackground />

        <Container className="relative z-10">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded bg-white/10" />

            <div className="mt-8 h-16 max-w-3xl rounded bg-white/10 sm:h-24" />

            <div className="mt-4 h-10 max-w-2xl rounded bg-white/5" />

            <div className="mt-8 h-20 max-w-2xl rounded bg-white/5" />
          </div>
        </Container>
      </section>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* ERROR STATE */
  /* -------------------------------------------------------------------------- */

  if (error || !profile) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <HeroBackground />

        <Container className="relative z-10">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-3 py-1.5 text-xs text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Portfolio unavailable
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Unable to load profile.
            </h1>

            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Please check your Supabase profile configuration
              and try again.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-32 sm:pt-36"
    >
      <HeroBackground />

      <Container className="relative z-10">
        <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center pb-20">

          {/* ---------------------------------------------------------------- */}
          {/* TOP META */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            {/* Availability */}

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[11px] font-medium tracking-wide text-emerald-300/80">
                {profile.availability_label ||
                  profile.availability ||
                  "Available for opportunities"}
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <span className="font-mono text-[11px] tracking-wide text-[var(--text)]/25">
              SOFTWARE • AI/ML
            </span>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* INTRO */}
          {/* ---------------------------------------------------------------- */}

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--text)]/30"
          >
            Hello, I'm
          </motion.p>

          {/* ---------------------------------------------------------------- */}
          {/* NAME */}
          {/* ---------------------------------------------------------------- */}

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-6xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-[var(--text)]"
          >
            {profile.name || "Divanshu Aggarwal"}
            <span className="text-[var(--text)]/20">.</span>
          </motion.h1>

          {/* ---------------------------------------------------------------- */}
          {/* HEADLINE */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.17 }}
            className="mt-5 max-w-4xl"
          >
            <h2 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-[var(--text)]/70 sm:text-4xl lg:text-5xl">
              {profile.headline ||
                "Building intelligent products and scalable software."}
            </h2>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* SHORT BIO */}
          {/* ---------------------------------------------------------------- */}

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.23 }}
            className="mt-7 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg"
          >
            {profile.short_bio ||
              "Building reliable products at the intersection of artificial intelligence and software engineering."}
          </motion.p>

          {/* ---------------------------------------------------------------- */}
          {/* CTA */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {/* Projects */}

            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              View selected work

              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>

            {/* Resume */}

            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume in a new tab"
                className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.025] px-5 py-3 text-sm font-medium text-[var(--text)]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-[var(--text)]"
              >
                Resume

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}

            {/* Contact */}

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text)]"
            >
              Let's talk
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* SOCIAL LINKS */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            {profile.github_url && (
              <SocialLink
                href={profile.github_url}
                label="GitHub"
              />
            )}

            {profile.linkedin_url && (
              <SocialLink
                href={profile.linkedin_url}
                label="LinkedIn"
              />
            )}

            {profile.twitter_url && (
              <SocialLink
                href={profile.twitter_url}
                label="X"
              />
            )}

            {profile.email && (
              <SocialLink
                href={`mailto:${profile.email}`}
                label="Email"
                icon={<Mail size={14} />}
              />
            )}

            {profile.location && (
              <>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />

                <span className="text-xs text-[var(--text)]/25">
                  {profile.location}
                </span>
              </>
            )}
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* HERO STATS */}
          {/* ---------------------------------------------------------------- */}

          {(profile.hero_stat_1_value ||
            profile.hero_stat_2_value ||
            profile.hero_stat_3_value) && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.5,
              }}
              className="mt-16 border-t border-white/10 pt-7"
            >
              <div className="grid max-w-3xl grid-cols-3 divide-x divide-white/10">
                <HeroStat
                  value={profile.hero_stat_1_value}
                  label={profile.hero_stat_1_label}
                />

                <HeroStat
                  value={profile.hero_stat_2_value}
                  label={profile.hero_stat_2_label}
                />

                <HeroStat
                  value={profile.hero_stat_3_value}
                  label={profile.hero_stat_3_label}
                />
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* SCROLL INDICATOR */}
          {/* ---------------------------------------------------------------- */}

          <motion.a
            href="#projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
            className="absolute bottom-8 right-0 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text)]/20 transition hover:text-[var(--text)]/50 lg:flex"
          >
            <span>Scroll to explore</span>

            <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 p-1">
              <span className="h-1.5 w-1 rounded-full bg-white/40" />
            </span>
          </motion.a>
        </div>
      </Container>
    </section>
  );
};

/* ========================================================================== */
/* BACKGROUND */
/* ========================================================================== */

const HeroBackground = () => {
  return (
    <>
      {/* Central glow */}

      <div className="pointer-events-none absolute left-1/2 top-[25%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

      {/* Engineering grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent)",
        }}
      />

      {/* Top fade */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Bottom fade */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {/* Vignette */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.55)_100%)]" />
    </>
  );
};

/* ========================================================================== */
/* SOCIAL LINK */
/* ========================================================================== */

const SocialLink = ({
  href,
  label,
  icon = null,
}) => {
  const isExternal = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-xs text-[var(--text)]/30 transition hover:text-[var(--text)]/80"
    >
      {icon && (
        <span className="text-[var(--text)]/25 transition group-hover:text-[var(--text)]/60">
          {icon}
        </span>
      )}

      <span>{label}</span>

      <ArrowUpRight
        size={11}
        className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
      />
    </a>
  );
};

/* ========================================================================== */
/* HERO STAT */
/* ========================================================================== */

const HeroStat = ({ value, label }) => {
  if (!value) {
    return <div />;
  }

  return (
    <div className="px-5 first:pl-0 last:pr-0 sm:px-7">
      <p className="text-2xl font-medium tracking-[-0.04em] text-[var(--text)] sm:text-3xl">
        {value}
      </p>

      <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text)]/25 sm:text-xs">
        {label || "Metric"}
      </p>
    </div>
  );
};

export default Hero;