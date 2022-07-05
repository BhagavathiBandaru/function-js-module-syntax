"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.FileSystemFrontendContribution = exports.FileSystemCommands = void 0;
var inversify_1 = require("inversify");
var environment_1 = require("@theia/application-package/lib/environment");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var mime_service_1 = require("@theia/core/lib/browser/mime-service");
var tree_widget_selection_1 = require("@theia/core/lib/browser/tree/tree-widget-selection");
var filesystem_preferences_1 = require("./filesystem-preferences");
var file_selection_1 = require("./file-selection");
var file_upload_service_1 = require("./file-upload-service");
var file_service_1 = require("./file-service");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var FileSystemCommands;
(function (FileSystemCommands) {
    FileSystemCommands.UPLOAD = {
        id: 'file.upload',
        category: 'File',
        label: 'Upload Files...'
    };
})(FileSystemCommands = exports.FileSystemCommands || (exports.FileSystemCommands = {}));
var FileSystemFrontendContribution = /** @class */ (function () {
    function FileSystemFrontendContribution() {
        this.userOperations = new Map();
        this.pendingOperation = Promise.resolve();
        this.moveSnapshots = new Map();
        this.deletedSuffix = ' (deleted)';
    }
    FileSystemFrontendContribution.prototype.queueUserOperation = function (event) {
        var moveOperation = new promise_util_1.Deferred();
        this.userOperations.set(event.correlationId, moveOperation);
        this.run(function () { return moveOperation.promise; });
    };
    FileSystemFrontendContribution.prototype.resolveUserOperation = function (event) {
        var operation = this.userOperations.get(event.correlationId);
        if (operation) {
            this.userOperations.delete(event.correlationId);
            operation.resolve();
        }
    };
    FileSystemFrontendContribution.prototype.initialize = function () {
        var _this = this;
        this.fileService.onDidFilesChange(function (event) { return _this.run(function () { return _this.updateWidgets(event); }); });
        this.fileService.onWillRunUserOperation(function (event) {
            _this.queueUserOperation(event);
            event.waitUntil(_this.runEach(function (uri, widget) { return _this.pushMove(uri, widget, event); }));
        });
        this.fileService.onDidFailUserOperation(function (event) { return event.waitUntil((function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runEach(function (uri, widget) { return _this.revertMove(uri, widget, event); })];
                    case 1:
                        _a.sent();
                        this.resolveUserOperation(event);
                        return [2 /*return*/];
                }
            });
        }); })()); });
        this.fileService.onDidRunUserOperation(function (event) { return event.waitUntil((function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runEach(function (uri, widget) { return _this.applyMove(uri, widget, event); })];
                    case 1:
                        _a.sent();
                        this.resolveUserOperation(event);
                        return [2 /*return*/];
                }
            });
        }); })()); });
    };
    FileSystemFrontendContribution.prototype.onStart = function (app) {
        var _this = this;
        this.updateAssociations();
        this.preferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'files.associations') {
                _this.updateAssociations();
            }
        });
    };
    FileSystemFrontendContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(FileSystemCommands.UPLOAD, new file_selection_1.FileSelection.CommandHandler(this.selectionService, {
            multi: false,
            isEnabled: function (selection) { return _this.canUpload(selection); },
            isVisible: function (selection) { return _this.canUpload(selection); },
            execute: function (selection) { return _this.upload(selection); }
        }));
    };
    FileSystemFrontendContribution.prototype.canUpload = function (_a) {
        var fileStat = _a.fileStat;
        return !environment_1.environment.electron.is() && fileStat.isDirectory;
    };
    FileSystemFrontendContribution.prototype.upload = function (selection) {
        return __awaiter(this, void 0, void 0, function () {
            var source, fileUploadResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        source = tree_widget_selection_1.TreeWidgetSelection.getSource(this.selectionService.selection);
                        return [4 /*yield*/, this.uploadService.upload(selection.fileStat.resource)];
                    case 1:
                        fileUploadResult = _a.sent();
                        if (!(browser_1.ExpandableTreeNode.is(selection) && source)) return [3 /*break*/, 3];
                        return [4 /*yield*/, source.model.expandNode(selection)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, fileUploadResult];
                    case 4:
                        e_1 = _a.sent();
                        if (!common_1.isCancelled(e_1)) {
                            console.error(e_1);
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemFrontendContribution.prototype.run = function (operation) {
        var _this = this;
        return this.pendingOperation = this.pendingOperation.then(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, operation()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    FileSystemFrontendContribution.prototype.runEach = function (participant) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a, _b, _c, resourceUri, widget;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        promises = [];
                        try {
                            for (_a = __values(browser_1.NavigatableWidget.get(this.shell.widgets)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), resourceUri = _c[0], widget = _c[1];
                                promises.push(participant(resourceUri, widget));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemFrontendContribution.prototype.popMoveSnapshot = function (resourceUri) {
        var snapshotKey = resourceUri.toString();
        var snapshot = this.moveSnapshots.get(snapshotKey);
        if (snapshot) {
            this.moveSnapshots.delete(snapshotKey);
        }
        return snapshot;
    };
    FileSystemFrontendContribution.prototype.applyMoveSnapshot = function (widget, snapshot) {
        if (!snapshot) {
            return undefined;
        }
        if (snapshot.dirty) {
            var saveable = browser_1.Saveable.get(widget);
            if (saveable && saveable.applySnapshot) {
                saveable.applySnapshot(snapshot.dirty);
            }
        }
        if (snapshot.view && browser_1.StatefulWidget.is(widget)) {
            widget.restoreState(snapshot.view);
        }
    };
    FileSystemFrontendContribution.prototype.pushMove = function (resourceUri, widget, event) {
        return __awaiter(this, void 0, void 0, function () {
            var newResourceUri, snapshot, saveable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newResourceUri = this.createMoveToUri(resourceUri, widget, event);
                        if (!newResourceUri) {
                            return [2 /*return*/];
                        }
                        snapshot = {};
                        saveable = browser_1.Saveable.get(widget);
                        if (browser_1.StatefulWidget.is(widget)) {
                            snapshot.view = widget.storeState();
                        }
                        if (!(saveable && saveable.dirty)) return [3 /*break*/, 2];
                        if (saveable.createSnapshot) {
                            snapshot.dirty = saveable.createSnapshot();
                        }
                        if (!saveable.revert) return [3 /*break*/, 2];
                        return [4 /*yield*/, saveable.revert({ soft: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.moveSnapshots.set(newResourceUri.toString(), snapshot);
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemFrontendContribution.prototype.revertMove = function (resourceUri, widget, event) {
        return __awaiter(this, void 0, void 0, function () {
            var newResourceUri, snapshot;
            return __generator(this, function (_a) {
                newResourceUri = this.createMoveToUri(resourceUri, widget, event);
                if (!newResourceUri) {
                    return [2 /*return*/];
                }
                snapshot = this.popMoveSnapshot(newResourceUri);
                this.applyMoveSnapshot(widget, snapshot);
                return [2 /*return*/];
            });
        });
    };
    FileSystemFrontendContribution.prototype.applyMove = function (resourceUri, widget, event) {
        return __awaiter(this, void 0, void 0, function () {
            var newResourceUri, snapshot, description, factoryId, options, newWidget, area, pending;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newResourceUri = this.createMoveToUri(resourceUri, widget, event);
                        if (!newResourceUri) {
                            return [2 /*return*/];
                        }
                        snapshot = this.popMoveSnapshot(newResourceUri);
                        description = this.widgetManager.getDescription(widget);
                        if (!description) {
                            return [2 /*return*/];
                        }
                        factoryId = description.factoryId, options = description.options;
                        if (!browser_1.NavigatableWidgetOptions.is(options)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.widgetManager.getOrCreateWidget(factoryId, __assign(__assign({}, options), { uri: newResourceUri.toString() }))];
                    case 1:
                        newWidget = _a.sent();
                        this.applyMoveSnapshot(newWidget, snapshot);
                        area = this.shell.getAreaFor(widget) || 'main';
                        pending = [this.shell.addWidget(newWidget, {
                                area: area,
                                ref: widget
                            })];
                        if (this.shell.activeWidget === widget) {
                            pending.push(this.shell.activateWidget(newWidget.id));
                        }
                        else if (widget.isVisible) {
                            pending.push(this.shell.revealWidget(newWidget.id));
                        }
                        pending.push(this.shell.closeWidget(widget.id, { save: false }));
                        return [4 /*yield*/, Promise.all(pending)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemFrontendContribution.prototype.createMoveToUri = function (resourceUri, widget, event) {
        var _a;
        if (event.operation !== 2 /* MOVE */) {
            return undefined;
        }
        var path = (_a = event.source) === null || _a === void 0 ? void 0 : _a.relative(resourceUri);
        var targetUri = path && event.target.resolve(path);
        return targetUri && widget.createMoveToUri(targetUri);
    };
    FileSystemFrontendContribution.prototype.updateWidgets = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var pending, dirty, toClose, _a, _b, _c, uri, widget, _d, _e, _f, uriString, widgets, widgets_1, widgets_1_1, widget;
            var e_4, _g, e_5, _h, e_6, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!event.gotDeleted() && !event.gotAdded()) {
                            return [2 /*return*/];
                        }
                        pending = [];
                        dirty = new Set();
                        toClose = new Map();
                        try {
                            for (_a = __values(browser_1.NavigatableWidget.get(this.shell.widgets)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), uri = _c[0], widget = _c[1];
                                this.updateWidget(uri, widget, event, { dirty: dirty, toClose: toClose });
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        try {
                            for (_d = __values(toClose.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                                _f = __read(_e.value, 2), uriString = _f[0], widgets = _f[1];
                                if (!dirty.has(uriString) && this.corePreferences['workbench.editor.closeOnFileDelete']) {
                                    try {
                                        for (widgets_1 = (e_6 = void 0, __values(widgets)), widgets_1_1 = widgets_1.next(); !widgets_1_1.done; widgets_1_1 = widgets_1.next()) {
                                            widget = widgets_1_1.value;
                                            widget.close();
                                            pending.push(browser_1.waitForClosed(widget));
                                        }
                                    }
                                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                    finally {
                                        try {
                                            if (widgets_1_1 && !widgets_1_1.done && (_j = widgets_1.return)) _j.call(widgets_1);
                                        }
                                        finally { if (e_6) throw e_6.error; }
                                    }
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        return [4 /*yield*/, Promise.all(pending)];
                    case 1:
                        _k.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemFrontendContribution.prototype.updateWidget = function (uri, widget, event, _a) {
        var dirty = _a.dirty, toClose = _a.toClose;
        var label = widget.title.label;
        var deleted = label.endsWith(this.deletedSuffix);
        if (event.contains(uri, 2 /* DELETED */)) {
            var uriString = uri.toString();
            if (browser_1.Saveable.isDirty(widget)) {
                dirty.add(uriString);
            }
            if (!deleted) {
                widget.title.label += this.deletedSuffix;
            }
            var widgets = toClose.get(uriString) || [];
            widgets.push(widget);
            toClose.set(uriString, widgets);
        }
        else if (event.contains(uri, 1 /* ADDED */)) {
            if (deleted) {
                widget.title.label = widget.title.label.substr(0, label.length - this.deletedSuffix.length);
            }
        }
    };
    FileSystemFrontendContribution.prototype.updateAssociations = function () {
        var fileAssociations = this.preferences['files.associations'];
        var mimeAssociations = Object.keys(fileAssociations).map(function (filepattern) { return ({ id: fileAssociations[filepattern], filepattern: filepattern }); });
        this.mimeService.setAssociations(mimeAssociations);
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], FileSystemFrontendContribution.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(browser_1.WidgetManager),
        __metadata("design:type", browser_1.WidgetManager)
    ], FileSystemFrontendContribution.prototype, "widgetManager", void 0);
    __decorate([
        inversify_1.inject(mime_service_1.MimeService),
        __metadata("design:type", mime_service_1.MimeService)
    ], FileSystemFrontendContribution.prototype, "mimeService", void 0);
    __decorate([
        inversify_1.inject(filesystem_preferences_1.FileSystemPreferences),
        __metadata("design:type", Object)
    ], FileSystemFrontendContribution.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(browser_1.CorePreferences),
        __metadata("design:type", Object)
    ], FileSystemFrontendContribution.prototype, "corePreferences", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], FileSystemFrontendContribution.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(file_upload_service_1.FileUploadService),
        __metadata("design:type", file_upload_service_1.FileUploadService)
    ], FileSystemFrontendContribution.prototype, "uploadService", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], FileSystemFrontendContribution.prototype, "fileService", void 0);
    FileSystemFrontendContribution = __decorate([
        inversify_1.injectable()
    ], FileSystemFrontendContribution);
    return FileSystemFrontendContribution;
}());
exports.FileSystemFrontendContribution = FileSystemFrontendContribution;
//# sourceMappingURL=filesystem-frontend-contribution.js.map