"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAction = exports.CommentActions = exports.CommentsInlineAction = exports.CommentEditContainer = exports.CommentBody = exports.ReviewComment = exports.CommentForm = exports.CommentThreadWidget = exports.COMMENT_TITLE = exports.COMMENT_CONTEXT = exports.COMMENT_THREAD_CONTEXT = void 0;
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
var monaco_editor_zone_widget_1 = require("@theia/monaco/lib/browser/monaco-editor-zone-widget");
var plugin_api_rpc_model_1 = require("../../../common/plugin-api-rpc-model");
var comment_glyph_widget_1 = require("./comment-glyph-widget");
var browser_1 = require("@theia/core/lib/browser");
var ReactDOM = require("react-dom");
var React = require("react");
var browser_2 = require("@theia/editor/lib/browser");
var common_1 = require("@theia/core/lib/common");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code copied and modified from https://github.com/microsoft/vscode/blob/1.49.3/src/vs/workbench/contrib/comments/browser/commentThreadWidget.ts
exports.COMMENT_THREAD_CONTEXT = ['comment_thread-context-menu'];
exports.COMMENT_CONTEXT = ['comment-context-menu'];
exports.COMMENT_TITLE = ['comment-title-menu'];
var CommentThreadWidget = /** @class */ (function (_super) {
    __extends(CommentThreadWidget, _super);
    function CommentThreadWidget(editor, _owner, _commentThread, commentService, menus, contextKeyService, commands) {
        var _this = _super.call(this) || this;
        _this._owner = _owner;
        _this._commentThread = _commentThread;
        _this.commentService = commentService;
        _this.menus = menus;
        _this.contextKeyService = contextKeyService;
        _this.commands = commands;
        _this.commentFormRef = React.createRef();
        _this.toDispose.push(_this.zoneWidget = new monaco_editor_zone_widget_1.MonacoEditorZoneWidget(editor));
        _this.toDispose.push(_this.commentGlyphWidget = new comment_glyph_widget_1.CommentGlyphWidget(editor));
        _this.toDispose.push(_this._commentThread.onDidChangeCollapsibleState(function (state) {
            if (state === plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded && !_this.isExpanded) {
                var lineNumber = _this._commentThread.range.startLineNumber;
                _this.display({ afterLineNumber: lineNumber, afterColumn: 1, heightInLines: 2 });
                return;
            }
            if (state === plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed && _this.isExpanded) {
                _this.hide();
                return;
            }
        }));
        _this.contextKeyService.commentIsEmpty.set(true);
        _this.toDispose.push(_this.zoneWidget.editor.onMouseDown(function (e) { return _this.onEditorMouseDown(e); }));
        _this.toDispose.push(_this.contextKeyService.onDidChange(function () {
            var commentForm = _this.commentFormRef.current;
            if (commentForm) {
                commentForm.update();
            }
        }));
        _this.contextMenu = _this.menus.getMenu(exports.COMMENT_THREAD_CONTEXT);
        _this.contextMenu.children.map(function (node) { return node instanceof common_1.ActionMenuNode && node.action.when; }).forEach(function (exp) {
            if (typeof exp === 'string') {
                _this.contextKeyService.setExpression(exp);
            }
        });
        return _this;
    }
    CommentThreadWidget.prototype.getGlyphPosition = function () {
        return this.commentGlyphWidget.getPosition();
    };
    CommentThreadWidget.prototype.collapse = function () {
        this._commentThread.collapsibleState = plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed;
        if (this._commentThread.comments && this._commentThread.comments.length === 0) {
            this.deleteCommentThread();
        }
        this.hide();
    };
    CommentThreadWidget.prototype.deleteCommentThread = function () {
        this.dispose();
        this.commentService.disposeCommentThread(this.owner, this._commentThread.threadId);
    };
    CommentThreadWidget.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.commentGlyphWidget) {
            this.commentGlyphWidget.dispose();
        }
    };
    CommentThreadWidget.prototype.toggleExpand = function (lineNumber) {
        if (this.isExpanded) {
            this._commentThread.collapsibleState = plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed;
            this.hide();
            if (!this._commentThread.comments || !this._commentThread.comments.length) {
                this.deleteCommentThread();
            }
        }
        else {
            this._commentThread.collapsibleState = plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded;
            this.display({ afterLineNumber: lineNumber, afterColumn: 1, heightInLines: 2 });
        }
    };
    CommentThreadWidget.prototype.hide = function () {
        this.zoneWidget.hide();
        this.isExpanded = false;
        _super.prototype.hide.call(this);
    };
    CommentThreadWidget.prototype.display = function (options) {
        this.isExpanded = true;
        if (this._commentThread.collapsibleState && this._commentThread.collapsibleState !== plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded) {
            return;
        }
        this.commentGlyphWidget.setLineNumber(options.afterLineNumber);
        this._commentThread.collapsibleState = plugin_api_rpc_model_1.CommentThreadCollapsibleState.Expanded;
        this.zoneWidget.show(options);
        this.update();
    };
    CommentThreadWidget.prototype.onEditorMouseDown = function (e) {
        var range = e.target.range;
        if (!range) {
            return;
        }
        if (!e.event.leftButton) {
            return;
        }
        if (e.target.type !== browser_2.MouseTargetType.GUTTER_LINE_DECORATIONS) {
            return;
        }
        var data = e.target.detail;
        var gutterOffsetX = data.offsetX - data.glyphMarginWidth - data.lineNumbersWidth - data.glyphMarginLeft;
        // don't collide with folding and git decorations
        if (gutterOffsetX > 14) {
            return;
        }
        var mouseDownInfo = { lineNumber: range.startLineNumber };
        var lineNumber = mouseDownInfo.lineNumber;
        if (!range || range.startLineNumber !== lineNumber) {
            return;
        }
        if (e.target.type !== browser_2.MouseTargetType.GUTTER_LINE_DECORATIONS) {
            return;
        }
        if (!e.target.element) {
            return;
        }
        if (this.commentGlyphWidget && this.commentGlyphWidget.getPosition() !== lineNumber) {
            return;
        }
        if (e.target.element.className.indexOf('comment-thread') >= 0) {
            this.toggleExpand(lineNumber);
            return;
        }
        if (this._commentThread.collapsibleState === plugin_api_rpc_model_1.CommentThreadCollapsibleState.Collapsed) {
            this.display({ afterLineNumber: mouseDownInfo.lineNumber, heightInLines: 2 });
        }
        else {
            this.hide();
        }
    };
    Object.defineProperty(CommentThreadWidget.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommentThreadWidget.prototype, "commentThread", {
        get: function () {
            return this._commentThread;
        },
        enumerable: false,
        configurable: true
    });
    CommentThreadWidget.prototype.getThreadLabel = function () {
        var label;
        label = this._commentThread.label;
        if (label === undefined) {
            if (this._commentThread.comments && this._commentThread.comments.length) {
                var onlyUnique = function (value, index, self) { return self.indexOf(value) === index; };
                var participantsList = this._commentThread.comments.filter(onlyUnique).map(function (comment) { return "@" + comment.userName; }).join(', ');
                label = "Participants: " + participantsList;
            }
            else {
                label = 'Start discussion';
            }
        }
        return label;
    };
    CommentThreadWidget.prototype.update = function () {
        if (!this.isExpanded) {
            return;
        }
        this.render();
        var headHeight = Math.ceil(this.zoneWidget.editor.getOption(monaco.editor.EditorOption.lineHeight) * 1.2);
        var lineHeight = this.zoneWidget.editor.getOption(monaco.editor.EditorOption.lineHeight);
        var arrowHeight = Math.round(lineHeight / 3);
        var frameThickness = Math.round(lineHeight / 9) * 2;
        var body = this.zoneWidget.containerNode.getElementsByClassName('body')[0];
        var computedLinesNumber = Math.ceil((headHeight + body.clientHeight + arrowHeight + frameThickness + 8 /** margin bottom to avoid margin collapse */) / lineHeight);
        this.zoneWidget.show({ afterLineNumber: this._commentThread.range.startLineNumber, heightInLines: computedLinesNumber });
    };
    CommentThreadWidget.prototype.render = function () {
        var _this = this;
        var _a;
        var headHeight = Math.ceil(this.zoneWidget.editor.getOption(monaco.editor.EditorOption.lineHeight) * 1.2);
        ReactDOM.render(React.createElement("div", { className: 'review-widget' },
            React.createElement("div", { className: 'head', style: { height: headHeight, lineHeight: headHeight + "px" } },
                React.createElement("div", { className: 'review-title' },
                    React.createElement("span", { className: 'filename' }, this.getThreadLabel())),
                React.createElement("div", { className: 'review-actions' },
                    React.createElement("div", { className: 'monaco-action-bar animated' },
                        React.createElement("ul", { className: 'actions-container', role: 'toolbar' },
                            React.createElement("li", { className: 'action-item', role: 'presentation' },
                                React.createElement("a", { className: 'action-label codicon expand-review-action codicon-chevron-up', role: 'button', tabIndex: 0, title: 'Collapse', onClick: function () { return _this.collapse(); } })))))),
            React.createElement("div", { className: 'body' },
                React.createElement("div", { className: 'comments-container', role: 'presentation', tabIndex: 0 }, (_a = this._commentThread.comments) === null || _a === void 0 ? void 0 : _a.map(function (comment, index) { return React.createElement(ReviewComment, { key: index, contextKeyService: _this.contextKeyService, menus: _this.menus, comment: comment, commentForm: _this.commentFormRef, commands: _this.commands, commentThread: _this._commentThread }); })),
                React.createElement(CommentForm, { contextKeyService: this.contextKeyService, commands: this.commands, commentThread: this._commentThread, menus: this.menus, widget: this, ref: this.commentFormRef }))), this.zoneWidget.containerNode);
    };
    return CommentThreadWidget;
}(browser_1.BaseWidget));
exports.CommentThreadWidget = CommentThreadWidget;
var CommentForm = /** @class */ (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm(props) {
        var _this = _super.call(this, props) || this;
        _this.inputRef = React.createRef();
        _this.inputValue = '';
        _this.getInput = function () { return _this.inputValue; };
        _this.clearInput = function () {
            var input = _this.inputRef.current;
            if (input) {
                _this.inputValue = '';
                input.value = _this.inputValue;
                _this.props.contextKeyService.commentIsEmpty.set(true);
            }
        };
        _this.expand = function () {
            _this.setState({ expanded: true });
            // Wait for the widget to be rendered.
            setTimeout(function () {
                var _a;
                // Update the widget's height.
                _this.props.widget.update();
                (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 100);
        };
        _this.collapse = function () {
            _this.setState({ expanded: false });
            // Wait for the widget to be rendered.
            setTimeout(function () {
                // Update the widget's height.
                _this.props.widget.update();
            }, 100);
        };
        _this.onInput = function (event) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var value = event.target.value;
            if (_this.inputValue.length === 0 || value.length === 0) {
                _this.props.contextKeyService.commentIsEmpty.set(value.length === 0);
            }
            _this.inputValue = value;
        };
        _this.state = {
            expanded: false
        };
        var setState = _this.setState.bind(_this);
        _this.setState = function (newState) {
            setState(newState);
        };
        _this.menu = _this.props.menus.getMenu(exports.COMMENT_THREAD_CONTEXT);
        _this.menu.children.map(function (node) { return node instanceof common_1.ActionMenuNode && node.action.when; }).forEach(function (exp) {
            if (typeof exp === 'string') {
                _this.props.contextKeyService.setExpression(exp);
            }
        });
        return _this;
    }
    CommentForm.prototype.update = function () {
        this.setState(this.state);
    };
    CommentForm.prototype.componentDidMount = function () {
        var _this = this;
        // Wait for the widget to be rendered.
        setTimeout(function () {
            var _a;
            (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 100);
    };
    CommentForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, commands = _a.commands, commentThread = _a.commentThread, contextKeyService = _a.contextKeyService;
        var hasExistingComments = commentThread.comments && commentThread.comments.length > 0;
        return React.createElement("div", { className: 'comment-form' + (this.state.expanded || commentThread.comments && commentThread.comments.length === 0 ? ' expand' : '') },
            React.createElement("div", { className: 'theia-comments-input-message-container' },
                React.createElement("textarea", { className: 'theia-comments-input-message theia-input', placeholder: hasExistingComments ? 'Reply...' : 'Type a new comment', onInput: this.onInput, 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onBlur: function (event) {
                        if (event.target.value.length > 0) {
                            return;
                        }
                        if (event.relatedTarget && event.relatedTarget.className === 'comments-button comments-text-button theia-button') {
                            _this.state = { expanded: false };
                            return;
                        }
                        _this.collapse();
                    }, ref: this.inputRef })),
            React.createElement(CommentActions, { menu: this.menu, contextKeyService: contextKeyService, commands: commands, commentThread: commentThread, getInput: this.getInput, clearInput: this.clearInput }),
            React.createElement("button", { className: 'review-thread-reply-button', title: 'Reply...', onClick: this.expand }, "Reply..."));
    };
    return CommentForm;
}(React.Component));
exports.CommentForm = CommentForm;
var ReviewComment = /** @class */ (function (_super) {
    __extends(ReviewComment, _super);
    function ReviewComment(props) {
        var _this = _super.call(this, props) || this;
        _this.detectHover = function (element) {
            if (element) {
                window.requestAnimationFrame(function () {
                    var hover = element.matches(':hover');
                    _this.setState({ hover: hover });
                });
            }
        };
        _this.showHover = function () { return _this.setState({ hover: true }); };
        _this.hideHover = function () { return _this.setState({ hover: false }); };
        _this.state = {
            hover: false
        };
        var setState = _this.setState.bind(_this);
        _this.setState = function (newState) {
            setState(newState);
        };
        return _this;
    }
    ReviewComment.prototype.render = function () {
        var _a = this.props, comment = _a.comment, commentForm = _a.commentForm, contextKeyService = _a.contextKeyService, menus = _a.menus, commands = _a.commands, commentThread = _a.commentThread;
        var commentUniqueId = comment.uniqueIdInThread;
        var hover = this.state.hover;
        contextKeyService.comment.set(comment.contextValue);
        return React.createElement("div", { className: 'review-comment', tabIndex: -1, "aria-label": comment.userName + ", " + comment.body.value, ref: this.detectHover, onMouseEnter: this.showHover, onMouseLeave: this.hideHover },
            React.createElement("div", { className: 'avatar-container' },
                React.createElement("img", { className: 'avatar', src: comment.userIconPath })),
            React.createElement("div", { className: 'review-comment-contents' },
                React.createElement("div", { className: 'comment-title monaco-mouse-cursor-text' },
                    React.createElement("strong", { className: 'author' }, comment.userName),
                    React.createElement("span", { className: 'isPending' }, comment.label),
                    React.createElement("div", { className: 'theia-comments-inline-actions-container' },
                        React.createElement("div", { className: 'theia-comments-inline-actions', role: 'toolbar' }, hover && menus.getMenu(exports.COMMENT_TITLE).children.map(function (node, index) { return node instanceof common_1.ActionMenuNode &&
                            React.createElement(CommentsInlineAction, __assign({ key: index }, { node: node, commands: commands, commentThread: commentThread, commentUniqueId: commentUniqueId, contextKeyService: contextKeyService })); })))),
                React.createElement(CommentBody, { value: comment.body.value, isVisible: comment.mode === undefined || comment.mode === plugin_api_rpc_model_1.CommentMode.Preview }),
                React.createElement(CommentEditContainer, { contextKeyService: contextKeyService, menus: menus, comment: comment, commentThread: commentThread, commentForm: commentForm, commands: commands })));
    };
    return ReviewComment;
}(React.Component));
exports.ReviewComment = ReviewComment;
var CommentBody = /** @class */ (function (_super) {
    __extends(CommentBody, _super);
    function CommentBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentBody.prototype.render = function () {
        var _a = this.props, value = _a.value, isVisible = _a.isVisible;
        if (!isVisible) {
            return false;
        }
        return React.createElement("div", { className: 'comment-body monaco-mouse-cursor-text' },
            React.createElement("div", null,
                React.createElement("p", null, value)));
    };
    return CommentBody;
}(React.Component));
exports.CommentBody = CommentBody;
var CommentEditContainer = /** @class */ (function (_super) {
    __extends(CommentEditContainer, _super);
    function CommentEditContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = React.createRef();
        return _this;
    }
    CommentEditContainer.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;
        var commentFormState = (_a = this.props.commentForm.current) === null || _a === void 0 ? void 0 : _a.state;
        var mode = this.props.comment.mode;
        if (this.dirtyCommentMode !== mode || (this.dirtyCommentFormState !== (commentFormState === null || commentFormState === void 0 ? void 0 : commentFormState.expanded) && !(commentFormState === null || commentFormState === void 0 ? void 0 : commentFormState.expanded))) {
            var currentInput_1 = this.inputRef.current;
            if (currentInput_1) {
                // Wait for the widget to be rendered.
                setTimeout(function () {
                    currentInput_1.focus();
                    currentInput_1.setSelectionRange(currentInput_1.value.length, currentInput_1.value.length);
                }, 50);
            }
        }
        this.dirtyCommentMode = mode;
        this.dirtyCommentFormState = commentFormState === null || commentFormState === void 0 ? void 0 : commentFormState.expanded;
    };
    CommentEditContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, menus = _a.menus, comment = _a.comment, commands = _a.commands, commentThread = _a.commentThread, contextKeyService = _a.contextKeyService;
        if (!(comment.mode === plugin_api_rpc_model_1.CommentMode.Editing)) {
            return false;
        }
        return React.createElement("div", { className: 'edit-container' },
            React.createElement("div", { className: 'edit-textarea' },
                React.createElement("div", { className: 'theia-comments-input-message-container' },
                    React.createElement("textarea", { className: 'theia-comments-input-message theia-input', defaultValue: comment.body.value, ref: this.inputRef }))),
            React.createElement("div", { className: 'form-actions' }, menus.getMenu(exports.COMMENT_CONTEXT).children.map(function (node, index) {
                var onClick = function () {
                    commands.executeCommand(node.id, {
                        thread: commentThread,
                        commentUniqueId: comment.uniqueIdInThread,
                        text: _this.inputRef.current ? _this.inputRef.current.value : ''
                    });
                };
                return node instanceof common_1.ActionMenuNode &&
                    React.createElement(CommentAction, __assign({ key: index }, { node: node, commands: commands, onClick: onClick, contextKeyService: contextKeyService }));
            })));
    };
    return CommentEditContainer;
}(React.Component));
exports.CommentEditContainer = CommentEditContainer;
var CommentsInlineAction = /** @class */ (function (_super) {
    __extends(CommentsInlineAction, _super);
    function CommentsInlineAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentsInlineAction.prototype.render = function () {
        var _a = this.props, node = _a.node, commands = _a.commands, contextKeyService = _a.contextKeyService, commentThread = _a.commentThread, commentUniqueId = _a.commentUniqueId;
        if (node.action.when && !contextKeyService.match(node.action.when)) {
            return false;
        }
        return React.createElement("div", { className: 'theia-comments-inline-action' },
            React.createElement("a", { className: node.icon, title: node.label, onClick: function () {
                    commands.executeCommand(node.id, {
                        thread: commentThread,
                        commentUniqueId: commentUniqueId
                    });
                } }));
    };
    return CommentsInlineAction;
}(React.Component));
exports.CommentsInlineAction = CommentsInlineAction;
var CommentActions = /** @class */ (function (_super) {
    __extends(CommentActions, _super);
    function CommentActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentActions.prototype.render = function () {
        var _a = this.props, contextKeyService = _a.contextKeyService, commands = _a.commands, menu = _a.menu, commentThread = _a.commentThread, getInput = _a.getInput, clearInput = _a.clearInput;
        return React.createElement("div", { className: 'form-actions' }, menu.children.map(function (node, index) { return node instanceof common_1.ActionMenuNode &&
            React.createElement(CommentAction, { key: index, commands: commands, node: node, onClick: function () {
                    commands.executeCommand(node.id, {
                        thread: commentThread,
                        text: getInput()
                    });
                    clearInput();
                }, contextKeyService: contextKeyService }); }));
    };
    return CommentActions;
}(React.Component));
exports.CommentActions = CommentActions;
var CommentAction = /** @class */ (function (_super) {
    __extends(CommentAction, _super);
    function CommentAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentAction.prototype.render = function () {
        var classNames = ['comments-button', 'comments-text-button', 'theia-button'];
        var _a = this.props, node = _a.node, commands = _a.commands, contextKeyService = _a.contextKeyService, onClick = _a.onClick;
        if (node.action.when && !contextKeyService.match(node.action.when)) {
            return false;
        }
        var isEnabled = commands.isEnabled(node.action.commandId);
        if (!isEnabled) {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        return React.createElement("button", { className: classNames.join(' '), tabIndex: 0, role: 'button', onClick: function () {
                if (isEnabled) {
                    onClick();
                }
            } }, node.label);
    };
    return CommentAction;
}(React.Component));
exports.CommentAction = CommentAction;
//# sourceMappingURL=comment-thread-widget.js.map