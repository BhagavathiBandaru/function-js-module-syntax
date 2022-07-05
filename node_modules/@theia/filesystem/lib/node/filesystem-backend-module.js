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
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnNsfwFileSystemWatcherServiceProcess = exports.createNsfwFileSystemWatcherService = exports.bindFileSystemWatcherServer = exports.NsfwFileSystemWatcherServiceProcessOptions = exports.NSFW_WATCHER_VERBOSE = exports.NSFW_SINGLE_THREADED = void 0;
var path = require("path");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var filesystem_watcher_client_1 = require("./filesystem-watcher-client");
var nsfw_filesystem_service_1 = require("./nsfw-watcher/nsfw-filesystem-service");
var messaging_service_1 = require("@theia/core/lib/node/messaging/messaging-service");
var node_file_upload_service_1 = require("./node-file-upload-service");
var nsfw_options_1 = require("./nsfw-watcher/nsfw-options");
var disk_file_system_provider_1 = require("./disk-file-system-provider");
var remote_file_system_provider_1 = require("../common/remote-file-system-provider");
var files_1 = require("../common/files");
var encoding_service_1 = require("@theia/core/lib/common/encoding-service");
var node_1 = require("@theia/core/lib/node");
var core_1 = require("@theia/core");
var filesystem_watcher_dispatcher_1 = require("./filesystem-watcher-dispatcher");
exports.NSFW_SINGLE_THREADED = process.argv.includes('--no-cluster');
exports.NSFW_WATCHER_VERBOSE = process.argv.includes('--nsfw-watcher-verbose');
exports.NsfwFileSystemWatcherServiceProcessOptions = Symbol('NsfwFileSystemWatcherServiceProcessOptions');
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(encoding_service_1.EncodingService).toSelf().inSingletonScope();
    bindFileSystemWatcherServer(bind);
    bind(disk_file_system_provider_1.DiskFileSystemProvider).toSelf();
    bind(files_1.FileSystemProvider).toService(disk_file_system_provider_1.DiskFileSystemProvider);
    bind(remote_file_system_provider_1.FileSystemProviderServer).toSelf();
    bind(remote_file_system_provider_1.RemoteFileSystemServer).toService(remote_file_system_provider_1.FileSystemProviderServer);
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(remote_file_system_provider_1.remoteFileSystemPath, function (client) {
            var server = ctx.container.get(remote_file_system_provider_1.RemoteFileSystemServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        }, remote_file_system_provider_1.RemoteFileSystemProxyFactory);
    }).inSingletonScope();
    bind(node_file_upload_service_1.NodeFileUploadService).toSelf().inSingletonScope();
    bind(messaging_service_1.MessagingService.Contribution).toService(node_file_upload_service_1.NodeFileUploadService);
});
function bindFileSystemWatcherServer(bind) {
    bind(nsfw_options_1.NsfwOptions).toConstantValue({});
    bind(filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher).toSelf().inSingletonScope();
    bind(filesystem_watcher_client_1.FileSystemWatcherServerClient).toSelf();
    bind(filesystem_watcher_protocol_1.FileSystemWatcherServer).toService(filesystem_watcher_client_1.FileSystemWatcherServerClient);
    bind(exports.NsfwFileSystemWatcherServiceProcessOptions).toConstantValue({
        entryPoint: path.resolve(__dirname, 'nsfw-watcher'),
    });
    bind(nsfw_filesystem_service_1.NsfwFileSystemWatcherServerOptions).toDynamicValue(function (ctx) {
        var logger = ctx.container.get(common_1.ILogger);
        var nsfwOptions = ctx.container.get(nsfw_options_1.NsfwOptions);
        return {
            nsfwOptions: nsfwOptions,
            verbose: exports.NSFW_WATCHER_VERBOSE,
            info: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return logger.info.apply(logger, __spread([message], args));
            },
            error: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return logger.error.apply(logger, __spread([message], args));
            },
        };
    }).inSingletonScope();
    bind(filesystem_watcher_protocol_1.FileSystemWatcherService).toDynamicValue(function (ctx) { return exports.NSFW_SINGLE_THREADED
        ? createNsfwFileSystemWatcherService(ctx)
        : spawnNsfwFileSystemWatcherServiceProcess(ctx); }).inSingletonScope();
}
exports.bindFileSystemWatcherServer = bindFileSystemWatcherServer;
/**
 * Run the watch server in the current process.
 */
function createNsfwFileSystemWatcherService(ctx) {
    var options = ctx.container.get(nsfw_filesystem_service_1.NsfwFileSystemWatcherServerOptions);
    var dispatcher = ctx.container.get(filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher);
    var server = new nsfw_filesystem_service_1.NsfwFileSystemWatcherService(options);
    server.setClient(dispatcher);
    return server;
}
exports.createNsfwFileSystemWatcherService = createNsfwFileSystemWatcherService;
/**
 * Run the watch server in a child process.
 * Return a proxy forwarding calls to the child process.
 */
function spawnNsfwFileSystemWatcherServiceProcess(ctx) {
    var options = ctx.container.get(exports.NsfwFileSystemWatcherServiceProcessOptions);
    var dispatcher = ctx.container.get(filesystem_watcher_dispatcher_1.FileSystemWatcherServiceDispatcher);
    var serverName = 'nsfw-watcher';
    var logger = ctx.container.get(common_1.ILogger);
    var nsfwOptions = ctx.container.get(nsfw_options_1.NsfwOptions);
    var ipcConnectionProvider = ctx.container.get(node_1.IPCConnectionProvider);
    var proxyFactory = new core_1.JsonRpcProxyFactory();
    var serverProxy = proxyFactory.createProxy();
    // We need to call `.setClient` before listening, else the JSON-RPC calls won't go through.
    serverProxy.setClient(dispatcher);
    var args = [
        "--nsfwOptions=" + JSON.stringify(nsfwOptions)
    ];
    if (exports.NSFW_WATCHER_VERBOSE) {
        args.push('--verbose');
    }
    ipcConnectionProvider.listen({
        serverName: serverName,
        entryPoint: options.entryPoint,
        errorHandler: new core_1.ConnectionErrorHandler({
            serverName: serverName,
            logger: logger,
        }),
        env: process.env,
        args: args,
    }, function (connection) { return proxyFactory.listen(connection); });
    return serverProxy;
}
exports.spawnNsfwFileSystemWatcherServiceProcess = spawnNsfwFileSystemWatcherServiceProcess;
//# sourceMappingURL=filesystem-backend-module.js.map