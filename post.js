module.exports = function post (callee, postCall) {
  callHook.callee = callee
  return callHook

  function callHook () {
    return postCall.apply({
      context    : this,
      returnValue: callee.apply(this, arguments)
    }, arguments)
  }
}
