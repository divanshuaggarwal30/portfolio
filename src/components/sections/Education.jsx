import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import useEducation from "../../hooks/useEducation";

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

const Education = () => {
  const { education, loading, error } = useEducation();

  return (
    <section
      id="education"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation."
          description="The academic path behind my work in software engineering and AI."
        />

        {loading && (
          <div className="text-sm text-white/35">
            Loading education...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && education.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <p className="text-sm text-white/30">
              Education information will be added soon.
            </p>
          </div>
        )}

        {!loading && !error && education.length > 0 && (
          <div className="grid gap-5">
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="rounded-2xl border border-white/10 bg-[#080808] p-7"
              >
                <div className="flex flex-col justify-between gap-6 lg:flex-row">
                  <div>
                    <h3 className="text-lg font-medium">
                      {item.degree}
                      {item.field && ` — ${item.field}`}
                    </h3>

                    <p className="mt-2 text-sm text-white/45">
                      {item.institution}
                    </p>

                    {item.location && (
                      <p className="mt-1 text-xs text-white/25">
                        {item.location}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <p className="text-xs text-white/30">
                      {formatDate(item.start_date)}
                      {" — "}
                      {item.current
                        ? "Present"
                        : formatDate(item.end_date)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Education;