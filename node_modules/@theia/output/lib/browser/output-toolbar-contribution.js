"use strict";
/********************************************************************************
 * Copyright (C) 2019 Arm and others.
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputToolbarContribution = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var output_widget_1 = require("./output-widget");
var output_commands_1 = require("./output-commands");
var output_contribution_1 = require("./output-contribution");
var output_channel_1 = require("../common/output-channel");
var OutputToolbarContribution = /** @class */ (function () {
    function OutputToolbarContribution() {
        var _this = this;
        this.onOutputWidgetStateChangedEmitter = new event_1.Emitter();
        this.onOutputWidgetStateChanged = this.onOutputWidgetStateChangedEmitter.event;
        this.onChannelsChangedEmitter = new event_1.Emitter();
        this.onChannelsChanged = this.onChannelsChangedEmitter.event;
        this.NONE = '<no channels>';
        this.changeChannel = function (event) {
            var channelName = event.target.value;
            if (channelName !== _this.NONE) {
                _this.outputChannelManager.getChannel(channelName).show();
            }
        };
    }
    OutputToolbarContribution.prototype.init = function () {
        var _this = this;
        this.outputContribution.widget.then(function (widget) {
            widget.onStateChanged(function () { return _this.onOutputWidgetStateChangedEmitter.fire(); });
        });
        var fireChannelsChanged = function () { return _this.onChannelsChangedEmitter.fire(); };
        this.outputChannelManager.onSelectedChannelChanged(fireChannelsChanged);
        this.outputChannelManager.onChannelAdded(fireChannelsChanged);
        this.outputChannelManager.onChannelDeleted(fireChannelsChanged);
        this.outputChannelManager.onChannelWasShown(fireChannelsChanged);
        this.outputChannelManager.onChannelWasHidden(fireChannelsChanged);
    };
    OutputToolbarContribution.prototype.registerToolbarItems = function (toolbarRegistry) {
        var _this = this;
        toolbarRegistry.registerItem({
            id: 'channels',
            render: function () { return _this.renderChannelSelector(); },
            isVisible: function (widget) { return widget instanceof output_widget_1.OutputWidget; },
            onDidChange: this.onChannelsChanged
        });
        toolbarRegistry.registerItem({
            id: output_commands_1.OutputCommands.CLEAR__WIDGET.id,
            command: output_commands_1.OutputCommands.CLEAR__WIDGET.id,
            tooltip: 'Clear Output',
            priority: 1,
        });
        toolbarRegistry.registerItem({
            id: output_commands_1.OutputCommands.LOCK__WIDGET.id,
            command: output_commands_1.OutputCommands.LOCK__WIDGET.id,
            tooltip: 'Turn Auto Scrolling Off',
            onDidChange: this.onOutputWidgetStateChanged,
            priority: 2
        });
        toolbarRegistry.registerItem({
            id: output_commands_1.OutputCommands.UNLOCK__WIDGET.id,
            command: output_commands_1.OutputCommands.UNLOCK__WIDGET.id,
            tooltip: 'Turn Auto Scrolling On',
            onDidChange: this.onOutputWidgetStateChanged,
            priority: 2
        });
    };
    OutputToolbarContribution.prototype.renderChannelSelector = function () {
        var channelOptionElements = [];
        this.outputChannelManager.getVisibleChannels().forEach(function (channel) {
            channelOptionElements.push(React.createElement("option", { value: channel.name, key: channel.name }, channel.name));
        });
        if (channelOptionElements.length === 0) {
            channelOptionElements.push(React.createElement("option", { key: this.NONE, value: this.NONE }, this.NONE));
        }
        return React.createElement("select", { className: 'theia-select', id: 'outputChannelList', key: 'outputChannelList', value: this.outputChannelManager.selectedChannel ? this.outputChannelManager.selectedChannel.name : this.NONE, onChange: this.changeChannel }, channelOptionElements);
    };
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], OutputToolbarContribution.prototype, "outputChannelManager", void 0);
    __decorate([
        inversify_1.inject(output_contribution_1.OutputContribution),
        __metadata("design:type", output_contribution_1.OutputContribution)
    ], OutputToolbarContribution.prototype, "outputContribution", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OutputToolbarContribution.prototype, "init", null);
    OutputToolbarContribution = __decorate([
        inversify_1.injectable()
    ], OutputToolbarContribution);
    return OutputToolbarContribution;
}());
exports.OutputToolbarContribution = OutputToolbarContribution;
//# sourceMappingURL=output-toolbar-contribution.js.map