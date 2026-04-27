/**
 * contact-hero — light page header for /contact.
 *
 * Lifted from stardust/prototypes/contact.html `section.open` and
 * rescoped under `.contact-hero`. Mono meta tag with leading rule,
 * mega headline, and a single lede paragraph.
 *
 * Authoring rows (positional):
 *   1. meta tag text (e.g. "// Contact")
 *   2. <h1> headline. Wrap accent in <strong>; nest <em> inside
 *      <strong> for the wavelength-deep accent run.
 *   3. lede paragraph
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

  const metaCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const ledeCell = rows[2]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (metaCell) {
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = text(metaCell);
    inner.append(meta);
  }

  if (headlineCell) {
    const h1 = document.createElement('h1');
    h1.innerHTML = html(headlineCell);
    inner.append(h1);
  }

  if (ledeCell) {
    const p = document.createElement('p');
    p.className = 'lede';
    p.innerHTML = html(ledeCell);
    inner.append(p);
  }

  block.replaceChildren(inner);
}
