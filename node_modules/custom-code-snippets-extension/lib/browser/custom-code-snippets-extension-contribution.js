"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCodeSnippetsExtensionContribution = void 0;
var inversify_1 = require("inversify");
var file_service_1 = require("@theia/filesystem/lib/browser/file-service");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var monaco_snippet_suggest_provider_1 = require("@theia/monaco/lib/browser/monaco-snippet-suggest-provider");
var common_1 = require("../common");
var CustomCodeSnippetsExtensionContribution = /** @class */ (function () {
    function CustomCodeSnippetsExtensionContribution(fileSystemWatcher, workspaceService, customCodeSnippetsServer, monacoSnippetSuggestProvider) {
        this.fileSystemWatcher = fileSystemWatcher;
        this.workspaceService = workspaceService;
        this.customCodeSnippetsServer = customCodeSnippetsServer;
        this.monacoSnippetSuggestProvider = monacoSnippetSuggestProvider;
    }
    CustomCodeSnippetsExtensionContribution.prototype.onStart = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentWorkspacePath, workspaceTheiaPath, projectCodeSnippetsFolders, codeSnippetsFolders;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentWorkspacePath = (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.path.toString();
                        projectCodeSnippetsFolders = [];
                        if (!currentWorkspacePath) return [3 /*break*/, 2];
                        workspaceTheiaPath = currentWorkspacePath + "/.theia";
                        return [4 /*yield*/, this.customCodeSnippetsServer.getFilesInWorkspaceTheiaFolder(workspaceTheiaPath)];
                    case 1:
                        projectCodeSnippetsFolders = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.customCodeSnippetsServer.getFilesInGlobalTheiaFolder()];
                    case 3:
                        codeSnippetsFolders = _b.sent();
                        codeSnippetsFolders.forEach(function (element) {
                            var fileName = element.split('.');
                            _this.monacoSnippetSuggestProvider.fromURI(common_1.globalTheiaPath + "/" + element, { language: fileName[0], source: fileName + " Language Basics" });
                        });
                        projectCodeSnippetsFolders.forEach(function (element) {
                            var fileName = element.split('.');
                            _this.monacoSnippetSuggestProvider.fromURI(workspaceTheiaPath + "/" + element, { language: fileName[0], source: fileName + " Language Basics" });
                        });
                        this.fileSystemWatcher.onDidFilesChange(function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var fileName;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                fileName = (_a = event.changes[0]) === null || _a === void 0 ? void 0 : _a.resource.path.base.split(".");
                                if (fileName[1] === common_1.fileExtenion) {
                                    this.monacoSnippetSuggestProvider.fromURI("" + ((_b = event.changes[0]) === null || _b === void 0 ? void 0 : _b.resource.path), { language: fileName[0], source: fileName + " Language Basics" });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomCodeSnippetsExtensionContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(file_service_1.FileService)),
        __param(1, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __param(2, inversify_1.inject(common_1.CustomCodeSnippetsContribution)),
        __param(3, inversify_1.inject(monaco_snippet_suggest_provider_1.MonacoSnippetSuggestProvider)),
        __metadata("design:paramtypes", [file_service_1.FileService,
            workspace_service_1.WorkspaceService, Object, monaco_snippet_suggest_provider_1.MonacoSnippetSuggestProvider])
    ], CustomCodeSnippetsExtensionContribution);
    return CustomCodeSnippetsExtensionContribution;
}());
exports.CustomCodeSnippetsExtensionContribution = CustomCodeSnippetsExtensionContribution;
//# sourceMappingURL=custom-code-snippets-extension-contribution.js.map