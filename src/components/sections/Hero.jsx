import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";
import Container from "../common/Container";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      <Container className="relative">
        <div className="max-w-5xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-white/50">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-8xl"
          >
            Building intelligent
            <br />
            <span className="text-white/35">software for the real world.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg"
          >
            I'm Divanshu Aggarwal, an AI/ML student and software developer
            focused on building reliable products at the intersection of
            artificial intelligence and software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View my work

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex items-center gap-5"
          >
            <a
              href="https://github.com/divanshuaggarwal30"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white/40 transition hover:text-white"
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/divanshu-aggarwal-522420378"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 transition hover:text-white"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/30 lg:flex"
        >
          Scroll
          <ArrowDown size={14} />
        </motion.a>
      </Container>
    </section>
  );
};

export default Hero;