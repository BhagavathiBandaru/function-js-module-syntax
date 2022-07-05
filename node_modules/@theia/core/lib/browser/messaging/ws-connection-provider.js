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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
exports.WebSocketConnectionProvider = void 0;
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
var endpoint_1 = require("../endpoint");
var reconnecting_websocket_1 = require("reconnecting-websocket");
var abstract_connection_provider_1 = require("../../common/messaging/abstract-connection-provider");
inversify_1.decorate(inversify_1.injectable(), common_1.JsonRpcProxyFactory);
inversify_1.decorate(inversify_1.unmanaged(), common_1.JsonRpcProxyFactory, 0);
var WebSocketConnectionProvider = /** @class */ (function (_super) {
    __extends(WebSocketConnectionProvider, _super);
    function WebSocketConnectionProvider() {
        var _this = _super.call(this) || this;
        _this.onSocketDidOpenEmitter = new common_1.Emitter();
        _this.onSocketDidOpen = _this.onSocketDidOpenEmitter.event;
        _this.onSocketDidCloseEmitter = new common_1.Emitter();
        _this.onSocketDidClose = _this.onSocketDidCloseEmitter.event;
        var url = _this.createWebSocketUrl(web_socket_channel_1.WebSocketChannel.wsPath);
        var socket = _this.createWebSocket(url);
        socket.onerror = console.error;
        socket.onopen = function () {
            _this.fireSocketDidOpen();
        };
        socket.onclose = function (_a) {
            var e_1, _b;
            var code = _a.code, reason = _a.reason;
            try {
                for (var _c = __values(__spread(_this.channels.values())), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var channel = _d.value;
                    channel.close(code, reason);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.fireSocketDidClose();
        };
        socket.onmessage = function (_a) {
            var data = _a.data;
            _this.handleIncomingRawMessage(data);
        };
        _this.socket = socket;
        return _this;
    }
    WebSocketConnectionProvider_1 = WebSocketConnectionProvider;
    WebSocketConnectionProvider.createProxy = function (container, path, arg) {
        return container.get(WebSocketConnectionProvider_1).createProxy(path, arg);
    };
    WebSocketConnectionProvider.prototype.openChannel = function (path, handler, options) {
        var _this = this;
        if (this.socket.readyState === WebSocket.OPEN) {
            _super.prototype.openChannel.call(this, path, handler, options);
        }
        else {
            var openChannel_1 = function () {
                _this.socket.removeEventListener('open', openChannel_1);
                _this.openChannel(path, handler, options);
            };
            this.socket.addEventListener('open', openChannel_1);
        }
    };
    WebSocketConnectionProvider.prototype.createChannel = function (id) {
        var _this = this;
        return new web_socket_channel_1.WebSocketChannel(id, function (content) {
            if (_this.socket.readyState < WebSocket.CLOSING) {
                _this.socket.send(content);
            }
        });
    };
    /**
     * Creates a websocket URL to the current location
     */
    WebSocketConnectionProvider.prototype.createWebSocketUrl = function (path) {
        var endpoint = new endpoint_1.Endpoint({ path: path });
        return endpoint.getWebSocketUrl().toString();
    };
    /**
     * Creates a web socket for the given url
     */
    WebSocketConnectionProvider.prototype.createWebSocket = function (url) {
        return new reconnecting_websocket_1.default(url, undefined, {
            maxReconnectionDelay: 10000,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 10000,
            maxRetries: Infinity,
            debug: false
        });
    };
    WebSocketConnectionProvider.prototype.fireSocketDidOpen = function () {
        this.onSocketDidOpenEmitter.fire(undefined);
    };
    WebSocketConnectionProvider.prototype.fireSocketDidClose = function () {
        this.onSocketDidCloseEmitter.fire(undefined);
    };
    var WebSocketConnectionProvider_1;
    WebSocketConnectionProvider = WebSocketConnectionProvider_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], WebSocketConnectionProvider);
    return WebSocketConnectionProvider;
}(abstract_connection_provider_1.AbstractConnectionProvider));
exports.WebSocketConnectionProvider = WebSocketConnectionProvider;
//# sourceMappingURL=ws-connection-provider.js.map