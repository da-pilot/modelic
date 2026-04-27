/**
 * approach-dark — dark 3-column tenets section.
 *
 * Lifted from stardust/prototypes/home-b-v1.html `section.approach`. A dark
 * ink-rich background with a faint white grid overlay (radial-masked),
 * an eyebrow, headline, three tenet cards (number / heading / paragraph),
 * and a right-aligned text-link footer.
 *
 * Authoring shape (positional rows):
 *   1. eyebrow      — e.g. "03 / How we work"
 *   2. headline     — <h2> with <strong> for accent emphasis
 *   3..5. tenets    — three cells per tenet, in order. Each tenet cell is:
 *                       <p>/ 01</p>          number
 *                       <h3>We partner.</h3> heading
 *                       <p>… body …</p>      paragraph
 *   6. footer link  — single cell with one anchor: "How we work →"
 *                     Plain <a> (no <strong>/<em>) — rendered as a
 *                     wavelength-underlined text link, not a button.
 */

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildTenet(cell) {
  if (!cell) return null;
  const tenet = document.createElement('div');
  tenet.className = 'tenet';

  const ps = [...cell.querySelectorAll('p')];
  const h = cell.querySelector('h3, h4');

  if (ps[0]) {
    const num = document.createElement('div');
    num.className = 'num';
    num.innerHTML = ps[0].innerHTML.trim();
    tenet.append(num);
  }
  if (h) {
    const hh = document.createElement('h3');
    hh.innerHTML = h.innerHTML.trim();
    tenet.append(hh);
  }
  if (ps[1]) {
    const p = document.createElement('p');
    p.innerHTML = ps[1].innerHTML.trim();
    tenet.append(p);
  }
  return tenet;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const tenetCells = [
    rows[2]?.firstElementChild,
    rows[3]?.firstElementChild,
    rows[4]?.firstElementChild,
  ];
  const footerCell = rows[5]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'section-eyebrow';
    eyebrow.innerHTML = '<span class="dot"></span><span></span>';
    eyebrow.querySelector('span:last-child').textContent = eyebrowCell.textContent.trim();
    inner.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.className = 'approach-headline';
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  const tenets = document.createElement('div');
  tenets.className = 'tenets';
  tenetCells.forEach((cell) => {
    const tenet = buildTenet(cell);
    if (tenet) tenets.append(tenet);
  });
  inner.append(tenets);

  if (footerCell && footerCell.querySelector('a')) {
    const footer = document.createElement('div');
    footer.className = 'approach-footer';
    const linkEl = footerCell.querySelector('a');
    const link = document.createElement('a');
    link.className = 'btn-text-light';
    link.href = linkEl.getAttribute('href');
    link.innerHTML = linkEl.innerHTML;
    footer.append(link);
    inner.append(footer);
  }

  block.replaceChildren(inner);
}
