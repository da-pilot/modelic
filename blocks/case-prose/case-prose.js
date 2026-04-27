/**
 * case-prose — light-bg text-led prose module for case studies.
 *
 * SIBLING block to case-prose-tinted (NOT a variant). Per the locked
 * conversion plan, the tinted beige treatment lives in its own block —
 * authors choose the block, not a variant cell.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.module.text-led` and rescoped under .case-prose.
 *
 * Authoring rows (positional):
 *   1. eyebrow/tag text (e.g. "// 03 / The brief")
 *   2. <h2> headline. Wrap accent words in <strong> for bold treatment.
 *   3..N body — each subsequent row is a body block:
 *      - plain paragraph text → rendered as a <p> (innerHTML preserved
 *        so inline <strong>/<em> survive)
 *      - cell containing a quoted brief paragraph → rendered as a brief
 *        block (left-rule italic) when the row's first paragraph is
 *        wrapped in straight or curly double quotes.
 *
 * Notes
 * - For the brief variation in M3 (the client-voice quote), authors can
 *   write the body cell as a normal paragraph that begins with a quote
 *   character; this block detects that and applies .brief-block styling.
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function isBrief(s) {
  if (!s) return false;
  const t = s.trim();
  return t.startsWith('"') || t.startsWith('“');
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const bodyCells = rows.slice(2).map((r) => r.firstElementChild).filter(Boolean);

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const tag = document.createElement('div');
    tag.className = 'module-tag';
    tag.innerHTML = `<span class="dot"></span><span>${text(eyebrowCell)}</span>`;
    inner.append(tag);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  bodyCells.forEach((cell) => {
    const cellHtml = html(cell);
    const cellText = text(cell);
    if (isBrief(cellText)) {
      const wrap = document.createElement('div');
      wrap.className = 'brief-block';
      const p = document.createElement('p');
      p.innerHTML = cellHtml;
      wrap.append(p);
      inner.append(wrap);
    } else {
      const p = document.createElement('p');
      p.innerHTML = cellHtml;
      inner.append(p);
    }
  });

  block.replaceChildren(inner);
}
