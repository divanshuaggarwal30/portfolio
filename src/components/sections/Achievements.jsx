import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { useAchievements } from "../../hooks/useAchievements";

const Achievements = () => {
  const { achievements, loading, error } = useAchievements();

  return (
    <section
      id="achievements"
      className="border-t border-[var(--border)] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition & milestones."
          description="Selected achievements, hackathons, and milestones that reflect my technical growth and execution."
        />

        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm font-medium text-red-500">
              Unable to load achievements.
            </p>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Please check your Supabase configuration.
            </p>
          </div>
        )}

        {!loading && !error && achievements?.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm text-[var(--text-muted)]">
              No achievements added yet.
            </p>
          </div>
        )}

        {!loading && !error && achievements?.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

const AchievementCard = ({ achievement, index }) => {
  const formattedDate = achievement.achievement_date
    ? new Date(
        `${achievement.achievement_date}T00:00:00`
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
      }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[var(--border-strong)]
        hover:bg-[var(--surface-hover)]
      "
    >
      {/* subtle hover glow */}
      <div
        className="
          pointer-events-none absolute -right-20 -top-20
          h-40 w-40 rounded-full
          bg-[var(--accent)]/5 blur-3xl
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-hover)]
              text-[var(--text-secondary)]
            "
          >
            <Trophy size={17} strokeWidth={1.7} />
          </div>

          {formattedDate && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {formattedDate}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">
            {achievement.title}
          </h3>

          {achievement.organization && (
            <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
              {achievement.organization}
            </p>
          )}

          {achievement.description && (
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {achievement.description}
            </p>
          )}
        </div>

        {/* Bottom accent */}
        <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Achievement
          </span>

          <ArrowUpRight
            size={15}
            className="
              text-[var(--text-muted)]
              transition-all duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-[var(--text)]
            "
          />
        </div>
      </div>
    </motion.article>
  );
};

export default Achievements;