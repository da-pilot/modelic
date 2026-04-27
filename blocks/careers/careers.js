/**
 * careers — light foam-colored hiring nudge.
 *
 * Lifted from stardust/prototypes/team.html `section.careers` and
 * rescoped under `.careers`. A single flex row: a soft hiring line
 * on the left and a "open roles" button on the right.
 *
 * Authoring rows (positional):
 *   1. nudge body — single paragraph. Wrap accent words in <em>
 *      to color them wavelength-deep.
 *   2. CTA — wrap the link in <em> for a secondary button. The link
 *      decorator in scripts/ak.js applies .btn classes; this block
 *      clones the cell child nodes verbatim into a .actions wrapper.
 */

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const bodyCell = rows[0]?.firstElementChild;
  const ctaCell = rows[1]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (bodyCell) {
    const p = document.createElement('p');
    p.innerHTML = html(bodyCell);
    inner.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    inner.append(actions);
  }

  block.replaceChildren(inner);
}
