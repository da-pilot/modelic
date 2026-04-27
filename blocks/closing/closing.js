/**
 * closing — dark mega-type CTA section with animated background wave and
 * 3-column channel contact info beneath. Reused across every page; keep
 * self-contained.
 *
 * Lifted from stardust/prototypes/home-b-v1.html `section.closing`. The
 * background wave SVG is decorative (low-opacity); the headline supports
 * <strong> for wavelength accent. CTAs are rendered through the global
 * button system (wrap primary in <strong>, secondary in <em>).
 *
 * Authoring shape (positional rows):
 *   1. eyebrow      — e.g. "06 / Get in touch"
 *   2. headline     — <h2> with <strong> for accent emphasis
 *   3. body         — paragraph
 *   4. CTAs         — wrap primary in <strong>, secondary in <em>.
 *                     Cloned verbatim into a .actions wrapper.
 *   5..7. channels  — three cells, one per channel column. Each cell:
 *                       <p><em>Phone</em></p>     mono-label (italic strip)
 *                       <p><a href="tel:…">801-363-0101</a></p>  value
 *                     For multi-line values (e.g. studio address) include
 *                     a second non-link <p> after the <a>; both will be
 *                     rendered inside .ch-val.
 *
 * Notes
 * - Plain anchors inside channel values stay plain (no button styling),
 *   because the link decorator only converts links wrapped in
 *   <strong>/<em>/<del>/<u>.
 * - Background wave honors prefers-reduced-motion via CSS.
 */

const WAVE_PATHS = [
  { className: 'a', d: 'M0,180 Q100,40 200,180 T400,180 T600,180 T800,180 T1000,180 T1200,180' },
  { className: 'b', d: 'M0,180 Q100,320 200,180 T400,180 T600,180 T800,180 T1000,180 T1200,180' },
  { className: 'a', d: 'M0,200 Q120,60 240,200 T480,200 T720,200 T960,200 T1200,200', style: 'opacity:0.5' },
];

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildChannel(cell) {
  if (!cell) return null;
  const channel = document.createElement('div');

  const ps = [...cell.querySelectorAll('p')];
  const labelP = ps[0];
  const valuePs = ps.slice(1);

  if (labelP) {
    const label = document.createElement('div');
    label.className = 'ch-label';
    // Strip <em> wrapper if present so labels read as plain text.
    const em = labelP.querySelector('em');
    label.textContent = (em ? em.textContent : labelP.textContent).trim();
    channel.append(label);
  }

  if (valuePs.length) {
    const val = document.createElement('div');
    val.className = 'ch-val';
    valuePs.forEach((p, i) => {
      if (i > 0) val.append(document.createElement('br'));
      // Append child nodes verbatim so anchors/spans pass through.
      [...p.childNodes].forEach((n) => val.append(n.cloneNode(true)));
    });
    channel.append(val);
  }

  return channel;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const bodyCell = rows[2]?.firstElementChild;
  const ctaCell = rows[3]?.firstElementChild;
  const channelCells = [4, 5, 6].map((i) => rows[i]?.firstElementChild);

  // Decorative wave background
  const bgWave = document.createElement('div');
  bgWave.className = 'bg-wave';
  bgWave.setAttribute('aria-hidden', 'true');
  const paths = WAVE_PATHS.map(({ className, d, style }) => {
    const styleAttr = style ? ` style="${style}"` : '';
    return `<path class="${className}" d="${d}"${styleAttr} />`;
  }).join('');
  bgWave.innerHTML = `
    <svg viewBox="0 0 1200 360" preserveAspectRatio="none">
      ${paths}
    </svg>
  `;

  // Inner content
  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'section-eyebrow';
    eyebrow.innerHTML = '<span class="dot"></span><span></span>';
    eyebrow.querySelector('span:last-child').textContent = eyebrowCell.textContent.trim();
    inner.append(eyebrow);
  }

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    inner.append(h2);
  }

  if (bodyCell) {
    const p = document.createElement('p');
    p.className = 'body';
    p.innerHTML = html(bodyCell);
    inner.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    inner.append(actions);
  }

  const hasChannels = channelCells.some(Boolean);
  if (hasChannels) {
    const channels = document.createElement('div');
    channels.className = 'channels';
    channelCells.forEach((cell) => {
      const ch = buildChannel(cell);
      if (ch) channels.append(ch);
    });
    inner.append(channels);
  }

  block.replaceChildren(bgWave, inner);
}
