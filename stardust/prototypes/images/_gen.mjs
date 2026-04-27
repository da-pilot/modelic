// Generate images for Modelic prototype via Gemini 3 Pro Image Preview.
// Reads GOOGLE_API_KEY from process.env (parent loads from .env).
// Never logs the key. Caches by filename — re-runs skip existing files.

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const KEY = process.env.GOOGLE_API_KEY;
if (!KEY) { console.error('GOOGLE_API_KEY not in env'); process.exit(1); }

const MODEL = 'gemini-3-pro-image-preview';
const OUT_DIR = '/home/cmillar/Sites/source/modelic/stardust/prototypes/images';

const SHARED_PHOTO_DIRECTION = `
Photographic style: editorial, cool to neutral light, slightly desaturated.
Subjects in workspace context, mid-action (typing, sketching, on a call) — not posed.
Slightly elevated angle. Workshop / studio feel — small craft team, not corporate.
Avoid warm golden-hour tones. Avoid stock-feeling handshakes, conference rooms, or generic "team in a meeting" setups.
No saturated brand colors imported into the photograph.
Composition feels considered, like a magazine editorial — not an agency stock shot.
`.trim();

const TARGETS = [
  {
    file: 'hero-accent.png',
    aspect: '16:9',
    prompt: `${SHARED_PHOTO_DIRECTION}

Subject: a single craftsperson at a desk, shot tight — hands on keyboard or sketching, screen visible at the edge of frame. The face is turned away or partially out of frame; the work itself is the subject, not the person. Single warm desk lamp against a cool ambient room. Modern laptop or sketchbook visible. The mood is concentration, quiet making.`,
  },
  {
    file: 'team-portrait-1.png',
    aspect: '4:5',
    prompt: `${SHARED_PHOTO_DIRECTION}

Subject: a designer at their desk, portrait orientation, mid-action — sketching or pointing at a screen. Face visible but not directly to camera. Workspace shows a mix of physical tools (notebook, pencils) and digital (laptop, monitor). Cool overcast light from a window off-frame. The person looks engaged with the work, not posing.`,
  },
  {
    file: 'team-portrait-2.png',
    aspect: '4:5',
    prompt: `${SHARED_PHOTO_DIRECTION}

Subject: an engineer in conversation at their desk, portrait orientation — turned slightly toward someone off-frame, hand gesturing toward a screen. Code visible on monitor. The mood is collaborative and unhurried. Warm wooden surface against cool monitor glow. The person reads as a senior craftsperson, not a junior staffer.`,
  },
  {
    file: 'work-1-utah-food-bank.png',
    aspect: '3:2',
    prompt: `Editorial product photograph of a laptop screen displaying a clean, accessible donations interface. The screen is visible at a slight angle on a wooden desk. Cool natural light. The interface visible on screen is restrained: large readable type, plenty of white space, a simple checkout flow. A coffee mug and a notebook sit nearby. No overlay, no graphics, no logos. Editorial tech photography in the style of a magazine product feature.`,
  },
  {
    file: 'work-2-badgley-mischka.png',
    aspect: '3:2',
    prompt: `Editorial product photograph of a laptop or tablet screen displaying a fashion ecommerce site — elegant, minimal, with a single garment photograph visible on screen against a soft pale background. The screen sits on a marble or pale stone surface. Cool diffused studio light. A folded piece of fabric and a measuring tape suggest the fashion context. No overlay, no logos. Editorial style.`,
  },
  {
    file: 'work-3-hugger-mugger.png',
    aspect: '3:2',
    prompt: `Editorial product photograph of a laptop screen displaying a clean ecommerce site for yoga and wellness products. The laptop sits on a natural cork or wooden surface beside a folded yoga mat and a wooden block. Cool natural light from a window. The interface visible on screen is calm, restrained, with plenty of white space. No overlay, no logos. Editorial photography style.`,
  },
  {
    file: 'work-4-cinelli.png',
    aspect: '3:2',
    prompt: `Editorial product photograph of a laptop screen displaying a heritage cycling brand site — minimal, type-led, with a vintage racing bicycle photograph visible on screen against a paper-textured background. The laptop sits on a workshop bench beside a small bicycle component (a chainring, a steel frame tube). Cool workshop light. No overlay, no logos. Editorial cycling photography style.`,
  },
];

async function generate(target) {
  const path = resolve(OUT_DIR, target.file);
  if (existsSync(path)) {
    console.log(`[cache] ${target.file}`);
    return { file: target.file, status: 'cached' };
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const body = {
    contents: [{ parts: [{ text: target.prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: target.aspect },
    },
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    console.error(`[fail ${target.file}] ${resp.status} ${txt.slice(0, 300)}`);
    return { file: target.file, status: 'fail', code: resp.status };
  }
  const json = await resp.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inlineData?.data);
  if (!imgPart) {
    console.error(`[no-image ${target.file}] ${JSON.stringify(json).slice(0, 300)}`);
    return { file: target.file, status: 'no-image' };
  }
  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  writeFileSync(path, buf);
  console.log(`[ok] ${target.file} (${buf.length} bytes)`);
  return { file: target.file, status: 'ok', bytes: buf.length };
}

const results = [];
for (const t of TARGETS) {
  results.push(await generate(t));
}
console.log('\nSummary:', JSON.stringify(results.map(r => ({ f: r.file, s: r.status })), null, 2));
