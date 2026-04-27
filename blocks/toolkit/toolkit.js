/**
 * toolkit — centered card with a wavelength left-border accent.
 * Quiet drop in the page rhythm: a single mono label, a thin display
 * headline, and a soft body paragraph.
 *
 * Lifted from stardust/prototypes/service-template.html section.toolkit.
 *
 * Authoring rows (positional):
 *   1. label text (e.g. "// 04 / Modern toolkit")
 *   2. <h3> headline. Wrap the accent phrase in <strong>.
 *   3. body paragraph (varies per service — copy verbatim from the
 *      respective service prototype).
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

  const labelCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const bodyCell = rows[2]?.firstElementChild;

  const card = document.createElement('div');
  card.className = 'toolkit-card';

  if (labelCell) {
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = text(labelCell);
    card.append(label);
  }

  if (headlineCell) {
    const h3 = document.createElement('h3');
    h3.innerHTML = html(headlineCell);
    card.append(h3);
  }

  if (bodyCell) {
    const p = document.createElement('p');
    p.innerHTML = html(bodyCell);
    card.append(p);
  }

  block.replaceChildren(card);
}
