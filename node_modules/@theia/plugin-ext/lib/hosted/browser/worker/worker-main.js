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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var event_1 = require("@theia/core/lib/common/event");
var rpc_protocol_1 = require("../../../common/rpc-protocol");
var plugin_manager_1 = require("../../../plugin/plugin-manager");
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var plugin_context_1 = require("../../../plugin/plugin-context");
var plugin_protocol_1 = require("../../../common/plugin-protocol");
var preference_registry_1 = require("../../../plugin/preference-registry");
var debug_stub_1 = require("./debug-stub");
var editors_and_documents_1 = require("../../../plugin/editors-and-documents");
var workspace_1 = require("../../../plugin/workspace");
var message_registry_1 = require("../../../plugin/message-registry");
var worker_env_ext_1 = require("./worker-env-ext");
var clipboard_ext_1 = require("../../../plugin/clipboard-ext");
var plugin_storage_1 = require("../../../plugin/plugin-storage");
var webviews_1 = require("../../../plugin/webviews");
var plugin_manifest_loader_1 = require("./plugin-manifest-loader");
var terminal_ext_1 = require("../../../plugin/terminal-ext");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var ctx = self;
var pluginsApiImpl = new Map();
var pluginsModulesNames = new Map();
var emitter = new event_1.Emitter();
var rpc = new rpc_protocol_1.RPCProtocolImpl({
    onMessage: emitter.event,
    send: function (m) {
        ctx.postMessage(m);
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
addEventListener('message', function (message) {
    emitter.fire(message.data);
});
function initialize(contextPath, pluginMetadata) {
    ctx.importScripts('/context/' + contextPath);
}
var envExt = new worker_env_ext_1.WorkerEnvExtImpl(rpc);
var storageProxy = new plugin_storage_1.KeyValueStorageProxy(rpc);
var editorsAndDocuments = new editors_and_documents_1.EditorsAndDocumentsExtImpl(rpc);
var messageRegistryExt = new message_registry_1.MessageRegistryExt(rpc);
var workspaceExt = new workspace_1.WorkspaceExtImpl(rpc, editorsAndDocuments, messageRegistryExt);
var preferenceRegistryExt = new preference_registry_1.PreferenceRegistryExtImpl(rpc, workspaceExt);
var debugExt = debug_stub_1.createDebugExtStub(rpc);
var clipboardExt = new clipboard_ext_1.ClipboardExt(rpc);
var webviewExt = new webviews_1.WebviewsExtImpl(rpc, workspaceExt);
var terminalService = new terminal_ext_1.TerminalServiceExtImpl(rpc);
var pluginManager = new plugin_manager_1.PluginManagerExtImpl({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPlugin: function (plugin) {
        if (plugin.pluginPath) {
            if (isElectron()) {
                ctx.importScripts(plugin.pluginPath);
            }
            else {
                ctx.importScripts('/hostedPlugin/' + plugin_protocol_1.getPluginId(plugin.model) + '/' + plugin.pluginPath);
            }
        }
        if (plugin.lifecycle.frontendModuleName) {
            if (!ctx[plugin.lifecycle.frontendModuleName]) {
                console.error("WebWorker: Cannot start plugin \"" + plugin.model.name + "\". Frontend plugin not found: \"" + plugin.lifecycle.frontendModuleName + "\"");
                return;
            }
            return ctx[plugin.lifecycle.frontendModuleName];
        }
    },
    init: function (rawPluginData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, foreign, plugins, plugins_1, plugins_1_1, _a, target, plugin;
            var e_1, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = [];
                        foreign = [];
                        return [4 /*yield*/, Promise.all(rawPluginData.map(function (plg) { return __awaiter(_this, void 0, void 0, function () {
                                var pluginModel, pluginLifecycle, frontendInitPath, rawModel, plugin, apiImpl;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            pluginModel = plg.model;
                                            pluginLifecycle = plg.lifecycle;
                                            if (!pluginModel.entryPoint.frontend) return [3 /*break*/, 2];
                                            frontendInitPath = pluginLifecycle.frontendInitPath;
                                            if (frontendInitPath) {
                                                initialize(frontendInitPath, plg);
                                            }
                                            else {
                                                frontendInitPath = '';
                                            }
                                            return [4 /*yield*/, plugin_manifest_loader_1.loadManifest(pluginModel)];
                                        case 1:
                                            rawModel = _a.sent();
                                            plugin = {
                                                pluginPath: pluginModel.entryPoint.frontend,
                                                pluginFolder: pluginModel.packagePath,
                                                model: pluginModel,
                                                lifecycle: pluginLifecycle,
                                                rawModel: rawModel
                                            };
                                            apiImpl = apiFactory(plugin);
                                            pluginsApiImpl.set(plugin.model.id, apiImpl);
                                            pluginsModulesNames.set(plugin.lifecycle.frontendModuleName, plugin);
                                            return [2 /*return*/, { target: result, plugin: plugin }];
                                        case 2: return [2 /*return*/, {
                                                target: foreign,
                                                plugin: {
                                                    pluginPath: pluginModel.entryPoint.backend,
                                                    pluginFolder: pluginModel.packagePath,
                                                    model: pluginModel,
                                                    lifecycle: pluginLifecycle,
                                                    get rawModel() {
                                                        throw new Error('not supported');
                                                    }
                                                }
                                            }];
                                    }
                                });
                            }); }))];
                    case 1:
                        plugins = _c.sent();
                        try {
                            // Collect the ordered plugins and insert them in the target array:
                            for (plugins_1 = __values(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
                                _a = plugins_1_1.value, target = _a.target, plugin = _a.plugin;
                                target.push(plugin);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (plugins_1_1 && !plugins_1_1.done && (_b = plugins_1.return)) _b.call(plugins_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, [result, foreign]];
                }
            });
        });
    },
    initExtApi: function (extApi) {
        var e_2, _a;
        try {
            for (var extApi_1 = __values(extApi), extApi_1_1 = extApi_1.next(); !extApi_1_1.done; extApi_1_1 = extApi_1.next()) {
                var api = extApi_1_1.value;
                try {
                    if (api.frontendExtApi) {
                        ctx.importScripts(api.frontendExtApi.initPath);
                        ctx[api.frontendExtApi.initVariable][api.frontendExtApi.initFunction](rpc, pluginsModulesNames);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (extApi_1_1 && !extApi_1_1.done && (_a = extApi_1.return)) _a.call(extApi_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}, envExt, terminalService, storageProxy, preferenceRegistryExt, webviewExt, rpc);
var apiFactory = plugin_context_1.createAPIFactory(rpc, pluginManager, envExt, debugExt, preferenceRegistryExt, editorsAndDocuments, workspaceExt, messageRegistryExt, clipboardExt, webviewExt);
var defaultApi;
var handler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: function (target, name) {
        var plugin = pluginsModulesNames.get(name);
        if (plugin) {
            var apiImpl = pluginsApiImpl.get(plugin.model.id);
            return apiImpl;
        }
        if (!defaultApi) {
            defaultApi = apiFactory(plugin_api_rpc_1.emptyPlugin);
        }
        return defaultApi;
    }
};
ctx['theia'] = new Proxy(Object.create(null), handler);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.HOSTED_PLUGIN_MANAGER_EXT, pluginManager);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.EDITORS_AND_DOCUMENTS_EXT, editorsAndDocuments);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WORKSPACE_EXT, workspaceExt);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.PREFERENCE_REGISTRY_EXT, preferenceRegistryExt);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.STORAGE_EXT, storageProxy);
rpc.set(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WEBVIEWS_EXT, webviewExt);
function isElectron() {
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }
    return false;
}
//# sourceMappingURL=worker-main.js.map