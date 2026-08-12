import { useState } from "react";
import { Mail, Send } from "lucide-react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { useProfileContext } from "../../contexts/ProfileContext";
import { createMessage } from "../../services/messageService";

const Contact = () => {
  const { profile } = useProfileContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus("submitting");
      setError("");

      if (!form.name.trim()) {
        throw new Error("Please enter your name.");
      }

      if (!form.email.trim()) {
        throw new Error("Please enter your email.");
      }

      if (!form.message.trim()) {
        throw new Error("Please enter a message.");
      }

      await createMessage(form);

      setForm({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });

      setStatus("success");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );

      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-white/10 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something useful."
          description="Have an opportunity, project, or interesting problem? Send me a message."
        />

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          {/* CONTACT INFO */}

          <div className="rounded-2xl border border-white/10 bg-[#080808] p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10">
              <Mail
                size={18}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mt-6 text-lg font-medium">
              Get in touch
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/40">
              I'm open to conversations about internships,
              software engineering, AI/ML, collaborations,
              and interesting technical problems.
            </p>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="mt-6 inline-block text-sm text-white/60 transition hover:text-white"
              >
                {profile.email}
              </a>
            )}

            {profile?.location && (
              <p className="mt-3 text-xs text-white/25">
                {profile.location}
              </p>
            )}
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-[#080808] p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />

              <Input
                label="Company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company"
              />

              <Input
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Opportunity"
              />
            </div>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-[0.15em] text-white/30">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={7}
                required
                placeholder="Tell me about the opportunity..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {status === "success" && (
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                Message sent successfully. I'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />

              {status === "submitting"
                ? "Sending..."
                : "Send message"}
            </button>
          </form>
        </div>
      </Container>
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
  required = false,
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
      required={required}
      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
    />
  </div>
);

export default Contact;