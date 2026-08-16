import { parseLecture } from "./lectureParser";

function renderInline(t) {
  if (t.includes("`"))
    return t.split("`").map((part, i) =>
      i % 2 ? (
        <code key={i}>{part}</code>
      ) : (
        part
      )
    );
  return t;
}

export default function LectureContent({ content }) {
  const blocks = parseLecture(content);

  return (
    <div className="lecture-body flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.type === "title")
          return (
            <h1 key={i} className="font-display text-2xl font-bold tracking-tight text-ink">
              {b.text}
            </h1>
          );
        if (b.type === "objectives")
          return (
            <div key={i} className="rounded-md border border-primary/25 bg-primary-soft px-5 py-4">
              <p className="font-display text-sm font-bold tracking-wide text-primary uppercase">
                Learning objectives
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            </div>
          );
        if (b.type === "callout")
          return (
            <div key={i} className="rounded-md border-l-4 border-secondary bg-secondary-soft px-5 py-4">
              <p className="font-display font-semibold text-ink">{b.label}</p>
              <p className="mt-1 text-ink-soft">{renderInline(b.text)}</p>
            </div>
          );
        if (b.type === "heading") {
          const content = b.list ? (
            b.list.ordered ? (
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink">
                {b.list.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
                {b.list.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            )
          ) : b.code ? (
            <pre className="lecture-code mt-2">{b.code}</pre>
          ) : (
            <p className="mt-1 text-ink">{renderInline(b.paragraph)}</p>
          );
          return (
            <section key={i}>
              <h2 className="font-display text-lg font-bold text-ink">{b.text}</h2>
              {content}
            </section>
          );
        }
        if (b.type === "code")
          return (
            <pre key={i} className="lecture-code">{b.code}</pre>
          );
        if (b.type === "list")
          return b.ordered ? (
            <ol key={i} className="list-decimal space-y-1 pl-5 text-ink">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ol>
          ) : (
            <ul key={i} className="list-disc space-y-1 pl-5 text-ink">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="leading-relaxed text-ink">
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
