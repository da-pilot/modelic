/**
 * related — light-bg "adjacent case studies" tile grid.
 *
 * 16:9 image tiles with a bottom gradient overlay and a label group
 * (discipline tag + project name). The whole tile is the link.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.related` and rescoped under .related.
 *
 * Authoring rows (positional):
 *   1. eyebrow/tag text (e.g. "// 09 / More work")
 *   2. <h2> headline. Wrap accent words in <strong> for bold treatment.
 *   3..N tile rows — one row per tile, four cells per row:
 *      - cell[0] <picture>/<img> tile background
 *      - cell[1] discipline label (e.g. "Brand · Commerce")
 *      - cell[2] project name (e.g. "Cinelli USA")
 *      - cell[3] link target (the cell's <a> href is used; the tile is
 *        wrapped in that anchor). Authors put the URL as a plain link in
 *        this cell — only the href is read; the tile's clickable surface
 *        is the whole rendered <a>.
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function href(cell) {
  if (!cell) return '#';
  const a = cell.querySelector('a');
  return a?.href || a?.getAttribute('href') || text(cell) || '#';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const tileRows = rows.slice(2);

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const tag = document.createElement('div');
    tag.className = 'module-tag';
    tag.innerHTML = `<span class="dot"></span><span>${text(eyebrowCell)}</span>`;
    inner.append(tag);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  if (tileRows.length) {
    const tiles = document.createElement('div');
    tiles.className = 'related-tiles';

    tileRows.forEach((row) => {
      const cells = [...row.children];
      const imgCell = cells[0];
      const discCell = cells[1];
      const nameCell = cells[2];
      const linkCell = cells[3];

      const tile = document.createElement('a');
      tile.className = 'rel-tile';
      tile.href = href(linkCell);

      const picture = pic(imgCell);
      if (picture) tile.append(picture.cloneNode(true));

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      tile.append(overlay);

      const label = document.createElement('div');
      label.className = 'label';
      if (discCell) {
        const disc = document.createElement('span');
        disc.className = 'disc';
        disc.textContent = text(discCell);
        label.append(disc);
      }
      if (nameCell) {
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = text(nameCell);
        label.append(name);
      }
      tile.append(label);

      tiles.append(tile);
    });

    inner.append(tiles);
  }

  block.replaceChildren(inner);
}
