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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
exports.transform = exports.toReadable = exports.toStream = exports.consumeStreamWithLimit = exports.peekStream = exports.consumeStream = exports.peekReadable = exports.consumeReadableWithLimit = exports.consumeReadable = exports.newWriteableStream = exports.isReadableBufferedStream = exports.isReadableStream = exports.Readable = void 0;
// based on https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/base/common/stream.ts
/* eslint-disable max-len */
/* eslint-disable no-null/no-null */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/no-explicit-any */
var disposable_1 = require("./disposable");
var Readable;
(function (Readable) {
    function fromString(value) {
        var done = false;
        return {
            read: function () {
                if (!done) {
                    done = true;
                    return value;
                }
                return null;
            }
        };
    }
    Readable.fromString = fromString;
    function toString(readable) {
        var result = '';
        var chunk;
        while ((chunk = readable.read()) != null) {
            result += chunk;
        }
        return result;
    }
    Readable.toString = toString;
})(Readable = exports.Readable || (exports.Readable = {}));
function isReadableStream(obj) {
    var candidate = obj;
    return candidate && [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(function (fn) { return typeof fn === 'function'; });
}
exports.isReadableStream = isReadableStream;
function isReadableBufferedStream(obj) {
    var candidate = obj;
    return candidate && isReadableStream(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
}
exports.isReadableBufferedStream = isReadableBufferedStream;
function newWriteableStream(reducer, options) {
    return new WriteableStreamImpl(reducer);
}
exports.newWriteableStream = newWriteableStream;
var WriteableStreamImpl = /** @class */ (function () {
    function WriteableStreamImpl(reducer, options) {
        this.reducer = reducer;
        this.options = options;
        this.state = {
            flowing: false,
            ended: false,
            destroyed: false
        };
        this.buffer = {
            data: [],
            error: []
        };
        this.listeners = {
            data: [],
            error: [],
            end: []
        };
        this.pendingWritePromises = [];
    }
    WriteableStreamImpl.prototype.pause = function () {
        if (this.state.destroyed) {
            return;
        }
        this.state.flowing = false;
    };
    WriteableStreamImpl.prototype.resume = function () {
        if (this.state.destroyed) {
            return;
        }
        if (!this.state.flowing) {
            this.state.flowing = true;
            // emit buffered events
            this.flowData();
            this.flowErrors();
            this.flowEnd();
        }
    };
    WriteableStreamImpl.prototype.write = function (data) {
        var _this = this;
        var _a;
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the data to listeners
        if (this.state.flowing) {
            this.listeners.data.forEach(function (listener) { return listener(data); });
        }
        // not yet flowing: buffer data until flowing
        else {
            this.buffer.data.push(data);
            // highWaterMark: if configured, signal back when buffer reached limits
            if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.highWaterMark) === 'number' && this.buffer.data.length > this.options.highWaterMark) {
                return new Promise(function (resolve) { return _this.pendingWritePromises.push(resolve); });
            }
        }
    };
    WriteableStreamImpl.prototype.error = function (error) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the error to listeners
        if (this.state.flowing) {
            this.listeners.error.forEach(function (listener) { return listener(error); });
        }
        // not yet flowing: buffer errors until flowing
        else {
            this.buffer.error.push(error);
        }
    };
    WriteableStreamImpl.prototype.end = function (result) {
        if (this.state.destroyed) {
            return;
        }
        // end with data or error if provided
        if (result instanceof Error) {
            this.error(result);
        }
        else if (result) {
            this.write(result);
        }
        // flowing: send end event to listeners
        if (this.state.flowing) {
            this.listeners.end.forEach(function (listener) { return listener(); });
            this.destroy();
        }
        // not yet flowing: remember state
        else {
            this.state.ended = true;
        }
    };
    WriteableStreamImpl.prototype.on = function (event, callback) {
        if (this.state.destroyed) {
            return;
        }
        switch (event) {
            case 'data':
                this.listeners.data.push(callback);
                // switch into flowing mode as soon as the first 'data'
                // listener is added and we are not yet in flowing mode
                this.resume();
                break;
            case 'end':
                this.listeners.end.push(callback);
                // emit 'end' event directly if we are flowing
                // and the end has already been reached
                //
                // finish() when it went through
                if (this.state.flowing && this.flowEnd()) {
                    this.destroy();
                }
                break;
            case 'error':
                this.listeners.error.push(callback);
                // emit buffered 'error' events unless done already
                // now that we know that we have at least one listener
                if (this.state.flowing) {
                    this.flowErrors();
                }
                break;
        }
    };
    WriteableStreamImpl.prototype.removeListener = function (event, callback) {
        if (this.state.destroyed) {
            return;
        }
        var listeners = undefined;
        switch (event) {
            case 'data':
                listeners = this.listeners.data;
                break;
            case 'end':
                listeners = this.listeners.end;
                break;
            case 'error':
                listeners = this.listeners.error;
                break;
        }
        if (listeners) {
            var index = listeners.indexOf(callback);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    };
    WriteableStreamImpl.prototype.flowData = function () {
        if (this.buffer.data.length > 0) {
            var fullDataBuffer_1 = this.reducer(this.buffer.data);
            this.listeners.data.forEach(function (listener) { return listener(fullDataBuffer_1); });
            this.buffer.data.length = 0;
            // When the buffer is empty, resolve all pending writers
            var pendingWritePromises = __spread(this.pendingWritePromises);
            this.pendingWritePromises.length = 0;
            pendingWritePromises.forEach(function (pendingWritePromise) { return pendingWritePromise(); });
        }
    };
    WriteableStreamImpl.prototype.flowErrors = function () {
        var e_1, _a;
        if (this.listeners.error.length > 0) {
            var _loop_1 = function (error) {
                this_1.listeners.error.forEach(function (listener) { return listener(error); });
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.buffer.error), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var error = _c.value;
                    _loop_1(error);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.buffer.error.length = 0;
        }
    };
    WriteableStreamImpl.prototype.flowEnd = function () {
        if (this.state.ended) {
            this.listeners.end.forEach(function (listener) { return listener(); });
            return this.listeners.end.length > 0;
        }
        return false;
    };
    WriteableStreamImpl.prototype.destroy = function () {
        if (!this.state.destroyed) {
            this.state.destroyed = true;
            this.state.ended = true;
            this.buffer.data.length = 0;
            this.buffer.error.length = 0;
            this.listeners.data.length = 0;
            this.listeners.error.length = 0;
            this.listeners.end.length = 0;
            this.pendingWritePromises.length = 0;
        }
    };
    return WriteableStreamImpl;
}());
/**
 * Helper to fully read a T readable into a T.
 */
function consumeReadable(readable, reducer) {
    var chunks = [];
    var chunk;
    while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
    }
    return reducer(chunks);
}
exports.consumeReadable = consumeReadable;
/**
 * Helper to read a T readable up to a maximum of chunks. If the limit is
 * reached, will return a readable instead to ensure all data can still
 * be read.
 */
function consumeReadableWithLimit(readable, reducer, maxChunks) {
    var chunks = [];
    var chunk = undefined;
    while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
        chunks.push(chunk);
    }
    // If the last chunk is null, it means we reached the end of
    // the readable and return all the data at once
    if (chunk === null && chunks.length > 0) {
        return reducer(chunks);
    }
    // Otherwise, we still have a chunk, it means we reached the maxChunks
    // value and as such we return a new Readable that first returns
    // the existing read chunks and then continues with reading from
    // the underlying readable.
    return {
        read: function () {
            // First consume chunks from our array
            if (chunks.length > 0) {
                return chunks.shift();
            }
            // Then ensure to return our last read chunk
            if (typeof chunk !== 'undefined') {
                var lastReadChunk = chunk;
                // explicitly use undefined here to indicate that we consumed
                // the chunk, which could have either been null or valued.
                chunk = undefined;
                return lastReadChunk;
            }
            // Finally delegate back to the Readable
            return readable.read();
        }
    };
}
exports.consumeReadableWithLimit = consumeReadableWithLimit;
/**
 * Helper to read a T readable up to a maximum of chunks. If the limit is
 * reached, will return a readable instead to ensure all data can still
 * be read.
 */
function peekReadable(readable, reducer, maxChunks) {
    var chunks = [];
    var chunk = undefined;
    while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
        chunks.push(chunk);
    }
    // If the last chunk is null, it means we reached the end of
    // the readable and return all the data at once
    if (chunk === null && chunks.length > 0) {
        return reducer(chunks);
    }
    // Otherwise, we still have a chunk, it means we reached the maxChunks
    // value and as such we return a new Readable that first returns
    // the existing read chunks and then continues with reading from
    // the underlying readable.
    return {
        read: function () {
            // First consume chunks from our array
            if (chunks.length > 0) {
                return chunks.shift();
            }
            // Then ensure to return our last read chunk
            if (typeof chunk !== 'undefined') {
                var lastReadChunk = chunk;
                // explicitly use undefined here to indicate that we consumed
                // the chunk, which could have either been null or valued.
                chunk = undefined;
                return lastReadChunk;
            }
            // Finally delegate back to the Readable
            return readable.read();
        }
    };
}
exports.peekReadable = peekReadable;
/**
 * Helper to fully read a T stream into a T.
 */
function consumeStream(stream, reducer) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        stream.on('data', function (data) { return chunks.push(data); });
        stream.on('error', function (error) { return reject(error); });
        stream.on('end', function () { return resolve(reducer(chunks)); });
    });
}
exports.consumeStream = consumeStream;
/**
 * Helper to peek up to `maxChunks` into a stream. The return type signals if
 * the stream has ended or not. If not, caller needs to add a `data` listener
 * to continue reading.
 */
function peekStream(stream, maxChunks) {
    return new Promise(function (resolve, reject) {
        var streamListeners = new disposable_1.DisposableCollection();
        // Data Listener
        var buffer = [];
        var dataListener = function (chunk) {
            // Add to buffer
            buffer.push(chunk);
            // We reached maxChunks and thus need to return
            if (buffer.length > maxChunks) {
                // Dispose any listeners and ensure to pause the
                // stream so that it can be consumed again by caller
                streamListeners.dispose();
                stream.pause();
                return resolve({ stream: stream, buffer: buffer, ended: false });
            }
        };
        streamListeners.push(disposable_1.Disposable.create(function () { return stream.removeListener('data', dataListener); }));
        stream.on('data', dataListener);
        // Error Listener
        var errorListener = function (error) { return reject(error); };
        streamListeners.push(disposable_1.Disposable.create(function () { return stream.removeListener('error', errorListener); }));
        stream.on('error', errorListener);
        var endListener = function () { return resolve({ stream: stream, buffer: buffer, ended: true }); };
        streamListeners.push(disposable_1.Disposable.create(function () { return stream.removeListener('end', endListener); }));
        stream.on('end', endListener);
    });
}
exports.peekStream = peekStream;
/**
 * Helper to read a T stream up to a maximum of chunks. If the limit is
 * reached, will return a stream instead to ensure all data can still
 * be read.
 */
function consumeStreamWithLimit(stream, reducer, maxChunks) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        var wrapperStream = undefined;
        stream.on('data', function (data) {
            // If we reach maxChunks, we start to return a stream
            // and make sure that any data we have already read
            // is in it as well
            if (!wrapperStream && chunks.length === maxChunks) {
                wrapperStream = newWriteableStream(reducer);
                while (chunks.length) {
                    wrapperStream.write(chunks.shift());
                }
                wrapperStream.write(data);
                return resolve(wrapperStream);
            }
            if (wrapperStream) {
                wrapperStream.write(data);
            }
            else {
                chunks.push(data);
            }
        });
        stream.on('error', function (error) {
            if (wrapperStream) {
                wrapperStream.error(error);
            }
            else {
                return reject(error);
            }
        });
        stream.on('end', function () {
            if (wrapperStream) {
                while (chunks.length) {
                    wrapperStream.write(chunks.shift());
                }
                wrapperStream.end();
            }
            else {
                return resolve(reducer(chunks));
            }
        });
    });
}
exports.consumeStreamWithLimit = consumeStreamWithLimit;
/**
 * Helper to create a readable stream from an existing T.
 */
function toStream(t, reducer) {
    var stream = newWriteableStream(reducer);
    stream.end(t);
    return stream;
}
exports.toStream = toStream;
/**
 * Helper to convert a T into a Readable<T>.
 */
function toReadable(t) {
    var consumed = false;
    return {
        read: function () {
            if (consumed) {
                return null;
            }
            consumed = true;
            return t;
        }
    };
}
exports.toReadable = toReadable;
/**
 * Helper to transform a readable stream into another stream.
 */
function transform(stream, transformer, reducer) {
    var target = newWriteableStream(reducer);
    stream.on('data', function (data) { return target.write(transformer.data(data)); });
    stream.on('end', function () { return target.end(); });
    stream.on('error', function (error) { return target.error(transformer.error ? transformer.error(error) : error); });
    return target;
}
exports.transform = transform;
//# sourceMappingURL=stream.js.map