import { split, map, modify } from "ramda"

export const _funcs = [
  ["add", "n-n5", "n-n5", "n"],
  ["multiply", "n-n5", "n-n5", "n"],
  ["subtract", "n-n5", "n-n5", "n"],
  ["divide", "n-n5-9-0", "n-n5-9-0", "n"],
  ["modulo", "n-n5", "n-n5-9-0", "n"],
  ["mathMod", "n-n5", "n-n5-9-0", "n"],
  ["mean", "[n]-3-n5", "n"],
  ["median", "[n]-3-n5", "n"],
  ["sum", "[n]-3-n5", "n"],
  ["product", "[n]-3-n5", "n"],
  ["inc", "n-n5", "n"],
  ["dec", "n-n5", "n"],
  ["negate", "n-n5", "n"],
  ["and", "b", "b", "b"],
  ["or", "b", "b", "b"],
  ["xor", "b", "b", "b"],
  ["not", "b", "b"],
  ["not#2", "fg-logic-0", "b"],
  ["equals", "n-n5", "n-n5", "b"],
  ["gt", "n-n5", "n-n5", "b"],
  ["lt", "n-n5", "n-n5", "b"],
  ["gte", "n-n5", "n-n5", "b"],
  ["lte", "n-n5", "n-n5", "b"],
  ["both", "fg-comp", "fg-comp", "|", "n-n5", "b"],
  ["either", "fg-comp", "fg-comp", "|", "n-n5", "b"],
  ["allPass", "[fg]-comp", "|", "n-n5", "b"],
  ["anyPass", "[fg]-comp", "|", "n-n5", "b"],
  ["clamp", "n-0-5#n1", `n#n2#["gt","$n2","$n1"]`, "n-n5", "n"],
  ["countBy", "fg-arg1", "[n]", "o"],
  ["difference", "[n]", "[n]", "[n]"],
  ["intersection", "[n]", "[n]", "[n]"],
  ["union", "[n]", "[n]", "[n]"],
  ["symmetricDifference", "[n]", "[n]", "[n]"],
  ["differenceWith", ["eqBy", "fg-arg1"], "[n]-3-n5", "[n]-3-n5", "[n]"],
  ["unionWith", ["eqBy", "fg-arg1"], "[n]-3-n5", "[n]-3-n5", "[n]"],
  [
    "symmetricDifferenceWith",
    ["eqBy", "fg-arg1"],
    "[n]-3-n5",
    "[n]-3-n5",
    "[n]",
  ],
  ["eqBy", "fg-arg1", "n-n5", "n-n5", "b"],
  ["identical", "[n]-1-0-3", "[n]-1-0-3", "b"],
  ["identical#2", "n-0-3", "n-0-3", "b"],
  ["max", "n-n5", "n-n5", "n"],
  ["min", "n-n5", "n-n5", "n"],
  ["maxBy", "fg-arg1,math", "n-n5", "n-n5", "n"],
  ["minBy", "fg-arg1,math", "n-n5", "n-n5", "n"],
  ["pathEq", "[n]-2-*-2", "n", "[[n]]", "b"],
  ["propEq", "c", "n", "o", "b"],
  ["sortBy", "fg-arg1", "[n]-5-n5", "[n]"],
  ["innerJoin", "w-flip", "fn-propEq-2", "[[n]]", "[n]", "[[n]]"],
  [
    "sortWith",
    ["[]", "fg-sort_order-0", "fg-sort_order-0"],
    "|",
    "[[n]]",
    "[[n]]",
  ],
  ["when", "fg-comp", "fg-arg1", "n-n5", "n"],
  ["ifElse", "fg-comp", "fg-arg1", "fg-arg1", "|", "n-n5", "n"],
  ["unless", "fg-comp", "fg-arg1", "n-n5", "n"],
  ["until", "fn-gt,gte", "fn-dec", "n-1", "n"],
  ["until#2", "fn-lt,lte", "fn-inc", "n-1", "n"],
  ["prop", "n-*-3", "[n]", "*"],
  ["propSatisfies", "fg-comp", "c", "o", "b"],
  ["pathSatisfies", "fg-comp", "[c]-2", "o-3-o", "b"],
  ["isEmpty", "[n]-+", "b"],
  ["defaultTo", "n", "|", "m", "n"],
  [
    "cond",
    [
      ["[]", "fg-comp", "fg-math"],
      ["[]", "fg-comp", "fg-math"],
      ["[]", "fn-T", "fg-math"],
    ],
    "|",
    "n-n5",
    "n",
  ],
  ["adjust", "n-0-3", "fg-arg1", "[n]", "[n]"],
  ["all", "fg-comp", "[n]-3-n5", "b"],
  ["any", "fg-comp", "[n]-3-n5", "b"],
  ["aperture", "n-1-5", "[n]-5", "[[n]]"],
  ["append", "n", "[n]", "[n]"],
  ["head", "[n]", "n"],
  ["chain", "fn-append-2", "fn-head", "|", "[n]", "[n]"],
  ["collectBy", "fg-comp", "[n]-5-n5", "[n]"],
  ["concat", "[n]", "[n]", "[n]"],
  ["count", "fg-comp", "[n]-5-n5", "n"],
  ["drop", "n-1-4", "[n]-5", "[n]"],
  ["dropLast", "n-1-4", "[n]-5", "[n]"],
  ["dropLastWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["dropRepeats", "[n]-9-n5", "[n]"],
  ["dropRepeatsWith", "fg-comp", "[n]-9-n5", "[n]"],
  ["dropWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["endsWith", "[n]-2-0-3", "[n]-5-0-3", "b"],
  ["startsWith", "[n]-2-0-3", "[n]-5-0-3", "b"],
  ["filter", "fg-comp", "[n]", "[n]"],
  ["find", "fg-comp", "[n]-5-n5", "n"],
  ["findIndex", "fg-comp", "[n]-5-n5", "n"],
  ["findLast", "fg-comp", "[n]-5-n5", "n"],
  ["findLastIndex", "fg-comp", "[n]-5-n5", "n"],
  ["flatten", "[[n]]", "[n]"],
  ["forEach", "fg-arg1", "[n]", "[n]"],
  ["fromPairs", "[[n]]-3-2", "o"],
  ["groupBy", "fn-prop", "[o]", "o"],
  ["groupWith", "fg-comp", "[n]-9", "[[n]]"],
  ["includes", "n", "[n]-5", "b"],
  ["indexBy", "fn-prop", "[o]", "o"],
  ["indexOf", "n", "[n]-5", "n"],
  ["init", "[n]", "[n]"],
  ["insert", "n-0-3", "n", "[n]", "[n]"],
  ["insertAll", "n-0-3", "[n]", "[n]", "[n]"],
  ["intersperse", "n", "[n]", "[n]"],
  ["into", "[]", "fn-drop", "[n]", "[n]"],
  ["join", "c", "[c]", "s"],
  ["last", "[n]", "n"],
  ["lastIndexOf", "n", "[n]-5", "n"],
  ["length", "[n]-*", "n"],
  ["map", "fg-arg1", "[n]", "[n]"],
  ["mapAccum", ["compose", ["repeat", ["__"], 2], "fg-math"], "n", "[n]", "*"],
  [
    "mapAccumRight",
    ["compose", ["repeat", ["__"], 2], "fg-math"],
    "n",
    "[n]",
    "*",
  ],
  ["mergeAll", "[o]", "o"],
  ["move", "n-0-3", "n-0-3", "[n]", "[n]"],
  ["none", "fg-comp", "[n]-3-n5", "b"],
  ["nth", "n-0-3", "[n]-5", "n"],
  ["pair", "n", "n", "[n]"],
  ["partition", "fg-comp", "[n]-5-n5", "[[n]]"],
  ["match", "r", "s", "o"],
  ["replace", "r", "s", "s", "o"],
  ["split", "r", "s", "[s]"],
  ["test", "r", "s", "b"],
  ["toLower", "s", "s"],
  ["toUpper", "s", "s"],
  ["toString", ["fg-math-0", "fg-math-0"], "s"],
  ["trim", "s-3-0-5-$m -$m ", "s"],
  ["pluck", "c", "[o]", "[n]"],
  ["prepend", "n", "[n]", "[n]"],
  ["range", "n-0-5#n1", `n#n2#["gt","$n2","$n1"]`, "[n]"],
  ["reduce", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reduceBy", "fn-add,subtract,multiply", "n", "fg-comp", "[n]-3-n5", "*"],
  // reduced, sequence, transduce, traverse
  ["reduceRight", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reduceWhile", "fg-comp", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reject", "fg-comp", "[n]", "[n]"],
  ["remove", "n-0-3", "n-0-3", "[n]-5", "[n]-5"],
  ["repeat", "n", "n", "[n]"],
  ["reverse", "[n]", "[n]"],
  ["scan", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["slice", "n-0-5", "n-6-5", "[n]-9", "[n]"],
  ["sort", "fn-subtract-2", "[n]-9", "[n]"],
  ["splitAt", "n", "[n]-9", "[[n]]"],
  ["splitEvery", "n-1", "[n]-9", "[[n]]"],
  ["splitWhen", "fg-comp", "[n]-9-n5", "[[n]]"],
  ["splitWhenever", "fg-comp", "[n]-9-n5", "[[n]]"],
  ["tail", "[n]", "[n]"],
  ["take", "n-0-5", "[n]-5", "[n]"],
  ["takeLast", "n-0-5", "[n]-5", "[n]"],
  ["takeLastWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["takeWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["times", "fg-math", "n", "[n]"],
  ["transpose", "[[n]]-3-2", "[[n]]"],
  [
    "unfold",
    [
      "ifElse",
      ["gt", "n-5-5"],
      ["applySpec", ["[]", ["identity"], ["inc"]]],
      ["always", false],
    ],
    "n-0-5",
    "[n]",
  ],
  [
    "unfold#2",
    [
      "ifElse",
      ["lt", "n-0-5"],
      ["applySpec", ["[]", ["identity"], ["dec"]]],
      ["always", false],
    ],
    "n-5-5",
    "[n]",
  ],
  ["uniq", "[n]-9-n5", "[n]"],
  ["uniqBy", "fg-arg1", "[n]-9-n5", "[n]"],
  ["uniqWith", ["eqBy", "fg-arg1"], "[n]-9-n5", "[n]"],
  ["unnest", ["[[n]]-2", "[n]"], "[n]"],
  ["update", "n-0-3", "n", "[n]", "[n]"],
  ["without", "[n]", "[n]-9", "[n]"],
  ["xprod", "[n]", "[n]", "[[n]]"],
  ["zip", "[n]", "[n]", "[[n]]"],
  ["zipObj", "[n]", "[n]", "[[n]]"],
  ["zipWith", "fg-math-2", "[n]", "[n]", "[[n]]"],
  ["assoc", "c", "n", "o", "o"],
  ["assocPath", "[c]-2", "n", "o-3-o", "{o}"],
  ["clone", "o", "o"],
  ["dissoc", "c", "o", "o"],
  ["dissocPath", "[c]-2", "o-3-o", "{o}"],
  ["eqProps", "c", "o", "o", "b"],
  ["evolve", "o-1-fg-arg1", "o", "o"],
  ["forEachObjIndexed", "fg-arg1", "o", "o"],
  ["has", "c", "o", "b"],
  ["hasIn", "c", "o", "b"],
  ["hasPath", "[c]-2", "o-2-o", "b"],
  ["invert", "o", "o"],
  ["invertObj", "o", "o"],
  ["keys", "o", "[c]"],
  ["keysIn", "o", "[c]"],
  //lens, lensIndex, lensPath, lensProp, over, set, view
  ["mapObjIndexed", "fg-arg1", "o", "o"],
  ["mergeDeepLeft", "o-3-o", "o-3-o", "{o}"],
  ["mergeDeepRight", "o-3-o", "o-3-o", "{o}"],
  ["mergeDeepWith", "fg-math-2", "o-3-o", "o-3-o", "{o}"],
  [
    "mergeDeepWithKey",
    ["compose", ["apply", "fg-math-2"], ["unapply", ["drop", 1]]],
    "o-3-o",
    "o-3-o",
    "o",
  ],
  ["mergeLeft", "o", "o", "o"],
  ["mergeRight", "o", "o", "o"],
  ["mergeWith", "fg-math-2", "o", "o", "o"],
  [
    "mergeWithKey",
    ["compose", ["apply", "fg-math-2"], ["unapply", ["drop", 1]]],
    "o",
    "o",
    "o",
  ],
  ["modify", "c", "fg-arg1", "o", "o"],
  ["modifyPath", "[c]-2", "fg-arg1", "o-3-o", "{o}"],
  ["objOf", "s", "n", "o"],
  ["omit", "[c]", "o", "o"],
  ["path", "[c]-2", "o-3-o", "n"],
  ["pathOr", "n", "[c]-2", "o-3-o", "n"],
  ["paths", "[[c]]-3-2", "o-3-o", "[n]"],
  ["pick", "[c]", "o", "o"],
  ["pickAll", "[c]", "o", "o"],
  ["pickBy", "fg-comp", "o", "o"],
  ["project", "[c]", "[o]", "[o]"],
  ["prop", "c", "o", "n"],
  ["propOr", "n", "c", "o", "n"],
  ["props", "[c]", "o", "[n]"],
  ["toPairs", "o", "[[n]]"],
  ["toPairsIn", "o", "[[n]]"],
  ["unwind", "c", "o-3-[n]", "[o]"],
  ["values", "o", "[n]"],
  ["valuesIn", "o", "[n]"],
  ["where", "o-1-fg-comp-1", "o", "b"],
  ["whereAny", "o-1-fg-comp-1", "o", "b"],
  ["whereEq", "o-2", "o-5", "b"],

  // functions, andThen, binary, bind, comparator,composeWith,construct,constructN
  // curry, curryN, invoker, memoizeWith, nAry,nthArg,otherwise,partialObject,pipeWith,tap,tryCatch,trunkify,unary,uncurryN
  ["always", "n", "|", "*", "n"],
  ["ap", ["[]", "fg-arg1", "fg-arg1"], "[n]", "[n]"],
  ["apply", "fg-math-2", "[n]-2", "n"],
  ["applySpec", "o-3-fg-arg1", "|", "n", "o"],
  ["applyTo", "n", "fg-arg1", "n"],
  ["ascend", ["prop", "n-0-3"], "f"],
  ["descend", ["prop", "n-0-3"], "f"],
  ["call", "fg-math", "n", "n", "n"],
  ["compose", "fg-math", "fg-math", "|", "n", "n"],
  ["converge", "fg-math-2", ["[]", "fg-arg1", "fg-arg1"], "|", "n", "n"],
  ["empty", "*-[n],o,s", "[n]"],
  ["F", "*", "b"],
  ["identity", "*", "*"],
  ["juxt", ["[]", "fg-math-2", "fg-math-2"], "|", "n", "n", "[n]"],
  ["lift", "fg-math-2", "|", "[n]", "[n]", "[n]"],
  ["liftN", 2, "fg-math-2", "|", "[n]", "[n]", "[n]"],
  ["nthArg", "n-0-3", "|", "n", "n", "n", "n"],
  ["(o)", "fg-arg1", "fg-arg1", "|", "n", "n"],
  ["of", "n", "[n]"],
  ["on", "fg-math-2", "fg-arg1", "n", "n", "n"],
  ["once", "fg-arg1", "|", "n", "n"],
  ["partial", "fg-math-2", "[n]-1", "|", "n", "n"],
  ["partialRight", "fg-math-2", "[n]-1", "|", "n", "n"],
  ["pipe", "fg-math", "fg-math", "|", "n", "n"],
  ["promap", "fg-arg1", "fg-arg1", "fg-arg1", "|", "n", "n"],
  ["T", "*", "b"],
  ["unapply", "fg-math_arr", "|", "n", "n", "n"],
  ["useWith", "fg-math-2", ["[]", "fg-arg1", "fg-arg1"], "|", "n", "n", "n"],
  // type
  ["isNil", "m", "b"],
  ["is", "t", "[n]", "b"],
  ["propIs", "t", "c", "o", "b"],
  ["type", "*", "s"],
]

export const fgroups = {
  sort_order: ["ascend", "descend"],
  math: ["add", "subtract", "multiply", "divide", "modulo"],
  math_arr: ["sum", "product", "mean", "median"],
  arg1: ["inc", "dec", "negate"],
  comp: ["gt", "lt", "gte", "lte", "equals"],
  maps: ["map"],
  logic: ["and", "or", "xor"],
  gl: ["gt", "lt"],
}

export const _funcs_extra = {
  complement: ["w-complement", "fg-comp-2", "n", "n", "b"],
  addIndex: ["w-addIndex", "fn-map-2", "fg-math-2", "[n]", "[n]"],
  flip: ["w-flip", "fg-math-2", "n", "n", "n"],
  __: [["fg-math-2", ["__"], "n"], "n", "n"],
}

export const _cat = {
  Type: "is,isNil,propIs,type",
  Function:
    "__,addIndex,always,andThen,ap,apply,applySpec,applyTo,ascend,binary,bind,call,comparator,compose,composeWith,construct,constructN,converge,curry,curryN,descend,empty,F,flip,identity,invoker,juxt,lift,liftN,memoizeWith,nAry,nthArg,o,of,on,once,otherwise,partial,partialObject,partialRight,pipe,pipeWith,promap,T,tap,thunkify,tryCatch,unapply,unary,uncurryN,useWith",
  Math:
    "add,dec,divide,inc,mathMod,mean,median,modulo,multiply,negate,product,subtract,sum",
  List:
    "adjust,all,any,aperture,append,chain,collectBy,concat,count,drop,dropLast,dropLastWhile,dropRepeats,dropRepeatsWith,dropWhile,endsWith,filter,find,findIndex,findLast,findLastIndex,flatten,forEach,fromPairs,groupBy,groupWith,head,includes,indexBy,indexOf,init,insert,insertAll,intersperse,into,join,last,lastIndexOf,length,map,mapAccum,mapAccumRight,mergeAll,move,none,nth,pair,partition,pluck,prepend,range,reduce,reduceBy,reduced,reduceRight,reduceWhile,reject,remove,repeat,reverse,scan,sequence,slice,sort,splitAt,splitEvery,splitWhen,splitWhenever,startsWith,tail,take,takeLast,takeLastWhile,takeWhile,times,transduce,transpose,traverse,unfold,uniq,uniqBy,uniqWith,unnest,update,without,xprod,zip,zipObj,zipWith",
  Logic:
    "allPass,and,anyPass,both,complement,cond,defaultTo,either,ifElse,isEmpty,not,or,pathSatisfies,propSatisfies,unless,until,when,xor",
  Relation:
    "clamp,countBy,difference,differenceWith,eqBy,equals,gt,gte,identical,innerJoin,intersection,lt,lte,max,maxBy,min,minBy,pathEq,propEq,sortBy,sortWith,symmetricDifference,symmetricDifferenceWith,union,unionWith",
  Object:
    "assoc,assocPath,clone,dissoc,dissocPath,eqProps,evolve,forEachObjIndexed,has,hasIn,hasPath,invert,invertObj,keys,keysIn,lens,lensIndex,lensPath,lensProp,mapObjIndexed,mergeDeepLeft,mergeDeepRight,mergeDeepWith,mergeDeepWithKey,mergeLeft,mergeRight,mergeWith,mergeWithKey,modify,modifyPath,objOf,omit,over,path,pathOr,paths,pick,pickAll,pickBy,project,prop,propOr,props,set,toPairs,toPairsIn,unwind,values,valuesIn,view,where,whereAny,whereEq",
  String: "match,replace,split,test,toLower,toString,toUpper,trim",
}

export let tutorial = map(modify("funcs", split(",")))([
  {
    key: "math1",
    title: "Math A",
    funcs: "inc,dec,negate",
  },
  {
    key: "math2",
    title: "Math B",
    funcs: "add,subtract,multiply,divide,modulo,mathMod",
  },
  {
    key: "math3",
    title: "Math C",
    funcs: "sum,product,mean,median",
  },
  {
    key: "relation1",
    title: "Relation A",
    funcs: "equals,gt,gte,lt,lte",
  },
  {
    key: "relation2",
    title: "Relation B",
    funcs: "clamp,max,min,maxBy,minBy",
  },
  {
    key: "logic1",
    title: "Logic A",
    funcs: "and,or,xor,not",
  },
  {
    key: "logic2",
    title: "Logic B",
    funcs: "both,either,allPass,anyPass",
  },
  {
    key: "logic3",
    title: "Logic C",
    funcs: "all,any,none",
  },
  {
    key: "logic4",
    title: "Logic D",
    funcs: "defaultTo,when,unless,ifElse,cond,until",
  },
  {
    key: "string1",
    title: "String A",
    funcs: "toLower,toUpper,toString,trim",
  },
  {
    key: "string2",
    title: "String B",
    funcs: "test,match,replace,split,join",
  },
  {
    key: "type1",
    title: "Type A",
    funcs: "is,isNil,propIs,type",
  },
  {
    key: "list1",
    title: "List A",
    funcs: "head,last,init,tail,uniq,reverse,dropRepeats",
  },
  {
    key: "list2",
    title: "List B",
    funcs:
      "append,prepend,insert,insertAll,intersperse,concat,update,move,remove,without,take,takeLast,drop,dropLast,slice",
  },
  {
    key: "list3",
    title: "List C",
    funcs:
      "intersection,union,difference,symmetricDifference,unionWith,differenceWith,symmetricDifferenceWith",
  },
  {
    key: "list4",
    title: "List D",
    funcs: "of,pair,range,repeat,times,flatten,zipWith,pluck",
  },
  {
    key: "list5",
    title: "List E",
    funcs:
      "adjust,map,filter,reject,uniqBy,uniqWith,dropWhile,dropLastWhile,dropRepeatsWith,takeWhile,takeLastWhile,sort,sortBy,sortWith",
  },
  {
    key: "list6",
    title: "List F",
    funcs:
      "includes,startsWith,endsWith,findIndex,findLastIndex,indexOf,lastIndexOf,length,count,nth,find,findLast",
  },
  {
    key: "list7",
    title: "List G",
    funcs:
      "aperture,collectBy,groupWith,partition,splitAt,splitEvery,splitWhen,splitWhenever,transpose,unnest,xprod,zip,toPairs,innerJoin,lift,liftN",
  },
  {
    key: "list8",
    title: "List H",
    funcs: "scan,unfold,mapAccum,mapAccumRight,reduce,reduceRight,reduceWhile",
  },
  {
    key: "object1",
    title: "Object A",
    funcs:
      "identical,isEmpty,eqBy,has,hasPath,propEq,pathEq,eqProps,propSatisfies,pathSatisfies,whereEq,where,whereAny",
  },
  {
    key: "object2",
    title: "Object B",
    funcs:
      "prop,propOr,props,path,pathOr,paths,pick,pickAll,pickBy,project,keys,values",
  },
  {
    key: "object3",
    title: "Object C",
    funcs:
      "assoc,assocPath,dissoc,dissocPath,omit,modify,modifyPath,evolve,invert,invertObj,mapObjIndexed,unwind",
  },
  {
    key: "object4",
    title: "Object D",
    funcs:
      "mergeAll,mergeDeepLeft,mergeDeepRight,mergeDeepWith,mergeLeft,mergeRight,mergeWith",
  },
  {
    key: "object5",
    title: "Object E",
    funcs: "objOf,fromPairs,zipObj,groupBy,indexBy,countBy,reduceBy,applySpec",
  },
  {
    key: "function1",
    title: "Function A",
    funcs: "T,F,identity,always,empty",
  },
  {
    key: "function2",
    title: "Function B",
    funcs:
      "complement,addIndex,flip,once,apply,call,partial,partialRight,unapply",
  },
  {
    key: "function3",
    title: "Function C",
    funcs: "o,compose,pipe,promap,applyTo,converge,juxt,on,useWith,chain",
  },
])

export const qs = {
  math1: [{ q: [1], a: "n-n5" }],
  math2: [
    { q: [1], a: "n-n5" },
    { q: [2], a: "n-n5" },
  ],
  math3: [{ q: [1], a: "[n]-3-n5" }],
  math4: [
    { q: [1], a: "n-n5" },
    { q: [2], a: "n-n5" },
    { q: [3], a: "n-n5" },
  ],
  math5: [
    { q: [1, 0], a: "fg-arg1,math" },
    { q: [2], a: "n-n5" },
    { q: [3], a: "n-n5" },
  ],
  logic1: [
    { q: [1], a: "b" },
    { q: [2], a: "b" },
  ],
  logic2: [{ q: [1], a: "b" }],
  logic3: [
    { q: [1], a: "n-n5" },
    { q: [0, 1, 0], a: "fg-comp" },
    { q: [0, 2, 0], a: "fg-comp" },
  ],
  logic4: [
    { q: [1], a: "n-n5" },
    { q: [0, 1, 0, 0], a: "fg-comp" },
    { q: [0, 1, 1, 0], a: "fg-comp" },
    { q: [0, 1, 2, 0], a: "fg-comp" },
  ],
  logic5: [
    { q: [2], a: "[n]-3-n5" },
    { q: [1, 0], a: "fg-comp" },
  ],
  logic6: [
    { q: [0, 1], a: "n" },
    { q: [1], a: "m" },
  ],
  logic7: [
    { q: [3], a: "n-n5" },
    { q: [1, 0], a: "fg-comp" },
    { q: [2, 0], a: "fg-comp" },
  ],
  logic8: [
    { q: [1], a: "n-n5" },
    { q: [0, 1, 0], a: "fg-comp" },
    { q: [0, 2, 0], a: "fg-comp" },
    { q: [0, 3, 0], a: "fg-comp" },
  ],
  logic9: [
    { q: [1], a: "n-n5" },
    { q: [0, 1, 0, 1, 0], a: "fg-comp" },
    { q: [0, 1, 0, 2, 0], a: "fg-math" },
    { q: [0, 1, 1, 1, 0], a: "fg-comp" },
    { q: [0, 1, 1, 2, 0], a: "fg-math" },
    { q: [0, 1, 2, 2, 0], a: "fg-math" },
  ],
  string1: [{ q: [1], a: "s" }],
  string2: [
    { q: [1, 0, 0], a: "fg-math" },
    { q: [1, 1, 0], a: "fg-math" },
  ],
  string3: [{ q: [1], a: "s-3-0-5-$m -$m " }],
  string4: [
    { q: [1, 1], a: "c" },
    { q: [2], a: "s" },
  ],
  string5: [
    { q: [1, 1], a: "c" },
    { q: [2], a: "s" },
    { q: [3], a: "s" },
  ],
  string6: [
    { q: [1], a: "c" },
    { q: [2], a: "[c]" },
  ],
  type1: [{ q: [1, 1], a: "ts" }],
  type2: [{ q: [1], a: "m" }],
  type3: [
    { q: [1, 1], a: "ts" },
    { q: [2], a: "c" },
    { q: [3], a: "o" },
  ],
  type4: [{ q: [1], a: "*" }],
  list1: [{ q: [1], a: "[n]" }],
  list2: [{ q: [1], a: "[n]-9-n5" }],
  list3: [
    { q: [1], a: "n" },
    { q: [2], a: "[n]" },
  ],
  list4: [
    { q: [1], a: "n" },
    { q: [2], a: "n" },
    { q: [3], a: "[n]" },
  ],
  list5: [
    { q: [1], a: "n" },
    { q: [2], a: "[n]" },
    { q: [3], a: "[n]" },
  ],
  list6: [
    { q: [1], a: "[n]" },
    { q: [2], a: "[n]" },
  ],
  list7: [
    { q: [1], a: "[n]" },
    { q: [2], a: "[n]-9" },
  ],
  list8: [
    { q: [1], a: "n" },
    { q: [2], a: "[n]-5" },
  ],
  list9: [
    { q: [1], a: "n" },
    { q: [2], a: "n" },
    { q: [3], a: "[n]-9" },
  ],
  list10: [
    { q: [1], a: "n-0-3" },
    { q: [2], a: "n-0-3" },
    { q: [3], a: "[n]-5" },
  ],
  list11: [
    { q: [1, 1, 0], a: "fg-arg1" },
    { q: [2], a: "[n]-3-n5" },
    { q: [3], a: "[n]-3-n5" },
  ],
  list12: [{ q: [1], a: "n" }],
  list13: [
    { q: [1], a: "n" },
    { q: [2], a: "n" },
  ],
  list14: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "n" },
  ],
  list15: [
    { q: [1, 0], a: "[n]" },
    { q: [1, 1], a: "[n]" },
    { q: [1, 2], a: "[n]" },
  ],
  list16: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "[n]" },
    { q: [3], a: "[n]" },
  ],
  list17: [
    { q: [1], a: "c" },
    { q: [2, 0], a: "o" },
    { q: [2, 1], a: "o" },
    { q: [2, 2], a: "o" },
  ],
  list18: [
    { q: [1], a: "n-0-3" },
    { q: [2, 0], a: "fg-arg1" },
    { q: [3], a: "[n]" },
  ],
  list19: [
    { q: [1, 0], a: "fg-arg1" },
    { q: [2], a: "[n]" },
  ],
  list20: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2], a: "[n]-5" },
  ],
  list21: [
    { q: [1, 0], a: "fg-arg1" },
    { q: [2], a: "[n]-9-n5" },
  ],
  list22: [
    { q: [1, 1, 0], a: "fg-arg1" },
    { q: [2], a: "[n]-9-n5" },
  ],
  list23: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2], a: "[n]-5-n5" },
  ],
  list24: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2], a: "[n]-9-n5" },
  ],
  list25: [{ q: [2], a: "[n]-9" }],
  list26: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2], a: "[n]-5-n5" },
  ],
  list27: [
    { q: [1, 0], a: "[n]" },
    { q: [1, 1], a: "[n]" },
    { q: [1, 2], a: "[n]" },
  ],
  list28: [
    { q: [1], a: "[n]-2-0-3" },
    { q: [2], a: "[n]-5-0-3" },
  ],
  list29: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2], a: "[n]-5-n5" },
  ],
  list30: [{ q: [1], a: "[n]-*" }],
  list31: [
    { q: [1], a: "n" },
    { q: [2], a: "[n]-9" },
  ],
  list32: [
    { q: [1, 0], a: "[n]-2" },
    { q: [1, 1], a: "[n]-2" },
    { q: [1, 2], a: "[n]-2" },
  ],
  list33: [
    { q: [1, 0, 0], a: "[n]" },
    { q: [1, 0, 1], a: "[n]" },
    { q: [1, 1], a: "[n]" },
  ],
  list34: [{ q: [1], a: "o" }],
  list35: [
    { q: [1, 1, 1], a: "n-0-3" },
    { q: [2, 0], a: "[n]" },
    { q: [2, 1], a: "[n]" },
    { q: [2, 2], a: "[n]" },
    { q: [3], a: "[n]" },
  ],
  list36: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [1], a: "[n]" },
    { q: [2], a: "[n]" },
  ],
  list37: [
    { q: [0, 2, 0], a: "fg-math" },
    { q: [1], a: "[n]" },
    { q: [2], a: "[n]" },
  ],
  list38: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "n" },
    { q: [3], a: "[n]" },
  ],
  list39: [
    { q: [1, 1, 1], a: "n" },
    { q: [1, 1, 0], a: "fg-gl" },
    { q: [2], a: "n" },
  ],
  list40: [
    { q: [1, 2, 0], a: "fg-math" },
    { q: [1, 2, 1], a: "n" },
    { q: [2], a: "n" },
    { q: [3], a: "[n]" },
  ],
  list41: [
    { q: [1, 1, 0], a: "fg-math" },
    { q: [2], a: "n" },
    { q: [3], a: "[n]" },
  ],
  list42: [
    { q: [1, 0], a: "fg-comp" },
    { q: [2, 1], a: "fg-math" },
    { q: [3], a: "n" },
    { q: [4], a: "[n]" },
  ],
  object1: [
    { q: [1], a: "n[n]-0-3" },
    { q: [2], a: "n[n]-0-3" },
  ],
  object2: [{ q: [1], a: "[n]-+" }],
  object3: [
    { q: [1, 0], a: "fg-arg1" },
    { q: [2], a: "n-n5" },
    { q: [3], a: "n-n5" },
  ],
  object4: [
    { q: [1], a: "c" },
    { q: [2], a: "o" },
  ],
  object5: [
    { q: [1], a: "[c]-2" },
    { q: [2], a: "o-2-o" },
  ],
  object6: [
    { q: [1], a: "c" },
    { q: [2], a: "n" },
    { q: [3], a: "o" },
  ],
  object7: [
    { q: [1], a: "[n]-2-0-3" },
    { q: [2], a: "n" },
    { q: [3, 0], a: "[n]" },
    { q: [3, 1], a: "[n]" },
    { q: [3, 2], a: "[n]" },
  ],
  object8: [
    { q: [1], a: "c" },
    { q: [2], a: "o" },
    { q: [3], a: "o" },
  ],
  object9: [
    { q: [1], a: "fg-comp" },
    { q: [2], a: "c" },
    { q: [3], a: "o" },
  ],
  object10: [
    { q: [1], a: "fg-comp" },
    { q: [2], a: "[c]-2" },
    { q: [3], a: "o-3-o" },
  ],
  object11: [
    { q: [1], a: "o-2" },
    { q: [2], a: "o-5" },
  ],
  object12: [
    { q: [1], a: "o-1-fg-comp-1" },
    { q: [2], a: "o" },
  ],
  object13: [
    { q: [1], a: "n" },
    { q: [2], a: "c" },
    { q: [3], a: "o" },
  ],
  object14: [
    { q: [1], a: "[c]" },
    { q: [2], a: "o" },
  ],
  object15: [
    { q: [1], a: "[[c]]-3-2" },
    { q: [2], a: "o-3-o" },
  ],
  object16: [
    { q: [1], a: "fg-comp" },
    { q: [2], a: "o" },
  ],
  object17: [
    { q: [1], a: "[c]" },
    { q: [2, 0], a: "o" },
    { q: [2, 1], a: "o" },
    { q: [2, 2], a: "o" },
  ],
  object18: [{ q: [1], a: "o" }],
  object19: [
    { q: [1], a: "c" },
    { q: [2], a: "n" },
    { q: [3], a: "o" },
  ],
  object20: [
    { q: [1], a: "[c]-2" },
    { q: [2], a: "n" },
    { q: [3], a: "o-3-o" },
  ],
  object21: [
    { q: [1], a: "c" },
    { q: [2], a: "o" },
  ],
  object22: [
    { q: [1], a: "[c]-2" },
    { q: [2], a: "o-3-o" },
  ],
  object23: [
    { q: [1], a: "c" },
    { q: [2, 0], a: "fg-arg1" },
    { q: [3], a: "o" },
  ],
  object24: [
    { q: [1], a: "[c]-2" },
    { q: [2, 0], a: "fg-arg1" },
    { q: [3], a: "o-3-o" },
  ],
  object25: [{ q: [2], a: "o" }],
  object26: [{ q: [1], a: "o" }],
  object27: [
    { q: [1, 0], a: "fg-arg1" },
    { q: [2], a: "o" },
  ],
  object28: [{ q: [1], a: "c" }],
  object29: [
    { q: [1, 0], a: "o" },
    { q: [1, 1], a: "o" },
    { q: [1, 2], a: "o" },
  ],
  object30: [
    { q: [1], a: "o-3-o" },
    { q: [2], a: "o-3-o" },
  ],
  object31: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "o-3-o" },
    { q: [3], a: "o-3-o" },
  ],
  object32: [
    { q: [1], a: "o" },
    { q: [2], a: "o" },
  ],
  object33: [
    { q: [1], a: "fg-math" },
    { q: [2], a: "o" },
    { q: [3], a: "o" },
  ],
  object34: [
    { q: [1], a: "s" },
    { q: [2], a: "n" },
  ],
  object35: [
    { q: [1, 0], a: "[n]-2" },
    { q: [1, 1], a: "[n]-2" },
    { q: [1, 2], a: "[n]-2" },
  ],
  object36: [
    { q: [1], a: "[n]" },
    { q: [2], a: "[n]" },
  ],
  object37: [
    { q: [1, 1], a: "c" },
    { q: [2, 0], a: "o" },
    { q: [2, 1], a: "o" },
    { q: [2, 2], a: "o" },
  ],
  object38: [
    { q: [1], a: "fg-arg1" },
    { q: [2], a: "n" },
  ],
  object39: [
    { q: [1], a: "fn-add,subtract,multiply" },
    { q: [2], a: "n" },
    { q: [3, 0], a: "fg-comp" },
    { q: [4], a: "[n]-3-n5" },
  ],
  object40: [{ q: [1], a: "n" }],
  function1: [{ q: [1], a: "*" }],
  function2: [
    { q: [0, 1], a: "n" },
    { q: [1], a: "*" },
  ],
  function3: [{ q: [1], a: "*-[n],o,s" }],
  function4: [{ q: [0, 1, 0], a: "fg-comp" }],
  function5: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "[n]" },
  ],
  function6: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [1], a: "n" },
    { q: [2], a: "n" },
  ],
  function7: [
    { q: [0, 1, 0], a: "fg-arg1" },
    { q: [1], a: "n" },
  ],
  function8: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "[n]-2" },
  ],
  function9: [
    { q: [1, 0], a: "fg-math" },
    { q: [2], a: "n" },
    { q: [3], a: "n" },
  ],
  function10: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [0, 2, 0], a: "n" },
    { q: [1], a: "n" },
  ],
  function11: [
    { q: [0, 1, 0], a: "fg-math_arr" },
    { q: [1], a: "n" },
    { q: [2], a: "n" },
  ],

  function12: [
    { q: [0, 1, 0], a: "fg-arg1" },
    { q: [0, 2, 0], a: "fg-arg1" },
    { q: [1], a: "n" },
  ],

  function13: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [0, 2, 0], a: "fg-math" },
    { q: [1], a: "n" },
  ],
  function14: [
    { q: [0, 1, 0], a: "fg-arg1" },
    { q: [0, 2, 0], a: "fg-arg1" },
    { q: [0, 3, 0], a: "fg-arg2" },
    { q: [1], a: "n" },
  ],
  function15: [
    { q: [1], a: "n" },
    { q: [2, 0], a: "fg-arg1" },
  ],
  function16: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [0, 2, 1, 0], a: "fg-arg1" },
    { q: [0, 2, 2, 0], a: "fg-arg1" },
    { q: [1], a: "n" },
  ],
  function17: [
    { q: [0, 1, 1, 0], a: "fg-math" },
    { q: [0, 1, 2, 0], a: "fg-math" },
    { q: [1], a: "n" },
    { q: [2], a: "n" },
  ],
  function18: [
    { q: [1, 0], a: "fg-math" },
    { q: [2, 0], a: "fg-arg1" },
    { q: [3], a: "n" },
    { q: [4], a: "n" },
  ],
  function19: [
    { q: [0, 1, 0], a: "fg-math" },
    { q: [0, 2, 1, 0], a: "fg-arg1" },
    { q: [0, 2, 2, 0], a: "fg-arg1" },
    { q: [1], a: "n" },
    { q: [2], a: "n" },
  ],
  function20: [{ q: [1], a: "[n]" }],
}

export const questions = {
  inc: qs.math1,
  dec: qs.math1,
  negate: qs.math1,
  add: qs.math2,
  subtract: qs.math2,
  multiply: qs.math2,
  divide: qs.math2,
  modulo: qs.math2,
  mathMod: qs.math2,
  sum: qs.math3,
  product: qs.math3,
  mean: qs.math3,
  median: qs.math3,
  equals: qs.math2,
  gt: qs.math2,
  gte: qs.math2,
  lt: qs.math2,
  lte: qs.math2,
  clamp: qs.math4,
  max: qs.math2,
  min: qs.math2,
  maxBy: qs.math5,
  minBy: qs.math5,
  and: qs.logic1,
  or: qs.logic1,
  xor: qs.logic1,
  not: qs.logic2,
  both: qs.logic3,
  either: qs.logic3,
  allPass: qs.logic4,
  anyPass: qs.logic4,
  all: qs.logic5,
  any: qs.logic5,
  none: qs.logic5,
  defaultTo: qs.logic6,
  when: qs.logic7,
  unless: qs.logic7,
  ifElse: qs.logic8,
  cond: qs.logic9,
  until: qs.logic7,
  toLower: qs.string1,
  toUpper: qs.string1,
  toString: qs.string2,
  trim: qs.string3,
  test: qs.string4,
  match: qs.string4,
  replace: qs.string5,
  split: qs.string4,
  join: qs.string6,
  is: qs.type1,
  isNil: qs.type2,
  propIs: qs.type3,
  type: qs.type4,
  head: qs.list1,
  last: qs.list1,
  init: qs.list1,
  tail: qs.list1,
  uniq: qs.list2,
  reverse: qs.list1,
  dropRepeats: qs.list2,
  append: qs.list3,
  prepend: qs.list3,

  insert: qs.list4,
  insertAll: qs.list5,
  intersperse: qs.list3,
  concat: qs.list6,
  update: qs.list4,
  move: qs.list4,
  remove: qs.list10,
  without: qs.list7,
  take: qs.list8,
  takeLast: qs.list8,
  drop: qs.list8,
  dropLast: qs.list8,
  slice: qs.list9,

  intersection: qs.list6,
  union: qs.list6,
  difference: qs.list6,
  symmetricDifference: qs.list6,
  unionWith: qs.list11,
  differenceWith: qs.list11,
  symmetricDifferenceWith: qs.list11,

  of: qs.list12,
  pair: qs.list13,
  range: qs.list13,
  repeat: qs.list13,
  times: qs.list14,
  flatten: qs.list15,
  zipWith: qs.list16,
  pluck: qs.list17,
  adjust: qs.list18,
  map: qs.list19,
  filter: qs.list20,
  reject: qs.list20,
  uniqBy: qs.list21,
  uniqWith: qs.list22,
  dropWhile: qs.list23,
  dropLastWhile: qs.list23,
  dropRepeatsWith: qs.list24,
  takeWhile: qs.list23,
  takeLastWhile: qs.list23,
  sort: qs.list25,
  sortBy: qs.list26,
  sortWith: qs.list27,
  includes: qs.list8,
  startsWith: qs.list28,
  endsWith: qs.list28,
  findIndex: qs.list29,
  findLastIndex: qs.list29,
  indexOf: qs.list8,
  lastIndexOf: qs.list8,
  length: qs.list30,
  count: qs.list29,
  nth: qs.list8,
  find: qs.list29,
  findLast: qs.list29,

  aperture: qs.list8,
  collectBy: qs.list23,
  groupWith: qs.list23,
  partition: qs.list23,
  splitEvery: qs.list24,
  splitWhen: qs.list24,
  transpose: qs.list32,
  unnest: qs.list33,
  xprod: qs.list6,
  zip: qs.list6,
  toPairs: qs.list34,
  innerJoin: qs.list35,
  lift: qs.list36,
  liftN: qs.list37,

  scan: qs.list38,
  unfold: qs.list39,
  mapAccum: qs.list40,
  mapAccumRight: qs.list40,
  reduce: qs.list41,
  reduceRight: qs.list41,
  reduceWhile: qs.list42,

  identical: qs.object1,
  isEmpty: qs.object2,
  eqBy: qs.object3,
  has: qs.object4,
  hasPath: qs.object5,
  propEq: qs.object6,
  pathEq: qs.object7,
  eqProps: qs.object8,
  propSatisfies: qs.object9,
  pathSatisfies: qs.object10,
  whereEq: qs.object11,
  where: qs.object12,
  whereAny: qs.object12,

  prop: qs.object4,
  propOr: qs.object13,
  props: qs.object14,
  paths: qs.object15,
  pick: qs.object14,
  pickAll: qs.object14,
  pickBy: qs.object16,
  project: qs.object17,
  keys: qs.object18,
  values: qs.object18,

  assoc: qs.object19,
  assocPath: qs.object20,
  dissoc: qs.object21,
  dissocPath: qs.object22,
  omit: qs.object14,
  modify: qs.object23,
  modifyPath: qs.object24,
  evolve: qs.object25,
  invert: qs.object26,
  invertObj: qs.object26,
  mapObjIndexed: qs.object27,
  unwind: qs.object28,
  mergeAll: qs.object29,
  mergeDeepLeft: qs.object30,
  mergeDeepRight: qs.object30,
  mergeDeepWith: qs.object31,
  mergeLeft: qs.object32,
  mergeRight: qs.object32,
  mergeWith: qs.object33,
  objOf: qs.object34,
  fromPairs: qs.object35,
  zipObj: qs.object36,
  groupBy: qs.object37,
  indexBy: qs.object37,
  countBy: qs.object38,
  reduceBy: qs.object39,
  applySpec: qs.object40,
  T: qs.function1,
  F: qs.function1,
  identity: qs.function1,
  always: qs.function2,
  empty: qs.function3,
  complement: qs.function4,
  addIndex: qs.function5,
  flip: qs.function6,
  once: qs.function7,
  apply: qs.function8,
  call: qs.function9,
  partial: qs.function10,
  partialRight: qs.function10,
  unapply: qs.function11,

  o: qs.function12,
  compose: qs.function13,
  pipe: qs.function13,
  promap: qs.function14,
  applyTo: qs.function15,
  converge: qs.function16,
  juxt: qs.function17,
  on: qs.function18,
  useWith: qs.function19,
  chain: qs.function20,
}
