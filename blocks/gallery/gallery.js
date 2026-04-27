/**
 * gallery — full-width 2-column image grid for case-study discovery
 * sections. Each tile is a <figure> that may carry an optional
 * <figcaption> below the grid.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.gallery` and rescoped under .gallery.
 *
 * Authoring rows (positional, one row per image):
 *   1. <picture>/<img>   → first tile
 *   2. <picture>/<img>   → second tile
 *   …                    → additional tiles flow into the grid; the CSS
 *                          uses a 2-column track and rows wrap naturally.
 *
 * Optional second cell on any row carries that tile's caption text.
 *
 * Notes
 * - All images render at full bleed (the section opts out of the page's
 *   horizontal padding).
 * - The grid collapses to a single column on narrow viewports.
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const grid = document.createElement('div');
  grid.className = 'grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const captionCell = cells[1];

    const picture = pic(imgCell);
    if (!picture) return;

    const figure = document.createElement('figure');
    figure.append(picture.cloneNode(true));

    if (captionCell && text(captionCell)) {
      const caption = document.createElement('figcaption');
      caption.textContent = text(captionCell);
      figure.append(caption);
    }

    grid.append(figure);
  });

  block.replaceChildren(grid);
}
