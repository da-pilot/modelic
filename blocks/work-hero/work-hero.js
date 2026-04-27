/**
 * work-hero — page-open header for the Work index page.
 *
 * Lifted from stardust/prototypes/work.html `section.page-open` and
 * rescoped under `.work-hero`. Mono meta tag with leading rule, mega
 * headline (with <strong><em> for accent words), lede paragraph,
 * a row of filter chips, and a stat strip.
 *
 * Authoring rows (positional):
 *   1. meta tag text (e.g. "// Modelic / Work")
 *   2. <h1> headline. Wrap accent words in <strong> (bold) and nest
 *      <em> inside <strong> for the wavelength-deep accent.
 *   3. lede paragraph
 *   4. filter chips. Each chip is one <p> in the cell. The first <p>
 *      may be wrapped in <strong> to mark the active chip.
 *   5. page stats. Each stat is one <p> formatted "value · label".
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildChips(cell) {
  if (!cell) return null;
  const chips = document.createElement('div');
  chips.className = 'filter-chips';
  chips.setAttribute('role', 'tablist');
  chips.setAttribute('aria-label', 'Filter by discipline');

  const items = [...cell.children].filter((el) => el.tagName === 'P');
  items.forEach((p) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip';
    if (p.querySelector('strong')) {
      btn.classList.add('on');
      btn.textContent = p.querySelector('strong').textContent.trim();
    } else {
      btn.textContent = p.textContent.trim();
    }
    chips.append(btn);
  });
  return chips;
}

function buildStats(cell) {
  if (!cell) return null;
  const wrap = document.createElement('div');
  wrap.className = 'page-stats';

  const items = [...cell.querySelectorAll('p')]
    .map((p) => p.textContent.trim())
    .filter(Boolean);

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
    wrap.append(item);
  });
  return wrap;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const metaCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const ledeCell = rows[2]?.firstElementChild;
  const chipsCell = rows[3]?.firstElementChild;
  const statsCell = rows[4]?.firstElementChild;

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

  const chips = buildChips(chipsCell);
  if (chips) inner.append(chips);

  const stats = buildStats(statsCell);
  if (stats) inner.append(stats);

  block.replaceChildren(inner);
}
