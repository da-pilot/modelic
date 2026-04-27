/**
 * work-disc — selected-work tile grid for service pages. Eyebrow +
 * thin headline above a 3-tile grid where the first (feature) tile
 * spans 2 rows. Each tile is a clickable card with an image, a
 * gradient overlay, an uppercase mono "discipline" tag, and a
 * display-weight project name.
 *
 * Lifted from stardust/prototypes/service-template.html section.work-disc.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 06 / Selected design work")
 *   2. <h2> headline. Wrap accent phrase in <strong>.
 *   3..5. one row per tile. Each tile cell contains, in order:
 *       - an <a href> wrapping the project name (the link target),
 *       - the discipline label (plain text in a <p> or after a line
 *         break — the decorator pulls the first <p> or text node that
 *         is not the anchor),
 *       - an <img> or <picture> for the tile background.
 *       Recommended authoring shape per cell:
 *         <p>Featured · Brand · Commerce</p>
 *         <p><a href="/case-studies/x">Project Name</a></p>
 *         <picture>…</picture>
 *   6. (optional) trailing CTA row — a single <a> link rendered
 *      bottom-right. Wrap in <strong> for primary, <em> for secondary.
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function pick(cell, selector) {
  return cell ? cell.querySelector(selector) : null;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;

  // Walk remaining rows: tile rows have at least one <picture>/<img>;
  // the trailing CTA row is the last row and is a plain anchor (no image).
  const tileRows = [];
  let ctaRow = null;
  rows.slice(2).forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    if (cell.querySelector('picture, img')) {
      tileRows.push(row);
    } else if (cell.querySelector('a')) {
      ctaRow = row;
    }
  });

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

  if (tileRows.length) {
    const tiles = document.createElement('div');
    tiles.className = 'disc-tiles';

    tileRows.forEach((row) => {
      const cell = row.firstElementChild;
      if (!cell) return;

      const link = pick(cell, 'a');
      const picture = pick(cell, 'picture') || pick(cell, 'img');

      // Discipline label: first <p> whose text doesn't match the anchor's text.
      let disc = '';
      let name = link ? link.textContent.trim() : '';
      const paragraphs = [...cell.querySelectorAll('p')];
      paragraphs.forEach((p) => {
        const t = p.textContent.trim();
        if (!t) return;
        if (link && p.contains(link)) return;
        if (!disc) disc = t;
      });
      // Fallback: discipline could live in a non-<p> text node — pull
      // the first non-anchor text content.
      if (!disc) {
        [...cell.childNodes].forEach((n) => {
          if (disc) return;
          if (n.nodeType === 3) {
            const t = n.textContent.trim();
            if (t) disc = t;
          }
        });
      }

      const tile = document.createElement('a');
      tile.className = 'disc-tile';
      if (link && link.getAttribute('href')) {
        tile.href = link.getAttribute('href');
      }

      if (picture) {
        tile.append(picture.cloneNode(true));
      }

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.setAttribute('aria-hidden', 'true');
      tile.append(overlay);

      const label = document.createElement('div');
      label.className = 'label';
      if (disc) {
        const dEl = document.createElement('span');
        dEl.className = 'disc';
        dEl.textContent = disc;
        label.append(dEl);
      }
      if (name) {
        const nEl = document.createElement('span');
        nEl.className = 'name';
        nEl.textContent = name;
        label.append(nEl);
      }
      tile.append(label);

      tiles.append(tile);
    });

    frag.append(tiles);
  }

  if (ctaRow) {
    const cell = ctaRow.firstElementChild;
    if (cell && cell.querySelector('a')) {
      const footer = document.createElement('div');
      footer.className = 'work-footer-cta';
      [...cell.childNodes].forEach((n) => footer.append(n.cloneNode(true)));
      frag.append(footer);
    }
  }

  block.replaceChildren(frag);
}
