"use strict";
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolToMonacoConverter = void 0;
var inversify_1 = require("inversify");
var ProtocolToMonacoConverter = /** @class */ (function () {
    function ProtocolToMonacoConverter() {
    }
    ProtocolToMonacoConverter.prototype.asRange = function (range) {
        if (range === undefined) {
            return undefined;
        }
        var start = this.asPosition(range.start);
        var end = this.asPosition(range.end);
        if (start instanceof monaco.Position && end instanceof monaco.Position) {
            return new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column);
        }
        var startLineNumber = !start || start.lineNumber === undefined ? undefined : start.lineNumber;
        var startColumn = !start || start.column === undefined ? undefined : start.column;
        var endLineNumber = !end || end.lineNumber === undefined ? undefined : end.lineNumber;
        var endColumn = !end || end.column === undefined ? undefined : end.column;
        return { startLineNumber: startLineNumber, startColumn: startColumn, endLineNumber: endLineNumber, endColumn: endColumn };
    };
    ProtocolToMonacoConverter.prototype.asPosition = function (position) {
        if (position === undefined) {
            return undefined;
        }
        var line = position.line, character = position.character;
        var lineNumber = line === undefined ? undefined : line + 1;
        var column = character === undefined ? undefined : character + 1;
        if (lineNumber !== undefined && column !== undefined) {
            return new monaco.Position(lineNumber, column);
        }
        return { lineNumber: lineNumber, column: column };
    };
    ProtocolToMonacoConverter.prototype.asLocation = function (item) {
        if (!item) {
            return undefined;
        }
        var uri = monaco.Uri.parse(item.uri);
        var range = this.asRange(item.range);
        return {
            uri: uri, range: range
        };
    };
    ProtocolToMonacoConverter.prototype.asTextEdit = function (edit) {
        if (!edit) {
            return undefined;
        }
        var range = this.asRange(edit.range);
        return {
            range: range,
            text: edit.newText
        };
    };
    ProtocolToMonacoConverter.prototype.asTextEdits = function (items) {
        var _this = this;
        if (!items) {
            return undefined;
        }
        return items.map(function (item) { return _this.asTextEdit(item); });
    };
    ProtocolToMonacoConverter.prototype.asSeverity = function (severity) {
        if (severity === 1) {
            return monaco.MarkerSeverity.Error;
        }
        if (severity === 2) {
            return monaco.MarkerSeverity.Warning;
        }
        if (severity === 3) {
            return monaco.MarkerSeverity.Info;
        }
        return monaco.MarkerSeverity.Hint;
    };
    ProtocolToMonacoConverter.prototype.asDiagnostics = function (diagnostics) {
        var _this = this;
        if (!diagnostics) {
            return undefined;
        }
        return diagnostics.map(function (diagnostic) { return _this.asDiagnostic(diagnostic); });
    };
    ProtocolToMonacoConverter.prototype.asDiagnostic = function (diagnostic) {
        return {
            code: typeof diagnostic.code === 'number' ? diagnostic.code.toString() : diagnostic.code,
            severity: this.asSeverity(diagnostic.severity),
            message: diagnostic.message,
            source: diagnostic.source,
            startLineNumber: diagnostic.range.start.line + 1,
            startColumn: diagnostic.range.start.character + 1,
            endLineNumber: diagnostic.range.end.line + 1,
            endColumn: diagnostic.range.end.character + 1,
            relatedInformation: this.asRelatedInformations(diagnostic.relatedInformation)
        };
    };
    ProtocolToMonacoConverter.prototype.asRelatedInformations = function (relatedInformation) {
        var _this = this;
        if (!relatedInformation) {
            return undefined;
        }
        return relatedInformation.map(function (item) { return _this.asRelatedInformation(item); });
    };
    ProtocolToMonacoConverter.prototype.asRelatedInformation = function (relatedInformation) {
        return {
            resource: monaco.Uri.parse(relatedInformation.location.uri),
            startLineNumber: relatedInformation.location.range.start.line + 1,
            startColumn: relatedInformation.location.range.start.character + 1,
            endLineNumber: relatedInformation.location.range.end.line + 1,
            endColumn: relatedInformation.location.range.end.character + 1,
            message: relatedInformation.message
        };
    };
    ProtocolToMonacoConverter = __decorate([
        inversify_1.injectable()
    ], ProtocolToMonacoConverter);
    return ProtocolToMonacoConverter;
}());
exports.ProtocolToMonacoConverter = ProtocolToMonacoConverter;
//# sourceMappingURL=protocol-to-monaco-converter.js.map