/**
 * work-index — alternating editorial rows of work tiles.
 *
 * Lifted from stardust/prototypes/work.html `section.index` and
 * rescoped under `.work-index`. The prototype renders 5 rows in a
 * 2-1-2-1-2 cadence (pair, feature, pair, feature, pair). Each pair
 * row is two 3:2 tiles; each feature row is a single 21:9 wide tile.
 *
 * Authoring rows: each top-level row is one tile. Tile cells contain
 * (positionally):
 *   <picture> background image (alt text describes the photo)
 *   <p>// 01</p>           index/eyebrow
 *   <h3>Project name</h3>   tile name
 *   <p><em>Discipline · Discipline</em></p>   discipline tag
 *   <p>Outcome line.</p>    outcome / synopsis
 *   <p><a href="…">…</a></p>  link → becomes the tile anchor
 *
 * The block reflows tiles into rows by counting featured cells —
 * tiles whose first <p> contains the substring "Feature" (case-insensitive)
 * become full-bleed feature tiles in a `.row.feature`. All other tiles
 * pair up two-per-row in `.row.pair` rows in document order.
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function isFeature(cell) {
  const firstP = cell.querySelector('p');
  if (!firstP) return false;
  return /feature/i.test(firstP.textContent);
}

function buildTile(cell, feat) {
  const linkEl = cell.querySelector('a');
  const href = linkEl ? linkEl.getAttribute('href') : '#';

  const tile = document.createElement('a');
  tile.className = `tile${feat ? ' feat' : ''}`;
  tile.href = href;

  const picture = pic(cell);
  if (picture) tile.append(picture.cloneNode(true));

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  tile.append(overlay);

  const openTag = document.createElement('span');
  openTag.className = 'open-tag';
  openTag.textContent = feat ? 'Featured · Open ↗' : 'Open ↗';
  tile.append(openTag);

  const label = document.createElement('div');
  label.className = 'label';

  // Pull text children, skipping the link <p>.
  const ps = [...cell.children].filter((el) => el.tagName === 'P' && !el.querySelector('a'));
  const h = cell.querySelector('h3, h4');

  if (ps[0]) {
    const idx = document.createElement('span');
    idx.className = 'index';
    idx.innerHTML = ps[0].innerHTML.trim();
    label.append(idx);
  }
  if (h) {
    const name = document.createElement('span');
    name.className = 'name';
    name.innerHTML = h.innerHTML.trim();
    label.append(name);
  }
  if (ps[1]) {
    const rowMeta = document.createElement('div');
    rowMeta.className = 'row-meta';
    const disc = document.createElement('span');
    disc.className = 'disc';
    disc.innerHTML = ps[1].innerHTML.trim();
    rowMeta.append(disc);
    label.append(rowMeta);
  }
  if (ps[2]) {
    const outcome = document.createElement('p');
    outcome.className = 'outcome';
    outcome.innerHTML = ps[2].innerHTML.trim();
    label.append(outcome);
  }

  tile.append(label);
  return tile;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const tiles = rows
    .map((row) => row.firstElementChild)
    .filter(Boolean);

  // Reflow into rows: feature → its own .row.feature; non-features
  // pair up two-at-a-time into .row.pair rows.
  const out = [];
  let pairBuffer = null;

  tiles.forEach((cell) => {
    const feat = isFeature(cell);
    const tileEl = buildTile(cell, feat);

    if (feat) {
      if (pairBuffer) { out.push(pairBuffer); pairBuffer = null; }
      const r = document.createElement('div');
      r.className = 'row feature';
      r.append(tileEl);
      out.push(r);
    } else {
      if (!pairBuffer) {
        pairBuffer = document.createElement('div');
        pairBuffer.className = 'row pair';
      }
      pairBuffer.append(tileEl);
      if (pairBuffer.children.length === 2) {
        out.push(pairBuffer);
        pairBuffer = null;
      }
    }
  });

  if (pairBuffer) out.push(pairBuffer);

  block.replaceChildren(...out);
}
