type Props = { text: string };

export const ResultText = ({ text }: Props) => {
  const lines = text.split("\n").filter((l) => l.trim());

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        // **Category:** ... эсвэл ## Category гэсэн format
        const boldMatch = line.match(/^\*\*(.+?)\*\*[:\s]*(.*)/);
        const hashMatch = line.match(/^#{1,3}\s+(.+)/);

        if (boldMatch) {
          return (
            <p key={i}>
              <b>{boldMatch[1]}:</b> {boldMatch[2]}
            </p>
          );
        }
        if (hashMatch) {
          return (
            <p key={i} className="font-semibold text-slate-800 mt-2">
              {hashMatch[1]}
            </p>
          );
        }
        return <p key={i}>{line.replace(/^[-•]\s*/, "• ")}</p>;
      })}
    </div>
  );
};
