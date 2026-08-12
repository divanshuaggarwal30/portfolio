import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import EducationManager from "../components/admin/EducationManager";
import AchievementManager from "../components/admin/AchievementManager";
import ProfileManager from "../components/admin/ProfileManager";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const Admin = () => {
  const { user, loading, signIn, signOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    const { error: loginError } = await signIn(
      email,
      password
    );

    if (loginError) {
      setError("Invalid email or password.");
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-white/40">
          Loading...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Private Area
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Sign in to manage your portfolio.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-white/10 bg-[#080808] p-7"
          >
            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.15em] text-white/30"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                autoComplete="email"
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                placeholder="admin@example.com"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.15em] text-white/30"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="current-password"
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 block text-center text-sm text-white/30 transition hover:text-white"
          >
            ← Back to portfolio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Administration
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Portfolio Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/40">
              {user.email}
            </p>
          </div>

          <button
            onClick={signOut}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/50 transition hover:border-white/20 hover:text-white"
          >
            Sign out
          </button>
        </div>

        <ProfileManager />
        <ProjectManager />
        <SkillManager />
        <ExperienceManager />
        <EducationManager />
        <AchievementManager />
      </div>
    </main>
  );
};

export default Admin;