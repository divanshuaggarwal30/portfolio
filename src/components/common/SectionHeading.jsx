const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-14 max-w-3xl">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/35">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-white/45 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;