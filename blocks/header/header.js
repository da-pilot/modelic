import { getConfig, getMetadata } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const HEADER_PATH = '/fragments/nav/header';

/**
 * Rebuilds the header from a fragment into a stable chrome shape
 * (.lockup, .links, .cta-btn). Identifies elements STRUCTURALLY because
 * EDS strips classes from non-block default content in fragments —
 * class-based selectors work locally and fail in production.
 */
function rebuild(fragment) {
  const wrap = document.createElement('div');
  wrap.className = 'inner';

  // Logo: first <picture>; preserve a wrapping <a> if present.
  const picture = fragment.querySelector('picture, img');
  if (picture) {
    const wrappingAnchor = picture.closest('a');
    const lockup = document.createElement('a');
    lockup.className = 'lockup';
    lockup.href = wrappingAnchor?.getAttribute('href') || '/';
    lockup.setAttribute('aria-label', wrappingAnchor?.getAttribute('aria-label') || 'Modelic home');
    lockup.append(picture.cloneNode(true));
    wrap.append(lockup);
  }

  // Nav list: first <ul>.
  const list = fragment.querySelector('ul');
  if (list) {
    const links = list.cloneNode(true);
    links.classList.add('links');
    wrap.append(links);
  }

  // CTA: last <a> not inside the logo wrapper and not inside the nav <ul>.
  const ctaSource = [...fragment.querySelectorAll('a')].reverse().find((a) => (
    !a.querySelector('picture, img') && !a.closest('ul')
  ));
  if (ctaSource) {
    const cta = document.createElement('a');
    cta.className = 'cta-btn';
    cta.href = ctaSource.getAttribute('href');
    cta.textContent = ctaSource.textContent.trim();
    cta.insertAdjacentHTML('beforeend',
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
    wrap.append(cta);
  }

  const nav = document.createElement('nav');
  nav.className = 'top';
  nav.append(wrap);
  return nav;
}

export default async function init(el) {
  const { locale } = getConfig();
  const headerMeta = getMetadata('header');
  const path = headerMeta || HEADER_PATH;
  try {
    const fragment = await loadFragment(`${locale.prefix}${path}`);
    el.append(rebuild(fragment));
  } catch (e) {
    throw Error(e);
  }
}
