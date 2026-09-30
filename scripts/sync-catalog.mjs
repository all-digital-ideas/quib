// Pulls the live catalog from the storefront's public product feed and writes a
// trimmed, UI-ready snapshot to data/catalog.json.
//
//   npm run sync
//
// To point the site at a different store (or a different backend entirely),
// change STORE below or replace this script — the app only reads catalog.json.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const STORE = process.env.CATALOG_STORE ?? "https://thefoomer.in";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_IMAGES = 8;

const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const text = (html) =>
  decode(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const titleCase = (s) =>
  s
    .toLowerCase()
    .replace(/(^|[\s\-/(])([a-z])/g, (_, a, b) => a + b.toUpperCase())
    .replace(/\bMens\b/g, "Men's");

function cleanTitle(raw) {
  let t = raw
    .replace(/\s+/g, " ")
    .replace(/\bcopy( of)?\b/gi, "")
    .replace(/^(the\s+)?foomer\s+/i, "")
    .replace(/^men'?s?\s+/i, "")
    .replace(/\s+for\s+men'?s?$/i, "")
    .replace(/\s+men'?s$/i, "")
    .trim();
  return titleCase(t);
}

const SPEC_KEYS = ["Fabric", "Collar", "Pattern", "Design", "Sleeve", "Hemline", "Fit", "Wash Care"];

function parseBody(html) {
  // Split into block-level chunks, then read "Key : value" pairs out of them.
  const chunks = html
    .split(/<\/(?:p|li|div|h\d)>|<br\s*\/?>/i)
    .map(text)
    .filter(Boolean);
  const specs = {};
  let story = "";
  for (const chunk of chunks) {
    const m = chunk.match(/^([A-Za-z ]{3,14}?)\s*:\s*(.+)$/);
    if (!m) continue;
    const key = titleCase(m[1].trim());
    const value = m[2].trim();
    if (key === "Story") story = value;
    else if (SPEC_KEYS.includes(key) && value.length < 80) specs[key] = titleCase(value).replace(/\.$/, "");
  }
  if (story) story = story.charAt(0).toUpperCase() + story.slice(1);
  return { specs, story };
}

// The feed carries no review data. Until a reviews provider is wired in, give
// each product a stable placeholder so the PDP layout can be exercised.
function placeholderRating(id) {
  const n = Number(BigInt(id) % 1000n);
  return { value: Math.round((4.2 + (n % 8) / 10) * 10) / 10, count: 18 + (n % 240), placeholder: true };
}

function trim(p) {
  const colorOpt = p.options.find((o) => /colou?r/i.test(o.name));
  const sizeOpt = p.options.find((o) => /size/i.test(o.name));
  const sizeIdx = sizeOpt ? `option${sizeOpt.position}` : null;
  const sizes = sizeOpt
    ? sizeOpt.values.map((label) => ({
        label,
        available: p.variants.some((v) => v[sizeIdx] === label && v.available),
      }))
    : [{ label: "One Size", available: p.variants.some((v) => v.available) }];
  const v0 = p.variants[0];
  const price = Math.round(Number(v0.price));
  const compareAt = v0.compare_at_price ? Math.round(Number(v0.compare_at_price)) : null;
  const { specs, story } = parseBody(p.body_html ?? "");
  const type = (p.product_type || "shirt").toLowerCase();
  return {
    id: String(p.id),
    slug: p.handle,
    title: cleanTitle(p.title),
    type,
    price,
    compareAt: compareAt && compareAt > price ? compareAt : null,
    colors: colorOpt ? colorOpt.values : [],
    sizes,
    available: sizes.some((s) => s.available),
    images: p.images.slice(0, MAX_IMAGES).map((i) => ({ src: i.src, width: i.width, height: i.height })),
    description: story,
    specs,
    tags: p.tags.slice(0, 10),
    rating: placeholderRating(p.id),
    createdAt: p.created_at,
    collections: [],
  };
}

async function getJson(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (catalog-sync)" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

const defs = JSON.parse(await readFile(path.join(root, "data/collections.json"), "utf8"));
const products = new Map();
const collections = {};

for (const def of defs) {
  const { products: raw } = await getJson(`${STORE}/collections/${def.source}/products.json?limit=${def.limit}`);
  collections[def.slug] = [];
  for (const p of raw) {
    if (!p.images.length || !p.variants.length) continue;
    if (!products.has(p.handle)) products.set(p.handle, trim(p));
    products.get(p.handle).collections.push(def.slug);
    collections[def.slug].push(p.handle);
  }
  console.log(`${def.slug.padEnd(16)} ${collections[def.slug].length}`);
}

const out = { syncedAt: new Date().toISOString(), source: STORE, products: [...products.values()], collections };
await writeFile(path.join(root, "data/catalog.json"), JSON.stringify(out));
console.log(`\n${products.size} products → data/catalog.json`);
