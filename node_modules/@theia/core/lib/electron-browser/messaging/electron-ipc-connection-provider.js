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
exports.ElectronIpcConnectionProvider = void 0;
var inversify_1 = require("inversify");
var electron_1 = require("electron");
var web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
var abstract_connection_provider_1 = require("../../common/messaging/abstract-connection-provider");
var electron_connection_handler_1 = require("../../electron-common/messaging/electron-connection-handler");
/**
 * Connection provider between the Theia frontend and the electron-main process via IPC.
 */
var ElectronIpcConnectionProvider = /** @class */ (function (_super) {
    __extends(ElectronIpcConnectionProvider, _super);
    function ElectronIpcConnectionProvider() {
        var _this = _super.call(this) || this;
        electron_1.ipcRenderer.on(electron_connection_handler_1.THEIA_ELECTRON_IPC_CHANNEL_NAME, function (event, data) {
            _this.handleIncomingRawMessage(data);
        });
        return _this;
    }
    ElectronIpcConnectionProvider_1 = ElectronIpcConnectionProvider;
    ElectronIpcConnectionProvider.createProxy = function (container, path, arg) {
        return container.get(ElectronIpcConnectionProvider_1).createProxy(path, arg);
    };
    ElectronIpcConnectionProvider.prototype.createChannel = function (id) {
        return new web_socket_channel_1.WebSocketChannel(id, function (content) {
            electron_1.ipcRenderer.send(electron_connection_handler_1.THEIA_ELECTRON_IPC_CHANNEL_NAME, content);
        });
    };
    var ElectronIpcConnectionProvider_1;
    ElectronIpcConnectionProvider = ElectronIpcConnectionProvider_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ElectronIpcConnectionProvider);
    return ElectronIpcConnectionProvider;
}(abstract_connection_provider_1.AbstractConnectionProvider));
exports.ElectronIpcConnectionProvider = ElectronIpcConnectionProvider;
//# sourceMappingURL=electron-ipc-connection-provider.js.map