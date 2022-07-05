"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
exports.TernarySearchTree = exports.UriIterator = exports.PathIterator = void 0;
var strings_1 = require("./strings");
var PathIterator = /** @class */ (function () {
    function PathIterator(_splitOnBackslash, _caseSensitive) {
        if (_splitOnBackslash === void 0) { _splitOnBackslash = true; }
        if (_caseSensitive === void 0) { _caseSensitive = true; }
        this._splitOnBackslash = _splitOnBackslash;
        this._caseSensitive = _caseSensitive;
    }
    PathIterator.prototype.reset = function (key) {
        this._value = key.replace(/\\$|\/$/, '');
        this._from = 0;
        this._to = 0;
        return this.next();
    };
    PathIterator.prototype.hasNext = function () {
        return this._to < this._value.length;
    };
    PathIterator.prototype.next = function () {
        // this._data = key.split(/[\\/]/).filter(s => !!s);
        this._from = this._to;
        var justSeps = true;
        for (; this._to < this._value.length; this._to++) {
            var ch = this._value.charCodeAt(this._to);
            if (ch === 47 /* Slash */ || this._splitOnBackslash && ch === 92 /* Backslash */) {
                if (justSeps) {
                    this._from++;
                }
                else {
                    break;
                }
            }
            else {
                justSeps = false;
            }
        }
        return this;
    };
    PathIterator.prototype.cmp = function (a) {
        return this._caseSensitive
            ? strings_1.compareSubstring(a, this._value, 0, a.length, this._from, this._to)
            : strings_1.compareSubstringIgnoreCase(a, this._value, 0, a.length, this._from, this._to);
    };
    PathIterator.prototype.value = function () {
        return this._value.substring(this._from, this._to);
    };
    return PathIterator;
}());
exports.PathIterator = PathIterator;
var UriIterator = /** @class */ (function () {
    function UriIterator(caseSensitive) {
        this.caseSensitive = caseSensitive;
        this._states = [];
        this._stateIdx = 0;
    }
    UriIterator.prototype.reset = function (key) {
        this._value = key;
        this._states = [];
        if (this._value.scheme) {
            this._states.push(1 /* Scheme */);
        }
        if (this._value.authority) {
            this._states.push(2 /* Authority */);
        }
        if (this._value.path) {
            this._pathIterator = new PathIterator(false, this.caseSensitive);
            this._pathIterator.reset(key.path.toString());
            if (this._pathIterator.value()) {
                this._states.push(3 /* Path */);
            }
        }
        if (this._value.query) {
            this._states.push(4 /* Query */);
        }
        if (this._value.fragment) {
            this._states.push(5 /* Fragment */);
        }
        this._stateIdx = 0;
        return this;
    };
    UriIterator.prototype.next = function () {
        if (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext()) {
            this._pathIterator.next();
        }
        else {
            this._stateIdx += 1;
        }
        return this;
    };
    UriIterator.prototype.hasNext = function () {
        return (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext())
            || this._stateIdx < this._states.length - 1;
    };
    UriIterator.prototype.cmp = function (a) {
        if (this._states[this._stateIdx] === 1 /* Scheme */) {
            return strings_1.compareSubstringIgnoreCase(a, this._value.scheme);
        }
        else if (this._states[this._stateIdx] === 2 /* Authority */) {
            return strings_1.compareSubstringIgnoreCase(a, this._value.authority);
        }
        else if (this._states[this._stateIdx] === 3 /* Path */) {
            return this._pathIterator.cmp(a);
        }
        else if (this._states[this._stateIdx] === 4 /* Query */) {
            return strings_1.compare(a, this._value.query);
        }
        else if (this._states[this._stateIdx] === 5 /* Fragment */) {
            return strings_1.compare(a, this._value.fragment);
        }
        throw new Error();
    };
    UriIterator.prototype.value = function () {
        if (this._states[this._stateIdx] === 1 /* Scheme */) {
            return this._value.scheme;
        }
        else if (this._states[this._stateIdx] === 2 /* Authority */) {
            return this._value.authority;
        }
        else if (this._states[this._stateIdx] === 3 /* Path */) {
            return this._pathIterator.value();
        }
        else if (this._states[this._stateIdx] === 4 /* Query */) {
            return this._value.query;
        }
        else if (this._states[this._stateIdx] === 5 /* Fragment */) {
            return this._value.fragment;
        }
        throw new Error();
    };
    return UriIterator;
}());
exports.UriIterator = UriIterator;
var TernarySearchTreeNode = /** @class */ (function () {
    function TernarySearchTreeNode() {
    }
    TernarySearchTreeNode.prototype.isEmpty = function () {
        return !this.left && !this.mid && !this.right && !this.value;
    };
    return TernarySearchTreeNode;
}());
var TernarySearchTree = /** @class */ (function () {
    function TernarySearchTree(segments) {
        this._iter = segments;
    }
    TernarySearchTree.forUris = function (caseSensitive) {
        return new TernarySearchTree(new UriIterator(caseSensitive));
    };
    TernarySearchTree.forPaths = function () {
        return new TernarySearchTree(new PathIterator());
    };
    TernarySearchTree.prototype.clear = function () {
        this._root = undefined;
    };
    TernarySearchTree.prototype.set = function (key, element) {
        var iter = this._iter.reset(key);
        var node;
        if (!this._root) {
            this._root = new TernarySearchTreeNode();
            this._root.segment = iter.value();
        }
        node = this._root;
        while (true) {
            var val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                if (!node.left) {
                    node.left = new TernarySearchTreeNode();
                    node.left.segment = iter.value();
                }
                node = node.left;
            }
            else if (val < 0) {
                // right
                if (!node.right) {
                    node.right = new TernarySearchTreeNode();
                    node.right.segment = iter.value();
                }
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                if (!node.mid) {
                    node.mid = new TernarySearchTreeNode();
                    node.mid.segment = iter.value();
                }
                node = node.mid;
            }
            else {
                break;
            }
        }
        var oldElement = node.value;
        node.value = element;
        node.key = key;
        return oldElement;
    };
    TernarySearchTree.prototype.get = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        while (node) {
            var val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            }
            else {
                break;
            }
        }
        return node ? node.value : undefined;
    };
    TernarySearchTree.prototype.delete = function (key) {
        var iter = this._iter.reset(key);
        var stack = [];
        var node = this._root;
        // find and unset node
        while (node) {
            var val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                stack.push([1, node]);
                node = node.left;
            }
            else if (val < 0) {
                // right
                stack.push([-1, node]);
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                stack.push([0, node]);
                node = node.mid;
            }
            else {
                // remove element
                node.value = undefined;
                // clean up empty nodes
                while (stack.length > 0 && node.isEmpty()) {
                    var _a = __read(stack.pop(), 2), dir = _a[0], parent_1 = _a[1];
                    switch (dir) {
                        case 1:
                            parent_1.left = undefined;
                            break;
                        case 0:
                            parent_1.mid = undefined;
                            break;
                        case -1:
                            parent_1.right = undefined;
                            break;
                    }
                    node = parent_1;
                }
                break;
            }
        }
    };
    TernarySearchTree.prototype.findSubstr = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        var candidate = undefined;
        while (node) {
            var val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                candidate = node.value || candidate;
                node = node.mid;
            }
            else {
                break;
            }
        }
        return node && node.value || candidate;
    };
    TernarySearchTree.prototype.findSuperstr = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        while (node) {
            var val = iter.cmp(node.segment);
            if (val > 0) {
                // left
                node = node.left;
            }
            else if (val < 0) {
                // right
                node = node.right;
            }
            else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            }
            else {
                // collect
                if (!node.mid) {
                    return undefined;
                }
                else {
                    return this._nodeIterator(node.mid);
                }
            }
        }
        return undefined;
    };
    TernarySearchTree.prototype._nodeIterator = function (node) {
        var _this = this;
        var res;
        var idx;
        var data;
        var next = function () {
            if (!data) {
                // lazy till first invocation
                data = [];
                idx = 0;
                _this._forEach(node, function (value) { return data.push(value); });
            }
            if (idx >= data.length) {
                return { done: true, value: undefined };
            }
            if (!res) {
                res = { done: false, value: data[idx++] };
            }
            else {
                res.value = data[idx++];
            }
            return res;
        };
        return { next: next };
    };
    TernarySearchTree.prototype.forEach = function (callback) {
        this._forEach(this._root, callback);
    };
    TernarySearchTree.prototype._forEach = function (node, callback) {
        if (node) {
            // left
            this._forEach(node.left, callback);
            // node
            if (node.value) {
                // callback(node.value, this._iter.join(parts));
                callback(node.value, node.key);
            }
            // mid
            this._forEach(node.mid, callback);
            // right
            this._forEach(node.right, callback);
        }
    };
    return TernarySearchTree;
}());
exports.TernarySearchTree = TernarySearchTree;
//# sourceMappingURL=ternary-search-tree.js.map