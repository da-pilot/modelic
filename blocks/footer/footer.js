import { getConfig, getMetadata } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const FOOTER_PATH = '/fragments/nav/footer';

/**
 * Rebuilds the footer from a fragment into a stable chrome shape
 * (.lockup, .group, .colophon). EDS strips classes from non-block
 * default content, so columns are identified STRUCTURALLY: the column
 * with a <picture> is the lockup, the last column with no <ul> is the
 * colophon, the rest are link groups.
 */
function rebuild(fragment) {
  // Walk to the wrapping <div> that holds the footer columns. The first
  // descendant element with multiple element children is that wrapper.
  const wrappers = [...fragment.querySelectorAll('div')]
    .filter((d) => [...d.children].filter((c) => c.tagName === 'DIV').length >= 2);
  const wrapper = wrappers[0];
  if (!wrapper) return fragment;

  const cols = [...wrapper.children].filter((c) => c.tagName === 'DIV');

  const lockupCol = cols.find((c) => c.querySelector('picture, img'));
  const linkCols = cols.filter((c) => c !== lockupCol && c.querySelector('ul'));
  // colophon is the trailing column with no <ul>
  const colophonCol = [...cols].reverse().find((c) => c !== lockupCol && !c.querySelector('ul'));

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (lockupCol) {
    const lockup = document.createElement('div');
    lockup.className = 'lockup';
    [...lockupCol.children].forEach((c) => lockup.append(c.cloneNode(true)));
    inner.append(lockup);
  }

  linkCols.forEach((col) => {
    const group = document.createElement('div');
    group.className = 'group';
    [...col.children].forEach((c) => group.append(c.cloneNode(true)));
    inner.append(group);
  });

  if (colophonCol) {
    const colophon = document.createElement('div');
    colophon.className = 'colophon';
    [...colophonCol.children].forEach((c) => colophon.append(c.cloneNode(true)));
    inner.append(colophon);
  }

  const bottom = document.createElement('div');
  bottom.className = 'bottom';
  bottom.append(inner);
  return bottom;
}

export default async function init(el) {
  const { locale } = getConfig();
  const footerMeta = getMetadata('footer');
  const path = footerMeta || FOOTER_PATH;
  try {
    const fragment = await loadFragment(`${locale.prefix}${path}`);
    el.append(rebuild(fragment));
  } catch (e) {
    throw Error(e);
  }
}
