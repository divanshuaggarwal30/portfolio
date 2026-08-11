import { useState } from "react";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#080808] p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Private Area
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Sign in to manage your portfolio content.
          </p>

          <div className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
            />

            <button
              onClick={() => setLoggedIn(true)}
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Sign in
            </button>
          </div>

          <a
            href="/"
            className="mt-6 block text-center text-sm text-white/30 hover:text-white"
          >
            ← Back to portfolio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-semibold">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-white/40">
          Portfolio management dashboard.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Projects",
            "Experience",
            "Achievements",
            "Messages",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-[#080808] p-6"
            >
              <p className="text-lg font-medium">{item}</p>

              <p className="mt-2 text-sm text-white/35">
                Manage {item.toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setLoggedIn(false)}
          className="mt-10 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/50 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </main>
  );
};

export default Admin;