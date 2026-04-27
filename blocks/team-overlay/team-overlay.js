/**
 * team-overlay — full-bleed dark with bg image + words on left and 2 stat
 * cards on right.
 *
 * Lifted from stardust/prototypes/home-b-v1.html `section.team`. The bg
 * image gets a dark left-to-right gradient overlay so the left column
 * stays legible; right column hosts two glass-style stat cards.
 *
 * Authoring shape (positional rows):
 *   1. <picture>    — full-bleed background image
 *   2. eyebrow      — e.g. "04 / The people"
 *   3. headline     — <h2> with <strong> for accent emphasis
 *   4. body         — paragraph
 *   5. CTAs         — wrap primary in <strong>, secondary in <em>.
 *                     Cloned verbatim into a .actions wrapper.
 *   6..7. stat card — two cells, one per stat card. Each cell:
 *                       <h3>8</h3>           the big number
 *                       <p><em>People</em></p>  uppercase mono label
 *                       <p>Description…</p>  fine-print description
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildStatCard(cell) {
  if (!cell) return null;
  const card = document.createElement('div');
  card.className = 'team-stat-card';

  const h = cell.querySelector('h3, h4');
  const ps = [...cell.querySelectorAll('p')];

  if (h) {
    const num = document.createElement('div');
    num.className = 'num';
    num.innerHTML = h.innerHTML.trim();
    card.append(num);
  }
  if (ps[0]) {
    const label = document.createElement('div');
    label.className = 'label';
    label.innerHTML = ps[0].innerHTML.trim();
    card.append(label);
  }
  if (ps[1]) {
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.innerHTML = ps[1].innerHTML.trim();
    card.append(desc);
  }
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const bgCell = rows[0]?.firstElementChild;
  const eyebrowCell = rows[1]?.firstElementChild;
  const headlineCell = rows[2]?.firstElementChild;
  const bodyCell = rows[3]?.firstElementChild;
  const ctaCell = rows[4]?.firstElementChild;
  const stat1Cell = rows[5]?.firstElementChild;
  const stat2Cell = rows[6]?.firstElementChild;

  // Background image layer
  const bgImage = document.createElement('div');
  bgImage.className = 'bg-image';
  const picture = pic(bgCell);
  if (picture) bgImage.append(picture.cloneNode(true));

  // Content grid
  const content = document.createElement('div');
  content.className = 'content';

  const left = document.createElement('div');

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'section-eyebrow';
    eyebrow.innerHTML = '<span class="dot"></span><span></span>';
    eyebrow.querySelector('span:last-child').textContent = eyebrowCell.textContent.trim();
    left.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    left.append(h2);
  }

  if (bodyCell) {
    const p = document.createElement('p');
    p.innerHTML = html(bodyCell);
    left.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    left.append(actions);
  }

  const right = document.createElement('div');
  const card1 = buildStatCard(stat1Cell);
  const card2 = buildStatCard(stat2Cell);
  if (card1) right.append(card1);
  if (card2) right.append(card2);

  content.append(left, right);
  block.replaceChildren(bgImage, content);
}
