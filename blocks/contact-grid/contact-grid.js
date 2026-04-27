/**
 * contact-grid — 2-column form + channels block.
 *
 * Lifted from stardust/prototypes/contact.html `section.contact-grid`
 * and rescoped under `.contact-grid`. Left column: a form-wrap card
 * with a top wavelength border, hosting a typed contact form. Right
 * column: a "Reach a real person" channel block.
 *
 * Authoring rows (positional):
 *   1. form-action — the form post target (e.g. "/api/contact").
 *      Plain text in the cell; if empty, falls back to "/api/contact".
 *   2. name + email row — single cell with two paragraphs:
 *        <p>Your name / required</p>
 *        <p>Your email / required</p>
 *      Each line is "Label / required-or-optional". The first line
 *      becomes a text input; the second becomes an email input.
 *   3. company field — one cell, "Company / Project name / optional".
 *   4. work-type chip group — cell with:
 *        <p>What kind of work are you thinking about? / optional · pick any</p>
 *        <p>Brand · Commerce · Accessibility · App · Engineering · Not sure yet</p>
 *      Wrap any chip in <strong> in the second <p> to mark it active.
 *   5. timeline chip group — cell with the same shape (label, then
 *      middle-dot-separated chips with optional <strong> for active).
 *   6. message field — one cell, "Tell us about it / required",
 *      optionally followed by a placeholder paragraph.
 *   7. budget chip group — same shape as 4 / 5.
 *   8. submit row — one cell with:
 *        <p>Privacy disclosure copy</p>
 *        <p>Send</p>            submit button label
 *   9. channels eyebrow — e.g. "// Or skip the form".
 *  10. channels headline — <h2>Reach a <strong>real person.</strong></h2>
 *  11..n. channel rows — each row is one channel cell containing:
 *           <p>Label</p>
 *           <p><a href="…">Value</a></p>   or plain <p>Value</p>
 *           <p>Meta line</p>
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

function parseLabel(line) {
  // "Your name / required" or "Tell us about it / required"
  const [label, ...rest] = line.split('/').map((s) => s.trim());
  return { label, opt: rest.join(' / ') };
}

function makeLabel(forId, line) {
  const { label, opt } = parseLabel(line);
  const lab = document.createElement('label');
  if (forId) lab.setAttribute('for', forId);
  lab.textContent = `${label} `;
  if (opt) {
    const span = document.createElement('span');
    span.className = 'opt';
    span.textContent = `/ ${opt}`;
    lab.append(span);
  }
  return lab;
}

function makeNameEmailRow(cell) {
  const ps = [...cell.querySelectorAll('p')].map((p) => p.textContent.trim());
  const wrap = document.createElement('div');
  wrap.className = 'field-row';

  if (ps[0]) {
    const f = document.createElement('div');
    f.className = 'field';
    f.append(makeLabel('f-name', ps[0]));
    const inp = document.createElement('input');
    inp.id = 'f-name';
    inp.name = 'name';
    inp.type = 'text';
    if (/required/i.test(ps[0])) inp.required = true;
    f.append(inp);
    wrap.append(f);
  }
  if (ps[1]) {
    const f = document.createElement('div');
    f.className = 'field';
    f.append(makeLabel('f-email', ps[1]));
    const inp = document.createElement('input');
    inp.id = 'f-email';
    inp.name = 'email';
    inp.type = 'email';
    if (/required/i.test(ps[1])) inp.required = true;
    f.append(inp);
    wrap.append(f);
  }
  return wrap;
}

function makeTextField(cell, id, name) {
  const line = text(cell);
  const f = document.createElement('div');
  f.className = 'field';
  f.append(makeLabel(id, line));
  const inp = document.createElement('input');
  inp.id = id;
  inp.name = name;
  inp.type = 'text';
  if (/required/i.test(line)) inp.required = true;
  f.append(inp);
  return f;
}

function makeChipGroup(cell) {
  const ps = [...cell.querySelectorAll('p')];
  const f = document.createElement('div');
  f.className = 'field';

  // First <p> is the label line. Second <p> contains middle-dot chips.
  if (ps[0]) {
    const labelLine = ps[0].textContent.trim();
    f.append(makeLabel(null, labelLine));
  }

  if (ps[1]) {
    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'chips';

    // Walk the cell's <strong> nodes to find which chips are pre-active.
    const strongs = [...ps[1].querySelectorAll('strong')]
      .map((s) => s.textContent.trim().toLowerCase());

    ps[1].textContent.split(/\s*[·•]\s*/).filter(Boolean).forEach((chipText) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      const t = chipText.trim();
      if (strongs.includes(t.toLowerCase())) btn.classList.add('on');
      btn.textContent = t;
      chipsWrap.append(btn);
    });

    f.append(chipsWrap);
  }

  return f;
}

function makeMessageField(cell) {
  const ps = [...cell.querySelectorAll('p')];
  const f = document.createElement('div');
  f.className = 'field';

  if (ps[0]) f.append(makeLabel('f-message', ps[0].textContent.trim()));

  const ta = document.createElement('textarea');
  ta.id = 'f-message';
  ta.name = 'message';
  if (ps[0] && /required/i.test(ps[0].textContent)) ta.required = true;
  if (ps[1]) ta.placeholder = ps[1].textContent.trim();
  f.append(ta);

  return f;
}

function makeSubmitRow(cell) {
  const ps = [...cell.querySelectorAll('p')];
  const wrap = document.createElement('div');
  wrap.className = 'submit-row';

  if (ps[0]) {
    const privacy = document.createElement('p');
    privacy.className = 'privacy';
    privacy.innerHTML = ps[0].innerHTML.trim();
    wrap.append(privacy);
  }

  const btn = document.createElement('button');
  btn.type = 'submit';
  const label = (ps[1]?.textContent || 'Send').trim();
  btn.append(document.createTextNode(label));
  // Inline arrow svg
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('width', '14');
  svg.setAttribute('height', '14');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', 'M5 12h14M13 6l6 6-6 6');
  svg.append(path);
  btn.append(svg);

  wrap.append(btn);
  return wrap;
}

function buildChannelRow(cell) {
  const ch = document.createElement('div');
  ch.className = 'ch';

  const ps = [...cell.children].filter((el) => el.tagName === 'P');
  if (ps[0]) {
    const lab = document.createElement('div');
    lab.className = 'label';
    lab.innerHTML = ps[0].innerHTML.trim();
    ch.append(lab);
  }
  if (ps[1]) {
    const val = document.createElement('div');
    val.className = 'val';
    val.innerHTML = ps[1].innerHTML.trim();
    ch.append(val);
  }
  if (ps[2]) {
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = ps[2].innerHTML.trim();
    ch.append(meta);
  }
  return ch;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const formActionCell = rows[0]?.firstElementChild;
  const nameEmailCell = rows[1]?.firstElementChild;
  const companyCell = rows[2]?.firstElementChild;
  const workCell = rows[3]?.firstElementChild;
  const timelineCell = rows[4]?.firstElementChild;
  const messageCell = rows[5]?.firstElementChild;
  const budgetCell = rows[6]?.firstElementChild;
  const submitCell = rows[7]?.firstElementChild;
  const channelsEyebrowCell = rows[8]?.firstElementChild;
  const channelsHeadlineCell = rows[9]?.firstElementChild;
  const channelCells = rows.slice(10).map((r) => r.firstElementChild).filter(Boolean);

  const grid = document.createElement('div');
  grid.className = 'grid';

  // ---- LEFT: form-wrap ----
  const formWrap = document.createElement('div');
  formWrap.className = 'form-wrap';

  const form = document.createElement('form');
  const action = formActionCell ? text(formActionCell) : '';
  form.action = action || '/api/contact';
  form.method = 'post';

  if (nameEmailCell) form.append(makeNameEmailRow(nameEmailCell));
  if (companyCell) form.append(makeTextField(companyCell, 'f-company', 'company'));
  if (workCell) form.append(makeChipGroup(workCell));
  if (timelineCell) form.append(makeChipGroup(timelineCell));
  if (messageCell) form.append(makeMessageField(messageCell));
  if (budgetCell) form.append(makeChipGroup(budgetCell));
  if (submitCell) form.append(makeSubmitRow(submitCell));

  // Wire up chip toggles (no submission handler, per spec).
  form.querySelectorAll('.chip').forEach((c) => {
    c.addEventListener('click', (e) => {
      e.preventDefault();
      c.classList.toggle('on');
    });
  });

  formWrap.append(form);
  grid.append(formWrap);

  // ---- RIGHT: channels block ----
  const channelsBlock = document.createElement('div');
  channelsBlock.className = 'channels-block';

  if (channelsEyebrowCell) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'sec-header';
    const dot = document.createElement('span');
    dot.className = 'dot';
    const label = document.createElement('span');
    label.textContent = text(channelsEyebrowCell);
    eyebrow.append(dot, label);
    channelsBlock.append(eyebrow);
  }

  if (channelsHeadlineCell) {
    const h2 = document.createElement('h2');
    h2.innerHTML = html(channelsHeadlineCell);
    channelsBlock.append(h2);
  }

  channelCells.forEach((cell) => {
    channelsBlock.append(buildChannelRow(cell));
  });

  grid.append(channelsBlock);

  block.replaceChildren(grid);
}
