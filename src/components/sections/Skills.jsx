import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import useSkills from "../../hooks/useSkills";

const Skills = () => {
  const { skills, loading, error } = useSkills();

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  return (
    <section
      id="skills"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Tools I work with."
          description="A practical set of technologies I use to build reliable software."
        />

        {loading && (
          <div className="text-sm text-white/35">
            Loading skills...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedSkills).map(
              ([category, categorySkills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="rounded-2xl border border-white/10 bg-[#080808] p-6"
                >
                  <h3 className="text-sm font-medium">
                    {category}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Skills;