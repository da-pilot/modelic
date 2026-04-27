/**
 * team-hero — page intro for /team.
 *
 * Lifted from stardust/prototypes/team.html `section.intro` and
 * rescoped under `.team-hero`. Light surface with a meta tag, mega
 * headline, lede, and a manifesto card with a wavelength left border.
 *
 * Authoring rows (positional):
 *   1. meta tag text (e.g. "// The team")
 *   2. <h1> headline. Wrap accent in <strong> (bold) and nest <em>
 *      inside <strong> for the wavelength-deep accent run.
 *   3. lede paragraph
 *   4. manifesto card — one cell containing 1+ paragraphs. <strong>
 *      runs are rendered semi-bold inside the card.
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
  const manifestoCell = rows[3]?.firstElementChild;

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

  if (manifestoCell) {
    const manifesto = document.createElement('div');
    manifesto.className = 'manifesto';
    [...manifestoCell.children].forEach((node) => {
      manifesto.append(node.cloneNode(true));
    });
    inner.append(manifesto);
  }

  block.replaceChildren(inner);
}
