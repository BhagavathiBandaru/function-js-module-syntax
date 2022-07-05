"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.LabelServiceMainImpl = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
var LabelServiceMainImpl = /** @class */ (function () {
    function LabelServiceMainImpl(container) {
        this.resourceLabelFormatters = new Map();
        this.contributionProvider = container.getNamed(common_1.ContributionProvider, browser_1.LabelProviderContribution);
    }
    LabelServiceMainImpl.prototype.$registerResourceLabelFormatter = function (handle, formatter) {
        var e_1, _a;
        // Dynamically registered formatters should have priority over those contributed via package.json
        formatter.priority = true;
        var disposables = new disposable_1.DisposableCollection();
        try {
            for (var _b = __values(this.contributionProvider.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                if (contribution instanceof browser_1.DefaultUriLabelProviderContribution) {
                    disposables.push(contribution.registerFormatter(formatter));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.resourceLabelFormatters.set(handle, disposables);
    };
    LabelServiceMainImpl.prototype.$unregisterResourceLabelFormatter = function (handle) {
        var toDispose = this.resourceLabelFormatters.get(handle);
        if (toDispose) {
            toDispose.dispose();
        }
        this.resourceLabelFormatters.delete(handle);
    };
    return LabelServiceMainImpl;
}());
exports.LabelServiceMainImpl = LabelServiceMainImpl;
//# sourceMappingURL=label-service-main.js.map