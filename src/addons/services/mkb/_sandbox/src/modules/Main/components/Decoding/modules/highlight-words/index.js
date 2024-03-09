let IDX = 36;
let HEX = "";
while (IDX--) {
  HEX += IDX.toString(36);
}
function uid(len = 11) {
  let str = "";
  let num = len;
  while (num--) {
    str += HEX[Math.random() * 36 | 0];
  }
  return str;
}

const escapeRegexp = (term) => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`);
const termsToRegExpString = (terms) => {
  return terms.replace(/\s{2,}/g, " ").split(" ").join("|");
};
const regexpQuery = ({
  terms,
  matchExactly = false
}) => {
  if (typeof terms !== "string") {
    throw new TypeError("Expected a string");
  }
  const escapedTerms = escapeRegexp(terms.trim());
  return `(${matchExactly ? escapedTerms : termsToRegExpString(escapedTerms)})`;
};
const buildRegexp = ({
  terms,
  matchExactly = false
}) => {
  try {
    const fromString = /^([/~@;%#'])(.*?)\1([gimsuy]*)$/.exec(terms);
    if (fromString) {
      return new RegExp(fromString[2], fromString[3]);
    }
    return new RegExp(regexpQuery({terms, matchExactly}), "ig");
  } catch (e) {
    throw new TypeError("Expected terms to be either a string or a RegExp!");
  }
};

const hasProp = (prop) => (obj) => obj !== null && typeof obj !== "undefined" && prop in obj;
const hasMatch = hasProp("match");
const chunkExists = (chunk) => typeof chunk !== "undefined";
function clip({
  curr,
  next,
  prev,
  clipBy = 3
}) {
  const words = curr.text.split(" ");
  const len = words.length;
  if (curr.match || clipBy >= len) {
    return curr.text;
  }
  const ellipsis = "...";
  if (chunkExists(next) && chunkExists(prev) && hasMatch(prev) && hasMatch(next)) {
    if (len > clipBy * 2) {
      return [
        ...words.slice(0, clipBy),
        ellipsis,
        ...words.slice(-clipBy)
      ].join(" ");
    }
    return curr.text;
  }
  if (chunkExists(next) && hasMatch(next)) {
    return [ellipsis, ...words.slice(-clipBy)].join(" ");
  }
  if (chunkExists(prev) && hasMatch(prev)) {
    return [...words.slice(0, clipBy), ellipsis].join(" ");
  }
  return curr.text;
}

var __assign = Object.assign;
const hasLength = (str) => str.length > 0;
const highLightWords = ({
  text,
  query,
  clipBy,
  matchExactly = false,
  positions = 0
}) => {
  const safeQuery = typeof query === "string" ? query.trim() : query;
  if (safeQuery === "") {
    return [
      {
        key: uid(),
        text,
        match: false
      }
    ];
  }
  // const searchRegexp = buildRegexp({terms: query, matchExactly});
  const searchRegexp  = new RegExp('(6D86)', 'gi');
  const result = text.split(searchRegexp).filter(hasLength).map((str) => ({
    key: uid(),
    text: str,
    match: matchExactly ? str.toLowerCase() === safeQuery.toLowerCase() : searchRegexp.test(str)
  })).map((chunk, index, chunks) => __assign(__assign({}, chunk), typeof clipBy === "number" && {
    text: clip(__assign(__assign(__assign({
      curr: chunk
    }, index < chunks.length - 1 && {next: chunks[index + 1]}), index > 0 && {prev: chunks[index - 1]}), {
      clipBy
    }))
  }));
  return result
};

export default highLightWords;
