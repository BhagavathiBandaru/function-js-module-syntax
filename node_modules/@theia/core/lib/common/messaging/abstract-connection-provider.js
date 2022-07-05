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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractConnectionProvider = void 0;
var inversify_1 = require("inversify");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var event_1 = require("../event");
var proxy_factory_1 = require("./proxy-factory");
/**
 * Factor common logic according to `ElectronIpcConnectionProvider` and
 * `WebSocketConnectionProvider`. This class handles channels in a somewhat
 * generic way.
 */
var AbstractConnectionProvider = /** @class */ (function () {
    function AbstractConnectionProvider() {
        this.channelIdSeq = 0;
        this.channels = new Map();
        this.onIncomingMessageActivityEmitter = new event_1.Emitter();
        this.onIncomingMessageActivity = this.onIncomingMessageActivityEmitter.event;
    }
    /**
     * Create a proxy object to remote interface of T type
     * over an electron ipc connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    AbstractConnectionProvider.createProxy = function (container, path, target) {
        throw new Error('abstract');
    };
    AbstractConnectionProvider.prototype.createProxy = function (path, arg) {
        var factory = arg instanceof proxy_factory_1.JsonRpcProxyFactory ? arg : new proxy_factory_1.JsonRpcProxyFactory(arg);
        this.listen({
            path: path,
            onConnection: function (c) { return factory.listen(c); }
        });
        return factory.createProxy();
    };
    /**
     * Install a connection handler for the given path.
     */
    AbstractConnectionProvider.prototype.listen = function (handler, options) {
        var _this = this;
        this.openChannel(handler.path, function (channel) {
            var connection = vscode_ws_jsonrpc_1.createWebSocketConnection(channel, _this.createLogger());
            connection.onDispose(function () { return channel.close(); });
            handler.onConnection(connection);
        }, options);
    };
    AbstractConnectionProvider.prototype.openChannel = function (path, handler, options) {
        var _this = this;
        var id = this.channelIdSeq++;
        var channel = this.createChannel(id);
        this.channels.set(id, channel);
        channel.onClose(function () {
            if (_this.channels.delete(channel.id)) {
                var reconnecting = __assign({ reconnecting: true }, options).reconnecting;
                if (reconnecting) {
                    _this.openChannel(path, handler, options);
                }
            }
            else {
                console.error('The ws channel does not exist', channel.id);
            }
        });
        channel.onOpen(function () { return handler(channel); });
        channel.open(path);
    };
    AbstractConnectionProvider.prototype.handleIncomingRawMessage = function (data) {
        var message = JSON.parse(data);
        var channel = this.channels.get(message.id);
        if (channel) {
            channel.handleMessage(message);
        }
        else {
            console.error('The ws channel does not exist', message.id);
        }
        this.onIncomingMessageActivityEmitter.fire(undefined);
    };
    AbstractConnectionProvider.prototype.createLogger = function () {
        return new vscode_ws_jsonrpc_1.ConsoleLogger();
    };
    AbstractConnectionProvider = __decorate([
        inversify_1.injectable()
    ], AbstractConnectionProvider);
    return AbstractConnectionProvider;
}());
exports.AbstractConnectionProvider = AbstractConnectionProvider;
//# sourceMappingURL=abstract-connection-provider.js.map