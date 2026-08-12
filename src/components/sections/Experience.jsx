import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import useExperience from "../../hooks/useExperience";

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

const Experience = () => {
  const { experiences, loading, error } = useExperience();

  return (
    <section
      id="experience"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked and contributed."
          description="A timeline of experiences, collaborations, and technical work."
        />

        {loading && (
          <div className="text-sm text-white/35">
            Loading experience...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <p className="text-sm text-white/30">
              Experience information will be added soon.
            </p>
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-white/10 sm:block" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="relative sm:pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border border-white/20 bg-black sm:block" />

                  <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-white/30">
                        {formatDate(experience.start_date)}
                      </p>

                      <p className="mt-1 text-xs text-white/20">
                        {experience.current
                          ? "Present"
                          : formatDate(experience.end_date)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">
                        {experience.role}
                      </h3>

                      <p className="mt-1 text-sm text-white/45">
                        {experience.organization}
                      </p>

                      {experience.description && (
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                          {experience.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Experience;