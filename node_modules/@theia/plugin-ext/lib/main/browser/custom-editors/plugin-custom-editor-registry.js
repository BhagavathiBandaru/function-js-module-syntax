"use strict";
/********************************************************************************
 * Copyright (c) 2021 SAP SE or an SAP affiliate company and others.
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
exports.PluginCustomEditorRegistry = void 0;
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var custom_editor_opener_1 = require("./custom-editor-opener");
var browser_1 = require("@theia/workspace/lib/browser");
var core_1 = require("@theia/core");
var common_1 = require("@theia/core/lib/common");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var navigator_contribution_1 = require("@theia/navigator/lib//browser/navigator-contribution");
var browser_2 = require("@theia/core/lib/browser");
var custom_editor_widget_1 = require("./custom-editor-widget");
var PluginCustomEditorRegistry = /** @class */ (function () {
    function PluginCustomEditorRegistry() {
        var _this = this;
        this.editors = new Map();
        this.pendingEditors = new Set();
        this.resolvers = new Map();
        this.onWillOpenCustomEditorEmitter = new core_1.Emitter();
        this.onWillOpenCustomEditor = this.onWillOpenCustomEditorEmitter.event;
        this.resolveWidget = function (widget) {
            var resolver = _this.resolvers.get(widget.viewType);
            if (resolver) {
                resolver(widget);
            }
            else {
                _this.pendingEditors.add(widget);
                _this.onWillOpenCustomEditorEmitter.fire(widget.viewType);
            }
        };
    }
    PluginCustomEditorRegistry.prototype.init = function () {
        var _this = this;
        this.widgetManager.onDidCreateWidget(function (_a) {
            var factoryId = _a.factoryId, widget = _a.widget;
            if (factoryId === custom_editor_widget_1.CustomEditorWidget.FACTORY_ID && widget instanceof custom_editor_widget_1.CustomEditorWidget) {
                var restoreState_1 = widget.restoreState.bind(widget);
                widget.restoreState = function (state) {
                    if (state.viewType && state.strResource) {
                        restoreState_1(state);
                        _this.resolveWidget(widget);
                    }
                    else {
                        widget.dispose();
                    }
                };
            }
        });
    };
    PluginCustomEditorRegistry.prototype.registerCustomEditor = function (editor) {
        var _this = this;
        if (this.editors.has(editor.viewType)) {
            console.warn('editor with such id already registered: ', JSON.stringify(editor));
            return disposable_1.Disposable.NULL;
        }
        this.editors.set(editor.viewType, editor);
        var toDispose = new disposable_1.DisposableCollection();
        toDispose.push(disposable_1.Disposable.create(function () { return _this.editors.delete(editor.viewType); }));
        var editorOpenHandler = new custom_editor_opener_1.CustomEditorOpener(editor, this.shell, this.widgetManager);
        toDispose.push(this.defaultOpenerService.addHandler(editorOpenHandler));
        var openWithCommand = browser_1.WorkspaceCommands.FILE_OPEN_WITH(editorOpenHandler);
        toDispose.push(this.menuModelRegistry.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.OPEN_WITH, {
            commandId: openWithCommand.id,
            label: editorOpenHandler.label
        }));
        toDispose.push(this.commandRegistry.registerCommand(openWithCommand, uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, {
            execute: function (uri) { return editorOpenHandler.open(uri); },
            isEnabled: function (uri) { return editorOpenHandler.canHandle(uri) > 0; },
            isVisible: function (uri) { return editorOpenHandler.canHandle(uri) > 0; }
        })));
        toDispose.push(editorOpenHandler.onDidOpenCustomEditor(function (widget) { return _this.resolveWidget(widget); }));
        return toDispose;
    };
    PluginCustomEditorRegistry.prototype.registerResolver = function (viewType, resolver) {
        var e_1, _a;
        var _this = this;
        if (this.resolvers.has(viewType)) {
            throw new Error("Resolver for " + viewType + " already registered");
        }
        try {
            for (var _b = __values(this.pendingEditors), _c = _b.next(); !_c.done; _c = _b.next()) {
                var editorWidget = _c.value;
                if (editorWidget.viewType === viewType) {
                    resolver(editorWidget);
                    this.pendingEditors.delete(editorWidget);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.resolvers.set(viewType, resolver);
        return disposable_1.Disposable.create(function () { return _this.resolvers.delete(viewType); });
    };
    __decorate([
        inversify_1.inject(browser_2.DefaultOpenerService),
        __metadata("design:type", browser_2.DefaultOpenerService)
    ], PluginCustomEditorRegistry.prototype, "defaultOpenerService", void 0);
    __decorate([
        inversify_1.inject(core_1.MenuModelRegistry),
        __metadata("design:type", core_1.MenuModelRegistry)
    ], PluginCustomEditorRegistry.prototype, "menuModelRegistry", void 0);
    __decorate([
        inversify_1.inject(core_1.CommandRegistry),
        __metadata("design:type", core_1.CommandRegistry)
    ], PluginCustomEditorRegistry.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], PluginCustomEditorRegistry.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(browser_2.WidgetManager),
        __metadata("design:type", browser_2.WidgetManager)
    ], PluginCustomEditorRegistry.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.inject(browser_2.ApplicationShell),
        __metadata("design:type", browser_2.ApplicationShell)
    ], PluginCustomEditorRegistry.prototype, "shell", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginCustomEditorRegistry.prototype, "init", null);
    PluginCustomEditorRegistry = __decorate([
        inversify_1.injectable()
    ], PluginCustomEditorRegistry);
    return PluginCustomEditorRegistry;
}());
exports.PluginCustomEditorRegistry = PluginCustomEditorRegistry;
//# sourceMappingURL=plugin-custom-editor-registry.js.map