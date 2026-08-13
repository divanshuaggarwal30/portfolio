import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Container from "../common/Container";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navItems
        .map((item) => item.href.replace("#", ""))
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const current = sections
        .slice()
        .reverse()
        .find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 160;
        });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-3 sm:pt-4">
        <nav
          className={`relative flex h-14 items-center justify-between rounded-2xl border px-3 transition-all duration-500 sm:h-16 sm:px-4 ${
            scrolled
              ? "border-white/10 bg-black/75 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              : "border-white/[0.07] bg-black/35 backdrop-blur-xl"
          }`}
        >
          {/* BRAND */}

          <a
            href="#home"
            onClick={closeMenu}
            className="group flex items-center gap-3 rounded-xl px-2 py-1.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[10px] font-semibold tracking-tight text-white/80 transition group-hover:border-white/20 group-hover:bg-white/[0.07]">
              DA
            </span>

            <span className="hidden text-xs font-medium text-white/50 transition group-hover:text-white sm:block">
              Divanshu Aggarwal
            </span>
          </a>

          {/* DESKTOP NAV */}

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/[0.06] bg-white/[0.025] p-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const active = activeSection === id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2 text-xs font-medium transition-colors lg:px-4"
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 ${
                      active
                        ? "text-white"
                        : "text-white/35 hover:text-white/80"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* DESKTOP CTA */}

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Let's talk

              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.07] hover:text-white md:hidden"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* MOBILE NAV */}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const active = activeSection === id;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm transition ${
                      active
                        ? "bg-white/[0.07] text-white"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>

                    <ArrowUpRight
                      size={14}
                      className="text-white/20"
                    />
                  </a>
                );
              })}

              <div className="my-2 h-px bg-white/[0.06]" />

              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-black"
              >
                Let's talk
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Navbar;