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
exports.SearchInWorkspaceResultTreeWidget = exports.SearchInWorkspaceResultLineNode = exports.SearchInWorkspaceFileNode = exports.SearchInWorkspaceRootFolderNode = exports.SearchInWorkspaceRoot = void 0;
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var core_1 = require("@theia/core");
var browser_2 = require("@theia/editor/lib/browser");
var browser_3 = require("@theia/workspace/lib/browser");
var browser_4 = require("@theia/filesystem/lib/browser");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var search_in_workspace_service_1 = require("./search-in-workspace-service");
var in_memory_text_resource_1 = require("./in-memory-text-resource");
var uri_1 = require("@theia/core/lib/common/uri");
var React = require("react");
var search_in_workspace_preferences_1 = require("./search-in-workspace-preferences");
var core_2 = require("@theia/core");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var minimatch = require("minimatch");
var disposable_1 = require("@theia/core/lib/common/disposable");
var debounce = require("lodash.debounce");
var ROOT_ID = 'ResultTree';
var SearchInWorkspaceRoot;
(function (SearchInWorkspaceRoot) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(node) {
        return browser_1.CompositeTreeNode.is(node) && node.id === ROOT_ID;
    }
    SearchInWorkspaceRoot.is = is;
})(SearchInWorkspaceRoot = exports.SearchInWorkspaceRoot || (exports.SearchInWorkspaceRoot = {}));
var SearchInWorkspaceRootFolderNode;
(function (SearchInWorkspaceRootFolderNode) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(node) {
        return browser_1.ExpandableTreeNode.is(node) && browser_1.SelectableTreeNode.is(node) && 'path' in node && 'folderUri' in node && !('fileUri' in node);
    }
    SearchInWorkspaceRootFolderNode.is = is;
})(SearchInWorkspaceRootFolderNode = exports.SearchInWorkspaceRootFolderNode || (exports.SearchInWorkspaceRootFolderNode = {}));
var SearchInWorkspaceFileNode;
(function (SearchInWorkspaceFileNode) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(node) {
        return browser_1.ExpandableTreeNode.is(node) && browser_1.SelectableTreeNode.is(node) && 'path' in node && 'fileUri' in node && !('folderUri' in node);
    }
    SearchInWorkspaceFileNode.is = is;
})(SearchInWorkspaceFileNode = exports.SearchInWorkspaceFileNode || (exports.SearchInWorkspaceFileNode = {}));
var SearchInWorkspaceResultLineNode;
(function (SearchInWorkspaceResultLineNode) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(node) {
        return browser_1.SelectableTreeNode.is(node) && 'line' in node && 'character' in node && 'lineText' in node;
    }
    SearchInWorkspaceResultLineNode.is = is;
})(SearchInWorkspaceResultLineNode = exports.SearchInWorkspaceResultLineNode || (exports.SearchInWorkspaceResultLineNode = {}));
var SearchInWorkspaceResultTreeWidget = /** @class */ (function (_super) {
    __extends(SearchInWorkspaceResultTreeWidget, _super);
    function SearchInWorkspaceResultTreeWidget(props, model, contextMenuRenderer) {
        var _this = _super.call(this, props, model, contextMenuRenderer) || this;
        _this.props = props;
        _this.model = model;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this._showReplaceButtons = false;
        _this._replaceTerm = '';
        _this.searchTerm = '';
        _this.startSearchOnModification = function (activeEditor) { return debounce(function () { return _this.searchActiveEditor(activeEditor, _this.searchTerm, _this.searchOptions); }, _this.searchOnEditorModificationDelay); };
        _this.searchOnEditorModificationDelay = 300;
        _this.toDisposeOnActiveEditorChanged = new disposable_1.DisposableCollection();
        // The default root name to add external search results in the case that a workspace is opened.
        _this.defaultRootName = 'Other files';
        _this.forceVisibleRootNode = false;
        _this.appliedDecorations = new Map();
        _this.changeEmitter = new core_1.Emitter();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.focusInputEmitter = new core_1.Emitter();
        _this.remove = function (node, e) { return _this.doRemove(node, e); };
        model.root = {
            id: ROOT_ID,
            parent: undefined,
            visible: false,
            children: []
        };
        _this.toDispose.push(model.onSelectionChanged(function (nodes) {
            var node = nodes[0];
            if (SearchInWorkspaceResultLineNode.is(node)) {
                _this.doOpen(node, true);
            }
        }));
        _this.resultTree = new Map();
        _this.toDispose.push(model.onNodeRefreshed(function () { return _this.changeEmitter.fire(_this.resultTree); }));
        return _this;
    }
    SearchInWorkspaceResultTreeWidget.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.addClass('resultContainer');
        this.toDispose.push(this.changeEmitter);
        this.toDispose.push(this.focusInputEmitter);
        this.toDispose.push(this.editorManager.onActiveEditorChanged(function (activeEditor) {
            _this.updateCurrentEditorDecorations();
            _this.toDisposeOnActiveEditorChanged.dispose();
            _this.toDispose.push(_this.toDisposeOnActiveEditorChanged);
            if (activeEditor) {
                _this.toDisposeOnActiveEditorChanged.push(activeEditor.editor.onDocumentContentChanged(function () {
                    if (_this.searchTerm !== '' && _this.searchInWorkspacePreferences['search.searchOnEditorModification']) {
                        _this.startSearchOnModification(activeEditor)();
                    }
                }));
            }
        }));
        this.toDispose.push(this.searchInWorkspacePreferences.onPreferenceChanged(function () {
            _this.update();
        }));
        this.toDispose.push(this.fileService.onDidFilesChange(function (event) {
            if (event.gotDeleted()) {
                event.getDeleted().forEach(function (deletedFile) {
                    var fileNodes = _this.getFileNodesByUri(deletedFile.resource);
                    fileNodes.forEach(function (node) { return _this.removeFileNode(node); });
                });
                _this.model.refresh();
            }
        }));
    };
    Object.defineProperty(SearchInWorkspaceResultTreeWidget.prototype, "fileNumber", {
        get: function () {
            var e_1, _a;
            var num = 0;
            try {
                for (var _b = __values(this.resultTree.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rootFolderNode = _c.value;
                    num += rootFolderNode.children.length;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return num;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchInWorkspaceResultTreeWidget.prototype, "showReplaceButtons", {
        set: function (srb) {
            this._showReplaceButtons = srb;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchInWorkspaceResultTreeWidget.prototype, "replaceTerm", {
        set: function (rt) {
            this._replaceTerm = rt;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchInWorkspaceResultTreeWidget.prototype, "onChange", {
        get: function () {
            return this.changeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchInWorkspaceResultTreeWidget.prototype, "onFocusInput", {
        get: function () {
            return this.focusInputEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    SearchInWorkspaceResultTreeWidget.prototype.collapseAll = function () {
        var _this = this;
        this.resultTree.forEach(function (rootFolderNode) {
            rootFolderNode.children.forEach(function (fileNode) { return _this.expansionService.collapseNode(fileNode); });
            if (rootFolderNode.visible) {
                _this.expansionService.collapseNode(rootFolderNode);
            }
        });
    };
    /**
     * Find matches for the given editor.
     * @param searchTerm the search term.
     * @param widget the editor widget.
     * @param searchOptions the search options to apply.
     *
     * @returns the list of matches.
     */
    SearchInWorkspaceResultTreeWidget.prototype.findMatches = function (searchTerm, widget, searchOptions) {
        if (!widget.editor.document.findMatches) {
            return [];
        }
        var results = widget.editor.document.findMatches({
            searchString: searchTerm,
            isRegex: !!searchOptions.useRegExp,
            matchCase: !!searchOptions.matchCase,
            matchWholeWord: !!searchOptions.matchWholeWord,
            limitResultCount: searchOptions.maxResults
        });
        var matches = [];
        results.forEach(function (r) {
            var lineText = widget.editor.document.getLineContent(r.range.start.line);
            matches.push({
                line: r.range.start.line,
                character: r.range.start.character,
                length: r.range.end.character - r.range.start.character,
                lineText: lineText
            });
        });
        return matches;
    };
    /**
     * Convert a pattern to match all directories.
     * @param workspaceRootUri the uri of the current workspace root.
     * @param pattern the pattern to be converted.
     */
    SearchInWorkspaceResultTreeWidget.prototype.convertPatternToGlob = function (workspaceRootUri, pattern) {
        // The leading to make the pattern matches in all directories.
        var globalPrefix = '**/';
        if (pattern.startsWith(globalPrefix)) {
            return pattern;
        }
        if (pattern.startsWith('./')) {
            if (workspaceRootUri === undefined) {
                return pattern;
            }
            return workspaceRootUri.toString().concat(pattern.replace('./', '/'));
        }
        return globalPrefix.concat(pattern);
    };
    /**
     * Determine if the URI matches any of the patterns.
     * @param uri the editor URI.
     * @param patterns the glob patterns to verify.
     */
    SearchInWorkspaceResultTreeWidget.prototype.inPatternList = function (uri, patterns) {
        var _this = this;
        var opts = { dot: true, matchBase: true };
        return patterns.some(function (pattern) { return minimatch(uri.toString(), _this.convertPatternToGlob(_this.workspaceService.getWorkspaceRootUri(uri), pattern), opts); });
    };
    /**
     * Determine if the given editor satisfies the filtering criteria.
     * An editor should be searched only if:
     * - it is not excluded through the `excludes` list.
     * - it is not explicitly present in a non-empty `includes` list.
     */
    SearchInWorkspaceResultTreeWidget.prototype.shouldApplySearch = function (editorWidget, searchOptions) {
        var excludePatterns = this.getExcludeGlobs(searchOptions.exclude);
        if (this.inPatternList(editorWidget.editor.uri, excludePatterns)) {
            return false;
        }
        var includePatterns = searchOptions.include;
        if (!!(includePatterns === null || includePatterns === void 0 ? void 0 : includePatterns.length) && !this.inPatternList(editorWidget.editor.uri, includePatterns)) {
            return false;
        }
        return true;
    };
    /**
     * Search the active editor only and update the tree with those results.
     */
    SearchInWorkspaceResultTreeWidget.prototype.searchActiveEditor = function (activeEditor, searchTerm, searchOptions) {
        var _this = this;
        var includesExternalResults = function () { return !!_this.resultTree.get(_this.defaultRootName); };
        // Check if outside workspace results are present before searching.
        var hasExternalResultsBefore = includesExternalResults();
        // Collect search results for the given editor.
        var results = this.searchInEditor(activeEditor, searchTerm, searchOptions);
        // Update the tree by removing the result node, and add new results if applicable.
        this.getFileNodesByUri(activeEditor.editor.uri).forEach(function (fileNode) { return _this.removeFileNode(fileNode); });
        if (results) {
            this.appendToResultTree(results);
        }
        // Check if outside workspace results are present after searching.
        var hasExternalResultsAfter = includesExternalResults();
        // Redo a search to update the tree node visibility if:
        // + `Other files` node was present, now it is not.
        // + `Other files` node was not present, now it is.
        if (hasExternalResultsBefore ? !hasExternalResultsAfter : hasExternalResultsAfter) {
            this.search(this.searchTerm, this.searchOptions);
            return;
        }
        this.handleSearchCompleted();
    };
    /**
     * Perform a search in all open editors.
     * @param searchTerm the search term.
     * @param searchOptions the search options to apply.
     *
     * @returns the tuple of result count, and the list of search results.
     */
    SearchInWorkspaceResultTreeWidget.prototype.searchInOpenEditors = function (searchTerm, searchOptions) {
        var _this = this;
        // Track the number of results found.
        var numberOfResults = 0;
        var searchResults = [];
        this.editorManager.all.forEach(function (e) {
            var editorResults = _this.searchInEditor(e, searchTerm, searchOptions);
            if (editorResults) {
                numberOfResults += editorResults.matches.length;
                searchResults.push(editorResults);
            }
        });
        return {
            numberOfResults: numberOfResults,
            matches: searchResults
        };
    };
    /**
     * Perform a search in the target editor.
     * @param editorWidget the editor widget.
     * @param searchTerm the search term.
     * @param searchOptions the search options to apply.
     *
     * @returns the search results from the given editor, undefined if the editor is either filtered or has no matches found.
     */
    SearchInWorkspaceResultTreeWidget.prototype.searchInEditor = function (editorWidget, searchTerm, searchOptions) {
        var _a;
        if (!this.shouldApplySearch(editorWidget, searchOptions)) {
            return undefined;
        }
        var matches = this.findMatches(searchTerm, editorWidget, searchOptions);
        if (matches.length <= 0) {
            return undefined;
        }
        var fileUri = editorWidget.editor.uri.toString();
        var root = (_a = this.workspaceService.getWorkspaceRootUri(editorWidget.editor.uri)) === null || _a === void 0 ? void 0 : _a.toString();
        return {
            root: root !== null && root !== void 0 ? root : this.defaultRootName,
            fileUri: fileUri,
            matches: matches
        };
    };
    /**
     * Append search results to the result tree.
     * @param result Search result.
     */
    SearchInWorkspaceResultTreeWidget.prototype.appendToResultTree = function (result) {
        var e_2, _a;
        var collapseValue = this.searchInWorkspacePreferences['search.collapseResults'];
        var path;
        if (result.root === this.defaultRootName) {
            path = new uri_1.default(result.fileUri).path.dir.toString();
        }
        else {
            path = this.filenameAndPath(result.root, result.fileUri).path;
        }
        var tree = this.resultTree;
        var rootFolderNode = tree.get(result.root);
        if (!rootFolderNode) {
            rootFolderNode = this.createRootFolderNode(result.root);
            tree.set(result.root, rootFolderNode);
        }
        var fileNode = rootFolderNode.children.find(function (f) { return f.fileUri === result.fileUri; });
        if (!fileNode) {
            fileNode = this.createFileNode(result.root, path, result.fileUri, rootFolderNode);
            rootFolderNode.children.push(fileNode);
        }
        var _loop_1 = function (match) {
            var line = this_1.createResultLineNode(result, match, fileNode);
            if (fileNode.children.findIndex(function (lineNode) { return lineNode.id === line.id; }) < 0) {
                fileNode.children.push(line);
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(result.matches), _c = _b.next(); !_c.done; _c = _b.next()) {
                var match = _c.value;
                _loop_1(match);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.collapseFileNode(fileNode, collapseValue);
    };
    /**
     * Handle when searching completed.
     */
    SearchInWorkspaceResultTreeWidget.prototype.handleSearchCompleted = function (cancelIndicator) {
        if (cancelIndicator) {
            cancelIndicator.cancel();
        }
        this.sortResultTree();
        this.refreshModelChildren();
    };
    /**
     * Sort the result tree by URIs.
     */
    SearchInWorkspaceResultTreeWidget.prototype.sortResultTree = function () {
        var _this = this;
        // Sort the result map by folder URI.
        var entries = __spread(this.resultTree.entries());
        entries.sort(function (_a, _b) {
            var _c = __read(_a, 2), a = _c[1];
            var _d = __read(_b, 2), b = _d[1];
            return _this.compare(a.folderUri, b.folderUri);
        });
        this.resultTree = new Map(entries);
        // Update the list of children nodes, sorting them by their file URI.
        entries.forEach(function (_a) {
            var _b = __read(_a, 2), folder = _b[1];
            folder.children.sort(function (a, b) { return _this.compare(a.fileUri, b.fileUri); });
        });
    };
    /**
     * Search and populate the result tree with matches.
     * @param searchTerm the search term.
     * @param searchOptions the search options to apply.
     */
    SearchInWorkspaceResultTreeWidget.prototype.search = function (searchTerm, searchOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var cancelIndicator, token, progress, _a, numberOfResults, matches, pendingRefreshTimeout, searchId;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.searchTerm = searchTerm;
                        this.searchOptions = searchOptions;
                        searchOptions = __assign(__assign({}, searchOptions), { exclude: this.getExcludeGlobs(searchOptions.exclude) });
                        this.resultTree.clear();
                        this.forceVisibleRootNode = false;
                        if (this.cancelIndicator) {
                            this.cancelIndicator.cancel();
                        }
                        if (searchTerm === '') {
                            this.refreshModelChildren();
                            return [2 /*return*/];
                        }
                        this.cancelIndicator = new core_1.CancellationTokenSource();
                        cancelIndicator = this.cancelIndicator;
                        token = this.cancelIndicator.token;
                        return [4 /*yield*/, this.progressService.showProgress({ text: "search: " + searchTerm, options: { location: 'search' } })];
                    case 1:
                        progress = _b.sent();
                        token.onCancellationRequested(function () {
                            progress.cancel();
                            if (searchId) {
                                _this.searchService.cancel(searchId);
                            }
                            _this.cancelIndicator = undefined;
                            _this.changeEmitter.fire(_this.resultTree);
                        });
                        _a = this.searchInOpenEditors(searchTerm, searchOptions), numberOfResults = _a.numberOfResults, matches = _a.matches;
                        // The root node is visible if outside workspace results are found and workspace root(s) are present.
                        this.forceVisibleRootNode = matches.some(function (m) { return m.root === _this.defaultRootName; }) && this.workspaceService.opened;
                        matches.forEach(function (m) { return _this.appendToResultTree(m); });
                        // Exclude files already covered by searching open editors.
                        this.editorManager.all.forEach(function (e) {
                            var rootUri = _this.workspaceService.getWorkspaceRootUri(e.editor.uri);
                            if (rootUri) {
                                // Exclude pattern beginning with './' works after the fix of #8469.
                                var _a = _this.filenameAndPath(e.editor.uri.toString(), rootUri.toString()), name_1 = _a.name, path = _a.path;
                                var excludePath = path === '' ? './' + name_1 : path + '/' + name_1;
                                searchOptions.exclude = (searchOptions.exclude) ? searchOptions.exclude.concat(excludePath) : [excludePath];
                            }
                        });
                        // Reduce `maxResults` due to editor results.
                        if (searchOptions.maxResults) {
                            searchOptions.maxResults -= numberOfResults;
                        }
                        return [4 /*yield*/, this.searchService.search(searchTerm, {
                                onResult: function (aSearchId, result) {
                                    if (token.isCancellationRequested || aSearchId !== searchId) {
                                        return;
                                    }
                                    _this.appendToResultTree(result);
                                    if (pendingRefreshTimeout) {
                                        clearTimeout(pendingRefreshTimeout);
                                    }
                                    pendingRefreshTimeout = setTimeout(function () { return _this.refreshModelChildren(); }, 100);
                                },
                                onDone: function () {
                                    _this.handleSearchCompleted(cancelIndicator);
                                }
                            }, searchOptions).catch(function () {
                                _this.handleSearchCompleted(cancelIndicator);
                            })];
                    case 2:
                        searchId = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.focusFirstResult = function () {
        if (SearchInWorkspaceRoot.is(this.model.root) && this.model.root.children.length > 0) {
            var node = this.model.root.children[0];
            if (browser_1.SelectableTreeNode.is(node)) {
                this.node.focus();
                this.model.selectNode(node);
            }
        }
    };
    /**
     * Collapse the search-in-workspace file node
     * based on the preference value.
     */
    SearchInWorkspaceResultTreeWidget.prototype.collapseFileNode = function (node, preferenceValue) {
        if (preferenceValue === 'auto' && node.children.length >= 10) {
            node.expanded = false;
        }
        else if (preferenceValue === 'alwaysCollapse') {
            node.expanded = false;
        }
        else if (preferenceValue === 'alwaysExpand') {
            node.expanded = true;
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.handleUp = function (event) {
        if (!this.model.getPrevSelectableNode(this.model.selectedNodes[0])) {
            this.focusInputEmitter.fire(true);
        }
        else {
            _super.prototype.handleUp.call(this, event);
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.refreshModelChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (SearchInWorkspaceRoot.is(this.model.root)) {
                    this.model.root.children = Array.from(this.resultTree.values());
                    this.model.refresh();
                    this.updateCurrentEditorDecorations();
                }
                return [2 /*return*/];
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.updateCurrentEditorDecorations = function () {
        var _this = this;
        this.shell.allTabBars.map(function (tb) {
            var currentTitle = tb.currentTitle;
            if (currentTitle && currentTitle.owner instanceof browser_2.EditorWidget) {
                var widget_1 = currentTitle.owner;
                var fileNodes = _this.getFileNodesByUri(widget_1.editor.uri);
                if (fileNodes.length > 0) {
                    fileNodes.forEach(function (node) {
                        _this.decorateEditor(node, widget_1);
                    });
                }
                else {
                    _this.decorateEditor(undefined, widget_1);
                }
            }
        });
        var currentWidget = this.editorManager.currentEditor;
        if (currentWidget) {
            var fileNodes = this.getFileNodesByUri(currentWidget.editor.uri);
            fileNodes.forEach(function (node) {
                _this.decorateEditor(node, currentWidget);
            });
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.createRootFolderNode = function (rootUri) {
        var uri = new uri_1.default(rootUri);
        return {
            selected: false,
            path: uri.path.toString(),
            folderUri: rootUri,
            children: [],
            expanded: true,
            id: rootUri,
            parent: this.model.root,
            visible: this.forceVisibleRootNode || this.workspaceService.isMultiRootWorkspaceOpened
        };
    };
    SearchInWorkspaceResultTreeWidget.prototype.createFileNode = function (rootUri, path, fileUri, parent) {
        return {
            selected: false,
            path: path,
            children: [],
            expanded: true,
            id: rootUri + "::" + fileUri,
            parent: parent,
            fileUri: fileUri
        };
    };
    SearchInWorkspaceResultTreeWidget.prototype.createResultLineNode = function (result, match, fileNode) {
        return __assign(__assign(__assign({}, result), match), { selected: false, id: result.fileUri + '-' + match.line + '-' + match.character + '-' + match.length, name: typeof match.lineText === 'string' ? match.lineText : match.lineText.text, parent: fileNode });
    };
    SearchInWorkspaceResultTreeWidget.prototype.getFileNodesByUri = function (uri) {
        var e_3, _a, e_4, _b;
        var nodes = [];
        var fileUri = uri.withScheme('file').toString();
        try {
            for (var _c = __values(this.resultTree.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var rootFolderNode = _d.value;
                var rootUri = new uri_1.default(rootFolderNode.path).withScheme('file');
                if (rootUri.isEqualOrParent(uri) || rootFolderNode.id === this.defaultRootName) {
                    try {
                        for (var _e = (e_4 = void 0, __values(rootFolderNode.children)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var fileNode = _f.value;
                            if (fileNode.fileUri === fileUri) {
                                nodes.push(fileNode);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return nodes;
    };
    SearchInWorkspaceResultTreeWidget.prototype.filenameAndPath = function (rootUriStr, uriStr) {
        var uri = new uri_1.default(uriStr);
        var relativePath = new uri_1.default(rootUriStr).relative(uri.parent);
        return {
            name: uri.displayName,
            path: relativePath ? relativePath.toString() : ''
        };
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderCaption = function (node, props) {
        if (SearchInWorkspaceRootFolderNode.is(node)) {
            return this.renderRootFolderNode(node);
        }
        else if (SearchInWorkspaceFileNode.is(node)) {
            return this.renderFileNode(node);
        }
        else if (SearchInWorkspaceResultLineNode.is(node)) {
            return this.renderResultLineNode(node);
        }
        return '';
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderTailDecorations = function (node, props) {
        return React.createElement("div", { className: 'result-node-buttons' },
            this._showReplaceButtons && this.renderReplaceButton(node),
            this.renderRemoveButton(node));
    };
    SearchInWorkspaceResultTreeWidget.prototype.doReplace = function (node, e) {
        this.replace(node);
        e.stopPropagation();
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderReplaceButton = function (node) {
        var _this = this;
        var isResultLineNode = SearchInWorkspaceResultLineNode.is(node);
        return React.createElement("span", { className: isResultLineNode ? 'replace-result' : 'replace-all-result', onClick: function (e) { return _this.doReplace(node, e); }, title: isResultLineNode ? 'Replace' : 'Replace All' });
    };
    SearchInWorkspaceResultTreeWidget.prototype.getFileCount = function (node) {
        var _this = this;
        if (SearchInWorkspaceRoot.is(node)) {
            return node.children.reduce(function (acc, current) { return acc + _this.getFileCount(current); }, 0);
        }
        else if (SearchInWorkspaceRootFolderNode.is(node)) {
            return node.children.length;
        }
        else if (SearchInWorkspaceFileNode.is(node)) {
            return 1;
        }
        return 0;
    };
    SearchInWorkspaceResultTreeWidget.prototype.getResultCount = function (node) {
        var _this = this;
        if (SearchInWorkspaceRoot.is(node)) {
            return node.children.reduce(function (acc, current) { return acc + _this.getResultCount(current); }, 0);
        }
        else if (SearchInWorkspaceRootFolderNode.is(node)) {
            return node.children.reduce(function (acc, current) { return acc + _this.getResultCount(current); }, 0);
        }
        else if (SearchInWorkspaceFileNode.is(node)) {
            return node.children.length;
        }
        else if (SearchInWorkspaceResultLineNode.is(node)) {
            return 1;
        }
        return 0;
    };
    /**
     * Replace results under the node passed into the function. If node is undefined, replace all results.
     * @param node Node in the tree widget where the "replace all" operation is performed
     */
    SearchInWorkspaceResultTreeWidget.prototype.replace = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var replaceForNode, needConfirm, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        replaceForNode = node || this.model.root;
                        needConfirm = !SearchInWorkspaceFileNode.is(node) && !SearchInWorkspaceResultLineNode.is(node);
                        _a = !needConfirm;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.confirmReplaceAll(this.getResultCount(replaceForNode), this.getFileCount(replaceForNode))];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            (node ? [node] : Array.from(this.resultTree.values())).forEach(function (n) {
                                _this.replaceResult(n, !!node);
                                _this.removeNode(n);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.confirmReplaceAll = function (resultNumber, fileNumber) {
        var go = fileNumber > 1;
        return new browser_1.ConfirmDialog({
            title: 'Replace all',
            msg: "Do you really want to replace " + resultNumber + " match" + (resultNumber > 1 ? 'es' : '') + " " + (go ? 'across' : 'in') + " "
                + (fileNumber + " file" + (go ? 's' : '') + " with \"" + this._replaceTerm + "\"?")
        }).open();
    };
    SearchInWorkspaceResultTreeWidget.prototype.updateRightResults = function (node) {
        var fileNode = node.parent;
        var rightPositionedNodes = fileNode.children.filter(function (rl) { return rl.line === node.line && rl.character > node.character; });
        var diff = this._replaceTerm.length - this.searchTerm.length;
        rightPositionedNodes.map(function (r) { return r.character += diff; });
    };
    /**
     * Replace text either in all search matches under a node or in all search matches, and save the changes.
     * @param node - node in the tree widget in which the "replace all" is performed.
     * @param {boolean} replaceOne - whether the function is to replace all matches under a node. If it is false, replace all.
     */
    SearchInWorkspaceResultTreeWidget.prototype.replaceResult = function (node, replaceOne) {
        return __awaiter(this, void 0, void 0, function () {
            var toReplace, trackedEditors, widget, _a, source, replaceOperations;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toReplace = [];
                        if (SearchInWorkspaceRootFolderNode.is(node)) {
                            node.children.forEach(function (fileNode) { return _this.replaceResult(fileNode, replaceOne); });
                        }
                        else if (SearchInWorkspaceFileNode.is(node)) {
                            toReplace.push.apply(toReplace, __spread(node.children));
                        }
                        else if (SearchInWorkspaceResultLineNode.is(node)) {
                            toReplace.push(node);
                            this.updateRightResults(node);
                        }
                        if (!(toReplace.length > 0)) return [3 /*break*/, 7];
                        trackedEditors = this.editorManager.all;
                        if (!replaceOne) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doOpen(toReplace[0])];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.doGetWidget(toReplace[0])];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        widget = _a;
                        source = widget.editor.document.getText();
                        replaceOperations = toReplace.map(function (resultLineNode) { return ({
                            text: _this._replaceTerm,
                            range: {
                                start: {
                                    line: resultLineNode.line - 1,
                                    character: resultLineNode.character - 1
                                },
                                end: {
                                    line: resultLineNode.line - 1,
                                    character: resultLineNode.character - 1 + resultLineNode.length
                                }
                            }
                        }); });
                        // Replace the text.
                        return [4 /*yield*/, widget.editor.replaceText({
                                source: source,
                                replaceOperations: replaceOperations
                            })];
                    case 5:
                        // Replace the text.
                        _b.sent();
                        // Save the text replacement changes in the editor.
                        return [4 /*yield*/, widget.saveable.save()];
                    case 6:
                        // Save the text replacement changes in the editor.
                        _b.sent();
                        // Dispose the widget if it is not opened but created for `replaceAll`.
                        if (!replaceOne) {
                            if (trackedEditors.indexOf(widget) === -1) {
                                widget.dispose();
                            }
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.doRemove = function (node, e) {
        this.removeNode(node);
        e.stopPropagation();
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderRemoveButton = function (node) {
        var _this = this;
        return React.createElement("span", { className: 'remove-node', onClick: function (e) { return _this.remove(node, e); }, title: 'Dismiss' });
    };
    SearchInWorkspaceResultTreeWidget.prototype.removeNode = function (node) {
        if (SearchInWorkspaceRootFolderNode.is(node)) {
            this.removeRootFolderNode(node);
        }
        else if (SearchInWorkspaceFileNode.is(node)) {
            this.removeFileNode(node);
        }
        else if (SearchInWorkspaceResultLineNode.is(node)) {
            this.removeResultLineNode(node);
        }
        this.refreshModelChildren();
    };
    SearchInWorkspaceResultTreeWidget.prototype.removeRootFolderNode = function (node) {
        var e_5, _a;
        try {
            for (var _b = __values(this.resultTree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rootUri = _c.value;
                if (rootUri === node.folderUri) {
                    this.resultTree.delete(rootUri);
                    break;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.removeFileNode = function (node) {
        var rootFolderNode = node.parent;
        var index = rootFolderNode.children.findIndex(function (fileNode) { return fileNode.id === node.id; });
        if (index > -1) {
            rootFolderNode.children.splice(index, 1);
        }
        if (this.getFileCount(rootFolderNode) === 0) {
            this.removeRootFolderNode(rootFolderNode);
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.removeResultLineNode = function (node) {
        var fileNode = node.parent;
        var index = fileNode.children.findIndex(function (n) { return n.fileUri === node.fileUri && n.line === node.line && n.character === node.character; });
        if (index > -1) {
            fileNode.children.splice(index, 1);
            if (this.getResultCount(fileNode) === 0) {
                this.removeFileNode(fileNode);
            }
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderRootFolderNode = function (node) {
        return React.createElement("div", { className: 'result' },
            React.createElement("div", { className: 'result-head' },
                React.createElement("div", { className: "result-head-info noWrapInfo noselect " + (node.selected ? 'selected' : '') },
                    React.createElement("span", { className: "file-icon " + (this.toNodeIcon(node) || '') }),
                    React.createElement("div", { className: 'noWrapInfo' },
                        React.createElement("span", { className: 'file-name' }, this.toNodeName(node)),
                        node.path !== '/' + this.defaultRootName &&
                            React.createElement("span", { className: 'file-path' }, node.path))),
                React.createElement("span", { className: 'notification-count-container highlighted-count-container' },
                    React.createElement("span", { className: 'notification-count' }, this.getFileCount(node)))));
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderFileNode = function (node) {
        return React.createElement("div", { className: 'result' },
            React.createElement("div", { className: 'result-head' },
                React.createElement("div", { className: "result-head-info noWrapInfo noselect " + (node.selected ? 'selected' : ''), title: new uri_1.default(node.fileUri).path.toString() },
                    React.createElement("span", { className: "file-icon " + this.toNodeIcon(node) }),
                    React.createElement("div", { className: 'noWrapInfo' },
                        React.createElement("span", { className: 'file-name' }, this.toNodeName(node)),
                        React.createElement("span", { className: 'file-path' }, node.path))),
                React.createElement("span", { className: 'notification-count-container' },
                    React.createElement("span", { className: 'notification-count' }, this.getResultCount(node)))));
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderResultLineNode = function (node) {
        var before;
        var after;
        var title;
        if (typeof node.lineText === 'string') {
            var prefix = node.character > 26 ? '... ' : '';
            before = prefix + node.lineText.substr(0, node.character - 1).substr(-25);
            after = node.lineText.substr(node.character - 1 + node.length, 75);
            title = node.lineText.trim();
        }
        else {
            before = node.lineText.text.substr(0, node.lineText.character);
            after = node.lineText.text.substr(node.lineText.character + node.length);
            title = node.lineText.text.trim();
        }
        return React.createElement("div", { className: "resultLine noWrapInfo " + (node.selected ? 'selected' : ''), title: title },
            this.searchInWorkspacePreferences['search.lineNumbers'] && React.createElement("span", { className: 'theia-siw-lineNumber' }, node.line),
            React.createElement("span", null, before),
            this.renderMatchLinePart(node),
            React.createElement("span", null, after));
    };
    SearchInWorkspaceResultTreeWidget.prototype.renderMatchLinePart = function (node) {
        var replaceTerm = this._replaceTerm !== '' && this._showReplaceButtons ? React.createElement("span", { className: 'replace-term' }, this._replaceTerm) : '';
        var className = "match" + (this._showReplaceButtons ? ' strike-through' : '');
        var match = typeof node.lineText === 'string' ?
            node.lineText.substr(node.character - 1, node.length)
            : node.lineText.text.substr(node.lineText.character - 1, node.length);
        return React.createElement(React.Fragment, null,
            React.createElement("span", { className: className }, match),
            replaceTerm);
    };
    /**
     * Get the editor widget by the node.
     * @param {SearchInWorkspaceResultLineNode} node - the node representing a match in the search results.
     * @returns The editor widget to which the text replace will be done.
     */
    SearchInWorkspaceResultTreeWidget.prototype.doGetWidget = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUri, editorWidget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileUri = new uri_1.default(node.fileUri);
                        return [4 /*yield*/, this.editorManager.getOrCreateByUri(fileUri)];
                    case 1:
                        editorWidget = _a.sent();
                        return [2 /*return*/, editorWidget];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.doOpen = function (node, preview) {
        if (preview === void 0) { preview = false; }
        return __awaiter(this, void 0, void 0, function () {
            var fileUri, resultNode, leftUri, rightUri, opts, editorWidget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultNode = node.parent;
                        if (!(resultNode && this._showReplaceButtons && preview)) return [3 /*break*/, 2];
                        leftUri = new uri_1.default(node.fileUri);
                        return [4 /*yield*/, this.createReplacePreview(resultNode)];
                    case 1:
                        rightUri = _a.sent();
                        fileUri = browser_1.DiffUris.encode(leftUri, rightUri);
                        return [3 /*break*/, 3];
                    case 2:
                        fileUri = new uri_1.default(node.fileUri);
                        _a.label = 3;
                    case 3:
                        opts = !browser_1.DiffUris.isDiffUri(fileUri) ? {
                            selection: {
                                start: {
                                    line: node.line - 1,
                                    character: node.character - 1
                                },
                                end: {
                                    line: node.line - 1,
                                    character: node.character - 1 + node.length
                                }
                            },
                            mode: 'reveal'
                        } : undefined;
                        return [4 /*yield*/, this.editorManager.open(fileUri, opts)];
                    case 4:
                        editorWidget = _a.sent();
                        if (!browser_1.DiffUris.isDiffUri(fileUri)) {
                            this.decorateEditor(resultNode, editorWidget);
                        }
                        return [2 /*return*/, editorWidget];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.createReplacePreview = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUri, openedEditor, content, resource, lines;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileUri = new uri_1.default(node.fileUri).withScheme('file');
                        openedEditor = this.editorManager.all.find(function (_a) {
                            var editor = _a.editor;
                            return editor.uri.toString() === fileUri.toString();
                        });
                        if (!openedEditor) return [3 /*break*/, 1];
                        content = openedEditor.editor.document.getText();
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.fileResourceResolver.resolve(fileUri)];
                    case 2:
                        resource = _a.sent();
                        return [4 /*yield*/, resource.readContents()];
                    case 3:
                        content = _a.sent();
                        _a.label = 4;
                    case 4:
                        lines = content.split('\n');
                        node.children.map(function (l) {
                            var leftPositionedNodes = node.children.filter(function (rl) { return rl.line === l.line && rl.character < l.character; });
                            var diff = (_this._replaceTerm.length - _this.searchTerm.length) * leftPositionedNodes.length;
                            var start = lines[l.line - 1].substr(0, l.character - 1 + diff);
                            var end = lines[l.line - 1].substr(l.character - 1 + diff + l.length);
                            lines[l.line - 1] = start + _this._replaceTerm + end;
                        });
                        return [2 /*return*/, fileUri.withScheme(in_memory_text_resource_1.MEMORY_TEXT).withQuery(lines.join('\n'))];
                }
            });
        });
    };
    SearchInWorkspaceResultTreeWidget.prototype.decorateEditor = function (node, editorWidget) {
        if (!browser_1.DiffUris.isDiffUri(editorWidget.editor.uri)) {
            var key = editorWidget.editor.uri.toString() + "#search-in-workspace-matches";
            var oldDecorations = this.appliedDecorations.get(key) || [];
            var newDecorations = this.createEditorDecorations(node);
            var appliedDecorations = editorWidget.editor.deltaDecorations({
                newDecorations: newDecorations,
                oldDecorations: oldDecorations,
            });
            this.appliedDecorations.set(key, appliedDecorations);
        }
    };
    SearchInWorkspaceResultTreeWidget.prototype.createEditorDecorations = function (resultNode) {
        var decorations = [];
        if (resultNode) {
            resultNode.children.map(function (res) {
                decorations.push({
                    range: {
                        start: {
                            line: res.line - 1,
                            character: res.character - 1
                        },
                        end: {
                            line: res.line - 1,
                            character: res.character - 1 + res.length
                        }
                    },
                    options: {
                        overviewRuler: {
                            color: {
                                id: 'editor.findMatchHighlightBackground'
                            },
                            position: browser_2.OverviewRulerLane.Center
                        },
                        className: res.selected ? 'current-search-in-workspace-editor-match' : 'search-in-workspace-editor-match',
                        stickiness: browser_2.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore
                    }
                });
            });
        }
        return decorations;
    };
    /**
     * Get the list of exclude globs.
     * @param excludeOptions the exclude search option.
     *
     * @returns the list of exclude globs.
     */
    SearchInWorkspaceResultTreeWidget.prototype.getExcludeGlobs = function (excludeOptions) {
        var excludePreferences = this.filesystemPreferences['files.exclude'];
        var excludePreferencesGlobs = Object.keys(excludePreferences).filter(function (key) { return !!excludePreferences[key]; });
        return __spread(new Set(__spread(excludePreferencesGlobs, excludeOptions)));
    };
    /**
     * Compare two normalized strings.
     *
     * @param a {string} the first string.
     * @param b {string} the second string.
     */
    SearchInWorkspaceResultTreeWidget.prototype.compare = function (a, b) {
        var itemA = a.toLowerCase().trim();
        var itemB = b.toLowerCase().trim();
        return itemA.localeCompare(itemB);
    };
    __decorate([
        inversify_1.inject(search_in_workspace_service_1.SearchInWorkspaceService),
        __metadata("design:type", search_in_workspace_service_1.SearchInWorkspaceService)
    ], SearchInWorkspaceResultTreeWidget.prototype, "searchService", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], SearchInWorkspaceResultTreeWidget.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_4.FileResourceResolver),
        __metadata("design:type", browser_4.FileResourceResolver)
    ], SearchInWorkspaceResultTreeWidget.prototype, "fileResourceResolver", void 0);
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], SearchInWorkspaceResultTreeWidget.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(browser_3.WorkspaceService),
        __metadata("design:type", browser_3.WorkspaceService)
    ], SearchInWorkspaceResultTreeWidget.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(browser_1.TreeExpansionService),
        __metadata("design:type", Object)
    ], SearchInWorkspaceResultTreeWidget.prototype, "expansionService", void 0);
    __decorate([
        inversify_1.inject(search_in_workspace_preferences_1.SearchInWorkspacePreferences),
        __metadata("design:type", Object)
    ], SearchInWorkspaceResultTreeWidget.prototype, "searchInWorkspacePreferences", void 0);
    __decorate([
        inversify_1.inject(core_2.ProgressService),
        __metadata("design:type", core_2.ProgressService)
    ], SearchInWorkspaceResultTreeWidget.prototype, "progressService", void 0);
    __decorate([
        inversify_1.inject(color_registry_1.ColorRegistry),
        __metadata("design:type", color_registry_1.ColorRegistry)
    ], SearchInWorkspaceResultTreeWidget.prototype, "colorRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_4.FileSystemPreferences),
        __metadata("design:type", Object)
    ], SearchInWorkspaceResultTreeWidget.prototype, "filesystemPreferences", void 0);
    __decorate([
        inversify_1.inject(file_service_1.FileService),
        __metadata("design:type", file_service_1.FileService)
    ], SearchInWorkspaceResultTreeWidget.prototype, "fileService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SearchInWorkspaceResultTreeWidget.prototype, "init", null);
    SearchInWorkspaceResultTreeWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(browser_1.TreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, Object, browser_1.ContextMenuRenderer])
    ], SearchInWorkspaceResultTreeWidget);
    return SearchInWorkspaceResultTreeWidget;
}(browser_1.TreeWidget));
exports.SearchInWorkspaceResultTreeWidget = SearchInWorkspaceResultTreeWidget;
//# sourceMappingURL=search-in-workspace-result-tree-widget.js.map