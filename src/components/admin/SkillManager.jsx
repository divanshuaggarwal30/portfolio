import { useEffect, useState } from "react";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../../services/skillService";

const emptySkill = {
  name: "",
  category: "",
  display_order: 0,
};

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptySkill);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptySkill);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        display_order: Number(form.display_order) || 0,
      };

      if (!payload.name || !payload.category) {
        setError("Skill name and category are required.");
        return;
      }

      if (editingId) {
        await updateSkill(editingId, payload);
      } else {
        await createSkill(payload);
      }

      await loadSkills();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
      display_order: skill.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteSkill(id);
      await loadSkills();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to delete skill.");
    }
  };

  return (
    <section className="mt-10">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        {/* Form */}
        <div className="h-fit rounded-2xl border border-white/10 bg-[#080808] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                {editingId ? "Edit skill" : "New skill"}
              </p>

              <h2 className="mt-2 text-xl font-medium">
                {editingId ? "Update skill" : "Add skill"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-white/35 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Skill
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="React"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Frontend"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Display order
              </label>

              <input
                name="display_order"
                type="number"
                value={form.display_order}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-white/25"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update skill"
                  : "Create skill"}
            </button>
          </form>
        </div>

        {/* List */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                Content
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Skills
              </h2>
            </div>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">
              {skills.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#080808] p-10 text-center">
              <p className="text-sm text-white/40">
                No skills yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#080808] p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-medium">
                      {skill.name}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      {skill.category} · Order{" "}
                      {skill.display_order}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(skill)}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 hover:border-white/20 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(skill.id)}
                      className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-400/60 hover:border-red-400/30 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillManager;