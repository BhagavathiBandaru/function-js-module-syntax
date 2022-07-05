"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
var progress_location_service_1 = require("./progress-location-service");
var common_1 = require("../common");
var inversify_1 = require("inversify");
var progress_bar_factory_1 = require("./progress-bar-factory");
var ProgressBar = /** @class */ (function () {
    function ProgressBar() {
        this.toDispose = new common_1.DisposableCollection();
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'theia-progress-bar';
        this.progressBar.style.display = 'none';
        this.progressBarContainer = document.createElement('div');
        this.progressBarContainer.className = 'theia-progress-bar-container';
        this.progressBarContainer.append(this.progressBar);
    }
    ProgressBar.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    ProgressBar.prototype.init = function () {
        var _this = this;
        var _a = this.options, container = _a.container, insertMode = _a.insertMode, locationId = _a.locationId;
        if (insertMode === 'prepend') {
            container.prepend(this.progressBarContainer);
        }
        else {
            container.append(this.progressBarContainer);
        }
        this.toDispose.push(common_1.Disposable.create(function () { return _this.progressBarContainer.remove(); }));
        var onProgress = this.progressLocationService.onProgress(locationId);
        this.toDispose.push(onProgress(function (event) { return _this.onProgress(event); }));
        var current = this.progressLocationService.getProgress(locationId);
        if (current) {
            this.onProgress(current);
        }
    };
    ProgressBar.prototype.onProgress = function (event) {
        if (this.toDispose.disposed) {
            return;
        }
        this.setVisible(event.show);
    };
    ProgressBar.prototype.setVisible = function (visible) {
        this.progressBar.style.display = visible ? 'block' : 'none';
    };
    __decorate([
        inversify_1.inject(progress_location_service_1.ProgressLocationService),
        __metadata("design:type", progress_location_service_1.ProgressLocationService)
    ], ProgressBar.prototype, "progressLocationService", void 0);
    __decorate([
        inversify_1.inject(progress_bar_factory_1.ProgressBarOptions),
        __metadata("design:type", Object)
    ], ProgressBar.prototype, "options", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProgressBar.prototype, "init", null);
    ProgressBar = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.js.map