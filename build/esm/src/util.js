export class RuntimeError extends Error {
    constructor(code, message = '') {
        super('[RuntimeError] ' + code + ': ' + message);
        this.code = code;
    }
}
export function globalObject() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return Function('return this')();
}
export function defined(x, code = 'undefined', message = '') {
    if (x === undefined) {
        throw new RuntimeError(code, message);
    }
    return x;
}
export function log(block, ...args) {
    if (!args)
        return;
    const line = Array.prototype.slice.call(args).join(' ');
    globalObject().console.log(block + ': ' + line);
}
export function warn(...args) {
    const line = args.join(' ');
    const err = new Error();
    globalObject().console.log('Warning: ', line, err.stack);
}
function roundN(x, n) {
    return x % n >= n / 2 ? parseInt(`${x / n}`, 10) * n + n : parseInt(`${x / n}`, 10) * n;
}
export function midLine(a, b) {
    let midLine = b + (a - b) / 2;
    if (midLine % 2 > 0) {
        midLine = roundN(midLine * 10, 5) / 10;
    }
    return midLine;
}
export function prefix(text) {
    return `vf-${text}`;
}
export function upperFirst(s = '') {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
export function normalizeAngle(a) {
    a = a % (2 * Math.PI);
    if (a < 0) {
        a += 2 * Math.PI;
    }
    return a;
}
export function sumArray(arr) {
    return arr.reduce((a, b) => a + b, 0);
}
