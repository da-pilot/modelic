/**
 * partnership — dark ink-rich panel with a 2-column layout: eyebrow +
 * headline on the left, body paragraph on the right.
 *
 * Lifted from stardust/prototypes/service-template.html section.partnership.
 * The eyebrow uses the on-dark variant of the section header (white-tinted
 * mono caps with a wavelength dot). The headline supports inline <strong>
 * for the wavelength accent run.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 05 / Partnership")
 *   2. <h2> headline. Wrap the accent phrase in <strong>.
 *   3. body paragraph (one or more <p>s).
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

  if (eyebrowCell) {
    const header = document.createElement('div');
    header.className = 'sec-header on-dark';
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('aria-hidden', 'true');
    const span = document.createElement('span');
    span.textContent = text(eyebrowCell);
    header.append(dot, span);
    left.append(header);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    left.append(h2);
  }

  inner.append(left);

  const right = document.createElement('div');
  if (bodyCell) {
    [...bodyCell.childNodes].forEach((n) => right.append(n.cloneNode(true)));
  }
  inner.append(right);

  block.replaceChildren(inner);
}
