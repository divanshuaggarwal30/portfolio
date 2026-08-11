import Container from "../common/Container";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Divanshu Aggarwal. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/divanshuaggarwal30"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/30 transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/divanshu-aggarwal-522420378"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/30 transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#home"
              className="text-sm text-white/30 transition hover:text-white"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;