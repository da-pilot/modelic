/**
 * work-style — dark "how a project actually works" 2-column block.
 *
 * Lifted from stardust/prototypes/team.html `section.work-style` and
 * rescoped under `.work-style`. Dark ink-rich background with a soft
 * top-right radial wash. Two columns: eyebrow + headline on the left,
 * body paragraphs on the right.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 03 / Working with us")
 *   2. <h2> headline. Wrap accent words in <strong> for wavelength.
 *   3. body — one cell containing 1+ paragraphs.
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
  const bodyCell = rows[2]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  const left = document.createElement('div');
  left.className = 'left';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'sec-header on-dark';
    const dot = document.createElement('span');
    dot.className = 'dot';
    const label = document.createElement('span');
    label.textContent = text(eyebrowCell);
    eyebrow.append(dot, label);
    left.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    left.append(h2);
  }

  const right = document.createElement('div');
  right.className = 'right';
  if (bodyCell) {
    [...bodyCell.children].forEach((node) => {
      right.append(node.cloneNode(true));
    });
  }

  inner.append(left, right);
  block.replaceChildren(inner);
}
