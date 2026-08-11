import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../services/projectService";

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  category: "",
  technologies: [],
  github_url: "",
  live_url: "",
  image_url: "",
  featured: false,
  display_order: 0,
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  const [technologyInput, setTechnologyInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addTechnology = () => {
    const technology = technologyInput.trim();

    if (!technology) return;

    if (
      form.technologies.some(
        (item) => item.toLowerCase() === technology.toLowerCase()
      )
    ) {
      setTechnologyInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      technologies: [...current.technologies, technology],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (technology) => {
    setForm((current) => ({
      ...current,
      technologies: current.technologies.filter(
        (item) => item !== technology
      ),
    }));
  };

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setTechnologyInput("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        category: form.category.trim() || null,
        github_url: form.github_url.trim() || null,
        live_url: form.live_url.trim() || null,
        image_url: form.image_url.trim() || null,
        display_order: Number(form.display_order) || 0,
      };

      if (!payload.title || !payload.slug || !payload.description) {
        setError("Title, slug, and description are required.");
        return;
      }

      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      await loadProjects();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      slug: project.slug || "",
      description: project.description || "",
      category: project.category || "",
      technologies: project.technologies || [],
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      image_url: project.image_url || "",
      featured: project.featured || false,
      display_order: project.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteProject(id);
      await loadProjects();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to delete project.");
    }
  };

  return (
    <section className="mt-10">
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        {/* Form */}
        <div className="h-fit rounded-2xl border border-white/10 bg-[#080808] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                {editingId ? "Edit project" : "New project"}
              </p>

              <h2 className="mt-2 text-xl font-medium">
                {editingId ? "Update project" : "Add project"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-white/35 transition hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <Field
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="AI-Powered Agile Issue Tracker"
            />

            <Field
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="ai-powered-agile-issue-tracker"
            />

            <Field
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Full Stack / AI"
            />

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the project..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Technologies
              </label>

              <div className="mt-2 flex gap-2">
                <input
                  value={technologyInput}
                  onChange={(event) =>
                    setTechnologyInput(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="React"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                />

                <button
                  type="button"
                  onClick={addTechnology}
                  className="rounded-xl border border-white/10 px-4 text-sm text-white/50 transition hover:border-white/20 hover:text-white"
                >
                  Add
                </button>
              </div>

              {form.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.technologies.map((technology) => (
                    <button
                      key={technology}
                      type="button"
                      onClick={() => removeTechnology(technology)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 transition hover:border-red-400/30 hover:text-red-300"
                      title="Remove technology"
                    >
                      {technology} ×
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Field
              label="GitHub URL"
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />

            <Field
              label="Live URL"
              name="live_url"
              value={form.live_url}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Field
              label="Image URL"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Field
              label="Display order"
              name="display_order"
              type="number"
              value={form.display_order}
              onChange={handleChange}
              placeholder="0"
            />

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm text-white/50">
                Featured project
              </span>
            </label>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update project"
                  : "Create project"}
            </button>
          </form>
        </div>

        {/* Project list */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                Content
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Projects
              </h2>
            </div>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">
              {projects.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#080808] p-10 text-center">
              <p className="text-sm text-white/40">
                No projects yet.
              </p>

              <p className="mt-2 text-xs text-white/25">
                Create your first project using the form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-[#080808] p-6"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {project.title}
                        </h3>

                        {project.featured && (
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-400/70">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/40">
                        {project.description}
                      </p>

                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/35"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 transition hover:border-white/20 hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-400/60 transition hover:border-red-400/30 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.15em] text-white/30">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
      />
    </div>
  );
};

export default ProjectManager;