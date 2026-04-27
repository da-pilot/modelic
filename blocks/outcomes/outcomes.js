/**
 * outcomes — dark "what changed" outcomes module with a 3-column
 * outcome card grid. Each card is a number (oversized accent) + a
 * short headline + a description.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.outcomes` and rescoped under .outcomes.
 *
 * Authoring rows (positional):
 *   1. eyebrow/tag text (e.g. "// 07 / What changed")
 *   2. <h2> headline. Wrap accent words in <strong> for wavelength color.
 *   3..N outcome cards — one row per card, three cells per row:
 *      - cell[0] number (e.g. "+19%", "5k+", "2.1AA"). innerHTML preserved
 *        so authors can use a small <span> qualifier inside the number.
 *      - cell[1] short headline (h3)
 *      - cell[2] description paragraph
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
  const cardRows = rows.slice(2);

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const tag = document.createElement('div');
    tag.className = 'module-tag on-dark';
    tag.innerHTML = `<span class="dot"></span><span>${text(eyebrowCell)}</span>`;
    inner.append(tag);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  if (cardRows.length) {
    const grid = document.createElement('div');
    grid.className = 'outcome-grid';

    cardRows.forEach((row) => {
      const cells = [...row.children];
      const numCell = cells[0];
      const headCell = cells[1];
      const bodyCell = cells[2];

      const card = document.createElement('div');
      card.className = 'outcome-card';

      if (numCell) {
        const num = document.createElement('div');
        num.className = 'num';
        num.innerHTML = html(numCell);
        card.append(num);
      }

      if (headCell) {
        const h3 = document.createElement('h3');
        h3.innerHTML = html(headCell);
        card.append(h3);
      }

      if (bodyCell) {
        const p = document.createElement('p');
        p.innerHTML = html(bodyCell);
        card.append(p);
      }

      grid.append(card);
    });

    inner.append(grid);
  }

  block.replaceChildren(inner);
}
