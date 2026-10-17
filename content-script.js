var oligarques = {
  'niel': {name: "Xavier Niel", url: "https://wikipedia.org/wiki/Xavier_Niel"},
  'arnault': {name: "Bernard Arnault", url:"https://wikipedia.org/wiki/Bernard_Arnault"},
  'kretinsky': {name: "Daniel Kretinsky", url: "https://wikipedia.org/wiki/Daniel_K%C5%99et%C3%ADnsk%C3%BD"},
  'bouygues': {name: "Famille Bouygues", url: "https://wikipedia.org/wiki/Martin_Bouygues"},
  'france': {name: "État Français", url: "https://wikipedia.org/wiki/France_T%C3%A9l%C3%A9visions"},
  'bollore': {name: "Vincent Bolloré", url: "https://wikipedia.org/wiki/Vincent_Bollor%C3%A9"},
  'drahi': {name: "Patrick Drahi", url: "https://wikipedia.org/wiki/Patrick_Drahi"},
  'dassault': {name: "Famille Dassault", url: "https://en.wikipedia.org/wiki/Serge_Dassault"},
  'mohn': {name: "Famille Mohn", url: "https://wikipedia.org/wiki/Liz_Mohn"},
};

// https://www.monde-diplomatique.fr/cartes/PPA#&gid=1&pid=1
var medias = [
  {name: "Monde Diplomatique", owner: oligarques['niel']},
  {name: "Le Monde", owner: oligarques['niel']},
  {name: "Courrier International", owner: oligarques['niel']},
  {name: "Télérama", owner: oligarques['niel']},
  {name: "L'Obs", owner: oligarques['niel']},
  {name: "Huffington Post", owner: oligarques['niel']},
  {name: "HuffPost", owner: oligarques['niel']},
  {name: "Monaco-Matin", owner: oligarques['niel']},
  {name: "Var-matin", owner: oligarques['niel']},
  {name: "Nice-matin", owner: oligarques['niel']},
  {name: "France-Guyane", owner: oligarques['niel']},
  {name: "France-Antilles", owner: oligarques['niel']},
  {name: "Paris-Turf", owner: oligarques['niel']},
  {name: "Manière de voir", owner: oligarques['niel']},

  {name: "Les Echos", owner: oligarques['arnault']},
  {name: "Le Parisien", owner: oligarques['arnault']},
  {name: "Challenges", owner: oligarques['arnault']},
  {name: "Historia", owner: oligarques['arnault']},

  {name: "Marianne", owner: oligarques['kretinsky']},
  {name: "Télé 7 Jours", owner: oligarques['kretinsky']},

  {name: "TF1", owner: oligarques['bouygues']},
  {name: "LCI", owner: oligarques['bouygues']},
  {name: "TMC", owner: oligarques['bouygues']},
  {name: "TFX", owner: oligarques['bouygues']},

  {name: "W9", owner: oligarques['mohn']},
  {name: "6ter", owner: oligarques['mohn']},
  {name: "M6", owner: oligarques['mohn']},
  //{name: "RTL2", owner: oligarques['mohn']},
  {name: "RTL", owner: oligarques['mohn']},
  {name: "Gulli", owner: oligarques['mohn']},
  {name: "Fun Radio", owner: oligarques['mohn']},

  {name: "LCP", owner: oligarques['france']},
  {name: "Public Sénat", owner: oligarques['france']},
  {name: "RFI", owner: oligarques['france']},
  {name: "France 24", owner: oligarques['france']},
  {name: "Mouv'", owner: oligarques['france']},
  {name: "TV5Monde", owner: oligarques['france']},
  {name: "France 3", owner: oligarques['france']},
  {name: "France 2", owner: oligarques['france']},
  {name: "France 4", owner: oligarques['france']},
  {name: "France 5", owner: oligarques['france']},
  {name: "France Inter", owner: oligarques['france']},
  {name: "France Bleu", owner: oligarques['france']},
  {name: "France Culture", owner: oligarques['france']},
  {name: "FIP", owner: oligarques['france']},
  {name: "France Musique", owner: oligarques['france']},
  {name: "Arte", owner: oligarques['france']},

  {name: "Figaro", owner: oligarques['dassault']},

  {name: "L'Express", owner: oligarques['drahi']},
  /*{name: "BFMTV", owner: oligarques['drahi']},
  {name: "BFMBusiness", owner: oligarques['drahi']},*/
  {name: "BFM", owner: oligarques['drahi']},
  {name: "RMC", owner: oligarques['drahi']},
  {name: "Libération", owner: oligarques['drahi']},

  {name: "France Catholique", owner: oligarques['bollore']},
  {name: "Paris Match", owner: oligarques['bollore']},
  {name: "Europe 1", owner: oligarques['bollore']},
  {name: "Le Journal du Dimanche", owner: oligarques['bollore']},
  {name: "CStar", owner: oligarques['bollore']},
  {name: "CNews", owner: oligarques['bollore']},
  {name: "Canal+", owner: oligarques['bollore']},
  {name: "C8", owner: oligarques['bollore']},
  {name: "Capital", owner: oligarques['bollore']},
  {name: "Management", owner: oligarques['bollore']},
  {name: "Voici", owner: oligarques['bollore']},
  {name: "Gala", owner: oligarques['bollore']},
  {name: "National Geographic", owner: oligarques['bollore']},
  {name: "Harvard Business Review", owner: oligarques['bollore']},
  {name: "Femme Actuelle", owner: oligarques['bollore']},
  {name: "Télé Loisirs", owner: oligarques['bollore']},
  {name: "Virgin Radio", owner: oligarques['bollore']},
  {name: "RFM", owner: oligarques['bollore']},
];

log("begins");

const ANNOT_ATTR = 'data-kiakoi';
const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable]';

// Non-prose tags mirrored from findAndReplaceDOMText preset (script/style/media/inputs...).
const SKIP_TAGS = new Set([
  'script', 'style', 'img', 'video', 'audio', 'canvas', 'svg', 'map', 'object',
  'input', 'textarea', 'select', 'option', 'optgroup', 'button', 'br', 'hr', 'noscript',
]);

function escapeRegExp(s) {
  return String(s).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// --- Single combined regex (1 DOM walk instead of ~80) ---
// Longest names first so "France Inter" wins over "France 2"-style prefixes
// and "Monde Diplomatique" wins over "Le Monde".
const mediaLookup = new Map();
const alternationParts = [];
[...medias]
  .sort((a, b) => b.name.length - a.name.length)
  .forEach(media => {
    for (const variant of [media.name, media.name.toUpperCase()]) {
      if (!mediaLookup.has(variant)) {
        mediaLookup.set(variant, media);
        alternationParts.push(escapeRegExp(variant));
      }
    }
  });
// Re-sort parts longest-first (upper variants can be longer/shorter).
alternationParts.sort((a, b) => b.length - a.length);
// Guard both sides so "BFM" doesn't match inside "BFMTV" and "RTL" doesn't
// match inside "ZRTL". Old code only blocked trailing [a-z0-9], letting
// uppercase continuations (BFMTV) through and splitting words mid-acronym.
const MEDIA_RE = new RegExp('(?<![A-Za-z0-9])(' + alternationParts.join('|') + ')(?![A-Za-z0-9]+)', 'gm');

function isEditableElement(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.isContentEditable) return true;
  try {
    // closest() covers ancestors, so a node inside a contenteditable/input is skipped.
    if (el.closest && el.closest(EDITABLE_SELECTOR)) return true;
  } catch (e) { /* detached node */ }
  return false;
}

function isInsideSkippedContext(node) {
  // Walk *up* only: if the added node itself lives inside an annotation,
  // an editable field, or a non-prose element, skip it entirely.
  // (Annotated *descendants* are handled by filterElements, not here.)
  let el = node.nodeType === 1 ? node : node.parentNode;
  while (el) {
    if (el.nodeType === 1) {
      if (el.hasAttribute && el.hasAttribute(ANNOT_ATTR)) return true;
      const tag = el.tagName && el.tagName.toLowerCase();
      if (tag && SKIP_TAGS.has(tag)) return true;
      if (el.isContentEditable) return true;
    }
    // Stop at document root; closest() check handles shadow edge cases above.
    if (el === document.documentElement || el === document) break;
    el = el.parentNode;
  }
  // Extra safety for detached-but-editable subtrees (e.g. paste fragments).
  if (node.nodeType === 1 && isEditableElement(node)) return true;
  return false;
}

function filterElements(el) {
  if (!el || el.nodeType !== 1) return false;
  const tag = el.tagName && el.tagName.toLowerCase();
  if (tag && SKIP_TAGS.has(tag)) return false;
  // BUG 1 FIX: never search inside our own annotations -> makes runs idempotent.
  // hasAttribute covers the wrapper itself; closest covers nested children.
  try {
    if (el.hasAttribute && el.hasAttribute(ANNOT_ATTR)) return false;
    if (el.closest && el.closest('[' + ANNOT_ATTR + ']')) return false;
  } catch (e) { return false; }
  // BUG 2 FIX: never touch user-editable content (paste targets, editors, docs).
  if (isEditableElement(el)) return false;
  return true;
}

function generateReplacement(portion, match, media) {
  const node = document.createElement('span');
  // BUG 1 FIX: mark the wrapper so future runs (observer re-fires, moved
  // nodes, re-scans of an ancestor) skip it instead of annotating again.
  node.setAttribute(ANNOT_ATTR, '1');

  const media_name = document.createTextNode(match[0] + ' ');
  const oli_start = document.createTextNode('(');
  const oli_name = document.createTextNode(' ' + media.owner.name + ' ');
  const oli_end = document.createTextNode(')');

  const oli = document.createElement(isInLink(portion.node) ? 'span' : 'a');
  if (!isInLink(portion.node)) {
    oli.href = media.owner.url;
    oli.target = '_blank';
    oli.setAttribute(ANNOT_ATTR, '1');
  }

  const icon_style = 'display: inline-block; width: 0.8em; height: 0.8em; background-color: orange; -webkit-mask: url(' + chrome.runtime.getURL('images/icon.svg') + ');';
  const icon1 = document.createElement('span');
  const icon2 = document.createElement('span');
  icon2.style = icon1.style = icon_style;

  oli.appendChild(oli_start);
  oli.appendChild(icon1);
  oli.appendChild(oli_name);
  oli.appendChild(icon2);
  oli.appendChild(oli_end);

  node.appendChild(media_name);
  node.appendChild(oli);

  return node;
}

function replaceAll(node) {
  if (!node) return;
  // Skip text whose parent already tells us to ignore, and skip our own wrappers.
  if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute(ANNOT_ATTR)) return;
  if (isInsideSkippedContext(node)) return;
  // findAndReplaceDOMText requires an Element or Text node still in the doc.
  if (node.nodeType === 3 && !node.parentNode) return;

  MEDIA_RE.lastIndex = 0;
  try {
    findAndReplaceDOMText(node, {
      // Keep prose segmentation (don't match across block borders) without
      // inheriting the preset's filterElements (ours replaces it).
      forceContext: findAndReplaceDOMText.NON_INLINE_PROSE || true,
      filterElements: filterElements,
      portionMode: 'first',
      find: MEDIA_RE,
      replace: (portion, match) => {
        const media = mediaLookup.get(match[0]);
        // Unknown variant (shouldn't happen): leave text untouched.
        if (!media) return document.createTextNode(portion.text);
        return generateReplacement(portion, match, media);
      }
    });
  } catch (e) {
    log('replaceAll failed: ' + e);
  }
}

// --- BUG 2 FIX: batched, non-reentrant observer ---
// Old code ran ~80 full DOM walks *per added node*, synchronously, while
// still observing (so our own inserts re-triggered work -> cascade/freeze
// on paste into editors). Now: collect, dedupe, disconnect while working.
let pending = new Set();
let flushTimer = null;
let isProcessing = false;

function queueNode(n) {
  if (!n) return;
  if (n.nodeType !== 1 && n.nodeType !== 3) return;
  if (n.nodeType === 1 && n.hasAttribute && n.hasAttribute(ANNOT_ATTR)) return;
  pending.add(n);
  scheduleFlush();
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, 200);
}

function flush() {
  if (isProcessing || pending.size === 0) return;
  const nodes = [...pending];
  pending.clear();

  // Dedupe: drop any node whose ancestor is also queued (ancestor walk covers it).
  const queued = new Set(nodes);
  const roots = nodes.filter(n => {
    let p = n.parentNode;
    while (p) {
      if (queued.has(p)) return false;
      if (p === document || p === document.documentElement) break;
      p = p.parentNode;
    }
    return true;
  });

  isProcessing = true;
  observer.disconnect();
  try {
    for (const n of roots) {
      // Node removed before flush (common on paste/move) -> nothing to do.
      if (n.isConnected === false) continue;
      if (isInsideSkippedContext(n)) continue;
      replaceAll(n);
    }
  } finally {
    isProcessing = false;
    observer.observe(observeTarget(), { childList: true, subtree: true });
  }
}

function observeTarget() {
  return document.body || document.documentElement;
}

let observer = new MutationObserver(mutations => {
  if (isProcessing) return;
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      queueNode(addedNode);
    }
  }
});
observer.observe(observeTarget(), { childList: true, subtree: true });


var body = document.getElementsByTagName('body');

if (body != null) {
  log("body found");

  replaceAll(body[0])
}

log("ends");