/**
 * tenets — dark "three tenets" block with sticky-left tenet headers.
 *
 * Lifted from stardust/prototypes/approach.html `section.tenets` and
 * rescoped under `.tenets`. Dark background with a soft top-right
 * radial wash. Each tenet is a 1fr/2fr split: left column sticks at
 * scroll with a number + headline; right column has body paragraphs.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 03 / Three things we hold to")
 *   2. <h2> headline. Wrap accent in <strong> for wavelength.
 *   3..n. tenets — each row is one tenet cell containing:
 *           <p>/ 01</p>           tenet number
 *           <h3>We <em>partner.</em></h3>   headline (em is wavelength italic)
 *           <p>Body paragraph.</p>          1+ body paragraphs follow
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildTenet(cell) {
  const tenet = document.createElement('div');
  tenet.className = 'tenet';

  const left = document.createElement('div');
  left.className = 'left';

  const ps = [...cell.children].filter((el) => el.tagName === 'P');
  const h = cell.querySelector('h3, h4');

  if (ps[0]) {
    const num = document.createElement('div');
    num.className = 'num';
    num.innerHTML = ps[0].innerHTML.trim();
    left.append(num);
  }
  if (h) {
    const h3 = document.createElement('h3');
    h3.innerHTML = h.innerHTML.trim();
    left.append(h3);
  }

  const right = document.createElement('div');
  right.className = 'right';
  ps.slice(1).forEach((p) => {
    right.append(p.cloneNode(true));
  });

  tenet.append(left, right);
  return tenet;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const tenetCells = rows.slice(2).map((r) => r.firstElementChild).filter(Boolean);

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'sec-header on-dark';
    const dot = document.createElement('span');
    dot.className = 'dot';
    const label = document.createElement('span');
    label.textContent = text(eyebrowCell);
    eyebrow.append(dot, label);
    inner.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  tenetCells.forEach((cell) => {
    inner.append(buildTenet(cell));
  });

  block.replaceChildren(inner);
}
