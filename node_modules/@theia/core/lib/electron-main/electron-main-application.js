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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ElectronMainApplication = exports.ElectronMainProcessArgv = exports.ElectronMainApplicationContribution = exports.ElectronMainApplicationGlobals = void 0;
var inversify_1 = require("inversify");
var electron_1 = require("electron");
var path = require("path");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var file_uri_1 = require("../node/file-uri");
var promise_util_1 = require("../common/promise-util");
var contribution_provider_1 = require("../common/contribution-provider");
var electron_security_token_service_1 = require("./electron-security-token-service");
var electron_token_1 = require("../electron-common/electron-token");
var Storage = require('electron-store');
var createYargs = require('yargs/yargs');
exports.ElectronMainApplicationGlobals = Symbol('ElectronMainApplicationGlobals');
/**
 * The default entrypoint will handle a very rudimentary CLI to open workspaces by doing `app path/to/workspace`. To override this behavior, you can extend and rebind the
 * `ElectronMainApplication` class and overriding the `launch` method.
 * A JSON-RPC communication between the Electron Main Process and the Renderer Processes is available: You can bind services using the `ElectronConnectionHandler` and
 * `ElectronIpcConnectionProvider` APIs, example:
 *
 * From an `electron-main` module:
 *
 *     bind(ElectronConnectionHandler).toDynamicValue(context =>
 *          new JsonRpcConnectionHandler(electronMainWindowServicePath,
 *          () => context.container.get(ElectronMainWindowService))
 *     ).inSingletonScope();
 *
 * And from the `electron-browser` module:
 *
 *     bind(ElectronMainWindowService).toDynamicValue(context =>
 *          ElectronIpcConnectionProvider.createProxy(context.container, electronMainWindowServicePath)
 *     ).inSingletonScope();
 */
exports.ElectronMainApplicationContribution = Symbol('ElectronMainApplicationContribution');
// Extracted and modified the functionality from `yargs@15.4.0-beta.0`.
// Based on https://github.com/yargs/yargs/blob/522b019c9a50924605986a1e6e0cb716d47bcbca/lib/process-argv.ts
var ElectronMainProcessArgv = /** @class */ (function () {
    function ElectronMainProcessArgv() {
    }
    Object.defineProperty(ElectronMainProcessArgv.prototype, "processArgvBinIndex", {
        get: function () {
            // The binary name is the first command line argument for:
            // - bundled Electron apps: bin argv1 argv2 ... argvn
            if (this.isBundledElectronApp) {
                return 0;
            }
            // or the second one (default) for:
            // - standard node apps: node bin.js argv1 argv2 ... argvn
            // - unbundled Electron apps: electron bin.js argv1 arg2 ... argvn
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElectronMainProcessArgv.prototype, "isBundledElectronApp", {
        get: function () {
            // process.defaultApp is either set by electron in an electron unbundled app, or undefined
            // see https://github.com/electron/electron/blob/master/docs/api/process.md#processdefaultapp-readonly
            return this.isElectronApp && !process.defaultApp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElectronMainProcessArgv.prototype, "isElectronApp", {
        get: function () {
            // process.versions.electron is either set by electron, or undefined
            // see https://github.com/electron/electron/blob/master/docs/api/process.md#processversionselectron-readonly
            return !!process.versions.electron;
        },
        enumerable: false,
        configurable: true
    });
    ElectronMainProcessArgv.prototype.getProcessArgvWithoutBin = function (argv) {
        if (argv === void 0) { argv = process.argv; }
        return argv.slice(this.processArgvBinIndex + 1);
    };
    ElectronMainProcessArgv.prototype.getProcessArgvBin = function (argv) {
        if (argv === void 0) { argv = process.argv; }
        return argv[this.processArgvBinIndex];
    };
    ElectronMainProcessArgv = __decorate([
        inversify_1.injectable()
    ], ElectronMainProcessArgv);
    return ElectronMainProcessArgv;
}());
exports.ElectronMainProcessArgv = ElectronMainProcessArgv;
var ElectronMainApplication = /** @class */ (function () {
    function ElectronMainApplication() {
        this.electronStore = new Storage();
        this._backendPort = new promise_util_1.Deferred();
        this.backendPort = this._backendPort.promise;
    }
    Object.defineProperty(ElectronMainApplication.prototype, "config", {
        get: function () {
            if (!this._config) {
                throw new Error('You have to start the application first.');
            }
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    ElectronMainApplication.prototype.start = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._config = config;
                        this.hookApplicationEvents();
                        return [4 /*yield*/, this.startBackend()];
                    case 1:
                        port = _a.sent();
                        this._backendPort.resolve(port);
                        return [4 /*yield*/, electron_1.app.whenReady()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.attachElectronSecurityToken(port)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.startContributions()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.launch({
                                secondInstance: false,
                                argv: this.processArgv.getProcessArgvWithoutBin(process.argv),
                                cwd: process.cwd()
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElectronMainApplication.prototype.launch = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                createYargs(params.argv, params.cwd)
                    .command('$0 [file]', false, function (cmd) { return cmd
                    .positional('file', { type: 'string' }); }, function (args) { return _this.handleMainCommand(params, { file: args.file }); }).parse();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Use this rather than creating `BrowserWindow` instances from scratch, since some security parameters need to be set, this method will do it.
     *
     * @param options
     */
    ElectronMainApplication.prototype.createWindow = function (asyncOptions) {
        if (asyncOptions === void 0) { asyncOptions = this.getDefaultBrowserWindowOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var options, electronWindow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, asyncOptions];
                    case 1:
                        options = _a.sent();
                        electronWindow = new electron_1.BrowserWindow(options);
                        this.attachReadyToShow(electronWindow);
                        this.attachSaveWindowState(electronWindow);
                        this.attachGlobalShortcuts(electronWindow);
                        this.restoreMaximizedState(electronWindow, options);
                        return [2 /*return*/, electronWindow];
                }
            });
        });
    };
    ElectronMainApplication.prototype.getDefaultBrowserWindowOptions = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var windowOptionsFromConfig, windowState;
            return __generator(this, function (_b) {
                windowOptionsFromConfig = ((_a = this.config.electron) === null || _a === void 0 ? void 0 : _a.windowOptions) || {};
                windowState = this.electronStore.get('windowstate', undefined);
                if (!windowState) {
                    windowState = this.getDefaultWindowState();
                }
                return [2 /*return*/, __assign(__assign(__assign({}, windowState), { show: false, title: this.config.applicationName, minWidth: 200, minHeight: 120, webPreferences: {
                            // https://github.com/eclipse-theia/theia/issues/2018
                            nodeIntegration: true,
                            // Setting the following option to `true` causes some features to break, somehow.
                            // Issue: https://github.com/eclipse-theia/theia/issues/8577
                            nodeIntegrationInWorker: false,
                        } }), windowOptionsFromConfig)];
            });
        });
    };
    ElectronMainApplication.prototype.openDefaultWindow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uri, electronWindow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.createWindowUri(), this.createWindow()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), uri = _a[0], electronWindow = _a[1];
                        electronWindow.loadURL(uri.toString(true));
                        return [2 /*return*/, electronWindow];
                }
            });
        });
    };
    ElectronMainApplication.prototype.openWindowWithWorkspace = function (workspacePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uri, electronWindow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.createWindowUri(), this.createWindow()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), uri = _a[0], electronWindow = _a[1];
                        electronWindow.loadURL(uri.withFragment(workspacePath).toString(true));
                        return [2 /*return*/, electronWindow];
                }
            });
        });
    };
    /**
     * "Gently" close all windows, application will not stop if a `beforeunload` handler returns `false`.
     */
    ElectronMainApplication.prototype.requestStop = function () {
        electron_1.app.quit();
    };
    ElectronMainApplication.prototype.handleMainCommand = function (params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var workspacePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(options.file === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openDefaultWindow()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 2:
                        workspacePath = void 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs_1.promises.realpath(path.resolve(params.cwd, options.file))];
                    case 4:
                        workspacePath = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        console.error("Could not resolve the workspace path. \"" + options.file + "\" is not a valid 'file' option. Falling back to the default workspace location.");
                        return [3 /*break*/, 6];
                    case 6:
                        if (!(workspacePath === undefined)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.openDefaultWindow()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.openWindowWithWorkspace(workspacePath)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ElectronMainApplication.prototype.createWindowUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = file_uri_1.FileUri.create(this.globals.THEIA_FRONTEND_HTML_PATH)).withQuery;
                        _c = "port=";
                        return [4 /*yield*/, this.backendPort];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c + (_d.sent())])];
                }
            });
        });
    };
    ElectronMainApplication.prototype.getDefaultWindowState = function () {
        // The `screen` API must be required when the application is ready.
        // See: https://electronjs.org/docs/api/screen#screen
        // We must center by hand because `browserWindow.center()` fails on multi-screen setups
        // See: https://github.com/electron/electron/issues/3490
        var bounds = electron_1.screen.getDisplayNearestPoint(electron_1.screen.getCursorScreenPoint()).bounds;
        var height = Math.floor(bounds.height * (2 / 3));
        var width = Math.floor(bounds.width * (2 / 3));
        var y = Math.floor(bounds.y + (bounds.height - height) / 2);
        var x = Math.floor(bounds.x + (bounds.width - width) / 2);
        return { width: width, height: height, x: x, y: y };
    };
    /**
     * Only show the window when the content is ready.
     */
    ElectronMainApplication.prototype.attachReadyToShow = function (electronWindow) {
        electronWindow.on('ready-to-show', function () { return electronWindow.show(); });
    };
    /**
     * Save the window geometry state on every change.
     */
    ElectronMainApplication.prototype.attachSaveWindowState = function (electronWindow) {
        var _this = this;
        var saveWindowState = function () {
            try {
                var bounds = void 0;
                if (electronWindow.isMaximized()) {
                    bounds = _this.electronStore.get('windowstate', {});
                }
                else {
                    bounds = electronWindow.getBounds();
                }
                _this.electronStore.set('windowstate', {
                    isMaximized: electronWindow.isMaximized(),
                    width: bounds.width,
                    height: bounds.height,
                    x: bounds.x,
                    y: bounds.y
                });
            }
            catch (e) {
                console.error('Error while saving window state:', e);
            }
        };
        var delayedSaveTimeout;
        var saveWindowStateDelayed = function () {
            if (delayedSaveTimeout) {
                clearTimeout(delayedSaveTimeout);
            }
            delayedSaveTimeout = setTimeout(saveWindowState, 1000);
        };
        electronWindow.on('close', saveWindowState);
        electronWindow.on('resize', saveWindowStateDelayed);
        electronWindow.on('move', saveWindowStateDelayed);
    };
    /**
     * Catch certain keybindings to prevent reloading the window using keyboard shortcuts.
     */
    ElectronMainApplication.prototype.attachGlobalShortcuts = function (electronWindow) {
        var _a;
        if ((_a = this.config.electron) === null || _a === void 0 ? void 0 : _a.disallowReloadKeybinding) {
            var accelerators_1 = ['CmdOrCtrl+R', 'F5'];
            electronWindow.on('focus', function () {
                var e_1, _a;
                try {
                    for (var accelerators_2 = __values(accelerators_1), accelerators_2_1 = accelerators_2.next(); !accelerators_2_1.done; accelerators_2_1 = accelerators_2.next()) {
                        var accelerator = accelerators_2_1.value;
                        electron_1.globalShortcut.register(accelerator, function () { });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (accelerators_2_1 && !accelerators_2_1.done && (_a = accelerators_2.return)) _a.call(accelerators_2);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
            electronWindow.on('blur', function () {
                var e_2, _a;
                try {
                    for (var accelerators_3 = __values(accelerators_1), accelerators_3_1 = accelerators_3.next(); !accelerators_3_1.done; accelerators_3_1 = accelerators_3.next()) {
                        var accelerator = accelerators_3_1.value;
                        electron_1.globalShortcut.unregister(accelerator);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (accelerators_3_1 && !accelerators_3_1.done && (_a = accelerators_3.return)) _a.call(accelerators_3);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        }
    };
    ElectronMainApplication.prototype.restoreMaximizedState = function (electronWindow, options) {
        if (options.isMaximized) {
            electronWindow.maximize();
        }
        else {
            electronWindow.unmaximize();
        }
    };
    /**
     * Start the NodeJS backend server.
     *
     * @return Running server's port promise.
     */
    ElectronMainApplication.prototype.startBackend = function () {
        return __awaiter(this, void 0, void 0, function () {
            var noBackendFork, address, backendProcess_1, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        noBackendFork = process.argv.indexOf('--no-cluster') !== -1;
                        // We cannot use the `process.cwd()` as the application project path (the location of the `package.json` in other words)
                        // in a bundled electron application because it depends on the way we start it. For instance, on OS X, these are a differences:
                        // https://github.com/eclipse-theia/theia/issues/3297#issuecomment-439172274
                        process.env.THEIA_APP_PROJECT_PATH = this.globals.THEIA_APP_PROJECT_PATH;
                        // Set the electron version for both the dev and the production mode. (https://github.com/eclipse-theia/theia/issues/3254)
                        // Otherwise, the forked backend processes will not know that they're serving the electron frontend.
                        process.env.THEIA_ELECTRON_VERSION = process.versions.electron;
                        if (!noBackendFork) return [3 /*break*/, 2];
                        process.env[electron_token_1.ElectronSecurityToken] = JSON.stringify(this.electronSecurityToken);
                        return [4 /*yield*/, require(this.globals.THEIA_BACKEND_MAIN_PATH)];
                    case 1:
                        address = _c.sent();
                        return [2 /*return*/, address.port];
                    case 2:
                        _a = child_process_1.fork;
                        _b = [this.globals.THEIA_BACKEND_MAIN_PATH,
                            this.processArgv.getProcessArgvWithoutBin()];
                        return [4 /*yield*/, this.getForkOptions()];
                    case 3:
                        backendProcess_1 = _a.apply(void 0, _b.concat([_c.sent()]));
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                // The backend server main file is also supposed to send the resolved http(s) server port via IPC.
                                backendProcess_1.on('message', function (address) {
                                    resolve(address.port);
                                });
                                backendProcess_1.on('error', function (error) {
                                    reject(error);
                                });
                                electron_1.app.on('quit', function () {
                                    // Only issue a kill signal if the backend process is running.
                                    // eslint-disable-next-line no-null/no-null
                                    if (backendProcess_1.exitCode === null && backendProcess_1.signalCode === null) {
                                        try {
                                            // If we forked the process for the clusters, we need to manually terminate it.
                                            // See: https://github.com/eclipse-theia/theia/issues/835
                                            process.kill(backendProcess_1.pid);
                                        }
                                        catch (error) {
                                            // See https://man7.org/linux/man-pages/man2/kill.2.html#ERRORS
                                            if (error.code === 'ESRCH') {
                                                return;
                                            }
                                            throw error;
                                        }
                                    }
                                });
                            })];
                }
            });
        });
    };
    ElectronMainApplication.prototype.getForkOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, {
                        env: __assign(__assign({}, process.env), (_a = {}, _a[electron_token_1.ElectronSecurityToken] = JSON.stringify(this.electronSecurityToken), _a)),
                    }];
            });
        });
    };
    ElectronMainApplication.prototype.attachElectronSecurityToken = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electronSecurityTokenService.setElectronSecurityTokenCookie("http://localhost:" + port)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElectronMainApplication.prototype.hookApplicationEvents = function () {
        electron_1.app.on('will-quit', this.onWillQuit.bind(this));
        electron_1.app.on('second-instance', this.onSecondInstance.bind(this));
        electron_1.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    };
    ElectronMainApplication.prototype.onWillQuit = function (event) {
        this.stopContributions();
    };
    ElectronMainApplication.prototype.onSecondInstance = function (event, argv, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var electronWindows, electronWindow;
            return __generator(this, function (_a) {
                electronWindows = electron_1.BrowserWindow.getAllWindows();
                if (electronWindows.length > 0) {
                    electronWindow = electronWindows[0];
                    if (electronWindow.isMinimized()) {
                        electronWindow.restore();
                    }
                    electronWindow.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    ElectronMainApplication.prototype.onWindowAllClosed = function (event) {
        this.requestStop();
    };
    ElectronMainApplication.prototype.startContributions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a, _b, contribution;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        try {
                            for (_a = __values(this.contributions.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                contribution = _b.value;
                                if (contribution.onStart) {
                                    promises.push(contribution.onStart(this));
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ElectronMainApplication.prototype.stopContributions = function () {
        var e_4, _a;
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                if (contribution.onStop) {
                    contribution.onStop(this);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(exports.ElectronMainApplicationContribution),
        __metadata("design:type", Object)
    ], ElectronMainApplication.prototype, "contributions", void 0);
    __decorate([
        inversify_1.inject(exports.ElectronMainApplicationGlobals),
        __metadata("design:type", Object)
    ], ElectronMainApplication.prototype, "globals", void 0);
    __decorate([
        inversify_1.inject(ElectronMainProcessArgv),
        __metadata("design:type", ElectronMainProcessArgv)
    ], ElectronMainApplication.prototype, "processArgv", void 0);
    __decorate([
        inversify_1.inject(electron_security_token_service_1.ElectronSecurityTokenService),
        __metadata("design:type", electron_security_token_service_1.ElectronSecurityTokenService)
    ], ElectronMainApplication.prototype, "electronSecurityTokenService", void 0);
    __decorate([
        inversify_1.inject(electron_token_1.ElectronSecurityToken),
        __metadata("design:type", Object)
    ], ElectronMainApplication.prototype, "electronSecurityToken", void 0);
    ElectronMainApplication = __decorate([
        inversify_1.injectable()
    ], ElectronMainApplication);
    return ElectronMainApplication;
}());
exports.ElectronMainApplication = ElectronMainApplication;
//# sourceMappingURL=electron-main-application.js.map