import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const ProfileManager = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profile) return;

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      await updateProfile(profile.id, {
        name: profile.name,
        headline: profile.headline,
        short_bio: profile.short_bio,
        about: profile.about,
        location: profile.location,
        email: profile.email,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        twitter_url: profile.twitter_url,
        portfolio_url: profile.portfolio_url,
        resume_url: profile.resume_url,
        availability: profile.availability,
        availability_label: profile.availability_label,

        hero_stat_1_value: profile.hero_stat_1_value,
        hero_stat_1_label: profile.hero_stat_1_label,

        hero_stat_2_value: profile.hero_stat_2_value,
        hero_stat_2_label: profile.hero_stat_2_label,

        hero_stat_3_value: profile.hero_stat_3_value,
        hero_stat_3_label: profile.hero_stat_3_label,
      });

      setSaved(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-10 rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
        Loading profile...
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-sm text-red-400">
        Profile record was not found.
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-white/30">
            Portfolio configuration
          </p>

          <h2 className="mt-2 text-2xl font-medium">
            Profile
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
            Everything here controls your public identity,
            hero content and contact information.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* BASIC INFORMATION */}

            <FormSection
              title="Basic information"
              description="Your primary identity."
            >
              <Input
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />

              <Input
                label="Headline"
                name="headline"
                value={profile.headline || ""}
                onChange={handleChange}
              />

              <Input
                label="Location"
                name="location"
                value={profile.location || ""}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={profile.email || ""}
                onChange={handleChange}
              />
            </FormSection>

            {/* ABOUT */}

            <FormSection
              title="About"
              description="The content recruiters see when learning about you."
            >
              <Textarea
                label="Short bio"
                name="short_bio"
                value={profile.short_bio || ""}
                onChange={handleChange}
                rows={4}
              />

              <Textarea
                label="About"
                name="about"
                value={profile.about || ""}
                onChange={handleChange}
                rows={7}
              />
            </FormSection>

            {/* SOCIAL LINKS */}

            <FormSection
              title="Social links"
              description="Public profiles and external links."
            >
              <Input
                label="GitHub"
                name="github_url"
                value={profile.github_url || ""}
                onChange={handleChange}
              />

              <Input
                label="LinkedIn"
                name="linkedin_url"
                value={profile.linkedin_url || ""}
                onChange={handleChange}
              />

              <Input
                label="Twitter / X"
                name="twitter_url"
                value={profile.twitter_url || ""}
                onChange={handleChange}
              />

              <Input
                label="Portfolio URL"
                name="portfolio_url"
                value={profile.portfolio_url || ""}
                onChange={handleChange}
              />
            </FormSection>

            {/* RESUME */}

            <FormSection
              title="Resume"
              description="Link to the resume recruiters can access."
            >
              <Input
                label="Resume URL"
                name="resume_url"
                value={profile.resume_url || ""}
                onChange={handleChange}
                placeholder="https://..."
              />

              <p className="text-xs leading-5 text-white/25">
                We'll add Supabase Storage for direct resume
                uploads later.
              </p>
            </FormSection>

            {/* AVAILABILITY */}

            <FormSection
              title="Availability"
              description="Control the status shown on your portfolio."
            >
              <Input
                label="Status"
                name="availability"
                value={profile.availability || ""}
                onChange={handleChange}
                placeholder="Available"
              />

              <Input
                label="Status label"
                name="availability_label"
                value={profile.availability_label || ""}
                onChange={handleChange}
                placeholder="Open to opportunities"
              />
            </FormSection>

            {/* HERO STATS */}

            <FormSection
              title="Hero statistics"
              description="The three metrics displayed in your hero."
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Stat 1 value"
                  name="hero_stat_1_value"
                  value={profile.hero_stat_1_value || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Stat 1 label"
                  name="hero_stat_1_label"
                  value={profile.hero_stat_1_label || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Stat 2 value"
                  name="hero_stat_2_value"
                  value={profile.hero_stat_2_value || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Stat 2 label"
                  name="hero_stat_2_label"
                  value={profile.hero_stat_2_label || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Stat 3 value"
                  name="hero_stat_3_value"
                  value={profile.hero_stat_3_value || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Stat 3 label"
                  name="hero_stat_3_label"
                  value={profile.hero_stat_3_label || ""}
                  onChange={handleChange}
                />
              </div>
            </FormSection>
          </div>

          {error && (
            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {saved && (
            <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
              Profile updated successfully.
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const FormSection = ({
  title,
  description,
  children,
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6">
    <h3 className="font-medium">{title}</h3>

    <p className="mt-1 text-xs leading-5 text-white/25">
      {description}
    </p>

    <div className="mt-6 space-y-5">
      {children}
    </div>
  </div>
);

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

const Textarea = ({
  label,
  name,
  value,
  onChange,
  rows = 5,
}) => (
  <div>
    <label className="text-xs uppercase tracking-[0.15em] text-white/30">
      {label}
    </label>

    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/25"
    />
  </div>
);

export default ProfileManager;