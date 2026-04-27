/**
 * service-hero — dark hero for service pages.
 *
 * Lifted from stardust/prototypes/service-template.html section.hero. Dark
 * ink-rich background with a faint top wavelength gradient line and a soft
 * radial pulse anchored bottom-right. Headline supports inline <strong>
 * (and optional <em>) for wavelength-colored emphasis.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// Services / Design")
 *   2. <h1> headline. Wrap the accent phrase in <strong> to color it
 *      wavelength; nest <em> inside <strong> for an additional accent run.
 *   3. subhead body paragraph
 *   4. CTAs — wrap primary in <strong>, secondary in <em>. The link
 *      decorator in scripts/ak.js applies .btn / .btn-primary /
 *      .btn-secondary; this block clones the cell's child nodes verbatim
 *      into a .actions wrapper.
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const subheadCell = rows[2]?.firstElementChild;
  const ctaCell = rows[3]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const meta = document.createElement('div');
    meta.className = 'hero-meta';
    meta.textContent = text(eyebrowCell);
    inner.append(meta);
  }

  if (headlineCell) {
    const h1 = document.createElement('h1');
    h1.innerHTML = html(headlineCell);
    inner.append(h1);
  }

  if (subheadCell) {
    const p = document.createElement('p');
    p.className = 'subhead';
    p.innerHTML = html(subheadCell);
    inner.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    inner.append(actions);
  }

  block.replaceChildren(inner);
}
