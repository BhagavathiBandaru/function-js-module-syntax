"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentGlyphWidget = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/1.49.3/src/vs/workbench/contrib/comments/browser/commentGlyphWidget.ts
var CommentGlyphWidget = /** @class */ (function () {
    function CommentGlyphWidget(editor) {
        this.commentsDecorations = [];
        this.commentsOptions = {
            isWholeLine: true,
            linesDecorationsClassName: 'comment-range-glyph comment-thread'
        };
        this.editor = editor;
    }
    CommentGlyphWidget.prototype.getPosition = function () {
        var model = this.editor.getModel();
        var range = model && this.commentsDecorations && this.commentsDecorations.length
            ? model.getDecorationRange(this.commentsDecorations[0])
            : null;
        return range ? range.startLineNumber : this.lineNumber;
    };
    CommentGlyphWidget.prototype.setLineNumber = function (lineNumber) {
        this.lineNumber = lineNumber;
        var commentsDecorations = [{
                range: {
                    startLineNumber: lineNumber, startColumn: 1,
                    endLineNumber: lineNumber, endColumn: 1
                },
                options: this.commentsOptions
            }];
        this.commentsDecorations = this.editor.deltaDecorations(this.commentsDecorations, commentsDecorations);
    };
    CommentGlyphWidget.prototype.dispose = function () {
        if (this.commentsDecorations) {
            this.editor.deltaDecorations(this.commentsDecorations, []);
        }
    };
    return CommentGlyphWidget;
}());
exports.CommentGlyphWidget = CommentGlyphWidget;
//# sourceMappingURL=comment-glyph-widget.js.map