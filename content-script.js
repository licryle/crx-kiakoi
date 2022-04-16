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

const ignoreNodes = new Map();

let observer = new MutationObserver(mutations => {
  for(let mutation of mutations) {
    for(let addedNode of mutation.addedNodes) {
      //log("ignoreNodes.length = " + ignoreNodes.size);

      if (ignoreNodes.get(addedNode) == undefined) {
        ignoreNodes.set(addedNode, Date.now()); // over time... it's a leak?
        replaceAll(addedNode);
      }/* else {
        log("Circular dependency detected");
        ignoreNodes.delete(addedNode); // cannot delete otherwise because it's event based.
        ignoreNodes.forEach( (value, key) => { 
          if (Date.now() - value > 10) ignoreNodes.delete(key);
        });
      }*/
    }
  }
});
observer.observe(document, { childList: true, subtree: true });


function generateReplacement(portion, match, media) {
  const node = document.createElement("span");

  const media_name = document.createTextNode(match[0] + ' ');
  const oli_start = document.createTextNode('(');
  const oli_name = document.createTextNode(' ' + media.owner.name + ' ');
  const oli_end = document.createTextNode(')');

  const oli = document.createElement(isInLink(portion.node)?'span':'a');
  if (!isInLink(portion.node)) {
    oli.href = media.owner.url;
    oli.target = '_blank';
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

  ignoreNodes.set(portion.node, Date.now());
  ignoreNodes.set(node, Date.now());
  return node;
}

function replaceAll(node) {
  medias.forEach(media => {
    findAndReplaceDOMText(node, {
      preset: 'prose',
      portionMode: 'first',
      find: new RegExp("(" + media.name + "|" + media.name.toUpperCase() + ")(?![a-z0-9]+)", 'gm'),
      replace: (portion, match) => { return generateReplacement(portion, match, media) }
    });
  });
}

var body = document.getElementsByTagName('body');

if (body != null) {
  log("body found");

  replaceAll(body[0])
}

log("ends");