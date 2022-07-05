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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoModelDiagnostics = exports.MonacoDiagnosticCollection = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var MonacoDiagnosticCollection = /** @class */ (function () {
    function MonacoDiagnosticCollection(name, p2m) {
        this.name = name;
        this.p2m = p2m;
        this.diagnostics = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
    }
    MonacoDiagnosticCollection.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    MonacoDiagnosticCollection.prototype.get = function (uri) {
        var diagnostics = this.diagnostics.get(uri);
        return !!diagnostics ? diagnostics.diagnostics : [];
    };
    MonacoDiagnosticCollection.prototype.set = function (uri, diagnostics) {
        var _this = this;
        var existing = this.diagnostics.get(uri);
        if (existing) {
            existing.diagnostics = diagnostics;
        }
        else {
            var modelDiagnostics_1 = new MonacoModelDiagnostics(uri, diagnostics, this.name, this.p2m);
            this.diagnostics.set(uri, modelDiagnostics_1);
            this.toDispose.push(disposable_1.Disposable.create(function () {
                _this.diagnostics.delete(uri);
                modelDiagnostics_1.dispose();
            }));
        }
    };
    return MonacoDiagnosticCollection;
}());
exports.MonacoDiagnosticCollection = MonacoDiagnosticCollection;
var MonacoModelDiagnostics = /** @class */ (function () {
    function MonacoModelDiagnostics(uri, diagnostics, owner, p2m) {
        var _this = this;
        this.owner = owner;
        this.p2m = p2m;
        this._markers = [];
        this._diagnostics = [];
        this.uri = monaco.Uri.parse(uri);
        this.diagnostics = diagnostics;
        monaco.editor.onDidCreateModel(function (model) { return _this.doUpdateModelMarkers(model); });
    }
    Object.defineProperty(MonacoModelDiagnostics.prototype, "diagnostics", {
        get: function () {
            return this._diagnostics;
        },
        set: function (diagnostics) {
            this._diagnostics = diagnostics;
            this._markers = this.p2m.asDiagnostics(diagnostics);
            this.updateModelMarkers();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoModelDiagnostics.prototype, "markers", {
        get: function () {
            return this._markers;
        },
        enumerable: false,
        configurable: true
    });
    MonacoModelDiagnostics.prototype.dispose = function () {
        this._markers = [];
        this.updateModelMarkers();
    };
    MonacoModelDiagnostics.prototype.updateModelMarkers = function () {
        var model = monaco.editor.getModel(this.uri);
        this.doUpdateModelMarkers(model ? model : undefined);
    };
    MonacoModelDiagnostics.prototype.doUpdateModelMarkers = function (model) {
        if (model && this.uri.toString() === model.uri.toString()) {
            monaco.editor.setModelMarkers(model, this.owner, this._markers);
        }
    };
    return MonacoModelDiagnostics;
}());
exports.MonacoModelDiagnostics = MonacoModelDiagnostics;
//# sourceMappingURL=monaco-diagnostic-collection.js.map