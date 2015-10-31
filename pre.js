module.exports = function post (callee, preCall) {
    return function callHook () {
        var aborted
        var result = preCall.apply({ abort: abort }, arguments)
        if (aborted) return aborted.returnValue
        return callee.apply(undefined, Array.isArray(result) ? result : arguments)

        function abort (returnValue) {
            aborted = { returnValue: returnValue }
        }
    }
}
