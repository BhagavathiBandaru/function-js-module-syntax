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
exports.LocationListRenderer = void 0;
var uri_1 = require("@theia/core/lib/common/uri");
var react_renderer_1 = require("@theia/core/lib/browser/widgets/react-renderer");
var React = require("react");
var ReactDOM = require("react-dom");
var common_1 = require("@theia/core/lib/common");
var ResolvedDirectoryCache = /** @class */ (function () {
    function ResolvedDirectoryCache(fileService) {
        this.fileService = fileService;
        this.pendingResolvedDirectories = new Map();
        this.cachedDirectories = new Map();
        this.directoryResolvedEmitter = new common_1.Emitter();
        this.onDirectoryDidResolve = this.directoryResolvedEmitter.event;
    }
    ResolvedDirectoryCache.prototype.tryResolveChildDirectories = function (inputAsURI) {
        var parentDirectory = inputAsURI.path.dir.toString();
        var cachedDirectories = this.cachedDirectories.get(parentDirectory);
        var pendingDirectories = this.pendingResolvedDirectories.get(parentDirectory);
        if (cachedDirectories) {
            return cachedDirectories;
        }
        else if (!pendingDirectories) {
            this.pendingResolvedDirectories.set(parentDirectory, this.createResolutionPromise(parentDirectory));
        }
        return undefined;
    };
    ResolvedDirectoryCache.prototype.createResolutionPromise = function (directoryToResolve) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.resolve(new uri_1.default(directoryToResolve)).then(function (_a) {
                        var children = _a.children;
                        if (children) {
                            var childDirectories = children.filter(function (child) { return child.isDirectory; })
                                .map(function (directory) { return directory.resource.path + "/"; });
                            _this.cachedDirectories.set(directoryToResolve, childDirectories);
                            _this.directoryResolvedEmitter.fire({ parent: directoryToResolve, children: childDirectories });
                        }
                    }).catch(function (e) {
                        // no-op
                    })];
            });
        });
    };
    return ResolvedDirectoryCache;
}());
var LocationListRenderer = /** @class */ (function (_super) {
    __extends(LocationListRenderer, _super);
    function LocationListRenderer(service, fileService, host) {
        var _this = _super.call(this, host) || this;
        _this.service = service;
        _this.fileService = fileService;
        _this.toDisposeOnNewCache = new common_1.DisposableCollection();
        _this._doShowTextInput = false;
        _this.doAttemptAutocomplete = true;
        _this.doAfterRender = function () {
            var locationList = _this.locationList;
            var locationListTextInput = _this.locationTextInput;
            if (locationList) {
                var currentLocation = _this.service.location;
                locationList.value = currentLocation ? currentLocation.toString() : '';
            }
            else if (locationListTextInput) {
                locationListTextInput.focus();
            }
        };
        _this.handleLocationChanged = function (e) { return _this.onLocationChanged(e); };
        _this.handleTextInputOnChange = function (e) { return _this.trySuggestDirectory(e); };
        _this.handleTextInputKeyDown = function (e) { return _this.handleControlKeys(e); };
        _this.handleIconKeyDown = function (e) { return _this.toggleInputOnKeyDown(e); };
        _this.handleTextInputOnBlur = function () { return _this.toggleToSelectInput(); };
        _this.handleTextInputMouseDown = function (e) { return _this.toggleToTextInputOnMouseDown(e); };
        _this.doLoadDrives();
        return _this;
    }
    Object.defineProperty(LocationListRenderer.prototype, "doShowTextInput", {
        get: function () {
            return this._doShowTextInput;
        },
        set: function (doShow) {
            this._doShowTextInput = doShow;
            if (doShow) {
                this.initResolveDirectoryCache();
            }
        },
        enumerable: false,
        configurable: true
    });
    LocationListRenderer.prototype.render = function () {
        ReactDOM.render(this.doRender(), this.host, this.doAfterRender);
    };
    LocationListRenderer.prototype.initResolveDirectoryCache = function () {
        var _this = this;
        this.toDisposeOnNewCache.dispose();
        this.directoryCache = new ResolvedDirectoryCache(this.fileService);
        this.toDisposeOnNewCache.push(this.directoryCache.onDirectoryDidResolve(function (_a) {
            var parent = _a.parent, children = _a.children;
            if (_this.locationTextInput) {
                var inputParent = (new uri_1.default(_this.locationTextInput.value)).path.dir.toString();
                if (inputParent === parent) {
                    _this.tryRenderFirstMatch(_this.locationTextInput, children);
                }
            }
        }));
    };
    LocationListRenderer.prototype.doRender = function () {
        return (React.createElement(React.Fragment, null,
            this.renderInputIcon(),
            this.doShowTextInput
                ? this.renderTextInput()
                : this.renderSelectInput()));
    };
    LocationListRenderer.prototype.renderInputIcon = function () {
        return (React.createElement("span", { 
            // onMouseDown is used since it will fire before 'onBlur'. This prevents
            // a re-render when textinput is in focus and user clicks toggle icon
            onMouseDown: this.handleTextInputMouseDown, onKeyDown: this.handleIconKeyDown, className: LocationListRenderer.Styles.LOCATION_INPUT_TOGGLE_CLASS, tabIndex: 0, id: "" + (this.doShowTextInput ? 'text-input' : 'select-input'), title: this.doShowTextInput
                ? LocationListRenderer.Tooltips.TOGGLE_SELECT_INPUT
                : LocationListRenderer.Tooltips.TOGGLE_TEXT_INPUT },
            React.createElement("i", { className: this.doShowTextInput ? 'fa fa-folder-open' : 'fa fa-edit' })));
    };
    LocationListRenderer.prototype.renderTextInput = function () {
        var _a;
        return (React.createElement("input", { className: 'theia-select ' + LocationListRenderer.Styles.LOCATION_TEXT_INPUT_CLASS, defaultValue: (_a = this.service.location) === null || _a === void 0 ? void 0 : _a.path.toString(), onBlur: this.handleTextInputOnBlur, onChange: this.handleTextInputOnChange, onKeyDown: this.handleTextInputKeyDown, spellCheck: false }));
    };
    LocationListRenderer.prototype.renderSelectInput = function () {
        var _this = this;
        var options = this.collectLocations().map(function (value) { return _this.renderLocation(value); });
        return (React.createElement("select", { className: "theia-select " + LocationListRenderer.Styles.LOCATION_LIST_CLASS, onChange: this.handleLocationChanged }, options));
    };
    LocationListRenderer.prototype.toggleInputOnKeyDown = function (e) {
        if (e.key === 'Enter') {
            this.doShowTextInput = true;
            this.render();
        }
    };
    LocationListRenderer.prototype.toggleToTextInputOnMouseDown = function (e) {
        if (e.currentTarget.id === 'select-input') {
            e.preventDefault();
            this.doShowTextInput = true;
            this.render();
        }
    };
    LocationListRenderer.prototype.toggleToSelectInput = function () {
        if (this.doShowTextInput) {
            this.doShowTextInput = false;
            this.render();
        }
    };
    /**
     * Collects the available locations based on the currently selected, and appends the available drives to it.
     */
    LocationListRenderer.prototype.collectLocations = function () {
        var location = this.service.location;
        var locations = (!!location ? location.allLocations : []).map(function (uri) { return ({ uri: uri }); });
        if (this._drives) {
            var drives = this._drives.map(function (uri) { return ({ uri: uri, isDrive: true }); });
            // `URI.allLocations` returns with the URI without the trailing slash unlike `FileUri.create(fsPath)`.
            // to be able to compare file:///path/to/resource with file:///path/to/resource/.
            var toUriString_1 = function (uri) {
                var toString = uri.toString();
                return toString.endsWith('/') ? toString.slice(0, -1) : toString;
            };
            drives.forEach(function (drive) {
                var index = locations.findIndex(function (loc) { return toUriString_1(loc.uri) === toUriString_1(drive.uri); });
                // Ignore drives which are already discovered as a location based on the current model root URI.
                if (index === -1) {
                    // Make sure, it does not have the trailing slash.
                    locations.push({ uri: new uri_1.default(toUriString_1(drive.uri)), isDrive: true });
                }
                else {
                    // This is necessary for Windows to be able to show `/e:/` as a drive and `c:` as "non-drive" in the same way.
                    // `URI.path.toString()` Vs. `URI.displayName` behaves a bit differently on Windows.
                    // https://github.com/eclipse-theia/theia/pull/3038#issuecomment-425944189
                    locations[index].isDrive = true;
                }
            });
        }
        this.doLoadDrives();
        return locations;
    };
    /**
     * Asynchronously loads the drives (if not yet available) and triggers a UI update on success with the new values.
     */
    LocationListRenderer.prototype.doLoadDrives = function () {
        var _this = this;
        if (!this._drives) {
            this.service.drives().then(function (drives) {
                // If the `drives` are empty, something already went wrong.
                if (drives.length > 0) {
                    _this._drives = drives;
                    _this.render();
                }
            });
        }
    };
    LocationListRenderer.prototype.renderLocation = function (location) {
        var uri = location.uri, isDrive = location.isDrive;
        var value = uri.toString();
        return React.createElement("option", { value: value, key: uri.toString() }, isDrive ? uri.path.toString() : uri.displayName);
    };
    LocationListRenderer.prototype.onLocationChanged = function (e) {
        var locationList = this.locationList;
        if (locationList) {
            var value = locationList.value;
            var uri = new uri_1.default(value);
            this.trySetNewLocation(uri);
            e.preventDefault();
            e.stopPropagation();
        }
    };
    LocationListRenderer.prototype.trySetNewLocation = function (newLocation) {
        var _a;
        if (this.lastUniqueTextInputLocation === undefined) {
            this.lastUniqueTextInputLocation = this.service.location;
        }
        // prevent consecutive repeated locations from being added to location history
        if (((_a = this.lastUniqueTextInputLocation) === null || _a === void 0 ? void 0 : _a.path.toString()) !== newLocation.path.toString()) {
            this.lastUniqueTextInputLocation = newLocation;
            this.service.location = newLocation;
        }
    };
    LocationListRenderer.prototype.trySuggestDirectory = function (e) {
        if (this.doAttemptAutocomplete) {
            var inputElement = e.currentTarget;
            var value = inputElement.value;
            if (value.slice(-1) !== '/') {
                var valueAsURI = new uri_1.default(value);
                var autocompleteDirectories = this.directoryCache.tryResolveChildDirectories(valueAsURI);
                if (autocompleteDirectories) {
                    this.tryRenderFirstMatch(inputElement, autocompleteDirectories);
                }
            }
        }
    };
    LocationListRenderer.prototype.tryRenderFirstMatch = function (inputElement, children) {
        var value = inputElement.value, selectionStart = inputElement.selectionStart;
        if (this.locationTextInput) {
            var firstMatch = children === null || children === void 0 ? void 0 : children.find(function (child) { return child.includes(value); });
            if (firstMatch) {
                this.locationTextInput.value = firstMatch;
                this.locationTextInput.selectionStart = selectionStart;
                this.locationTextInput.selectionEnd = firstMatch.length;
            }
        }
    };
    LocationListRenderer.prototype.handleControlKeys = function (e) {
        this.doAttemptAutocomplete = e.key !== 'Backspace';
        if (e.key === 'Enter') {
            var locationTextInput = this.locationTextInput;
            if (locationTextInput) {
                // remove extra whitespace and any trailing slashes or periods.
                var sanitizedInput = locationTextInput.value.trim().replace(/[\/\\.]*$/, '');
                var uri = new uri_1.default(sanitizedInput);
                this.trySetNewLocation(uri);
                this.toggleToSelectInput();
            }
        }
        else if (e.key === 'Escape') {
            this.toggleToSelectInput();
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            var textInput = this.locationTextInput;
            if (textInput) {
                textInput.selectionStart = textInput.value.length;
            }
        }
        e.stopPropagation();
    };
    Object.defineProperty(LocationListRenderer.prototype, "locationList", {
        get: function () {
            var locationList = this.host.getElementsByClassName(LocationListRenderer.Styles.LOCATION_LIST_CLASS)[0];
            if (locationList instanceof HTMLSelectElement) {
                return locationList;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocationListRenderer.prototype, "locationTextInput", {
        get: function () {
            var locationTextInput = this.host.getElementsByClassName(LocationListRenderer.Styles.LOCATION_TEXT_INPUT_CLASS)[0];
            if (locationTextInput instanceof HTMLInputElement) {
                return locationTextInput;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    LocationListRenderer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.toDisposeOnNewCache.dispose();
    };
    return LocationListRenderer;
}(react_renderer_1.ReactRenderer));
exports.LocationListRenderer = LocationListRenderer;
(function (LocationListRenderer) {
    var Styles;
    (function (Styles) {
        Styles.LOCATION_LIST_CLASS = 'theia-LocationList';
        Styles.LOCATION_INPUT_TOGGLE_CLASS = 'theia-LocationInputToggle';
        Styles.LOCATION_TEXT_INPUT_CLASS = 'theia-LocationTextInput';
    })(Styles = LocationListRenderer.Styles || (LocationListRenderer.Styles = {}));
    var Tooltips;
    (function (Tooltips) {
        Tooltips.TOGGLE_TEXT_INPUT = 'Switch to text-based input';
        Tooltips.TOGGLE_SELECT_INPUT = 'Switch to location list';
    })(Tooltips = LocationListRenderer.Tooltips || (LocationListRenderer.Tooltips = {}));
})(LocationListRenderer = exports.LocationListRenderer || (exports.LocationListRenderer = {}));
exports.LocationListRenderer = LocationListRenderer;
//# sourceMappingURL=location-renderer.js.map