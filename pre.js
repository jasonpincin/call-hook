module.exports = function post (callee, preCall) {
  callHook.callee = callee
  return callHook

  function callHook () {
    var aborted,
        rewrittenArgs,
        ctx = {
          abort       : abort,
          setArguments: setArguments,
          context     : this
        }

    preCall.apply(ctx, arguments)
    if (aborted) return aborted.returnValue
    return callee.apply(this, rewrittenArgs || arguments)

    function abort (returnValue) {
      aborted = { returnValue: returnValue }
    }

    function setArguments () {
      rewrittenArgs = arguments
    }
  }
}
