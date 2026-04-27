/**
 * wave-strip — decorative dual-stroke animated SVG strip.
 *
 * Acts as a visual transition between sections (e.g. between the dark
 * hero and the light work-bento on the home page). The SVG draws two
 * sine-wave paths (one ink, one wavelength accent) that scroll horizontally
 * via CSS keyframes. CSS-only animation; honors prefers-reduced-motion.
 *
 * Authoring shape:
 *   The block takes no rows. Authors place an empty <wave-strip /> block
 *   on the page; this decorator wipes any contents and renders the SVG.
 *
 * Markup emitted:
 *   <div class="wave-strip">
 *     <svg> two <path>s — .ink and .accent </svg>
 *   </div>
 */

const WAVE_PATH_INK = 'M0,40 Q75,0 150,40 T300,40 T450,40 T600,40 T750,40 T900,40 T1050,40 T1200,40';
const WAVE_PATH_ACCENT = 'M0,40 Q75,80 150,40 T300,40 T450,40 T600,40 T750,40 T900,40 T1050,40 T1200,40';

export default async function decorate(block) {
  block.setAttribute('aria-hidden', 'true');
  block.innerHTML = `
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path class="ink" d="${WAVE_PATH_INK}" />
      <path class="accent" d="${WAVE_PATH_ACCENT}" />
    </svg>
  `;
}
