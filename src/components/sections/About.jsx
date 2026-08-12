import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { useProfileContext } from "../../contexts/ProfileContext";

const About = () => {
  const { profile, loading, error } = useProfileContext();

  if (loading) {
    return (
      <section
        id="about"
        className="border-t border-white/10 py-28 sm:py-36"
      >
        <Container>
          <p className="text-sm text-white/30">
            Loading...
          </p>
        </Container>
      </section>
    );
  }

  if (error || !profile) {
    return null;
  }

  return (
    <section
      id="about"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Engineer first. AI enthusiast always."
          description={
            profile.short_bio ||
            "I enjoy turning complex problems into simple, reliable software."
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-base leading-8 text-white/55 sm:text-lg"
          >
            <p>
              {profile.about ||
                "I'm a B.Tech student specializing in Artificial Intelligence and Machine Learning, with a strong interest in software engineering and product development."}
            </p>

            {profile.location && (
              <p className="text-sm text-white/30">
                Based in {profile.location}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            <div className="bg-[#080808] p-6">
              <p className="text-3xl font-semibold">
                AI/ML
              </p>

              <p className="mt-2 text-sm text-white/35">
                Primary focus
              </p>
            </div>

            <div className="bg-[#080808] p-6">
              <p className="text-3xl font-semibold">
                Full-Stack
              </p>

              <p className="mt-2 text-sm text-white/35">
                Development
              </p>
            </div>

            <div className="bg-[#080808] p-6">
              <p className="text-3xl font-semibold">
                DSA
              </p>

              <p className="mt-2 text-sm text-white/35">
                Core foundation
              </p>
            </div>

            <div className="bg-[#080808] p-6">
              <p className="text-3xl font-semibold">
                Open Source
              </p>

              <p className="mt-2 text-sm text-white/35">
                Contribution
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;