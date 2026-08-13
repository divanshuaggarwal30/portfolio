import { useEffect, useState } from "react";
import {
  Check,
  ExternalLink,
  Save,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const INITIAL_PROFILE = {
  name: "",
  headline: "",
  short_bio: "",
  about: "",
  location: "",
  email: "",
  github_url: "",
  linkedin_url: "",
  twitter_url: "",
  portfolio_url: "",
  resume_url: "",
  availability: "",
  availability_label: "",
  hero_stat_1_value: "",
  hero_stat_1_label: "",
  hero_stat_2_value: "",
  hero_stat_2_label: "",
  hero_stat_3_value: "",
  hero_stat_3_label: "",
};

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

      setProfile({
        ...INITIAL_PROFILE,
        ...data,
      });
    } catch (err) {
      console.error("Profile load error:", err);
      setError(err?.message || "Unable to load profile.");
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
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profile?.id) {
      setError("Profile record was not found.");
      return;
    }

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      await updateProfile(profile.id, {
        name: profile.name?.trim() || "",
        headline: profile.headline?.trim() || "",
        short_bio: profile.short_bio?.trim() || "",
        about: profile.about?.trim() || "",
        location: profile.location?.trim() || "",
        email: profile.email?.trim() || "",
        github_url: profile.github_url?.trim() || "",
        linkedin_url: profile.linkedin_url?.trim() || "",
        twitter_url: profile.twitter_url?.trim() || "",
        portfolio_url: profile.portfolio_url?.trim() || "",
        resume_url: profile.resume_url?.trim() || "",
        availability: profile.availability?.trim() || "",
        availability_label:
          profile.availability_label?.trim() || "",

        hero_stat_1_value:
          profile.hero_stat_1_value?.trim() || "",
        hero_stat_1_label:
          profile.hero_stat_1_label?.trim() || "",

        hero_stat_2_value:
          profile.hero_stat_2_value?.trim() || "",
        hero_stat_2_label:
          profile.hero_stat_2_label?.trim() || "",

        hero_stat_3_value:
          profile.hero_stat_3_value?.trim() || "",
        hero_stat_3_label:
          profile.hero_stat_3_label?.trim() || "",
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error("Profile save error:", err);
      setError(err?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-10 rounded-2xl border border-white/10 bg-[#080808] p-8">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white/50" />
          <p className="text-sm text-white/40">
            Loading profile settings...
          </p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
        <p className="text-sm text-red-400">
          {error || "Profile record was not found."}
        </p>

        <button
          type="button"
          onClick={loadProfile}
          className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <section className="mt-10 pb-16">
      {/* HEADER */}

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
          Portfolio configuration
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Profile
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              Manage the identity, contact information,
              social links, availability and hero content
              displayed on your public portfolio.
            </p>
          </div>

          {saved && (
            <div className="inline-flex items-center gap-2 self-start rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-xs text-emerald-400">
              <Check size={14} />
              Changes saved
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">

          {/* IDENTITY */}

          <AdminSection
            eyebrow="01"
            title="Identity"
            description="The core information recruiters see first."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your name"
              />

              <Input
                label="Headline"
                name="headline"
                value={profile.headline}
                onChange={handleChange}
                placeholder="AI/ML Engineer & Software Developer"
              />
            </div>

            <div className="mt-5">
              <Textarea
                label="Short bio"
                name="short_bio"
                value={profile.short_bio}
                onChange={handleChange}
                placeholder="A concise description of what you build and what you focus on."
                rows={4}
                maxLength={240}
              />
            </div>

            <div className="mt-5">
              <Textarea
                label="About"
                name="about"
                value={profile.about}
                onChange={handleChange}
                placeholder="Tell recruiters about your background, interests and technical focus."
                rows={7}
                maxLength={1200}
              />
            </div>
          </AdminSection>

          {/* CONTACT */}

          <AdminSection
            eyebrow="02"
            title="Contact"
            description="How recruiters and collaborators can reach you."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              <Input
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="India"
              />
            </div>
          </AdminSection>

          {/* SOCIAL */}

          <AdminSection
            eyebrow="03"
            title="Social profiles"
            description="Keep your professional profiles one click away."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <UrlInput
                icon={<ExternalLink size={15} />}
                label="GitHub"
                name="github_url"
                value={profile.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />

              <UrlInput
                icon={<ExternalLink size={15} />}
                label="LinkedIn"
                name="linkedin_url"
                value={profile.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />

              <UrlInput
                icon={<ExternalLink size={15} />}
                label="Twitter / X"
                name="twitter_url"
                value={profile.twitter_url}
                onChange={handleChange}
                placeholder="https://x.com/username"
              />

              <UrlInput
                icon={<ExternalLink size={15} />}
                label="Portfolio URL"
                name="portfolio_url"
                value={profile.portfolio_url}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </AdminSection>

          {/* RESUME */}

          <AdminSection
            eyebrow="04"
            title="Resume"
            description="Your recruiter-facing resume link."
          >
            <UrlInput
              icon={<ExternalLink size={15} />}
              label="Resume URL"
              name="resume_url"
              value={profile.resume_url}
              onChange={handleChange}
              placeholder="https://..."
            />

            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-white"
              >
                Open current resume
                <ExternalLink size={13} />
              </a>
            )}

            <p className="mt-4 text-xs leading-5 text-white/25">
              The dedicated Media Manager handles resume
              uploads. This field is useful for an externally
              hosted resume or for checking the current URL.
            </p>
          </AdminSection>

          {/* AVAILABILITY */}

          <AdminSection
            eyebrow="05"
            title="Availability"
            description="Control the availability indicator displayed publicly."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Status"
                name="availability"
                value={profile.availability}
                onChange={handleChange}
                placeholder="Available"
              />

              <Input
                label="Status label"
                name="availability_label"
                value={profile.availability_label}
                onChange={handleChange}
                placeholder="Open to opportunities"
              />
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                Preview
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {profile.availability_label ||
                  profile.availability ||
                  "Available"}
              </div>
            </div>
          </AdminSection>

          {/* HERO STATS */}

          <AdminSection
            eyebrow="06"
            title="Hero statistics"
            description="The three proof points displayed near the top of the portfolio."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <StatEditor
                number="01"
                valueName="hero_stat_1_value"
                labelName="hero_stat_1_label"
                value={profile.hero_stat_1_value}
                label={profile.hero_stat_1_label}
                onChange={handleChange}
              />

              <StatEditor
                number="02"
                valueName="hero_stat_2_value"
                labelName="hero_stat_2_label"
                value={profile.hero_stat_2_value}
                label={profile.hero_stat_2_label}
                onChange={handleChange}
              />

              <StatEditor
                number="03"
                valueName="hero_stat_3_value"
                labelName="hero_stat_3_label"
                value={profile.hero_stat_3_value}
                label={profile.hero_stat_3_label}
                onChange={handleChange}
              />
            </div>
          </AdminSection>

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* SAVE */}

          <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#080808]/95 p-4 shadow-2xl backdrop-blur-xl">
            <p className="hidden text-xs text-white/25 sm:block">
              Changes are saved directly to Supabase.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION */
/* -------------------------------------------------------------------------- */

const AdminSection = ({
  eyebrow,
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-8">
      <div className="mb-7 flex gap-4">
        <div className="flex h-7 min-w-7 items-center justify-center rounded-lg border border-white/10 text-[10px] text-white/30">
          {eyebrow}
        </div>

        <div>
          <h3 className="font-medium tracking-tight">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/25">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* INPUT */
/* -------------------------------------------------------------------------- */

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-[0.15em] text-white/30"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-white/25 focus:bg-white/[0.045]"
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* URL INPUT */
/* -------------------------------------------------------------------------- */

const UrlInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/30"
      >
        {icon}
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="url"
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-white/25 focus:bg-white/[0.045]"
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* TEXTAREA */
/* -------------------------------------------------------------------------- */

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  maxLength,
}) => {
  const length = value?.length || 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={name}
          className="text-xs uppercase tracking-[0.15em] text-white/30"
        >
          {label}
        </label>

        {maxLength && (
          <span
            className={`text-[10px] ${
              length > maxLength * 0.9
                ? "text-amber-400/60"
                : "text-white/20"
            }`}
          >
            {length}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/15 focus:border-white/25 focus:bg-white/[0.045]"
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* STAT EDITOR */
/* -------------------------------------------------------------------------- */

const StatEditor = ({
  number,
  valueName,
  labelName,
  value,
  label,
  onChange,
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">
        Stat {number}
      </p>

      <input
        name={valueName}
        value={value ?? ""}
        onChange={onChange}
        placeholder="20+"
        className="mt-4 w-full border-0 bg-transparent p-0 text-2xl font-medium text-white outline-none placeholder:text-white/10"
      />

      <input
        name={labelName}
        value={label ?? ""}
        onChange={onChange}
        placeholder="Projects"
        className="mt-2 w-full border-0 bg-transparent p-0 text-xs text-white/35 outline-none placeholder:text-white/10"
      />
    </div>
  );
};

export default ProfileManager;