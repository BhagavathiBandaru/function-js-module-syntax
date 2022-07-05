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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ElectronNativeKeymap = void 0;
var electron_1 = require("electron");
var inversify_1 = require("inversify");
var nativeKeymap = require('native-keymap');
var ElectronNativeKeymap = /** @class */ (function () {
    function ElectronNativeKeymap() {
    }
    /**
     * Notify all renderer processes on keyboard layout change.
     */
    ElectronNativeKeymap.prototype.onStart = function (application) {
        nativeKeymap.onDidChangeKeyboardLayout(function () {
            var e_1, _a;
            var newLayout = {
                info: nativeKeymap.getCurrentKeyboardLayout(),
                mapping: nativeKeymap.getKeyMap()
            };
            try {
                for (var _b = __values(electron_1.webContents.getAllWebContents()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var webContent = _c.value;
                    webContent.send('keyboardLayoutChanged', newLayout);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    ElectronNativeKeymap = __decorate([
        inversify_1.injectable()
    ], ElectronNativeKeymap);
    return ElectronNativeKeymap;
}());
exports.ElectronNativeKeymap = ElectronNativeKeymap;
//# sourceMappingURL=electron-native-keymap.js.map