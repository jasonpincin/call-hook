module.exports = function post (callee, postCall) {
    return function callHook () {
        return postCall.apply({
            previousReturnValue: callee.apply(undefined, arguments)
        }, arguments)
    }
}
