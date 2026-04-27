/**
 * work-bento — selected-work bento grid (6 case-study tiles + a "see all" tile).
 *
 * Lifted from stardust/prototypes/home-b-v1.html `section.work` (data-layout=
 * "bento-grid"). One feature tile, one tall tile, two squares, one wide tile,
 * one square, plus a dark "see more" tile that closes the grid.
 *
 * Authoring shape (positional rows):
 *
 *   1. eyebrow      — e.g. "02 / Selected work"
 *   2. headline     — <h2> with optional <strong>/<em> for emphasis runs
 *   3. stats        — three "value | label" pairs separated by " · " on
 *                     individual lines, OR three rows-as-cells. Format the
 *                     cell as a paragraph per stat: "8 · Projects" (value
 *                     before the middle-dot, label after).
 *   4..9. tiles     — exactly 6 case-study tiles in display order:
 *                       feature, tall, s1, s2, wide, s3
 *                     Each tile is a single cell containing, in order:
 *                       <picture> background image
 *                       <p>// 01 / Featured</p>   index/eyebrow
 *                       <h3>Utah Food Bank</h3>   name
 *                       <p><em>Accessibility · Commerce</em></p>  discipline
 *                       <p>Outcome line…</p>      (optional, feature only)
 *                       <p><a href="/case-studies/utah-food-bank">…</a></p>  link
 *  10. more         — "see all" tile, single cell with three lines:
 *                       <p>// 07 +</p>   top eyebrow
 *                       <h3>+2</h3>      big number
 *                       <p><a href="/work">See all 8 →</a></p>   arrow link
 *  11. (optional)   — currently unused; future footer link slot.
 *
 * The link decorator does NOT apply button classes here because each tile's
 * link is wrapped in a plain <p><a> (no <strong>/<em> button hint). The block
 * uses the tile's anchor as the tile element, mirroring the prototype.
 */

const TILE_VARIANTS = ['feature', 'tall', 's1', 's2', 'wide', 's3'];

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildTile(cell, variant) {
  if (!cell) return null;

  // Pull anchor href from the tile cell (last <a> inside the cell).
  const linkEl = cell.querySelector('a');
  const href = linkEl ? linkEl.getAttribute('href') : '#';

  const tile = document.createElement('a');
  tile.className = `bento-tile ${variant}`;
  tile.href = href;

  const picture = pic(cell);
  if (picture) tile.append(picture.cloneNode(true));

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  tile.append(overlay);

  const label = document.createElement('div');
  label.className = 'label';

  // Walk the cell's <p> / <h3> children in order. We treat them positionally:
  //   first <p>     → .index
  //   first <h3>    → .name
  //   second <p>    → .disc
  //   third <p>     → .outcome (only honored on feature tile)
  // <p>s wrapping a <picture> or an <a> are skipped (they're chrome).
  const ps = [...cell.children].filter((el) => (
    el.tagName === 'P'
    && !el.querySelector('a')
    && !el.querySelector('picture, img')
  ));
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
    const disc = document.createElement('span');
    disc.className = 'disc';
    // Strip wrapping <em> so the discipline reads as a flat string.
    disc.innerHTML = ps[1].innerHTML.trim();
    label.append(disc);
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

function buildMore(cell) {
  if (!cell) return null;
  const linkEl = cell.querySelector('a');
  const href = linkEl ? linkEl.getAttribute('href') : '#';

  const more = document.createElement('a');
  more.className = 'bento-more';
  more.href = href;

  const ps = [...cell.children].filter((el) => el.tagName === 'P' && !el.querySelector('a'));
  const h = cell.querySelector('h3, h4');
  const linkP = [...cell.children].find((el) => el.tagName === 'P' && el.querySelector('a'));

  if (ps[0]) {
    const top = document.createElement('span');
    top.className = 'top';
    top.innerHTML = ps[0].innerHTML.trim();
    more.append(top);
  }
  if (h) {
    const num = document.createElement('span');
    num.className = 'num';
    num.innerHTML = h.innerHTML.trim();
    more.append(num);
  }
  if (linkP) {
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.innerHTML = linkP.querySelector('a').innerHTML.trim();
    more.append(arrow);
  }
  return more;
}

function buildStats(cell) {
  if (!cell) return null;
  // Each <p> is one stat formatted "value · label".
  const items = [...cell.querySelectorAll('p')]
    .map((p) => p.textContent.trim())
    .filter(Boolean);

  const box = document.createElement('div');
  box.className = 'stat-box';
  items.forEach((line) => {
    const [value, ...rest] = line.split(/\s*[·•]\s*/);
    const label = rest.join(' · ');
    const item = document.createElement('div');
    item.className = 'item';
    const v = document.createElement('div');
    v.className = 'v';
    v.textContent = value || '';
    const l = document.createElement('div');
    l.className = 'l';
    l.textContent = label || '';
    item.append(v, l);
    box.append(item);
  });
  return box;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const statsCell = rows[2]?.firstElementChild;
  const tileCells = TILE_VARIANTS.map((_, i) => rows[3 + i]?.firstElementChild);
  const moreCell = rows[9]?.firstElementChild;

  // Header
  const header = document.createElement('div');
  header.className = 'work-header';

  const headLeft = document.createElement('div');

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'section-eyebrow';
    eyebrow.innerHTML = '<span class="dot"></span><span></span>';
    eyebrow.querySelector('span:last-child').textContent = eyebrowCell.textContent.trim();
    headLeft.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    headLeft.append(h2);
  }

  header.append(headLeft);

  const statBox = buildStats(statsCell);
  if (statBox) header.append(statBox);

  // Bento grid
  const bento = document.createElement('div');
  bento.className = 'bento';

  tileCells.forEach((cell, i) => {
    const tile = buildTile(cell, TILE_VARIANTS[i]);
    if (tile) bento.append(tile);
  });

  const more = buildMore(moreCell);
  if (more) bento.append(more);

  block.replaceChildren(header, bento);
}
