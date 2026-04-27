/**
 * recent — 2-column "recent work" tile grid.
 *
 * Lifted from stardust/prototypes/team.html `section.recent` and
 * rescoped under `.recent`. Eyebrow + headline above a 2-column 16:10
 * tile grid. Each tile is an anchor with image, gradient overlay, and
 * a discipline + name label pinned bottom-left.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 04 / Recent work")
 *   2. <h2> headline. Wrap accent in <strong> for emphasis.
 *   3..n. tiles — each row is one tile cell containing:
 *           <picture> image
 *           <p><em>Discipline · Discipline</em></p>
 *           <h3>Project name</h3>
 *           <p><a href="…">…</a></p>   becomes the tile anchor href
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

function buildTile(cell) {
  const linkEl = cell.querySelector('a');
  const href = linkEl ? linkEl.getAttribute('href') : '#';

  const tile = document.createElement('a');
  tile.className = 'rec-tile';
  tile.href = href;

  const picture = pic(cell);
  if (picture) tile.append(picture.cloneNode(true));

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  tile.append(overlay);

  const label = document.createElement('div');
  label.className = 'label';

  const ps = [...cell.children].filter((el) => el.tagName === 'P' && !el.querySelector('a'));
  const h = cell.querySelector('h3, h4');

  if (ps[0]) {
    const disc = document.createElement('span');
    disc.className = 'disc';
    disc.innerHTML = ps[0].innerHTML.trim();
    label.append(disc);
  }
  if (h) {
    const name = document.createElement('span');
    name.className = 'name';
    name.innerHTML = h.innerHTML.trim();
    label.append(name);
  }

  tile.append(label);
  return tile;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const tileCells = rows.slice(2).map((r) => r.firstElementChild).filter(Boolean);

  const out = [];

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'sec-header';
    const dot = document.createElement('span');
    dot.className = 'dot';
    const label = document.createElement('span');
    label.textContent = text(eyebrowCell);
    eyebrow.append(dot, label);
    out.push(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    out.push(h2);
  }

  const tiles = document.createElement('div');
  tiles.className = 'recent-tiles';
  tileCells.forEach((cell) => {
    tiles.append(buildTile(cell));
  });
  out.push(tiles);

  block.replaceChildren(...out);
}
