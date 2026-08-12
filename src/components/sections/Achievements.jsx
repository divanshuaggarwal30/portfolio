import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import useAchievements from "../../hooks/useAchievements";

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const Achievements = () => {
  const {
    achievements,
    loading,
    error,
  } = useAchievements();

  return (
    <section
      id="achievements"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Achievements"
          title="Proof of work."
          description="Selected milestones, competitions, contributions, and recognition."
        />

        {loading && (
          <div className="text-sm text-white/35">
            Loading achievements...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          achievements.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-sm text-white/30">
                Achievements will be added soon.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          achievements.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {achievements.map((achievement, index) => (
                <motion.article
                  key={achievement.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  className="group rounded-2xl border border-white/10 bg-[#080808] p-7 transition hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      {achievement.category && (
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          {achievement.category}
                        </p>
                      )}

                      <h3 className="mt-2 text-lg font-medium">
                        {achievement.title}
                      </h3>

                      {achievement.organization && (
                        <p className="mt-1 text-sm text-white/40">
                          {achievement.organization}
                        </p>
                      )}
                    </div>

                    {achievement.date && (
                      <span className="shrink-0 text-xs text-white/25">
                        {formatDate(achievement.date)}
                      </span>
                    )}
                  </div>

                  {achievement.description && (
                    <p className="mt-5 text-sm leading-7 text-white/40">
                      {achievement.description}
                    </p>
                  )}

                  {achievement.link_url && (
                    <a
                      href={achievement.link_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block text-sm text-white/45 transition hover:text-white"
                    >
                      View proof ↗
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          )}
      </Container>
    </section>
  );
};

export default Achievements;