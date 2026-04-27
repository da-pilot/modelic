/**
 * quote — light-bg case-study quote module.
 *
 * Large italic blockquote with a wavelength-colored opening curly quote
 * (CSS ::before) and a name/role attribution row beneath.
 *
 * Lifted from stardust/prototypes/case-study-template.html
 * `section.quote` and rescoped under .quote.
 *
 * Authoring rows (positional):
 *   1. eyebrow/tag text (e.g. "// 08 / In their words")
 *   2. blockquote body text. Plain text — the opening curly is added in
 *      CSS, not authored.
 *   3. attribution name (e.g. "VP Digital · Badgley Mischka")
 *   4. attribution role (e.g. "— On the engagement")
 */

function text(cell) {
  return cell ? cell.textContent.trim() : '';
}

function html(cell) {
  return cell ? cell.innerHTML.trim() : '';
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const eyebrowCell = rows[0]?.firstElementChild;
  const quoteCell = rows[1]?.firstElementChild;
  const nameCell = rows[2]?.firstElementChild;
  const roleCell = rows[3]?.firstElementChild;

  const inner = document.createElement('div');
  inner.className = 'inner';

  if (eyebrowCell) {
    const tag = document.createElement('div');
    tag.className = 'module-tag';
    tag.innerHTML = `<span class="dot"></span><span>${text(eyebrowCell)}</span>`;
    inner.append(tag);
  }

  if (quoteCell) {
    const bq = document.createElement('blockquote');
    bq.innerHTML = html(quoteCell);
    inner.append(bq);
  }

  if (nameCell || roleCell) {
    const attr = document.createElement('div');
    attr.className = 'attr';

    if (nameCell) {
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = text(nameCell);
      attr.append(name);
    }

    if (roleCell) {
      const role = document.createElement('span');
      role.className = 'role';
      role.textContent = text(roleCell);
      attr.append(role);
    }

    inner.append(attr);
  }

  block.replaceChildren(inner);
}
