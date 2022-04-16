function log(s) {
  console.log("[KiAKoi] " + s);
}

function isInLink(el) {
  while (el.parentNode != undefined) {
    if (el.parentNode.tagName == 'A' && el.parentNode.href != undefined)return true;

    el = el.parentNode;
  }

  return false;
}