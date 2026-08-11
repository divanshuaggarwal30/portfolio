import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import useProjects from "../../hooks/useProjects";

const Projects = () => {
  const { projects, loading, error } = useProjects();

  return (
    <section
      id="projects"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built."
          description="Selected projects combining software engineering, AI, and practical problem solving."
        />

        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
            Loading projects...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#080808] p-10 text-center">
            <p className="text-sm text-white/40">
              Projects coming soon.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#080808] transition hover:border-white/20"
              >
                {project.image_url && (
                  <div className="aspect-video overflow-hidden border-b border-white/10 bg-white/[0.02]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      {project.category && (
                        <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                          {project.category}
                        </p>
                      )}

                      <h3 className="mt-2 text-xl font-medium">
                        {project.title}
                      </h3>
                    </div>

                    {project.featured && (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-400/70">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/45">
                    {project.description}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/40"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap gap-5 border-t border-white/10 pt-5">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/40 transition hover:text-white"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/40 transition hover:text-white"
                      >
                        Live Demo ↗
                      </a>
                    )}
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

export default Projects;