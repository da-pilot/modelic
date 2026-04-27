/**
 * home-hero — full-bleed dark hero with bg image, grid overlay,
 * radial pulse, scroll indicator, eyebrow, headline, subhead, and 2 CTAs.
 *
 * Authoring rows (positional):
 *   1. <picture> background image (alt text describes the photograph)
 *   2. eyebrow / hero-tag text (e.g. "Modelic · Salt Lake City · est. 2014")
 *   3. <h1> headline. Wrap accent words in <strong> to color them wavelength.
 *   4. subhead body paragraph
 *   5. CTAs — wrap primary in <strong>, secondary in <em>. The link decorator
 *      applies .btn / .btn-primary / .btn-secondary; this block clones the
 *      cell's child nodes verbatim into a .hero-actions wrapper.
 *   6. (optional) bottom-left stamp text. <br> respected via innerHTML.
 *
 * Notes
 * - Pulse dot and scroll-indicator animations honor prefers-reduced-motion.
 * - SVG (none here) — the pulse dot is CSS::before and the scroll line is
 *   a plain <div> with a CSS gradient, so no inline SVG markup is needed.
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
  const eyebrowCell = rows[1]?.firstElementChild;
  const headlineCell = rows[2]?.firstElementChild;
  const subheadCell = rows[3]?.firstElementChild;
  const ctaCell = rows[4]?.firstElementChild;
  const stampCell = rows[5]?.firstElementChild;

  // Background image layer
  const bgImage = document.createElement('div');
  bgImage.className = 'bg-image';
  const picture = pic(bgCell);
  if (picture) bgImage.append(picture.cloneNode(true));

  // Decorative grid layer
  const bgGrid = document.createElement('div');
  bgGrid.className = 'bg-grid';
  bgGrid.setAttribute('aria-hidden', 'true');

  // Content (centered)
  const content = document.createElement('div');
  content.className = 'content';

  if (eyebrowCell) {
    const tag = document.createElement('div');
    tag.className = 'hero-tag';
    tag.textContent = text(eyebrowCell);
    content.append(tag);
  }

  if (headlineCell) {
    const h1 = document.createElement('h1');
    h1.innerHTML = html(headlineCell);
    content.append(h1);
  }

  if (subheadCell) {
    const p = document.createElement('p');
    p.className = 'subhead';
    p.innerHTML = html(subheadCell);
    content.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    content.append(actions);
  }

  // Bottom strip (stamp + scroll indicator)
  const heroBottom = document.createElement('div');
  heroBottom.className = 'hero-bottom';

  const stamp = document.createElement('div');
  stamp.className = 'stamp';
  if (stampCell) {
    stamp.innerHTML = html(stampCell);
  }
  heroBottom.append(stamp);

  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.setAttribute('aria-hidden', 'true');
  scrollIndicator.innerHTML = '<span>Scroll</span><div class="line"></div>';
  heroBottom.append(scrollIndicator);

  block.replaceChildren(bgImage, bgGrid, content, heroBottom);
}
