/**
 * ship — light-beige "what we ship" section. Eyebrow + thin display
 * headline above a 2-column grid of paired numbered capability cards.
 *
 * Lifted from stardust/prototypes/service-template.html section.ship.
 * Each capability is a numbered tag (auto-generated as `/ 01`, `/ 02`,
 * …) plus a heading and short paragraph. Cards alternate left/right
 * with a vertical rule between columns.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 03 / What we ship")
 *   2. <h2> headline. Wrap the service noun in <strong>.
 *   3..N. one row per capability card. Each card cell contains an <h3>
 *       (or <strong>) title followed by a body paragraph. The decorator
 *       extracts the first heading-or-strong as the title and treats the
 *       remainder of the cell as the description.
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function pad(n) {
  return n < 10 ? `0${n}` : String(n);
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const capRows = rows.slice(2);

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const header = document.createElement('div');
    header.className = 'sec-header';
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('aria-hidden', 'true');
    const span = document.createElement('span');
    span.textContent = text(eyebrowCell);
    header.append(dot, span);
    inner.append(header);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  if (capRows.length) {
    const grid = document.createElement('div');
    grid.className = 'capabilities';

    capRows.forEach((row, idx) => {
      const cell = row.firstElementChild;
      if (!cell) return;

      const cap = document.createElement('div');
      cap.className = 'cap';

      const num = document.createElement('div');
      num.className = 'num';
      num.textContent = `/ ${pad(idx + 1)}`;
      cap.append(num);

      const body = document.createElement('div');
      // Pull the first heading or <strong> as title; the rest is description.
      const titleEl = cell.querySelector('h1,h2,h3,h4,h5,h6,strong');
      if (titleEl) {
        const h3 = document.createElement('h3');
        h3.innerHTML = titleEl.innerHTML;
        body.append(h3);
        // Clone remaining children, skipping the title element.
        [...cell.childNodes].forEach((n) => {
          if (n === titleEl) return;
          // If title was inside a <p>, also skip that wrapper if it now empty.
          if (n.nodeType === 1 && n.contains(titleEl) && n.textContent.trim() === titleEl.textContent.trim()) return;
          body.append(n.cloneNode(true));
        });
      } else {
        body.innerHTML = html(cell);
      }
      cap.append(body);

      grid.append(cap);
    });

    inner.append(grid);
  }

  block.replaceChildren(inner);
}
