import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const skillGroups = [
  {
    title: "Languages",
    skills: ["Java", "Python", "C", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "Mongoose"],
  },
  {
    title: "AI / ML",
    skills: ["Machine Learning", "LLMs", "RAG", "Embeddings", "Gemini"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Vercel", "VS Code"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="border-t border-white/10 py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to build."
          description="A practical stack spanning software engineering, AI, and modern web development."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="bg-[#080808] p-7"
            >
              <h3 className="text-sm font-medium text-white/70">
                {group.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45 transition hover:border-white/20 hover:text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Skills;