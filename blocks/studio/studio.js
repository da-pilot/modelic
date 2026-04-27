/**
 * studio — dark "what happens after you send" 2-column block.
 *
 * Lifted from stardust/prototypes/contact.html `section.studio` and
 * rescoped under `.studio`. Dark ink-rich background with a soft
 * right-side radial wash. The block is a 2-column grid (words on
 * the left, empty space on the right for visual rhythm). At the end
 * of the block markup we inline the decorative `.closing-wave` SVG
 * lifted from contact.html (no separate `closing-wave` block exists
 * per the locked plan).
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 03 / What happens after you send")
 *   2. <h2> headline. Wrap accent in <strong> for wavelength.
 *   3. body — one cell containing 1+ paragraphs.
 *   4. stats — one cell with 1+ paragraphs each formatted
 *      "Label · Value". The dot separates eyebrow label from value.
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildStats(cell) {
  if (!cell) return null;
  const wrap = document.createElement('div');
  wrap.className = 'studio-stats';

  [...cell.querySelectorAll('p')].forEach((p) => {
    const line = p.textContent.trim();
    if (!line) return;
    const [label, ...rest] = line.split(/\s*[·•]\s*/);
    const value = rest.join(' · ');
    const stat = document.createElement('div');
    stat.className = 'studio-stat';
    const lab = document.createElement('div');
    lab.className = 'label';
    lab.textContent = label || '';
    const v = document.createElement('div');
    v.className = 'v';
    v.textContent = value || '';
    stat.append(lab, v);
    wrap.append(stat);
  });
  return wrap;
}

function buildClosingWave() {
  const wrap = document.createElement('div');
  wrap.className = 'closing-wave';
  wrap.setAttribute('aria-hidden', 'true');
  // Inline SVG lifted from contact.html — decorative wave divider.
  wrap.innerHTML = `
    <svg viewBox="0 0 240 56" preserveAspectRatio="none">
      <path class="a" d="M0,28 Q24,0 48,28 T96,28 T144,28 T192,28 T240,28" />
      <path class="b" d="M0,28 Q24,56 48,28 T96,28 T144,28 T192,28 T240,28" />
    </svg>
  `;
  return wrap;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const bodyCell = rows[2]?.firstElementChild;
  const statsCell = rows[3]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  const words = document.createElement('div');
  words.className = 'studio-words';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'sec-header';
    const dot = document.createElement('span');
    dot.className = 'dot';
    const label = document.createElement('span');
    label.textContent = text(eyebrowCell);
    eyebrow.append(dot, label);
    words.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    words.append(h2);
  }

  if (bodyCell) {
    [...bodyCell.children].forEach((node) => {
      words.append(node.cloneNode(true));
    });
  }

  const stats = buildStats(statsCell);
  if (stats) words.append(stats);

  const right = document.createElement('div');

  inner.append(words, right);

  block.replaceChildren(inner, buildClosingWave());
}
