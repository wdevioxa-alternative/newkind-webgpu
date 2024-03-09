import * as React from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* add css styles here (optional) */\n\n.styles-module_react-toc__2CQL2 > li,\n.styles-module_react-toc__2CQL2 > ul > li,\n.styles-module_react-toc__2CQL2 > ul > ul > li,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > li,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > li,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > ul > li {\n  padding-bottom: 10px;\n}\n\n.styles-module_react-toc__2CQL2 > li > a,\n.styles-module_react-toc__2CQL2 > ul > li > a,\n.styles-module_react-toc__2CQL2 > ul > ul > li > a,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > li > a,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > li > a,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > ul > li > a {\n  color: #dc014e;\n  text-decoration: none;\n}\n\n.styles-module_react-toc__2CQL2 > li > a:hover,\n.styles-module_react-toc__2CQL2 > ul > li > a:hover,\n.styles-module_react-toc__2CQL2 > ul > ul > li > a:hover,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > li > a:hover,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > li > a:hover,\n.styles-module_react-toc__2CQL2 > ul > ul > ul > ul > ul > li > a:hover {\n  color: #565656;\n}\n";
var styles = {"react-toc":"styles-module_react-toc__2CQL2","reactToc":"styles-module_react-toc__2CQL2"};
styleInject(css_248z);

// Replaces all the specified letters.
var replaceAll = function (retStr, customMatchers) {
    for (var key in customMatchers) {
        retStr = retStr.replace(new RegExp(key, 'g'), customMatchers[key]);
    }
    return retStr;
};
// Removes # and connects each word with '-'.
var createLink = function (string) {
    var shapedString = string.toLowerCase().replace(/^#+\s/, '').trimRight();
    var anchor = shapedString.split(' ').join('-');
    return anchor;
};
// It removes # from the given string. And it shortens the string if its longer than "stringLimit".
var createTitle = function (string, stringLimit) {
    var rawTitle = string.replace(/^#+\s/g, '');
    if (rawTitle.length >= stringLimit)
        return "".concat(rawTitle.slice(0, stringLimit), "..");
    return rawTitle;
};
// It extracts headings from the given markdownText.
var extractHeadingsFromMd = function (markdownText, highestTargetHeadings, lowestTargetHeadings) {
    var headingRegex = new RegExp("^#{".concat(highestTargetHeadings, ",").concat(lowestTargetHeadings, "}\\s.+(\\n|\\r|\\r\\n)"), 'gm');
    return markdownText.match(headingRegex);
};
var removeCodeBlockFromMd = function (markdownText) {
    var codeBlockRegex = new RegExp('((````[a-z]*\n[\\s\\S]*?\n````)|(```[a-z]*\n[\\s\\S]*?\n```)|(~~~[a-z]*\n[\\s\\S]*?\n~~~))', 'gms');
    return markdownText.replace(codeBlockRegex, '');
};

var Heading = /** @class */ (function () {
    function Heading(title, level, titleLimit, customMatchers) {
        this.title = title;
        this.level = level;
        this.titleLimit = titleLimit;
        this.customMatchers = customMatchers ? customMatchers : {};
    }
    Heading.prototype.generateList = function () {
        var link = createLink(this.title);
        var listItem = (React.createElement("li", null,
            React.createElement("a", { href: "#".concat(replaceAll(link, this.customMatchers)) }, createTitle(this.title, this.titleLimit))));
        return React.createElement(React.Fragment, null, nestUl(this.level, listItem));
    };
    return Heading;
}());
/*
 Create a new heading object from the given string
*/
var newHeading = function (headingText, titleLimit, customMatchers) {
    var matchedHashes = headingText.match(/^#+/);
    if (!matchedHashes)
        return null;
    var headingLevel = matchedHashes[0].split('').length;
    var matchers = customMatchers ? customMatchers : {};
    return new Heading(headingText, headingLevel, titleLimit, matchers);
};
/*
 Return a nested Unordered list based on the given heading level.
*/
var nestUl = function (level, listItem) {
    switch (level) {
        case 1:
            return listItem;
        case 2:
            return React.createElement("ul", null, listItem);
        case 3:
            return (React.createElement("ul", null,
                React.createElement("ul", null, listItem)));
        case 4:
            return (React.createElement("ul", null,
                React.createElement("ul", null,
                    React.createElement("ul", null, listItem))));
        case 5:
            return (React.createElement("ul", null,
                React.createElement("ul", null,
                    React.createElement("ul", null,
                        React.createElement("ul", null, listItem)))));
        case 6:
            return (React.createElement("ul", null,
                React.createElement("ul", null,
                    React.createElement("ul", null,
                        React.createElement("ul", null,
                            React.createElement("ul", null, listItem))))));
        default:
            return listItem;
    }
};

var Toc = function (_a) {
    var markdownText = _a.markdownText, titleLimit = _a.titleLimit, highestHeadingLevel = _a.highestHeadingLevel, lowestHeadingLevel = _a.lowestHeadingLevel, className = _a.className, type = _a.type, customMatchers = _a.customMatchers;
    if (!markdownText)
        return null;
    // Set default values
    var limit = titleLimit ? titleLimit : 200;
    var defaultClass = type === 'raw' ? '' : 'react-toc';
    var customClass = className || defaultClass;
    var headingLevels = [
        highestHeadingLevel || 1,
        lowestHeadingLevel || 6,
    ];
    // Style settings
    var style = styles[customClass] || className;
    // Mutate headings
    var matchedHeadings = extractHeadingsFromMd(removeCodeBlockFromMd(markdownText), headingLevels[0], headingLevels[1]);
    var headingObjects = matchedHeadings === null || matchedHeadings === void 0 ? void 0 : matchedHeadings.map(function (heading) {
        return newHeading(heading, limit, customMatchers);
    });
    var headingTags = headingObjects === null || headingObjects === void 0 ? void 0 : headingObjects.map(function (heading) {
        return heading.generateList();
    });
    if (!headingTags)
        return null;
    return (React.createElement("ul", { className: style }, headingTags.map(function (heading, index) { return (React.createElement(React.Fragment, { key: index }, heading)); })));
};

export { Toc as default };
//# sourceMappingURL=index.es.js.map
