import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Contact = () => {
  return (
    <section
      id="contact"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something useful."
          description="Have a project, opportunity, or idea worth discussing? I'd love to hear about it."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-[#080808] p-7 sm:p-8"
          >
            <p className="text-sm leading-7 text-white/45">
              I'm currently interested in software engineering, AI/ML,
              full-stack development, internships, and interesting technical
              collaborations.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                  Email
                </p>

                <a
                  href="mailto:divanshuaggarwal024@gmail.com"
                  className="mt-2 inline-block text-sm text-white/65 transition hover:text-white"
                >
                  divanshuaggarwal024@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                  Location
                </p>

                <p className="mt-2 text-sm text-white/45">
                  New Delhi, India
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                  Availability
                </p>

                <p className="mt-2 text-sm text-emerald-400/70">
                  Open to opportunities
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#080808] p-7 sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.15em] text-white/30"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.15em] text-white/30"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="subject"
                className="text-xs uppercase tracking-[0.15em] text-white/30"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What would you like to discuss?"
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-[0.15em] text-white/30"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me a little about it..."
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Send message
            </button>
          </motion.form>
        </div>
      </Container>
    </section>
  );
};

export default Contact;