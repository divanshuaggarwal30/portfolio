import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080808] transition duration-500 hover:border-white/20"
    >
      {/* Visual */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl" />
        </div>

        <span className="relative text-5xl font-semibold tracking-tighter text-white/[0.08] transition duration-500 group-hover:text-white/[0.15]">
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.featured && (
          <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/40 backdrop-blur">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.15em] text-white/30">
            {project.category}
          </span>

          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/35 transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/35 transition hover:text-white"
            >
              Live →
            </a>
          </div>
        </div>

        <h3 className="text-xl font-medium tracking-tight">
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-6 text-white/45">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-white/40"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;