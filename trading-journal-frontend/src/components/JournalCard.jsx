function JournalCard() {
  return (
    <div className="
    bg-black/40
    backdrop-blur-xl
    rounded-3xl
    p-8
    shadow-2xl">

      <h2 className="text-3xl font-bold">
        Journal Notes
      </h2>

      <textarea
        className="
        mt-6
        w-full
        h-40
        bg-black/20
        rounded-2xl
        p-4"
        placeholder="Write today's thoughts..."
      />

    </div>
  );
}

export default JournalCard;