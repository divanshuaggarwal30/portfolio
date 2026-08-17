import { useEffect, useState } from "react";
import {
  createAchievement,
  deleteAchievement,
  getAchievements,
  updateAchievement,
} from "../../services/achievementService";

const emptyAchievement = {
  title: "",
  organization: "",
  description: "",
  achievement_date: "",
  display_order: 0,
};

const AchievementManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState(emptyAchievement);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAchievements();

      setAchievements(data || []);
    } catch (err) {
      console.error("Failed to load achievements:", err);
      setError(err.message || "Unable to load achievements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({ ...emptyAchievement });
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!form.title.trim()) {
        setError("Achievement title is required.");
        return;
      }

      const payload = {
        title: form.title.trim(),
        organization: form.organization.trim() || null,
        description: form.description.trim() || null,
        achievement_date: form.achievement_date || null,
        display_order: Number(form.display_order) || 0,
      };

      if (editingId) {
        await updateAchievement(editingId, payload);
      } else {
        await createAchievement(payload);
      }

      await loadAchievements();
      resetForm();
    } catch (err) {
      console.error("Failed to save achievement:", err);
      setError(err.message || "Unable to save achievement.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (achievement) => {
    setEditingId(achievement.id);

    setForm({
      title: achievement.title || "",
      organization: achievement.organization || "",
      description: achievement.description || "",
      achievement_date: achievement.achievement_date || "",
      display_order: achievement.display_order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) {
      return;
    }

    try {
      setError("");

      await deleteAchievement(id);
      await loadAchievements();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Failed to delete achievement:", err);
      setError(err.message || "Unable to delete achievement.");
    }
  };

  return (
    <section className="mt-10">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* FORM */}
        <div className="h-fit rounded-2xl border border-white/10 bg-[#080808] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                {editingId ? "Edit achievement" : "New achievement"}
              </p>

              <h2 className="mt-2 text-xl font-medium text-white">
                {editingId ? "Update achievement" : "Add achievement"}
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
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Hackathon Finalist"
            />

            <Input
              label="Organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Hackathon / Organization"
            />

            <Input
              label="Date"
              name="achievement_date"
              type="date"
              value={form.achievement_date}
              onChange={handleChange}
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
                placeholder="Describe the achievement..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <Input
              label="Display order"
              name="display_order"
              type="number"
              value={form.display_order}
              onChange={handleChange}
              placeholder="0"
            />

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
                  ? "Update achievement"
                  : "Create achievement"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                Content
              </p>

              <h2 className="mt-2 text-xl font-medium text-white">
                Achievements
              </h2>
            </div>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">
              {achievements.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
              Loading achievements...
            </div>
          ) : achievements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#080808] p-10 text-center">
              <p className="text-sm text-white/40">
                No achievements yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <article
                  key={achievement.id}
                  className="rounded-2xl border border-white/10 bg-[#080808] p-6"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row">
                    <div>
                      <h3 className="font-medium text-white">
                        {achievement.title}
                      </h3>

                      {achievement.organization && (
                        <p className="mt-2 text-sm text-white/40">
                          {achievement.organization}
                        </p>
                      )}

                      {achievement.achievement_date && (
                        <p className="mt-1 text-xs text-white/25">
                          {formatDate(achievement.achievement_date)}
                        </p>
                      )}

                      {achievement.description && (
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/35">
                          {achievement.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(achievement)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 transition hover:border-white/20 hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(achievement.id)}
                        className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-400/60 transition hover:border-red-400/20 hover:text-red-400"
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

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

export default AchievementManager;