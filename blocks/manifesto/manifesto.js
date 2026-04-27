/**
 * manifesto — large italic quote + 2-column body block.
 *
 * Lifted from stardust/prototypes/approach.html `section.manifesto`
 * and rescoped under `.manifesto`. Light surface. The quote is
 * rendered in italic at display scale; the body is a 2-column grid
 * with each column containing 1+ paragraphs.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 02 / What this isn't")
 *   2. quote — the manifesto line, rendered as italic display.
 *   3. left column body — one cell containing 1+ paragraphs.
 *   4. right column body — one cell containing 1+ paragraphs.
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
  const quoteCell = rows[1]?.firstElementChild;
  const leftCell = rows[2]?.firstElementChild;
  const rightCell = rows[3]?.firstElementChild;

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

  if (quoteCell) {
    const q = document.createElement('p');
    q.className = 'manifesto-quote';
    q.innerHTML = html(quoteCell);
    out.push(q);
  }

  const body = document.createElement('div');
  body.className = 'manifesto-body';

  const left = document.createElement('div');
  if (leftCell) {
    [...leftCell.children].forEach((node) => left.append(node.cloneNode(true)));
  }
  body.append(left);

  const right = document.createElement('div');
  if (rightCell) {
    [...rightCell.children].forEach((node) => right.append(node.cloneNode(true)));
  }
  body.append(right);

  out.push(body);
  block.replaceChildren(...out);
}
