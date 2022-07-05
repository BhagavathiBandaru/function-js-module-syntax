"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareEntries = exports.compareByPrefix = exports.compareAnything = exports.noIntlCompareFileNames = exports.compareFileNames = exports.setFileNameComparer = void 0;
// Copied from https://github.com/microsoft/vscode/blob/standalone/0.17.x/src/vs/base/common/comparers.ts
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var strings = monaco.strings;
var intlFileNameCollator;
function setFileNameComparer(collator) {
    intlFileNameCollator = collator;
}
exports.setFileNameComparer = setFileNameComparer;
function compareFileNames(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    if (intlFileNameCollator) {
        var a = one || '';
        var b = other || '';
        var result = intlFileNameCollator.getValue().collator.compare(a, b);
        // Using the numeric option in the collator will
        // make compare(`foo1`, `foo01`) === 0. We must disambiguate.
        if (intlFileNameCollator.getValue().collatorIsNumeric && result === 0 && a !== b) {
            return a < b ? -1 : 1;
        }
        return result;
    }
    return noIntlCompareFileNames(one, other, caseSensitive);
}
exports.compareFileNames = compareFileNames;
var FileNameMatch = /^(.*?)(\.([^.]*))?$/;
function noIntlCompareFileNames(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    if (!caseSensitive) {
        one = one && one.toLowerCase();
        other = other && other.toLowerCase();
    }
    var _a = __read(extractNameAndExtension(one), 2), oneName = _a[0], oneExtension = _a[1];
    var _b = __read(extractNameAndExtension(other), 2), otherName = _b[0], otherExtension = _b[1];
    if (oneName !== otherName) {
        return oneName < otherName ? -1 : 1;
    }
    if (oneExtension === otherExtension) {
        return 0;
    }
    return oneExtension < otherExtension ? -1 : 1;
}
exports.noIntlCompareFileNames = noIntlCompareFileNames;
function extractNameAndExtension(str) {
    var match = str ? FileNameMatch.exec(str) : [];
    return [(match && match[1]) || '', (match && match[3]) || ''];
}
function compareAnything(one, other, lookFor) {
    var elementAName = one.toLowerCase();
    var elementBName = other.toLowerCase();
    // Sort prefix matches over non prefix matches
    var prefixCompare = compareByPrefix(one, other, lookFor);
    if (prefixCompare) {
        return prefixCompare;
    }
    // Sort suffix matches over non suffix matches
    var elementASuffixMatch = strings.endsWith(elementAName, lookFor);
    var elementBSuffixMatch = strings.endsWith(elementBName, lookFor);
    if (elementASuffixMatch !== elementBSuffixMatch) {
        return elementASuffixMatch ? -1 : 1;
    }
    // Understand file names
    var r = compareFileNames(elementAName, elementBName);
    if (r !== 0) {
        return r;
    }
    // Compare by name
    return elementAName.localeCompare(elementBName);
}
exports.compareAnything = compareAnything;
function compareByPrefix(one, other, lookFor) {
    var elementAName = one.toLowerCase();
    var elementBName = other.toLowerCase();
    // Sort prefix matches over non prefix matches
    var elementAPrefixMatch = strings.startsWith(elementAName, lookFor);
    var elementBPrefixMatch = strings.startsWith(elementBName, lookFor);
    if (elementAPrefixMatch !== elementBPrefixMatch) {
        return elementAPrefixMatch ? -1 : 1;
    }
    else if (elementAPrefixMatch && elementBPrefixMatch) { // Same prefix: Sort shorter matches to the top to have those on top that match more precisely
        if (elementAName.length < elementBName.length) {
            return -1;
        }
        if (elementAName.length > elementBName.length) {
            return 1;
        }
    }
    return 0;
}
exports.compareByPrefix = compareByPrefix;
/**
 * A good default sort implementation for quick open entries respecting highlight information
 * as well as associated resources.
 */
// copied from vscode: https://github.com/microsoft/vscode/blob/standalone/0.17.x/src/vs/base/parts/quickopen/browser/quickOpenModel.ts#L584
function compareEntries(elementA, elementB, lookFor) {
    // Give matches with label highlights higher priority over
    // those with only description highlights
    var labelHighlightsA = elementA.getHighlights()[0] || [];
    var labelHighlightsB = elementB.getHighlights()[0] || [];
    if (labelHighlightsA.length && !labelHighlightsB.length) {
        return -1;
    }
    if (!labelHighlightsA.length && labelHighlightsB.length) {
        return 1;
    }
    // Fallback to the full path if labels are identical and we have associated resources
    var nameA = elementA.getLabel();
    var nameB = elementB.getLabel();
    if (nameA === nameB) {
        var resourceA = elementA.getResource();
        var resourceB = elementB.getResource();
        if (resourceA && resourceB) {
            nameA = resourceA.fsPath;
            nameB = resourceB.fsPath;
        }
    }
    return compareAnything(nameA, nameB, lookFor);
}
exports.compareEntries = compareEntries;
//# sourceMappingURL=monaco-comparers.js.map