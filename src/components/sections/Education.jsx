import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Education = () => {
  return (
    <section className="border-t border-white/10 py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Building strong foundations."
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-[#080808] p-7 sm:p-10"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                2024 — Present
              </p>

              <h3 className="mt-4 text-2xl font-medium">
                B.Tech — Artificial Intelligence & Machine Learning
              </h3>

              <p className="mt-2 text-white/40">
                Vivekananda Institute of Professional Studies
              </p>
            </div>

            <div className="self-start rounded-full border border-white/10 px-4 py-2 text-xs text-white/40">
              New Delhi, India
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="max-w-3xl text-sm leading-7 text-white/45">
              Focus areas include data structures and algorithms, artificial
              intelligence, machine learning, software engineering, databases,
              and full-stack application development.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Education;