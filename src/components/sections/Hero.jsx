import { motion } from "framer-motion";
import Container from "../common/Container";
import { useProfileContext } from "../../contexts/ProfileContext";

const Hero = () => {
  const { profile, loading, error } = useProfileContext();

  if (loading) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <Container>
          <div className="text-sm text-white/30">
            Loading...
          </div>
        </Container>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <Container>
          <div className="max-w-xl">
            <p className="text-sm text-red-400">
              Unable to load portfolio profile.
            </p>

            <p className="mt-2 text-sm text-white/30">
              Please check your Supabase profile configuration.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      <Container className="relative">
        <div className="max-w-5xl">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-sm font-medium text-white/50">
              {profile.availability_label ||
                profile.availability ||
                "Available for opportunities"}
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-8xl"
          >
            {profile.headline || "Building intelligent"}
          </motion.h1>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5"
          >
            <span className="text-xl font-medium text-white/35 sm:text-2xl">
              {profile.name}
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg"
          >
            {profile.short_bio ||
              "Building reliable products at the intersection of artificial intelligence and software engineering."}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View my work →
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Get in touch
            </a>

            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/50 transition hover:border-white/25 hover:text-white"
              >
                Resume ↗
              </a>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/40 transition hover:text-white"
              >
                GitHub ↗
              </a>
            )}

            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/40 transition hover:text-white"
              >
                LinkedIn ↗
              </a>
            )}

            {profile.twitter_url && (
              <a
                href={profile.twitter_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/40 transition hover:text-white"
              >
                X ↗
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-white/40 transition hover:text-white"
              >
                Email ↗
              </a>
            )}
          </motion.div>

          {/* Hero statistics */}
          {(profile.hero_stat_1_value ||
            profile.hero_stat_2_value ||
            profile.hero_stat_3_value) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-8 border-t border-white/10 pt-8"
            >
              {profile.hero_stat_1_value && (
                <div>
                  <p className="text-2xl font-medium tracking-tight">
                    {profile.hero_stat_1_value}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {profile.hero_stat_1_label}
                  </p>
                </div>
              )}

              {profile.hero_stat_2_value && (
                <div>
                  <p className="text-2xl font-medium tracking-tight">
                    {profile.hero_stat_2_value}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {profile.hero_stat_2_label}
                  </p>
                </div>
              )}

              {profile.hero_stat_3_value && (
                <div>
                  <p className="text-2xl font-medium tracking-tight">
                    {profile.hero_stat_3_value}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {profile.hero_stat_3_label}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;