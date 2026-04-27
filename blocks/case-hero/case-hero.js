/**
 * case-hero — full-bleed dark case-study hero with bg image.
 *
 * Lifted from stardust/prototypes/case-study-template.html section.hero.
 * Bottom-justified content panel: meta line, headline, outcome paragraph.
 *
 * Authoring rows (positional):
 *   1. <picture> background image (alt text describes the photograph)
 *   2. meta line (e.g. "// Case study / 02 / Badgley Mischka")
 *   3. <h1> headline. Wrap accent words in <strong> for the bold treatment.
 *   4. outcome paragraph (year / disciplines / one-line summary).
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const bgCell = rows[0]?.firstElementChild;
  const metaCell = rows[1]?.firstElementChild;
  const headlineCell = rows[2]?.firstElementChild;
  const outcomeCell = rows[3]?.firstElementChild;

  const bg = document.createElement('div');
  bg.className = 'bg';
  const picture = pic(bgCell);
  if (picture) bg.append(picture.cloneNode(true));

  const content = document.createElement('div');
  content.className = 'content';

  if (metaCell) {
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = text(metaCell);
    content.append(meta);
  }

  if (headlineCell) {
    const h1 = document.createElement('h1');
    h1.innerHTML = html(headlineCell);
    content.append(h1);
  }

  if (outcomeCell) {
    const p = document.createElement('p');
    p.className = 'outcome';
    p.innerHTML = html(outcomeCell);
    content.append(p);
  }

  block.replaceChildren(bg, content);
}
