import { useEffect, useState } from "react";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../../services/experienceService";

const emptyExperience = {
  organization: "",
  role: "",
  description: "",
  start_date: "",
  end_date: "",
  current: false,
  display_order: 0,
};

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(emptyExperience);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiences();
      setExperiences(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyExperience);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!form.organization.trim() || !form.role.trim()) {
        setError("Organization and role are required.");
        return;
      }

      const payload = {
        organization: form.organization.trim(),
        role: form.role.trim(),
        description: form.description.trim() || null,
        start_date: form.start_date || null,
        end_date: form.current ? null : form.end_date || null,
        current: form.current,
        display_order: Number(form.display_order) || 0,
      };

      if (editingId) {
        await updateExperience(editingId, payload);
      } else {
        await createExperience(payload);
      }

      await loadExperiences();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save experience.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);

    setForm({
      organization: experience.organization || "",
      role: experience.role || "",
      description: experience.description || "",
      start_date: experience.start_date || "",
      end_date: experience.end_date || "",
      current: experience.current || false,
      display_order: experience.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      await deleteExperience(id);
      await loadExperiences();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to delete experience.");
    }
  };

  return (
    <section className="mt-10">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="h-fit rounded-2xl border border-white/10 bg-[#080808] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/30">
            {editingId ? "Edit experience" : "New experience"}
          </p>

          <h2 className="mt-2 text-xl font-medium">
            {editingId ? "Update experience" : "Add experience"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <Input
              label="Organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Company / Organization"
            />

            <Input
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Software Engineer Intern"
            />

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                placeholder="What did you work on?"
              />
            </div>

            <Input
              label="Start date"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
            />

            {!form.current && (
              <Input
                label="End date"
                name="end_date"
                type="date"
                value={form.end_date}
                onChange={handleChange}
              />
            )}

            <label className="flex items-center gap-3 text-sm text-white/50">
              <input
                type="checkbox"
                name="current"
                checked={form.current}
                onChange={handleChange}
              />
              Currently working here
            </label>

            <Input
              label="Display order"
              name="display_order"
              type="number"
              value={form.display_order}
              onChange={handleChange}
            />

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-white/10 px-4 text-sm text-white/50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <div className="mb-5 flex justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                Content
              </p>
              <h2 className="mt-2 text-xl font-medium">
                Experience
              </h2>
            </div>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">
              {experiences.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
              Loading...
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="rounded-2xl border border-white/10 bg-[#080808] p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="font-medium">
                        {experience.role}
                      </h3>

                      <p className="mt-1 text-sm text-white/45">
                        {experience.organization}
                      </p>

                      <p className="mt-3 text-xs text-white/25">
                        {experience.start_date || "—"}{" "}
                        →{" "}
                        {experience.current
                          ? "Present"
                          : experience.end_date || "—"}
                      </p>

                      {experience.description && (
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                          {experience.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(experience.id)}
                        className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-400/60 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {experiences.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/30">
                  No experience added yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
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

export default ExperienceManager;