import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../common/Container";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <Container className="pt-4">
        <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-5 backdrop-blur-xl">
          
          <a
            href="#home"
            className="text-lg font-bold tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            DA<span className="text-white/40">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/60 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Navbar;