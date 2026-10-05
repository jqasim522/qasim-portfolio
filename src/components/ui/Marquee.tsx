const rows = [
  { items: ['PYTHON', 'LANGGRAPH', 'YOLOV8', 'FASTAPI', 'GROQ'], rev: false },
  { items: ['TENSORFLOW', 'REACT', 'DJANGO', 'DOCKER', 'RAG'], rev: true },
];

function Half({ items, dup }: { items: string[]; dup?: boolean }) {
  return (
    <ul className={`flex shrink-0 items-center ${dup ? 'mq-dup' : ''}`} aria-hidden={dup || undefined}>
      {[...items, ...items, ...items].map((t, i) => (
        <li key={i} className="flex items-center font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-t2">
          <span className="px-7">{t}</span><span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

/** Two rows, opposite directions. Pure CSS (no hydration). Static wrapped row below 640px. */
export default function Marquee() {
  return (
    <div className="mq fade-x" aria-label="Core technologies">
      {rows.map((r, i) => (
        <div key={i} className={`mq-row ${r.rev ? 'rev' : ''}`}><Half items={r.items} /><Half items={r.items} dup /></div>
      ))}
    </div>
  );
}
