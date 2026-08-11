import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const experiences = [
  {
    period: "2026 — Present",
    role: "Technical & Engineering Member",
    organization: "Advait",
    description:
      "Contributing to technical initiatives, collaborative development, and engineering-focused activities.",
  },
  {
    period: "2026 — Present",
    role: "IEEE Member",
    organization: "IEEE VIPS",
    description:
      "Participating in technical activities, workshops, and engineering-focused initiatives.",
  },
];

const Experience = () => {
  return (
    <section className="border-t border-white/10 py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been involved."
          description="Technical communities and experiences that have shaped how I approach engineering."
        />

        <div className="space-y-0">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.organization}-${experience.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="grid gap-5 border-t border-white/10 py-8 sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                {experience.period}
              </p>

              <div>
                <h3 className="text-xl font-medium">
                  {experience.role}
                </h3>

                <p className="mt-1 text-sm text-white/40">
                  {experience.organization}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;