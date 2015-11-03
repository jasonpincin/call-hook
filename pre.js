module.exports = function post (callee, preCall) {
    return function callHook () {
        var aborted,
            rewrittenArgs,
            ctx = { abort: abort, setArguments: setArguments }

        preCall.apply(ctx, arguments)
        if (aborted) return aborted.returnValue
        return callee.apply(undefined, rewrittenArgs ? rewrittenArgs : arguments)

        function abort (returnValue) {
            aborted = { returnValue: returnValue }
        }

        function setArguments () {
            rewrittenArgs = arguments
        }
    }
}
