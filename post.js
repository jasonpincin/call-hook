module.exports = function post (callee, postCall) {
    callHook.callee = callee
    return callHook

    function callHook () {
        return postCall.apply({
            returnValue: callee.apply(undefined, arguments)
        }, arguments)
    }
}
