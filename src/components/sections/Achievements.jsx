import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const achievements = [
  {
    title: "Top Finalist — Tech Royale 1.0",
    organization: "Code Royale Hackathon",
    description:
      "Selected as a top finalist for building ShadowCart, a technology-driven solution developed during the hackathon.",
  },
  {
    title: "SSOC Season 5 Contributor",
    organization: "Social Summer of Code",
    description:
      "Contributed to open-source projects while collaborating with developers and maintainers.",
  },
  {
    title: "GSSoC '26 Contributor",
    organization: "GirlScript Summer of Code",
    description:
      "Participated in open-source development and contributed to collaborative software projects.",
  },
];

const Achievements = () => {
  return (
    <section className="border-t border-white/10 py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Achievements"
          title="Proof beyond coursework."
          description="Competitions, open-source contributions, and technical communities."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-white/10 bg-[#080808] p-7 transition hover:border-white/20"
            >
              <span className="text-xs text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-lg font-medium leading-7">
                {achievement.title}
              </h3>

              <p className="mt-2 text-sm text-white/35">
                {achievement.organization}
              </p>

              <p className="mt-5 text-sm leading-7 text-white/45">
                {achievement.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Achievements;