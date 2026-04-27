/**
 * approach-hero — dark page hero for /approach.
 *
 * Lifted from stardust/prototypes/approach.html `section.hero` and
 * rescoped under `.approach-hero`. Dark ink-rich background with a
 * 1px wavelength gradient line at the top and a soft top-right radial
 * wash. Mono meta tag, mega headline, and a generous subhead.
 *
 * Authoring rows (positional):
 *   1. meta tag text (e.g. "// Modelic / How we work")
 *   2. <h1> headline. Wrap accent words in <strong> for wavelength;
 *      nest <em> inside <strong> for an italic accent run.
 *   3. subhead body paragraph
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
  const subheadCell = rows[2]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (metaCell) {
    const meta = document.createElement('div');
    meta.className = 'hero-meta';
    meta.textContent = text(metaCell);
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

  block.replaceChildren(inner);
}
