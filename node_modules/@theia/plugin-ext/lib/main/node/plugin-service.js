"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.PluginApiContribution = void 0;
var path = require("path");
var url = require("url");
var vhost = require('vhost');
var express = require("express");
var inversify_1 = require("inversify");
var webview_protocol_1 = require("../common/webview-protocol");
var environment_1 = require("@theia/application-package/lib/environment");
var PluginApiContribution = /** @class */ (function () {
    function PluginApiContribution() {
        this.serveSameOrigin = false;
    }
    PluginApiContribution.prototype.postConstruct = function () {
        var webviewExternalEndpoint = this.webviewExternalEndpoint();
        console.log("Configuring to accept webviews on '" + webviewExternalEndpoint + "' hostname.");
        this.webviewExternalEndpointRegExp = new RegExp(webviewExternalEndpoint, 'i');
    };
    PluginApiContribution.prototype.configure = function (app) {
        var webviewApp = express();
        webviewApp.use('/webview', express.static(path.join(__dirname, '../../../src/main/browser/webview/pre')));
        app.use(vhost(this.webviewExternalEndpointRegExp, webviewApp));
    };
    PluginApiContribution.prototype.allowWsUpgrade = function (request) {
        if (request.headers.origin && !this.serveSameOrigin) {
            var origin_1 = url.parse(request.headers.origin);
            if (origin_1.host && this.webviewExternalEndpointRegExp.test(origin_1.host)) {
                // If the origin comes from the WebViews, refuse:
                return false;
            }
        }
        return true;
    };
    PluginApiContribution.prototype.webviewExternalEndpointPattern = function () {
        var endpointPattern;
        if (environment_1.environment.electron.is()) {
            endpointPattern = webview_protocol_1.WebviewExternalEndpoint.defaultPattern;
        }
        else {
            endpointPattern = process.env[webview_protocol_1.WebviewExternalEndpoint.pattern] || webview_protocol_1.WebviewExternalEndpoint.defaultPattern;
        }
        if (endpointPattern === '{{hostname}}') {
            this.serveSameOrigin = true;
        }
        return endpointPattern;
    };
    /**
     * Returns a RegExp pattern matching the expected WebView endpoint's host.
     */
    PluginApiContribution.prototype.webviewExternalEndpoint = function () {
        return "^" + this.webviewExternalEndpointPattern()
            .replace(/\./g, '\\.')
            .replace('{{uuid}}', '.+')
            .replace('{{hostname}}', '.+') + "$";
    };
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginApiContribution.prototype, "postConstruct", null);
    PluginApiContribution = __decorate([
        inversify_1.injectable()
    ], PluginApiContribution);
    return PluginApiContribution;
}());
exports.PluginApiContribution = PluginApiContribution;
//# sourceMappingURL=plugin-service.js.map