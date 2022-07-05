"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.ElectronMiniBrowserEnvironment = void 0;
var electron_token_1 = require("@theia/core/lib/electron-common/electron-token");
var electron_1 = require("electron");
var inversify_1 = require("inversify");
var mini_browser_environment_1 = require("../../browser/environment/mini-browser-environment");
var ElectronMiniBrowserEnvironment = /** @class */ (function (_super) {
    __extends(ElectronMiniBrowserEnvironment, _super);
    function ElectronMiniBrowserEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectronMiniBrowserEnvironment.prototype.getEndpoint = function (uuid, hostname) {
        var endpoint = _super.prototype.getEndpoint.call(this, uuid, hostname);
        // Note: This call is async, but clients expect sync logic.
        electron_1.remote.session.defaultSession.cookies.set({
            url: endpoint.getRestUrl().toString(true),
            name: electron_token_1.ElectronSecurityToken,
            value: JSON.stringify(this.electronSecurityToken),
            httpOnly: true,
        });
        return endpoint;
    };
    ElectronMiniBrowserEnvironment.prototype.getDefaultHostname = function () {
        var e_1, _a;
        var query = self.location.search
            .substr(1)
            .split('&')
            .map(function (entry) { return entry
            .split('=', 2)
            .map(function (element) { return decodeURIComponent(element); }); });
        try {
            for (var query_1 = __values(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
                var _b = __read(query_1_1.value, 2), key = _b[0], value = _b[1];
                if (key === 'port') {
                    return "localhost:" + value;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (query_1_1 && !query_1_1.done && (_a = query_1.return)) _a.call(query_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('could not resolve Electron\'s backend port');
    };
    __decorate([
        inversify_1.inject(electron_token_1.ElectronSecurityToken),
        __metadata("design:type", Object)
    ], ElectronMiniBrowserEnvironment.prototype, "electronSecurityToken", void 0);
    ElectronMiniBrowserEnvironment = __decorate([
        inversify_1.injectable()
    ], ElectronMiniBrowserEnvironment);
    return ElectronMiniBrowserEnvironment;
}(mini_browser_environment_1.MiniBrowserEnvironment));
exports.ElectronMiniBrowserEnvironment = ElectronMiniBrowserEnvironment;
//# sourceMappingURL=electron-mini-browser-environment.js.map