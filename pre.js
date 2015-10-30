module.exports = function post (callee, preCall) {
    return function callHook () {
        var result = preCall.apply(undefined, arguments)
        return callee.apply(undefined, Array.isArray(result) ? result : arguments)
    }
}
