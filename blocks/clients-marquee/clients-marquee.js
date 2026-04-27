/**
 * clients-marquee — light drafting bg with header line and two horizontal
 * infinite-marquee logo tracks (track 2 is a duplicate aria-hidden track for
 * seamless loop). Edge fade is via a CSS mask.
 *
 * Lifted from stardust/prototypes/home-b-v1.html `section.clients`. CSS
 * keyframes drive the animation; honors prefers-reduced-motion.
 *
 * Authoring shape (positional rows):
 *   1. eyebrow      — e.g. "05 / Trusted by"
 *   2. headline     — <h2> with optional <strong>
 *   3..N. logos     — one row per logo. Each cell is a single <picture>.
 *                     Cells are concatenated into the marquee track and
 *                     duplicated for the seamless loop.
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const logoCells = rows.slice(2).map((row) => row.firstElementChild).filter(Boolean);

  const header = document.createElement('div');
  header.className = 'header';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'section-eyebrow';
    eyebrow.innerHTML = '<span class="dot"></span><span></span>';
    eyebrow.querySelector('span:last-child').textContent = eyebrowCell.textContent.trim();
    header.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    header.append(h2);
  }

  // Build the marquee. Two tracks: one announced, one aria-hidden.
  const marquee = document.createElement('div');
  marquee.className = 'marquee';

  const buildTrack = (hidden) => {
    const track = document.createElement('div');
    track.className = 'marquee-track';
    if (hidden) track.setAttribute('aria-hidden', 'true');
    logoCells.forEach((cell) => {
      const picture = pic(cell);
      if (!picture) return;
      const clone = picture.cloneNode(true);
      if (hidden) {
        // Suppress alt text on the duplicate so screen readers don't repeat.
        clone.querySelectorAll('img').forEach((img) => img.setAttribute('alt', ''));
      }
      track.append(clone);
    });
    return track;
  };

  marquee.append(buildTrack(false), buildTrack(true));

  block.replaceChildren(header, marquee);
}
