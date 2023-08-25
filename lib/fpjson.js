import * as R from "ramda"

const mark = ["*", ">", "#", "&", "%", "$", "#"]
const types = {
  Object,
  Array,
  String,
  Number,
  Boolean,
}
const pad = depth => {
  return R.repeat(mark[depth], (20 - depth) * 2).join("") + `(${depth}) `
}
const fn = (r, d = {}, depth = 0) => {
  //console.log(pad(depth) + JSON.stringify(r))
  const _var = R.curry((path, ignore) => {
    //console.log("are we here....", path)
    if (/^\$/.test(path)) path = _var(R.tail(path), true)
    return R.path(path.split("."))(d)
  })

  const _let = R.curry((path, val) => {
    let tar = d
    if (/^\$/.test(path)) path = _var(R.tail(path), true)
    let _path = path.split(".")
    for (let v of R.init(_path)) {
      if (R.isNil(tar[v])) tar[v] = {}
      tar = tar[v]
    }
    tar[R.last(_path)] = val
    return val
  })

  let ret = null
  if (R.isNil(r)) {
    return r
  } else if (R.is(Function, r[0])) {
    //console.log(1)
    const args = R.tail(r)
    ret = r[0](...args)
  } else if (R.is(Array)(r) && r.length === 1 && r[0] === "__") {
    //console.log(2)
    ret = R.__
  } else if (r[0] === "typ") {
    ret = types[r[1]]
  } else if (r[0] === "reg") {
    ret = new RegExp(...R.tail(r))
  } else if (
    R.is(Array)(r) &&
    (R.includes(r[0])(["let", "var"]) || R.is(Function)(R[r[0]]))
  ) {
    //console.log(3)
    ret = R.compose(
      R.ifElse(
        R.o(R.gt(R.__, 0), R.length),
        R.apply(r[0] === "var" ? _var : r[0] === "let" ? _let : R[r[0]]),
        R.always(R[r[0]])
      ),
      R.map(v => fn(v, d, depth + 1)),
      R.tail
    )(r)
    //console.log(d)
    ret = typeof ret === "undefined" ? [] : ret
  } else if (R.is(Object)(r) && R.is(String)(r.var)) {
    //console.log(4)
    ret = R.path(r.var.split("."))(d)
  } else if (R.is(Array)(r) || R.is(Object)(r)) {
    //console.log(5)
    ret = R.map(v => fn(v, d, depth + 1))(r)
  } else {
    //console.log(6)
    ret = r
  }
  let _ret = null
  //console.log("LFG.....", ret)
  if (R.is(Array)(ret) && R.is(String)(ret[0]) && ret[0] === "[]") {
    _ret = R.tail(ret)
  } else {
    _ret = R.is(Function)(ret[0]) ? fn(ret, d, depth + 1) : ret
  }
  //console.log(pad(depth) + "ret => ", _ret)
  return _ret
}

export default fn
