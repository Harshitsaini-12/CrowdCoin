webpackHotUpdate(3,{

/***/ 2765:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.14.0
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var React = __webpack_require__(17);
var _assign = __webpack_require__(53);
var checkPropTypes = __webpack_require__(359);

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be replaced with error codes
// during build.
function formatProdErrorMessage(code) {
  var url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;

  for (var i = 1; i < arguments.length; i++) {
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }

  return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional ' + 'helpful warnings.';
}

var ReactVersion = '16.14.0';

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED; // Prevent newer renderers from RTE when used with older react package versions.
// Current owner and dispatcher used to share the same ref,
// but PR #14548 split them out to better support the react-debug-tools package.

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  };
}

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentBatchConfig')) {
  ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  };
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

    if (!hasExistingStack) {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  }
}

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}
function initializeLazyComponentType(lazyComponent) {
  if (lazyComponent._status === Uninitialized) {
    lazyComponent._status = Pending;
    var ctor = lazyComponent._ctor;
    var thenable = ctor();
    lazyComponent._result = thenable;
    thenable.then(function (moduleObject) {
      if (lazyComponent._status === Pending) {
        var defaultExport = moduleObject.default;

        {
          if (defaultExport === undefined) {
            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + "const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
          }
        }

        lazyComponent._status = Resolved;
        lazyComponent._result = defaultExport;
      }
    }, function (error) {
      if (lazyComponent._status === Pending) {
        lazyComponent._status = Rejected;
        lazyComponent._result = error;
      }
    });
  }
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var enableSuspenseServerRenderer = false;

var enableDeprecatedFlareAPI = false; // Experimental Host Component support.

var ReactDebugCurrentFrame;
var didWarnAboutInvalidateContextType;

{
  ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
  didWarnAboutInvalidateContextType = new Set();
}

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

function maskContext(type, context) {
  var contextTypes = type.contextTypes;

  if (!contextTypes) {
    return emptyObject;
  }

  var maskedContext = {};

  for (var contextName in contextTypes) {
    maskedContext[contextName] = context[contextName];
  }

  return maskedContext;
}

function checkContextTypes(typeSpecs, values, location) {
  {
    checkPropTypes(typeSpecs, values, location, 'Component', ReactDebugCurrentFrame.getCurrentStack);
  }
}

function validateContextBounds(context, threadID) {
  // If we don't have enough slots in this context to store this threadID,
  // fill it in without leaving any holes to ensure that the VM optimizes
  // this as non-holey index properties.
  // (Note: If `react` package is < 16.6, _threadCount is undefined.)
  for (var i = context._threadCount | 0; i <= threadID; i++) {
    // We assume that this is the same as the defaultValue which might not be
    // true if we're rendering inside a secondary renderer but they are
    // secondary because these use cases are very rare.
    context[i] = context._currentValue2;
    context._threadCount = i + 1;
  }
}
function processContext(type, context, threadID, isClass) {
  if (isClass) {
    var contextType = type.contextType;

    {
      if ('contextType' in type) {
        var isValid = // Allow null for conditional declaration
        contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

        if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
          didWarnAboutInvalidateContextType.add(type);
          var addendum = '';

          if (contextType === undefined) {
            addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
          } else if (typeof contextType !== 'object') {
            addendum = ' However, it is set to a ' + typeof contextType + '.';
          } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
            addendum = ' Did you accidentally pass the Context.Provider instead?';
          } else if (contextType._context !== undefined) {
            // <Context.Consumer>
            addendum = ' Did you accidentally pass the Context.Consumer instead?';
          } else {
            addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
          }

          error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentName(type) || 'Component', addendum);
        }
      }
    }

    if (typeof contextType === 'object' && contextType !== null) {
      validateContextBounds(contextType, threadID);
      return contextType[threadID];
    }

    {
      var maskedContext = maskContext(type, context);

      {
        if (type.contextTypes) {
          checkContextTypes(type.contextTypes, maskedContext, 'context');
        }
      }

      return maskedContext;
    }
  } else {
    {
      var _maskedContext = maskContext(type, context);

      {
        if (type.contextTypes) {
          checkContextTypes(type.contextTypes, _maskedContext, 'context');
        }
      }

      return _maskedContext;
    }
  }
}

var nextAvailableThreadIDs = new Uint16Array(16);

for (var i = 0; i < 15; i++) {
  nextAvailableThreadIDs[i] = i + 1;
}

nextAvailableThreadIDs[15] = 0;

function growThreadCountAndReturnNextAvailable() {
  var oldArray = nextAvailableThreadIDs;
  var oldSize = oldArray.length;
  var newSize = oldSize * 2;

  if (!(newSize <= 0x10000)) {
    {
      throw Error( "Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic." );
    }
  }

  var newArray = new Uint16Array(newSize);
  newArray.set(oldArray);
  nextAvailableThreadIDs = newArray;
  nextAvailableThreadIDs[0] = oldSize + 1;

  for (var _i = oldSize; _i < newSize - 1; _i++) {
    nextAvailableThreadIDs[_i] = _i + 1;
  }

  nextAvailableThreadIDs[newSize - 1] = 0;
  return oldSize;
}

function allocThreadID() {
  var nextID = nextAvailableThreadIDs[0];

  if (nextID === 0) {
    return growThreadCountAndReturnNextAvailable();
  }

  nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
  return nextID;
}
function freeThreadID(id) {
  nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
  nextAvailableThreadIDs[0] = id;
}

// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED = 0; // A simple string attribute.
// Attributes that aren't in the whitelist are presumed to have this type.

var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.

var BOOLEANISH_STRING = 2; // A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.

var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.

var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.

var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.

var POSITIVE_NUMERIC = 6;

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
/* eslint-enable max-len */

var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
    return true;
  }

  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
    return false;
  }

  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }

  illegalAttributeNameCache[attributeName] = true;

  {
    error('Invalid attribute name: `%s`', attributeName);
  }

  return false;
}
function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null) {
    return propertyInfo.type === RESERVED;
  }

  if (isCustomComponentTag) {
    return false;
  }

  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
    return true;
  }

  return false;
}
function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null && propertyInfo.type === RESERVED) {
    return false;
  }

  switch (typeof value) {
    case 'function': // $FlowIssue symbol is perfectly valid here

    case 'symbol':
      // eslint-disable-line
      return true;

    case 'boolean':
      {
        if (isCustomComponentTag) {
          return false;
        }

        if (propertyInfo !== null) {
          return !propertyInfo.acceptsBooleans;
        } else {
          var prefix = name.toLowerCase().slice(0, 5);
          return prefix !== 'data-' && prefix !== 'aria-';
        }
      }

    default:
      return false;
  }
}
function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
  if (value === null || typeof value === 'undefined') {
    return true;
  }

  if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
    return true;
  }

  if (isCustomComponentTag) {
    return false;
  }

  if (propertyInfo !== null) {
    switch (propertyInfo.type) {
      case BOOLEAN:
        return !value;

      case OVERLOADED_BOOLEAN:
        return value === false;

      case NUMERIC:
        return isNaN(value);

      case POSITIVE_NUMERIC:
        return isNaN(value) || value < 1;
    }
  }

  return false;
}
function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL) {
  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
} // When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.


var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];

reservedProps.forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.

[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
  var name = _ref[0],
      attributeName = _ref[1];
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, // attributeName
  null, // attributeNamespace
  false);
}); // These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).

['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.

['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML boolean attributes.

['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
'itemScope'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.

['checked', // Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.

['capture', 'download' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that must be positive numbers.

['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that must be numbers.

['rowSpan', 'start'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
});
var CAMELIZE = /[\-\:]([a-z])/g;

var capitalize = function (token) {
  return token[1].toUpperCase();
}; // This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML whitelist.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.


['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, null, // attributeNamespace
  false);
}); // String SVG attributes with the xlink namespace.

['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/1999/xlink', false);
}); // String SVG attributes with the xml namespace.

['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/XML/1998/namespace', false);
}); // These attribute exists both in HTML and SVG.
// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.

['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These attributes accept URLs. These must not allow javascript: URLS.
// These will also need to accept Trusted Types object in the future.

var xlinkHref = 'xlinkHref';
properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
'xlink:href', 'http://www.w3.org/1999/xlink', true);
['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  true);
});

var ReactDebugCurrentFrame$1 = null;

{
  ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
} // A javascript: URL can contain leading C0 control or \u0020 SPACE,
// and any newline or tab are filtered out as if they're not part of the URL.
// https://url.spec.whatwg.org/#url-parsing
// Tab or newline are defined as \r\n\t:
// https://infra.spec.whatwg.org/#ascii-tab-or-newline
// A C0 control is a code point in the range \u0000 NULL to \u001F
// INFORMATION SEPARATOR ONE, inclusive:
// https://infra.spec.whatwg.org/#c0-control-or-space

/* eslint-disable max-len */


var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
var didWarn = false;

function sanitizeURL(url) {
  {
    if (!didWarn && isJavaScriptProtocol.test(url)) {
      didWarn = true;

      error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
    }
  }
}

// code copied and modified from escape-html

/**
 * Module variables.
 * @private
 */
var matchHtmlRegExp = /["'&<>]/;
/**
 * Escapes special characters and HTML entities in a given html string.
 *
 * @param  {string} string HTML string to escape for later insertion
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;

      case 38:
        // &
        escape = '&amp;';
        break;

      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

        break;

      case 60:
        // <
        escape = '&lt;';
        break;

      case 62:
        // >
        escape = '&gt;';
        break;

      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
} // end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */


function escapeTextForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }

  return escapeHtml(text);
}

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */

function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextForBrowser(value) + '"';
}

function createMarkupForRoot() {
  return ROOT_ATTRIBUTE_NAME + '=""';
}
/**
 * Creates markup for a property.
 *
 * @param {string} name
 * @param {*} value
 * @return {?string} Markup string, or null if the property was invalid.
 */

function createMarkupForProperty(name, value) {
  var propertyInfo = getPropertyInfo(name);

  if (name !== 'style' && shouldIgnoreAttribute(name, propertyInfo, false)) {
    return '';
  }

  if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
    return '';
  }

  if (propertyInfo !== null) {
    var attributeName = propertyInfo.attributeName;
    var type = propertyInfo.type;

    if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
      return attributeName + '=""';
    } else {
      if (propertyInfo.sanitizeURL) {
        value = '' + value;
        sanitizeURL(value);
      }

      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    }
  } else if (isAttributeNameSafe(name)) {
    return name + '=' + quoteAttributeValueForBrowser(value);
  }

  return '';
}
/**
 * Creates markup for a custom property.
 *
 * @param {string} name
 * @param {*} value
 * @return {string} Markup string, or empty string if the property was invalid.
 */

function createMarkupForCustomAttribute(name, value) {
  if (!isAttributeNameSafe(name) || value == null) {
    return '';
  }

  return name + '=' + quoteAttributeValueForBrowser(value);
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var currentlyRenderingComponent = null;
var firstWorkInProgressHook = null;
var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

var didScheduleRenderPhaseUpdate = false; // Lazily created map of render-phase updates

var renderPhaseUpdates = null; // Counter to prevent infinite loops.

var numberOfReRenders = 0;
var RE_RENDER_LIMIT = 25;
var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

var currentHookNameInDev;

function resolveCurrentlyRenderingComponent() {
  if (!(currentlyRenderingComponent !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  {
    if (isInHookUserCodeInDev) {
      error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://fb.me/rules-of-hooks');
    }
  }

  return currentlyRenderingComponent;
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    {
      error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
    }

    return false;
  }

  {
    // Don't bother comparing lengths in prod because these arrays should be
    // passed inline.
    if (nextDeps.length !== prevDeps.length) {
      error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
    }
  }

  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}

function createHook() {
  if (numberOfReRenders > 0) {
    {
      {
        throw Error( "Rendered more hooks than during the previous render" );
      }
    }
  }

  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}

function createWorkInProgressHook() {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      isReRender = false;
      firstWorkInProgressHook = workInProgressHook = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      isReRender = false; // Append to the end of the list

      workInProgressHook = workInProgressHook.next = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = workInProgressHook.next;
    }
  }

  return workInProgressHook;
}

function prepareToUseHooks(componentIdentity) {
  currentlyRenderingComponent = componentIdentity;

  {
    isInHookUserCodeInDev = false;
  } // The following should have already been reset
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;

}
function finishHooks(Component, props, children, refOrContext) {
  // This must be called after every function component to prevent hooks from
  // being used in classes.
  while (didScheduleRenderPhaseUpdate) {
    // Updates were scheduled during the render phase. They are stored in
    // the `renderPhaseUpdates` map. Call the component again, reusing the
    // work-in-progress hooks and applying the additional updates on top. Keep
    // restarting until no more updates are scheduled.
    didScheduleRenderPhaseUpdate = false;
    numberOfReRenders += 1; // Start over from the beginning of the list

    workInProgressHook = null;
    children = Component(props, refOrContext);
  }

  currentlyRenderingComponent = null;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  renderPhaseUpdates = null;
  workInProgressHook = null;

  {
    isInHookUserCodeInDev = false;
  } // These were reset above
  // currentlyRenderingComponent = null;
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;


  return children;
}

function readContext(context, observedBits) {
  var threadID = currentThreadID;
  validateContextBounds(context, threadID);

  {
    if (isInHookUserCodeInDev) {
      error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
    }
  }

  return context[threadID];
}

function useContext(context, observedBits) {
  {
    currentHookNameInDev = 'useContext';
  }

  resolveCurrentlyRenderingComponent();
  var threadID = currentThreadID;
  validateContextBounds(context, threadID);
  return context[threadID];
}

function basicStateReducer(state, action) {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function useState(initialState) {
  {
    currentHookNameInDev = 'useState';
  }

  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
  initialState);
}
function useReducer(reducer, initialArg, init) {
  {
    if (reducer !== basicStateReducer) {
      currentHookNameInDev = 'useReducer';
    }
  }

  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();

  if (isReRender) {
    // This is a re-render. Apply the new render phase updates to the previous
    // current hook.
    var queue = workInProgressHook.queue;
    var dispatch = queue.dispatch;

    if (renderPhaseUpdates !== null) {
      // Render phase updates are stored in a map of queue -> linked list
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

      if (firstRenderPhaseUpdate !== undefined) {
        renderPhaseUpdates.delete(queue);
        var newState = workInProgressHook.memoizedState;
        var update = firstRenderPhaseUpdate;

        do {
          // Process this render phase update. We don't have to check the
          // priority because it will always be the same as the current
          // render's.
          var action = update.action;

          {
            isInHookUserCodeInDev = true;
          }

          newState = reducer(newState, action);

          {
            isInHookUserCodeInDev = false;
          }

          update = update.next;
        } while (update !== null);

        workInProgressHook.memoizedState = newState;
        return [newState, dispatch];
      }
    }

    return [workInProgressHook.memoizedState, dispatch];
  } else {
    {
      isInHookUserCodeInDev = true;
    }

    var initialState;

    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
    } else {
      initialState = init !== undefined ? init(initialArg) : initialArg;
    }

    {
      isInHookUserCodeInDev = false;
    }

    workInProgressHook.memoizedState = initialState;

    var _queue = workInProgressHook.queue = {
      last: null,
      dispatch: null
    };

    var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

    return [workInProgressHook.memoizedState, _dispatch];
  }
}

function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;

  if (workInProgressHook !== null) {
    var prevState = workInProgressHook.memoizedState;

    if (prevState !== null) {
      if (nextDeps !== null) {
        var prevDeps = prevState[1];

        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }
  }

  {
    isInHookUserCodeInDev = true;
  }

  var nextValue = nextCreate();

  {
    isInHookUserCodeInDev = false;
  }

  workInProgressHook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function useRef(initialValue) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  var previousRef = workInProgressHook.memoizedState;

  if (previousRef === null) {
    var ref = {
      current: initialValue
    };

    {
      Object.seal(ref);
    }

    workInProgressHook.memoizedState = ref;
    return ref;
  } else {
    return previousRef;
  }
}

function useLayoutEffect(create, inputs) {
  {
    currentHookNameInDev = 'useLayoutEffect';

    error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://fb.me/react-uselayouteffect-ssr for common fixes.');
  }
}

function dispatchAction(componentIdentity, queue, action) {
  if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
    {
      throw Error( "Too many re-renders. React limits the number of renders to prevent an infinite loop." );
    }
  }

  if (componentIdentity === currentlyRenderingComponent) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    var update = {
      action: action,
      next: null
    };

    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }

    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

    if (firstRenderPhaseUpdate === undefined) {
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }

      lastRenderPhaseUpdate.next = update;
    }
  }
}

function useCallback(callback, deps) {
  // Callbacks are passed as they are in the server environment.
  return callback;
}

function useResponder(responder, props) {
  return {
    props: props,
    responder: responder
  };
}

function useDeferredValue(value, config) {
  resolveCurrentlyRenderingComponent();
  return value;
}

function useTransition(config) {
  resolveCurrentlyRenderingComponent();

  var startTransition = function (callback) {
    callback();
  };

  return [startTransition, false];
}

function noop() {}

var currentThreadID = 0;
function setCurrentThreadID(threadID) {
  currentThreadID = threadID;
}
var Dispatcher = {
  readContext: readContext,
  useContext: useContext,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,
  useLayoutEffect: useLayoutEffect,
  useCallback: useCallback,
  // useImperativeHandle is not run in the server environment
  useImperativeHandle: noop,
  // Effects are not run in the server environment.
  useEffect: noop,
  // Debugging effect
  useDebugValue: noop,
  useResponder: useResponder,
  useDeferredValue: useDeferredValue,
  useTransition: useTransition
};

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var Namespaces = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
}; // Assumes there is no parent namespace.

function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;

    case 'math':
      return MATH_NAMESPACE;

    default:
      return HTML_NAMESPACE;
  }
}
function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }

  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE;
  } // By default, pass namespace below.


  return parentNamespace;
}

var ReactDebugCurrentFrame$2 = null;
var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  ReactDebugCurrentFrame$2 = ReactSharedInternals.ReactDebugCurrentFrame;
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };
  var propTypes = {
    value: function (props, propName, componentName) {
      if (hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled || props[propName] == null || enableDeprecatedFlareAPI ) {
        return null;
      }

      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (props.onChange || props.readOnly || props.disabled || props[propName] == null || enableDeprecatedFlareAPI ) {
        return null;
      }

      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    }
  };
  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */

  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props) {
    checkPropTypes(propTypes, props, 'prop', tagName, ReactDebugCurrentFrame$2.getStackAddendum);
  };
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true // NOTE: menuitem's close tag should be omitted, but that causes problems.

};

// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);

var HTML = '__html';
var ReactDebugCurrentFrame$3 = null;

{
  ReactDebugCurrentFrame$3 = ReactSharedInternals.ReactDebugCurrentFrame;
}

function assertValidProps(tag, props) {
  if (!props) {
    return;
  } // Note the use of `==` which checks for null or undefined.


  if (voidElementTags[tag]) {
    if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
      {
        throw Error( tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`." + ( ReactDebugCurrentFrame$3.getStackAddendum() ) );
      }
    }
  }

  if (props.dangerouslySetInnerHTML != null) {
    if (!(props.children == null)) {
      {
        throw Error( "Can only set one of `children` or `props.dangerouslySetInnerHTML`." );
      }
    }

    if (!(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML)) {
      {
        throw Error( "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information." );
      }
    }
  }

  {
    if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
      error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
    }
  }

  if (!(props.style == null || typeof props.style === 'object')) {
    {
      throw Error( "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX." + ( ReactDebugCurrentFrame$3.getStackAddendum() ) );
    }
  }
}

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */


var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.

Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */

function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901
  var isEmpty = value == null || typeof value === 'boolean' || value === '';

  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */

function hyphenateStyleName(name) {
  return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
}

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }

  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;

    default:
      return true;
  }
}

var warnValidStyle = function () {};

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
  var msPattern$1 = /^-ms-/;
  var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

  var badStyleValueWithSemicolonPattern = /;\s*$/;
  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var camelize = function (string) {
    return string.replace(hyphenPattern, function (_, character) {
      return character.toUpperCase();
    });
  };

  var warnHyphenatedStyleName = function (name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;

    error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
    // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
    // is converted to lowercase `ms`.
    camelize(name.replace(msPattern$1, 'ms-')));
  };

  var warnBadVendoredStyleName = function (name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;

    error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
  };

  var warnStyleValueWithSemicolon = function (name, value) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;

    error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
  };

  var warnStyleValueIsNaN = function (name, value) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;

    error('`NaN` is an invalid value for the `%s` css style property.', name);
  };

  var warnStyleValueIsInfinity = function (name, value) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;

    error('`Infinity` is an invalid value for the `%s` css style property.', name);
  };

  warnValidStyle = function (name, value) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value);
      }
    }
  };
}

var warnValidStyle$1 = warnValidStyle;

var ariaProperties = {
  'aria-current': 0,
  // state
  'aria-details': 0,
  'aria-disabled': 0,
  // state
  'aria-hidden': 0,
  // state
  'aria-invalid': 0,
  // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function validateProperty(tagName, name) {
  {
    if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
      return true;
    }

    if (rARIACamel.test(name)) {
      var ariaName = 'aria-' + name.slice(4).toLowerCase();
      var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
      // DOM properties, then it is an invalid aria-* attribute.

      if (correctName == null) {
        error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);

        warnedProperties[name] = true;
        return true;
      } // aria-* attributes should be lowercase; suggest the lowercase version.


      if (name !== correctName) {
        error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);

        warnedProperties[name] = true;
        return true;
      }
    }

    if (rARIA.test(name)) {
      var lowerCasedName = name.toLowerCase();
      var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
      // DOM properties, then it is an invalid aria-* attribute.

      if (standardName == null) {
        warnedProperties[name] = true;
        return false;
      } // aria-* attributes should be lowercase; suggest the lowercase version.


      if (name !== standardName) {
        error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);

        warnedProperties[name] = true;
        return true;
      }
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props) {
  {
    var invalidProps = [];

    for (var key in props) {
      var isValid = validateProperty(type, key);

      if (!isValid) {
        invalidProps.push(key);
      }
    }

    var unknownPropString = invalidProps.map(function (prop) {
      return '`' + prop + '`';
    }).join(', ');

    if (invalidProps.length === 1) {
      error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop', unknownPropString, type);
    } else if (invalidProps.length > 1) {
      error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop', unknownPropString, type);
    }
  }
}

function validateProperties(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }

  warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;
function validateProperties$1(type, props) {
  {
    if (type !== 'input' && type !== 'textarea' && type !== 'select') {
      return;
    }

    if (props != null && props.value === null && !didWarnValueNull) {
      didWarnValueNull = true;

      if (type === 'select' && props.multiple) {
        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
      } else {
        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
      }
    }
  }
}

/**
 * Mapping from registration name to plugin module
 */

var registrationNameModules = {};
/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */

var possibleRegistrationNames =  {} ; // Trust the developer to only use possibleRegistrationNames in true

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  class: 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  default: 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  disablepictureinpicture: 'disablePictureInPicture',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  for: 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nomodule: 'noModule',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  in: 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  suppresshydrationwarning: 'suppressHydrationWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  typeof: 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

var validateProperty$1 = function () {};

{
  var warnedProperties$1 = {};
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on./;
  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

  validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
    if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    var lowerCasedName = name.toLowerCase();

    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');

      warnedProperties$1[name] = true;
      return true;
    } // We can't rely on the event system being injected on the server.


    if (canUseEventSystem) {
      if (registrationNameModules.hasOwnProperty(name)) {
        return true;
      }

      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

      if (registrationName != null) {
        error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);

        warnedProperties$1[name] = true;
        return true;
      }

      if (EVENT_NAME_REGEX.test(name)) {
        error('Unknown event handler property `%s`. It will be ignored.', name);

        warnedProperties$1[name] = true;
        return true;
      }
    } else if (EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we are in a server environment.
      // So we can't tell if the event name is correct for sure, but we can filter
      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
      if (INVALID_EVENT_NAME_REGEX.test(name)) {
        error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
      }

      warnedProperties$1[name] = true;
      return true;
    } // Let the ARIA attribute hook validate ARIA attributes


    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');

      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');

      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);

      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);

      warnedProperties$1[name] = true;
      return true;
    }

    var propertyInfo = getPropertyInfo(name);
    var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];

      if (standardName !== name) {
        error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);

        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);

      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
      if (value) {
        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
      } else {
        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
      }

      warnedProperties$1[name] = true;
      return true;
    } // Now that we've validated casing, do not validate
    // data types for reserved props


    if (isReserved) {
      return true;
    } // Warn when a known attribute is a bad type


    if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
      warnedProperties$1[name] = true;
      return false;
    } // Warn when passing the strings 'false' or 'true' into a boolean prop


    if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
      error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);

      warnedProperties$1[name] = true;
      return true;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props, canUseEventSystem) {
  {
    var unknownProps = [];

    for (var key in props) {
      var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);

      if (!isValid) {
        unknownProps.push(key);
      }
    }

    var unknownPropString = unknownProps.map(function (prop) {
      return '`' + prop + '`';
    }).join(', ');

    if (unknownProps.length === 1) {
      error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior', unknownPropString, type);
    } else if (unknownProps.length > 1) {
      error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior', unknownPropString, type);
    }
  }
};

function validateProperties$2(type, props, canUseEventSystem) {
  if (isCustomComponent(type, props)) {
    return;
  }

  warnUnknownProperties(type, props, canUseEventSystem);
}

var toArray = React.Children.toArray; // This is only used in DEV.
// Each entry is `this.stack` from a currently executing renderer instance.
// (There may be more than one because ReactDOMServer is reentrant).
// Each stack is an array of frames which may contain nested stacks of elements.

var currentDebugStacks = [];
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var ReactDebugCurrentFrame$4;
var prevGetCurrentStackImpl = null;

var getCurrentServerStackImpl = function () {
  return '';
};

var describeStackFrame = function (element) {
  return '';
};

var validatePropertiesInDevelopment = function (type, props) {};

var pushCurrentDebugStack = function (stack) {};

var pushElementToDebugStack = function (element) {};

var popCurrentDebugStack = function () {};

var hasWarnedAboutUsingContextAsConsumer = false;

{
  ReactDebugCurrentFrame$4 = ReactSharedInternals.ReactDebugCurrentFrame;

  validatePropertiesInDevelopment = function (type, props) {
    validateProperties(type, props);
    validateProperties$1(type, props);
    validateProperties$2(type, props,
    /* canUseEventSystem */
    false);
  };

  describeStackFrame = function (element) {
    var source = element._source;
    var type = element.type;
    var name = getComponentName(type);
    var ownerName = null;
    return describeComponentFrame(name, source, ownerName);
  };

  pushCurrentDebugStack = function (stack) {
    currentDebugStacks.push(stack);

    if (currentDebugStacks.length === 1) {
      // We are entering a server renderer.
      // Remember the previous (e.g. client) global stack implementation.
      prevGetCurrentStackImpl = ReactDebugCurrentFrame$4.getCurrentStack;
      ReactDebugCurrentFrame$4.getCurrentStack = getCurrentServerStackImpl;
    }
  };

  pushElementToDebugStack = function (element) {
    // For the innermost executing ReactDOMServer call,
    var stack = currentDebugStacks[currentDebugStacks.length - 1]; // Take the innermost executing frame (e.g. <Foo>),

    var frame = stack[stack.length - 1]; // and record that it has one more element associated with it.

    frame.debugElementStack.push(element); // We only need this because we tail-optimize single-element
    // children and directly handle them in an inner loop instead of
    // creating separate frames for them.
  };

  popCurrentDebugStack = function () {
    currentDebugStacks.pop();

    if (currentDebugStacks.length === 0) {
      // We are exiting the server renderer.
      // Restore the previous (e.g. client) global stack implementation.
      ReactDebugCurrentFrame$4.getCurrentStack = prevGetCurrentStackImpl;
      prevGetCurrentStackImpl = null;
    }
  };

  getCurrentServerStackImpl = function () {
    if (currentDebugStacks.length === 0) {
      // Nothing is currently rendering.
      return '';
    } // ReactDOMServer is reentrant so there may be multiple calls at the same time.
    // Take the frames from the innermost call which is the last in the array.


    var frames = currentDebugStacks[currentDebugStacks.length - 1];
    var stack = ''; // Go through every frame in the stack from the innermost one.

    for (var i = frames.length - 1; i >= 0; i--) {
      var frame = frames[i]; // Every frame might have more than one debug element stack entry associated with it.
      // This is because single-child nesting doesn't create materialized frames.
      // Instead it would push them through `pushElementToDebugStack()`.

      var debugElementStack = frame.debugElementStack;

      for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
        stack += describeStackFrame(debugElementStack[ii]);
      }
    }

    return stack;
  };
}

var didWarnDefaultInputValue = false;
var didWarnDefaultChecked = false;
var didWarnDefaultSelectValue = false;
var didWarnDefaultTextareaValue = false;
var didWarnInvalidOptionChildren = false;
var didWarnAboutNoopUpdateForComponent = {};
var didWarnAboutBadClass = {};
var didWarnAboutModulePatternComponent = {};
var didWarnAboutDeprecatedWillMount = {};
var didWarnAboutUndefinedDerivedState = {};
var didWarnAboutUninitializedState = {};
var valuePropNames = ['value', 'defaultValue'];
var newlineEatingTags = {
  listing: true,
  pre: true,
  textarea: true
}; // We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

var validatedTagCache = {};

function validateDangerousTag(tag) {
  if (!validatedTagCache.hasOwnProperty(tag)) {
    if (!VALID_TAG_REGEX.test(tag)) {
      {
        throw Error( "Invalid tag: " + tag );
      }
    }

    validatedTagCache[tag] = true;
  }
}

var styleNameCache = {};

var processStyleName = function (styleName) {
  if (styleNameCache.hasOwnProperty(styleName)) {
    return styleNameCache[styleName];
  }

  var result = hyphenateStyleName(styleName);
  styleNameCache[styleName] = result;
  return result;
};

function createMarkupForStyles(styles) {
  var serialized = '';
  var delimiter = '';

  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }

    var isCustomProperty = styleName.indexOf('--') === 0;
    var styleValue = styles[styleName];

    {
      if (!isCustomProperty) {
        warnValidStyle$1(styleName, styleValue);
      }
    }

    if (styleValue != null) {
      serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ':';
      serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
      delimiter = ';';
    }
  }

  return serialized || null;
}

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && getComponentName(_constructor) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;

    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
      return;
    }

    error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);

    didWarnAboutNoopUpdateForComponent[warningKey] = true;
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function getNonChildrenInnerMarkup(props) {
  var innerHTML = props.dangerouslySetInnerHTML;

  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      return innerHTML.__html;
    }
  } else {
    var content = props.children;

    if (typeof content === 'string' || typeof content === 'number') {
      return escapeTextForBrowser(content);
    }
  }

  return null;
}

function flattenTopLevelChildren(children) {
  if (!React.isValidElement(children)) {
    return toArray(children);
  }

  var element = children;

  if (element.type !== REACT_FRAGMENT_TYPE) {
    return [element];
  }

  var fragmentChildren = element.props.children;

  if (!React.isValidElement(fragmentChildren)) {
    return toArray(fragmentChildren);
  }

  var fragmentChildElement = fragmentChildren;
  return [fragmentChildElement];
}

function flattenOptionChildren(children) {
  if (children === undefined || children === null) {
    return children;
  }

  var content = ''; // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.

  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }

    content += child;

    {
      if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
        didWarnInvalidOptionChildren = true;

        error('Only strings and numbers are supported as <option> children.');
      }
    }
  });
  return content;
}

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var STYLE = 'style';
var RESERVED_PROPS = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null,
  suppressHydrationWarning: null
};

function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
  var ret = '<' + tagVerbatim;

  for (var propKey in props) {
    if (!hasOwnProperty$2.call(props, propKey)) {
      continue;
    }

    var propValue = props[propKey];

    if (propValue == null) {
      continue;
    }

    if (propKey === STYLE) {
      propValue = createMarkupForStyles(propValue);
    }

    var markup = null;

    if (isCustomComponent(tagLowercase, props)) {
      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
        markup = createMarkupForCustomAttribute(propKey, propValue);
      }
    } else {
      markup = createMarkupForProperty(propKey, propValue);
    }

    if (markup) {
      ret += ' ' + markup;
    }
  } // For static pages, no need to put React ID and checksum. Saves lots of
  // bytes.


  if (makeStaticMarkup) {
    return ret;
  }

  if (isRootElement) {
    ret += ' ' + createMarkupForRoot();
  }

  return ret;
}

function validateRenderResult(child, type) {
  if (child === undefined) {
    {
      {
        throw Error( (getComponentName(type) || 'Component') + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null." );
      }
    }
  }
}

function resolve(child, context, threadID) {
  while (React.isValidElement(child)) {
    // Safe because we just checked it's an element.
    var element = child;
    var Component = element.type;

    {
      pushElementToDebugStack(element);
    }

    if (typeof Component !== 'function') {
      break;
    }

    processChild(element, Component);
  } // Extra closure so queue and replace can be captured properly


  function processChild(element, Component) {
    var isClass = shouldConstruct(Component);
    var publicContext = processContext(Component, context, threadID, isClass);
    var queue = [];
    var replace = false;
    var updater = {
      isMounted: function (publicInstance) {
        return false;
      },
      enqueueForceUpdate: function (publicInstance) {
        if (queue === null) {
          warnNoop(publicInstance, 'forceUpdate');
          return null;
        }
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        replace = true;
        queue = [completeState];
      },
      enqueueSetState: function (publicInstance, currentPartialState) {
        if (queue === null) {
          warnNoop(publicInstance, 'setState');
          return null;
        }

        queue.push(currentPartialState);
      }
    };
    var inst;

    if (isClass) {
      inst = new Component(element.props, publicContext, updater);

      if (typeof Component.getDerivedStateFromProps === 'function') {
        {
          if (inst.state === null || inst.state === undefined) {
            var componentName = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutUninitializedState[componentName]) {
              error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, inst.state === null ? 'null' : 'undefined', componentName);

              didWarnAboutUninitializedState[componentName] = true;
            }
          }
        }

        var partialState = Component.getDerivedStateFromProps.call(null, element.props, inst.state);

        {
          if (partialState === undefined) {
            var _componentName = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutUndefinedDerivedState[_componentName]) {
              error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', _componentName);

              didWarnAboutUndefinedDerivedState[_componentName] = true;
            }
          }
        }

        if (partialState != null) {
          inst.state = _assign({}, inst.state, partialState);
        }
      }
    } else {
      {
        if (Component.prototype && typeof Component.prototype.render === 'function') {
          var _componentName2 = getComponentName(Component) || 'Unknown';

          if (!didWarnAboutBadClass[_componentName2]) {
            error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', _componentName2, _componentName2);

            didWarnAboutBadClass[_componentName2] = true;
          }
        }
      }

      var componentIdentity = {};
      prepareToUseHooks(componentIdentity);
      inst = Component(element.props, publicContext, updater);
      inst = finishHooks(Component, element.props, inst, publicContext);

      if (inst == null || inst.render == null) {
        child = inst;
        validateRenderResult(child, Component);
        return;
      }

      {
        var _componentName3 = getComponentName(Component) || 'Unknown';

        if (!didWarnAboutModulePatternComponent[_componentName3]) {
          error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName3, _componentName3, _componentName3);

          didWarnAboutModulePatternComponent[_componentName3] = true;
        }
      }
    }

    inst.props = element.props;
    inst.context = publicContext;
    inst.updater = updater;
    var initialState = inst.state;

    if (initialState === undefined) {
      inst.state = initialState = null;
    }

    if (typeof inst.UNSAFE_componentWillMount === 'function' || typeof inst.componentWillMount === 'function') {
      if (typeof inst.componentWillMount === 'function') {
        {
          if ( inst.componentWillMount.__suppressDeprecationWarning !== true) {
            var _componentName4 = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
              warn( // keep this warning in sync with ReactStrictModeWarning.js
              'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://fb.me/react-unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', _componentName4);

              didWarnAboutDeprecatedWillMount[_componentName4] = true;
            }
          }
        } // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.


        if (typeof Component.getDerivedStateFromProps !== 'function') {
          inst.componentWillMount();
        }
      }

      if (typeof inst.UNSAFE_componentWillMount === 'function' && typeof Component.getDerivedStateFromProps !== 'function') {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.
        inst.UNSAFE_componentWillMount();
      }

      if (queue.length) {
        var oldQueue = queue;
        var oldReplace = replace;
        queue = null;
        replace = false;

        if (oldReplace && oldQueue.length === 1) {
          inst.state = oldQueue[0];
        } else {
          var nextState = oldReplace ? oldQueue[0] : inst.state;
          var dontMutate = true;

          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
            var partial = oldQueue[i];

            var _partialState = typeof partial === 'function' ? partial.call(inst, nextState, element.props, publicContext) : partial;

            if (_partialState != null) {
              if (dontMutate) {
                dontMutate = false;
                nextState = _assign({}, nextState, _partialState);
              } else {
                _assign(nextState, _partialState);
              }
            }
          }

          inst.state = nextState;
        }
      } else {
        queue = null;
      }
    }

    child = inst.render();

    {
      if (child === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        child = null;
      }
    }

    validateRenderResult(child, Component);
    var childContext;

    {
      if (typeof inst.getChildContext === 'function') {
        var _childContextTypes = Component.childContextTypes;

        if (typeof _childContextTypes === 'object') {
          childContext = inst.getChildContext();

          for (var contextKey in childContext) {
            if (!(contextKey in _childContextTypes)) {
              {
                throw Error( (getComponentName(Component) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes." );
              }
            }
          }
        } else {
          {
            error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(Component) || 'Unknown');
          }
        }
      }

      if (childContext) {
        context = _assign({}, context, childContext);
      }
    }
  }

  return {
    child: child,
    context: context
  };
}

var ReactDOMServerRenderer =
/*#__PURE__*/
function () {
  // TODO: type this more strictly:
  // DEV-only
  function ReactDOMServerRenderer(children, makeStaticMarkup) {
    var flatChildren = flattenTopLevelChildren(children);
    var topFrame = {
      type: null,
      // Assume all trees start in the HTML namespace (not totally true, but
      // this is what we did historically)
      domNamespace: Namespaces.html,
      children: flatChildren,
      childIndex: 0,
      context: emptyObject,
      footer: ''
    };

    {
      topFrame.debugElementStack = [];
    }

    this.threadID = allocThreadID();
    this.stack = [topFrame];
    this.exhausted = false;
    this.currentSelectValue = null;
    this.previousWasTextNode = false;
    this.makeStaticMarkup = makeStaticMarkup;
    this.suspenseDepth = 0; // Context (new API)

    this.contextIndex = -1;
    this.contextStack = [];
    this.contextValueStack = [];

    {
      this.contextProviderStack = [];
    }
  }

  var _proto = ReactDOMServerRenderer.prototype;

  _proto.destroy = function destroy() {
    if (!this.exhausted) {
      this.exhausted = true;
      this.clearProviders();
      freeThreadID(this.threadID);
    }
  }
  /**
   * Note: We use just two stacks regardless of how many context providers you have.
   * Providers are always popped in the reverse order to how they were pushed
   * so we always know on the way down which provider you'll encounter next on the way up.
   * On the way down, we push the current provider, and its context value *before*
   * we mutated it, onto the stacks. Therefore, on the way up, we always know which
   * provider needs to be "restored" to which value.
   * https://github.com/facebook/react/pull/12985#issuecomment-396301248
   */
  ;

  _proto.pushProvider = function pushProvider(provider) {
    var index = ++this.contextIndex;
    var context = provider.type._context;
    var threadID = this.threadID;
    validateContextBounds(context, threadID);
    var previousValue = context[threadID]; // Remember which value to restore this context to on our way up.

    this.contextStack[index] = context;
    this.contextValueStack[index] = previousValue;

    {
      // Only used for push/pop mismatch warnings.
      this.contextProviderStack[index] = provider;
    } // Mutate the current value.


    context[threadID] = provider.props.value;
  };

  _proto.popProvider = function popProvider(provider) {
    var index = this.contextIndex;

    {
      if (index < 0 || provider !== this.contextProviderStack[index]) {
        error('Unexpected pop.');
      }
    }

    var context = this.contextStack[index];
    var previousValue = this.contextValueStack[index]; // "Hide" these null assignments from Flow by using `any`
    // because conceptually they are deletions--as long as we
    // promise to never access values beyond `this.contextIndex`.

    this.contextStack[index] = null;
    this.contextValueStack[index] = null;

    {
      this.contextProviderStack[index] = null;
    }

    this.contextIndex--; // Restore to the previous value we stored as we were walking down.
    // We've already verified that this context has been expanded to accommodate
    // this thread id, so we don't need to do it again.

    context[this.threadID] = previousValue;
  };

  _proto.clearProviders = function clearProviders() {
    // Restore any remaining providers on the stack to previous values
    for (var index = this.contextIndex; index >= 0; index--) {
      var context = this.contextStack[index];
      var previousValue = this.contextValueStack[index];
      context[this.threadID] = previousValue;
    }
  };

  _proto.read = function read(bytes) {
    if (this.exhausted) {
      return null;
    }

    var prevThreadID = currentThreadID;
    setCurrentThreadID(this.threadID);
    var prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = Dispatcher;

    try {
      // Markup generated within <Suspense> ends up buffered until we know
      // nothing in that boundary suspended
      var out = [''];
      var suspended = false;

      while (out[0].length < bytes) {
        if (this.stack.length === 0) {
          this.exhausted = true;
          freeThreadID(this.threadID);
          break;
        }

        var frame = this.stack[this.stack.length - 1];

        if (suspended || frame.childIndex >= frame.children.length) {
          var footer = frame.footer;

          if (footer !== '') {
            this.previousWasTextNode = false;
          }

          this.stack.pop();

          if (frame.type === 'select') {
            this.currentSelectValue = null;
          } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
            var provider = frame.type;
            this.popProvider(provider);
          } else if (frame.type === REACT_SUSPENSE_TYPE) {
            this.suspenseDepth--;
            var buffered = out.pop();

            if (suspended) {
              suspended = false; // If rendering was suspended at this boundary, render the fallbackFrame

              var fallbackFrame = frame.fallbackFrame;

              if (!fallbackFrame) {
                {
                  throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
                }
              }

              this.stack.push(fallbackFrame);
              out[this.suspenseDepth] += '<!--$!-->'; // Skip flushing output since we're switching to the fallback

              continue;
            } else {
              out[this.suspenseDepth] += buffered;
            }
          } // Flush output


          out[this.suspenseDepth] += footer;
          continue;
        }

        var child = frame.children[frame.childIndex++];
        var outBuffer = '';

        if (true) {
          pushCurrentDebugStack(this.stack); // We're starting work on this frame, so reset its inner stack.

          frame.debugElementStack.length = 0;
        }

        try {
          outBuffer += this.render(child, frame.context, frame.domNamespace);
        } catch (err) {
          if (err != null && typeof err.then === 'function') {
            if (enableSuspenseServerRenderer) {
              if (!(this.suspenseDepth > 0)) {
                {
                  throw Error(true ? "A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." : formatProdErrorMessage(342));
                }
              }

              suspended = true;
            } else {
              if (true) {
                {
                  throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
                }
              }
            }
          } else {
            throw err;
          }
        } finally {
          if (true) {
            popCurrentDebugStack();
          }
        }

        if (out.length <= this.suspenseDepth) {
          out.push('');
        }

        out[this.suspenseDepth] += outBuffer;
      }

      return out[0];
    } finally {
      ReactCurrentDispatcher.current = prevDispatcher;
      setCurrentThreadID(prevThreadID);
    }
  };

  _proto.render = function render(child, context, parentNamespace) {
    if (typeof child === 'string' || typeof child === 'number') {
      var text = '' + child;

      if (text === '') {
        return '';
      }

      if (this.makeStaticMarkup) {
        return escapeTextForBrowser(text);
      }

      if (this.previousWasTextNode) {
        return '<!-- -->' + escapeTextForBrowser(text);
      }

      this.previousWasTextNode = true;
      return escapeTextForBrowser(text);
    } else {
      var nextChild;

      var _resolve = resolve(child, context, this.threadID);

      nextChild = _resolve.child;
      context = _resolve.context;

      if (nextChild === null || nextChild === false) {
        return '';
      } else if (!React.isValidElement(nextChild)) {
        if (nextChild != null && nextChild.$$typeof != null) {
          // Catch unexpected special types early.
          var $$typeof = nextChild.$$typeof;

          if (!($$typeof !== REACT_PORTAL_TYPE)) {
            {
              throw Error( "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render." );
            }
          } // Catch-all to prevent an infinite loop if React.Children.toArray() supports some new type.


          {
            {
              throw Error( "Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue." );
            }
          }
        }

        var nextChildren = toArray(nextChild);
        var frame = {
          type: null,
          domNamespace: parentNamespace,
          children: nextChildren,
          childIndex: 0,
          context: context,
          footer: ''
        };

        {
          frame.debugElementStack = [];
        }

        this.stack.push(frame);
        return '';
      } // Safe because we just checked it's an element.


      var nextElement = nextChild;
      var elementType = nextElement.type;

      if (typeof elementType === 'string') {
        return this.renderDOM(nextElement, context, parentNamespace);
      }

      switch (elementType) {
        case REACT_STRICT_MODE_TYPE:
        case REACT_CONCURRENT_MODE_TYPE:
        case REACT_PROFILER_TYPE:
        case REACT_SUSPENSE_LIST_TYPE:
        case REACT_FRAGMENT_TYPE:
          {
            var _nextChildren = toArray(nextChild.props.children);

            var _frame = {
              type: null,
              domNamespace: parentNamespace,
              children: _nextChildren,
              childIndex: 0,
              context: context,
              footer: ''
            };

            {
              _frame.debugElementStack = [];
            }

            this.stack.push(_frame);
            return '';
          }

        case REACT_SUSPENSE_TYPE:
          {
            {
              {
                {
                  throw Error( "ReactDOMServer does not yet support Suspense." );
                }
              }
            }
          }
      }

      if (typeof elementType === 'object' && elementType !== null) {
        switch (elementType.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            {
              var element = nextChild;

              var _nextChildren4;

              var componentIdentity = {};
              prepareToUseHooks(componentIdentity);
              _nextChildren4 = elementType.render(element.props, element.ref);
              _nextChildren4 = finishHooks(elementType.render, element.props, _nextChildren4, element.ref);
              _nextChildren4 = toArray(_nextChildren4);
              var _frame4 = {
                type: null,
                domNamespace: parentNamespace,
                children: _nextChildren4,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame4.debugElementStack = [];
              }

              this.stack.push(_frame4);
              return '';
            }

          case REACT_MEMO_TYPE:
            {
              var _element = nextChild;
              var _nextChildren5 = [React.createElement(elementType.type, _assign({
                ref: _element.ref
              }, _element.props))];
              var _frame5 = {
                type: null,
                domNamespace: parentNamespace,
                children: _nextChildren5,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame5.debugElementStack = [];
              }

              this.stack.push(_frame5);
              return '';
            }

          case REACT_PROVIDER_TYPE:
            {
              var provider = nextChild;
              var nextProps = provider.props;

              var _nextChildren6 = toArray(nextProps.children);

              var _frame6 = {
                type: provider,
                domNamespace: parentNamespace,
                children: _nextChildren6,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame6.debugElementStack = [];
              }

              this.pushProvider(provider);
              this.stack.push(_frame6);
              return '';
            }

          case REACT_CONTEXT_TYPE:
            {
              var reactContext = nextChild.type; // The logic below for Context differs depending on PROD or DEV mode. In
              // DEV mode, we create a separate object for Context.Consumer that acts
              // like a proxy to Context. This proxy object adds unnecessary code in PROD
              // so we use the old behaviour (Context.Consumer references Context) to
              // reduce size and overhead. The separate object references context via
              // a property called "_context", which also gives us the ability to check
              // in DEV mode if this property exists or not and warn if it does not.

              {
                if (reactContext._context === undefined) {
                  // This may be because it's a Context (rather than a Consumer).
                  // Or it may be because it's older React where they're the same thing.
                  // We only want to warn if we're sure it's a new React.
                  if (reactContext !== reactContext.Consumer) {
                    if (!hasWarnedAboutUsingContextAsConsumer) {
                      hasWarnedAboutUsingContextAsConsumer = true;

                      error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
                    }
                  }
                } else {
                  reactContext = reactContext._context;
                }
              }

              var _nextProps = nextChild.props;
              var threadID = this.threadID;
              validateContextBounds(reactContext, threadID);
              var nextValue = reactContext[threadID];

              var _nextChildren7 = toArray(_nextProps.children(nextValue));

              var _frame7 = {
                type: nextChild,
                domNamespace: parentNamespace,
                children: _nextChildren7,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame7.debugElementStack = [];
              }

              this.stack.push(_frame7);
              return '';
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_FUNDAMENTAL_TYPE:
            {

              {
                {
                  throw Error( "ReactDOMServer does not yet support the fundamental API." );
                }
              }
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_LAZY_TYPE:
            {
              var _element2 = nextChild;
              var lazyComponent = nextChild.type; // Attempt to initialize lazy component regardless of whether the
              // suspense server-side renderer is enabled so synchronously
              // resolved constructors are supported.

              initializeLazyComponentType(lazyComponent);

              switch (lazyComponent._status) {
                case Resolved:
                  {
                    var _nextChildren9 = [React.createElement(lazyComponent._result, _assign({
                      ref: _element2.ref
                    }, _element2.props))];
                    var _frame9 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren9,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };

                    {
                      _frame9.debugElementStack = [];
                    }

                    this.stack.push(_frame9);
                    return '';
                  }

                case Rejected:
                  throw lazyComponent._result;

                case Pending:
                default:
                  {
                    {
                      throw Error( "ReactDOMServer does not yet support lazy-loaded components." );
                    }
                  }

              }
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_SCOPE_TYPE:
            {

              {
                {
                  throw Error( "ReactDOMServer does not yet support scope components." );
                }
              }
            }
        }
      }

      var info = '';

      {
        var owner = nextElement._owner;

        if (elementType === undefined || typeof elementType === 'object' && elementType !== null && Object.keys(elementType).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
        }

        var ownerName = owner ? getComponentName(owner) : null;

        if (ownerName) {
          info += '\n\nCheck the render method of `' + ownerName + '`.';
        }
      }

      {
        {
          throw Error( "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info );
        }
      }
    }
  };

  _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
    var tag = element.type.toLowerCase();
    var namespace = parentNamespace;

    if (parentNamespace === Namespaces.html) {
      namespace = getIntrinsicNamespace(tag);
    }

    {
      if (namespace === Namespaces.html) {
        // Should this check be gated by parent namespace? Not sure we want to
        // allow <SVG> or <mATH>.
        if (tag !== element.type) {
          error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', element.type);
        }
      }
    }

    validateDangerousTag(tag);
    var props = element.props;

    if (tag === 'input') {
      {
        ReactControlledValuePropTypes.checkPropTypes('input', props);

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
          error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);

          didWarnDefaultChecked = true;
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
          error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);

          didWarnDefaultInputValue = true;
        }
      }

      props = _assign({
        type: undefined
      }, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: props.value != null ? props.value : props.defaultValue,
        checked: props.checked != null ? props.checked : props.defaultChecked
      });
    } else if (tag === 'textarea') {
      {
        ReactControlledValuePropTypes.checkPropTypes('textarea', props);

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
          error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

          didWarnDefaultTextareaValue = true;
        }
      }

      var initialValue = props.value;

      if (initialValue == null) {
        var defaultValue = props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.

        var textareaChildren = props.children;

        if (textareaChildren != null) {
          {
            error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }

          if (!(defaultValue == null)) {
            {
              throw Error( "If you supply `defaultValue` on a <textarea>, do not pass children." );
            }
          }

          if (Array.isArray(textareaChildren)) {
            if (!(textareaChildren.length <= 1)) {
              {
                throw Error( "<textarea> can only have at most one child." );
              }
            }

            textareaChildren = textareaChildren[0];
          }

          defaultValue = '' + textareaChildren;
        }

        if (defaultValue == null) {
          defaultValue = '';
        }

        initialValue = defaultValue;
      }

      props = _assign({}, props, {
        value: undefined,
        children: '' + initialValue
      });
    } else if (tag === 'select') {
      {
        ReactControlledValuePropTypes.checkPropTypes('select', props);

        for (var i = 0; i < valuePropNames.length; i++) {
          var propName = valuePropNames[i];

          if (props[propName] == null) {
            continue;
          }

          var isArray = Array.isArray(props[propName]);

          if (props.multiple && !isArray) {
            error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
          } else if (!props.multiple && isArray) {
            error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
          }
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
          error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

          didWarnDefaultSelectValue = true;
        }
      }

      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
      props = _assign({}, props, {
        value: undefined
      });
    } else if (tag === 'option') {
      var selected = null;
      var selectValue = this.currentSelectValue;
      var optionChildren = flattenOptionChildren(props.children);

      if (selectValue != null) {
        var value;

        if (props.value != null) {
          value = props.value + '';
        } else {
          value = optionChildren;
        }

        selected = false;

        if (Array.isArray(selectValue)) {
          // multiple
          for (var j = 0; j < selectValue.length; j++) {
            if ('' + selectValue[j] === value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === value;
        }

        props = _assign({
          selected: undefined,
          children: undefined
        }, props, {
          selected: selected,
          children: optionChildren
        });
      }
    }

    {
      validatePropertiesInDevelopment(tag, props);
    }

    assertValidProps(tag, props);
    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
    var footer = '';

    if (omittedCloseTags.hasOwnProperty(tag)) {
      out += '/>';
    } else {
      out += '>';
      footer = '</' + element.type + '>';
    }

    var children;
    var innerMarkup = getNonChildrenInnerMarkup(props);

    if (innerMarkup != null) {
      children = [];

      if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === '\n') {
        // text/html ignores the first character in these tags if it's a newline
        // Prefer to break application/xml over text/html (for now) by adding
        // a newline specifically to get eaten by the parser. (Alternately for
        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
        // \r is normalized out by HTMLTextAreaElement#value.)
        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
        // See: Parsing of "textarea" "listing" and "pre" elements
        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
        out += '\n';
      }

      out += innerMarkup;
    } else {
      children = toArray(props.children);
    }

    var frame = {
      domNamespace: getChildNamespace(parentNamespace, element.type),
      type: tag,
      children: children,
      childIndex: 0,
      context: context,
      footer: footer
    };

    {
      frame.debugElementStack = [];
    }

    this.stack.push(frame);
    this.previousWasTextNode = false;
    return out;
  };

  return ReactDOMServerRenderer;
}();

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
 */

function renderToString(element) {
  var renderer = new ReactDOMServerRenderer(element, false);

  try {
    var markup = renderer.read(Infinity);
    return markup;
  } finally {
    renderer.destroy();
  }
}
/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
 */

function renderToStaticMarkup(element) {
  var renderer = new ReactDOMServerRenderer(element, true);

  try {
    var markup = renderer.read(Infinity);
    return markup;
  } finally {
    renderer.destroy();
  }
}

function renderToNodeStream() {
  {
    {
      throw Error( "ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead." );
    }
  }
}

function renderToStaticNodeStream() {
  {
    {
      throw Error( "ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead." );
    }
  }
} // Note: when changing this, also consider https://github.com/facebook/react/issues/11526


var ReactDOMServer = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
  version: ReactVersion
};

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest


var server_browser = ReactDOMServer.default || ReactDOMServer;

module.exports = server_browser;
  })();
}


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy41OTAwZDljNGU3YTI4ZWI1ZDc4MC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9janMvcmVhY3QtZG9tLXNlcnZlci5icm93c2VyLmRldmVsb3BtZW50LmpzP2IyODViYjAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xNC4wXG4gKiByZWFjdC1kb20tc2VydmVyLmJyb3dzZXIuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xuXG4vLyBEbyBub3QgcmVxdWlyZSB0aGlzIG1vZHVsZSBkaXJlY3RseSEgVXNlIG5vcm1hbCBgaW52YXJpYW50YCBjYWxscyB3aXRoXG4vLyB0ZW1wbGF0ZSBsaXRlcmFsIHN0cmluZ3MuIFRoZSBtZXNzYWdlcyB3aWxsIGJlIHJlcGxhY2VkIHdpdGggZXJyb3IgY29kZXNcbi8vIGR1cmluZyBidWlsZC5cbmZ1bmN0aW9uIGZvcm1hdFByb2RFcnJvck1lc3NhZ2UoY29kZSkge1xuICB2YXIgdXJsID0gJ2h0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PScgKyBjb2RlO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdXJsICs9ICcmYXJnc1tdPScgKyBlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW2ldKTtcbiAgfVxuXG4gIHJldHVybiBcIk1pbmlmaWVkIFJlYWN0IGVycm9yICNcIiArIGNvZGUgKyBcIjsgdmlzaXQgXCIgKyB1cmwgKyBcIiBmb3IgdGhlIGZ1bGwgbWVzc2FnZSBvciBcIiArICd1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsICcgKyAnaGVscGZ1bCB3YXJuaW5ncy4nO1xufVxuXG52YXIgUmVhY3RWZXJzaW9uID0gJzE2LjE0LjAnO1xuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSBSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDsgLy8gUHJldmVudCBuZXdlciByZW5kZXJlcnMgZnJvbSBSVEUgd2hlbiB1c2VkIHdpdGggb2xkZXIgcmVhY3QgcGFja2FnZSB2ZXJzaW9ucy5cbi8vIEN1cnJlbnQgb3duZXIgYW5kIGRpc3BhdGNoZXIgdXNlZCB0byBzaGFyZSB0aGUgc2FtZSByZWYsXG4vLyBidXQgUFIgIzE0NTQ4IHNwbGl0IHRoZW0gb3V0IHRvIGJldHRlciBzdXBwb3J0IHRoZSByZWFjdC1kZWJ1Zy10b29scyBwYWNrYWdlLlxuXG5pZiAoIVJlYWN0U2hhcmVkSW50ZXJuYWxzLmhhc093blByb3BlcnR5KCdSZWFjdEN1cnJlbnREaXNwYXRjaGVyJykpIHtcbiAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG59XG5cbmlmICghUmVhY3RTaGFyZWRJbnRlcm5hbHMuaGFzT3duUHJvcGVydHkoJ1JlYWN0Q3VycmVudEJhdGNoQ29uZmlnJykpIHtcbiAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50QmF0Y2hDb25maWcgPSB7XG4gICAgc3VzcGVuc2U6IG51bGxcbiAgfTtcbn1cblxuLy8gYnkgY2FsbHMgdG8gdGhlc2UgbWV0aG9kcyBieSBhIEJhYmVsIHBsdWdpbi5cbi8vXG4vLyBJbiBQUk9EIChvciBpbiBwYWNrYWdlcyB3aXRob3V0IGFjY2VzcyB0byBSZWFjdCBpbnRlcm5hbHMpLFxuLy8gdGhleSBhcmUgbGVmdCBhcyB0aGV5IGFyZSBpbnN0ZWFkLlxuXG5mdW5jdGlvbiB3YXJuKGZvcm1hdCkge1xuICB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcHJpbnRXYXJuaW5nKCd3YXJuJywgZm9ybWF0LCBhcmdzKTtcbiAgfVxufVxuZnVuY3Rpb24gZXJyb3IoZm9ybWF0KSB7XG4gIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgaGFzRXhpc3RpbmdTdGFjayA9IGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnc3RyaW5nJyAmJiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0uaW5kZXhPZignXFxuICAgIGluJykgPT09IDA7XG5cbiAgICBpZiAoIWhhc0V4aXN0aW5nU3RhY2spIHtcbiAgICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoW3N0YWNrXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFyZ3NXaXRoRm9ybWF0ID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiAnJyArIGl0ZW07XG4gICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTsgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAvLyBicmVha3MgSUU5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZVtsZXZlbF0sIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcblxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cbn1cblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpIDogMHhlYWQ4O1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG52YXIgUkVBQ1RfQkxPQ0tfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmJsb2NrJykgOiAweGVhZDk7XG52YXIgUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZ1bmRhbWVudGFsJykgOiAweGVhZDU7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbnZhciBVbmluaXRpYWxpemVkID0gLTE7XG52YXIgUGVuZGluZyA9IDA7XG52YXIgUmVzb2x2ZWQgPSAxO1xudmFyIFJlamVjdGVkID0gMjtcbmZ1bmN0aW9uIHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudChsYXp5Q29tcG9uZW50KSB7XG4gIHJldHVybiBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPT09IFJlc29sdmVkID8gbGF6eUNvbXBvbmVudC5fcmVzdWx0IDogbnVsbDtcbn1cbmZ1bmN0aW9uIGluaXRpYWxpemVMYXp5Q29tcG9uZW50VHlwZShsYXp5Q29tcG9uZW50KSB7XG4gIGlmIChsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPT09IFVuaW5pdGlhbGl6ZWQpIHtcbiAgICBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPSBQZW5kaW5nO1xuICAgIHZhciBjdG9yID0gbGF6eUNvbXBvbmVudC5fY3RvcjtcbiAgICB2YXIgdGhlbmFibGUgPSBjdG9yKCk7XG4gICAgbGF6eUNvbXBvbmVudC5fcmVzdWx0ID0gdGhlbmFibGU7XG4gICAgdGhlbmFibGUudGhlbihmdW5jdGlvbiAobW9kdWxlT2JqZWN0KSB7XG4gICAgICBpZiAobGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBQZW5kaW5nKSB7XG4gICAgICAgIHZhciBkZWZhdWx0RXhwb3J0ID0gbW9kdWxlT2JqZWN0LmRlZmF1bHQ7XG5cbiAgICAgICAge1xuICAgICAgICAgIGlmIChkZWZhdWx0RXhwb3J0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVycm9yKCdsYXp5OiBFeHBlY3RlZCB0aGUgcmVzdWx0IG9mIGEgZHluYW1pYyBpbXBvcnQoKSBjYWxsLiAnICsgJ0luc3RlYWQgcmVjZWl2ZWQ6ICVzXFxuXFxuWW91ciBjb2RlIHNob3VsZCBsb29rIGxpa2U6IFxcbiAgJyArIFwiY29uc3QgTXlDb21wb25lbnQgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9NeUNvbXBvbmVudCcpKVwiLCBtb2R1bGVPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxhenlDb21wb25lbnQuX3N0YXR1cyA9IFJlc29sdmVkO1xuICAgICAgICBsYXp5Q29tcG9uZW50Ll9yZXN1bHQgPSBkZWZhdWx0RXhwb3J0O1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGxhenlDb21wb25lbnQuX3N0YXR1cyA9PT0gUGVuZGluZykge1xuICAgICAgICBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPSBSZWplY3RlZDtcbiAgICAgICAgbGF6eUNvbXBvbmVudC5fcmVzdWx0ID0gZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBvdXRlclR5cGUuZGlzcGxheU5hbWUgfHwgKGZ1bmN0aW9uTmFtZSAhPT0gJycgPyB3cmFwcGVyTmFtZSArIFwiKFwiICsgZnVuY3Rpb25OYW1lICsgXCIpXCIgOiB3cmFwcGVyTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB7XG4gICAgaWYgKHR5cGVvZiB0eXBlLnRhZyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG5cbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuIFwiUHJvZmlsZXJcIjtcblxuICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnU3RyaWN0TW9kZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgIHJldHVybiAnQ29udGV4dC5Db25zdW1lcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LlByb3ZpZGVyJztcblxuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0V3JhcHBlZE5hbWUodHlwZSwgdHlwZS5yZW5kZXIsICdGb3J3YXJkUmVmJyk7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZSh0eXBlLnR5cGUpO1xuXG4gICAgICBjYXNlIFJFQUNUX0JMT0NLX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHR5cGUucmVuZGVyKTtcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgdGhlbmFibGUgPSB0eXBlO1xuICAgICAgICAgIHZhciByZXNvbHZlZFRoZW5hYmxlID0gcmVmaW5lUmVzb2x2ZWRMYXp5Q29tcG9uZW50KHRoZW5hYmxlKTtcblxuICAgICAgICAgIGlmIChyZXNvbHZlZFRoZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZShyZXNvbHZlZFRoZW5hYmxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgQkVGT1JFX1NMQVNIX1JFID0gL14oLiopW1xcXFxcXC9dLztcbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUgKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHZhciBzb3VyY2VJbmZvID0gJyc7XG5cbiAgaWYgKHNvdXJjZSkge1xuICAgIHZhciBwYXRoID0gc291cmNlLmZpbGVOYW1lO1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGgucmVwbGFjZShCRUZPUkVfU0xBU0hfUkUsICcnKTtcblxuICAgIHtcbiAgICAgIC8vIEluIERFViwgaW5jbHVkZSBjb2RlIGZvciBhIGNvbW1vbiBzcGVjaWFsIGNhc2U6XG4gICAgICAvLyBwcmVmZXIgXCJmb2xkZXIvaW5kZXguanNcIiBpbnN0ZWFkIG9mIGp1c3QgXCJpbmRleC5qc1wiLlxuICAgICAgaWYgKC9eaW5kZXhcXC4vLnRlc3QoZmlsZU5hbWUpKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2goQkVGT1JFX1NMQVNIX1JFKTtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICB2YXIgcGF0aEJlZm9yZVNsYXNoID0gbWF0Y2hbMV07XG5cbiAgICAgICAgICBpZiAocGF0aEJlZm9yZVNsYXNoKSB7XG4gICAgICAgICAgICB2YXIgZm9sZGVyTmFtZSA9IHBhdGhCZWZvcmVTbGFzaC5yZXBsYWNlKEJFRk9SRV9TTEFTSF9SRSwgJycpO1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBmb2xkZXJOYW1lICsgJy8nICsgZmlsZU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc291cmNlSW5mbyA9ICcgKGF0ICcgKyBmaWxlTmFtZSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknO1xuICB9IGVsc2UgaWYgKG93bmVyTmFtZSkge1xuICAgIHNvdXJjZUluZm8gPSAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKSc7XG4gIH1cblxuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIHNvdXJjZUluZm87XG59XG5cbnZhciBlbmFibGVTdXNwZW5zZVNlcnZlclJlbmRlcmVyID0gZmFsc2U7XG5cbnZhciBlbmFibGVEZXByZWNhdGVkRmxhcmVBUEkgPSBmYWxzZTsgLy8gRXhwZXJpbWVudGFsIEhvc3QgQ29tcG9uZW50IHN1cHBvcnQuXG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lO1xudmFyIGRpZFdhcm5BYm91dEludmFsaWRhdGVDb250ZXh0VHlwZTtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgZGlkV2FybkFib3V0SW52YWxpZGF0ZUNvbnRleHRUeXBlID0gbmV3IFNldCgpO1xufVxuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxue1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gbWFza0NvbnRleHQodHlwZSwgY29udGV4dCkge1xuICB2YXIgY29udGV4dFR5cGVzID0gdHlwZS5jb250ZXh0VHlwZXM7XG5cbiAgaWYgKCFjb250ZXh0VHlwZXMpIHtcbiAgICByZXR1cm4gZW1wdHlPYmplY3Q7XG4gIH1cblxuICB2YXIgbWFza2VkQ29udGV4dCA9IHt9O1xuXG4gIGZvciAodmFyIGNvbnRleHROYW1lIGluIGNvbnRleHRUeXBlcykge1xuICAgIG1hc2tlZENvbnRleHRbY29udGV4dE5hbWVdID0gY29udGV4dFtjb250ZXh0TmFtZV07XG4gIH1cblxuICByZXR1cm4gbWFza2VkQ29udGV4dDtcbn1cblxuZnVuY3Rpb24gY2hlY2tDb250ZXh0VHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uKSB7XG4gIHtcbiAgICBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sICdDb21wb25lbnQnLCBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb250ZXh0Qm91bmRzKGNvbnRleHQsIHRocmVhZElEKSB7XG4gIC8vIElmIHdlIGRvbid0IGhhdmUgZW5vdWdoIHNsb3RzIGluIHRoaXMgY29udGV4dCB0byBzdG9yZSB0aGlzIHRocmVhZElELFxuICAvLyBmaWxsIGl0IGluIHdpdGhvdXQgbGVhdmluZyBhbnkgaG9sZXMgdG8gZW5zdXJlIHRoYXQgdGhlIFZNIG9wdGltaXplc1xuICAvLyB0aGlzIGFzIG5vbi1ob2xleSBpbmRleCBwcm9wZXJ0aWVzLlxuICAvLyAoTm90ZTogSWYgYHJlYWN0YCBwYWNrYWdlIGlzIDwgMTYuNiwgX3RocmVhZENvdW50IGlzIHVuZGVmaW5lZC4pXG4gIGZvciAodmFyIGkgPSBjb250ZXh0Ll90aHJlYWRDb3VudCB8IDA7IGkgPD0gdGhyZWFkSUQ7IGkrKykge1xuICAgIC8vIFdlIGFzc3VtZSB0aGF0IHRoaXMgaXMgdGhlIHNhbWUgYXMgdGhlIGRlZmF1bHRWYWx1ZSB3aGljaCBtaWdodCBub3QgYmVcbiAgICAvLyB0cnVlIGlmIHdlJ3JlIHJlbmRlcmluZyBpbnNpZGUgYSBzZWNvbmRhcnkgcmVuZGVyZXIgYnV0IHRoZXkgYXJlXG4gICAgLy8gc2Vjb25kYXJ5IGJlY2F1c2UgdGhlc2UgdXNlIGNhc2VzIGFyZSB2ZXJ5IHJhcmUuXG4gICAgY29udGV4dFtpXSA9IGNvbnRleHQuX2N1cnJlbnRWYWx1ZTI7XG4gICAgY29udGV4dC5fdGhyZWFkQ291bnQgPSBpICsgMTtcbiAgfVxufVxuZnVuY3Rpb24gcHJvY2Vzc0NvbnRleHQodHlwZSwgY29udGV4dCwgdGhyZWFkSUQsIGlzQ2xhc3MpIHtcbiAgaWYgKGlzQ2xhc3MpIHtcbiAgICB2YXIgY29udGV4dFR5cGUgPSB0eXBlLmNvbnRleHRUeXBlO1xuXG4gICAge1xuICAgICAgaWYgKCdjb250ZXh0VHlwZScgaW4gdHlwZSkge1xuICAgICAgICB2YXIgaXNWYWxpZCA9IC8vIEFsbG93IG51bGwgZm9yIGNvbmRpdGlvbmFsIGRlY2xhcmF0aW9uXG4gICAgICAgIGNvbnRleHRUeXBlID09PSBudWxsIHx8IGNvbnRleHRUeXBlICE9PSB1bmRlZmluZWQgJiYgY29udGV4dFR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSAmJiBjb250ZXh0VHlwZS5fY29udGV4dCA9PT0gdW5kZWZpbmVkOyAvLyBOb3QgYSA8Q29udGV4dC5Db25zdW1lcj5cblxuICAgICAgICBpZiAoIWlzVmFsaWQgJiYgIWRpZFdhcm5BYm91dEludmFsaWRhdGVDb250ZXh0VHlwZS5oYXModHlwZSkpIHtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRJbnZhbGlkYXRlQ29udGV4dFR5cGUuYWRkKHR5cGUpO1xuICAgICAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHRUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtID0gJyBIb3dldmVyLCBpdCBpcyBzZXQgdG8gdW5kZWZpbmVkLiAnICsgJ1RoaXMgY2FuIGJlIGNhdXNlZCBieSBhIHR5cG8gb3IgYnkgbWl4aW5nIHVwIG5hbWVkIGFuZCBkZWZhdWx0IGltcG9ydHMuICcgKyAnVGhpcyBjYW4gYWxzbyBoYXBwZW4gZHVlIHRvIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSwgc28gJyArICd0cnkgbW92aW5nIHRoZSBjcmVhdGVDb250ZXh0KCkgY2FsbCB0byBhIHNlcGFyYXRlIGZpbGUuJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZXh0VHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtID0gJyBIb3dldmVyLCBpdCBpcyBzZXQgdG8gYSAnICsgdHlwZW9mIGNvbnRleHRUeXBlICsgJy4nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dFR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIHRoZSBDb250ZXh0LlByb3ZpZGVyIGluc3RlYWQ/JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHRUeXBlLl9jb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIDxDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgICAgYWRkZW5kdW0gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgdGhlIENvbnRleHQuQ29uc3VtZXIgaW5zdGVhZD8nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRlbmR1bSA9ICcgSG93ZXZlciwgaXQgaXMgc2V0IHRvIGFuIG9iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjb250ZXh0VHlwZSkuam9pbignLCAnKSArICd9Lic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3IoJyVzIGRlZmluZXMgYW4gaW52YWxpZCBjb250ZXh0VHlwZS4gJyArICdjb250ZXh0VHlwZSBzaG91bGQgcG9pbnQgdG8gdGhlIENvbnRleHQgb2JqZWN0IHJldHVybmVkIGJ5IFJlYWN0LmNyZWF0ZUNvbnRleHQoKS4lcycsIGdldENvbXBvbmVudE5hbWUodHlwZSkgfHwgJ0NvbXBvbmVudCcsIGFkZGVuZHVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29udGV4dFR5cGUgPT09ICdvYmplY3QnICYmIGNvbnRleHRUeXBlICE9PSBudWxsKSB7XG4gICAgICB2YWxpZGF0ZUNvbnRleHRCb3VuZHMoY29udGV4dFR5cGUsIHRocmVhZElEKTtcbiAgICAgIHJldHVybiBjb250ZXh0VHlwZVt0aHJlYWRJRF07XG4gICAgfVxuXG4gICAge1xuICAgICAgdmFyIG1hc2tlZENvbnRleHQgPSBtYXNrQ29udGV4dCh0eXBlLCBjb250ZXh0KTtcblxuICAgICAge1xuICAgICAgICBpZiAodHlwZS5jb250ZXh0VHlwZXMpIHtcbiAgICAgICAgICBjaGVja0NvbnRleHRUeXBlcyh0eXBlLmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgJ2NvbnRleHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAge1xuICAgICAgdmFyIF9tYXNrZWRDb250ZXh0ID0gbWFza0NvbnRleHQodHlwZSwgY29udGV4dCk7XG5cbiAgICAgIHtcbiAgICAgICAgaWYgKHR5cGUuY29udGV4dFR5cGVzKSB7XG4gICAgICAgICAgY2hlY2tDb250ZXh0VHlwZXModHlwZS5jb250ZXh0VHlwZXMsIF9tYXNrZWRDb250ZXh0LCAnY29udGV4dCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfbWFza2VkQ29udGV4dDtcbiAgICB9XG4gIH1cbn1cblxudmFyIG5leHRBdmFpbGFibGVUaHJlYWRJRHMgPSBuZXcgVWludDE2QXJyYXkoMTYpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1tpXSA9IGkgKyAxO1xufVxuXG5uZXh0QXZhaWxhYmxlVGhyZWFkSURzWzE1XSA9IDA7XG5cbmZ1bmN0aW9uIGdyb3dUaHJlYWRDb3VudEFuZFJldHVybk5leHRBdmFpbGFibGUoKSB7XG4gIHZhciBvbGRBcnJheSA9IG5leHRBdmFpbGFibGVUaHJlYWRJRHM7XG4gIHZhciBvbGRTaXplID0gb2xkQXJyYXkubGVuZ3RoO1xuICB2YXIgbmV3U2l6ZSA9IG9sZFNpemUgKiAyO1xuXG4gIGlmICghKG5ld1NpemUgPD0gMHgxMDAwMCkpIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJNYXhpbXVtIG51bWJlciBvZiBjb25jdXJyZW50IFJlYWN0IHJlbmRlcmVycyBleGNlZWRlZC4gVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSBhcmUgbm90IHByb3Blcmx5IGRlc3Ryb3lpbmcgdGhlIFJlYWRhYmxlIHByb3ZpZGVkIGJ5IFJlYWN0LiBFbnN1cmUgdGhhdCB5b3UgY2FsbCAuZGVzdHJveSgpIG9uIGl0IGlmIHlvdSBubyBsb25nZXIgd2FudCB0byByZWFkIGZyb20gaXQsIGFuZCBkaWQgbm90IHJlYWQgdG8gdGhlIGVuZC4gSWYgeW91IHVzZSAucGlwZSgpIHRoaXMgc2hvdWxkIGJlIGF1dG9tYXRpYy5cIiApO1xuICAgIH1cbiAgfVxuXG4gIHZhciBuZXdBcnJheSA9IG5ldyBVaW50MTZBcnJheShuZXdTaXplKTtcbiAgbmV3QXJyYXkuc2V0KG9sZEFycmF5KTtcbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEcyA9IG5ld0FycmF5O1xuICBuZXh0QXZhaWxhYmxlVGhyZWFkSURzWzBdID0gb2xkU2l6ZSArIDE7XG5cbiAgZm9yICh2YXIgX2kgPSBvbGRTaXplOyBfaSA8IG5ld1NpemUgLSAxOyBfaSsrKSB7XG4gICAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1tfaV0gPSBfaSArIDE7XG4gIH1cblxuICBuZXh0QXZhaWxhYmxlVGhyZWFkSURzW25ld1NpemUgLSAxXSA9IDA7XG4gIHJldHVybiBvbGRTaXplO1xufVxuXG5mdW5jdGlvbiBhbGxvY1RocmVhZElEKCkge1xuICB2YXIgbmV4dElEID0gbmV4dEF2YWlsYWJsZVRocmVhZElEc1swXTtcblxuICBpZiAobmV4dElEID09PSAwKSB7XG4gICAgcmV0dXJuIGdyb3dUaHJlYWRDb3VudEFuZFJldHVybk5leHRBdmFpbGFibGUoKTtcbiAgfVxuXG4gIG5leHRBdmFpbGFibGVUaHJlYWRJRHNbMF0gPSBuZXh0QXZhaWxhYmxlVGhyZWFkSURzW25leHRJRF07XG4gIHJldHVybiBuZXh0SUQ7XG59XG5mdW5jdGlvbiBmcmVlVGhyZWFkSUQoaWQpIHtcbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1tpZF0gPSBuZXh0QXZhaWxhYmxlVGhyZWFkSURzWzBdO1xuICBuZXh0QXZhaWxhYmxlVGhyZWFkSURzWzBdID0gaWQ7XG59XG5cbi8vIEEgcmVzZXJ2ZWQgYXR0cmlidXRlLlxuLy8gSXQgaXMgaGFuZGxlZCBieSBSZWFjdCBzZXBhcmF0ZWx5IGFuZCBzaG91bGRuJ3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxudmFyIFJFU0VSVkVEID0gMDsgLy8gQSBzaW1wbGUgc3RyaW5nIGF0dHJpYnV0ZS5cbi8vIEF0dHJpYnV0ZXMgdGhhdCBhcmVuJ3QgaW4gdGhlIHdoaXRlbGlzdCBhcmUgcHJlc3VtZWQgdG8gaGF2ZSB0aGlzIHR5cGUuXG5cbnZhciBTVFJJTkcgPSAxOyAvLyBBIHN0cmluZyBhdHRyaWJ1dGUgdGhhdCBhY2NlcHRzIGJvb2xlYW5zIGluIFJlYWN0LiBJbiBIVE1MLCB0aGVzZSBhcmUgY2FsbGVkXG4vLyBcImVudW1lcmF0ZWRcIiBhdHRyaWJ1dGVzIHdpdGggXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIiBhcyBwb3NzaWJsZSB2YWx1ZXMuXG4vLyBXaGVuIHRydWUsIGl0IHNob3VsZCBiZSBzZXQgdG8gYSBcInRydWVcIiBzdHJpbmcuXG4vLyBXaGVuIGZhbHNlLCBpdCBzaG91bGQgYmUgc2V0IHRvIGEgXCJmYWxzZVwiIHN0cmluZy5cblxudmFyIEJPT0xFQU5JU0hfU1RSSU5HID0gMjsgLy8gQSByZWFsIGJvb2xlYW4gYXR0cmlidXRlLlxuLy8gV2hlbiB0cnVlLCBpdCBzaG91bGQgYmUgcHJlc2VudCAoc2V0IGVpdGhlciB0byBhbiBlbXB0eSBzdHJpbmcgb3IgaXRzIG5hbWUpLlxuLy8gV2hlbiBmYWxzZSwgaXQgc2hvdWxkIGJlIG9taXR0ZWQuXG5cbnZhciBCT09MRUFOID0gMzsgLy8gQW4gYXR0cmlidXRlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBmbGFnIGFzIHdlbGwgYXMgd2l0aCBhIHZhbHVlLlxuLy8gV2hlbiB0cnVlLCBpdCBzaG91bGQgYmUgcHJlc2VudCAoc2V0IGVpdGhlciB0byBhbiBlbXB0eSBzdHJpbmcgb3IgaXRzIG5hbWUpLlxuLy8gV2hlbiBmYWxzZSwgaXQgc2hvdWxkIGJlIG9taXR0ZWQuXG4vLyBGb3IgYW55IG90aGVyIHZhbHVlLCBzaG91bGQgYmUgcHJlc2VudCB3aXRoIHRoYXQgdmFsdWUuXG5cbnZhciBPVkVSTE9BREVEX0JPT0xFQU4gPSA0OyAvLyBBbiBhdHRyaWJ1dGUgdGhhdCBtdXN0IGJlIG51bWVyaWMgb3IgcGFyc2UgYXMgYSBudW1lcmljLlxuLy8gV2hlbiBmYWxzeSwgaXQgc2hvdWxkIGJlIHJlbW92ZWQuXG5cbnZhciBOVU1FUklDID0gNTsgLy8gQW4gYXR0cmlidXRlIHRoYXQgbXVzdCBiZSBwb3NpdGl2ZSBudW1lcmljIG9yIHBhcnNlIGFzIGEgcG9zaXRpdmUgbnVtZXJpYy5cbi8vIFdoZW4gZmFsc3ksIGl0IHNob3VsZCBiZSByZW1vdmVkLlxuXG52YXIgUE9TSVRJVkVfTlVNRVJJQyA9IDY7XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbnZhciBBVFRSSUJVVEVfTkFNRV9TVEFSVF9DSEFSID0gXCI6QS1aX2EtelxcXFx1MDBDMC1cXFxcdTAwRDZcXFxcdTAwRDgtXFxcXHUwMEY2XFxcXHUwMEY4LVxcXFx1MDJGRlxcXFx1MDM3MC1cXFxcdTAzN0RcXFxcdTAzN0YtXFxcXHUxRkZGXFxcXHUyMDBDLVxcXFx1MjAwRFxcXFx1MjA3MC1cXFxcdTIxOEZcXFxcdTJDMDAtXFxcXHUyRkVGXFxcXHUzMDAxLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkZEXCI7XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxudmFyIEFUVFJJQlVURV9OQU1FX0NIQVIgPSBBVFRSSUJVVEVfTkFNRV9TVEFSVF9DSEFSICsgXCJcXFxcLS4wLTlcXFxcdTAwQjdcXFxcdTAzMDAtXFxcXHUwMzZGXFxcXHUyMDNGLVxcXFx1MjA0MFwiO1xudmFyIFJPT1RfQVRUUklCVVRFX05BTUUgPSAnZGF0YS1yZWFjdHJvb3QnO1xudmFyIFZBTElEX0FUVFJJQlVURV9OQU1FX1JFR0VYID0gbmV3IFJlZ0V4cCgnXlsnICsgQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiArICddWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpbGxlZ2FsQXR0cmlidXRlTmFtZUNhY2hlID0ge307XG52YXIgdmFsaWRhdGVkQXR0cmlidXRlTmFtZUNhY2hlID0ge307XG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWVTYWZlKGF0dHJpYnV0ZU5hbWUpIHtcbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwodmFsaWRhdGVkQXR0cmlidXRlTmFtZUNhY2hlLCBhdHRyaWJ1dGVOYW1lKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoaWxsZWdhbEF0dHJpYnV0ZU5hbWVDYWNoZSwgYXR0cmlidXRlTmFtZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoVkFMSURfQVRUUklCVVRFX05BTUVfUkVHRVgudGVzdChhdHRyaWJ1dGVOYW1lKSkge1xuICAgIHZhbGlkYXRlZEF0dHJpYnV0ZU5hbWVDYWNoZVthdHRyaWJ1dGVOYW1lXSA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpbGxlZ2FsQXR0cmlidXRlTmFtZUNhY2hlW2F0dHJpYnV0ZU5hbWVdID0gdHJ1ZTtcblxuICB7XG4gICAgZXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIG5hbWU6IGAlc2AnLCBhdHRyaWJ1dGVOYW1lKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHNob3VsZElnbm9yZUF0dHJpYnV0ZShuYW1lLCBwcm9wZXJ0eUluZm8sIGlzQ3VzdG9tQ29tcG9uZW50VGFnKSB7XG4gIGlmIChwcm9wZXJ0eUluZm8gIT09IG51bGwpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJbmZvLnR5cGUgPT09IFJFU0VSVkVEO1xuICB9XG5cbiAgaWYgKGlzQ3VzdG9tQ29tcG9uZW50VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKG5hbWUubGVuZ3RoID4gMiAmJiAobmFtZVswXSA9PT0gJ28nIHx8IG5hbWVbMF0gPT09ICdPJykgJiYgKG5hbWVbMV0gPT09ICduJyB8fCBuYW1lWzFdID09PSAnTicpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBzaG91bGRSZW1vdmVBdHRyaWJ1dGVXaXRoV2FybmluZyhuYW1lLCB2YWx1ZSwgcHJvcGVydHlJbmZvLCBpc0N1c3RvbUNvbXBvbmVudFRhZykge1xuICBpZiAocHJvcGVydHlJbmZvICE9PSBudWxsICYmIHByb3BlcnR5SW5mby50eXBlID09PSBSRVNFUlZFRCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSAnZnVuY3Rpb24nOiAvLyAkRmxvd0lzc3VlIHN5bWJvbCBpcyBwZXJmZWN0bHkgdmFsaWQgaGVyZVxuXG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICB7XG4gICAgICAgIGlmIChpc0N1c3RvbUNvbXBvbmVudFRhZykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wZXJ0eUluZm8gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gIXByb3BlcnR5SW5mby5hY2NlcHRzQm9vbGVhbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZWZpeCA9IG5hbWUudG9Mb3dlckNhc2UoKS5zbGljZSgwLCA1KTtcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICE9PSAnZGF0YS0nICYmIHByZWZpeCAhPT0gJ2FyaWEtJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuZnVuY3Rpb24gc2hvdWxkUmVtb3ZlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBwcm9wZXJ0eUluZm8sIGlzQ3VzdG9tQ29tcG9uZW50VGFnKSB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoc2hvdWxkUmVtb3ZlQXR0cmlidXRlV2l0aFdhcm5pbmcobmFtZSwgdmFsdWUsIHByb3BlcnR5SW5mbywgaXNDdXN0b21Db21wb25lbnRUYWcpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoaXNDdXN0b21Db21wb25lbnRUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocHJvcGVydHlJbmZvICE9PSBudWxsKSB7XG4gICAgc3dpdGNoIChwcm9wZXJ0eUluZm8udHlwZSkge1xuICAgICAgY2FzZSBCT09MRUFOOlxuICAgICAgICByZXR1cm4gIXZhbHVlO1xuXG4gICAgICBjYXNlIE9WRVJMT0FERURfQk9PTEVBTjpcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBmYWxzZTtcblxuICAgICAgY2FzZSBOVU1FUklDOlxuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuXG4gICAgICBjYXNlIFBPU0lUSVZFX05VTUVSSUM6XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPCAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldFByb3BlcnR5SW5mbyhuYW1lKSB7XG4gIHJldHVybiBwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KG5hbWUpID8gcHJvcGVydGllc1tuYW1lXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCB0eXBlLCBtdXN0VXNlUHJvcGVydHksIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZU5hbWVzcGFjZSwgc2FuaXRpemVVUkwpIHtcbiAgdGhpcy5hY2NlcHRzQm9vbGVhbnMgPSB0eXBlID09PSBCT09MRUFOSVNIX1NUUklORyB8fCB0eXBlID09PSBCT09MRUFOIHx8IHR5cGUgPT09IE9WRVJMT0FERURfQk9PTEVBTjtcbiAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlTmFtZTtcbiAgdGhpcy5hdHRyaWJ1dGVOYW1lc3BhY2UgPSBhdHRyaWJ1dGVOYW1lc3BhY2U7XG4gIHRoaXMubXVzdFVzZVByb3BlcnR5ID0gbXVzdFVzZVByb3BlcnR5O1xuICB0aGlzLnByb3BlcnR5TmFtZSA9IG5hbWU7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG4gIHRoaXMuc2FuaXRpemVVUkwgPSBzYW5pdGl6ZVVSTDtcbn0gLy8gV2hlbiBhZGRpbmcgYXR0cmlidXRlcyB0byB0aGlzIGxpc3QsIGJlIHN1cmUgdG8gYWxzbyBhZGQgdGhlbSB0b1xuLy8gdGhlIGBwb3NzaWJsZVN0YW5kYXJkTmFtZXNgIG1vZHVsZSB0byBlbnN1cmUgY2FzaW5nIGFuZCBpbmNvcnJlY3Rcbi8vIG5hbWUgd2FybmluZ3MuXG5cblxudmFyIHByb3BlcnRpZXMgPSB7fTsgLy8gVGhlc2UgcHJvcHMgYXJlIHJlc2VydmVkIGJ5IFJlYWN0LiBUaGV5IHNob3VsZG4ndCBiZSB3cml0dGVuIHRvIHRoZSBET00uXG5cbnZhciByZXNlcnZlZFByb3BzID0gWydjaGlsZHJlbicsICdkYW5nZXJvdXNseVNldElubmVySFRNTCcsIC8vIFRPRE86IFRoaXMgcHJldmVudHMgdGhlIGFzc2lnbm1lbnQgb2YgZGVmYXVsdFZhbHVlIHRvIHJlZ3VsYXJcbi8vIGVsZW1lbnRzIChub3QganVzdCBpbnB1dHMpLiBOb3cgdGhhdCBSZWFjdERPTUlucHV0IGFzc2lnbnMgdG8gdGhlXG4vLyBkZWZhdWx0VmFsdWUgcHJvcGVydHkgLS0gZG8gd2UgbmVlZCB0aGlzP1xuJ2RlZmF1bHRWYWx1ZScsICdkZWZhdWx0Q2hlY2tlZCcsICdpbm5lckhUTUwnLCAnc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nJywgJ3N1cHByZXNzSHlkcmF0aW9uV2FybmluZycsICdzdHlsZSddO1xuXG5yZXNlcnZlZFByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgUkVTRVJWRUQsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIEEgZmV3IFJlYWN0IHN0cmluZyBhdHRyaWJ1dGVzIGhhdmUgYSBkaWZmZXJlbnQgbmFtZS5cbi8vIFRoaXMgaXMgYSBtYXBwaW5nIGZyb20gUmVhY3QgcHJvcCBuYW1lcyB0byB0aGUgYXR0cmlidXRlIG5hbWVzLlxuXG5bWydhY2NlcHRDaGFyc2V0JywgJ2FjY2VwdC1jaGFyc2V0J10sIFsnY2xhc3NOYW1lJywgJ2NsYXNzJ10sIFsnaHRtbEZvcicsICdmb3InXSwgWydodHRwRXF1aXYnLCAnaHR0cC1lcXVpdiddXS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBuYW1lID0gX3JlZlswXSxcbiAgICAgIGF0dHJpYnV0ZU5hbWUgPSBfcmVmWzFdO1xuICBwcm9wZXJ0aWVzW25hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCBTVFJJTkcsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgYXR0cmlidXRlTmFtZSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFRoZXNlIGFyZSBcImVudW1lcmF0ZWRcIiBIVE1MIGF0dHJpYnV0ZXMgdGhhdCBhY2NlcHQgXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIi5cbi8vIEluIFJlYWN0LCB3ZSBsZXQgdXNlcnMgcGFzcyBgdHJ1ZWAgYW5kIGBmYWxzZWAgZXZlbiB0aG91Z2ggdGVjaG5pY2FsbHlcbi8vIHRoZXNlIGFyZW4ndCBib29sZWFuIGF0dHJpYnV0ZXMgKHRoZXkgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncykuXG5cblsnY29udGVudEVkaXRhYmxlJywgJ2RyYWdnYWJsZScsICdzcGVsbENoZWNrJywgJ3ZhbHVlJ10uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICBwcm9wZXJ0aWVzW25hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCBCT09MRUFOSVNIX1NUUklORywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBuYW1lLnRvTG93ZXJDYXNlKCksIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgXCJlbnVtZXJhdGVkXCIgU1ZHIGF0dHJpYnV0ZXMgdGhhdCBhY2NlcHQgXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIi5cbi8vIEluIFJlYWN0LCB3ZSBsZXQgdXNlcnMgcGFzcyBgdHJ1ZWAgYW5kIGBmYWxzZWAgZXZlbiB0aG91Z2ggdGVjaG5pY2FsbHlcbi8vIHRoZXNlIGFyZW4ndCBib29sZWFuIGF0dHJpYnV0ZXMgKHRoZXkgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncykuXG4vLyBTaW5jZSB0aGVzZSBhcmUgU1ZHIGF0dHJpYnV0ZXMsIHRoZWlyIGF0dHJpYnV0ZSBuYW1lcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG5cblsnYXV0b1JldmVyc2UnLCAnZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCcsICdmb2N1c2FibGUnLCAncHJlc2VydmVBbHBoYSddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgQk9PTEVBTklTSF9TVFJJTkcsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFRoZXNlIGFyZSBIVE1MIGJvb2xlYW4gYXR0cmlidXRlcy5cblxuWydhbGxvd0Z1bGxTY3JlZW4nLCAnYXN5bmMnLCAvLyBOb3RlOiB0aGVyZSBpcyBhIHNwZWNpYWwgY2FzZSB0aGF0IHByZXZlbnRzIGl0IGZyb20gYmVpbmcgd3JpdHRlbiB0byB0aGUgRE9NXG4vLyBvbiB0aGUgY2xpZW50IHNpZGUgYmVjYXVzZSB0aGUgYnJvd3NlcnMgYXJlIGluY29uc2lzdGVudC4gSW5zdGVhZCB3ZSBjYWxsIGZvY3VzKCkuXG4nYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JywgJ2NvbnRyb2xzJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUnLCAnZm9ybU5vVmFsaWRhdGUnLCAnaGlkZGVuJywgJ2xvb3AnLCAnbm9Nb2R1bGUnLCAnbm9WYWxpZGF0ZScsICdvcGVuJywgJ3BsYXlzSW5saW5lJywgJ3JlYWRPbmx5JywgJ3JlcXVpcmVkJywgJ3JldmVyc2VkJywgJ3Njb3BlZCcsICdzZWFtbGVzcycsIC8vIE1pY3JvZGF0YVxuJ2l0ZW1TY29wZSddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgQk9PTEVBTiwgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBuYW1lLnRvTG93ZXJDYXNlKCksIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgdGhlIGZldyBSZWFjdCBwcm9wcyB0aGF0IHdlIHNldCBhcyBET00gcHJvcGVydGllc1xuLy8gcmF0aGVyIHRoYW4gYXR0cmlidXRlcy4gVGhlc2UgYXJlIGFsbCBib29sZWFucy5cblxuWydjaGVja2VkJywgLy8gTm90ZTogYG9wdGlvbi5zZWxlY3RlZGAgaXMgbm90IHVwZGF0ZWQgaWYgYHNlbGVjdC5tdWx0aXBsZWAgaXNcbi8vIGRpc2FibGVkIHdpdGggYHJlbW92ZUF0dHJpYnV0ZWAuIFdlIGhhdmUgc3BlY2lhbCBsb2dpYyBmb3IgaGFuZGxpbmcgdGhpcy5cbidtdWx0aXBsZScsICdtdXRlZCcsICdzZWxlY3RlZCcgLy8gTk9URTogaWYgeW91IGFkZCBhIGNhbWVsQ2FzZWQgcHJvcCB0byB0aGlzIGxpc3QsXG4vLyB5b3UnbGwgbmVlZCB0byBzZXQgYXR0cmlidXRlTmFtZSB0byBuYW1lLnRvTG93ZXJDYXNlKClcbi8vIGluc3RlYWQgaW4gdGhlIGFzc2lnbm1lbnQgYmVsb3cuXG5dLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgQk9PTEVBTiwgdHJ1ZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIG5hbWUsIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgSFRNTCBhdHRyaWJ1dGVzIHRoYXQgYXJlIFwib3ZlcmxvYWRlZCBib29sZWFuc1wiOiB0aGV5IGJlaGF2ZSBsaWtlXG4vLyBib29sZWFucywgYnV0IGNhbiBhbHNvIGFjY2VwdCBhIHN0cmluZyB2YWx1ZS5cblxuWydjYXB0dXJlJywgJ2Rvd25sb2FkJyAvLyBOT1RFOiBpZiB5b3UgYWRkIGEgY2FtZWxDYXNlZCBwcm9wIHRvIHRoaXMgbGlzdCxcbi8vIHlvdSdsbCBuZWVkIHRvIHNldCBhdHRyaWJ1dGVOYW1lIHRvIG5hbWUudG9Mb3dlckNhc2UoKVxuLy8gaW5zdGVhZCBpbiB0aGUgYXNzaWdubWVudCBiZWxvdy5cbl0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICBwcm9wZXJ0aWVzW25hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCBPVkVSTE9BREVEX0JPT0xFQU4sIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFRoZXNlIGFyZSBIVE1MIGF0dHJpYnV0ZXMgdGhhdCBtdXN0IGJlIHBvc2l0aXZlIG51bWJlcnMuXG5cblsnY29scycsICdyb3dzJywgJ3NpemUnLCAnc3BhbicgLy8gTk9URTogaWYgeW91IGFkZCBhIGNhbWVsQ2FzZWQgcHJvcCB0byB0aGlzIGxpc3QsXG4vLyB5b3UnbGwgbmVlZCB0byBzZXQgYXR0cmlidXRlTmFtZSB0byBuYW1lLnRvTG93ZXJDYXNlKClcbi8vIGluc3RlYWQgaW4gdGhlIGFzc2lnbm1lbnQgYmVsb3cuXG5dLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgUE9TSVRJVkVfTlVNRVJJQywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBuYW1lLCAvLyBhdHRyaWJ1dGVOYW1lXG4gIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICBmYWxzZSk7XG59KTsgLy8gVGhlc2UgYXJlIEhUTUwgYXR0cmlidXRlcyB0aGF0IG11c3QgYmUgbnVtYmVycy5cblxuWydyb3dTcGFuJywgJ3N0YXJ0J10uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICBwcm9wZXJ0aWVzW25hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCBOVU1FUklDLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIG5hbWUudG9Mb3dlckNhc2UoKSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7XG52YXIgQ0FNRUxJWkUgPSAvW1xcLVxcOl0oW2Etel0pL2c7XG5cbnZhciBjYXBpdGFsaXplID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlblsxXS50b1VwcGVyQ2FzZSgpO1xufTsgLy8gVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIFNWRyBhdHRyaWJ1dGVzIHRoYXQgbmVlZCBzcGVjaWFsIGNhc2luZywgbmFtZXNwYWNpbmcsXG4vLyBvciBib29sZWFuIHZhbHVlIGFzc2lnbm1lbnQuIFJlZ3VsYXIgYXR0cmlidXRlcyB0aGF0IGp1c3QgYWNjZXB0IHN0cmluZ3Ncbi8vIGFuZCBoYXZlIHRoZSBzYW1lIG5hbWVzIGFyZSBvbWl0dGVkLCBqdXN0IGxpa2UgaW4gdGhlIEhUTUwgd2hpdGVsaXN0LlxuLy8gU29tZSBvZiB0aGVzZSBhdHRyaWJ1dGVzIGNhbiBiZSBoYXJkIHRvIGZpbmQuIFRoaXMgbGlzdCB3YXMgY3JlYXRlZCBieVxuLy8gc2NyYXBpbmcgdGhlIE1ETiBkb2N1bWVudGF0aW9uLlxuXG5cblsnYWNjZW50LWhlaWdodCcsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXJhYmljLWZvcm0nLCAnYmFzZWxpbmUtc2hpZnQnLCAnY2FwLWhlaWdodCcsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2RvbWluYW50LWJhc2VsaW5lJywgJ2VuYWJsZS1iYWNrZ3JvdW5kJywgJ2ZpbGwtb3BhY2l0eScsICdmaWxsLXJ1bGUnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZ2x5cGgtbmFtZScsICdnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsJywgJ2dseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsJywgJ2hvcml6LWFkdi14JywgJ2hvcml6LW9yaWdpbi14JywgJ2ltYWdlLXJlbmRlcmluZycsICdsZXR0ZXItc3BhY2luZycsICdsaWdodGluZy1jb2xvcicsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0JywgJ292ZXJsaW5lLXBvc2l0aW9uJywgJ292ZXJsaW5lLXRoaWNrbmVzcycsICdwYWludC1vcmRlcicsICdwYW5vc2UtMScsICdwb2ludGVyLWV2ZW50cycsICdyZW5kZXJpbmctaW50ZW50JywgJ3NoYXBlLXJlbmRlcmluZycsICdzdG9wLWNvbG9yJywgJ3N0b3Atb3BhY2l0eScsICdzdHJpa2V0aHJvdWdoLXBvc2l0aW9uJywgJ3N0cmlrZXRocm91Z2gtdGhpY2tuZXNzJywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZS13aWR0aCcsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndW5kZXJsaW5lLXBvc2l0aW9uJywgJ3VuZGVybGluZS10aGlja25lc3MnLCAndW5pY29kZS1iaWRpJywgJ3VuaWNvZGUtcmFuZ2UnLCAndW5pdHMtcGVyLWVtJywgJ3YtYWxwaGFiZXRpYycsICd2LWhhbmdpbmcnLCAndi1pZGVvZ3JhcGhpYycsICd2LW1hdGhlbWF0aWNhbCcsICd2ZWN0b3ItZWZmZWN0JywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dvcmQtc3BhY2luZycsICd3cml0aW5nLW1vZGUnLCAneG1sbnM6eGxpbmsnLCAneC1oZWlnaHQnIC8vIE5PVEU6IGlmIHlvdSBhZGQgYSBjYW1lbENhc2VkIHByb3AgdG8gdGhpcyBsaXN0LFxuLy8geW91J2xsIG5lZWQgdG8gc2V0IGF0dHJpYnV0ZU5hbWUgdG8gbmFtZS50b0xvd2VyQ2FzZSgpXG4vLyBpbnN0ZWFkIGluIHRoZSBhc3NpZ25tZW50IGJlbG93LlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gIHZhciBuYW1lID0gYXR0cmlidXRlTmFtZS5yZXBsYWNlKENBTUVMSVpFLCBjYXBpdGFsaXplKTtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUsIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICBmYWxzZSk7XG59KTsgLy8gU3RyaW5nIFNWRyBhdHRyaWJ1dGVzIHdpdGggdGhlIHhsaW5rIG5hbWVzcGFjZS5cblxuWyd4bGluazphY3R1YXRlJywgJ3hsaW5rOmFyY3JvbGUnLCAneGxpbms6cm9sZScsICd4bGluazpzaG93JywgJ3hsaW5rOnRpdGxlJywgJ3hsaW5rOnR5cGUnIC8vIE5PVEU6IGlmIHlvdSBhZGQgYSBjYW1lbENhc2VkIHByb3AgdG8gdGhpcyBsaXN0LFxuLy8geW91J2xsIG5lZWQgdG8gc2V0IGF0dHJpYnV0ZU5hbWUgdG8gbmFtZS50b0xvd2VyQ2FzZSgpXG4vLyBpbnN0ZWFkIGluIHRoZSBhc3NpZ25tZW50IGJlbG93LlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gIHZhciBuYW1lID0gYXR0cmlidXRlTmFtZS5yZXBsYWNlKENBTUVMSVpFLCBjYXBpdGFsaXplKTtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgZmFsc2UpO1xufSk7IC8vIFN0cmluZyBTVkcgYXR0cmlidXRlcyB3aXRoIHRoZSB4bWwgbmFtZXNwYWNlLlxuXG5bJ3htbDpiYXNlJywgJ3htbDpsYW5nJywgJ3htbDpzcGFjZScgLy8gTk9URTogaWYgeW91IGFkZCBhIGNhbWVsQ2FzZWQgcHJvcCB0byB0aGlzIGxpc3QsXG4vLyB5b3UnbGwgbmVlZCB0byBzZXQgYXR0cmlidXRlTmFtZSB0byBuYW1lLnRvTG93ZXJDYXNlKClcbi8vIGluc3RlYWQgaW4gdGhlIGFzc2lnbm1lbnQgYmVsb3cuXG5dLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgdmFyIG5hbWUgPSBhdHRyaWJ1dGVOYW1lLnJlcGxhY2UoQ0FNRUxJWkUsIGNhcGl0YWxpemUpO1xuICBwcm9wZXJ0aWVzW25hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChuYW1lLCBTVFJJTkcsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgYXR0cmlidXRlTmFtZSwgJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhdHRyaWJ1dGUgZXhpc3RzIGJvdGggaW4gSFRNTCBhbmQgU1ZHLlxuLy8gVGhlIGF0dHJpYnV0ZSBuYW1lIGlzIGNhc2Utc2Vuc2l0aXZlIGluIFNWRyBzbyB3ZSBjYW4ndCBqdXN0IHVzZVxuLy8gdGhlIFJlYWN0IG5hbWUgbGlrZSB3ZSBkbyBmb3IgYXR0cmlidXRlcyB0aGF0IGV4aXN0IG9ubHkgaW4gSFRNTC5cblxuWyd0YWJJbmRleCcsICdjcm9zc09yaWdpbiddLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgcHJvcGVydGllc1thdHRyaWJ1dGVOYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQoYXR0cmlidXRlTmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFRoZXNlIGF0dHJpYnV0ZXMgYWNjZXB0IFVSTHMuIFRoZXNlIG11c3Qgbm90IGFsbG93IGphdmFzY3JpcHQ6IFVSTFMuXG4vLyBUaGVzZSB3aWxsIGFsc28gbmVlZCB0byBhY2NlcHQgVHJ1c3RlZCBUeXBlcyBvYmplY3QgaW4gdGhlIGZ1dHVyZS5cblxudmFyIHhsaW5rSHJlZiA9ICd4bGlua0hyZWYnO1xucHJvcGVydGllc1t4bGlua0hyZWZdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZCgneGxpbmtIcmVmJywgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4neGxpbms6aHJlZicsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgdHJ1ZSk7XG5bJ3NyYycsICdocmVmJywgJ2FjdGlvbicsICdmb3JtQWN0aW9uJ10uZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICBwcm9wZXJ0aWVzW2F0dHJpYnV0ZU5hbWVdID0gbmV3IFByb3BlcnR5SW5mb1JlY29yZChhdHRyaWJ1dGVOYW1lLCBTVFJJTkcsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgYXR0cmlidXRlTmFtZS50b0xvd2VyQ2FzZSgpLCAvLyBhdHRyaWJ1dGVOYW1lXG4gIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICB0cnVlKTtcbn0pO1xuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxID0gbnVsbDtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xufSAvLyBBIGphdmFzY3JpcHQ6IFVSTCBjYW4gY29udGFpbiBsZWFkaW5nIEMwIGNvbnRyb2wgb3IgXFx1MDAyMCBTUEFDRSxcbi8vIGFuZCBhbnkgbmV3bGluZSBvciB0YWIgYXJlIGZpbHRlcmVkIG91dCBhcyBpZiB0aGV5J3JlIG5vdCBwYXJ0IG9mIHRoZSBVUkwuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybC1wYXJzaW5nXG4vLyBUYWIgb3IgbmV3bGluZSBhcmUgZGVmaW5lZCBhcyBcXHJcXG5cXHQ6XG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYXNjaWktdGFiLW9yLW5ld2xpbmVcbi8vIEEgQzAgY29udHJvbCBpcyBhIGNvZGUgcG9pbnQgaW4gdGhlIHJhbmdlIFxcdTAwMDAgTlVMTCB0byBcXHUwMDFGXG4vLyBJTkZPUk1BVElPTiBTRVBBUkFUT1IgT05FLCBpbmNsdXNpdmU6XG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYzAtY29udHJvbC1vci1zcGFjZVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cblxudmFyIGlzSmF2YVNjcmlwdFByb3RvY29sID0gL15bXFx1MDAwMC1cXHUwMDFGIF0qaltcXHJcXG5cXHRdKmFbXFxyXFxuXFx0XSp2W1xcclxcblxcdF0qYVtcXHJcXG5cXHRdKnNbXFxyXFxuXFx0XSpjW1xcclxcblxcdF0qcltcXHJcXG5cXHRdKmlbXFxyXFxuXFx0XSpwW1xcclxcblxcdF0qdFtcXHJcXG5cXHRdKlxcOi9pO1xudmFyIGRpZFdhcm4gPSBmYWxzZTtcblxuZnVuY3Rpb24gc2FuaXRpemVVUkwodXJsKSB7XG4gIHtcbiAgICBpZiAoIWRpZFdhcm4gJiYgaXNKYXZhU2NyaXB0UHJvdG9jb2wudGVzdCh1cmwpKSB7XG4gICAgICBkaWRXYXJuID0gdHJ1ZTtcblxuICAgICAgZXJyb3IoJ0EgZnV0dXJlIHZlcnNpb24gb2YgUmVhY3Qgd2lsbCBibG9jayBqYXZhc2NyaXB0OiBVUkxzIGFzIGEgc2VjdXJpdHkgcHJlY2F1dGlvbi4gJyArICdVc2UgZXZlbnQgaGFuZGxlcnMgaW5zdGVhZCBpZiB5b3UgY2FuLiBJZiB5b3UgbmVlZCB0byBnZW5lcmF0ZSB1bnNhZmUgSFRNTCB0cnkgJyArICd1c2luZyBkYW5nZXJvdXNseVNldElubmVySFRNTCBpbnN0ZWFkLiBSZWFjdCB3YXMgcGFzc2VkICVzLicsIEpTT04uc3RyaW5naWZ5KHVybCkpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBjb2RlIGNvcGllZCBhbmQgbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbFxuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgbWF0Y2hIdG1sUmVnRXhwID0gL1tcIicmPD5dLztcbi8qKlxuICogRXNjYXBlcyBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIEhUTUwgZW50aXRpZXMgaW4gYSBnaXZlbiBodG1sIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZyBIVE1MIHN0cmluZyB0byBlc2NhcGUgZm9yIGxhdGVyIGluc2VydGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gIHZhciBzdHIgPSAnJyArIHN0cmluZztcbiAgdmFyIG1hdGNoID0gbWF0Y2hIdG1sUmVnRXhwLmV4ZWMoc3RyKTtcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHZhciBlc2NhcGU7XG4gIHZhciBodG1sID0gJyc7XG4gIHZhciBpbmRleDtcbiAgdmFyIGxhc3RJbmRleCA9IDA7XG5cbiAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgY2FzZSAzNDpcbiAgICAgICAgLy8gXCJcbiAgICAgICAgZXNjYXBlID0gJyZxdW90Oyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM4OlxuICAgICAgICAvLyAmXG4gICAgICAgIGVzY2FwZSA9ICcmYW1wOyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM5OlxuICAgICAgICAvLyAnXG4gICAgICAgIGVzY2FwZSA9ICcmI3gyNzsnOyAvLyBtb2RpZmllZCBmcm9tIGVzY2FwZS1odG1sOyB1c2VkIHRvIGJlICcmIzM5J1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDYwOlxuICAgICAgICAvLyA8XG4gICAgICAgIGVzY2FwZSA9ICcmbHQ7JztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNjI6XG4gICAgICAgIC8vID5cbiAgICAgICAgZXNjYXBlID0gJyZndDsnO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxhc3RJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIGh0bWwgKz0gc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KTtcbiAgICB9XG5cbiAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgaHRtbCArPSBlc2NhcGU7XG4gIH1cblxuICByZXR1cm4gbGFzdEluZGV4ICE9PSBpbmRleCA/IGh0bWwgKyBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpIDogaHRtbDtcbn0gLy8gZW5kIGNvZGUgY29waWVkIGFuZCBtb2RpZmllZCBmcm9tIGVzY2FwZS1odG1sXG5cbi8qKlxuICogRXNjYXBlcyB0ZXh0IHRvIHByZXZlbnQgc2NyaXB0aW5nIGF0dGFja3MuXG4gKlxuICogQHBhcmFtIHsqfSB0ZXh0IFRleHQgdmFsdWUgdG8gZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGVzY2FwZVRleHRGb3JCcm93c2VyKHRleHQpIHtcbiAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHRleHQgPT09ICdudW1iZXInKSB7XG4gICAgLy8gdGhpcyBzaG9ydGNpcmN1aXQgaGVscHMgcGVyZiBmb3IgdHlwZXMgdGhhdCB3ZSBrbm93IHdpbGwgbmV2ZXIgaGF2ZVxuICAgIC8vIHNwZWNpYWwgY2hhcmFjdGVycywgZXNwZWNpYWxseSBnaXZlbiB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgdXNlZCBvZnRlblxuICAgIC8vIGZvciBudW1lcmljIGRvbSBpZHMuXG4gICAgcmV0dXJuICcnICsgdGV4dDtcbiAgfVxuXG4gIHJldHVybiBlc2NhcGVIdG1sKHRleHQpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgYXR0cmlidXRlIHZhbHVlIHRvIHByZXZlbnQgc2NyaXB0aW5nIGF0dGFja3MuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBlc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5cbmZ1bmN0aW9uIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyKHZhbHVlKSB7XG4gIHJldHVybiAnXCInICsgZXNjYXBlVGV4dEZvckJyb3dzZXIodmFsdWUpICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yUm9vdCgpIHtcbiAgcmV0dXJuIFJPT1RfQVRUUklCVVRFX05BTUUgKyAnPVwiXCInO1xufVxuLyoqXG4gKiBDcmVhdGVzIG1hcmt1cCBmb3IgYSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7P3N0cmluZ30gTWFya3VwIHN0cmluZywgb3IgbnVsbCBpZiB0aGUgcHJvcGVydHkgd2FzIGludmFsaWQuXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yUHJvcGVydHkobmFtZSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5SW5mbyA9IGdldFByb3BlcnR5SW5mbyhuYW1lKTtcblxuICBpZiAobmFtZSAhPT0gJ3N0eWxlJyAmJiBzaG91bGRJZ25vcmVBdHRyaWJ1dGUobmFtZSwgcHJvcGVydHlJbmZvLCBmYWxzZSkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoc2hvdWxkUmVtb3ZlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBwcm9wZXJ0eUluZm8sIGZhbHNlKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChwcm9wZXJ0eUluZm8gIT09IG51bGwpIHtcbiAgICB2YXIgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5SW5mby5hdHRyaWJ1dGVOYW1lO1xuICAgIHZhciB0eXBlID0gcHJvcGVydHlJbmZvLnR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gQk9PTEVBTiB8fCB0eXBlID09PSBPVkVSTE9BREVEX0JPT0xFQU4gJiYgdmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lICsgJz1cIlwiJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb3BlcnR5SW5mby5zYW5pdGl6ZVVSTCkge1xuICAgICAgICB2YWx1ZSA9ICcnICsgdmFsdWU7XG4gICAgICAgIHNhbml0aXplVVJMKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWUgKyAnPScgKyBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQXR0cmlidXRlTmFtZVNhZmUobmFtZSkpIHtcbiAgICByZXR1cm4gbmFtZSArICc9JyArIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cbi8qKlxuICogQ3JlYXRlcyBtYXJrdXAgZm9yIGEgY3VzdG9tIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IE1hcmt1cCBzdHJpbmcsIG9yIGVtcHR5IHN0cmluZyBpZiB0aGUgcHJvcGVydHkgd2FzIGludmFsaWQuXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yQ3VzdG9tQXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gIGlmICghaXNBdHRyaWJ1dGVOYW1lU2FmZShuYW1lKSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnPScgKyBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgcmV0dXJuIHggPT09IHkgJiYgKHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5KSB8fCB4ICE9PSB4ICYmIHkgIT09IHkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgO1xufVxuXG52YXIgb2JqZWN0SXMgPSB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogaXM7XG5cbnZhciBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQgPSBudWxsO1xudmFyIGZpcnN0V29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcbnZhciB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsOyAvLyBXaGV0aGVyIHRoZSB3b3JrLWluLXByb2dyZXNzIGhvb2sgaXMgYSByZS1yZW5kZXJlZCBob29rXG5cbnZhciBpc1JlUmVuZGVyID0gZmFsc2U7IC8vIFdoZXRoZXIgYW4gdXBkYXRlIHdhcyBzY2hlZHVsZWQgZHVyaW5nIHRoZSBjdXJyZW50bHkgZXhlY3V0aW5nIHJlbmRlciBwYXNzLlxuXG52YXIgZGlkU2NoZWR1bGVSZW5kZXJQaGFzZVVwZGF0ZSA9IGZhbHNlOyAvLyBMYXppbHkgY3JlYXRlZCBtYXAgb2YgcmVuZGVyLXBoYXNlIHVwZGF0ZXNcblxudmFyIHJlbmRlclBoYXNlVXBkYXRlcyA9IG51bGw7IC8vIENvdW50ZXIgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wcy5cblxudmFyIG51bWJlck9mUmVSZW5kZXJzID0gMDtcbnZhciBSRV9SRU5ERVJfTElNSVQgPSAyNTtcbnZhciBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSBmYWxzZTsgLy8gSW4gREVWLCB0aGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50bHkgZXhlY3V0aW5nIHByaW1pdGl2ZSBob29rXG5cbnZhciBjdXJyZW50SG9va05hbWVJbkRldjtcblxuZnVuY3Rpb24gcmVzb2x2ZUN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCgpIHtcbiAgaWYgKCEoY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ICE9PSBudWxsKSkge1xuICAgIHtcbiAgICAgIHRocm93IEVycm9yKCBcIkludmFsaWQgaG9vayBjYWxsLiBIb29rcyBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIG9mIHRoZSBib2R5IG9mIGEgZnVuY3Rpb24gY29tcG9uZW50LiBUaGlzIGNvdWxkIGhhcHBlbiBmb3Igb25lIG9mIHRoZSBmb2xsb3dpbmcgcmVhc29uczpcXG4xLiBZb3UgbWlnaHQgaGF2ZSBtaXNtYXRjaGluZyB2ZXJzaW9ucyBvZiBSZWFjdCBhbmQgdGhlIHJlbmRlcmVyIChzdWNoIGFzIFJlYWN0IERPTSlcXG4yLiBZb3UgbWlnaHQgYmUgYnJlYWtpbmcgdGhlIFJ1bGVzIG9mIEhvb2tzXFxuMy4gWW91IG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0IGluIHRoZSBzYW1lIGFwcFxcblNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWludmFsaWQtaG9vay1jYWxsIGZvciB0aXBzIGFib3V0IGhvdyB0byBkZWJ1ZyBhbmQgZml4IHRoaXMgcHJvYmxlbS5cIiApO1xuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpZiAoaXNJbkhvb2tVc2VyQ29kZUluRGV2KSB7XG4gICAgICBlcnJvcignRG8gbm90IGNhbGwgSG9va3MgaW5zaWRlIHVzZUVmZmVjdCguLi4pLCB1c2VNZW1vKC4uLiksIG9yIG90aGVyIGJ1aWx0LWluIEhvb2tzLiAnICsgJ1lvdSBjYW4gb25seSBjYWxsIEhvb2tzIGF0IHRoZSB0b3AgbGV2ZWwgb2YgeW91ciBSZWFjdCBmdW5jdGlvbi4gJyArICdGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlICcgKyAnaHR0cHM6Ly9mYi5tZS9ydWxlcy1vZi1ob29rcycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIGFyZUhvb2tJbnB1dHNFcXVhbChuZXh0RGVwcywgcHJldkRlcHMpIHtcbiAgaWYgKHByZXZEZXBzID09PSBudWxsKSB7XG4gICAge1xuICAgICAgZXJyb3IoJyVzIHJlY2VpdmVkIGEgZmluYWwgYXJndW1lbnQgZHVyaW5nIHRoaXMgcmVuZGVyLCBidXQgbm90IGR1cmluZyAnICsgJ3RoZSBwcmV2aW91cyByZW5kZXIuIEV2ZW4gdGhvdWdoIHRoZSBmaW5hbCBhcmd1bWVudCBpcyBvcHRpb25hbCwgJyArICdpdHMgdHlwZSBjYW5ub3QgY2hhbmdlIGJldHdlZW4gcmVuZGVycy4nLCBjdXJyZW50SG9va05hbWVJbkRldik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAge1xuICAgIC8vIERvbid0IGJvdGhlciBjb21wYXJpbmcgbGVuZ3RocyBpbiBwcm9kIGJlY2F1c2UgdGhlc2UgYXJyYXlzIHNob3VsZCBiZVxuICAgIC8vIHBhc3NlZCBpbmxpbmUuXG4gICAgaWYgKG5leHREZXBzLmxlbmd0aCAhPT0gcHJldkRlcHMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignVGhlIGZpbmFsIGFyZ3VtZW50IHBhc3NlZCB0byAlcyBjaGFuZ2VkIHNpemUgYmV0d2VlbiByZW5kZXJzLiBUaGUgJyArICdvcmRlciBhbmQgc2l6ZSBvZiB0aGlzIGFycmF5IG11c3QgcmVtYWluIGNvbnN0YW50LlxcblxcbicgKyAnUHJldmlvdXM6ICVzXFxuJyArICdJbmNvbWluZzogJXMnLCBjdXJyZW50SG9va05hbWVJbkRldiwgXCJbXCIgKyBuZXh0RGVwcy5qb2luKCcsICcpICsgXCJdXCIsIFwiW1wiICsgcHJldkRlcHMuam9pbignLCAnKSArIFwiXVwiKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZEZXBzLmxlbmd0aCAmJiBpIDwgbmV4dERlcHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAob2JqZWN0SXMobmV4dERlcHNbaV0sIHByZXZEZXBzW2ldKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhvb2soKSB7XG4gIGlmIChudW1iZXJPZlJlUmVuZGVycyA+IDApIHtcbiAgICB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcIlJlbmRlcmVkIG1vcmUgaG9va3MgdGhhbiBkdXJpbmcgdGhlIHByZXZpb3VzIHJlbmRlclwiICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtZW1vaXplZFN0YXRlOiBudWxsLFxuICAgIHF1ZXVlOiBudWxsLFxuICAgIG5leHQ6IG51bGxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlV29ya0luUHJvZ3Jlc3NIb29rKCkge1xuICBpZiAod29ya0luUHJvZ3Jlc3NIb29rID09PSBudWxsKSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgaG9vayBpbiB0aGUgbGlzdFxuICAgIGlmIChmaXJzdFdvcmtJblByb2dyZXNzSG9vayA9PT0gbnVsbCkge1xuICAgICAgaXNSZVJlbmRlciA9IGZhbHNlO1xuICAgICAgZmlyc3RXb3JrSW5Qcm9ncmVzc0hvb2sgPSB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBjcmVhdGVIb29rKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZXJlJ3MgYWxyZWFkeSBhIHdvcmstaW4tcHJvZ3Jlc3MuIFJldXNlIGl0LlxuICAgICAgaXNSZVJlbmRlciA9IHRydWU7XG4gICAgICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBmaXJzdFdvcmtJblByb2dyZXNzSG9vaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHdvcmtJblByb2dyZXNzSG9vay5uZXh0ID09PSBudWxsKSB7XG4gICAgICBpc1JlUmVuZGVyID0gZmFsc2U7IC8vIEFwcGVuZCB0byB0aGUgZW5kIG9mIHRoZSBsaXN0XG5cbiAgICAgIHdvcmtJblByb2dyZXNzSG9vayA9IHdvcmtJblByb2dyZXNzSG9vay5uZXh0ID0gY3JlYXRlSG9vaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIGFscmVhZHkgYSB3b3JrLWluLXByb2dyZXNzLiBSZXVzZSBpdC5cbiAgICAgIGlzUmVSZW5kZXIgPSB0cnVlO1xuICAgICAgd29ya0luUHJvZ3Jlc3NIb29rID0gd29ya0luUHJvZ3Jlc3NIb29rLm5leHQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdvcmtJblByb2dyZXNzSG9vaztcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVRvVXNlSG9va3MoY29tcG9uZW50SWRlbnRpdHkpIHtcbiAgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ID0gY29tcG9uZW50SWRlbnRpdHk7XG5cbiAge1xuICAgIGlzSW5Ib29rVXNlckNvZGVJbkRldiA9IGZhbHNlO1xuICB9IC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIGhhdmUgYWxyZWFkeSBiZWVuIHJlc2V0XG4gIC8vIGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUgPSBmYWxzZTtcbiAgLy8gZmlyc3RXb3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsO1xuICAvLyBudW1iZXJPZlJlUmVuZGVycyA9IDA7XG4gIC8vIHJlbmRlclBoYXNlVXBkYXRlcyA9IG51bGw7XG4gIC8vIHdvcmtJblByb2dyZXNzSG9vayA9IG51bGw7XG5cbn1cbmZ1bmN0aW9uIGZpbmlzaEhvb2tzKENvbXBvbmVudCwgcHJvcHMsIGNoaWxkcmVuLCByZWZPckNvbnRleHQpIHtcbiAgLy8gVGhpcyBtdXN0IGJlIGNhbGxlZCBhZnRlciBldmVyeSBmdW5jdGlvbiBjb21wb25lbnQgdG8gcHJldmVudCBob29rcyBmcm9tXG4gIC8vIGJlaW5nIHVzZWQgaW4gY2xhc3Nlcy5cbiAgd2hpbGUgKGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUpIHtcbiAgICAvLyBVcGRhdGVzIHdlcmUgc2NoZWR1bGVkIGR1cmluZyB0aGUgcmVuZGVyIHBoYXNlLiBUaGV5IGFyZSBzdG9yZWQgaW5cbiAgICAvLyB0aGUgYHJlbmRlclBoYXNlVXBkYXRlc2AgbWFwLiBDYWxsIHRoZSBjb21wb25lbnQgYWdhaW4sIHJldXNpbmcgdGhlXG4gICAgLy8gd29yay1pbi1wcm9ncmVzcyBob29rcyBhbmQgYXBwbHlpbmcgdGhlIGFkZGl0aW9uYWwgdXBkYXRlcyBvbiB0b3AuIEtlZXBcbiAgICAvLyByZXN0YXJ0aW5nIHVudGlsIG5vIG1vcmUgdXBkYXRlcyBhcmUgc2NoZWR1bGVkLlxuICAgIGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUgPSBmYWxzZTtcbiAgICBudW1iZXJPZlJlUmVuZGVycyArPSAxOyAvLyBTdGFydCBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdFxuXG4gICAgd29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcbiAgICBjaGlsZHJlbiA9IENvbXBvbmVudChwcm9wcywgcmVmT3JDb250ZXh0KTtcbiAgfVxuXG4gIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCA9IG51bGw7XG4gIGZpcnN0V29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcbiAgbnVtYmVyT2ZSZVJlbmRlcnMgPSAwO1xuICByZW5kZXJQaGFzZVVwZGF0ZXMgPSBudWxsO1xuICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsO1xuXG4gIHtcbiAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSBmYWxzZTtcbiAgfSAvLyBUaGVzZSB3ZXJlIHJlc2V0IGFib3ZlXG4gIC8vIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCA9IG51bGw7XG4gIC8vIGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUgPSBmYWxzZTtcbiAgLy8gZmlyc3RXb3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsO1xuICAvLyBudW1iZXJPZlJlUmVuZGVycyA9IDA7XG4gIC8vIHJlbmRlclBoYXNlVXBkYXRlcyA9IG51bGw7XG4gIC8vIHdvcmtJblByb2dyZXNzSG9vayA9IG51bGw7XG5cblxuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIHJlYWRDb250ZXh0KGNvbnRleHQsIG9ic2VydmVkQml0cykge1xuICB2YXIgdGhyZWFkSUQgPSBjdXJyZW50VGhyZWFkSUQ7XG4gIHZhbGlkYXRlQ29udGV4dEJvdW5kcyhjb250ZXh0LCB0aHJlYWRJRCk7XG5cbiAge1xuICAgIGlmIChpc0luSG9va1VzZXJDb2RlSW5EZXYpIHtcbiAgICAgIGVycm9yKCdDb250ZXh0IGNhbiBvbmx5IGJlIHJlYWQgd2hpbGUgUmVhY3QgaXMgcmVuZGVyaW5nLiAnICsgJ0luIGNsYXNzZXMsIHlvdSBjYW4gcmVhZCBpdCBpbiB0aGUgcmVuZGVyIG1ldGhvZCBvciBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMuICcgKyAnSW4gZnVuY3Rpb24gY29tcG9uZW50cywgeW91IGNhbiByZWFkIGl0IGRpcmVjdGx5IGluIHRoZSBmdW5jdGlvbiBib2R5LCBidXQgbm90ICcgKyAnaW5zaWRlIEhvb2tzIGxpa2UgdXNlUmVkdWNlcigpIG9yIHVzZU1lbW8oKS4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29udGV4dFt0aHJlYWRJRF07XG59XG5cbmZ1bmN0aW9uIHVzZUNvbnRleHQoY29udGV4dCwgb2JzZXJ2ZWRCaXRzKSB7XG4gIHtcbiAgICBjdXJyZW50SG9va05hbWVJbkRldiA9ICd1c2VDb250ZXh0JztcbiAgfVxuXG4gIHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKTtcbiAgdmFyIHRocmVhZElEID0gY3VycmVudFRocmVhZElEO1xuICB2YWxpZGF0ZUNvbnRleHRCb3VuZHMoY29udGV4dCwgdGhyZWFkSUQpO1xuICByZXR1cm4gY29udGV4dFt0aHJlYWRJRF07XG59XG5cbmZ1bmN0aW9uIGJhc2ljU3RhdGVSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgLy8gJEZsb3dGaXhNZTogRmxvdyBkb2Vzbid0IGxpa2UgbWl4ZWQgdHlwZXNcbiAgcmV0dXJuIHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicgPyBhY3Rpb24oc3RhdGUpIDogYWN0aW9uO1xufVxuXG5mdW5jdGlvbiB1c2VTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAge1xuICAgIGN1cnJlbnRIb29rTmFtZUluRGV2ID0gJ3VzZVN0YXRlJztcbiAgfVxuXG4gIHJldHVybiB1c2VSZWR1Y2VyKGJhc2ljU3RhdGVSZWR1Y2VyLCAvLyB1c2VSZWR1Y2VyIGhhcyBhIHNwZWNpYWwgY2FzZSB0byBzdXBwb3J0IGxhenkgdXNlU3RhdGUgaW5pdGlhbGl6ZXJzXG4gIGluaXRpYWxTdGF0ZSk7XG59XG5mdW5jdGlvbiB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAge1xuICAgIGlmIChyZWR1Y2VyICE9PSBiYXNpY1N0YXRlUmVkdWNlcikge1xuICAgICAgY3VycmVudEhvb2tOYW1lSW5EZXYgPSAndXNlUmVkdWNlcic7XG4gICAgfVxuICB9XG5cbiAgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ID0gcmVzb2x2ZUN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCgpO1xuICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBjcmVhdGVXb3JrSW5Qcm9ncmVzc0hvb2soKTtcblxuICBpZiAoaXNSZVJlbmRlcikge1xuICAgIC8vIFRoaXMgaXMgYSByZS1yZW5kZXIuIEFwcGx5IHRoZSBuZXcgcmVuZGVyIHBoYXNlIHVwZGF0ZXMgdG8gdGhlIHByZXZpb3VzXG4gICAgLy8gY3VycmVudCBob29rLlxuICAgIHZhciBxdWV1ZSA9IHdvcmtJblByb2dyZXNzSG9vay5xdWV1ZTtcbiAgICB2YXIgZGlzcGF0Y2ggPSBxdWV1ZS5kaXNwYXRjaDtcblxuICAgIGlmIChyZW5kZXJQaGFzZVVwZGF0ZXMgIT09IG51bGwpIHtcbiAgICAgIC8vIFJlbmRlciBwaGFzZSB1cGRhdGVzIGFyZSBzdG9yZWQgaW4gYSBtYXAgb2YgcXVldWUgLT4gbGlua2VkIGxpc3RcbiAgICAgIHZhciBmaXJzdFJlbmRlclBoYXNlVXBkYXRlID0gcmVuZGVyUGhhc2VVcGRhdGVzLmdldChxdWV1ZSk7XG5cbiAgICAgIGlmIChmaXJzdFJlbmRlclBoYXNlVXBkYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVuZGVyUGhhc2VVcGRhdGVzLmRlbGV0ZShxdWV1ZSk7XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IHdvcmtJblByb2dyZXNzSG9vay5tZW1vaXplZFN0YXRlO1xuICAgICAgICB2YXIgdXBkYXRlID0gZmlyc3RSZW5kZXJQaGFzZVVwZGF0ZTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgLy8gUHJvY2VzcyB0aGlzIHJlbmRlciBwaGFzZSB1cGRhdGUuIFdlIGRvbid0IGhhdmUgdG8gY2hlY2sgdGhlXG4gICAgICAgICAgLy8gcHJpb3JpdHkgYmVjYXVzZSBpdCB3aWxsIGFsd2F5cyBiZSB0aGUgc2FtZSBhcyB0aGUgY3VycmVudFxuICAgICAgICAgIC8vIHJlbmRlcidzLlxuICAgICAgICAgIHZhciBhY3Rpb24gPSB1cGRhdGUuYWN0aW9uO1xuXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdTdGF0ZSA9IHJlZHVjZXIobmV3U3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1cGRhdGUgPSB1cGRhdGUubmV4dDtcbiAgICAgICAgfSB3aGlsZSAodXBkYXRlICE9PSBudWxsKTtcblxuICAgICAgICB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICByZXR1cm4gW25ld1N0YXRlLCBkaXNwYXRjaF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFt3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZSwgZGlzcGF0Y2hdO1xuICB9IGVsc2Uge1xuICAgIHtcbiAgICAgIGlzSW5Ib29rVXNlckNvZGVJbkRldiA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxTdGF0ZTtcblxuICAgIGlmIChyZWR1Y2VyID09PSBiYXNpY1N0YXRlUmVkdWNlcikge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBgdXNlU3RhdGVgLlxuICAgICAgaW5pdGlhbFN0YXRlID0gdHlwZW9mIGluaXRpYWxBcmcgPT09ICdmdW5jdGlvbicgPyBpbml0aWFsQXJnKCkgOiBpbml0aWFsQXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0aWFsU3RhdGUgPSBpbml0ICE9PSB1bmRlZmluZWQgPyBpbml0KGluaXRpYWxBcmcpIDogaW5pdGlhbEFyZztcbiAgICB9XG5cbiAgICB7XG4gICAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICAgIHZhciBfcXVldWUgPSB3b3JrSW5Qcm9ncmVzc0hvb2sucXVldWUgPSB7XG4gICAgICBsYXN0OiBudWxsLFxuICAgICAgZGlzcGF0Y2g6IG51bGxcbiAgICB9O1xuXG4gICAgdmFyIF9kaXNwYXRjaCA9IF9xdWV1ZS5kaXNwYXRjaCA9IGRpc3BhdGNoQWN0aW9uLmJpbmQobnVsbCwgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50LCBfcXVldWUpO1xuXG4gICAgcmV0dXJuIFt3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZSwgX2Rpc3BhdGNoXTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1c2VNZW1vKG5leHRDcmVhdGUsIGRlcHMpIHtcbiAgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ID0gcmVzb2x2ZUN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCgpO1xuICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBjcmVhdGVXb3JrSW5Qcm9ncmVzc0hvb2soKTtcbiAgdmFyIG5leHREZXBzID0gZGVwcyA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlcHM7XG5cbiAgaWYgKHdvcmtJblByb2dyZXNzSG9vayAhPT0gbnVsbCkge1xuICAgIHZhciBwcmV2U3RhdGUgPSB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZTtcblxuICAgIGlmIChwcmV2U3RhdGUgIT09IG51bGwpIHtcbiAgICAgIGlmIChuZXh0RGVwcyAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgcHJldkRlcHMgPSBwcmV2U3RhdGVbMV07XG5cbiAgICAgICAgaWYgKGFyZUhvb2tJbnB1dHNFcXVhbChuZXh0RGVwcywgcHJldkRlcHMpKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZTdGF0ZVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSB0cnVlO1xuICB9XG5cbiAgdmFyIG5leHRWYWx1ZSA9IG5leHRDcmVhdGUoKTtcblxuICB7XG4gICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gZmFsc2U7XG4gIH1cblxuICB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZSA9IFtuZXh0VmFsdWUsIG5leHREZXBzXTtcbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gdXNlUmVmKGluaXRpYWxWYWx1ZSkge1xuICBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQgPSByZXNvbHZlQ3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50KCk7XG4gIHdvcmtJblByb2dyZXNzSG9vayA9IGNyZWF0ZVdvcmtJblByb2dyZXNzSG9vaygpO1xuICB2YXIgcHJldmlvdXNSZWYgPSB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZTtcblxuICBpZiAocHJldmlvdXNSZWYgPT09IG51bGwpIHtcbiAgICB2YXIgcmVmID0ge1xuICAgICAgY3VycmVudDogaW5pdGlhbFZhbHVlXG4gICAgfTtcblxuICAgIHtcbiAgICAgIE9iamVjdC5zZWFsKHJlZik7XG4gICAgfVxuXG4gICAgd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUgPSByZWY7XG4gICAgcmV0dXJuIHJlZjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcHJldmlvdXNSZWY7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlTGF5b3V0RWZmZWN0KGNyZWF0ZSwgaW5wdXRzKSB7XG4gIHtcbiAgICBjdXJyZW50SG9va05hbWVJbkRldiA9ICd1c2VMYXlvdXRFZmZlY3QnO1xuXG4gICAgZXJyb3IoJ3VzZUxheW91dEVmZmVjdCBkb2VzIG5vdGhpbmcgb24gdGhlIHNlcnZlciwgYmVjYXVzZSBpdHMgZWZmZWN0IGNhbm5vdCAnICsgXCJiZSBlbmNvZGVkIGludG8gdGhlIHNlcnZlciByZW5kZXJlcidzIG91dHB1dCBmb3JtYXQuIFRoaXMgd2lsbCBsZWFkIFwiICsgJ3RvIGEgbWlzbWF0Y2ggYmV0d2VlbiB0aGUgaW5pdGlhbCwgbm9uLWh5ZHJhdGVkIFVJIGFuZCB0aGUgaW50ZW5kZWQgJyArICdVSS4gVG8gYXZvaWQgdGhpcywgdXNlTGF5b3V0RWZmZWN0IHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gJyArICdjb21wb25lbnRzIHRoYXQgcmVuZGVyIGV4Y2x1c2l2ZWx5IG9uIHRoZSBjbGllbnQuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtdXNlbGF5b3V0ZWZmZWN0LXNzciBmb3IgY29tbW9uIGZpeGVzLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoQWN0aW9uKGNvbXBvbmVudElkZW50aXR5LCBxdWV1ZSwgYWN0aW9uKSB7XG4gIGlmICghKG51bWJlck9mUmVSZW5kZXJzIDwgUkVfUkVOREVSX0xJTUlUKSkge1xuICAgIHtcbiAgICAgIHRocm93IEVycm9yKCBcIlRvbyBtYW55IHJlLXJlbmRlcnMuIFJlYWN0IGxpbWl0cyB0aGUgbnVtYmVyIG9mIHJlbmRlcnMgdG8gcHJldmVudCBhbiBpbmZpbml0ZSBsb29wLlwiICk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbXBvbmVudElkZW50aXR5ID09PSBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQpIHtcbiAgICAvLyBUaGlzIGlzIGEgcmVuZGVyIHBoYXNlIHVwZGF0ZS4gU3Rhc2ggaXQgaW4gYSBsYXppbHktY3JlYXRlZCBtYXAgb2ZcbiAgICAvLyBxdWV1ZSAtPiBsaW5rZWQgbGlzdCBvZiB1cGRhdGVzLiBBZnRlciB0aGlzIHJlbmRlciBwYXNzLCB3ZSdsbCByZXN0YXJ0XG4gICAgLy8gYW5kIGFwcGx5IHRoZSBzdGFzaGVkIHVwZGF0ZXMgb24gdG9wIG9mIHRoZSB3b3JrLWluLXByb2dyZXNzIGhvb2suXG4gICAgZGlkU2NoZWR1bGVSZW5kZXJQaGFzZVVwZGF0ZSA9IHRydWU7XG4gICAgdmFyIHVwZGF0ZSA9IHtcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgbmV4dDogbnVsbFxuICAgIH07XG5cbiAgICBpZiAocmVuZGVyUGhhc2VVcGRhdGVzID09PSBudWxsKSB7XG4gICAgICByZW5kZXJQaGFzZVVwZGF0ZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0UmVuZGVyUGhhc2VVcGRhdGUgPSByZW5kZXJQaGFzZVVwZGF0ZXMuZ2V0KHF1ZXVlKTtcblxuICAgIGlmIChmaXJzdFJlbmRlclBoYXNlVXBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlclBoYXNlVXBkYXRlcy5zZXQocXVldWUsIHVwZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFwcGVuZCB0aGUgdXBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICB2YXIgbGFzdFJlbmRlclBoYXNlVXBkYXRlID0gZmlyc3RSZW5kZXJQaGFzZVVwZGF0ZTtcblxuICAgICAgd2hpbGUgKGxhc3RSZW5kZXJQaGFzZVVwZGF0ZS5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgIGxhc3RSZW5kZXJQaGFzZVVwZGF0ZSA9IGxhc3RSZW5kZXJQaGFzZVVwZGF0ZS5uZXh0O1xuICAgICAgfVxuXG4gICAgICBsYXN0UmVuZGVyUGhhc2VVcGRhdGUubmV4dCA9IHVwZGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlQ2FsbGJhY2soY2FsbGJhY2ssIGRlcHMpIHtcbiAgLy8gQ2FsbGJhY2tzIGFyZSBwYXNzZWQgYXMgdGhleSBhcmUgaW4gdGhlIHNlcnZlciBlbnZpcm9ubWVudC5cbiAgcmV0dXJuIGNhbGxiYWNrO1xufVxuXG5mdW5jdGlvbiB1c2VSZXNwb25kZXIocmVzcG9uZGVyLCBwcm9wcykge1xuICByZXR1cm4ge1xuICAgIHByb3BzOiBwcm9wcyxcbiAgICByZXNwb25kZXI6IHJlc3BvbmRlclxuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VEZWZlcnJlZFZhbHVlKHZhbHVlLCBjb25maWcpIHtcbiAgcmVzb2x2ZUN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVzZVRyYW5zaXRpb24oY29uZmlnKSB7XG4gIHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKTtcblxuICB2YXIgc3RhcnRUcmFuc2l0aW9uID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfTtcblxuICByZXR1cm4gW3N0YXJ0VHJhbnNpdGlvbiwgZmFsc2VdO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIGN1cnJlbnRUaHJlYWRJRCA9IDA7XG5mdW5jdGlvbiBzZXRDdXJyZW50VGhyZWFkSUQodGhyZWFkSUQpIHtcbiAgY3VycmVudFRocmVhZElEID0gdGhyZWFkSUQ7XG59XG52YXIgRGlzcGF0Y2hlciA9IHtcbiAgcmVhZENvbnRleHQ6IHJlYWRDb250ZXh0LFxuICB1c2VDb250ZXh0OiB1c2VDb250ZXh0LFxuICB1c2VNZW1vOiB1c2VNZW1vLFxuICB1c2VSZWR1Y2VyOiB1c2VSZWR1Y2VyLFxuICB1c2VSZWY6IHVzZVJlZixcbiAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICB1c2VMYXlvdXRFZmZlY3Q6IHVzZUxheW91dEVmZmVjdCxcbiAgdXNlQ2FsbGJhY2s6IHVzZUNhbGxiYWNrLFxuICAvLyB1c2VJbXBlcmF0aXZlSGFuZGxlIGlzIG5vdCBydW4gaW4gdGhlIHNlcnZlciBlbnZpcm9ubWVudFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlOiBub29wLFxuICAvLyBFZmZlY3RzIGFyZSBub3QgcnVuIGluIHRoZSBzZXJ2ZXIgZW52aXJvbm1lbnQuXG4gIHVzZUVmZmVjdDogbm9vcCxcbiAgLy8gRGVidWdnaW5nIGVmZmVjdFxuICB1c2VEZWJ1Z1ZhbHVlOiBub29wLFxuICB1c2VSZXNwb25kZXI6IHVzZVJlc3BvbmRlcixcbiAgdXNlRGVmZXJyZWRWYWx1ZTogdXNlRGVmZXJyZWRWYWx1ZSxcbiAgdXNlVHJhbnNpdGlvbjogdXNlVHJhbnNpdGlvblxufTtcblxudmFyIEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xudmFyIE1BVEhfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xudmFyIFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xudmFyIE5hbWVzcGFjZXMgPSB7XG4gIGh0bWw6IEhUTUxfTkFNRVNQQUNFLFxuICBtYXRobWw6IE1BVEhfTkFNRVNQQUNFLFxuICBzdmc6IFNWR19OQU1FU1BBQ0Vcbn07IC8vIEFzc3VtZXMgdGhlcmUgaXMgbm8gcGFyZW50IG5hbWVzcGFjZS5cblxuZnVuY3Rpb24gZ2V0SW50cmluc2ljTmFtZXNwYWNlKHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3ZnJzpcbiAgICAgIHJldHVybiBTVkdfTkFNRVNQQUNFO1xuXG4gICAgY2FzZSAnbWF0aCc6XG4gICAgICByZXR1cm4gTUFUSF9OQU1FU1BBQ0U7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEhUTUxfTkFNRVNQQUNFO1xuICB9XG59XG5mdW5jdGlvbiBnZXRDaGlsZE5hbWVzcGFjZShwYXJlbnROYW1lc3BhY2UsIHR5cGUpIHtcbiAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PSBudWxsIHx8IHBhcmVudE5hbWVzcGFjZSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAvLyBObyAob3IgZGVmYXVsdCkgcGFyZW50IG5hbWVzcGFjZTogcG90ZW50aWFsIGVudHJ5IHBvaW50LlxuICAgIHJldHVybiBnZXRJbnRyaW5zaWNOYW1lc3BhY2UodHlwZSk7XG4gIH1cblxuICBpZiAocGFyZW50TmFtZXNwYWNlID09PSBTVkdfTkFNRVNQQUNFICYmIHR5cGUgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIC8vIFdlJ3JlIGxlYXZpbmcgU1ZHLlxuICAgIHJldHVybiBIVE1MX05BTUVTUEFDRTtcbiAgfSAvLyBCeSBkZWZhdWx0LCBwYXNzIG5hbWVzcGFjZSBiZWxvdy5cblxuXG4gIHJldHVybiBwYXJlbnROYW1lc3BhY2U7XG59XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDIgPSBudWxsO1xudmFyIFJlYWN0Q29udHJvbGxlZFZhbHVlUHJvcFR5cGVzID0ge1xuICBjaGVja1Byb3BUeXBlczogbnVsbFxufTtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDIgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICB2YXIgaGFzUmVhZE9ubHlWYWx1ZSA9IHtcbiAgICBidXR0b246IHRydWUsXG4gICAgY2hlY2tib3g6IHRydWUsXG4gICAgaW1hZ2U6IHRydWUsXG4gICAgaGlkZGVuOiB0cnVlLFxuICAgIHJhZGlvOiB0cnVlLFxuICAgIHJlc2V0OiB0cnVlLFxuICAgIHN1Ym1pdDogdHJ1ZVxuICB9O1xuICB2YXIgcHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgICBpZiAoaGFzUmVhZE9ubHlWYWx1ZVtwcm9wcy50eXBlXSB8fCBwcm9wcy5vbkNoYW5nZSB8fCBwcm9wcy5yZWFkT25seSB8fCBwcm9wcy5kaXNhYmxlZCB8fCBwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCB8fCBlbmFibGVEZXByZWNhdGVkRmxhcmVBUEkgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdZb3UgcHJvdmlkZWQgYSBgdmFsdWVgIHByb3AgdG8gYSBmb3JtIGZpZWxkIHdpdGhvdXQgYW4gJyArICdgb25DaGFuZ2VgIGhhbmRsZXIuIFRoaXMgd2lsbCByZW5kZXIgYSByZWFkLW9ubHkgZmllbGQuIElmICcgKyAndGhlIGZpZWxkIHNob3VsZCBiZSBtdXRhYmxlIHVzZSBgZGVmYXVsdFZhbHVlYC4gT3RoZXJ3aXNlLCAnICsgJ3NldCBlaXRoZXIgYG9uQ2hhbmdlYCBvciBgcmVhZE9ubHlgLicpO1xuICAgIH0sXG4gICAgY2hlY2tlZDogZnVuY3Rpb24gKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgICAgaWYgKHByb3BzLm9uQ2hhbmdlIHx8IHByb3BzLnJlYWRPbmx5IHx8IHByb3BzLmRpc2FibGVkIHx8IHByb3BzW3Byb3BOYW1lXSA9PSBudWxsIHx8IGVuYWJsZURlcHJlY2F0ZWRGbGFyZUFQSSApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1lvdSBwcm92aWRlZCBhIGBjaGVja2VkYCBwcm9wIHRvIGEgZm9ybSBmaWVsZCB3aXRob3V0IGFuICcgKyAnYG9uQ2hhbmdlYCBoYW5kbGVyLiBUaGlzIHdpbGwgcmVuZGVyIGEgcmVhZC1vbmx5IGZpZWxkLiBJZiAnICsgJ3RoZSBmaWVsZCBzaG91bGQgYmUgbXV0YWJsZSB1c2UgYGRlZmF1bHRDaGVja2VkYC4gT3RoZXJ3aXNlLCAnICsgJ3NldCBlaXRoZXIgYG9uQ2hhbmdlYCBvciBgcmVhZE9ubHlgLicpO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFByb3ZpZGUgYSBsaW5rZWQgYHZhbHVlYCBhdHRyaWJ1dGUgZm9yIGNvbnRyb2xsZWQgZm9ybXMuIFlvdSBzaG91bGQgbm90IHVzZVxuICAgKiB0aGlzIG91dHNpZGUgb2YgdGhlIFJlYWN0RE9NIGNvbnRyb2xsZWQgZm9ybSBjb21wb25lbnRzLlxuICAgKi9cblxuICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGZ1bmN0aW9uICh0YWdOYW1lLCBwcm9wcykge1xuICAgIGNoZWNrUHJvcFR5cGVzKHByb3BUeXBlcywgcHJvcHMsICdwcm9wJywgdGFnTmFtZSwgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQyLmdldFN0YWNrQWRkZW5kdW0pO1xuICB9O1xufVxuXG4vLyBGb3IgSFRNTCwgY2VydGFpbiB0YWdzIHNob3VsZCBvbWl0IHRoZWlyIGNsb3NlIHRhZy4gV2Uga2VlcCBhIHdoaXRlbGlzdCBmb3Jcbi8vIHRob3NlIHNwZWNpYWwtY2FzZSB0YWdzLlxudmFyIG9taXR0ZWRDbG9zZVRhZ3MgPSB7XG4gIGFyZWE6IHRydWUsXG4gIGJhc2U6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBpbnB1dDogdHJ1ZSxcbiAga2V5Z2VuOiB0cnVlLFxuICBsaW5rOiB0cnVlLFxuICBtZXRhOiB0cnVlLFxuICBwYXJhbTogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICB0cmFjazogdHJ1ZSxcbiAgd2JyOiB0cnVlIC8vIE5PVEU6IG1lbnVpdGVtJ3MgY2xvc2UgdGFnIHNob3VsZCBiZSBvbWl0dGVkLCBidXQgdGhhdCBjYXVzZXMgcHJvYmxlbXMuXG5cbn07XG5cbi8vIGBvbWl0dGVkQ2xvc2VUYWdzYCBleGNlcHQgdGhhdCBgbWVudWl0ZW1gIHNob3VsZCBzdGlsbCBoYXZlIGl0cyBjbG9zaW5nIHRhZy5cblxudmFyIHZvaWRFbGVtZW50VGFncyA9IF9hc3NpZ24oe1xuICBtZW51aXRlbTogdHJ1ZVxufSwgb21pdHRlZENsb3NlVGFncyk7XG5cbnZhciBIVE1MID0gJ19faHRtbCc7XG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQzID0gbnVsbDtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDMgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xufVxuXG5mdW5jdGlvbiBhc3NlcnRWYWxpZFByb3BzKHRhZywgcHJvcHMpIHtcbiAgaWYgKCFwcm9wcykge1xuICAgIHJldHVybjtcbiAgfSAvLyBOb3RlIHRoZSB1c2Ugb2YgYD09YCB3aGljaCBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkLlxuXG5cbiAgaWYgKHZvaWRFbGVtZW50VGFnc1t0YWddKSB7XG4gICAgaWYgKCEocHJvcHMuY2hpbGRyZW4gPT0gbnVsbCAmJiBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCA9PSBudWxsKSkge1xuICAgICAge1xuICAgICAgICB0aHJvdyBFcnJvciggdGFnICsgXCIgaXMgYSB2b2lkIGVsZW1lbnQgdGFnIGFuZCBtdXN0IG5laXRoZXIgaGF2ZSBgY2hpbGRyZW5gIG5vciB1c2UgYGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MYC5cIiArICggUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQzLmdldFN0YWNrQWRkZW5kdW0oKSApICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICE9IG51bGwpIHtcbiAgICBpZiAoIShwcm9wcy5jaGlsZHJlbiA9PSBudWxsKSkge1xuICAgICAge1xuICAgICAgICB0aHJvdyBFcnJvciggXCJDYW4gb25seSBzZXQgb25lIG9mIGBjaGlsZHJlbmAgb3IgYHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MYC5cIiApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKHR5cGVvZiBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCA9PT0gJ29iamVjdCcgJiYgSFRNTCBpbiBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCkpIHtcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoIFwiYHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MYCBtdXN0IGJlIGluIHRoZSBmb3JtIGB7X19odG1sOiAuLi59YC4gUGxlYXNlIHZpc2l0IGh0dHBzOi8vZmIubWUvcmVhY3QtaW52YXJpYW50LWRhbmdlcm91c2x5LXNldC1pbm5lci1odG1sIGZvciBtb3JlIGluZm9ybWF0aW9uLlwiICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAge1xuICAgIGlmICghcHJvcHMuc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nICYmIHByb3BzLmNvbnRlbnRFZGl0YWJsZSAmJiBwcm9wcy5jaGlsZHJlbiAhPSBudWxsKSB7XG4gICAgICBlcnJvcignQSBjb21wb25lbnQgaXMgYGNvbnRlbnRFZGl0YWJsZWAgYW5kIGNvbnRhaW5zIGBjaGlsZHJlbmAgbWFuYWdlZCBieSAnICsgJ1JlYWN0LiBJdCBpcyBub3cgeW91ciByZXNwb25zaWJpbGl0eSB0byBndWFyYW50ZWUgdGhhdCBub25lIG9mICcgKyAndGhvc2Ugbm9kZXMgYXJlIHVuZXhwZWN0ZWRseSBtb2RpZmllZCBvciBkdXBsaWNhdGVkLiBUaGlzIGlzICcgKyAncHJvYmFibHkgbm90IGludGVudGlvbmFsLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghKHByb3BzLnN0eWxlID09IG51bGwgfHwgdHlwZW9mIHByb3BzLnN0eWxlID09PSAnb2JqZWN0JykpIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJUaGUgYHN0eWxlYCBwcm9wIGV4cGVjdHMgYSBtYXBwaW5nIGZyb20gc3R5bGUgcHJvcGVydGllcyB0byB2YWx1ZXMsIG5vdCBhIHN0cmluZy4gRm9yIGV4YW1wbGUsIHN0eWxlPXt7bWFyZ2luUmlnaHQ6IHNwYWNpbmcgKyAnZW0nfX0gd2hlbiB1c2luZyBKU1guXCIgKyAoIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMy5nZXRTdGFja0FkZGVuZHVtKCkgKSApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENTUyBwcm9wZXJ0aWVzIHdoaWNoIGFjY2VwdCBudW1iZXJzIGJ1dCBhcmUgbm90IGluIHVuaXRzIG9mIFwicHhcIi5cbiAqL1xudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBjb2x1bW5zOiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZEFyZWE6IHRydWUsXG4gIGdyaWRSb3c6IHRydWUsXG4gIGdyaWRSb3dFbmQ6IHRydWUsXG4gIGdyaWRSb3dTcGFuOiB0cnVlLFxuICBncmlkUm93U3RhcnQ6IHRydWUsXG4gIGdyaWRDb2x1bW46IHRydWUsXG4gIGdyaWRDb2x1bW5FbmQ6IHRydWUsXG4gIGdyaWRDb2x1bW5TcGFuOiB0cnVlLFxuICBncmlkQ29sdW1uU3RhcnQ6IHRydWUsXG4gIGZvbnRXZWlnaHQ6IHRydWUsXG4gIGxpbmVDbGFtcDogdHJ1ZSxcbiAgbGluZUhlaWdodDogdHJ1ZSxcbiAgb3BhY2l0eTogdHJ1ZSxcbiAgb3JkZXI6IHRydWUsXG4gIG9ycGhhbnM6IHRydWUsXG4gIHRhYlNpemU6IHRydWUsXG4gIHdpZG93czogdHJ1ZSxcbiAgekluZGV4OiB0cnVlLFxuICB6b29tOiB0cnVlLFxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiB0cnVlLFxuICBmbG9vZE9wYWNpdHk6IHRydWUsXG4gIHN0b3BPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VEYXNoYXJyYXk6IHRydWUsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG4gIHN0cm9rZU1pdGVybGltaXQ6IHRydWUsXG4gIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZVdpZHRoOiB0cnVlXG59O1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cblxuZnVuY3Rpb24gcHJlZml4S2V5KHByZWZpeCwga2V5KSB7XG4gIHJldHVybiBwcmVmaXggKyBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xufVxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqL1xuXG5cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107IC8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIGlzVW5pdGxlc3NOdW1iZXJbcHJlZml4S2V5KHByZWZpeCwgcHJvcCldID0gaXNVbml0bGVzc051bWJlcltwcm9wXTtcbiAgfSk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgdmFsdWUgaW50byB0aGUgcHJvcGVyIGNzcyB3cml0YWJsZSB2YWx1ZS4gVGhlIHN0eWxlIG5hbWUgYG5hbWVgXG4gKiBzaG91bGQgYmUgbG9naWNhbCAobm8gaHlwaGVucyksIGFzIHNwZWNpZmllZFxuICogaW4gYENTU1Byb3BlcnR5LmlzVW5pdGxlc3NOdW1iZXJgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIENTUyBwcm9wZXJ0eSBuYW1lIHN1Y2ggYXMgYHRvcE1hcmdpbmAuXG4gKiBAcGFyYW0geyp9IHZhbHVlIENTUyBwcm9wZXJ0eSB2YWx1ZSBzdWNoIGFzIGAxMHB4YC5cbiAqIEByZXR1cm4ge3N0cmluZ30gTm9ybWFsaXplZCBzdHlsZSB2YWx1ZSB3aXRoIGRpbWVuc2lvbnMgYXBwbGllZC5cbiAqL1xuXG5mdW5jdGlvbiBkYW5nZXJvdXNTdHlsZVZhbHVlKG5hbWUsIHZhbHVlLCBpc0N1c3RvbVByb3BlcnR5KSB7XG4gIC8vIE5vdGUgdGhhdCB3ZSd2ZSByZW1vdmVkIGVzY2FwZVRleHRGb3JCcm93c2VyKCkgY2FsbHMgaGVyZSBzaW5jZSB0aGVcbiAgLy8gd2hvbGUgc3RyaW5nIHdpbGwgYmUgZXNjYXBlZCB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgaW5qZWN0ZWQgaW50b1xuICAvLyB0aGUgbWFya3VwLiBJZiB5b3UgcHJvdmlkZSB1bnNhZmUgdXNlciBkYXRhIGhlcmUgdGhleSBjYW4gaW5qZWN0XG4gIC8vIGFyYml0cmFyeSBDU1Mgd2hpY2ggbWF5IGJlIHByb2JsZW1hdGljIChJIGNvdWxkbid0IHJlcHJvIHRoaXMpOlxuICAvLyBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL1hTU19GaWx0ZXJfRXZhc2lvbl9DaGVhdF9TaGVldFxuICAvLyBodHRwOi8vd3d3LnRoZXNwYW5uZXIuY28udWsvMjAwNy8xMS8yNi91bHRpbWF0ZS14c3MtY3NzLWluamVjdGlvbi9cbiAgLy8gVGhpcyBpcyBub3QgYW4gWFNTIGhvbGUgYnV0IGluc3RlYWQgYSBwb3RlbnRpYWwgQ1NTIGluamVjdGlvbiBpc3N1ZVxuICAvLyB3aGljaCBoYXMgbGVhZCB0byBhIGdyZWF0ZXIgZGlzY3Vzc2lvbiBhYm91dCBob3cgd2UncmUgZ29pbmcgdG9cbiAgLy8gdHJ1c3QgVVJMcyBtb3ZpbmcgZm9yd2FyZC4gU2VlICMyMTE1OTAxXG4gIHZhciBpc0VtcHR5ID0gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyB8fCB2YWx1ZSA9PT0gJyc7XG5cbiAgaWYgKGlzRW1wdHkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoIWlzQ3VzdG9tUHJvcGVydHkgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB2YWx1ZSAhPT0gMCAmJiAhKGlzVW5pdGxlc3NOdW1iZXIuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgaXNVbml0bGVzc051bWJlcltuYW1lXSkpIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnOyAvLyBQcmVzdW1lcyBpbXBsaWNpdCAncHgnIHN1ZmZpeCBmb3IgdW5pdGxlc3MgbnVtYmVyc1xuICB9XG5cbiAgcmV0dXJuICgnJyArIHZhbHVlKS50cmltKCk7XG59XG5cbnZhciB1cHBlcmNhc2VQYXR0ZXJuID0gLyhbQS1aXSkvZztcbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG4vKipcbiAqIEh5cGhlbmF0ZXMgYSBjYW1lbGNhc2VkIENTUyBwcm9wZXJ0eSBuYW1lLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdiYWNrZ3JvdW5kQ29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZC1jb2xvclwiXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdNb3pUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tb3otdHJhbnNpdGlvblwiXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdtc1RyYW5zaXRpb24nKVxuICogICA8IFwiLW1zLXRyYW5zaXRpb25cIlxuICpcbiAqIEFzIE1vZGVybml6ciBzdWdnZXN0cyAoaHR0cDovL21vZGVybml6ci5jb20vZG9jcy8jcHJlZml4ZWQpLCBhbiBgbXNgIHByZWZpeFxuICogaXMgY29udmVydGVkIHRvIGAtbXMtYC5cbiAqL1xuXG5mdW5jdGlvbiBoeXBoZW5hdGVTdHlsZU5hbWUobmFtZSkge1xuICByZXR1cm4gbmFtZS5yZXBsYWNlKHVwcGVyY2FzZVBhdHRlcm4sICctJDEnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UobXNQYXR0ZXJuLCAnLW1zLScpO1xufVxuXG5mdW5jdGlvbiBpc0N1c3RvbUNvbXBvbmVudCh0YWdOYW1lLCBwcm9wcykge1xuICBpZiAodGFnTmFtZS5pbmRleE9mKCctJykgPT09IC0xKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm9wcy5pcyA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICAvLyBUaGVzZSBhcmUgcmVzZXJ2ZWQgU1ZHIGFuZCBNYXRoTUwgZWxlbWVudHMuXG4gICAgLy8gV2UgZG9uJ3QgbWluZCB0aGlzIHdoaXRlbGlzdCB0b28gbXVjaCBiZWNhdXNlIHdlIGV4cGVjdCBpdCB0byBuZXZlciBncm93LlxuICAgIC8vIFRoZSBhbHRlcm5hdGl2ZSBpcyB0byB0cmFjayB0aGUgbmFtZXNwYWNlIGluIGEgZmV3IHBsYWNlcyB3aGljaCBpcyBjb252b2x1dGVkLlxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjdXN0b20tZWxlbWVudHMtY29yZS1jb25jZXB0c1xuICAgIGNhc2UgJ2Fubm90YXRpb24teG1sJzpcbiAgICBjYXNlICdjb2xvci1wcm9maWxlJzpcbiAgICBjYXNlICdmb250LWZhY2UnOlxuICAgIGNhc2UgJ2ZvbnQtZmFjZS1zcmMnOlxuICAgIGNhc2UgJ2ZvbnQtZmFjZS11cmknOlxuICAgIGNhc2UgJ2ZvbnQtZmFjZS1mb3JtYXQnOlxuICAgIGNhc2UgJ2ZvbnQtZmFjZS1uYW1lJzpcbiAgICBjYXNlICdtaXNzaW5nLWdseXBoJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG52YXIgd2FyblZhbGlkU3R5bGUgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICAvLyAnbXNUcmFuc2Zvcm0nIGlzIGNvcnJlY3QsIGJ1dCB0aGUgb3RoZXIgcHJlZml4ZXMgc2hvdWxkIGJlIGNhcGl0YWxpemVkXG4gIHZhciBiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4gPSAvXig/OndlYmtpdHxtb3p8bylbQS1aXS87XG4gIHZhciBtc1BhdHRlcm4kMSA9IC9eLW1zLS87XG4gIHZhciBoeXBoZW5QYXR0ZXJuID0gLy0oLikvZzsgLy8gc3R5bGUgdmFsdWVzIHNob3VsZG4ndCBjb250YWluIGEgc2VtaWNvbG9uXG5cbiAgdmFyIGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybiA9IC87XFxzKiQvO1xuICB2YXIgd2FybmVkU3R5bGVOYW1lcyA9IHt9O1xuICB2YXIgd2FybmVkU3R5bGVWYWx1ZXMgPSB7fTtcbiAgdmFyIHdhcm5lZEZvck5hTlZhbHVlID0gZmFsc2U7XG4gIHZhciB3YXJuZWRGb3JJbmZpbml0eVZhbHVlID0gZmFsc2U7XG5cbiAgdmFyIGNhbWVsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShoeXBoZW5QYXR0ZXJuLCBmdW5jdGlvbiAoXywgY2hhcmFjdGVyKSB7XG4gICAgICByZXR1cm4gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHdhcm5IeXBoZW5hdGVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAod2FybmVkU3R5bGVOYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB3YXJuZWRTdHlsZU5hbWVzW25hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSA9IHRydWU7XG5cbiAgICBlcnJvcignVW5zdXBwb3J0ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8nLCBuYW1lLCAvLyBBcyBBbmRpIFNtaXRoIHN1Z2dlc3RzXG4gICAgLy8gKGh0dHA6Ly93d3cuYW5kaXNtaXRoLmNvbS9ibG9nLzIwMTIvMDIvbW9kZXJuaXpyLXByZWZpeGVkLyksIGFuIGAtbXNgIHByZWZpeFxuICAgIC8vIGlzIGNvbnZlcnRlZCB0byBsb3dlcmNhc2UgYG1zYC5cbiAgICBjYW1lbGl6ZShuYW1lLnJlcGxhY2UobXNQYXR0ZXJuJDEsICdtcy0nKSkpO1xuICB9O1xuXG4gIHZhciB3YXJuQmFkVmVuZG9yZWRTdHlsZU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICh3YXJuZWRTdHlsZU5hbWVzLmhhc093blByb3BlcnR5KG5hbWUpICYmIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRTdHlsZU5hbWVzW25hbWVdID0gdHJ1ZTtcblxuICAgIGVycm9yKCdVbnN1cHBvcnRlZCB2ZW5kb3ItcHJlZml4ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8nLCBuYW1lLCBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSk7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlV2l0aFNlbWljb2xvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh3YXJuZWRTdHlsZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkgJiYgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdID0gdHJ1ZTtcblxuICAgIGVycm9yKFwiU3R5bGUgcHJvcGVydHkgdmFsdWVzIHNob3VsZG4ndCBjb250YWluIGEgc2VtaWNvbG9uLiBcIiArICdUcnkgXCIlczogJXNcIiBpbnN0ZWFkLicsIG5hbWUsIHZhbHVlLnJlcGxhY2UoYmFkU3R5bGVWYWx1ZVdpdGhTZW1pY29sb25QYXR0ZXJuLCAnJykpO1xuICB9O1xuXG4gIHZhciB3YXJuU3R5bGVWYWx1ZUlzTmFOID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHdhcm5lZEZvck5hTlZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkRm9yTmFOVmFsdWUgPSB0cnVlO1xuXG4gICAgZXJyb3IoJ2BOYU5gIGlzIGFuIGludmFsaWQgdmFsdWUgZm9yIHRoZSBgJXNgIGNzcyBzdHlsZSBwcm9wZXJ0eS4nLCBuYW1lKTtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVJc0luZmluaXR5ID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHdhcm5lZEZvckluZmluaXR5VmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRGb3JJbmZpbml0eVZhbHVlID0gdHJ1ZTtcblxuICAgIGVycm9yKCdgSW5maW5pdHlgIGlzIGFuIGludmFsaWQgdmFsdWUgZm9yIHRoZSBgJXNgIGNzcyBzdHlsZSBwcm9wZXJ0eS4nLCBuYW1lKTtcbiAgfTtcblxuICB3YXJuVmFsaWRTdHlsZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChuYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB3YXJuSHlwaGVuYXRlZFN0eWxlTmFtZShuYW1lKTtcbiAgICB9IGVsc2UgaWYgKGJhZFZlbmRvcmVkU3R5bGVOYW1lUGF0dGVybi50ZXN0KG5hbWUpKSB7XG4gICAgICB3YXJuQmFkVmVuZG9yZWRTdHlsZU5hbWUobmFtZSk7XG4gICAgfSBlbHNlIGlmIChiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHdhcm5TdHlsZVZhbHVlV2l0aFNlbWljb2xvbihuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgd2FyblN0eWxlVmFsdWVJc05hTihuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgd2FyblN0eWxlVmFsdWVJc0luZmluaXR5KG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbnZhciB3YXJuVmFsaWRTdHlsZSQxID0gd2FyblZhbGlkU3R5bGU7XG5cbnZhciBhcmlhUHJvcGVydGllcyA9IHtcbiAgJ2FyaWEtY3VycmVudCc6IDAsXG4gIC8vIHN0YXRlXG4gICdhcmlhLWRldGFpbHMnOiAwLFxuICAnYXJpYS1kaXNhYmxlZCc6IDAsXG4gIC8vIHN0YXRlXG4gICdhcmlhLWhpZGRlbic6IDAsXG4gIC8vIHN0YXRlXG4gICdhcmlhLWludmFsaWQnOiAwLFxuICAvLyBzdGF0ZVxuICAnYXJpYS1rZXlzaG9ydGN1dHMnOiAwLFxuICAnYXJpYS1sYWJlbCc6IDAsXG4gICdhcmlhLXJvbGVkZXNjcmlwdGlvbic6IDAsXG4gIC8vIFdpZGdldCBBdHRyaWJ1dGVzXG4gICdhcmlhLWF1dG9jb21wbGV0ZSc6IDAsXG4gICdhcmlhLWNoZWNrZWQnOiAwLFxuICAnYXJpYS1leHBhbmRlZCc6IDAsXG4gICdhcmlhLWhhc3BvcHVwJzogMCxcbiAgJ2FyaWEtbGV2ZWwnOiAwLFxuICAnYXJpYS1tb2RhbCc6IDAsXG4gICdhcmlhLW11bHRpbGluZSc6IDAsXG4gICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IDAsXG4gICdhcmlhLW9yaWVudGF0aW9uJzogMCxcbiAgJ2FyaWEtcGxhY2Vob2xkZXInOiAwLFxuICAnYXJpYS1wcmVzc2VkJzogMCxcbiAgJ2FyaWEtcmVhZG9ubHknOiAwLFxuICAnYXJpYS1yZXF1aXJlZCc6IDAsXG4gICdhcmlhLXNlbGVjdGVkJzogMCxcbiAgJ2FyaWEtc29ydCc6IDAsXG4gICdhcmlhLXZhbHVlbWF4JzogMCxcbiAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAnYXJpYS12YWx1ZW5vdyc6IDAsXG4gICdhcmlhLXZhbHVldGV4dCc6IDAsXG4gIC8vIExpdmUgUmVnaW9uIEF0dHJpYnV0ZXNcbiAgJ2FyaWEtYXRvbWljJzogMCxcbiAgJ2FyaWEtYnVzeSc6IDAsXG4gICdhcmlhLWxpdmUnOiAwLFxuICAnYXJpYS1yZWxldmFudCc6IDAsXG4gIC8vIERyYWctYW5kLURyb3AgQXR0cmlidXRlc1xuICAnYXJpYS1kcm9wZWZmZWN0JzogMCxcbiAgJ2FyaWEtZ3JhYmJlZCc6IDAsXG4gIC8vIFJlbGF0aW9uc2hpcCBBdHRyaWJ1dGVzXG4gICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnOiAwLFxuICAnYXJpYS1jb2xjb3VudCc6IDAsXG4gICdhcmlhLWNvbGluZGV4JzogMCxcbiAgJ2FyaWEtY29sc3Bhbic6IDAsXG4gICdhcmlhLWNvbnRyb2xzJzogMCxcbiAgJ2FyaWEtZGVzY3JpYmVkYnknOiAwLFxuICAnYXJpYS1lcnJvcm1lc3NhZ2UnOiAwLFxuICAnYXJpYS1mbG93dG8nOiAwLFxuICAnYXJpYS1sYWJlbGxlZGJ5JzogMCxcbiAgJ2FyaWEtb3ducyc6IDAsXG4gICdhcmlhLXBvc2luc2V0JzogMCxcbiAgJ2FyaWEtcm93Y291bnQnOiAwLFxuICAnYXJpYS1yb3dpbmRleCc6IDAsXG4gICdhcmlhLXJvd3NwYW4nOiAwLFxuICAnYXJpYS1zZXRzaXplJzogMFxufTtcblxudmFyIHdhcm5lZFByb3BlcnRpZXMgPSB7fTtcbnZhciByQVJJQSA9IG5ldyBSZWdFeHAoJ14oYXJpYSktWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xudmFyIHJBUklBQ2FtZWwgPSBuZXcgUmVnRXhwKCdeKGFyaWEpW0EtWl1bJyArIEFUVFJJQlVURV9OQU1FX0NIQVIgKyAnXSokJyk7XG52YXIgaGFzT3duUHJvcGVydHkkMSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydHkodGFnTmFtZSwgbmFtZSkge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5JDEuY2FsbCh3YXJuZWRQcm9wZXJ0aWVzLCBuYW1lKSAmJiB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAockFSSUFDYW1lbC50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgYXJpYU5hbWUgPSAnYXJpYS0nICsgbmFtZS5zbGljZSg0KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGNvcnJlY3ROYW1lID0gYXJpYVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoYXJpYU5hbWUpID8gYXJpYU5hbWUgOiBudWxsOyAvLyBJZiB0aGlzIGlzIGFuIGFyaWEtKiBhdHRyaWJ1dGUsIGJ1dCBpcyBub3QgbGlzdGVkIGluIHRoZSBrbm93biBET01cbiAgICAgIC8vIERPTSBwcm9wZXJ0aWVzLCB0aGVuIGl0IGlzIGFuIGludmFsaWQgYXJpYS0qIGF0dHJpYnV0ZS5cblxuICAgICAgaWYgKGNvcnJlY3ROYW1lID09IG51bGwpIHtcbiAgICAgICAgZXJyb3IoJ0ludmFsaWQgQVJJQSBhdHRyaWJ1dGUgYCVzYC4gQVJJQSBhdHRyaWJ1dGVzIGZvbGxvdyB0aGUgcGF0dGVybiBhcmlhLSogYW5kIG11c3QgYmUgbG93ZXJjYXNlLicsIG5hbWUpO1xuXG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gLy8gYXJpYS0qIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGxvd2VyY2FzZTsgc3VnZ2VzdCB0aGUgbG93ZXJjYXNlIHZlcnNpb24uXG5cblxuICAgICAgaWYgKG5hbWUgIT09IGNvcnJlY3ROYW1lKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIEFSSUEgYXR0cmlidXRlIGAlc2AuIERpZCB5b3UgbWVhbiBgJXNgPycsIG5hbWUsIGNvcnJlY3ROYW1lKTtcblxuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJBUklBLnRlc3QobmFtZSkpIHtcbiAgICAgIHZhciBsb3dlckNhc2VkTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBzdGFuZGFyZE5hbWUgPSBhcmlhUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShsb3dlckNhc2VkTmFtZSkgPyBsb3dlckNhc2VkTmFtZSA6IG51bGw7IC8vIElmIHRoaXMgaXMgYW4gYXJpYS0qIGF0dHJpYnV0ZSwgYnV0IGlzIG5vdCBsaXN0ZWQgaW4gdGhlIGtub3duIERPTVxuICAgICAgLy8gRE9NIHByb3BlcnRpZXMsIHRoZW4gaXQgaXMgYW4gaW52YWxpZCBhcmlhLSogYXR0cmlidXRlLlxuXG4gICAgICBpZiAoc3RhbmRhcmROYW1lID09IG51bGwpIHtcbiAgICAgICAgd2FybmVkUHJvcGVydGllc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gLy8gYXJpYS0qIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGxvd2VyY2FzZTsgc3VnZ2VzdCB0aGUgbG93ZXJjYXNlIHZlcnNpb24uXG5cblxuICAgICAgaWYgKG5hbWUgIT09IHN0YW5kYXJkTmFtZSkge1xuICAgICAgICBlcnJvcignVW5rbm93biBBUklBIGF0dHJpYnV0ZSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8nLCBuYW1lLCBzdGFuZGFyZE5hbWUpO1xuXG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gd2FybkludmFsaWRBUklBUHJvcHModHlwZSwgcHJvcHMpIHtcbiAge1xuICAgIHZhciBpbnZhbGlkUHJvcHMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgdmFyIGlzVmFsaWQgPSB2YWxpZGF0ZVByb3BlcnR5KHR5cGUsIGtleSk7XG5cbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBpbnZhbGlkUHJvcHMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1bmtub3duUHJvcFN0cmluZyA9IGludmFsaWRQcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHJldHVybiAnYCcgKyBwcm9wICsgJ2AnO1xuICAgIH0pLmpvaW4oJywgJyk7XG5cbiAgICBpZiAoaW52YWxpZFByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXJyb3IoJ0ludmFsaWQgYXJpYSBwcm9wICVzIG9uIDwlcz4gdGFnLiAnICsgJ0ZvciBkZXRhaWxzLCBzZWUgaHR0cHM6Ly9mYi5tZS9pbnZhbGlkLWFyaWEtcHJvcCcsIHVua25vd25Qcm9wU3RyaW5nLCB0eXBlKTtcbiAgICB9IGVsc2UgaWYgKGludmFsaWRQcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBlcnJvcignSW52YWxpZCBhcmlhIHByb3BzICVzIG9uIDwlcz4gdGFnLiAnICsgJ0ZvciBkZXRhaWxzLCBzZWUgaHR0cHM6Ly9mYi5tZS9pbnZhbGlkLWFyaWEtcHJvcCcsIHVua25vd25Qcm9wU3RyaW5nLCB0eXBlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzKHR5cGUsIHByb3BzKSB7XG4gIGlmIChpc0N1c3RvbUNvbXBvbmVudCh0eXBlLCBwcm9wcykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3YXJuSW52YWxpZEFSSUFQcm9wcyh0eXBlLCBwcm9wcyk7XG59XG5cbnZhciBkaWRXYXJuVmFsdWVOdWxsID0gZmFsc2U7XG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnRpZXMkMSh0eXBlLCBwcm9wcykge1xuICB7XG4gICAgaWYgKHR5cGUgIT09ICdpbnB1dCcgJiYgdHlwZSAhPT0gJ3RleHRhcmVhJyAmJiB0eXBlICE9PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wcyAhPSBudWxsICYmIHByb3BzLnZhbHVlID09PSBudWxsICYmICFkaWRXYXJuVmFsdWVOdWxsKSB7XG4gICAgICBkaWRXYXJuVmFsdWVOdWxsID0gdHJ1ZTtcblxuICAgICAgaWYgKHR5cGUgPT09ICdzZWxlY3QnICYmIHByb3BzLm11bHRpcGxlKSB7XG4gICAgICAgIGVycm9yKCdgdmFsdWVgIHByb3Agb24gYCVzYCBzaG91bGQgbm90IGJlIG51bGwuICcgKyAnQ29uc2lkZXIgdXNpbmcgYW4gZW1wdHkgYXJyYXkgd2hlbiBgbXVsdGlwbGVgIGlzIHNldCB0byBgdHJ1ZWAgJyArICd0byBjbGVhciB0aGUgY29tcG9uZW50IG9yIGB1bmRlZmluZWRgIGZvciB1bmNvbnRyb2xsZWQgY29tcG9uZW50cy4nLCB0eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yKCdgdmFsdWVgIHByb3Agb24gYCVzYCBzaG91bGQgbm90IGJlIG51bGwuICcgKyAnQ29uc2lkZXIgdXNpbmcgYW4gZW1wdHkgc3RyaW5nIHRvIGNsZWFyIHRoZSBjb21wb25lbnQgb3IgYHVuZGVmaW5lZGAgJyArICdmb3IgdW5jb250cm9sbGVkIGNvbXBvbmVudHMuJywgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWFwcGluZyBmcm9tIHJlZ2lzdHJhdGlvbiBuYW1lIHRvIHBsdWdpbiBtb2R1bGVcbiAqL1xuXG52YXIgcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMgPSB7fTtcbi8qKlxuICogTWFwcGluZyBmcm9tIGxvd2VyY2FzZSByZWdpc3RyYXRpb24gbmFtZXMgdG8gdGhlIHByb3Blcmx5IGNhc2VkIHZlcnNpb24sXG4gKiB1c2VkIHRvIHdhcm4gaW4gdGhlIGNhc2Ugb2YgbWlzc2luZyBldmVudCBoYW5kbGVycy4gQXZhaWxhYmxlXG4gKiBvbmx5IGluIHRydWUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5cbnZhciBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzID0gIHt9IDsgLy8gVHJ1c3QgdGhlIGRldmVsb3BlciB0byBvbmx5IHVzZSBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzIGluIHRydWVcblxuLy8gV2hlbiBhZGRpbmcgYXR0cmlidXRlcyB0byB0aGUgSFRNTCBvciBTVkcgd2hpdGVsaXN0LCBiZSBzdXJlIHRvXG4vLyBhbHNvIGFkZCB0aGVtIHRvIHRoaXMgbW9kdWxlIHRvIGVuc3VyZSBjYXNpbmcgYW5kIGluY29ycmVjdCBuYW1lXG4vLyB3YXJuaW5ncy5cbnZhciBwb3NzaWJsZVN0YW5kYXJkTmFtZXMgPSB7XG4gIC8vIEhUTUxcbiAgYWNjZXB0OiAnYWNjZXB0JyxcbiAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAnYWNjZXB0LWNoYXJzZXQnOiAnYWNjZXB0Q2hhcnNldCcsXG4gIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gIGFjdGlvbjogJ2FjdGlvbicsXG4gIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gIGFsdDogJ2FsdCcsXG4gIGFzOiAnYXMnLFxuICBhc3luYzogJ2FzeW5jJyxcbiAgYXV0b2NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gIGF1dG9jb21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gIGF1dG9jb3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICBhdXRvZm9jdXM6ICdhdXRvRm9jdXMnLFxuICBhdXRvcGxheTogJ2F1dG9QbGF5JyxcbiAgYXV0b3NhdmU6ICdhdXRvU2F2ZScsXG4gIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgY2VsbHBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gIGNlbGxzcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICBjaGFyc2V0OiAnY2hhclNldCcsXG4gIGNoZWNrZWQ6ICdjaGVja2VkJyxcbiAgY2hpbGRyZW46ICdjaGlsZHJlbicsXG4gIGNpdGU6ICdjaXRlJyxcbiAgY2xhc3M6ICdjbGFzc05hbWUnLFxuICBjbGFzc2lkOiAnY2xhc3NJRCcsXG4gIGNsYXNzbmFtZTogJ2NsYXNzTmFtZScsXG4gIGNvbHM6ICdjb2xzJyxcbiAgY29sc3BhbjogJ2NvbFNwYW4nLFxuICBjb250ZW50OiAnY29udGVudCcsXG4gIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gIGNvbnRleHRtZW51OiAnY29udGV4dE1lbnUnLFxuICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgY29udHJvbHNsaXN0OiAnY29udHJvbHNMaXN0JyxcbiAgY29vcmRzOiAnY29vcmRzJyxcbiAgY3Jvc3NvcmlnaW46ICdjcm9zc09yaWdpbicsXG4gIGRhbmdlcm91c2x5c2V0aW5uZXJodG1sOiAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnLFxuICBkYXRhOiAnZGF0YScsXG4gIGRhdGV0aW1lOiAnZGF0ZVRpbWUnLFxuICBkZWZhdWx0OiAnZGVmYXVsdCcsXG4gIGRlZmF1bHRjaGVja2VkOiAnZGVmYXVsdENoZWNrZWQnLFxuICBkZWZhdWx0dmFsdWU6ICdkZWZhdWx0VmFsdWUnLFxuICBkZWZlcjogJ2RlZmVyJyxcbiAgZGlyOiAnZGlyJyxcbiAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gIGRpc2FibGVwaWN0dXJlaW5waWN0dXJlOiAnZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUnLFxuICBkb3dubG9hZDogJ2Rvd25sb2FkJyxcbiAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgZW5jdHlwZTogJ2VuY1R5cGUnLFxuICBmb3I6ICdodG1sRm9yJyxcbiAgZm9ybTogJ2Zvcm0nLFxuICBmb3JtbWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gIGZvcm1hY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgZm9ybWVuY3R5cGU6ICdmb3JtRW5jVHlwZScsXG4gIGZvcm1ub3ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICBmb3JtdGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gIGZyYW1lYm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICBoZWFkZXJzOiAnaGVhZGVycycsXG4gIGhlaWdodDogJ2hlaWdodCcsXG4gIGhpZGRlbjogJ2hpZGRlbicsXG4gIGhpZ2g6ICdoaWdoJyxcbiAgaHJlZjogJ2hyZWYnLFxuICBocmVmbGFuZzogJ2hyZWZMYW5nJyxcbiAgaHRtbGZvcjogJ2h0bWxGb3InLFxuICBodHRwZXF1aXY6ICdodHRwRXF1aXYnLFxuICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnLFxuICBpY29uOiAnaWNvbicsXG4gIGlkOiAnaWQnLFxuICBpbm5lcmh0bWw6ICdpbm5lckhUTUwnLFxuICBpbnB1dG1vZGU6ICdpbnB1dE1vZGUnLFxuICBpbnRlZ3JpdHk6ICdpbnRlZ3JpdHknLFxuICBpczogJ2lzJyxcbiAgaXRlbWlkOiAnaXRlbUlEJyxcbiAgaXRlbXByb3A6ICdpdGVtUHJvcCcsXG4gIGl0ZW1yZWY6ICdpdGVtUmVmJyxcbiAgaXRlbXNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgaXRlbXR5cGU6ICdpdGVtVHlwZScsXG4gIGtleXBhcmFtczogJ2tleVBhcmFtcycsXG4gIGtleXR5cGU6ICdrZXlUeXBlJyxcbiAga2luZDogJ2tpbmQnLFxuICBsYWJlbDogJ2xhYmVsJyxcbiAgbGFuZzogJ2xhbmcnLFxuICBsaXN0OiAnbGlzdCcsXG4gIGxvb3A6ICdsb29wJyxcbiAgbG93OiAnbG93JyxcbiAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gIG1hcmdpbndpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICBtYXJnaW5oZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICBtYXg6ICdtYXgnLFxuICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICBtZWRpYTogJ21lZGlhJyxcbiAgbWVkaWFncm91cDogJ21lZGlhR3JvdXAnLFxuICBtZXRob2Q6ICdtZXRob2QnLFxuICBtaW46ICdtaW4nLFxuICBtaW5sZW5ndGg6ICdtaW5MZW5ndGgnLFxuICBtdWx0aXBsZTogJ211bHRpcGxlJyxcbiAgbXV0ZWQ6ICdtdXRlZCcsXG4gIG5hbWU6ICduYW1lJyxcbiAgbm9tb2R1bGU6ICdub01vZHVsZScsXG4gIG5vbmNlOiAnbm9uY2UnLFxuICBub3ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gIG9wZW46ICdvcGVuJyxcbiAgb3B0aW11bTogJ29wdGltdW0nLFxuICBwYXR0ZXJuOiAncGF0dGVybicsXG4gIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXInLFxuICBwbGF5c2lubGluZTogJ3BsYXlzSW5saW5lJyxcbiAgcG9zdGVyOiAncG9zdGVyJyxcbiAgcHJlbG9hZDogJ3ByZWxvYWQnLFxuICBwcm9maWxlOiAncHJvZmlsZScsXG4gIHJhZGlvZ3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gIHJlZmVycmVycG9saWN5OiAncmVmZXJyZXJQb2xpY3knLFxuICByZWw6ICdyZWwnLFxuICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgcmV2ZXJzZWQ6ICdyZXZlcnNlZCcsXG4gIHJvbGU6ICdyb2xlJyxcbiAgcm93czogJ3Jvd3MnLFxuICByb3dzcGFuOiAncm93U3BhbicsXG4gIHNhbmRib3g6ICdzYW5kYm94JyxcbiAgc2NvcGU6ICdzY29wZScsXG4gIHNjb3BlZDogJ3Njb3BlZCcsXG4gIHNjcm9sbGluZzogJ3Njcm9sbGluZycsXG4gIHNlYW1sZXNzOiAnc2VhbWxlc3MnLFxuICBzZWxlY3RlZDogJ3NlbGVjdGVkJyxcbiAgc2hhcGU6ICdzaGFwZScsXG4gIHNpemU6ICdzaXplJyxcbiAgc2l6ZXM6ICdzaXplcycsXG4gIHNwYW46ICdzcGFuJyxcbiAgc3BlbGxjaGVjazogJ3NwZWxsQ2hlY2snLFxuICBzcmM6ICdzcmMnLFxuICBzcmNkb2M6ICdzcmNEb2MnLFxuICBzcmNsYW5nOiAnc3JjTGFuZycsXG4gIHNyY3NldDogJ3NyY1NldCcsXG4gIHN0YXJ0OiAnc3RhcnQnLFxuICBzdGVwOiAnc3RlcCcsXG4gIHN0eWxlOiAnc3R5bGUnLFxuICBzdW1tYXJ5OiAnc3VtbWFyeScsXG4gIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuICB0YXJnZXQ6ICd0YXJnZXQnLFxuICB0aXRsZTogJ3RpdGxlJyxcbiAgdHlwZTogJ3R5cGUnLFxuICB1c2VtYXA6ICd1c2VNYXAnLFxuICB2YWx1ZTogJ3ZhbHVlJyxcbiAgd2lkdGg6ICd3aWR0aCcsXG4gIHdtb2RlOiAnd21vZGUnLFxuICB3cmFwOiAnd3JhcCcsXG4gIC8vIFNWR1xuICBhYm91dDogJ2Fib3V0JyxcbiAgYWNjZW50aGVpZ2h0OiAnYWNjZW50SGVpZ2h0JyxcbiAgJ2FjY2VudC1oZWlnaHQnOiAnYWNjZW50SGVpZ2h0JyxcbiAgYWNjdW11bGF0ZTogJ2FjY3VtdWxhdGUnLFxuICBhZGRpdGl2ZTogJ2FkZGl0aXZlJyxcbiAgYWxpZ25tZW50YmFzZWxpbmU6ICdhbGlnbm1lbnRCYXNlbGluZScsXG4gICdhbGlnbm1lbnQtYmFzZWxpbmUnOiAnYWxpZ25tZW50QmFzZWxpbmUnLFxuICBhbGxvd3Jlb3JkZXI6ICdhbGxvd1Jlb3JkZXInLFxuICBhbHBoYWJldGljOiAnYWxwaGFiZXRpYycsXG4gIGFtcGxpdHVkZTogJ2FtcGxpdHVkZScsXG4gIGFyYWJpY2Zvcm06ICdhcmFiaWNGb3JtJyxcbiAgJ2FyYWJpYy1mb3JtJzogJ2FyYWJpY0Zvcm0nLFxuICBhc2NlbnQ6ICdhc2NlbnQnLFxuICBhdHRyaWJ1dGVuYW1lOiAnYXR0cmlidXRlTmFtZScsXG4gIGF0dHJpYnV0ZXR5cGU6ICdhdHRyaWJ1dGVUeXBlJyxcbiAgYXV0b3JldmVyc2U6ICdhdXRvUmV2ZXJzZScsXG4gIGF6aW11dGg6ICdhemltdXRoJyxcbiAgYmFzZWZyZXF1ZW5jeTogJ2Jhc2VGcmVxdWVuY3knLFxuICBiYXNlbGluZXNoaWZ0OiAnYmFzZWxpbmVTaGlmdCcsXG4gICdiYXNlbGluZS1zaGlmdCc6ICdiYXNlbGluZVNoaWZ0JyxcbiAgYmFzZXByb2ZpbGU6ICdiYXNlUHJvZmlsZScsXG4gIGJib3g6ICdiYm94JyxcbiAgYmVnaW46ICdiZWdpbicsXG4gIGJpYXM6ICdiaWFzJyxcbiAgYnk6ICdieScsXG4gIGNhbGNtb2RlOiAnY2FsY01vZGUnLFxuICBjYXBoZWlnaHQ6ICdjYXBIZWlnaHQnLFxuICAnY2FwLWhlaWdodCc6ICdjYXBIZWlnaHQnLFxuICBjbGlwOiAnY2xpcCcsXG4gIGNsaXBwYXRoOiAnY2xpcFBhdGgnLFxuICAnY2xpcC1wYXRoJzogJ2NsaXBQYXRoJyxcbiAgY2xpcHBhdGh1bml0czogJ2NsaXBQYXRoVW5pdHMnLFxuICBjbGlwcnVsZTogJ2NsaXBSdWxlJyxcbiAgJ2NsaXAtcnVsZSc6ICdjbGlwUnVsZScsXG4gIGNvbG9yOiAnY29sb3InLFxuICBjb2xvcmludGVycG9sYXRpb246ICdjb2xvckludGVycG9sYXRpb24nLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbic6ICdjb2xvckludGVycG9sYXRpb24nLFxuICBjb2xvcmludGVycG9sYXRpb25maWx0ZXJzOiAnY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVycycsXG4gICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnOiAnY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVycycsXG4gIGNvbG9ycHJvZmlsZTogJ2NvbG9yUHJvZmlsZScsXG4gICdjb2xvci1wcm9maWxlJzogJ2NvbG9yUHJvZmlsZScsXG4gIGNvbG9ycmVuZGVyaW5nOiAnY29sb3JSZW5kZXJpbmcnLFxuICAnY29sb3ItcmVuZGVyaW5nJzogJ2NvbG9yUmVuZGVyaW5nJyxcbiAgY29udGVudHNjcmlwdHR5cGU6ICdjb250ZW50U2NyaXB0VHlwZScsXG4gIGNvbnRlbnRzdHlsZXR5cGU6ICdjb250ZW50U3R5bGVUeXBlJyxcbiAgY3Vyc29yOiAnY3Vyc29yJyxcbiAgY3g6ICdjeCcsXG4gIGN5OiAnY3knLFxuICBkOiAnZCcsXG4gIGRhdGF0eXBlOiAnZGF0YXR5cGUnLFxuICBkZWNlbGVyYXRlOiAnZGVjZWxlcmF0ZScsXG4gIGRlc2NlbnQ6ICdkZXNjZW50JyxcbiAgZGlmZnVzZWNvbnN0YW50OiAnZGlmZnVzZUNvbnN0YW50JyxcbiAgZGlyZWN0aW9uOiAnZGlyZWN0aW9uJyxcbiAgZGlzcGxheTogJ2Rpc3BsYXknLFxuICBkaXZpc29yOiAnZGl2aXNvcicsXG4gIGRvbWluYW50YmFzZWxpbmU6ICdkb21pbmFudEJhc2VsaW5lJyxcbiAgJ2RvbWluYW50LWJhc2VsaW5lJzogJ2RvbWluYW50QmFzZWxpbmUnLFxuICBkdXI6ICdkdXInLFxuICBkeDogJ2R4JyxcbiAgZHk6ICdkeScsXG4gIGVkZ2Vtb2RlOiAnZWRnZU1vZGUnLFxuICBlbGV2YXRpb246ICdlbGV2YXRpb24nLFxuICBlbmFibGViYWNrZ3JvdW5kOiAnZW5hYmxlQmFja2dyb3VuZCcsXG4gICdlbmFibGUtYmFja2dyb3VuZCc6ICdlbmFibGVCYWNrZ3JvdW5kJyxcbiAgZW5kOiAnZW5kJyxcbiAgZXhwb25lbnQ6ICdleHBvbmVudCcsXG4gIGV4dGVybmFscmVzb3VyY2VzcmVxdWlyZWQ6ICdleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkJyxcbiAgZmlsbDogJ2ZpbGwnLFxuICBmaWxsb3BhY2l0eTogJ2ZpbGxPcGFjaXR5JyxcbiAgJ2ZpbGwtb3BhY2l0eSc6ICdmaWxsT3BhY2l0eScsXG4gIGZpbGxydWxlOiAnZmlsbFJ1bGUnLFxuICAnZmlsbC1ydWxlJzogJ2ZpbGxSdWxlJyxcbiAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgZmlsdGVycmVzOiAnZmlsdGVyUmVzJyxcbiAgZmlsdGVydW5pdHM6ICdmaWx0ZXJVbml0cycsXG4gIGZsb29kb3BhY2l0eTogJ2Zsb29kT3BhY2l0eScsXG4gICdmbG9vZC1vcGFjaXR5JzogJ2Zsb29kT3BhY2l0eScsXG4gIGZsb29kY29sb3I6ICdmbG9vZENvbG9yJyxcbiAgJ2Zsb29kLWNvbG9yJzogJ2Zsb29kQ29sb3InLFxuICBmb2N1c2FibGU6ICdmb2N1c2FibGUnLFxuICBmb250ZmFtaWx5OiAnZm9udEZhbWlseScsXG4gICdmb250LWZhbWlseSc6ICdmb250RmFtaWx5JyxcbiAgZm9udHNpemU6ICdmb250U2l6ZScsXG4gICdmb250LXNpemUnOiAnZm9udFNpemUnLFxuICBmb250c2l6ZWFkanVzdDogJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2ZvbnQtc2l6ZS1hZGp1c3QnOiAnZm9udFNpemVBZGp1c3QnLFxuICBmb250c3RyZXRjaDogJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnQtc3RyZXRjaCc6ICdmb250U3RyZXRjaCcsXG4gIGZvbnRzdHlsZTogJ2ZvbnRTdHlsZScsXG4gICdmb250LXN0eWxlJzogJ2ZvbnRTdHlsZScsXG4gIGZvbnR2YXJpYW50OiAnZm9udFZhcmlhbnQnLFxuICAnZm9udC12YXJpYW50JzogJ2ZvbnRWYXJpYW50JyxcbiAgZm9udHdlaWdodDogJ2ZvbnRXZWlnaHQnLFxuICAnZm9udC13ZWlnaHQnOiAnZm9udFdlaWdodCcsXG4gIGZvcm1hdDogJ2Zvcm1hdCcsXG4gIGZyb206ICdmcm9tJyxcbiAgZng6ICdmeCcsXG4gIGZ5OiAnZnknLFxuICBnMTogJ2cxJyxcbiAgZzI6ICdnMicsXG4gIGdseXBobmFtZTogJ2dseXBoTmFtZScsXG4gICdnbHlwaC1uYW1lJzogJ2dseXBoTmFtZScsXG4gIGdseXBob3JpZW50YXRpb25ob3Jpem9udGFsOiAnZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWwnLFxuICAnZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbCc6ICdnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnRhbCcsXG4gIGdseXBob3JpZW50YXRpb252ZXJ0aWNhbDogJ2dseXBoT3JpZW50YXRpb25WZXJ0aWNhbCcsXG4gICdnbHlwaC1vcmllbnRhdGlvbi12ZXJ0aWNhbCc6ICdnbHlwaE9yaWVudGF0aW9uVmVydGljYWwnLFxuICBnbHlwaHJlZjogJ2dseXBoUmVmJyxcbiAgZ3JhZGllbnR0cmFuc2Zvcm06ICdncmFkaWVudFRyYW5zZm9ybScsXG4gIGdyYWRpZW50dW5pdHM6ICdncmFkaWVudFVuaXRzJyxcbiAgaGFuZ2luZzogJ2hhbmdpbmcnLFxuICBob3JpemFkdng6ICdob3JpekFkdlgnLFxuICAnaG9yaXotYWR2LXgnOiAnaG9yaXpBZHZYJyxcbiAgaG9yaXpvcmlnaW54OiAnaG9yaXpPcmlnaW5YJyxcbiAgJ2hvcml6LW9yaWdpbi14JzogJ2hvcml6T3JpZ2luWCcsXG4gIGlkZW9ncmFwaGljOiAnaWRlb2dyYXBoaWMnLFxuICBpbWFnZXJlbmRlcmluZzogJ2ltYWdlUmVuZGVyaW5nJyxcbiAgJ2ltYWdlLXJlbmRlcmluZyc6ICdpbWFnZVJlbmRlcmluZycsXG4gIGluMjogJ2luMicsXG4gIGluOiAnaW4nLFxuICBpbmxpc3Q6ICdpbmxpc3QnLFxuICBpbnRlcmNlcHQ6ICdpbnRlcmNlcHQnLFxuICBrMTogJ2sxJyxcbiAgazI6ICdrMicsXG4gIGszOiAnazMnLFxuICBrNDogJ2s0JyxcbiAgazogJ2snLFxuICBrZXJuZWxtYXRyaXg6ICdrZXJuZWxNYXRyaXgnLFxuICBrZXJuZWx1bml0bGVuZ3RoOiAna2VybmVsVW5pdExlbmd0aCcsXG4gIGtlcm5pbmc6ICdrZXJuaW5nJyxcbiAga2V5cG9pbnRzOiAna2V5UG9pbnRzJyxcbiAga2V5c3BsaW5lczogJ2tleVNwbGluZXMnLFxuICBrZXl0aW1lczogJ2tleVRpbWVzJyxcbiAgbGVuZ3RoYWRqdXN0OiAnbGVuZ3RoQWRqdXN0JyxcbiAgbGV0dGVyc3BhY2luZzogJ2xldHRlclNwYWNpbmcnLFxuICAnbGV0dGVyLXNwYWNpbmcnOiAnbGV0dGVyU3BhY2luZycsXG4gIGxpZ2h0aW5nY29sb3I6ICdsaWdodGluZ0NvbG9yJyxcbiAgJ2xpZ2h0aW5nLWNvbG9yJzogJ2xpZ2h0aW5nQ29sb3InLFxuICBsaW1pdGluZ2NvbmVhbmdsZTogJ2xpbWl0aW5nQ29uZUFuZ2xlJyxcbiAgbG9jYWw6ICdsb2NhbCcsXG4gIG1hcmtlcmVuZDogJ21hcmtlckVuZCcsXG4gICdtYXJrZXItZW5kJzogJ21hcmtlckVuZCcsXG4gIG1hcmtlcmhlaWdodDogJ21hcmtlckhlaWdodCcsXG4gIG1hcmtlcm1pZDogJ21hcmtlck1pZCcsXG4gICdtYXJrZXItbWlkJzogJ21hcmtlck1pZCcsXG4gIG1hcmtlcnN0YXJ0OiAnbWFya2VyU3RhcnQnLFxuICAnbWFya2VyLXN0YXJ0JzogJ21hcmtlclN0YXJ0JyxcbiAgbWFya2VydW5pdHM6ICdtYXJrZXJVbml0cycsXG4gIG1hcmtlcndpZHRoOiAnbWFya2VyV2lkdGgnLFxuICBtYXNrOiAnbWFzaycsXG4gIG1hc2tjb250ZW50dW5pdHM6ICdtYXNrQ29udGVudFVuaXRzJyxcbiAgbWFza3VuaXRzOiAnbWFza1VuaXRzJyxcbiAgbWF0aGVtYXRpY2FsOiAnbWF0aGVtYXRpY2FsJyxcbiAgbW9kZTogJ21vZGUnLFxuICBudW1vY3RhdmVzOiAnbnVtT2N0YXZlcycsXG4gIG9mZnNldDogJ29mZnNldCcsXG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgb3BlcmF0b3I6ICdvcGVyYXRvcicsXG4gIG9yZGVyOiAnb3JkZXInLFxuICBvcmllbnQ6ICdvcmllbnQnLFxuICBvcmllbnRhdGlvbjogJ29yaWVudGF0aW9uJyxcbiAgb3JpZ2luOiAnb3JpZ2luJyxcbiAgb3ZlcmZsb3c6ICdvdmVyZmxvdycsXG4gIG92ZXJsaW5lcG9zaXRpb246ICdvdmVybGluZVBvc2l0aW9uJyxcbiAgJ292ZXJsaW5lLXBvc2l0aW9uJzogJ292ZXJsaW5lUG9zaXRpb24nLFxuICBvdmVybGluZXRoaWNrbmVzczogJ292ZXJsaW5lVGhpY2tuZXNzJyxcbiAgJ292ZXJsaW5lLXRoaWNrbmVzcyc6ICdvdmVybGluZVRoaWNrbmVzcycsXG4gIHBhaW50b3JkZXI6ICdwYWludE9yZGVyJyxcbiAgJ3BhaW50LW9yZGVyJzogJ3BhaW50T3JkZXInLFxuICBwYW5vc2UxOiAncGFub3NlMScsXG4gICdwYW5vc2UtMSc6ICdwYW5vc2UxJyxcbiAgcGF0aGxlbmd0aDogJ3BhdGhMZW5ndGgnLFxuICBwYXR0ZXJuY29udGVudHVuaXRzOiAncGF0dGVybkNvbnRlbnRVbml0cycsXG4gIHBhdHRlcm50cmFuc2Zvcm06ICdwYXR0ZXJuVHJhbnNmb3JtJyxcbiAgcGF0dGVybnVuaXRzOiAncGF0dGVyblVuaXRzJyxcbiAgcG9pbnRlcmV2ZW50czogJ3BvaW50ZXJFdmVudHMnLFxuICAncG9pbnRlci1ldmVudHMnOiAncG9pbnRlckV2ZW50cycsXG4gIHBvaW50czogJ3BvaW50cycsXG4gIHBvaW50c2F0eDogJ3BvaW50c0F0WCcsXG4gIHBvaW50c2F0eTogJ3BvaW50c0F0WScsXG4gIHBvaW50c2F0ejogJ3BvaW50c0F0WicsXG4gIHByZWZpeDogJ3ByZWZpeCcsXG4gIHByZXNlcnZlYWxwaGE6ICdwcmVzZXJ2ZUFscGhhJyxcbiAgcHJlc2VydmVhc3BlY3RyYXRpbzogJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLFxuICBwcmltaXRpdmV1bml0czogJ3ByaW1pdGl2ZVVuaXRzJyxcbiAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gIHI6ICdyJyxcbiAgcmFkaXVzOiAncmFkaXVzJyxcbiAgcmVmeDogJ3JlZlgnLFxuICByZWZ5OiAncmVmWScsXG4gIHJlbmRlcmluZ2ludGVudDogJ3JlbmRlcmluZ0ludGVudCcsXG4gICdyZW5kZXJpbmctaW50ZW50JzogJ3JlbmRlcmluZ0ludGVudCcsXG4gIHJlcGVhdGNvdW50OiAncmVwZWF0Q291bnQnLFxuICByZXBlYXRkdXI6ICdyZXBlYXREdXInLFxuICByZXF1aXJlZGV4dGVuc2lvbnM6ICdyZXF1aXJlZEV4dGVuc2lvbnMnLFxuICByZXF1aXJlZGZlYXR1cmVzOiAncmVxdWlyZWRGZWF0dXJlcycsXG4gIHJlc291cmNlOiAncmVzb3VyY2UnLFxuICByZXN0YXJ0OiAncmVzdGFydCcsXG4gIHJlc3VsdDogJ3Jlc3VsdCcsXG4gIHJlc3VsdHM6ICdyZXN1bHRzJyxcbiAgcm90YXRlOiAncm90YXRlJyxcbiAgcng6ICdyeCcsXG4gIHJ5OiAncnknLFxuICBzY2FsZTogJ3NjYWxlJyxcbiAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gIHNlZWQ6ICdzZWVkJyxcbiAgc2hhcGVyZW5kZXJpbmc6ICdzaGFwZVJlbmRlcmluZycsXG4gICdzaGFwZS1yZW5kZXJpbmcnOiAnc2hhcGVSZW5kZXJpbmcnLFxuICBzbG9wZTogJ3Nsb3BlJyxcbiAgc3BhY2luZzogJ3NwYWNpbmcnLFxuICBzcGVjdWxhcmNvbnN0YW50OiAnc3BlY3VsYXJDb25zdGFudCcsXG4gIHNwZWN1bGFyZXhwb25lbnQ6ICdzcGVjdWxhckV4cG9uZW50JyxcbiAgc3BlZWQ6ICdzcGVlZCcsXG4gIHNwcmVhZG1ldGhvZDogJ3NwcmVhZE1ldGhvZCcsXG4gIHN0YXJ0b2Zmc2V0OiAnc3RhcnRPZmZzZXQnLFxuICBzdGRkZXZpYXRpb246ICdzdGREZXZpYXRpb24nLFxuICBzdGVtaDogJ3N0ZW1oJyxcbiAgc3RlbXY6ICdzdGVtdicsXG4gIHN0aXRjaHRpbGVzOiAnc3RpdGNoVGlsZXMnLFxuICBzdG9wY29sb3I6ICdzdG9wQ29sb3InLFxuICAnc3RvcC1jb2xvcic6ICdzdG9wQ29sb3InLFxuICBzdG9wb3BhY2l0eTogJ3N0b3BPcGFjaXR5JyxcbiAgJ3N0b3Atb3BhY2l0eSc6ICdzdG9wT3BhY2l0eScsXG4gIHN0cmlrZXRocm91Z2hwb3NpdGlvbjogJ3N0cmlrZXRocm91Z2hQb3NpdGlvbicsXG4gICdzdHJpa2V0aHJvdWdoLXBvc2l0aW9uJzogJ3N0cmlrZXRocm91Z2hQb3NpdGlvbicsXG4gIHN0cmlrZXRocm91Z2h0aGlja25lc3M6ICdzdHJpa2V0aHJvdWdoVGhpY2tuZXNzJyxcbiAgJ3N0cmlrZXRocm91Z2gtdGhpY2tuZXNzJzogJ3N0cmlrZXRocm91Z2hUaGlja25lc3MnLFxuICBzdHJpbmc6ICdzdHJpbmcnLFxuICBzdHJva2U6ICdzdHJva2UnLFxuICBzdHJva2VkYXNoYXJyYXk6ICdzdHJva2VEYXNoYXJyYXknLFxuICAnc3Ryb2tlLWRhc2hhcnJheSc6ICdzdHJva2VEYXNoYXJyYXknLFxuICBzdHJva2VkYXNob2Zmc2V0OiAnc3Ryb2tlRGFzaG9mZnNldCcsXG4gICdzdHJva2UtZGFzaG9mZnNldCc6ICdzdHJva2VEYXNob2Zmc2V0JyxcbiAgc3Ryb2tlbGluZWNhcDogJ3N0cm9rZUxpbmVjYXAnLFxuICAnc3Ryb2tlLWxpbmVjYXAnOiAnc3Ryb2tlTGluZWNhcCcsXG4gIHN0cm9rZWxpbmVqb2luOiAnc3Ryb2tlTGluZWpvaW4nLFxuICAnc3Ryb2tlLWxpbmVqb2luJzogJ3N0cm9rZUxpbmVqb2luJyxcbiAgc3Ryb2tlbWl0ZXJsaW1pdDogJ3N0cm9rZU1pdGVybGltaXQnLFxuICAnc3Ryb2tlLW1pdGVybGltaXQnOiAnc3Ryb2tlTWl0ZXJsaW1pdCcsXG4gIHN0cm9rZXdpZHRoOiAnc3Ryb2tlV2lkdGgnLFxuICAnc3Ryb2tlLXdpZHRoJzogJ3N0cm9rZVdpZHRoJyxcbiAgc3Ryb2tlb3BhY2l0eTogJ3N0cm9rZU9wYWNpdHknLFxuICAnc3Ryb2tlLW9wYWNpdHknOiAnc3Ryb2tlT3BhY2l0eScsXG4gIHN1cHByZXNzY29udGVudGVkaXRhYmxld2FybmluZzogJ3N1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZycsXG4gIHN1cHByZXNzaHlkcmF0aW9ud2FybmluZzogJ3N1cHByZXNzSHlkcmF0aW9uV2FybmluZycsXG4gIHN1cmZhY2VzY2FsZTogJ3N1cmZhY2VTY2FsZScsXG4gIHN5c3RlbWxhbmd1YWdlOiAnc3lzdGVtTGFuZ3VhZ2UnLFxuICB0YWJsZXZhbHVlczogJ3RhYmxlVmFsdWVzJyxcbiAgdGFyZ2V0eDogJ3RhcmdldFgnLFxuICB0YXJnZXR5OiAndGFyZ2V0WScsXG4gIHRleHRhbmNob3I6ICd0ZXh0QW5jaG9yJyxcbiAgJ3RleHQtYW5jaG9yJzogJ3RleHRBbmNob3InLFxuICB0ZXh0ZGVjb3JhdGlvbjogJ3RleHREZWNvcmF0aW9uJyxcbiAgJ3RleHQtZGVjb3JhdGlvbic6ICd0ZXh0RGVjb3JhdGlvbicsXG4gIHRleHRsZW5ndGg6ICd0ZXh0TGVuZ3RoJyxcbiAgdGV4dHJlbmRlcmluZzogJ3RleHRSZW5kZXJpbmcnLFxuICAndGV4dC1yZW5kZXJpbmcnOiAndGV4dFJlbmRlcmluZycsXG4gIHRvOiAndG8nLFxuICB0cmFuc2Zvcm06ICd0cmFuc2Zvcm0nLFxuICB0eXBlb2Y6ICd0eXBlb2YnLFxuICB1MTogJ3UxJyxcbiAgdTI6ICd1MicsXG4gIHVuZGVybGluZXBvc2l0aW9uOiAndW5kZXJsaW5lUG9zaXRpb24nLFxuICAndW5kZXJsaW5lLXBvc2l0aW9uJzogJ3VuZGVybGluZVBvc2l0aW9uJyxcbiAgdW5kZXJsaW5ldGhpY2tuZXNzOiAndW5kZXJsaW5lVGhpY2tuZXNzJyxcbiAgJ3VuZGVybGluZS10aGlja25lc3MnOiAndW5kZXJsaW5lVGhpY2tuZXNzJyxcbiAgdW5pY29kZTogJ3VuaWNvZGUnLFxuICB1bmljb2RlYmlkaTogJ3VuaWNvZGVCaWRpJyxcbiAgJ3VuaWNvZGUtYmlkaSc6ICd1bmljb2RlQmlkaScsXG4gIHVuaWNvZGVyYW5nZTogJ3VuaWNvZGVSYW5nZScsXG4gICd1bmljb2RlLXJhbmdlJzogJ3VuaWNvZGVSYW5nZScsXG4gIHVuaXRzcGVyZW06ICd1bml0c1BlckVtJyxcbiAgJ3VuaXRzLXBlci1lbSc6ICd1bml0c1BlckVtJyxcbiAgdW5zZWxlY3RhYmxlOiAndW5zZWxlY3RhYmxlJyxcbiAgdmFscGhhYmV0aWM6ICd2QWxwaGFiZXRpYycsXG4gICd2LWFscGhhYmV0aWMnOiAndkFscGhhYmV0aWMnLFxuICB2YWx1ZXM6ICd2YWx1ZXMnLFxuICB2ZWN0b3JlZmZlY3Q6ICd2ZWN0b3JFZmZlY3QnLFxuICAndmVjdG9yLWVmZmVjdCc6ICd2ZWN0b3JFZmZlY3QnLFxuICB2ZXJzaW9uOiAndmVyc2lvbicsXG4gIHZlcnRhZHZ5OiAndmVydEFkdlknLFxuICAndmVydC1hZHYteSc6ICd2ZXJ0QWR2WScsXG4gIHZlcnRvcmlnaW54OiAndmVydE9yaWdpblgnLFxuICAndmVydC1vcmlnaW4teCc6ICd2ZXJ0T3JpZ2luWCcsXG4gIHZlcnRvcmlnaW55OiAndmVydE9yaWdpblknLFxuICAndmVydC1vcmlnaW4teSc6ICd2ZXJ0T3JpZ2luWScsXG4gIHZoYW5naW5nOiAndkhhbmdpbmcnLFxuICAndi1oYW5naW5nJzogJ3ZIYW5naW5nJyxcbiAgdmlkZW9ncmFwaGljOiAndklkZW9ncmFwaGljJyxcbiAgJ3YtaWRlb2dyYXBoaWMnOiAndklkZW9ncmFwaGljJyxcbiAgdmlld2JveDogJ3ZpZXdCb3gnLFxuICB2aWV3dGFyZ2V0OiAndmlld1RhcmdldCcsXG4gIHZpc2liaWxpdHk6ICd2aXNpYmlsaXR5JyxcbiAgdm1hdGhlbWF0aWNhbDogJ3ZNYXRoZW1hdGljYWwnLFxuICAndi1tYXRoZW1hdGljYWwnOiAndk1hdGhlbWF0aWNhbCcsXG4gIHZvY2FiOiAndm9jYWInLFxuICB3aWR0aHM6ICd3aWR0aHMnLFxuICB3b3Jkc3BhY2luZzogJ3dvcmRTcGFjaW5nJyxcbiAgJ3dvcmQtc3BhY2luZyc6ICd3b3JkU3BhY2luZycsXG4gIHdyaXRpbmdtb2RlOiAnd3JpdGluZ01vZGUnLFxuICAnd3JpdGluZy1tb2RlJzogJ3dyaXRpbmdNb2RlJyxcbiAgeDE6ICd4MScsXG4gIHgyOiAneDInLFxuICB4OiAneCcsXG4gIHhjaGFubmVsc2VsZWN0b3I6ICd4Q2hhbm5lbFNlbGVjdG9yJyxcbiAgeGhlaWdodDogJ3hIZWlnaHQnLFxuICAneC1oZWlnaHQnOiAneEhlaWdodCcsXG4gIHhsaW5rYWN0dWF0ZTogJ3hsaW5rQWN0dWF0ZScsXG4gICd4bGluazphY3R1YXRlJzogJ3hsaW5rQWN0dWF0ZScsXG4gIHhsaW5rYXJjcm9sZTogJ3hsaW5rQXJjcm9sZScsXG4gICd4bGluazphcmNyb2xlJzogJ3hsaW5rQXJjcm9sZScsXG4gIHhsaW5raHJlZjogJ3hsaW5rSHJlZicsXG4gICd4bGluazpocmVmJzogJ3hsaW5rSHJlZicsXG4gIHhsaW5rcm9sZTogJ3hsaW5rUm9sZScsXG4gICd4bGluazpyb2xlJzogJ3hsaW5rUm9sZScsXG4gIHhsaW5rc2hvdzogJ3hsaW5rU2hvdycsXG4gICd4bGluazpzaG93JzogJ3hsaW5rU2hvdycsXG4gIHhsaW5rdGl0bGU6ICd4bGlua1RpdGxlJyxcbiAgJ3hsaW5rOnRpdGxlJzogJ3hsaW5rVGl0bGUnLFxuICB4bGlua3R5cGU6ICd4bGlua1R5cGUnLFxuICAneGxpbms6dHlwZSc6ICd4bGlua1R5cGUnLFxuICB4bWxiYXNlOiAneG1sQmFzZScsXG4gICd4bWw6YmFzZSc6ICd4bWxCYXNlJyxcbiAgeG1sbGFuZzogJ3htbExhbmcnLFxuICAneG1sOmxhbmcnOiAneG1sTGFuZycsXG4gIHhtbG5zOiAneG1sbnMnLFxuICAneG1sOnNwYWNlJzogJ3htbFNwYWNlJyxcbiAgeG1sbnN4bGluazogJ3htbG5zWGxpbmsnLFxuICAneG1sbnM6eGxpbmsnOiAneG1sbnNYbGluaycsXG4gIHhtbHNwYWNlOiAneG1sU3BhY2UnLFxuICB5MTogJ3kxJyxcbiAgeTI6ICd5MicsXG4gIHk6ICd5JyxcbiAgeWNoYW5uZWxzZWxlY3RvcjogJ3lDaGFubmVsU2VsZWN0b3InLFxuICB6OiAneicsXG4gIHpvb21hbmRwYW46ICd6b29tQW5kUGFuJ1xufTtcblxudmFyIHZhbGlkYXRlUHJvcGVydHkkMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciB3YXJuZWRQcm9wZXJ0aWVzJDEgPSB7fTtcbiAgdmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBFVkVOVF9OQU1FX1JFR0VYID0gL15vbi4vO1xuICB2YXIgSU5WQUxJRF9FVkVOVF9OQU1FX1JFR0VYID0gL15vblteQS1aXS87XG4gIHZhciByQVJJQSQxID0gbmV3IFJlZ0V4cCgnXihhcmlhKS1bJyArIEFUVFJJQlVURV9OQU1FX0NIQVIgKyAnXSokJyk7XG4gIHZhciByQVJJQUNhbWVsJDEgPSBuZXcgUmVnRXhwKCdeKGFyaWEpW0EtWl1bJyArIEFUVFJJQlVURV9OQU1FX0NIQVIgKyAnXSokJyk7XG5cbiAgdmFsaWRhdGVQcm9wZXJ0eSQxID0gZnVuY3Rpb24gKHRhZ05hbWUsIG5hbWUsIHZhbHVlLCBjYW5Vc2VFdmVudFN5c3RlbSkge1xuICAgIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbCh3YXJuZWRQcm9wZXJ0aWVzJDEsIG5hbWUpICYmIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGxvd2VyQ2FzZWROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnb25mb2N1c2luJyB8fCBsb3dlckNhc2VkTmFtZSA9PT0gJ29uZm9jdXNvdXQnKSB7XG4gICAgICBlcnJvcignUmVhY3QgdXNlcyBvbkZvY3VzIGFuZCBvbkJsdXIgaW5zdGVhZCBvZiBvbkZvY3VzSW4gYW5kIG9uRm9jdXNPdXQuICcgKyAnQWxsIFJlYWN0IGV2ZW50cyBhcmUgbm9ybWFsaXplZCB0byBidWJibGUsIHNvIG9uRm9jdXNJbiBhbmQgb25Gb2N1c091dCAnICsgJ2FyZSBub3QgbmVlZGVkL3N1cHBvcnRlZCBieSBSZWFjdC4nKTtcblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gLy8gV2UgY2FuJ3QgcmVseSBvbiB0aGUgZXZlbnQgc3lzdGVtIGJlaW5nIGluamVjdGVkIG9uIHRoZSBzZXJ2ZXIuXG5cblxuICAgIGlmIChjYW5Vc2VFdmVudFN5c3RlbSkge1xuICAgICAgaWYgKHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVnaXN0cmF0aW9uTmFtZSA9IHBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpID8gcG9zc2libGVSZWdpc3RyYXRpb25OYW1lc1tsb3dlckNhc2VkTmFtZV0gOiBudWxsO1xuXG4gICAgICBpZiAocmVnaXN0cmF0aW9uTmFtZSAhPSBudWxsKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIGV2ZW50IGhhbmRsZXIgcHJvcGVydHkgYCVzYC4gRGlkIHlvdSBtZWFuIGAlc2A/JywgbmFtZSwgcmVnaXN0cmF0aW9uTmFtZSk7XG5cbiAgICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChFVkVOVF9OQU1FX1JFR0VYLnRlc3QobmFtZSkpIHtcbiAgICAgICAgZXJyb3IoJ1Vua25vd24gZXZlbnQgaGFuZGxlciBwcm9wZXJ0eSBgJXNgLiBJdCB3aWxsIGJlIGlnbm9yZWQuJywgbmFtZSk7XG5cbiAgICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChFVkVOVF9OQU1FX1JFR0VYLnRlc3QobmFtZSkpIHtcbiAgICAgIC8vIElmIG5vIGV2ZW50IHBsdWdpbnMgaGF2ZSBiZWVuIGluamVjdGVkLCB3ZSBhcmUgaW4gYSBzZXJ2ZXIgZW52aXJvbm1lbnQuXG4gICAgICAvLyBTbyB3ZSBjYW4ndCB0ZWxsIGlmIHRoZSBldmVudCBuYW1lIGlzIGNvcnJlY3QgZm9yIHN1cmUsIGJ1dCB3ZSBjYW4gZmlsdGVyXG4gICAgICAvLyBvdXQga25vd24gYmFkIG9uZXMgbGlrZSBgb25jbGlja2AuIFdlIGNhbid0IHN1Z2dlc3QgYSBzcGVjaWZpYyByZXBsYWNlbWVudCB0aG91Z2guXG4gICAgICBpZiAoSU5WQUxJRF9FVkVOVF9OQU1FX1JFR0VYLnRlc3QobmFtZSkpIHtcbiAgICAgICAgZXJyb3IoJ0ludmFsaWQgZXZlbnQgaGFuZGxlciBwcm9wZXJ0eSBgJXNgLiAnICsgJ1JlYWN0IGV2ZW50cyB1c2UgdGhlIGNhbWVsQ2FzZSBuYW1pbmcgY29udmVudGlvbiwgZm9yIGV4YW1wbGUgYG9uQ2xpY2tgLicsIG5hbWUpO1xuICAgICAgfVxuXG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAvLyBMZXQgdGhlIEFSSUEgYXR0cmlidXRlIGhvb2sgdmFsaWRhdGUgQVJJQSBhdHRyaWJ1dGVzXG5cblxuICAgIGlmIChyQVJJQSQxLnRlc3QobmFtZSkgfHwgckFSSUFDYW1lbCQxLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChsb3dlckNhc2VkTmFtZSA9PT0gJ2lubmVyaHRtbCcpIHtcbiAgICAgIGVycm9yKCdEaXJlY3RseSBzZXR0aW5nIHByb3BlcnR5IGBpbm5lckhUTUxgIGlzIG5vdCBwZXJtaXR0ZWQuICcgKyAnRm9yIG1vcmUgaW5mb3JtYXRpb24sIGxvb2t1cCBkb2N1bWVudGF0aW9uIG9uIGBkYW5nZXJvdXNseVNldElubmVySFRNTGAuJyk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobG93ZXJDYXNlZE5hbWUgPT09ICdhcmlhJykge1xuICAgICAgZXJyb3IoJ1RoZSBgYXJpYWAgYXR0cmlidXRlIGlzIHJlc2VydmVkIGZvciBmdXR1cmUgdXNlIGluIFJlYWN0LiAnICsgJ1Bhc3MgaW5kaXZpZHVhbCBgYXJpYS1gIGF0dHJpYnV0ZXMgaW5zdGVhZC4nKTtcblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChsb3dlckNhc2VkTmFtZSA9PT0gJ2lzJyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCBhIGAlc2AgZm9yIGEgc3RyaW5nIGF0dHJpYnV0ZSBgaXNgLiBJZiB0aGlzIGlzIGV4cGVjdGVkLCBjYXN0ICcgKyAndGhlIHZhbHVlIHRvIGEgc3RyaW5nLicsIHR5cGVvZiB2YWx1ZSk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWx1ZSkpIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCBOYU4gZm9yIHRoZSBgJXNgIGF0dHJpYnV0ZS4gSWYgdGhpcyBpcyBleHBlY3RlZCwgY2FzdCAnICsgJ3RoZSB2YWx1ZSB0byBhIHN0cmluZy4nLCBuYW1lKTtcblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eUluZm8gPSBnZXRQcm9wZXJ0eUluZm8obmFtZSk7XG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBwcm9wZXJ0eUluZm8gIT09IG51bGwgJiYgcHJvcGVydHlJbmZvLnR5cGUgPT09IFJFU0VSVkVEOyAvLyBLbm93biBhdHRyaWJ1dGVzIHNob3VsZCBtYXRjaCB0aGUgY2FzaW5nIHNwZWNpZmllZCBpbiB0aGUgcHJvcGVydHkgY29uZmlnLlxuXG4gICAgaWYgKHBvc3NpYmxlU3RhbmRhcmROYW1lcy5oYXNPd25Qcm9wZXJ0eShsb3dlckNhc2VkTmFtZSkpIHtcbiAgICAgIHZhciBzdGFuZGFyZE5hbWUgPSBwb3NzaWJsZVN0YW5kYXJkTmFtZXNbbG93ZXJDYXNlZE5hbWVdO1xuXG4gICAgICBpZiAoc3RhbmRhcmROYW1lICE9PSBuYW1lKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIERPTSBwcm9wZXJ0eSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8nLCBuYW1lLCBzdGFuZGFyZE5hbWUpO1xuXG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzUmVzZXJ2ZWQgJiYgbmFtZSAhPT0gbG93ZXJDYXNlZE5hbWUpIHtcbiAgICAgIC8vIFVua25vd24gYXR0cmlidXRlcyBzaG91bGQgaGF2ZSBsb3dlcmNhc2UgY2FzaW5nIHNpbmNlIHRoYXQncyBob3cgdGhleVxuICAgICAgLy8gd2lsbCBiZSBjYXNlZCBhbnl3YXkgd2l0aCBzZXJ2ZXIgcmVuZGVyaW5nLlxuICAgICAgZXJyb3IoJ1JlYWN0IGRvZXMgbm90IHJlY29nbml6ZSB0aGUgYCVzYCBwcm9wIG9uIGEgRE9NIGVsZW1lbnQuIElmIHlvdSAnICsgJ2ludGVudGlvbmFsbHkgd2FudCBpdCB0byBhcHBlYXIgaW4gdGhlIERPTSBhcyBhIGN1c3RvbSAnICsgJ2F0dHJpYnV0ZSwgc3BlbGwgaXQgYXMgbG93ZXJjYXNlIGAlc2AgaW5zdGVhZC4gJyArICdJZiB5b3UgYWNjaWRlbnRhbGx5IHBhc3NlZCBpdCBmcm9tIGEgcGFyZW50IGNvbXBvbmVudCwgcmVtb3ZlICcgKyAnaXQgZnJvbSB0aGUgRE9NIGVsZW1lbnQuJywgbmFtZSwgbG93ZXJDYXNlZE5hbWUpO1xuXG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nICYmIHNob3VsZFJlbW92ZUF0dHJpYnV0ZVdpdGhXYXJuaW5nKG5hbWUsIHZhbHVlLCBwcm9wZXJ0eUluZm8sIGZhbHNlKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVycm9yKCdSZWNlaXZlZCBgJXNgIGZvciBhIG5vbi1ib29sZWFuIGF0dHJpYnV0ZSBgJXNgLlxcblxcbicgKyAnSWYgeW91IHdhbnQgdG8gd3JpdGUgaXQgdG8gdGhlIERPTSwgcGFzcyBhIHN0cmluZyBpbnN0ZWFkOiAnICsgJyVzPVwiJXNcIiBvciAlcz17dmFsdWUudG9TdHJpbmcoKX0uJywgdmFsdWUsIG5hbWUsIG5hbWUsIHZhbHVlLCBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yKCdSZWNlaXZlZCBgJXNgIGZvciBhIG5vbi1ib29sZWFuIGF0dHJpYnV0ZSBgJXNgLlxcblxcbicgKyAnSWYgeW91IHdhbnQgdG8gd3JpdGUgaXQgdG8gdGhlIERPTSwgcGFzcyBhIHN0cmluZyBpbnN0ZWFkOiAnICsgJyVzPVwiJXNcIiBvciAlcz17dmFsdWUudG9TdHJpbmcoKX0uXFxuXFxuJyArICdJZiB5b3UgdXNlZCB0byBjb25kaXRpb25hbGx5IG9taXQgaXQgd2l0aCAlcz17Y29uZGl0aW9uICYmIHZhbHVlfSwgJyArICdwYXNzICVzPXtjb25kaXRpb24gPyB2YWx1ZSA6IHVuZGVmaW5lZH0gaW5zdGVhZC4nLCB2YWx1ZSwgbmFtZSwgbmFtZSwgdmFsdWUsIG5hbWUsIG5hbWUsIG5hbWUpO1xuICAgICAgfVxuXG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAvLyBOb3cgdGhhdCB3ZSd2ZSB2YWxpZGF0ZWQgY2FzaW5nLCBkbyBub3QgdmFsaWRhdGVcbiAgICAvLyBkYXRhIHR5cGVzIGZvciByZXNlcnZlZCBwcm9wc1xuXG5cbiAgICBpZiAoaXNSZXNlcnZlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAvLyBXYXJuIHdoZW4gYSBrbm93biBhdHRyaWJ1dGUgaXMgYSBiYWQgdHlwZVxuXG5cbiAgICBpZiAoc2hvdWxkUmVtb3ZlQXR0cmlidXRlV2l0aFdhcm5pbmcobmFtZSwgdmFsdWUsIHByb3BlcnR5SW5mbywgZmFsc2UpKSB7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gV2FybiB3aGVuIHBhc3NpbmcgdGhlIHN0cmluZ3MgJ2ZhbHNlJyBvciAndHJ1ZScgaW50byBhIGJvb2xlYW4gcHJvcFxuXG5cbiAgICBpZiAoKHZhbHVlID09PSAnZmFsc2UnIHx8IHZhbHVlID09PSAndHJ1ZScpICYmIHByb3BlcnR5SW5mbyAhPT0gbnVsbCAmJiBwcm9wZXJ0eUluZm8udHlwZSA9PT0gQk9PTEVBTikge1xuICAgICAgZXJyb3IoJ1JlY2VpdmVkIHRoZSBzdHJpbmcgYCVzYCBmb3IgdGhlIGJvb2xlYW4gYXR0cmlidXRlIGAlc2AuICcgKyAnJXMgJyArICdEaWQgeW91IG1lYW4gJXM9eyVzfT8nLCB2YWx1ZSwgbmFtZSwgdmFsdWUgPT09ICdmYWxzZScgPyAnVGhlIGJyb3dzZXIgd2lsbCBpbnRlcnByZXQgaXQgYXMgYSB0cnV0aHkgdmFsdWUuJyA6ICdBbHRob3VnaCB0aGlzIHdvcmtzLCBpdCB3aWxsIG5vdCB3b3JrIGFzIGV4cGVjdGVkIGlmIHlvdSBwYXNzIHRoZSBzdHJpbmcgXCJmYWxzZVwiLicsIG5hbWUsIHZhbHVlKTtcblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG52YXIgd2FyblVua25vd25Qcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjYW5Vc2VFdmVudFN5c3RlbSkge1xuICB7XG4gICAgdmFyIHVua25vd25Qcm9wcyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICB2YXIgaXNWYWxpZCA9IHZhbGlkYXRlUHJvcGVydHkkMSh0eXBlLCBrZXksIHByb3BzW2tleV0sIGNhblVzZUV2ZW50U3lzdGVtKTtcblxuICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgIHVua25vd25Qcm9wcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHVua25vd25Qcm9wU3RyaW5nID0gdW5rbm93blByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcmV0dXJuICdgJyArIHByb3AgKyAnYCc7XG4gICAgfSkuam9pbignLCAnKTtcblxuICAgIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBlcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcHJvcCAlcyBvbiA8JXM+IHRhZy4gRWl0aGVyIHJlbW92ZSBpdCBmcm9tIHRoZSBlbGVtZW50LCAnICsgJ29yIHBhc3MgYSBzdHJpbmcgb3IgbnVtYmVyIHZhbHVlIHRvIGtlZXAgaXQgaW4gdGhlIERPTS4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtYXR0cmlidXRlLWJlaGF2aW9yJywgdW5rbm93blByb3BTdHJpbmcsIHR5cGUpO1xuICAgIH0gZWxzZSBpZiAodW5rbm93blByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGVycm9yKCdJbnZhbGlkIHZhbHVlcyBmb3IgcHJvcHMgJXMgb24gPCVzPiB0YWcuIEVpdGhlciByZW1vdmUgdGhlbSBmcm9tIHRoZSBlbGVtZW50LCAnICsgJ29yIHBhc3MgYSBzdHJpbmcgb3IgbnVtYmVyIHZhbHVlIHRvIGtlZXAgdGhlbSBpbiB0aGUgRE9NLiAnICsgJ0ZvciBkZXRhaWxzLCBzZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1hdHRyaWJ1dGUtYmVoYXZpb3InLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnRpZXMkMih0eXBlLCBwcm9wcywgY2FuVXNlRXZlbnRTeXN0ZW0pIHtcbiAgaWYgKGlzQ3VzdG9tQ29tcG9uZW50KHR5cGUsIHByb3BzKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdhcm5Vbmtub3duUHJvcGVydGllcyh0eXBlLCBwcm9wcywgY2FuVXNlRXZlbnRTeXN0ZW0pO1xufVxuXG52YXIgdG9BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXk7IC8vIFRoaXMgaXMgb25seSB1c2VkIGluIERFVi5cbi8vIEVhY2ggZW50cnkgaXMgYHRoaXMuc3RhY2tgIGZyb20gYSBjdXJyZW50bHkgZXhlY3V0aW5nIHJlbmRlcmVyIGluc3RhbmNlLlxuLy8gKFRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIGJlY2F1c2UgUmVhY3RET01TZXJ2ZXIgaXMgcmVlbnRyYW50KS5cbi8vIEVhY2ggc3RhY2sgaXMgYW4gYXJyYXkgb2YgZnJhbWVzIHdoaWNoIG1heSBjb250YWluIG5lc3RlZCBzdGFja3Mgb2YgZWxlbWVudHMuXG5cbnZhciBjdXJyZW50RGVidWdTdGFja3MgPSBbXTtcbnZhciBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDQ7XG52YXIgcHJldkdldEN1cnJlbnRTdGFja0ltcGwgPSBudWxsO1xuXG52YXIgZ2V0Q3VycmVudFNlcnZlclN0YWNrSW1wbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcnO1xufTtcblxudmFyIGRlc2NyaWJlU3RhY2tGcmFtZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiAnJztcbn07XG5cbnZhciB2YWxpZGF0ZVByb3BlcnRpZXNJbkRldmVsb3BtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7fTtcblxudmFyIHB1c2hDdXJyZW50RGVidWdTdGFjayA9IGZ1bmN0aW9uIChzdGFjaykge307XG5cbnZhciBwdXNoRWxlbWVudFRvRGVidWdTdGFjayA9IGZ1bmN0aW9uIChlbGVtZW50KSB7fTtcblxudmFyIHBvcEN1cnJlbnREZWJ1Z1N0YWNrID0gZnVuY3Rpb24gKCkge307XG5cbnZhciBoYXNXYXJuZWRBYm91dFVzaW5nQ29udGV4dEFzQ29uc3VtZXIgPSBmYWxzZTtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDQgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuXG4gIHZhbGlkYXRlUHJvcGVydGllc0luRGV2ZWxvcG1lbnQgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMpIHtcbiAgICB2YWxpZGF0ZVByb3BlcnRpZXModHlwZSwgcHJvcHMpO1xuICAgIHZhbGlkYXRlUHJvcGVydGllcyQxKHR5cGUsIHByb3BzKTtcbiAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMih0eXBlLCBwcm9wcyxcbiAgICAvKiBjYW5Vc2VFdmVudFN5c3RlbSAqL1xuICAgIGZhbHNlKTtcbiAgfTtcblxuICBkZXNjcmliZVN0YWNrRnJhbWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG4gICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKHR5cGUpO1xuICAgIHZhciBvd25lck5hbWUgPSBudWxsO1xuICAgIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKTtcbiAgfTtcblxuICBwdXNoQ3VycmVudERlYnVnU3RhY2sgPSBmdW5jdGlvbiAoc3RhY2spIHtcbiAgICBjdXJyZW50RGVidWdTdGFja3MucHVzaChzdGFjayk7XG5cbiAgICBpZiAoY3VycmVudERlYnVnU3RhY2tzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gV2UgYXJlIGVudGVyaW5nIGEgc2VydmVyIHJlbmRlcmVyLlxuICAgICAgLy8gUmVtZW1iZXIgdGhlIHByZXZpb3VzIChlLmcuIGNsaWVudCkgZ2xvYmFsIHN0YWNrIGltcGxlbWVudGF0aW9uLlxuICAgICAgcHJldkdldEN1cnJlbnRTdGFja0ltcGwgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDQuZ2V0Q3VycmVudFN0YWNrO1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQ0LmdldEN1cnJlbnRTdGFjayA9IGdldEN1cnJlbnRTZXJ2ZXJTdGFja0ltcGw7XG4gICAgfVxuICB9O1xuXG4gIHB1c2hFbGVtZW50VG9EZWJ1Z1N0YWNrID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBGb3IgdGhlIGlubmVybW9zdCBleGVjdXRpbmcgUmVhY3RET01TZXJ2ZXIgY2FsbCxcbiAgICB2YXIgc3RhY2sgPSBjdXJyZW50RGVidWdTdGFja3NbY3VycmVudERlYnVnU3RhY2tzLmxlbmd0aCAtIDFdOyAvLyBUYWtlIHRoZSBpbm5lcm1vc3QgZXhlY3V0aW5nIGZyYW1lIChlLmcuIDxGb28+KSxcblxuICAgIHZhciBmcmFtZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdOyAvLyBhbmQgcmVjb3JkIHRoYXQgaXQgaGFzIG9uZSBtb3JlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIGl0LlxuXG4gICAgZnJhbWUuZGVidWdFbGVtZW50U3RhY2sucHVzaChlbGVtZW50KTsgLy8gV2Ugb25seSBuZWVkIHRoaXMgYmVjYXVzZSB3ZSB0YWlsLW9wdGltaXplIHNpbmdsZS1lbGVtZW50XG4gICAgLy8gY2hpbGRyZW4gYW5kIGRpcmVjdGx5IGhhbmRsZSB0aGVtIGluIGFuIGlubmVyIGxvb3AgaW5zdGVhZCBvZlxuICAgIC8vIGNyZWF0aW5nIHNlcGFyYXRlIGZyYW1lcyBmb3IgdGhlbS5cbiAgfTtcblxuICBwb3BDdXJyZW50RGVidWdTdGFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBjdXJyZW50RGVidWdTdGFja3MucG9wKCk7XG5cbiAgICBpZiAoY3VycmVudERlYnVnU3RhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gV2UgYXJlIGV4aXRpbmcgdGhlIHNlcnZlciByZW5kZXJlci5cbiAgICAgIC8vIFJlc3RvcmUgdGhlIHByZXZpb3VzIChlLmcuIGNsaWVudCkgZ2xvYmFsIHN0YWNrIGltcGxlbWVudGF0aW9uLlxuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQ0LmdldEN1cnJlbnRTdGFjayA9IHByZXZHZXRDdXJyZW50U3RhY2tJbXBsO1xuICAgICAgcHJldkdldEN1cnJlbnRTdGFja0ltcGwgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBnZXRDdXJyZW50U2VydmVyU3RhY2tJbXBsID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjdXJyZW50RGVidWdTdGFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBOb3RoaW5nIGlzIGN1cnJlbnRseSByZW5kZXJpbmcuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfSAvLyBSZWFjdERPTVNlcnZlciBpcyByZWVudHJhbnQgc28gdGhlcmUgbWF5IGJlIG11bHRpcGxlIGNhbGxzIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgLy8gVGFrZSB0aGUgZnJhbWVzIGZyb20gdGhlIGlubmVybW9zdCBjYWxsIHdoaWNoIGlzIHRoZSBsYXN0IGluIHRoZSBhcnJheS5cblxuXG4gICAgdmFyIGZyYW1lcyA9IGN1cnJlbnREZWJ1Z1N0YWNrc1tjdXJyZW50RGVidWdTdGFja3MubGVuZ3RoIC0gMV07XG4gICAgdmFyIHN0YWNrID0gJyc7IC8vIEdvIHRocm91Z2ggZXZlcnkgZnJhbWUgaW4gdGhlIHN0YWNrIGZyb20gdGhlIGlubmVybW9zdCBvbmUuXG5cbiAgICBmb3IgKHZhciBpID0gZnJhbWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZnJhbWUgPSBmcmFtZXNbaV07IC8vIEV2ZXJ5IGZyYW1lIG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBkZWJ1ZyBlbGVtZW50IHN0YWNrIGVudHJ5IGFzc29jaWF0ZWQgd2l0aCBpdC5cbiAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSBzaW5nbGUtY2hpbGQgbmVzdGluZyBkb2Vzbid0IGNyZWF0ZSBtYXRlcmlhbGl6ZWQgZnJhbWVzLlxuICAgICAgLy8gSW5zdGVhZCBpdCB3b3VsZCBwdXNoIHRoZW0gdGhyb3VnaCBgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2soKWAuXG5cbiAgICAgIHZhciBkZWJ1Z0VsZW1lbnRTdGFjayA9IGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrO1xuXG4gICAgICBmb3IgKHZhciBpaSA9IGRlYnVnRWxlbWVudFN0YWNrLmxlbmd0aCAtIDE7IGlpID49IDA7IGlpLS0pIHtcbiAgICAgICAgc3RhY2sgKz0gZGVzY3JpYmVTdGFja0ZyYW1lKGRlYnVnRWxlbWVudFN0YWNrW2lpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xufVxuXG52YXIgZGlkV2FybkRlZmF1bHRJbnB1dFZhbHVlID0gZmFsc2U7XG52YXIgZGlkV2FybkRlZmF1bHRDaGVja2VkID0gZmFsc2U7XG52YXIgZGlkV2FybkRlZmF1bHRTZWxlY3RWYWx1ZSA9IGZhbHNlO1xudmFyIGRpZFdhcm5EZWZhdWx0VGV4dGFyZWFWYWx1ZSA9IGZhbHNlO1xudmFyIGRpZFdhcm5JbnZhbGlkT3B0aW9uQ2hpbGRyZW4gPSBmYWxzZTtcbnZhciBkaWRXYXJuQWJvdXROb29wVXBkYXRlRm9yQ29tcG9uZW50ID0ge307XG52YXIgZGlkV2FybkFib3V0QmFkQ2xhc3MgPSB7fTtcbnZhciBkaWRXYXJuQWJvdXRNb2R1bGVQYXR0ZXJuQ29tcG9uZW50ID0ge307XG52YXIgZGlkV2FybkFib3V0RGVwcmVjYXRlZFdpbGxNb3VudCA9IHt9O1xudmFyIGRpZFdhcm5BYm91dFVuZGVmaW5lZERlcml2ZWRTdGF0ZSA9IHt9O1xudmFyIGRpZFdhcm5BYm91dFVuaW5pdGlhbGl6ZWRTdGF0ZSA9IHt9O1xudmFyIHZhbHVlUHJvcE5hbWVzID0gWyd2YWx1ZScsICdkZWZhdWx0VmFsdWUnXTtcbnZhciBuZXdsaW5lRWF0aW5nVGFncyA9IHtcbiAgbGlzdGluZzogdHJ1ZSxcbiAgcHJlOiB0cnVlLFxuICB0ZXh0YXJlYTogdHJ1ZVxufTsgLy8gV2UgYWNjZXB0IGFueSB0YWcgdG8gYmUgcmVuZGVyZWQgYnV0IHNpbmNlIHRoaXMgZ2V0cyBpbmplY3RlZCBpbnRvIGFyYml0cmFyeVxuLy8gSFRNTCwgd2Ugd2FudCB0byBtYWtlIHN1cmUgdGhhdCBpdCdzIGEgc2FmZSB0YWcuXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLyNOVC1OYW1lXG5cbnZhciBWQUxJRF9UQUdfUkVHRVggPSAvXlthLXpBLVpdW2EtekEtWjpfXFwuXFwtXFxkXSokLzsgLy8gU2ltcGxpZmllZCBzdWJzZXRcblxudmFyIHZhbGlkYXRlZFRhZ0NhY2hlID0ge307XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGFuZ2Vyb3VzVGFnKHRhZykge1xuICBpZiAoIXZhbGlkYXRlZFRhZ0NhY2hlLmhhc093blByb3BlcnR5KHRhZykpIHtcbiAgICBpZiAoIVZBTElEX1RBR19SRUdFWC50ZXN0KHRhZykpIHtcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoIFwiSW52YWxpZCB0YWc6IFwiICsgdGFnICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVkVGFnQ2FjaGVbdGFnXSA9IHRydWU7XG4gIH1cbn1cblxudmFyIHN0eWxlTmFtZUNhY2hlID0ge307XG5cbnZhciBwcm9jZXNzU3R5bGVOYW1lID0gZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICBpZiAoc3R5bGVOYW1lQ2FjaGUuaGFzT3duUHJvcGVydHkoc3R5bGVOYW1lKSkge1xuICAgIHJldHVybiBzdHlsZU5hbWVDYWNoZVtzdHlsZU5hbWVdO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IGh5cGhlbmF0ZVN0eWxlTmFtZShzdHlsZU5hbWUpO1xuICBzdHlsZU5hbWVDYWNoZVtzdHlsZU5hbWVdID0gcmVzdWx0O1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yU3R5bGVzKHN0eWxlcykge1xuICB2YXIgc2VyaWFsaXplZCA9ICcnO1xuICB2YXIgZGVsaW1pdGVyID0gJyc7XG5cbiAgZm9yICh2YXIgc3R5bGVOYW1lIGluIHN0eWxlcykge1xuICAgIGlmICghc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlTmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBpc0N1c3RvbVByb3BlcnR5ID0gc3R5bGVOYW1lLmluZGV4T2YoJy0tJykgPT09IDA7XG4gICAgdmFyIHN0eWxlVmFsdWUgPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuICAgIHtcbiAgICAgIGlmICghaXNDdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgICB3YXJuVmFsaWRTdHlsZSQxKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgc2VyaWFsaXplZCArPSBkZWxpbWl0ZXIgKyAoaXNDdXN0b21Qcm9wZXJ0eSA/IHN0eWxlTmFtZSA6IHByb2Nlc3NTdHlsZU5hbWUoc3R5bGVOYW1lKSkgKyAnOic7XG4gICAgICBzZXJpYWxpemVkICs9IGRhbmdlcm91c1N0eWxlVmFsdWUoc3R5bGVOYW1lLCBzdHlsZVZhbHVlLCBpc0N1c3RvbVByb3BlcnR5KTtcbiAgICAgIGRlbGltaXRlciA9ICc7JztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VyaWFsaXplZCB8fCBudWxsO1xufVxuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIGdldENvbXBvbmVudE5hbWUoX2NvbnN0cnVjdG9yKSB8fCAnUmVhY3RDbGFzcyc7XG4gICAgdmFyIHdhcm5pbmdLZXkgPSBjb21wb25lbnROYW1lICsgJy4nICsgY2FsbGVyTmFtZTtcblxuICAgIGlmIChkaWRXYXJuQWJvdXROb29wVXBkYXRlRm9yQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXJyb3IoJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG91dHNpZGUgY29tcG9uZW50V2lsbE1vdW50KCkgb24gdGhlIHNlcnZlci4gJyArICdUaGlzIGlzIGEgbm8tb3AuXFxuXFxuUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgZGlkV2FybkFib3V0Tm9vcFVwZGF0ZUZvckNvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LnByb3RvdHlwZSAmJiBDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldE5vbkNoaWxkcmVuSW5uZXJNYXJrdXAocHJvcHMpIHtcbiAgdmFyIGlubmVySFRNTCA9IHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuXG4gIGlmIChpbm5lckhUTUwgIT0gbnVsbCkge1xuICAgIGlmIChpbm5lckhUTUwuX19odG1sICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBpbm5lckhUTUwuX19odG1sO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udGVudCA9IHByb3BzLmNoaWxkcmVuO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgY29udGVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBlc2NhcGVUZXh0Rm9yQnJvd3Nlcihjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmxhdHRlblRvcExldmVsQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICByZXR1cm4gdG9BcnJheShjaGlsZHJlbik7XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGNoaWxkcmVuO1xuXG4gIGlmIChlbGVtZW50LnR5cGUgIT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICByZXR1cm4gW2VsZW1lbnRdO1xuICB9XG5cbiAgdmFyIGZyYWdtZW50Q2hpbGRyZW4gPSBlbGVtZW50LnByb3BzLmNoaWxkcmVuO1xuXG4gIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoZnJhZ21lbnRDaGlsZHJlbikpIHtcbiAgICByZXR1cm4gdG9BcnJheShmcmFnbWVudENoaWxkcmVuKTtcbiAgfVxuXG4gIHZhciBmcmFnbWVudENoaWxkRWxlbWVudCA9IGZyYWdtZW50Q2hpbGRyZW47XG4gIHJldHVybiBbZnJhZ21lbnRDaGlsZEVsZW1lbnRdO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuT3B0aW9uQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQgfHwgY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICB2YXIgY29udGVudCA9ICcnOyAvLyBGbGF0dGVuIGNoaWxkcmVuIGFuZCB3YXJuIGlmIHRoZXkgYXJlbid0IHN0cmluZ3Mgb3IgbnVtYmVycztcbiAgLy8gaW52YWxpZCB0eXBlcyBhcmUgaWdub3JlZC5cblxuICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnRlbnQgKz0gY2hpbGQ7XG5cbiAgICB7XG4gICAgICBpZiAoIWRpZFdhcm5JbnZhbGlkT3B0aW9uQ2hpbGRyZW4gJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgY2hpbGQgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGRpZFdhcm5JbnZhbGlkT3B0aW9uQ2hpbGRyZW4gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCdPbmx5IHN0cmluZ3MgYW5kIG51bWJlcnMgYXJlIHN1cHBvcnRlZCBhcyA8b3B0aW9uPiBjaGlsZHJlbi4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29udGVudDtcbn1cblxudmFyIGhhc093blByb3BlcnR5JDIgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIFNUWUxFID0gJ3N0eWxlJztcbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAgY2hpbGRyZW46IG51bGwsXG4gIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiBudWxsLFxuICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmc6IG51bGwsXG4gIHN1cHByZXNzSHlkcmF0aW9uV2FybmluZzogbnVsbFxufTtcblxuZnVuY3Rpb24gY3JlYXRlT3BlblRhZ01hcmt1cCh0YWdWZXJiYXRpbSwgdGFnTG93ZXJjYXNlLCBwcm9wcywgbmFtZXNwYWNlLCBtYWtlU3RhdGljTWFya3VwLCBpc1Jvb3RFbGVtZW50KSB7XG4gIHZhciByZXQgPSAnPCcgKyB0YWdWZXJiYXRpbTtcblxuICBmb3IgKHZhciBwcm9wS2V5IGluIHByb3BzKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eSQyLmNhbGwocHJvcHMsIHByb3BLZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcEtleV07XG5cbiAgICBpZiAocHJvcFZhbHVlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9wS2V5ID09PSBTVFlMRSkge1xuICAgICAgcHJvcFZhbHVlID0gY3JlYXRlTWFya3VwRm9yU3R5bGVzKHByb3BWYWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIG1hcmt1cCA9IG51bGw7XG5cbiAgICBpZiAoaXNDdXN0b21Db21wb25lbnQodGFnTG93ZXJjYXNlLCBwcm9wcykpIHtcbiAgICAgIGlmICghUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcEtleSkpIHtcbiAgICAgICAgbWFya3VwID0gY3JlYXRlTWFya3VwRm9yQ3VzdG9tQXR0cmlidXRlKHByb3BLZXksIHByb3BWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmt1cCA9IGNyZWF0ZU1hcmt1cEZvclByb3BlcnR5KHByb3BLZXksIHByb3BWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKG1hcmt1cCkge1xuICAgICAgcmV0ICs9ICcgJyArIG1hcmt1cDtcbiAgICB9XG4gIH0gLy8gRm9yIHN0YXRpYyBwYWdlcywgbm8gbmVlZCB0byBwdXQgUmVhY3QgSUQgYW5kIGNoZWNrc3VtLiBTYXZlcyBsb3RzIG9mXG4gIC8vIGJ5dGVzLlxuXG5cbiAgaWYgKG1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgaWYgKGlzUm9vdEVsZW1lbnQpIHtcbiAgICByZXQgKz0gJyAnICsgY3JlYXRlTWFya3VwRm9yUm9vdCgpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVSZW5kZXJSZXN1bHQoY2hpbGQsIHR5cGUpIHtcbiAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQpIHtcbiAgICB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCAoZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB8fCAnQ29tcG9uZW50JykgKyBcIiguLi4pOiBOb3RoaW5nIHdhcyByZXR1cm5lZCBmcm9tIHJlbmRlci4gVGhpcyB1c3VhbGx5IG1lYW5zIGEgcmV0dXJuIHN0YXRlbWVudCBpcyBtaXNzaW5nLiBPciwgdG8gcmVuZGVyIG5vdGhpbmcsIHJldHVybiBudWxsLlwiICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUoY2hpbGQsIGNvbnRleHQsIHRocmVhZElEKSB7XG4gIHdoaWxlIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAvLyBTYWZlIGJlY2F1c2Ugd2UganVzdCBjaGVja2VkIGl0J3MgYW4gZWxlbWVudC5cbiAgICB2YXIgZWxlbWVudCA9IGNoaWxkO1xuICAgIHZhciBDb21wb25lbnQgPSBlbGVtZW50LnR5cGU7XG5cbiAgICB7XG4gICAgICBwdXNoRWxlbWVudFRvRGVidWdTdGFjayhlbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIENvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NoaWxkKGVsZW1lbnQsIENvbXBvbmVudCk7XG4gIH0gLy8gRXh0cmEgY2xvc3VyZSBzbyBxdWV1ZSBhbmQgcmVwbGFjZSBjYW4gYmUgY2FwdHVyZWQgcHJvcGVybHlcblxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NDaGlsZChlbGVtZW50LCBDb21wb25lbnQpIHtcbiAgICB2YXIgaXNDbGFzcyA9IHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpO1xuICAgIHZhciBwdWJsaWNDb250ZXh0ID0gcHJvY2Vzc0NvbnRleHQoQ29tcG9uZW50LCBjb250ZXh0LCB0aHJlYWRJRCwgaXNDbGFzcyk7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHJlcGxhY2UgPSBmYWxzZTtcbiAgICB2YXIgdXBkYXRlciA9IHtcbiAgICAgIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgICAgICBpZiAocXVldWUgPT09IG51bGwpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICAgICAgcmVwbGFjZSA9IHRydWU7XG4gICAgICAgIHF1ZXVlID0gW2NvbXBsZXRlU3RhdGVdO1xuICAgICAgfSxcbiAgICAgIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjdXJyZW50UGFydGlhbFN0YXRlKSB7XG4gICAgICAgIGlmIChxdWV1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHF1ZXVlLnB1c2goY3VycmVudFBhcnRpYWxTdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaW5zdDtcblxuICAgIGlmIChpc0NsYXNzKSB7XG4gICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChlbGVtZW50LnByb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVyKTtcblxuICAgICAgaWYgKHR5cGVvZiBDb21wb25lbnQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoaW5zdC5zdGF0ZSA9PT0gbnVsbCB8fCBpbnN0LnN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJztcblxuICAgICAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRVbmluaXRpYWxpemVkU3RhdGVbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgZXJyb3IoJ2Alc2AgdXNlcyBgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzYCBidXQgaXRzIGluaXRpYWwgc3RhdGUgaXMgJyArICclcy4gVGhpcyBpcyBub3QgcmVjb21tZW5kZWQuIEluc3RlYWQsIGRlZmluZSB0aGUgaW5pdGlhbCBzdGF0ZSBieSAnICsgJ2Fzc2lnbmluZyBhbiBvYmplY3QgdG8gYHRoaXMuc3RhdGVgIGluIHRoZSBjb25zdHJ1Y3RvciBvZiBgJXNgLiAnICsgJ1RoaXMgZW5zdXJlcyB0aGF0IGBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHNgIGFyZ3VtZW50cyBoYXZlIGEgY29uc2lzdGVudCBzaGFwZS4nLCBjb21wb25lbnROYW1lLCBpbnN0LnN0YXRlID09PSBudWxsID8gJ251bGwnIDogJ3VuZGVmaW5lZCcsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgIGRpZFdhcm5BYm91dFVuaW5pdGlhbGl6ZWRTdGF0ZVtjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcnRpYWxTdGF0ZSA9IENvbXBvbmVudC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMuY2FsbChudWxsLCBlbGVtZW50LnByb3BzLCBpbnN0LnN0YXRlKTtcblxuICAgICAgICB7XG4gICAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgX2NvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nO1xuXG4gICAgICAgICAgICBpZiAoIWRpZFdhcm5BYm91dFVuZGVmaW5lZERlcml2ZWRTdGF0ZVtfY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgZXJyb3IoJyVzLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcygpOiBBIHZhbGlkIHN0YXRlIG9iamVjdCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gJyArICdZb3UgaGF2ZSByZXR1cm5lZCB1bmRlZmluZWQuJywgX2NvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgIGRpZFdhcm5BYm91dFVuZGVmaW5lZERlcml2ZWRTdGF0ZVtfY29tcG9uZW50TmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0aWFsU3RhdGUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3Quc3RhdGUgPSBfYXNzaWduKHt9LCBpbnN0LnN0YXRlLCBwYXJ0aWFsU3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKENvbXBvbmVudC5wcm90b3R5cGUgJiYgdHlwZW9mIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIF9jb21wb25lbnROYW1lMiA9IGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KSB8fCAnVW5rbm93bic7XG5cbiAgICAgICAgICBpZiAoIWRpZFdhcm5BYm91dEJhZENsYXNzW19jb21wb25lbnROYW1lMl0pIHtcbiAgICAgICAgICAgIGVycm9yKFwiVGhlIDwlcyAvPiBjb21wb25lbnQgYXBwZWFycyB0byBoYXZlIGEgcmVuZGVyIG1ldGhvZCwgYnV0IGRvZXNuJ3QgZXh0ZW5kIFJlYWN0LkNvbXBvbmVudC4gXCIgKyAnVGhpcyBpcyBsaWtlbHkgdG8gY2F1c2UgZXJyb3JzLiBDaGFuZ2UgJXMgdG8gZXh0ZW5kIFJlYWN0LkNvbXBvbmVudCBpbnN0ZWFkLicsIF9jb21wb25lbnROYW1lMiwgX2NvbXBvbmVudE5hbWUyKTtcblxuICAgICAgICAgICAgZGlkV2FybkFib3V0QmFkQ2xhc3NbX2NvbXBvbmVudE5hbWUyXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjb21wb25lbnRJZGVudGl0eSA9IHt9O1xuICAgICAgcHJlcGFyZVRvVXNlSG9va3MoY29tcG9uZW50SWRlbnRpdHkpO1xuICAgICAgaW5zdCA9IENvbXBvbmVudChlbGVtZW50LnByb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVyKTtcbiAgICAgIGluc3QgPSBmaW5pc2hIb29rcyhDb21wb25lbnQsIGVsZW1lbnQucHJvcHMsIGluc3QsIHB1YmxpY0NvbnRleHQpO1xuXG4gICAgICBpZiAoaW5zdCA9PSBudWxsIHx8IGluc3QucmVuZGVyID09IG51bGwpIHtcbiAgICAgICAgY2hpbGQgPSBpbnN0O1xuICAgICAgICB2YWxpZGF0ZVJlbmRlclJlc3VsdChjaGlsZCwgQ29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB7XG4gICAgICAgIHZhciBfY29tcG9uZW50TmFtZTMgPSBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nO1xuXG4gICAgICAgIGlmICghZGlkV2FybkFib3V0TW9kdWxlUGF0dGVybkNvbXBvbmVudFtfY29tcG9uZW50TmFtZTNdKSB7XG4gICAgICAgICAgZXJyb3IoJ1RoZSA8JXMgLz4gY29tcG9uZW50IGFwcGVhcnMgdG8gYmUgYSBmdW5jdGlvbiBjb21wb25lbnQgdGhhdCByZXR1cm5zIGEgY2xhc3MgaW5zdGFuY2UuICcgKyAnQ2hhbmdlICVzIHRvIGEgY2xhc3MgdGhhdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCBpbnN0ZWFkLiAnICsgXCJJZiB5b3UgY2FuJ3QgdXNlIGEgY2xhc3MgdHJ5IGFzc2lnbmluZyB0aGUgcHJvdG90eXBlIG9uIHRoZSBmdW5jdGlvbiBhcyBhIHdvcmthcm91bmQuIFwiICsgXCJgJXMucHJvdG90eXBlID0gUmVhY3QuQ29tcG9uZW50LnByb3RvdHlwZWAuIERvbid0IHVzZSBhbiBhcnJvdyBmdW5jdGlvbiBzaW5jZSBpdCBcIiArICdjYW5ub3QgYmUgY2FsbGVkIHdpdGggYG5ld2AgYnkgUmVhY3QuJywgX2NvbXBvbmVudE5hbWUzLCBfY29tcG9uZW50TmFtZTMsIF9jb21wb25lbnROYW1lMyk7XG5cbiAgICAgICAgICBkaWRXYXJuQWJvdXRNb2R1bGVQYXR0ZXJuQ29tcG9uZW50W19jb21wb25lbnROYW1lM10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zdC5wcm9wcyA9IGVsZW1lbnQucHJvcHM7XG4gICAgaW5zdC5jb250ZXh0ID0gcHVibGljQ29udGV4dDtcbiAgICBpbnN0LnVwZGF0ZXIgPSB1cGRhdGVyO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuXG4gICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbnN0LnN0YXRlID0gaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGluc3QuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgaW5zdC5jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgaW5zdC5jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAge1xuICAgICAgICAgIGlmICggaW5zdC5jb21wb25lbnRXaWxsTW91bnQuX19zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIF9jb21wb25lbnROYW1lNCA9IGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KSB8fCAnVW5rbm93bic7XG5cbiAgICAgICAgICAgIGlmICghZGlkV2FybkFib3V0RGVwcmVjYXRlZFdpbGxNb3VudFtfY29tcG9uZW50TmFtZTRdKSB7XG4gICAgICAgICAgICAgIHdhcm4oIC8vIGtlZXAgdGhpcyB3YXJuaW5nIGluIHN5bmMgd2l0aCBSZWFjdFN0cmljdE1vZGVXYXJuaW5nLmpzXG4gICAgICAgICAgICAgICdjb21wb25lbnRXaWxsTW91bnQgaGFzIGJlZW4gcmVuYW1lZCwgYW5kIGlzIG5vdCByZWNvbW1lbmRlZCBmb3IgdXNlLiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXVuc2FmZS1jb21wb25lbnQtbGlmZWN5Y2xlcyBmb3IgZGV0YWlscy5cXG5cXG4nICsgJyogTW92ZSBjb2RlIGZyb20gY29tcG9uZW50V2lsbE1vdW50IHRvIGNvbXBvbmVudERpZE1vdW50IChwcmVmZXJyZWQgaW4gbW9zdCBjYXNlcykgJyArICdvciB0aGUgY29uc3RydWN0b3IuXFxuJyArICdcXG5QbGVhc2UgdXBkYXRlIHRoZSBmb2xsb3dpbmcgY29tcG9uZW50czogJXMnLCBfY29tcG9uZW50TmFtZTQpO1xuXG4gICAgICAgICAgICAgIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRXaWxsTW91bnRbX2NvbXBvbmVudE5hbWU0XSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIEluIG9yZGVyIHRvIHN1cHBvcnQgcmVhY3QtbGlmZWN5Y2xlcy1jb21wYXQgcG9seWZpbGxlZCBjb21wb25lbnRzLFxuICAgICAgICAvLyBVbnNhZmUgbGlmZWN5Y2xlcyBzaG91bGQgbm90IGJlIGludm9rZWQgZm9yIGFueSBjb21wb25lbnQgd2l0aCB0aGUgbmV3IGdEU0ZQLlxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBDb21wb25lbnQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaW5zdC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGluc3QuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgQ29tcG9uZW50LmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBJbiBvcmRlciB0byBzdXBwb3J0IHJlYWN0LWxpZmVjeWNsZXMtY29tcGF0IHBvbHlmaWxsZWQgY29tcG9uZW50cyxcbiAgICAgICAgLy8gVW5zYWZlIGxpZmVjeWNsZXMgc2hvdWxkIG5vdCBiZSBpbnZva2VkIGZvciBhbnkgY29tcG9uZW50IHdpdGggdGhlIG5ldyBnRFNGUC5cbiAgICAgICAgaW5zdC5VTlNBRkVfY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHZhciBvbGRSZXBsYWNlID0gcmVwbGFjZTtcbiAgICAgICAgcXVldWUgPSBudWxsO1xuICAgICAgICByZXBsYWNlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9sZFJlcGxhY2UgJiYgb2xkUXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgaW5zdC5zdGF0ZSA9IG9sZFF1ZXVlWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBvbGRSZXBsYWNlID8gb2xkUXVldWVbMF0gOiBpbnN0LnN0YXRlO1xuICAgICAgICAgIHZhciBkb250TXV0YXRlID0gdHJ1ZTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSBvbGRSZXBsYWNlID8gMSA6IDA7IGkgPCBvbGRRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnRpYWwgPSBvbGRRdWV1ZVtpXTtcblxuICAgICAgICAgICAgdmFyIF9wYXJ0aWFsU3RhdGUgPSB0eXBlb2YgcGFydGlhbCA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnRpYWwuY2FsbChpbnN0LCBuZXh0U3RhdGUsIGVsZW1lbnQucHJvcHMsIHB1YmxpY0NvbnRleHQpIDogcGFydGlhbDtcblxuICAgICAgICAgICAgaWYgKF9wYXJ0aWFsU3RhdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoZG9udE11dGF0ZSkge1xuICAgICAgICAgICAgICAgIGRvbnRNdXRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBuZXh0U3RhdGUgPSBfYXNzaWduKHt9LCBuZXh0U3RhdGUsIF9wYXJ0aWFsU3RhdGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9hc3NpZ24obmV4dFN0YXRlLCBfcGFydGlhbFN0YXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGluc3Quc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZCA9IGluc3QucmVuZGVyKCk7XG5cbiAgICB7XG4gICAgICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCAmJiBpbnN0LnJlbmRlci5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgY2hpbGQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUmVuZGVyUmVzdWx0KGNoaWxkLCBDb21wb25lbnQpO1xuICAgIHZhciBjaGlsZENvbnRleHQ7XG5cbiAgICB7XG4gICAgICBpZiAodHlwZW9mIGluc3QuZ2V0Q2hpbGRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBfY2hpbGRDb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfY2hpbGRDb250ZXh0VHlwZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY2hpbGRDb250ZXh0ID0gaW5zdC5nZXRDaGlsZENvbnRleHQoKTtcblxuICAgICAgICAgIGZvciAodmFyIGNvbnRleHRLZXkgaW4gY2hpbGRDb250ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIShjb250ZXh0S2V5IGluIF9jaGlsZENvbnRleHRUeXBlcykpIHtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCAoZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJykgKyBcIi5nZXRDaGlsZENvbnRleHQoKToga2V5IFxcXCJcIiArIGNvbnRleHRLZXkgKyBcIlxcXCIgaXMgbm90IGRlZmluZWQgaW4gY2hpbGRDb250ZXh0VHlwZXMuXCIgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlcnJvcignJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGNoaWxkQ29udGV4dFR5cGVzIG11c3QgYmUgZGVmaW5lZCBpbiBvcmRlciB0byAnICsgJ3VzZSBnZXRDaGlsZENvbnRleHQoKS4nLCBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkQ29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gX2Fzc2lnbih7fSwgY29udGV4dCwgY2hpbGRDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNoaWxkOiBjaGlsZCxcbiAgICBjb250ZXh0OiBjb250ZXh0XG4gIH07XG59XG5cbnZhciBSZWFjdERPTVNlcnZlclJlbmRlcmVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgLy8gVE9ETzogdHlwZSB0aGlzIG1vcmUgc3RyaWN0bHk6XG4gIC8vIERFVi1vbmx5XG4gIGZ1bmN0aW9uIFJlYWN0RE9NU2VydmVyUmVuZGVyZXIoY2hpbGRyZW4sIG1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICB2YXIgZmxhdENoaWxkcmVuID0gZmxhdHRlblRvcExldmVsQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICAgIHZhciB0b3BGcmFtZSA9IHtcbiAgICAgIHR5cGU6IG51bGwsXG4gICAgICAvLyBBc3N1bWUgYWxsIHRyZWVzIHN0YXJ0IGluIHRoZSBIVE1MIG5hbWVzcGFjZSAobm90IHRvdGFsbHkgdHJ1ZSwgYnV0XG4gICAgICAvLyB0aGlzIGlzIHdoYXQgd2UgZGlkIGhpc3RvcmljYWxseSlcbiAgICAgIGRvbU5hbWVzcGFjZTogTmFtZXNwYWNlcy5odG1sLFxuICAgICAgY2hpbGRyZW46IGZsYXRDaGlsZHJlbixcbiAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICBjb250ZXh0OiBlbXB0eU9iamVjdCxcbiAgICAgIGZvb3RlcjogJydcbiAgICB9O1xuXG4gICAge1xuICAgICAgdG9wRnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnRocmVhZElEID0gYWxsb2NUaHJlYWRJRCgpO1xuICAgIHRoaXMuc3RhY2sgPSBbdG9wRnJhbWVdO1xuICAgIHRoaXMuZXhoYXVzdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50U2VsZWN0VmFsdWUgPSBudWxsO1xuICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IGZhbHNlO1xuICAgIHRoaXMubWFrZVN0YXRpY01hcmt1cCA9IG1ha2VTdGF0aWNNYXJrdXA7XG4gICAgdGhpcy5zdXNwZW5zZURlcHRoID0gMDsgLy8gQ29udGV4dCAobmV3IEFQSSlcblxuICAgIHRoaXMuY29udGV4dEluZGV4ID0gLTE7XG4gICAgdGhpcy5jb250ZXh0U3RhY2sgPSBbXTtcbiAgICB0aGlzLmNvbnRleHRWYWx1ZVN0YWNrID0gW107XG5cbiAgICB7XG4gICAgICB0aGlzLmNvbnRleHRQcm92aWRlclN0YWNrID0gW107XG4gICAgfVxuICB9XG5cbiAgdmFyIF9wcm90byA9IFJlYWN0RE9NU2VydmVyUmVuZGVyZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuZXhoYXVzdGVkKSB7XG4gICAgICB0aGlzLmV4aGF1c3RlZCA9IHRydWU7XG4gICAgICB0aGlzLmNsZWFyUHJvdmlkZXJzKCk7XG4gICAgICBmcmVlVGhyZWFkSUQodGhpcy50aHJlYWRJRCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBOb3RlOiBXZSB1c2UganVzdCB0d28gc3RhY2tzIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgY29udGV4dCBwcm92aWRlcnMgeW91IGhhdmUuXG4gICAqIFByb3ZpZGVycyBhcmUgYWx3YXlzIHBvcHBlZCBpbiB0aGUgcmV2ZXJzZSBvcmRlciB0byBob3cgdGhleSB3ZXJlIHB1c2hlZFxuICAgKiBzbyB3ZSBhbHdheXMga25vdyBvbiB0aGUgd2F5IGRvd24gd2hpY2ggcHJvdmlkZXIgeW91J2xsIGVuY291bnRlciBuZXh0IG9uIHRoZSB3YXkgdXAuXG4gICAqIE9uIHRoZSB3YXkgZG93biwgd2UgcHVzaCB0aGUgY3VycmVudCBwcm92aWRlciwgYW5kIGl0cyBjb250ZXh0IHZhbHVlICpiZWZvcmUqXG4gICAqIHdlIG11dGF0ZWQgaXQsIG9udG8gdGhlIHN0YWNrcy4gVGhlcmVmb3JlLCBvbiB0aGUgd2F5IHVwLCB3ZSBhbHdheXMga25vdyB3aGljaFxuICAgKiBwcm92aWRlciBuZWVkcyB0byBiZSBcInJlc3RvcmVkXCIgdG8gd2hpY2ggdmFsdWUuXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzEyOTg1I2lzc3VlY29tbWVudC0zOTYzMDEyNDhcbiAgICovXG4gIDtcblxuICBfcHJvdG8ucHVzaFByb3ZpZGVyID0gZnVuY3Rpb24gcHVzaFByb3ZpZGVyKHByb3ZpZGVyKSB7XG4gICAgdmFyIGluZGV4ID0gKyt0aGlzLmNvbnRleHRJbmRleDtcbiAgICB2YXIgY29udGV4dCA9IHByb3ZpZGVyLnR5cGUuX2NvbnRleHQ7XG4gICAgdmFyIHRocmVhZElEID0gdGhpcy50aHJlYWRJRDtcbiAgICB2YWxpZGF0ZUNvbnRleHRCb3VuZHMoY29udGV4dCwgdGhyZWFkSUQpO1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gY29udGV4dFt0aHJlYWRJRF07IC8vIFJlbWVtYmVyIHdoaWNoIHZhbHVlIHRvIHJlc3RvcmUgdGhpcyBjb250ZXh0IHRvIG9uIG91ciB3YXkgdXAuXG5cbiAgICB0aGlzLmNvbnRleHRTdGFja1tpbmRleF0gPSBjb250ZXh0O1xuICAgIHRoaXMuY29udGV4dFZhbHVlU3RhY2tbaW5kZXhdID0gcHJldmlvdXNWYWx1ZTtcblxuICAgIHtcbiAgICAgIC8vIE9ubHkgdXNlZCBmb3IgcHVzaC9wb3AgbWlzbWF0Y2ggd2FybmluZ3MuXG4gICAgICB0aGlzLmNvbnRleHRQcm92aWRlclN0YWNrW2luZGV4XSA9IHByb3ZpZGVyO1xuICAgIH0gLy8gTXV0YXRlIHRoZSBjdXJyZW50IHZhbHVlLlxuXG5cbiAgICBjb250ZXh0W3RocmVhZElEXSA9IHByb3ZpZGVyLnByb3BzLnZhbHVlO1xuICB9O1xuXG4gIF9wcm90by5wb3BQcm92aWRlciA9IGZ1bmN0aW9uIHBvcFByb3ZpZGVyKHByb3ZpZGVyKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5jb250ZXh0SW5kZXg7XG5cbiAgICB7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IHByb3ZpZGVyICE9PSB0aGlzLmNvbnRleHRQcm92aWRlclN0YWNrW2luZGV4XSkge1xuICAgICAgICBlcnJvcignVW5leHBlY3RlZCBwb3AuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHRTdGFja1tpbmRleF07XG4gICAgdmFyIHByZXZpb3VzVmFsdWUgPSB0aGlzLmNvbnRleHRWYWx1ZVN0YWNrW2luZGV4XTsgLy8gXCJIaWRlXCIgdGhlc2UgbnVsbCBhc3NpZ25tZW50cyBmcm9tIEZsb3cgYnkgdXNpbmcgYGFueWBcbiAgICAvLyBiZWNhdXNlIGNvbmNlcHR1YWxseSB0aGV5IGFyZSBkZWxldGlvbnMtLWFzIGxvbmcgYXMgd2VcbiAgICAvLyBwcm9taXNlIHRvIG5ldmVyIGFjY2VzcyB2YWx1ZXMgYmV5b25kIGB0aGlzLmNvbnRleHRJbmRleGAuXG5cbiAgICB0aGlzLmNvbnRleHRTdGFja1tpbmRleF0gPSBudWxsO1xuICAgIHRoaXMuY29udGV4dFZhbHVlU3RhY2tbaW5kZXhdID0gbnVsbDtcblxuICAgIHtcbiAgICAgIHRoaXMuY29udGV4dFByb3ZpZGVyU3RhY2tbaW5kZXhdID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHRJbmRleC0tOyAvLyBSZXN0b3JlIHRvIHRoZSBwcmV2aW91cyB2YWx1ZSB3ZSBzdG9yZWQgYXMgd2Ugd2VyZSB3YWxraW5nIGRvd24uXG4gICAgLy8gV2UndmUgYWxyZWFkeSB2ZXJpZmllZCB0aGF0IHRoaXMgY29udGV4dCBoYXMgYmVlbiBleHBhbmRlZCB0byBhY2NvbW1vZGF0ZVxuICAgIC8vIHRoaXMgdGhyZWFkIGlkLCBzbyB3ZSBkb24ndCBuZWVkIHRvIGRvIGl0IGFnYWluLlxuXG4gICAgY29udGV4dFt0aGlzLnRocmVhZElEXSA9IHByZXZpb3VzVmFsdWU7XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyUHJvdmlkZXJzID0gZnVuY3Rpb24gY2xlYXJQcm92aWRlcnMoKSB7XG4gICAgLy8gUmVzdG9yZSBhbnkgcmVtYWluaW5nIHByb3ZpZGVycyBvbiB0aGUgc3RhY2sgdG8gcHJldmlvdXMgdmFsdWVzXG4gICAgZm9yICh2YXIgaW5kZXggPSB0aGlzLmNvbnRleHRJbmRleDsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHRTdGFja1tpbmRleF07XG4gICAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IHRoaXMuY29udGV4dFZhbHVlU3RhY2tbaW5kZXhdO1xuICAgICAgY29udGV4dFt0aGlzLnRocmVhZElEXSA9IHByZXZpb3VzVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5yZWFkID0gZnVuY3Rpb24gcmVhZChieXRlcykge1xuICAgIGlmICh0aGlzLmV4aGF1c3RlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByZXZUaHJlYWRJRCA9IGN1cnJlbnRUaHJlYWRJRDtcbiAgICBzZXRDdXJyZW50VGhyZWFkSUQodGhpcy50aHJlYWRJRCk7XG4gICAgdmFyIHByZXZEaXNwYXRjaGVyID0gUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50O1xuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IERpc3BhdGNoZXI7XG5cbiAgICB0cnkge1xuICAgICAgLy8gTWFya3VwIGdlbmVyYXRlZCB3aXRoaW4gPFN1c3BlbnNlPiBlbmRzIHVwIGJ1ZmZlcmVkIHVudGlsIHdlIGtub3dcbiAgICAgIC8vIG5vdGhpbmcgaW4gdGhhdCBib3VuZGFyeSBzdXNwZW5kZWRcbiAgICAgIHZhciBvdXQgPSBbJyddO1xuICAgICAgdmFyIHN1c3BlbmRlZCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAob3V0WzBdLmxlbmd0aCA8IGJ5dGVzKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZXhoYXVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICBmcmVlVGhyZWFkSUQodGhpcy50aHJlYWRJRCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKHN1c3BlbmRlZCB8fCBmcmFtZS5jaGlsZEluZGV4ID49IGZyYW1lLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBmb290ZXIgPSBmcmFtZS5mb290ZXI7XG5cbiAgICAgICAgICBpZiAoZm9vdGVyICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dhc1RleHROb2RlID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zdGFjay5wb3AoKTtcblxuICAgICAgICAgIGlmIChmcmFtZS50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZnJhbWUudHlwZSAhPSBudWxsICYmIGZyYW1lLnR5cGUudHlwZSAhPSBudWxsICYmIGZyYW1lLnR5cGUudHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSkge1xuICAgICAgICAgICAgdmFyIHByb3ZpZGVyID0gZnJhbWUudHlwZTtcbiAgICAgICAgICAgIHRoaXMucG9wUHJvdmlkZXIocHJvdmlkZXIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZnJhbWUudHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSkge1xuICAgICAgICAgICAgdGhpcy5zdXNwZW5zZURlcHRoLS07XG4gICAgICAgICAgICB2YXIgYnVmZmVyZWQgPSBvdXQucG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChzdXNwZW5kZWQpIHtcbiAgICAgICAgICAgICAgc3VzcGVuZGVkID0gZmFsc2U7IC8vIElmIHJlbmRlcmluZyB3YXMgc3VzcGVuZGVkIGF0IHRoaXMgYm91bmRhcnksIHJlbmRlciB0aGUgZmFsbGJhY2tGcmFtZVxuXG4gICAgICAgICAgICAgIHZhciBmYWxsYmFja0ZyYW1lID0gZnJhbWUuZmFsbGJhY2tGcmFtZTtcblxuICAgICAgICAgICAgICBpZiAoIWZhbGxiYWNrRnJhbWUpIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcih0cnVlID8gXCJSZWFjdERPTVNlcnZlciBkaWQgbm90IGZpbmQgYW4gaW50ZXJuYWwgZmFsbGJhY2sgZnJhbWUgZm9yIFN1c3BlbnNlLiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIiA6IGZvcm1hdFByb2RFcnJvck1lc3NhZ2UoMzAzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKGZhbGxiYWNrRnJhbWUpO1xuICAgICAgICAgICAgICBvdXRbdGhpcy5zdXNwZW5zZURlcHRoXSArPSAnPCEtLSQhLS0+JzsgLy8gU2tpcCBmbHVzaGluZyBvdXRwdXQgc2luY2Ugd2UncmUgc3dpdGNoaW5nIHRvIHRoZSBmYWxsYmFja1xuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb3V0W3RoaXMuc3VzcGVuc2VEZXB0aF0gKz0gYnVmZmVyZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBGbHVzaCBvdXRwdXRcblxuXG4gICAgICAgICAgb3V0W3RoaXMuc3VzcGVuc2VEZXB0aF0gKz0gZm9vdGVyO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkID0gZnJhbWUuY2hpbGRyZW5bZnJhbWUuY2hpbGRJbmRleCsrXTtcbiAgICAgICAgdmFyIG91dEJ1ZmZlciA9ICcnO1xuXG4gICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgcHVzaEN1cnJlbnREZWJ1Z1N0YWNrKHRoaXMuc3RhY2spOyAvLyBXZSdyZSBzdGFydGluZyB3b3JrIG9uIHRoaXMgZnJhbWUsIHNvIHJlc2V0IGl0cyBpbm5lciBzdGFjay5cblxuICAgICAgICAgIGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIG91dEJ1ZmZlciArPSB0aGlzLnJlbmRlcihjaGlsZCwgZnJhbWUuY29udGV4dCwgZnJhbWUuZG9tTmFtZXNwYWNlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyciAhPSBudWxsICYmIHR5cGVvZiBlcnIudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGVuYWJsZVN1c3BlbnNlU2VydmVyUmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgaWYgKCEodGhpcy5zdXNwZW5zZURlcHRoID4gMCkpIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcih0cnVlID8gXCJBIFJlYWN0IGNvbXBvbmVudCBzdXNwZW5kZWQgd2hpbGUgcmVuZGVyaW5nLCBidXQgbm8gZmFsbGJhY2sgVUkgd2FzIHNwZWNpZmllZC5cXG5cXG5BZGQgYSA8U3VzcGVuc2UgZmFsbGJhY2s9Li4uPiBjb21wb25lbnQgaGlnaGVyIGluIHRoZSB0cmVlIHRvIHByb3ZpZGUgYSBsb2FkaW5nIGluZGljYXRvciBvciBwbGFjZWhvbGRlciB0byBkaXNwbGF5LlwiIDogZm9ybWF0UHJvZEVycm9yTWVzc2FnZSgzNDIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFmYWxzZSkge1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKHRydWUgPyBcIlJlYWN0RE9NU2VydmVyIGRvZXMgbm90IHlldCBzdXBwb3J0IFN1c3BlbnNlLlwiIDogZm9ybWF0UHJvZEVycm9yTWVzc2FnZSgyOTQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgcG9wQ3VycmVudERlYnVnU3RhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0Lmxlbmd0aCA8PSB0aGlzLnN1c3BlbnNlRGVwdGgpIHtcbiAgICAgICAgICBvdXQucHVzaCgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRbdGhpcy5zdXNwZW5zZURlcHRoXSArPSBvdXRCdWZmZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRbMF07XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IHByZXZEaXNwYXRjaGVyO1xuICAgICAgc2V0Q3VycmVudFRocmVhZElEKHByZXZUaHJlYWRJRCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoY2hpbGQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhciB0ZXh0ID0gJycgKyBjaGlsZDtcblxuICAgICAgaWYgKHRleHQgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWFrZVN0YXRpY01hcmt1cCkge1xuICAgICAgICByZXR1cm4gZXNjYXBlVGV4dEZvckJyb3dzZXIodGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUpIHtcbiAgICAgICAgcmV0dXJuICc8IS0tIC0tPicgKyBlc2NhcGVUZXh0Rm9yQnJvd3Nlcih0ZXh0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2aW91c1dhc1RleHROb2RlID0gdHJ1ZTtcbiAgICAgIHJldHVybiBlc2NhcGVUZXh0Rm9yQnJvd3Nlcih0ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG5leHRDaGlsZDtcblxuICAgICAgdmFyIF9yZXNvbHZlID0gcmVzb2x2ZShjaGlsZCwgY29udGV4dCwgdGhpcy50aHJlYWRJRCk7XG5cbiAgICAgIG5leHRDaGlsZCA9IF9yZXNvbHZlLmNoaWxkO1xuICAgICAgY29udGV4dCA9IF9yZXNvbHZlLmNvbnRleHQ7XG5cbiAgICAgIGlmIChuZXh0Q2hpbGQgPT09IG51bGwgfHwgbmV4dENoaWxkID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXh0Q2hpbGQpKSB7XG4gICAgICAgIGlmIChuZXh0Q2hpbGQgIT0gbnVsbCAmJiBuZXh0Q2hpbGQuJCR0eXBlb2YgIT0gbnVsbCkge1xuICAgICAgICAgIC8vIENhdGNoIHVuZXhwZWN0ZWQgc3BlY2lhbCB0eXBlcyBlYXJseS5cbiAgICAgICAgICB2YXIgJCR0eXBlb2YgPSBuZXh0Q2hpbGQuJCR0eXBlb2Y7XG5cbiAgICAgICAgICBpZiAoISgkJHR5cGVvZiAhPT0gUkVBQ1RfUE9SVEFMX1RZUEUpKSB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIlBvcnRhbHMgYXJlIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkIGJ5IHRoZSBzZXJ2ZXIgcmVuZGVyZXIuIFJlbmRlciB0aGVtIGNvbmRpdGlvbmFsbHkgc28gdGhhdCB0aGV5IG9ubHkgYXBwZWFyIG9uIHRoZSBjbGllbnQgcmVuZGVyLlwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBDYXRjaC1hbGwgdG8gcHJldmVudCBhbiBpbmZpbml0ZSBsb29wIGlmIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoKSBzdXBwb3J0cyBzb21lIG5ldyB0eXBlLlxuXG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIlVua25vd24gZWxlbWVudC1saWtlIG9iamVjdCB0eXBlOiBcIiArICQkdHlwZW9mLnRvU3RyaW5nKCkgKyBcIi4gVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLlwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRvQXJyYXkobmV4dENoaWxkKTtcbiAgICAgICAgdmFyIGZyYW1lID0ge1xuICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgZG9tTmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UsXG4gICAgICAgICAgY2hpbGRyZW46IG5leHRDaGlsZHJlbixcbiAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHtcbiAgICAgICAgICBmcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSAvLyBTYWZlIGJlY2F1c2Ugd2UganVzdCBjaGVja2VkIGl0J3MgYW4gZWxlbWVudC5cblxuXG4gICAgICB2YXIgbmV4dEVsZW1lbnQgPSBuZXh0Q2hpbGQ7XG4gICAgICB2YXIgZWxlbWVudFR5cGUgPSBuZXh0RWxlbWVudC50eXBlO1xuXG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJET00obmV4dEVsZW1lbnQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZWxlbWVudFR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW4gPSB0b0FycmF5KG5leHRDaGlsZC5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgICAgICAgIHZhciBfZnJhbWUgPSB7XG4gICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogX25leHRDaGlsZHJlbixcbiAgICAgICAgICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBfZnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKF9mcmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJSZWFjdERPTVNlcnZlciBkb2VzIG5vdCB5ZXQgc3VwcG9ydCBTdXNwZW5zZS5cIiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50VHlwZSA9PT0gJ29iamVjdCcgJiYgZWxlbWVudFR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChlbGVtZW50VHlwZS4kJHR5cGVvZikge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXh0Q2hpbGQ7XG5cbiAgICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW40O1xuXG4gICAgICAgICAgICAgIHZhciBjb21wb25lbnRJZGVudGl0eSA9IHt9O1xuICAgICAgICAgICAgICBwcmVwYXJlVG9Vc2VIb29rcyhjb21wb25lbnRJZGVudGl0eSk7XG4gICAgICAgICAgICAgIF9uZXh0Q2hpbGRyZW40ID0gZWxlbWVudFR5cGUucmVuZGVyKGVsZW1lbnQucHJvcHMsIGVsZW1lbnQucmVmKTtcbiAgICAgICAgICAgICAgX25leHRDaGlsZHJlbjQgPSBmaW5pc2hIb29rcyhlbGVtZW50VHlwZS5yZW5kZXIsIGVsZW1lbnQucHJvcHMsIF9uZXh0Q2hpbGRyZW40LCBlbGVtZW50LnJlZik7XG4gICAgICAgICAgICAgIF9uZXh0Q2hpbGRyZW40ID0gdG9BcnJheShfbmV4dENoaWxkcmVuNCk7XG4gICAgICAgICAgICAgIHZhciBfZnJhbWU0ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZG9tTmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IF9uZXh0Q2hpbGRyZW40LFxuICAgICAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICcnXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9mcmFtZTQuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChfZnJhbWU0KTtcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBfZWxlbWVudCA9IG5leHRDaGlsZDtcbiAgICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW41ID0gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUudHlwZSwgX2Fzc2lnbih7XG4gICAgICAgICAgICAgICAgcmVmOiBfZWxlbWVudC5yZWZcbiAgICAgICAgICAgICAgfSwgX2VsZW1lbnQucHJvcHMpKV07XG4gICAgICAgICAgICAgIHZhciBfZnJhbWU1ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZG9tTmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IF9uZXh0Q2hpbGRyZW41LFxuICAgICAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICcnXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9mcmFtZTUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChfZnJhbWU1KTtcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgcHJvdmlkZXIgPSBuZXh0Q2hpbGQ7XG4gICAgICAgICAgICAgIHZhciBuZXh0UHJvcHMgPSBwcm92aWRlci5wcm9wcztcblxuICAgICAgICAgICAgICB2YXIgX25leHRDaGlsZHJlbjYgPSB0b0FycmF5KG5leHRQcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgICAgICAgICAgdmFyIF9mcmFtZTYgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgZG9tTmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IF9uZXh0Q2hpbGRyZW42LFxuICAgICAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICcnXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9mcmFtZTYuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMucHVzaFByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKF9mcmFtZTYpO1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIHJlYWN0Q29udGV4dCA9IG5leHRDaGlsZC50eXBlOyAvLyBUaGUgbG9naWMgYmVsb3cgZm9yIENvbnRleHQgZGlmZmVycyBkZXBlbmRpbmcgb24gUFJPRCBvciBERVYgbW9kZS4gSW5cbiAgICAgICAgICAgICAgLy8gREVWIG1vZGUsIHdlIGNyZWF0ZSBhIHNlcGFyYXRlIG9iamVjdCBmb3IgQ29udGV4dC5Db25zdW1lciB0aGF0IGFjdHNcbiAgICAgICAgICAgICAgLy8gbGlrZSBhIHByb3h5IHRvIENvbnRleHQuIFRoaXMgcHJveHkgb2JqZWN0IGFkZHMgdW5uZWNlc3NhcnkgY29kZSBpbiBQUk9EXG4gICAgICAgICAgICAgIC8vIHNvIHdlIHVzZSB0aGUgb2xkIGJlaGF2aW91ciAoQ29udGV4dC5Db25zdW1lciByZWZlcmVuY2VzIENvbnRleHQpIHRvXG4gICAgICAgICAgICAgIC8vIHJlZHVjZSBzaXplIGFuZCBvdmVyaGVhZC4gVGhlIHNlcGFyYXRlIG9iamVjdCByZWZlcmVuY2VzIGNvbnRleHQgdmlhXG4gICAgICAgICAgICAgIC8vIGEgcHJvcGVydHkgY2FsbGVkIFwiX2NvbnRleHRcIiwgd2hpY2ggYWxzbyBnaXZlcyB1cyB0aGUgYWJpbGl0eSB0byBjaGVja1xuICAgICAgICAgICAgICAvLyBpbiBERVYgbW9kZSBpZiB0aGlzIHByb3BlcnR5IGV4aXN0cyBvciBub3QgYW5kIHdhcm4gaWYgaXQgZG9lcyBub3QuXG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChyZWFjdENvbnRleHQuX2NvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtYXkgYmUgYmVjYXVzZSBpdCdzIGEgQ29udGV4dCAocmF0aGVyIHRoYW4gYSBDb25zdW1lcikuXG4gICAgICAgICAgICAgICAgICAvLyBPciBpdCBtYXkgYmUgYmVjYXVzZSBpdCdzIG9sZGVyIFJlYWN0IHdoZXJlIHRoZXkncmUgdGhlIHNhbWUgdGhpbmcuXG4gICAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gd2FybiBpZiB3ZSdyZSBzdXJlIGl0J3MgYSBuZXcgUmVhY3QuXG4gICAgICAgICAgICAgICAgICBpZiAocmVhY3RDb250ZXh0ICE9PSByZWFjdENvbnRleHQuQ29uc3VtZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dFVzaW5nQ29udGV4dEFzQ29uc3VtZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nQ29udGV4dEFzQ29uc3VtZXIgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dD4gZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Db25zdW1lcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWFjdENvbnRleHQgPSByZWFjdENvbnRleHQuX2NvbnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIF9uZXh0UHJvcHMgPSBuZXh0Q2hpbGQucHJvcHM7XG4gICAgICAgICAgICAgIHZhciB0aHJlYWRJRCA9IHRoaXMudGhyZWFkSUQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRlQ29udGV4dEJvdW5kcyhyZWFjdENvbnRleHQsIHRocmVhZElEKTtcbiAgICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IHJlYWN0Q29udGV4dFt0aHJlYWRJRF07XG5cbiAgICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW43ID0gdG9BcnJheShfbmV4dFByb3BzLmNoaWxkcmVuKG5leHRWYWx1ZSkpO1xuXG4gICAgICAgICAgICAgIHZhciBfZnJhbWU3ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IG5leHRDaGlsZCxcbiAgICAgICAgICAgICAgICBkb21OYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogX25leHRDaGlsZHJlbjcsXG4gICAgICAgICAgICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgIGZvb3RlcjogJydcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX2ZyYW1lNy5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKF9mcmFtZTcpO1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lLW5vLWZhbGx0aHJvdWdoXG5cbiAgICAgICAgICBjYXNlIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEU6XG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0RE9NU2VydmVyIGRvZXMgbm90IHlldCBzdXBwb3J0IHRoZSBmdW5kYW1lbnRhbCBBUEkuXCIgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUtbm8tZmFsbHRocm91Z2hcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgX2VsZW1lbnQyID0gbmV4dENoaWxkO1xuICAgICAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IG5leHRDaGlsZC50eXBlOyAvLyBBdHRlbXB0IHRvIGluaXRpYWxpemUgbGF6eSBjb21wb25lbnQgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZVxuICAgICAgICAgICAgICAvLyBzdXNwZW5zZSBzZXJ2ZXItc2lkZSByZW5kZXJlciBpcyBlbmFibGVkIHNvIHN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgICAgLy8gcmVzb2x2ZWQgY29uc3RydWN0b3JzIGFyZSBzdXBwb3J0ZWQuXG5cbiAgICAgICAgICAgICAgaW5pdGlhbGl6ZUxhenlDb21wb25lbnRUeXBlKGxhenlDb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgIHN3aXRjaCAobGF6eUNvbXBvbmVudC5fc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBSZXNvbHZlZDpcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW45ID0gW1JlYWN0LmNyZWF0ZUVsZW1lbnQobGF6eUNvbXBvbmVudC5fcmVzdWx0LCBfYXNzaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IF9lbGVtZW50Mi5yZWZcbiAgICAgICAgICAgICAgICAgICAgfSwgX2VsZW1lbnQyLnByb3BzKSldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2ZyYW1lOSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBfbmV4dENoaWxkcmVuOSxcbiAgICAgICAgICAgICAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBfZnJhbWU5LmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goX2ZyYW1lOSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgUmVqZWN0ZWQ6XG4gICAgICAgICAgICAgICAgICB0aHJvdyBsYXp5Q29tcG9uZW50Ll9yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFBlbmRpbmc6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0RE9NU2VydmVyIGRvZXMgbm90IHlldCBzdXBwb3J0IGxhenktbG9hZGVkIGNvbXBvbmVudHMuXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUtbm8tZmFsbHRocm91Z2hcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfU0NPUEVfVFlQRTpcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoIFwiUmVhY3RET01TZXJ2ZXIgZG9lcyBub3QgeWV0IHN1cHBvcnQgc2NvcGUgY29tcG9uZW50cy5cIiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmZvID0gJyc7XG5cbiAgICAgIHtcbiAgICAgICAgdmFyIG93bmVyID0gbmV4dEVsZW1lbnQuX293bmVyO1xuXG4gICAgICAgIGlmIChlbGVtZW50VHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBlbGVtZW50VHlwZSA9PT0gJ29iamVjdCcgJiYgZWxlbWVudFR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXMoZWxlbWVudFR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIFwiICsgJ25hbWVkIGltcG9ydHMuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvd25lck5hbWUgPSBvd25lciA/IGdldENvbXBvbmVudE5hbWUob3duZXIpIDogbnVsbDtcblxuICAgICAgICBpZiAob3duZXJOYW1lKSB7XG4gICAgICAgICAgaW5mbyArPSAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBvd25lck5hbWUgKyAnYC4nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHtcbiAgICAgICAge1xuICAgICAgICAgIHRocm93IEVycm9yKCBcIkVsZW1lbnQgdHlwZSBpcyBpbnZhbGlkOiBleHBlY3RlZCBhIHN0cmluZyAoZm9yIGJ1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgY29tcG9uZW50cykgYnV0IGdvdDogXCIgKyAoZWxlbWVudFR5cGUgPT0gbnVsbCA/IGVsZW1lbnRUeXBlIDogdHlwZW9mIGVsZW1lbnRUeXBlKSArIFwiLlwiICsgaW5mbyApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5yZW5kZXJET00gPSBmdW5jdGlvbiByZW5kZXJET00oZWxlbWVudCwgY29udGV4dCwgcGFyZW50TmFtZXNwYWNlKSB7XG4gICAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBuYW1lc3BhY2UgPSBwYXJlbnROYW1lc3BhY2U7XG5cbiAgICBpZiAocGFyZW50TmFtZXNwYWNlID09PSBOYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgIG5hbWVzcGFjZSA9IGdldEludHJpbnNpY05hbWVzcGFjZSh0YWcpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlmIChuYW1lc3BhY2UgPT09IE5hbWVzcGFjZXMuaHRtbCkge1xuICAgICAgICAvLyBTaG91bGQgdGhpcyBjaGVjayBiZSBnYXRlZCBieSBwYXJlbnQgbmFtZXNwYWNlPyBOb3Qgc3VyZSB3ZSB3YW50IHRvXG4gICAgICAgIC8vIGFsbG93IDxTVkc+IG9yIDxtQVRIPi5cbiAgICAgICAgaWYgKHRhZyAhPT0gZWxlbWVudC50eXBlKSB7XG4gICAgICAgICAgZXJyb3IoJzwlcyAvPiBpcyB1c2luZyBpbmNvcnJlY3QgY2FzaW5nLiAnICsgJ1VzZSBQYXNjYWxDYXNlIGZvciBSZWFjdCBjb21wb25lbnRzLCAnICsgJ29yIGxvd2VyY2FzZSBmb3IgSFRNTCBlbGVtZW50cy4nLCBlbGVtZW50LnR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVEYW5nZXJvdXNUYWcodGFnKTtcbiAgICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuXG4gICAgaWYgKHRhZyA9PT0gJ2lucHV0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygnaW5wdXQnLCBwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLmNoZWNrZWQgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0Q2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdENoZWNrZWQpIHtcbiAgICAgICAgICBlcnJvcignJXMgY29udGFpbnMgYW4gaW5wdXQgb2YgdHlwZSAlcyB3aXRoIGJvdGggY2hlY2tlZCBhbmQgZGVmYXVsdENoZWNrZWQgcHJvcHMuICcgKyAnSW5wdXQgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIGNoZWNrZWQgcHJvcCwgb3IgdGhlIGRlZmF1bHRDaGVja2VkIHByb3AsIGJ1dCBub3QgJyArICdib3RoKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCBpbnB1dCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycsICdBIGNvbXBvbmVudCcsIHByb3BzLnR5cGUpO1xuXG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdElucHV0VmFsdWUpIHtcbiAgICAgICAgICBlcnJvcignJXMgY29udGFpbnMgYW4gaW5wdXQgb2YgdHlwZSAlcyB3aXRoIGJvdGggdmFsdWUgYW5kIGRlZmF1bHRWYWx1ZSBwcm9wcy4gJyArICdJbnB1dCBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgaW5wdXQgJyArICdlbGVtZW50IGFuZCByZW1vdmUgb25lIG9mIHRoZXNlIHByb3BzLiBNb3JlIGluZm86ICcgKyAnaHR0cHM6Ly9mYi5tZS9yZWFjdC1jb250cm9sbGVkLWNvbXBvbmVudHMnLCAnQSBjb21wb25lbnQnLCBwcm9wcy50eXBlKTtcblxuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0SW5wdXRWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvcHMgPSBfYXNzaWduKHtcbiAgICAgICAgdHlwZTogdW5kZWZpbmVkXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICBkZWZhdWx0Q2hlY2tlZDogdW5kZWZpbmVkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlICE9IG51bGwgPyBwcm9wcy52YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgY2hlY2tlZDogcHJvcHMuY2hlY2tlZCAhPSBudWxsID8gcHJvcHMuY2hlY2tlZCA6IHByb3BzLmRlZmF1bHRDaGVja2VkXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ3RleHRhcmVhJykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygndGV4dGFyZWEnLCBwcm9wcyk7XG5cbiAgICAgICAgaWYgKHByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5EZWZhdWx0VGV4dGFyZWFWYWx1ZSkge1xuICAgICAgICAgIGVycm9yKCdUZXh0YXJlYSBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdGV4dGFyZWEgJyArICdhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJyk7XG5cbiAgICAgICAgICBkaWRXYXJuRGVmYXVsdFRleHRhcmVhVmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpbml0aWFsVmFsdWUgPSBwcm9wcy52YWx1ZTtcblxuICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWU7IC8vIFRPRE8gKHl1bmdzdGVycyk6IFJlbW92ZSBzdXBwb3J0IGZvciBjaGlsZHJlbiBjb250ZW50IGluIDx0ZXh0YXJlYT4uXG5cbiAgICAgICAgdmFyIHRleHRhcmVhQ2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcblxuICAgICAgICBpZiAodGV4dGFyZWFDaGlsZHJlbiAhPSBudWxsKSB7XG4gICAgICAgICAge1xuICAgICAgICAgICAgZXJyb3IoJ1VzZSB0aGUgYGRlZmF1bHRWYWx1ZWAgb3IgYHZhbHVlYCBwcm9wcyBpbnN0ZWFkIG9mIHNldHRpbmcgJyArICdjaGlsZHJlbiBvbiA8dGV4dGFyZWE+LicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKGRlZmF1bHRWYWx1ZSA9PSBudWxsKSkge1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJJZiB5b3Ugc3VwcGx5IGBkZWZhdWx0VmFsdWVgIG9uIGEgPHRleHRhcmVhPiwgZG8gbm90IHBhc3MgY2hpbGRyZW4uXCIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0ZXh0YXJlYUNoaWxkcmVuKSkge1xuICAgICAgICAgICAgaWYgKCEodGV4dGFyZWFDaGlsZHJlbi5sZW5ndGggPD0gMSkpIHtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIjx0ZXh0YXJlYT4gY2FuIG9ubHkgaGF2ZSBhdCBtb3N0IG9uZSBjaGlsZC5cIiApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRleHRhcmVhQ2hpbGRyZW4gPSB0ZXh0YXJlYUNoaWxkcmVuWzBdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9ICcnICsgdGV4dGFyZWFDaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wcyA9IF9hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkcmVuOiAnJyArIGluaXRpYWxWYWx1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgICB7XG4gICAgICAgIFJlYWN0Q29udHJvbGxlZFZhbHVlUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKCdzZWxlY3QnLCBwcm9wcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZVByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHZhbHVlUHJvcE5hbWVzW2ldO1xuXG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkocHJvcHNbcHJvcE5hbWVdKTtcblxuICAgICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAmJiAhaXNBcnJheSkge1xuICAgICAgICAgICAgZXJyb3IoJ1RoZSBgJXNgIHByb3Agc3VwcGxpZWQgdG8gPHNlbGVjdD4gbXVzdCBiZSBhbiBhcnJheSBpZiAnICsgJ2BtdWx0aXBsZWAgaXMgdHJ1ZS4nLCBwcm9wTmFtZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICghcHJvcHMubXVsdGlwbGUgJiYgaXNBcnJheSkge1xuICAgICAgICAgICAgZXJyb3IoJ1RoZSBgJXNgIHByb3Agc3VwcGxpZWQgdG8gPHNlbGVjdD4gbXVzdCBiZSBhIHNjYWxhciAnICsgJ3ZhbHVlIGlmIGBtdWx0aXBsZWAgaXMgZmFsc2UuJywgcHJvcE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdFNlbGVjdFZhbHVlKSB7XG4gICAgICAgICAgZXJyb3IoJ1NlbGVjdCBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgc2VsZWN0ICcgKyAnZWxlbWVudCBhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJyk7XG5cbiAgICAgICAgICBkaWRXYXJuRGVmYXVsdFNlbGVjdFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRTZWxlY3RWYWx1ZSA9IHByb3BzLnZhbHVlICE9IG51bGwgPyBwcm9wcy52YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZTtcbiAgICAgIHByb3BzID0gX2Fzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICdvcHRpb24nKSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gdGhpcy5jdXJyZW50U2VsZWN0VmFsdWU7XG4gICAgICB2YXIgb3B0aW9uQ2hpbGRyZW4gPSBmbGF0dGVuT3B0aW9uQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICBpZiAoc2VsZWN0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgaWYgKHByb3BzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICB2YWx1ZSA9IHByb3BzLnZhbHVlICsgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBvcHRpb25DaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0VmFsdWUpKSB7XG4gICAgICAgICAgLy8gbXVsdGlwbGVcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlbGVjdFZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoJycgKyBzZWxlY3RWYWx1ZVtqXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWQgPSAnJyArIHNlbGVjdFZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BzID0gX2Fzc2lnbih7XG4gICAgICAgICAgc2VsZWN0ZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGlsZHJlbjogdW5kZWZpbmVkXG4gICAgICAgIH0sIHByb3BzLCB7XG4gICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxuICAgICAgICAgIGNoaWxkcmVuOiBvcHRpb25DaGlsZHJlblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICB2YWxpZGF0ZVByb3BlcnRpZXNJbkRldmVsb3BtZW50KHRhZywgcHJvcHMpO1xuICAgIH1cblxuICAgIGFzc2VydFZhbGlkUHJvcHModGFnLCBwcm9wcyk7XG4gICAgdmFyIG91dCA9IGNyZWF0ZU9wZW5UYWdNYXJrdXAoZWxlbWVudC50eXBlLCB0YWcsIHByb3BzLCBuYW1lc3BhY2UsIHRoaXMubWFrZVN0YXRpY01hcmt1cCwgdGhpcy5zdGFjay5sZW5ndGggPT09IDEpO1xuICAgIHZhciBmb290ZXIgPSAnJztcblxuICAgIGlmIChvbWl0dGVkQ2xvc2VUYWdzLmhhc093blByb3BlcnR5KHRhZykpIHtcbiAgICAgIG91dCArPSAnLz4nO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgKz0gJz4nO1xuICAgICAgZm9vdGVyID0gJzwvJyArIGVsZW1lbnQudHlwZSArICc+JztcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRyZW47XG4gICAgdmFyIGlubmVyTWFya3VwID0gZ2V0Tm9uQ2hpbGRyZW5Jbm5lck1hcmt1cChwcm9wcyk7XG5cbiAgICBpZiAoaW5uZXJNYXJrdXAgIT0gbnVsbCkge1xuICAgICAgY2hpbGRyZW4gPSBbXTtcblxuICAgICAgaWYgKG5ld2xpbmVFYXRpbmdUYWdzLmhhc093blByb3BlcnR5KHRhZykgJiYgaW5uZXJNYXJrdXAuY2hhckF0KDApID09PSAnXFxuJykge1xuICAgICAgICAvLyB0ZXh0L2h0bWwgaWdub3JlcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZXNlIHRhZ3MgaWYgaXQncyBhIG5ld2xpbmVcbiAgICAgICAgLy8gUHJlZmVyIHRvIGJyZWFrIGFwcGxpY2F0aW9uL3htbCBvdmVyIHRleHQvaHRtbCAoZm9yIG5vdykgYnkgYWRkaW5nXG4gICAgICAgIC8vIGEgbmV3bGluZSBzcGVjaWZpY2FsbHkgdG8gZ2V0IGVhdGVuIGJ5IHRoZSBwYXJzZXIuIChBbHRlcm5hdGVseSBmb3JcbiAgICAgICAgLy8gdGV4dGFyZWFzLCByZXBsYWNpbmcgXCJeXFxuXCIgd2l0aCBcIlxcclxcblwiIGRvZXNuJ3QgZ2V0IGVhdGVuLCBhbmQgdGhlIGZpcnN0XG4gICAgICAgIC8vIFxcciBpcyBub3JtYWxpemVkIG91dCBieSBIVE1MVGV4dEFyZWFFbGVtZW50I3ZhbHVlLilcbiAgICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbC1wb2x5Z2xvdC8jbmV3bGluZXMtaW4tdGV4dGFyZWEtYW5kLXByZT5cbiAgICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudC1yZXN0cmljdGlvbnM+XG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI25ld2xpbmVzPlxuICAgICAgICAvLyBTZWU6IFBhcnNpbmcgb2YgXCJ0ZXh0YXJlYVwiIFwibGlzdGluZ1wiIGFuZCBcInByZVwiIGVsZW1lbnRzXG4gICAgICAgIC8vICBmcm9tIDxodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNwYXJzaW5nLW1haW4taW5ib2R5PlxuICAgICAgICBvdXQgKz0gJ1xcbic7XG4gICAgICB9XG5cbiAgICAgIG91dCArPSBpbm5lck1hcmt1cDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRyZW4gPSB0b0FycmF5KHByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICB2YXIgZnJhbWUgPSB7XG4gICAgICBkb21OYW1lc3BhY2U6IGdldENoaWxkTmFtZXNwYWNlKHBhcmVudE5hbWVzcGFjZSwgZWxlbWVudC50eXBlKSxcbiAgICAgIHR5cGU6IHRhZyxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgZm9vdGVyOiBmb290ZXJcbiAgICB9O1xuXG4gICAge1xuICAgICAgZnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWNrLnB1c2goZnJhbWUpO1xuICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IGZhbHNlO1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgcmV0dXJuIFJlYWN0RE9NU2VydmVyUmVuZGVyZXI7XG59KCk7XG5cbi8qKlxuICogUmVuZGVyIGEgUmVhY3RFbGVtZW50IHRvIGl0cyBpbml0aWFsIEhUTUwuIFRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiB0aGVcbiAqIHNlcnZlci5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtZG9tLXNlcnZlci5odG1sI3JlbmRlcnRvc3RyaW5nXG4gKi9cblxuZnVuY3Rpb24gcmVuZGVyVG9TdHJpbmcoZWxlbWVudCkge1xuICB2YXIgcmVuZGVyZXIgPSBuZXcgUmVhY3RET01TZXJ2ZXJSZW5kZXJlcihlbGVtZW50LCBmYWxzZSk7XG5cbiAgdHJ5IHtcbiAgICB2YXIgbWFya3VwID0gcmVuZGVyZXIucmVhZChJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSBmaW5hbGx5IHtcbiAgICByZW5kZXJlci5kZXN0cm95KCk7XG4gIH1cbn1cbi8qKlxuICogU2ltaWxhciB0byByZW5kZXJUb1N0cmluZywgZXhjZXB0IHRoaXMgZG9lc24ndCBjcmVhdGUgZXh0cmEgRE9NIGF0dHJpYnV0ZXNcbiAqIHN1Y2ggYXMgZGF0YS1yZWFjdC1pZCB0aGF0IFJlYWN0IHVzZXMgaW50ZXJuYWxseS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtZG9tLXNlcnZlci5odG1sI3JlbmRlcnRvc3RhdGljbWFya3VwXG4gKi9cblxuZnVuY3Rpb24gcmVuZGVyVG9TdGF0aWNNYXJrdXAoZWxlbWVudCkge1xuICB2YXIgcmVuZGVyZXIgPSBuZXcgUmVhY3RET01TZXJ2ZXJSZW5kZXJlcihlbGVtZW50LCB0cnVlKTtcblxuICB0cnkge1xuICAgIHZhciBtYXJrdXAgPSByZW5kZXJlci5yZWFkKEluZmluaXR5KTtcbiAgICByZXR1cm4gbWFya3VwO1xuICB9IGZpbmFsbHkge1xuICAgIHJlbmRlcmVyLmRlc3Ryb3koKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJUb05vZGVTdHJlYW0oKSB7XG4gIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJSZWFjdERPTVNlcnZlci5yZW5kZXJUb05vZGVTdHJlYW0oKTogVGhlIHN0cmVhbWluZyBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnJvd3Nlci4gVXNlIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKCkgaW5zdGVhZC5cIiApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJUb1N0YXRpY05vZGVTdHJlYW0oKSB7XG4gIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY05vZGVTdHJlYW0oKTogVGhlIHN0cmVhbWluZyBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnJvd3Nlci4gVXNlIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKCkgaW5zdGVhZC5cIiApO1xuICAgIH1cbiAgfVxufSAvLyBOb3RlOiB3aGVuIGNoYW5naW5nIHRoaXMsIGFsc28gY29uc2lkZXIgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMTUyNlxuXG5cbnZhciBSZWFjdERPTVNlcnZlciA9IHtcbiAgcmVuZGVyVG9TdHJpbmc6IHJlbmRlclRvU3RyaW5nLFxuICByZW5kZXJUb1N0YXRpY01hcmt1cDogcmVuZGVyVG9TdGF0aWNNYXJrdXAsXG4gIHJlbmRlclRvTm9kZVN0cmVhbTogcmVuZGVyVG9Ob2RlU3RyZWFtLFxuICByZW5kZXJUb1N0YXRpY05vZGVTdHJlYW06IHJlbmRlclRvU3RhdGljTm9kZVN0cmVhbSxcbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uXG59O1xuXG4vLyBUT0RPOiBkZWNpZGUgb24gdGhlIHRvcC1sZXZlbCBleHBvcnQgZm9ybS5cbi8vIFRoaXMgaXMgaGFja3kgYnV0IG1ha2VzIGl0IHdvcmsgd2l0aCBib3RoIFJvbGx1cCBhbmQgSmVzdFxuXG5cbnZhciBzZXJ2ZXJfYnJvd3NlciA9IFJlYWN0RE9NU2VydmVyLmRlZmF1bHQgfHwgUmVhY3RET01TZXJ2ZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyX2Jyb3dzZXI7XG4gIH0pKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vY2pzL3JlYWN0LWRvbS1zZXJ2ZXIuYnJvd3Nlci5kZXZlbG9wbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjc2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=