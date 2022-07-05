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
exports.EncodingRegistry = void 0;
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/services/textfile/browser/textFileService.ts#L491
var inversify_1 = require("inversify");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var core_preferences_1 = require("./core-preferences");
var encoding_service_1 = require("../common/encoding-service");
var encodings_1 = require("../common/encodings");
var EncodingRegistry = /** @class */ (function () {
    function EncodingRegistry() {
        this.encodingOverrides = [];
    }
    EncodingRegistry.prototype.registerOverride = function (override) {
        var _this = this;
        this.encodingOverrides.push(override);
        return vscode_ws_jsonrpc_1.Disposable.create(function () {
            var index = _this.encodingOverrides.indexOf(override);
            if (index !== -1) {
                _this.encodingOverrides.splice(index, 1);
            }
        });
    };
    EncodingRegistry.prototype.getEncodingForResource = function (resource, preferredEncoding) {
        var fileEncoding;
        var override = this.getEncodingOverride(resource);
        if (override) {
            fileEncoding = override; // encoding override always wins
        }
        else if (preferredEncoding) {
            fileEncoding = preferredEncoding; // preferred encoding comes second
        }
        else {
            fileEncoding = this.preferences.get('files.encoding', undefined, resource.toString());
        }
        if (!fileEncoding || !this.encodingService.exists(fileEncoding)) {
            return encodings_1.UTF8; // the default is UTF 8
        }
        return this.encodingService.toIconvEncoding(fileEncoding);
    };
    EncodingRegistry.prototype.getEncodingOverride = function (resource) {
        var e_1, _a;
        if (this.encodingOverrides && this.encodingOverrides.length) {
            try {
                for (var _b = __values(this.encodingOverrides), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var override = _c.value;
                    if (override.parent && resource.isEqualOrParent(override.parent)) {
                        return override.encoding;
                    }
                    if (override.extension && resource.path.ext === "." + override.extension) {
                        return override.encoding;
                    }
                    if (override.scheme && override.scheme === resource.scheme) {
                        return override.encoding;
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
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(core_preferences_1.CorePreferences),
        __metadata("design:type", Object)
    ], EncodingRegistry.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(encoding_service_1.EncodingService),
        __metadata("design:type", encoding_service_1.EncodingService)
    ], EncodingRegistry.prototype, "encodingService", void 0);
    EncodingRegistry = __decorate([
        inversify_1.injectable()
    ], EncodingRegistry);
    return EncodingRegistry;
}());
exports.EncodingRegistry = EncodingRegistry;
//# sourceMappingURL=encoding-registry.js.map