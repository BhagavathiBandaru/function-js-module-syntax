"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronWindowService = void 0;
var inversify_1 = require("inversify");
var electron_1 = require("electron");
var default_window_service_1 = require("../../browser/window/default-window-service");
var electron_main_window_service_1 = require("../../electron-common/electron-main-window-service");
var electron_window_preferences_1 = require("./electron-window-preferences");
var ElectronWindowService = /** @class */ (function (_super) {
    __extends(ElectronWindowService, _super);
    function ElectronWindowService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Lock to prevent multiple parallel executions of the `beforeunload` listener.
         */
        _this.isUnloading = false;
        /**
         * Close the window right away when `true`, else check if we can unload.
         */
        _this.closeOnUnload = false;
        return _this;
    }
    ElectronWindowService.prototype.openNewWindow = function (url, _a) {
        var external = (_a === void 0 ? {} : _a).external;
        this.delegate.openNewWindow(url, { external: external });
        return undefined;
    };
    ElectronWindowService.prototype.init = function () {
        var _this = this;
        // Update the default zoom level on startup when the preferences event is fired.
        this.electronWindowPreferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'window.zoomLevel') {
                _this.updateWindowZoomLevel();
            }
        });
    };
    ElectronWindowService.prototype.registerUnloadListeners = function () {
        var _this = this;
        window.addEventListener('beforeunload', function (event) {
            if (_this.isUnloading) {
                // Unloading process ongoing, do nothing:
                return _this.preventUnload(event);
            }
            else if (_this.closeOnUnload || _this.canUnload()) {
                // Let the window close and notify clients:
                delete event.returnValue;
                _this.onUnloadEmitter.fire();
                return;
            }
            else {
                _this.isUnloading = true;
                // Fix https://github.com/eclipse-theia/theia/issues/8186#issuecomment-742624480
                // On Electron/Linux doing `showMessageBoxSync` does not seems to block the closing
                // process long enough and closes the window no matter what you click on (yes/no).
                // Instead we'll prevent closing right away, ask for confirmation and finally close.
                setTimeout(function () {
                    if (_this.shouldUnload()) {
                        _this.closeOnUnload = true;
                        window.close();
                    }
                    _this.isUnloading = false;
                });
                return _this.preventUnload(event);
            }
        });
    };
    /**
     * When preventing `beforeunload` on Electron, no popup is shown.
     *
     * This method implements a modal to ask the user if he wants to quit the page.
     */
    ElectronWindowService.prototype.shouldUnload = function () {
        var electronWindow = electron_1.remote.getCurrentWindow();
        var response = electron_1.remote.dialog.showMessageBoxSync(electronWindow, {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: 'Are you sure you want to quit?',
            detail: 'Any unsaved changes will not be saved.'
        });
        return response === 0; // 'Yes', close the window.
    };
    /**
     * Updates the window zoom level based on the preference value.
     */
    ElectronWindowService.prototype.updateWindowZoomLevel = function () {
        var preferredZoomLevel = this.electronWindowPreferences['window.zoomLevel'];
        var webContents = electron_1.remote.getCurrentWindow().webContents;
        if (webContents.getZoomLevel() !== preferredZoomLevel) {
            webContents.setZoomLevel(preferredZoomLevel);
        }
    };
    __decorate([
        inversify_1.inject(electron_main_window_service_1.ElectronMainWindowService),
        __metadata("design:type", Object)
    ], ElectronWindowService.prototype, "delegate", void 0);
    __decorate([
        inversify_1.inject(electron_window_preferences_1.ElectronWindowPreferences),
        __metadata("design:type", Object)
    ], ElectronWindowService.prototype, "electronWindowPreferences", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ElectronWindowService.prototype, "init", null);
    ElectronWindowService = __decorate([
        inversify_1.injectable()
    ], ElectronWindowService);
    return ElectronWindowService;
}(default_window_service_1.DefaultWindowService));
exports.ElectronWindowService = ElectronWindowService;
//# sourceMappingURL=electron-window-service.js.map