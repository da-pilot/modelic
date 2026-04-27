/**
 * case-prose-tinted — light beige tinted 2-column prose module for case
 * studies.
 *
 * SIBLING block to case-prose (NOT a variant). Per the locked conversion
 * plan, this is its own first-class block — authors choose the block, not
 * a variant cell on case-prose.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.module.tinted` and rescoped under .case-prose-tinted.
 *
 * Authoring rows (positional):
 *   1. eyebrow/tag text (e.g. "// 05 / Brand exploration")
 *   2. <h2> headline. Wrap accent phrase in <strong> for bold treatment.
 *   3. left-column body paragraph(s)
 *   4. right-column body paragraph(s)
 *
 * The two body cells render side-by-side on wide viewports and stack on
 * narrow viewports (handled in CSS).
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
  const leftCell = rows[2]?.firstElementChild;
  const rightCell = rows[3]?.firstElementChild;

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

  if (leftCell || rightCell) {
    const cols = document.createElement('div');
    cols.className = 'cols';

    if (leftCell) {
      const left = document.createElement('div');
      left.className = 'col';
      left.innerHTML = html(leftCell);
      cols.append(left);
    }

    if (rightCell) {
      const right = document.createElement('div');
      right.className = 'col';
      right.innerHTML = html(rightCell);
      cols.append(right);
    }

    inner.append(cols);
  }

  block.replaceChildren(inner);
}
