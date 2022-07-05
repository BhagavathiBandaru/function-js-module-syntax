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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemUtils = void 0;
var ProblemUtils;
(function (ProblemUtils) {
    /**
     * Comparator for severity.
     * - The highest severity (`error`) come first followed by others.
     * - `undefined` severities are treated as the last ones.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.severityCompare = function (a, b) {
        return (a.data.severity || Number.MAX_SAFE_INTEGER) - (b.data.severity || Number.MAX_SAFE_INTEGER);
    };
    /**
     * Comparator for line numbers.
     * - The lowest line number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.lineNumberCompare = function (a, b) { return a.data.range.start.line - b.data.range.start.line; };
    /**
     * Comparator for column numbers.
     * - The lowest column number comes first.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.columnNumberCompare = function (a, b) { return a.data.range.start.character - b.data.range.start.character; };
    /**
     * Comparator for marker owner (source).
     * - The order is alphabetical.
     * @param a the first marker for comparison.
     * @param b the second marker for comparison.
     */
    ProblemUtils.ownerCompare = function (a, b) { return a.owner.localeCompare(b.owner); };
})(ProblemUtils = exports.ProblemUtils || (exports.ProblemUtils = {}));
//# sourceMappingURL=problem-utils.js.map