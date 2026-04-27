/**
 * team-roster — 3-column person grid.
 *
 * Lifted from stardust/prototypes/team.html `section.team` and rescoped
 * under `.team-roster`. Each person renders as a card with portrait,
 * name, role, bio, and a row of tag chips.
 *
 * Authoring shape: each top-level row is one person. The person cell
 * contains, in order:
 *   <picture> portrait image (alt text describes the portrait)
 *   <h3>Name</h3>
 *   <p>Role · subspecialty</p>
 *   <p>Bio paragraph.</p>
 *   <p>Tag · Tag · Tag</p>   tag chips, separated by middle-dot
 *
 * For "portrait pending" entries, omit the <picture> — the JS leaves
 * the portrait container empty and the CSS shows a drafting fallback.
 */

function pic(cell) {
  return cell ? cell.querySelector('picture, img') : null;
}

function buildPerson(cell) {
  const person = document.createElement('div');
  person.className = 'person';

  const portrait = document.createElement('div');
  portrait.className = 'portrait';
  const picture = pic(cell);
  if (picture) {
    portrait.append(picture.cloneNode(true));
  } else {
    portrait.classList.add('placeholder');
    const span = document.createElement('span');
    span.className = 'pending';
    span.textContent = '// Portrait pending';
    portrait.append(span);
  }
  person.append(portrait);

  const h = cell.querySelector('h3, h4');
  if (h) {
    const name = document.createElement('h3');
    name.className = 'name';
    name.innerHTML = h.innerHTML.trim();
    person.append(name);
  }

  const ps = [...cell.children].filter((el) => el.tagName === 'P');
  if (ps[0]) {
    const role = document.createElement('p');
    role.className = 'role';
    role.innerHTML = ps[0].innerHTML.trim();
    person.append(role);
  }
  if (ps[1]) {
    const bio = document.createElement('p');
    bio.className = 'bio';
    bio.innerHTML = ps[1].innerHTML.trim();
    person.append(bio);
  }
  if (ps[2]) {
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'tags';
    ps[2].textContent.split(/\s*[·•]\s*/).filter(Boolean).forEach((t) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t.trim();
      tagsWrap.append(tag);
    });
    person.append(tagsWrap);
  }

  return person;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const grid = document.createElement('div');
  grid.className = 'team-grid';

  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    grid.append(buildPerson(cell));
  });

  block.replaceChildren(grid);
}
