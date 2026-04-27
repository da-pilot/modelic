/**
 * cadence — light 4-column engagement-phase grid.
 *
 * Lifted from stardust/prototypes/approach.html `section.cadence` and
 * rescoped under `.cadence`. Eyebrow + headline above a 4-column
 * grid of phases (kickoff, discovery, build, handoff). Each phase
 * has a number, title, body, and a duration footer.
 *
 * Authoring rows (positional):
 *   1. eyebrow text (e.g. "// 04 / The cadence")
 *   2. <h2> headline. Wrap accent in <strong>.
 *   3..n. phases — each row is one phase cell containing:
 *           <p>/ 01</p>            phase number
 *           <h3>Kickoff</h3>        phase name
 *           <p>Body paragraph.</p>  description
 *           <p>Week 1</p>           duration (rendered as a footer chip)
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function buildPhase(cell) {
  const phase = document.createElement('div');
  phase.className = 'phase';

  const ps = [...cell.children].filter((el) => el.tagName === 'P');
  const h = cell.querySelector('h3, h4');

  if (ps[0]) {
    const num = document.createElement('div');
    num.className = 'num';
    num.innerHTML = ps[0].innerHTML.trim();
    phase.append(num);
  }
  if (h) {
    const h3 = document.createElement('h3');
    h3.innerHTML = h.innerHTML.trim();
    phase.append(h3);
  }
  if (ps[1]) {
    const body = document.createElement('p');
    body.innerHTML = ps[1].innerHTML.trim();
    phase.append(body);
  }
  if (ps[2]) {
    const dur = document.createElement('div');
    dur.className = 'duration';
    dur.innerHTML = ps[2].innerHTML.trim();
    phase.append(dur);
  }

  return phase;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const headlineCell = rows[1]?.firstElementChild;
  const phaseCells = rows.slice(2).map((r) => r.firstElementChild).filter(Boolean);

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

  if (headlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(headlineCell);
    out.push(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'cadence-grid';
  phaseCells.forEach((cell) => grid.append(buildPhase(cell)));
  out.push(grid);

  block.replaceChildren(...out);
}
