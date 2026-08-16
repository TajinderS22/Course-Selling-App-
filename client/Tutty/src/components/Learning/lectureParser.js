const CODE_PREFIX =
  /^(const|let|var|function|async|await|return|if\s*\(|for\s*\(|while\s*\(|import|export|class|from|git|npm|npx|yarn|pnpm|docker|kubectl|helm|terraform|curl|wget|pip\d*|python\d*|node|ssh|scp|cd\b|ls\b|cp\b|mv\b|rm\b|mkdir|chmod|chown|ps\b|top\b|htop|systemctl|journalctl|sudo|apt|brew|source|FROM|WORKDIR|COPY|RUN|EXPOSE|CMD|ENTRYPOINT|apiVersion|kind:|metadata:|spec:|provider\s|resource\s)\b/;

function isCodeLine(t) {
  if (/[—–−]/.test(t)) return false;
  if (/^[ \t]/.test(t)) return true;
  if (CODE_PREFIX.test(t)) return true;
  if (/^#\s/.test(t)) return true;
  if (/^@/.test(t)) return true;
  if (/^<[A-Za-z/]/.test(t)) return true;
  if (/^\d{1,2}\s+\d{1,2}\s+\*\s/.test(t)) return true;
  if (/^\.\.\./.test(t)) return true;
  if (/^[a-z][a-z0-9\-._]*:\s*\S/.test(t)) return true;
  if (/^[a-z][a-z0-9\-._]*:\s*$/.test(t)) return true;
  if (/^[A-Z][A-Z0-9_]*:\s*\S/.test(t)) return true;
  if (/^[A-Za-z_$][\w$]*\(/.test(t)) return true;
  if (/^[A-Za-z_$][\w$]*\./.test(t)) return true;
  if (/^[a-z_$][\w$]*\s*=\s/.test(t)) return true;
  if (/=>|\{|\}|;\s*$/.test(t)) return true;
  if (/\s{2,}#/.test(t)) return true;
  return false;
}

function isAllCaps(s) {
  return s.length > 3 && /[A-Z]/.test(s) && !/[a-z]/.test(s);
}

const stripBullet = (l) => l.replace(/^-\s+/, "");
const stripNumber = (l) => l.replace(/^\d+\.\s+/, "");

function classifyBlock(lines, isFirst) {
  const t = lines.map((l) => l.trim()).filter(Boolean);
  if (!t.length) return null;
  const first = t[0];

  if (isFirst && isAllCaps(first)) {
    return { type: "title", text: first };
  }

  const call = first.match(/^(Practice|Exercise):\s*(.*)$/i);
  if (call) {
    const text = [call[2], ...t.slice(1)].filter(Boolean).join(" ");
    return { type: "callout", label: call[1], text };
  }

  if (
    /^[A-Z][A-Za-z0-9 &/'()+\-.—,#!]{0,60}:\s*$/.test(first) &&
    !isCodeLine(first)
  ) {
    const label = first.replace(/:\s*$/, "");
    const rest = t.slice(1);
    if (!rest.length) return { type: "heading", text: label };
    if (rest.every((l) => /^-\s/.test(l)))
      return {
        type: "heading",
        text: label,
        list: { ordered: false, items: rest.map(stripBullet) },
      };
    if (rest.every((l) => /^\d+\.\s/.test(l))) {
      const items = rest.map(stripNumber);
      if (label.toLowerCase() === "learning objectives")
        return { type: "objectives", items };
      return {
        type: "heading",
        text: label,
        list: { ordered: true, items },
      };
    }
    if (rest.every(isCodeLine))
      return { type: "heading", text: label, code: rest.join("\n") };
    return { type: "heading", text: label, paragraph: rest.join(" ") };
  }

  if (t.every((l) => /^-\s/.test(l)))
    return { type: "list", ordered: false, items: t.map(stripBullet) };
  if (t.every((l) => /^\d+\.\s/.test(l)))
    return { type: "list", ordered: true, items: t.map(stripNumber) };
  if (t.every(isCodeLine)) return { type: "code", code: t.join("\n") };
  return { type: "paragraph", text: t.join(" ") };
}

export function parseLecture(content) {
  if (!content) return [];
  const rawLines = String(content).split(/\r?\n/);
  const blocks = [];
  let current = [];
  const flush = () => {
    if (current.length) {
      const block = classifyBlock(current, blocks.length === 0);
      if (block) blocks.push(block);
      current = [];
    }
  };
  for (const line of rawLines) {
    if (!line.trim()) flush();
    else current.push(line);
  }
  flush();
  return blocks;
}

export function inlineParts(text) {
  const m = text.match(/^([A-Z][A-Za-z0-9 &/'()+\-.]{1,45}):\s+(.+)$/);
  if (m) return { label: `${m[1]}:`, rest: m[2] };
  return { rest: text };
}
