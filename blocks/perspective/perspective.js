/**
 * perspective — section header eyebrow + thin headline above a 2-column
 * body copy block.
 *
 * Lifted from stardust/prototypes/service-template.html section.perspective.
 * The eyebrow renders as a row of mono caps with a wavelength-deep dot.
 * The headline supports inline <strong> for weight emphasis and nested
 * <strong><em> for the wavelength-deep accent run.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 02 / Perspective")
 *   2. <h2> headline. Wrap accent phrase in <strong>; nest <em> inside
 *      <strong> for the wavelength-deep accent run.
 *   3. left column body copy (one or more <p>s)
 *   4. right column body copy (one or more <p>s)
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
  const leftCell = rows[2]?.firstElementChild;
  const rightCell = rows[3]?.firstElementChild;

  const frag = document.createDocumentFragment();

  if (eyebrowCell) {
    const header = document.createElement('div');
    header.className = 'sec-header';
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('aria-hidden', 'true');
    const span = document.createElement('span');
    span.textContent = text(eyebrowCell);
    header.append(dot, span);
    frag.append(header);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    frag.append(h2);
  }

  if (leftCell || rightCell) {
    const body = document.createElement('div');
    body.className = 'body';

    const left = document.createElement('div');
    if (leftCell) {
      [...leftCell.childNodes].forEach((n) => left.append(n.cloneNode(true)));
    }
    body.append(left);

    const right = document.createElement('div');
    if (rightCell) {
      [...rightCell.childNodes].forEach((n) => right.append(n.cloneNode(true)));
    }
    body.append(right);

    frag.append(body);
  }

  block.replaceChildren(frag);
}
