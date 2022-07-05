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
exports.ElectronMessagingContribution = void 0;
var electron_1 = require("electron");
var inversify_1 = require("inversify");
var connection_1 = require("vscode-ws-jsonrpc/lib/socket/connection");
var contribution_provider_1 = require("../../common/contribution-provider");
var web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
var messaging_contribution_1 = require("../../node/messaging/messaging-contribution");
var logger_1 = require("../../node/messaging/logger");
var electron_connection_handler_1 = require("../../electron-common/messaging/electron-connection-handler");
var electron_messaging_service_1 = require("./electron-messaging-service");
var electron_connection_handler_2 = require("../../electron-common/messaging/electron-connection-handler");
/**
 * This component replicates the role filled by `MessagingContribution` but for Electron.
 * Unlike the WebSocket based implementation, we do not expect to receive
 * connection events. Instead, we'll create channels based on incoming `open`
 * events on the `ipcMain` channel.
 *
 * This component allows communication between renderer process (frontend) and electron main process.
 */
var ElectronMessagingContribution = /** @class */ (function () {
    function ElectronMessagingContribution() {
        this.channelHandlers = new messaging_contribution_1.MessagingContribution.ConnectionHandlers();
        this.windowChannels = new Map();
    }
    ElectronMessagingContribution.prototype.init = function () {
        var _this = this;
        electron_1.ipcMain.on(electron_connection_handler_1.THEIA_ELECTRON_IPC_CHANNEL_NAME, function (event, data) {
            _this.handleIpcMessage(event, data);
        });
    };
    ElectronMessagingContribution.prototype.onStart = function () {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(this.messagingContributions.getContributions()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var contribution = _d.value;
                contribution.configure(this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_1 = function (connectionHandler) {
            this_1.channelHandlers.push(connectionHandler.path, function (params, channel) {
                var connection = connection_1.createWebSocketConnection(channel, new logger_1.ConsoleLogger());
                connectionHandler.onConnection(connection);
            });
        };
        var this_1 = this;
        try {
            for (var _e = __values(this.connectionHandlers.getContributions()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var connectionHandler = _f.value;
                _loop_1(connectionHandler);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ElectronMessagingContribution.prototype.listen = function (spec, callback) {
        this.ipcChannel(spec, function (params, channel) {
            var connection = connection_1.createWebSocketConnection(channel, new logger_1.ConsoleLogger());
            callback(params, connection);
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ElectronMessagingContribution.prototype.ipcChannel = function (spec, callback) {
        this.channelHandlers.push(spec, callback);
    };
    ElectronMessagingContribution.prototype.handleIpcMessage = function (event, data) {
        var sender = event.sender;
        try {
            // Get the channel map for a given window id
            var channels_1 = this.windowChannels.get(sender.id);
            if (!channels_1) {
                this.windowChannels.set(sender.id, channels_1 = new Map());
            }
            // Start parsing the message to extract the channel id and route
            var message = JSON.parse(data.toString());
            // Someone wants to open a logical channel
            if (message.kind === 'open') {
                var id_1 = message.id, path = message.path;
                var channel = this.createChannel(id_1, sender);
                if (this.channelHandlers.route(path, channel)) {
                    channel.ready();
                    channels_1.set(id_1, channel);
                    channel.onClose(function () { return channels_1.delete(id_1); });
                }
                else {
                    console.error('Cannot find a service for the path: ' + path);
                }
            }
            else {
                var id = message.id;
                var channel = channels_1.get(id);
                if (channel) {
                    channel.handleMessage(message);
                }
                else {
                    console.error('The ipc channel does not exist', id);
                }
            }
            var close_1 = function () {
                var e_3, _a;
                try {
                    for (var _b = __values(Array.from(channels_1.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var channel = _c.value;
                        channel.close(undefined, 'webContent destroyed');
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                channels_1.clear();
            };
            sender.once('did-navigate', close_1); // When refreshing the browser window.
            sender.once('destroyed', close_1); // When closing the browser window.
        }
        catch (error) {
            console.error('IPC: Failed to handle message', { error: error, data: data });
        }
    };
    ElectronMessagingContribution.prototype.createChannel = function (id, sender) {
        return new web_socket_channel_1.WebSocketChannel(id, function (content) {
            if (!sender.isDestroyed()) {
                sender.send(electron_connection_handler_1.THEIA_ELECTRON_IPC_CHANNEL_NAME, content);
            }
        });
    };
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(electron_messaging_service_1.ElectronMessagingService.Contribution),
        __metadata("design:type", Object)
    ], ElectronMessagingContribution.prototype, "messagingContributions", void 0);
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(electron_connection_handler_2.ElectronConnectionHandler),
        __metadata("design:type", Object)
    ], ElectronMessagingContribution.prototype, "connectionHandlers", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ElectronMessagingContribution.prototype, "init", null);
    ElectronMessagingContribution = __decorate([
        inversify_1.injectable()
    ], ElectronMessagingContribution);
    return ElectronMessagingContribution;
}());
exports.ElectronMessagingContribution = ElectronMessagingContribution;
//# sourceMappingURL=electron-messaging-contribution.js.map