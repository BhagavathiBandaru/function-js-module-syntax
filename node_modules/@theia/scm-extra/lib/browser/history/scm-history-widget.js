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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ScmHistoryList = exports.ScmHistoryWidget = exports.ScmCommitNode = exports.ScmHistorySupport = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var react_virtualized_1 = require("react-virtualized");
var uri_1 = require("@theia/core/lib/common/uri");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var _1 = require(".");
var scm_history_contribution_1 = require("./scm-history-contribution");
var scm_avatar_service_1 = require("@theia/scm/lib/browser/scm-avatar-service");
var scm_navigable_list_widget_1 = require("../scm-navigable-list-widget");
var scm_file_change_node_1 = require("../scm-file-change-node");
var scm_navigable_list_widget_2 = require("../scm-navigable-list-widget");
var React = require("react");
var alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
exports.ScmHistorySupport = Symbol('scm-history-support');
var ScmCommitNode;
(function (ScmCommitNode) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(node) {
        return !!node && 'commitDetails' in node && 'expanded' in node && 'selected' in node;
    }
    ScmCommitNode.is = is;
})(ScmCommitNode = exports.ScmCommitNode || (exports.ScmCommitNode = {}));
var ScmHistoryWidget = /** @class */ (function (_super) {
    __extends(ScmHistoryWidget, _super);
    function ScmHistoryWidget(scmService, openerService, shell, fileService, avatarService, widgetManager) {
        var _this = _super.call(this) || this;
        _this.scmService = scmService;
        _this.openerService = openerService;
        _this.shell = shell;
        _this.fileService = fileService;
        _this.avatarService = avatarService;
        _this.widgetManager = widgetManager;
        _this.toDisposeOnRepositoryChange = new core_1.DisposableCollection();
        _this.toDisposeOnRefresh = new core_1.DisposableCollection();
        _this.handleScroll = function (info) { return _this.doHandleScroll(info); };
        _this.loadMoreRows = function (params) { return _this.doLoadMoreRows(params); };
        _this.renderCommit = function (commit) { return _this.doRenderCommit(commit); };
        _this.renderFileChangeList = function (fileChange) { return _this.doRenderFileChangeList(fileChange); };
        _this.id = scm_history_contribution_1.SCM_HISTORY_ID;
        _this.scrollContainer = 'scm-history-list-container';
        _this.title.label = scm_history_contribution_1.SCM_HISTORY_LABEL;
        _this.title.caption = scm_history_contribution_1.SCM_HISTORY_LABEL;
        _this.title.iconClass = 'fa scm-history-tab-icon';
        _this.title.closable = true;
        _this.addClass('theia-scm');
        _this.addClass('theia-scm-history');
        _this.resetState();
        _this.cancelIndicator = new cancellation_1.CancellationTokenSource();
        return _this;
    }
    ScmHistoryWidget.prototype.init = function () {
        var _this = this;
        this.refreshOnRepositoryChange();
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(function () { return _this.refreshOnRepositoryChange(); }));
        this.toDispose.push(this.labelProvider.onDidChange(function (event) {
            if (_this.scmNodes.some(function (node) { return scm_file_change_node_1.ScmFileChangeNode.is(node) && event.affects(new uri_1.default(node.fileChange.uri)); })) {
                _this.update();
            }
        }));
    };
    ScmHistoryWidget.prototype.refreshOnRepositoryChange = function () {
        var _this = this;
        this.toDisposeOnRepositoryChange.dispose();
        var repository = this.scmService.selectedRepository;
        if (repository && _1.ScmHistoryProvider.is(repository.provider)) {
            this.historySupport = repository.provider.historySupport;
            if (this.historySupport) {
                this.toDisposeOnRepositoryChange.push(this.historySupport.onDidChangeHistory(function () { return _this.setContent(_this.options); }));
            }
        }
        else {
            this.historySupport = undefined;
        }
        this.setContent(this.options);
        // If switching repository, discard options because they are specific to a repository
        this.options = {};
        this.refresh();
    };
    ScmHistoryWidget.prototype.refresh = function () {
        var _this = this;
        this.toDisposeOnRefresh.dispose();
        this.toDispose.push(this.toDisposeOnRefresh);
        var repository = this.scmService.selectedRepository;
        this.title.label = scm_history_contribution_1.SCM_HISTORY_LABEL;
        if (repository) {
            this.title.label += ': ' + repository.provider.label;
        }
        var area = this.shell.getAreaFor(this);
        if (area === 'left') {
            this.shell.leftPanelHandler.refresh();
        }
        else if (area === 'right') {
            this.shell.rightPanelHandler.refresh();
        }
        this.update();
        if (repository) {
            this.toDisposeOnRefresh.push(repository.onDidChange(function () { return _this.update(); }));
            // render synchronously to avoid cursor jumping
            // see https://stackoverflow.com/questions/28922275/in-reactjs-why-does-setstate-behave-differently-when-called-synchronously/28922465#28922465
            this.toDisposeOnRefresh.push(repository.input.onDidChange(function () { return _this.setContent(_this.options); }));
        }
    };
    ScmHistoryWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.addListNavigationKeyListeners(this.node);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.addEventListener(this.node, 'ps-scroll-y', function (e) {
            if (_this.listView && _this.listView.list && _this.listView.list.Grid) {
                var scrollTop = e.target.scrollTop;
                _this.listView.list.Grid.handleScrollEvent({ scrollTop: scrollTop });
            }
        });
    };
    ScmHistoryWidget.prototype.update = function () {
        if (this.listView && this.listView.list) {
            this.listView.list.forceUpdateGrid();
        }
        _super.prototype.update.call(this);
    };
    ScmHistoryWidget.prototype.setContent = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStat, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.resetState(options);
                        if (!(options && options.uri)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fileService.resolve(new uri_1.default(options.uri))];
                    case 2:
                        fileStat = _b.sent();
                        this.singleFileMode = !fileStat.isDirectory;
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        this.singleFileMode = true;
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.addCommits(options)];
                    case 5:
                        _b.sent();
                        this.onDataReady();
                        if (this.scmNodes.length > 0) {
                            this.selectNode(this.scmNodes[0]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ScmHistoryWidget.prototype.resetState = function (options) {
        this.options = options || {};
        this.status = { state: 'loading' };
        this.scmNodes = [];
        this.hasMoreCommits = true;
        this.allowScrollToSelected = true;
    };
    ScmHistoryWidget.prototype.addCommits = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, token, currentCommits, history_2, commits, _loop_1, this_1, history_1, history_1_1, commit, e_1_1, error_1;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repository = this.scmService.selectedRepository;
                        this.cancelIndicator.cancel();
                        this.cancelIndicator = new cancellation_1.CancellationTokenSource();
                        token = this.cancelIndicator.token;
                        if (!repository) return [3 /*break*/, 15];
                        if (!this.historySupport) return [3 /*break*/, 13];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        currentCommits = this.status.state === 'ready' ? this.status.commits : [];
                        return [4 /*yield*/, this.historySupport.getCommitHistory(options)];
                    case 2:
                        history_2 = _b.sent();
                        if (token.isCancellationRequested || !this.hasMoreCommits) {
                            return [2 /*return*/];
                        }
                        if (options && ((options.maxCount && history_2.length < options.maxCount) || (!options.maxCount && currentCommits))) {
                            this.hasMoreCommits = false;
                        }
                        if (currentCommits.length > 0) {
                            history_2 = history_2.slice(1);
                        }
                        commits = [];
                        _loop_1 = function (commit) {
                            var fileChangeNodes, avatarUrl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileChangeNodes = [];
                                        return [4 /*yield*/, Promise.all(commit.fileChanges.map(function (fileChange) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    fileChangeNodes.push({
                                                        fileChange: fileChange,
                                                        commitId: commit.id
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); }))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_1.avatarService.getAvatar(commit.authorEmail)];
                                    case 2:
                                        avatarUrl = _a.sent();
                                        commits.push({
                                            commitDetails: commit,
                                            authorAvatar: avatarUrl,
                                            fileChangeNodes: fileChangeNodes,
                                            expanded: false,
                                            selected: false
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, 9, 10]);
                        history_1 = __values(history_2), history_1_1 = history_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!history_1_1.done) return [3 /*break*/, 7];
                        commit = history_1_1.value;
                        return [5 /*yield**/, _loop_1(commit)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        history_1_1 = history_1.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (history_1_1 && !history_1_1.done && (_a = history_1.return)) _a.call(history_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        currentCommits.push.apply(currentCommits, __spread(commits));
                        this.status = { state: 'ready', commits: currentCommits };
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        if (options && options.uri && repository) {
                            this.hasMoreCommits = false;
                        }
                        this.status = { state: 'error', errorMessage: React.createElement(React.Fragment, null,
                                " ",
                                error_1.message,
                                " ") };
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        this.status = { state: 'error', errorMessage: React.createElement(React.Fragment, null,
                                "History is not supported for ",
                                repository.provider.label,
                                " source control.") };
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        this.status = { state: 'error', errorMessage: React.createElement(React.Fragment, null, "There is no repository selected in this workspace.") };
                        _b.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ScmHistoryWidget.prototype.addOrRemoveFileChangeNodes = function (commit) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.scmNodes.findIndex(function (node) { return node === commit; });
                        if (!commit.expanded) return [3 /*break*/, 1];
                        this.removeFileChangeNodes(commit, id);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.addFileChangeNodes(commit, id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        commit.expanded = !commit.expanded;
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScmHistoryWidget.prototype.addFileChangeNodes = function (commit, scmNodesArrayIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (commit.fileChangeNodes) {
                    (_a = this.scmNodes).splice.apply(_a, __spread([scmNodesArrayIndex + 1, 0], commit.fileChangeNodes.map(function (node) {
                        return Object.assign(node, { commitSha: commit.commitDetails.id });
                    })));
                }
                return [2 /*return*/];
            });
        });
    };
    ScmHistoryWidget.prototype.removeFileChangeNodes = function (commit, scmNodesArrayIndex) {
        if (commit.fileChangeNodes) {
            this.scmNodes.splice(scmNodesArrayIndex + 1, commit.fileChangeNodes.length);
        }
    };
    ScmHistoryWidget.prototype.storeState = function () {
        var _a = this, options = _a.options, singleFileMode = _a.singleFileMode;
        return {
            options: options,
            singleFileMode: singleFileMode
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScmHistoryWidget.prototype.restoreState = function (oldState) {
        this.options = oldState['options'];
        this.singleFileMode = oldState['singleFileMode'];
        this.setContent(this.options);
    };
    ScmHistoryWidget.prototype.onDataReady = function () {
        if (this.status.state === 'ready') {
            this.scmNodes = this.status.commits;
        }
        this.update();
    };
    ScmHistoryWidget.prototype.render = function () {
        var content;
        switch (this.status.state) {
            case 'ready':
                content = React.createElement(React.Fragment, null,
                    this.renderHistoryHeader(),
                    this.renderCommitList());
                break;
            case 'error':
                var reason = this.status.errorMessage;
                var path = '';
                if (this.options.uri) {
                    var relPathEncoded = this.scmLabelProvider.relativePath(this.options.uri);
                    var relPath = relPathEncoded ? "" + decodeURIComponent(relPathEncoded) : '';
                    var repo = this.scmService.findRepository(new uri_1.default(this.options.uri));
                    var repoName = repo ? "" + this.labelProvider.getName(new uri_1.default(repo.provider.rootUri)) : '';
                    var relPathAndRepo = [relPath, repoName].filter(Boolean).join(' in ');
                    path = " for " + relPathAndRepo;
                }
                content = React.createElement(alert_message_1.AlertMessage, { type: 'WARNING', header: "There is no history available" + path + "." }, reason);
                break;
            case 'loading':
                content = React.createElement("div", { className: 'spinnerContainer' },
                    React.createElement("span", { className: 'fa fa-spinner fa-pulse fa-3x fa-fw' }));
                break;
        }
        return React.createElement("div", { className: 'history-container' }, content);
    };
    ScmHistoryWidget.prototype.renderHistoryHeader = function () {
        if (this.options.uri) {
            var path = this.scmLabelProvider.relativePath(this.options.uri);
            var fileName = path.split('/').pop();
            return React.createElement("div", { className: 'diff-header' },
                this.renderHeaderRow({ name: 'repository', value: this.getRepositoryLabel(this.options.uri) }),
                this.renderHeaderRow({ name: 'file', value: fileName, title: path }),
                React.createElement("div", { className: 'theia-header' }, "Commits"));
        }
    };
    ScmHistoryWidget.prototype.renderCommitList = function () {
        var _this = this;
        var list = React.createElement("div", { className: 'listContainer', id: this.scrollContainer },
            React.createElement(ScmHistoryList, { ref: function (listView) { return _this.listView = (listView || undefined); }, rows: this.scmNodes, hasMoreRows: this.hasMoreCommits, indexOfSelected: this.allowScrollToSelected ? this.indexOfSelected : -1, handleScroll: this.handleScroll, loadMoreRows: this.loadMoreRows, renderCommit: this.renderCommit, renderFileChangeList: this.renderFileChangeList }));
        this.allowScrollToSelected = true;
        return list;
    };
    ScmHistoryWidget.prototype.doHandleScroll = function (info) {
        this.node.scrollTop = info.scrollTop;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScmHistoryWidget.prototype.doLoadMoreRows = function (params) {
        var _this = this;
        var resolver;
        var promise = new Promise(function (resolve) { return resolver = resolve; });
        var lastRow = this.scmNodes[params.stopIndex - 1];
        if (ScmCommitNode.is(lastRow)) {
            var toRevision = lastRow.commitDetails.id;
            this.addCommits({
                range: { toRevision: toRevision },
                maxCount: scm_history_contribution_1.SCM_HISTORY_MAX_COUNT,
                uri: this.options.uri
            }).then(function () {
                _this.allowScrollToSelected = false;
                _this.onDataReady();
                resolver();
            });
        }
        return promise;
    };
    ScmHistoryWidget.prototype.doRenderCommit = function (commit) {
        var _this = this;
        var expansionToggleIcon = 'caret-right';
        if (commit && commit.expanded) {
            expansionToggleIcon = 'caret-down';
        }
        return React.createElement("div", { className: "containerHead" + (commit.selected ? ' ' + browser_1.SELECTED_CLASS : ''), onClick: function (e) {
                if (commit.selected && !_this.singleFileMode) {
                    _this.addOrRemoveFileChangeNodes(commit);
                }
                else {
                    _this.selectNode(commit);
                }
                e.preventDefault();
            }, onDoubleClick: function (e) {
                if (_this.singleFileMode && commit.fileChangeNodes.length > 0) {
                    _this.openFile(commit.fileChangeNodes[0].fileChange);
                }
                e.preventDefault();
            } },
            React.createElement("div", { className: 'headContent' },
                React.createElement("div", { className: 'image-container' },
                    React.createElement("img", { className: 'gravatar', src: commit.authorAvatar })),
                React.createElement("div", { className: "headLabelContainer" + (this.singleFileMode ? ' singleFileMode' : '') },
                    React.createElement("div", { className: 'headLabel noWrapInfo noselect' }, commit.commitDetails.summary),
                    React.createElement("div", { className: 'commitTime noWrapInfo noselect' }, commit.commitDetails.authorDateRelative + ' by ' + commit.commitDetails.authorName)),
                React.createElement("div", { className: 'fa fa-eye detailButton', onClick: function () { return _this.openDetailWidget(commit); } }),
                !this.singleFileMode ? React.createElement("div", { className: 'expansionToggle noselect' },
                    React.createElement("div", { className: 'toggle' },
                        React.createElement("div", { className: 'number' }, commit.commitDetails.fileChanges.length.toString()),
                        React.createElement("div", { className: 'icon fa fa-' + expansionToggleIcon })))
                    : ''));
    };
    ScmHistoryWidget.prototype.openDetailWidget = function (commitNode) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = __assign(__assign({}, commitNode.commitDetails.commitDetailOptions), { mode: 'reveal' });
                browser_1.open(this.openerService, commitNode.commitDetails.commitDetailUri, options);
                return [2 /*return*/];
            });
        });
    };
    ScmHistoryWidget.prototype.doRenderFileChangeList = function (fileChange) {
        var fileChangeElement = this.renderScmItem(fileChange, fileChange.commitId);
        return fileChangeElement;
    };
    ScmHistoryWidget.prototype.renderScmItem = function (change, commitSha) {
        var _this = this;
        return React.createElement(scm_navigable_list_widget_1.ScmItemComponent, __assign({ key: change.fileChange.uri.toString() }, {
            labelProvider: this.labelProvider,
            scmLabelProvider: this.scmLabelProvider,
            change: change,
            revealChange: function () { return _this.openFile(change.fileChange); },
            selectNode: function () { return _this.selectNode(change); }
        }));
    };
    ScmHistoryWidget.prototype.navigateLeft = function () {
        var selected = this.getSelected();
        if (selected && this.status.state === 'ready') {
            if (ScmCommitNode.is(selected)) {
                var idx = this.status.commits.findIndex(function (c) { return c.commitDetails.id === selected.commitDetails.id; });
                if (selected.expanded) {
                    this.addOrRemoveFileChangeNodes(selected);
                }
                else {
                    if (idx > 0) {
                        this.selectNode(this.status.commits[idx - 1]);
                    }
                }
            }
            else if (scm_file_change_node_1.ScmFileChangeNode.is(selected)) {
                var idx = this.status.commits.findIndex(function (c) { return c.commitDetails.id === selected.commitId; });
                this.selectNode(this.status.commits[idx]);
            }
        }
        this.update();
    };
    ScmHistoryWidget.prototype.navigateRight = function () {
        var selected = this.getSelected();
        if (selected) {
            if (ScmCommitNode.is(selected) && !selected.expanded && !this.singleFileMode) {
                this.addOrRemoveFileChangeNodes(selected);
            }
            else {
                this.selectNextNode();
            }
        }
        this.update();
    };
    ScmHistoryWidget.prototype.handleListEnter = function () {
        var selected = this.getSelected();
        if (selected) {
            if (ScmCommitNode.is(selected)) {
                if (this.singleFileMode) {
                    this.openFile(selected.fileChangeNodes[0].fileChange);
                }
                else {
                    this.openDetailWidget(selected);
                }
            }
            else if (scm_file_change_node_1.ScmFileChangeNode.is(selected)) {
                this.openFile(selected.fileChange);
            }
        }
        this.update();
    };
    ScmHistoryWidget.prototype.openFile = function (change) {
        var uriToOpen = change.getUriToOpen();
        browser_1.open(this.openerService, uriToOpen, { mode: 'reveal' });
    };
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScmHistoryWidget.prototype, "init", null);
    ScmHistoryWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(scm_service_1.ScmService)),
        __param(1, inversify_1.inject(browser_1.OpenerService)),
        __param(2, inversify_1.inject(browser_1.ApplicationShell)),
        __param(3, inversify_1.inject(file_service_1.FileService)),
        __param(4, inversify_1.inject(scm_avatar_service_1.ScmAvatarService)),
        __param(5, inversify_1.inject(browser_1.WidgetManager)),
        __metadata("design:paramtypes", [scm_service_1.ScmService, Object, browser_1.ApplicationShell,
            file_service_1.FileService,
            scm_avatar_service_1.ScmAvatarService,
            browser_1.WidgetManager])
    ], ScmHistoryWidget);
    return ScmHistoryWidget;
}(scm_navigable_list_widget_2.ScmNavigableListWidget));
exports.ScmHistoryWidget = ScmHistoryWidget;
var ScmHistoryList = /** @class */ (function (_super) {
    __extends(ScmHistoryList, _super);
    function ScmHistoryList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkIfRowIsLoaded = function (opts) { return _this.doCheckIfRowIsLoaded(opts); };
        _this.measureCache = new react_virtualized_1.CellMeasurerCache();
        _this.measureRowRenderer = function (params) {
            var index = params.index, key = params.key, parent = params.parent;
            return (React.createElement(react_virtualized_1.CellMeasurer, { cache: _this.measureCache, columnIndex: 0, key: key, rowIndex: index, parent: parent }, function () { return _this.renderRow(params); }));
        };
        _this.renderRow = function (_a) {
            var index = _a.index, key = _a.key, style = _a.style;
            if (_this.checkIfRowIsLoaded({ index: index })) {
                var row = _this.props.rows[index];
                if (ScmCommitNode.is(row)) {
                    var head = _this.props.renderCommit(row);
                    return React.createElement("div", { key: key, style: style, className: "commitListElement" + (index === 0 ? ' first' : '') }, head);
                }
                else if (scm_file_change_node_1.ScmFileChangeNode.is(row)) {
                    return React.createElement("div", { key: key, style: style, className: 'fileChangeListElement' }, _this.props.renderFileChangeList(row));
                }
            }
            else {
                return React.createElement("div", { key: key, style: style, className: "commitListElement" + (index === 0 ? ' first' : '') },
                    React.createElement("span", { className: 'fa fa-spinner fa-pulse fa-fw' }));
            }
        };
        return _this;
    }
    ScmHistoryList.prototype.doCheckIfRowIsLoaded = function (opts) {
        var row = this.props.rows[opts.index];
        return !!row;
    };
    ScmHistoryList.prototype.render = function () {
        var _this = this;
        return React.createElement(react_virtualized_1.InfiniteLoader, { isRowLoaded: this.checkIfRowIsLoaded, loadMoreRows: this.props.loadMoreRows, rowCount: this.props.rows.length + 1, threshold: 15 }, function (_a) {
            var onRowsRendered = _a.onRowsRendered, registerChild = _a.registerChild;
            return (React.createElement(react_virtualized_1.AutoSizer, null, function (_a) {
                var width = _a.width, height = _a.height;
                return React.createElement(react_virtualized_1.List, { className: 'commitList', ref: function (list) {
                        _this.list = (list || undefined);
                        registerChild(list);
                    }, width: width, height: height, onRowsRendered: onRowsRendered, rowRenderer: _this.measureRowRenderer, rowHeight: _this.measureCache.rowHeight, rowCount: _this.props.hasMoreRows ? _this.props.rows.length + 1 : _this.props.rows.length, tabIndex: -1, onScroll: _this.props.handleScroll, scrollToIndex: _this.props.indexOfSelected, style: {
                        overflowY: 'visible',
                        overflowX: 'visible'
                    } });
            }));
        });
    };
    ScmHistoryList.prototype.componentWillUpdate = function () {
        this.measureCache.clearAll();
    };
    return ScmHistoryList;
}(React.Component));
exports.ScmHistoryList = ScmHistoryList;
//# sourceMappingURL=scm-history-widget.js.map