/**
 * glance — dark "at a glance" 5-column stat strip.
 *
 * Lifted from stardust/prototypes/case-study-template.html section.glance.
 * Five compact items: four label/value pairs + one metric (oversized
 * wavelength-colored value). The fifth row is rendered as the metric card.
 *
 * Authoring rows (positional, one row per item):
 *   1. label / value      → text item (e.g. Year, Disciplines, Stack, Team)
 *   2. label / value      → text item
 *   3. label / value      → text item
 *   4. label / value      → text item
 *   5. label / value      → metric item (oversized accent value)
 *
 * Each row has two cells: cell[0] is the label, cell[1] is the value.
 * Author markup (per row): <div><div>Year</div><div>2021 — 2024</div></div>.
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

  const inner = document.createElement('div');
  inner.className = 'inner';

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const valueCell = cells[1];

    const item = document.createElement('div');
    item.className = 'glance-item';
    if (i === rows.length - 1) item.classList.add('metric');

    if (labelCell) {
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = text(labelCell);
      item.append(label);
    }

    if (valueCell) {
      const value = document.createElement('div');
      value.className = 'value';
      value.innerHTML = html(valueCell);
      item.append(value);
    }

    inner.append(item);
  });

  block.replaceChildren(inner);
}
