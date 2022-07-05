/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './codicon/codicon.css';
import './codicon/codicon-animations.css';
import { escape } from '../../../common/strings';
import { renderCodicons } from '../../../common/codicons';
var CodiconLabel = /** @class */ (function () {
    function CodiconLabel(_container) {
        this._container = _container;
    }
    Object.defineProperty(CodiconLabel.prototype, "text", {
        set: function (text) {
            this._container.innerHTML = renderCodicons(escape(text !== null && text !== void 0 ? text : ''));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodiconLabel.prototype, "title", {
        set: function (title) {
            this._container.title = title;
        },
        enumerable: true,
        configurable: true
    });
    return CodiconLabel;
}());
export { CodiconLabel };
