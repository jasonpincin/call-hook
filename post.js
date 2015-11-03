module.exports = function post (callee, postCall) {
    return function callHook () {
        return postCall.apply({
            returnValue: callee.apply(undefined, arguments)
        }, arguments)
    }
}
