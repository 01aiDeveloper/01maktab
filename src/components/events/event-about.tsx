interface EventAboutProps {
  title: string;
  content: string;
}

export function EventAbout({ title, content }: EventAboutProps) {
  return (
    <section className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-3xl p-8 lg:p-12 mt-8">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{title}</h2>
      <p className="text-lg text-white/70 leading-relaxed">{content}</p>
    </section>
  );
}
