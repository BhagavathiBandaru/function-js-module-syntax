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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentingRangeDecorator = void 0;
var inversify_1 = require("inversify");
var CommentingRangeDecorator = /** @class */ (function () {
    function CommentingRangeDecorator() {
        this.commentingRangeDecorations = [];
        this.decorationOptions = {
            isWholeLine: true,
            linesDecorationsClassName: 'comment-range-glyph comment-diff-added'
        };
    }
    CommentingRangeDecorator.prototype.update = function (editor, commentInfos) {
        var e_1, _a;
        var _this = this;
        var model = editor.getModel();
        if (!model) {
            return;
        }
        var commentingRangeDecorations = [];
        var _loop_1 = function (info) {
            info.commentingRanges.ranges.forEach(function (range) {
                commentingRangeDecorations.push(new CommentingRangeDecoration(editor, info.owner, info.extensionId, info.label, range, _this.decorationOptions, info.commentingRanges));
            });
        };
        try {
            for (var commentInfos_1 = __values(commentInfos), commentInfos_1_1 = commentInfos_1.next(); !commentInfos_1_1.done; commentInfos_1_1 = commentInfos_1.next()) {
                var info = commentInfos_1_1.value;
                _loop_1(info);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (commentInfos_1_1 && !commentInfos_1_1.done && (_a = commentInfos_1.return)) _a.call(commentInfos_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var oldDecorations = this.commentingRangeDecorations.map(function (decoration) { return decoration.id; });
        editor.deltaDecorations(oldDecorations, []);
        this.commentingRangeDecorations = commentingRangeDecorations;
    };
    CommentingRangeDecorator.prototype.getMatchedCommentAction = function (line) {
        var e_2, _a;
        var result = [];
        try {
            for (var _b = __values(this.commentingRangeDecorations), _c = _b.next(); !_c.done; _c = _b.next()) {
                var decoration = _c.value;
                var range = decoration.getActiveRange();
                if (range && range.startLineNumber <= line && line <= range.endLineNumber) {
                    result.push(decoration.getCommentAction());
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    CommentingRangeDecorator = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CommentingRangeDecorator);
    return CommentingRangeDecorator;
}());
exports.CommentingRangeDecorator = CommentingRangeDecorator;
var CommentingRangeDecoration = /** @class */ (function () {
    function CommentingRangeDecoration(_editor, _ownerId, _extensionId, _label, _range, commentingOptions, commentingRangesInfo) {
        this._editor = _editor;
        this._ownerId = _ownerId;
        this._extensionId = _extensionId;
        this._label = _label;
        this._range = _range;
        this.commentingRangesInfo = commentingRangesInfo;
        var startLineNumber = _range.startLineNumber;
        var endLineNumber = _range.endLineNumber;
        var commentingRangeDecorations = [{
                range: {
                    startLineNumber: startLineNumber, startColumn: 1,
                    endLineNumber: endLineNumber, endColumn: 1
                },
                options: commentingOptions
            }];
        this.decorationId = this._editor.deltaDecorations([], commentingRangeDecorations)[0];
    }
    Object.defineProperty(CommentingRangeDecoration.prototype, "id", {
        get: function () {
            return this.decorationId;
        },
        enumerable: false,
        configurable: true
    });
    CommentingRangeDecoration.prototype.getCommentAction = function () {
        return {
            extensionId: this._extensionId,
            label: this._label,
            ownerId: this._ownerId,
            commentingRangesInfo: this.commentingRangesInfo
        };
    };
    CommentingRangeDecoration.prototype.getOriginalRange = function () {
        return this._range;
    };
    CommentingRangeDecoration.prototype.getActiveRange = function () {
        var range = this._editor.getModel().getDecorationRange(this.decorationId);
        if (range) {
            return range;
        }
    };
    return CommentingRangeDecoration;
}());
//# sourceMappingURL=comments-decorator.js.map