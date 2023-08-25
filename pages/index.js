const showdown = require("showdown")
const converter = new showdown.Converter()
const entities = require("entities")

import Head from "next/head"
import fpjson from "fpjson-lang"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { Box, Flex, Input, Textarea, ChakraProvider } from "@chakra-ui/react"
import { tutorial, _cat, qs, questions } from "../lib/funcs"
import { funcs, fgroups, get, rand, makeQuestion, getElm } from "../lib/query"
import lf from "localforage"
import intromd from "/lib/intro.js"
import hljs from "highlight.js"
import Github from "/lib/github"
import Highlight from "/lib/highlight"
import cheerio from "cheerio"

import {
  assoc,
  length,
  multiply,
  sum,
  clone,
  reject,
  dropLast,
  slice,
  o as _o,
  path,
  ranges,
  pluck,
  indexBy,
  prop,
  when,
  append,
  uniq,
  without,
  invert,
  tap,
  test,
  sortBy,
  identity,
  toLower,
  find,
  propEq,
  fromPairs,
  take,
  keys,
  flatten,
  drop,
  reduce,
  includes,
  filter,
  mergeAll,
  concat,
  equals,
  findIndex,
  addIndex,
  last,
  compose,
  assocPath,
  map,
  isNil,
  range,
  tail,
  init,
  is,
  values,
  split,
  mapObjIndexed,
  unnest,
  modify,
} from "ramda"

const allfuncs = compose(
  fromPairs,
  unnest,
  map(v => map(v2 => [v2, v.key])(v.funcs))
)(tutorial)

const fmap = keys(allfuncs)
const tmap = indexBy(prop("key"))(tutorial)
const allcats = invert(allfuncs)
const cat = compose(
  fromPairs,
  unnest,
  values,
  mapObjIndexed((v, k) =>
    compose(
      map(v2 => [v2, k]),
      split(",")
    )(v)
  )
)(_cat)
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const App = () => {
  const [stars, setStars] = useState({})
  const [starsE, setStarsE] = useState({})
  const [catsE, setCatsE] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [json, setJson] = useState("")
  const [result, setResult] = useState("-")
  const [val, setVal] = useState(null)
  const [cf, setCF] = useState(null)
  const [examples, setExamples] = useState([])
  const [q, setQ] = useState(null)
  const [o, setO] = useState(null)
  const [a, setA] = useState("")
  const [p, setP] = useState([0])
  const [ok, setOK] = useState(null)
  const [tab, setTab] = useState("Intro")
  const [tabTutorial, setTabTutorial] = useState("math1")
  const [tabIntro, setTabIntro] = useState("intro")
  const [lastQ, setLastQ] = useState(null)
  const [funcOps, setFuncOps] = useState([])
  const [selectedFunc, setSelectedFunc] = useState("inc")
  const [nomore, setNomore] = useState(false)
  const [notInit, setNotInit] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const genQ = _cats => {
    console.log(fpjson(["propIs", ["typ", "String"], "a", { a: "acb" }]))
    let vars = {}
    if (tab === "Intro") return
    setNotInit(false)
    let sfunc = selectedFunc
    if (tab === "Exam") {
      const _catsE = _cats || catsE
      let funcs = compose(filter(v => isNil(_catsE[v])))(
        tmap[tabTutorial].funcs
      )
      if (funcs.length === 0) {
        funcs = tmap[tabTutorial].funcs
        //setNomore(true)
        //return
      }
      sfunc = rand(funcs)
    }
    //setNomore(false)
    const main = `fn-${sfunc}`
    const examples = map(() => {
      const { f } = get(main)
      return makeQuestion(f, is(Array)(f[0]) ? [0, 0] : [0])
    })(range(0, 5))
    let len = funcs[sfunc].length
    const findex = rand(range(0, len))
    const qkey = `${main}-0-${findex}`
    const { f, tags } = get(qkey)
    let _qs = []
    const makeQ = (v, p) => {
      if (!is(Array)(v)) {
        _qs.push({ q: p, a: v })
      } else {
        let i2 = 0
        for (let v2 of v) {
          makeQ(v2, append(i2)(p))
          i2++
        }
      }
    }
    let i = 0
    for (let v of tags) {
      makeQ(v, [i])
      i++
    }
    if (tab === "Exam") {
      _qs = filter(v => {
        if (isNil(v.a)) return true
        return uniq(v.q).length === 1 && uniq(v.q)[0] === 0
      })(_qs)
    } else {
      _qs = reject(v => {
        if (isNil(v.a)) return true
        let sp = v.a.split("-")
        return (
          (uniq(v.q).length === 1 && uniq(v.q)[0] === 0) ||
          !includes(sp[0])([
            "n",
            "[n]",
            "s",
            "c",
            "[c]",
            "[o]",
            "fg",
            "o",
            "[fg]",
            "[s]",
            "[[c]]",
            "t",
            "ts",
            "*",
            "m",
            "r",
            "t",
            "b",
            "n[n]",
            "[[n]]",
          ])
        )
      })(_qs)
    }
    const fname = is(Array)(f[0]) ? f[0][0] : f[0]
    //const qtype = !isNil(questions[fname]) ? rand(questions[fname]) : null
    const qtype = _qs.length > 0 ? rand(_qs) : null
    const mq = makeQuestion(
      f,
      !isNil(qtype) ? qtype.q : is(Array)(f[0]) ? [0, 0] : [0]
    )

    let opts =
      tab === "Exam"
        ? compose(
            shuffle,
            append(sfunc),
            take(4),
            shuffle,
            uniq,
            without([sfunc])
          )(tmap[tabTutorial].funcs)
        : compose(
            shuffle,
            append(mq.a),
            take(4),
            uniq,
            without([mq.a]),
            map(() => {
              let sp = qtype.a.split("-")
              let _elm = getElm(qtype.a)
              let fn = ""
              if (includes(sp[0])(["fg", "fn"])) {
                if (is(Array)(_elm)) {
                  fn = _elm[0]
                } else {
                  fn = _elm
                }
              } else {
                fn = _elm
              }
              return fn
            })
          )(range(0, 10))

    setExamples(examples)
    setP(mq.p)
    setQ(mq.q)
    setO(mq.o)
    setA(mq.v)
    setVal(mq.a)
    setCF(sfunc)
    setJson("")
    setFuncOps(opts)
    setResult("-")
  }
  useEffect(() => {
    ;(async () => {
      setStars((await lf.getItem("tutorial-stars")) || {})
      setStarsE((await lf.getItem("exam-stars")) || {})
      setCatsE((await lf.getItem("exam-cats")) || {})
    })()
  }, [selectedFunc])
  useEffect(() => {
    if (tab !== "Exam") genQ()
  }, [selectedFunc, tab])
  useEffect(() => {
    if (tab === "Exam") genQ()
  }, [tabTutorial, tab])
  const Q = q === null ? null : JSON.stringify(q)
  const tabs = [
    { name: "Intro" },
    { name: "Tutorial" },
    { name: "Reference" },
    { name: "Exam" },
  ]
  const dones =
    tab === "Exam" ? compose(sum, values)(starsE) : compose(sum, values)(stars)
  const allstars = compose(
    multiply(tab === "Exam" ? 1 : 3),
    length,
    values
  )(funcs)
  const per = (dones / allstars) * 100
  const intros = [
    { key: "intro", title: "Get Started" },
    { key: "dashboard", title: "Dashboard" },
    { key: "playground", title: "Playground" },
  ]
  const imap = indexBy(prop("key"))(intros)
  const sidetop = (
    <>
      <Flex px={6} pb={2} align="center">
        <Box flex={1}>
          FPJSON{" "}
          <Box fontSize="12px" as="span">
            v.0.1.4
          </Box>
        </Box>
      </Flex>
      <Flex px={6} pb={4} align="center">
        <Flex justify="center" fontSize="10px" w="100%">
          {addIndex(map)((v, i) => (
            <Flex
              flex={1}
              px={2}
              py={1}
              justify="center"
              onClick={() => setTab(v.name)}
              sx={{
                borderRadius:
                  i === 0 ? "3px 0 0 3px" : i === 3 ? "0 3px 3px 0" : "0px",
                cursor: "pointer",
                ":hover": { opacity: 0.75 },
              }}
              color={v.name === tab ? "white" : "#222"}
              bg={v.name === tab ? "#39CCCC" : "#ccc"}
            >
              {v.name}
            </Flex>
          ))(tabs)}
        </Flex>
      </Flex>
    </>
  )
  const sidemenu =
    tab === "Intro" ? null : tab !== "Reference" ? (
      <Flex px={6} pb={4} justify="center" fontSize="12px">
        <Flex
          align="center"
          w="100%"
          bg="white"
          h="20px"
          sx={{ borderRadius: "5px" }}
        >
          <Flex
            fontSize="10px"
            align="center"
            w={per + "%"}
            bg="#39CCCC"
            height="20px"
            sx={{ borderRadius: "5px" }}
            px={per >= 40 ? 4 : 0}
            color="white"
            justify="center"
          >
            {per >= 40 ? (
              <Box>
                {dones} / {allstars}
              </Box>
            ) : (
              ""
            )}
          </Flex>
          <Flex
            flex={1}
            fontSize="10px"
            align="center"
            height="20px"
            sx={{ borderRadius: "5px" }}
            px={per < 40 ? 4 : 0}
            justify="center"
          >
            {per < 40 ? (
              <Box>
                {dones} / {allstars}
              </Box>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex
          px={2}
          align="center"
          height="20px"
          fontSize="10px"
          onClick={async () => {
            if (confirm("Would you like to reset your learning history?")) {
              if (tab === "Exam") {
                await lf.setItem("exam-cats", {})
                await lf.setItem("exam-stars", {})
                setStarsE({})
                setCatsE({})
              } else {
                await lf.setItem("tutorial-stars", {})
                setStars({})
              }
              genQ()
            }
          }}
          sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
        >
          Reset
        </Flex>
      </Flex>
    ) : (
      <Flex px={6} pb={4} justify="center" fontSize="12px">
        <Flex sx={{ position: "relative" }}>
          <Input
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            fontSize="12px"
            py={1}
            px={2}
            pr={8}
            bg="white"
            height="auto"
          />
          <Box
            as="i"
            className="fas fa-search"
            sx={{
              position: "absolute",
              right: "12px",
              top: "8px",
              zIndex: 100,
            }}
          />
        </Flex>
      </Flex>
    )
  const maxedout =
    (tab === "Exam" &&
      (starsE[tabTutorial] || 0) >= tmap[tabTutorial].funcs.length) ||
    (tab === "Tutorial" && (stars[selectedFunc] || 0) >= 3)
  const sidelist =
    tab === "Intro" ? (
      <Box>
        {compose(
          addIndex(map)((v, i) => {
            const done = false
            return (
              <>
                <Flex
                  fontSize="12px"
                  px={6}
                  py={1}
                  fontWeight={tabIntro === v.key ? "bold" : ""}
                  color={tabIntro === v.key ? "#39CCCC" : "#222"}
                  bg={tabIntro === v.key ? "#ddd" : ""}
                  sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                  onClick={() => {
                    setTabIntro(v.key)
                  }}
                >
                  <Flex flex={1}>
                    <Box w="20px">
                      <Box
                        as="i"
                        className={
                          done ? "fas fa-star" : "fas fa-chevron-right"
                        }
                        color={done ? "#39CCCC" : "#aaa"}
                      />
                    </Box>
                    {v.title}
                  </Flex>
                </Flex>
              </>
            )
          })
        )(intros)}
      </Box>
    ) : tab === "Exam" ? (
      <Box>
        {compose(
          addIndex(map)((v, i) => {
            const done = (starsE[v.key] || 0) >= tmap[v.key].funcs.length
            return (
              <>
                <Flex
                  fontSize="12px"
                  px={6}
                  py={1}
                  color={tabTutorial === v.key ? "white" : "#222"}
                  bg={tabTutorial === v.key ? "#39CCCC" : ""}
                  sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                  onClick={() => {
                    setTabTutorial(v.key)
                  }}
                >
                  <Flex flex={1}>
                    <Box w="20px">
                      <Box
                        as="i"
                        className={
                          done ? "fas fa-star" : "fas fa-chevron-right"
                        }
                        color={
                          done
                            ? v.key === tabTutorial
                              ? "white"
                              : "#39CCCC"
                            : "#aaa"
                        }
                      />
                    </Box>
                    {v.title}
                  </Flex>
                </Flex>
              </>
            )
          })
        )(tutorial)}
      </Box>
    ) : tab === "Tutorial" ? (
      <Box>
        {compose(
          addIndex(map)((v, i) => {
            return (
              <>
                <Flex
                  fontSize="12px"
                  px={6}
                  py={1}
                  color={tabTutorial === v.key ? "white" : "#222"}
                  bg={tabTutorial === v.key ? "#39CCCC" : "#ccc"}
                  sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                  onClick={() => {
                    setTabTutorial(v.key)
                  }}
                >
                  <Box flex={1}>
                    {i < 9 ? "0" : ""}
                    {i + 1}. {v.title}
                  </Box>
                </Flex>
                {tabTutorial === v.key
                  ? compose(
                      map(v => {
                        const done = (stars[v] || 0) >= 3
                        return (
                          <Flex
                            fontSize="12px"
                            px={6}
                            py={1}
                            fontWeight={selectedFunc === v ? "bold" : ""}
                            color={selectedFunc === v ? "#39CCCC" : "#222"}
                            bg={selectedFunc === v ? "#ddd" : ""}
                            sx={{
                              cursor: "pointer",
                              ":hover": { opacity: 0.75 },
                            }}
                            onClick={() => {
                              setSelectedFunc(v)
                            }}
                            align="center"
                          >
                            <Flex flex={1}>
                              <Box w="20px">
                                <Box
                                  as="i"
                                  className={
                                    done
                                      ? "fas fa-star"
                                      : "fas fa-chevron-right"
                                  }
                                  color={done ? "#39CCCC" : "#aaa"}
                                />
                              </Box>
                              {v}
                            </Flex>
                            <Flex align="center">
                              <Flex
                                fontSize="10px"
                                px={2}
                                bg="#39CCCC"
                                color="white"
                                sx={{
                                  cursor: "pointer",
                                  ":hover": { opacity: 0.75 },
                                  borderRadius: "3px",
                                }}
                              >
                                {cat[v] || "-"}
                              </Flex>
                            </Flex>
                          </Flex>
                        )
                      })
                    )(v.funcs)
                  : null}
              </>
            )
          })
        )(tutorial)}
      </Box>
    ) : (
      <Box>
        {compose(
          map(v => {
            const done = (stars[v] || 0) >= 3
            return (
              <Flex
                fontSize="12px"
                px={6}
                py={1}
                fontWeight={selectedFunc === v ? "bold" : ""}
                color={selectedFunc === v ? "#39CCCC" : "#222"}
                bg={selectedFunc === v ? "#ddd" : ""}
                sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                onClick={() => {
                  setSelectedFunc(v)
                }}
                align="center"
              >
                <Box w="25px">
                  <Box
                    as="i"
                    className={done ? "fas fa-star" : "fas fa-chevron-right"}
                    color={done ? "#39CCCC" : "#aaa"}
                  />
                </Box>
                <Box flex={1}>{v}</Box>
                <Flex align="center">
                  <Flex
                    fontSize="10px"
                    px={2}
                    bg="#39CCCC"
                    color="white"
                    sx={{
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                      borderRadius: "3px",
                    }}
                  >
                    {cat[v] || "-"}
                  </Flex>
                </Flex>
              </Flex>
            )
          }),
          sortBy(toLower),
          filter(v => {
            return (
              includes(v)(fmap) &&
              (searchKey === "" ||
                test(new RegExp(searchKey.toLowerCase(), "i"))(v))
            )
          }),
          keys
        )(funcs)}
      </Box>
    )
  const title = "FPJSON"
  const description = "Functional Programming in JSON"
  const image = "https://fpjson.weavedb.ac/cover.png"
  const header = (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <link
        key="shortcut-icon"
        rel="shortcut icon"
        href={`/favicon.ico`}
        type="image/x-icon"
      />
      <link key="icon" rel="icon" href={`/favicon.ico`} type="image/x-icon" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <meta key="twitter:image" property="twitter:image" content={image} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={image} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />
      <link
        key="fontawesome"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        rel="stylesheet"
      />
    </Head>
  )
  const breadcrumb = (
    <Flex p={4} fontSize="12px" align="center">
      <Box
        display={["block", null, null, "none"]}
        mr={4}
        fontSize="20px"
        sx={{
          cursor: "pointer",
          ":hover": {
            opacity: 0.75,
          },
        }}
        onClick={() => setMenuOpen(true)}
      >
        <Box as="i" className="fas fa-bars" />
      </Box>
      <Box>{tab}</Box>
      <Box mx={2} as="i" className="fas fa-chevron-right" color="#aaa" />
      {tab === "Intro" ? (
        <Box>{imap[tabIntro].title}</Box>
      ) : tab === "Exam" ? (
        <Box>{tmap[tabTutorial].title}</Box>
      ) : tab === "Tutorial" ? (
        <Box>{tmap[allfuncs[selectedFunc]].title}</Box>
      ) : (
        <Box>{cat[selectedFunc]}</Box>
      )}
      {tab === "Exam" || tab === "Intro" ? null : (
        <>
          <Box mx={2} as="i" className="fas fa-chevron-right" color="#aaa" />
          <Box>{selectedFunc}</Box>
        </>
      )}
      {tab === "Intro" ? null : (
        <Box ml={3}>
          {map(i => {
            const _stars =
              (tab === "Exam" ? starsE[tabTutorial] : stars[selectedFunc]) || 0
            return (
              <Box
                mx={1}
                as="i"
                color={i < _stars ? "#39CCCC" : ""}
                className={i < _stars ? "fas fa-star" : "far fa-star"}
              />
            )
          })(range(0, tab === "Exam" ? tmap[tabTutorial].funcs.length : 3))}
        </Box>
      )}
    </Flex>
  )
  const exam = (
    <Box style={{ padding: "20px" }} maxW="700px" w="100%">
      {notInit ? null : (
        <>
          <Flex
            justify="center"
            flex={1}
            mx={2}
            py={2}
            px={4}
            bg="white"
            color="#39CCCC"
            sx={{
              borderRadius: "5px",
              border: `1px solid #39CCCC`,
              fontWeight: "bold",
            }}
            mb={4}
          >
            {tab === "Exam" ? tmap[tabTutorial].title : selectedFunc}
          </Flex>
          {tab === "Exam" ? null : (
            <Flex
              fontSize="14px"
              mb={4}
              bg="#eee"
              p={4}
              sx={{
                borderRadius: "5px",
              }}
              mx={2}
            >
              <Box>
                <Flex
                  mb={1}
                  sx={{ textDecoration: "underline" }}
                  fontSize="12px"
                >
                  Ramda Doc
                </Flex>
                <Flex
                  sx={{ fontFamily: "'Roboto Mono', monospace" }}
                  mb={2}
                  wrap="wrap"
                >
                  <Box
                    color="#39CCCC"
                    as="a"
                    href={`https://ramdajs.com/docs/#${selectedFunc}`}
                    target="_blank"
                  >
                    <Box mr={2} as="a" className="fas fa-external-link-alt" />
                    ramdajs.com/docs/#{selectedFunc}
                  </Box>
                </Flex>
                <Flex
                  mb={1}
                  sx={{ textDecoration: "underline" }}
                  fontSize="12px"
                >
                  FPJSON Examples
                </Flex>
                {map(v => {
                  return (
                    <Flex
                      sx={{ fontFamily: "'Roboto Mono', monospace" }}
                      mb={2}
                      wrap="wrap"
                    >
                      <Flex mr={2} wrap="wrap">
                        {JSON.stringify(v.o)}
                      </Flex>
                      <Flex wrap="wrap" ml={2} color="#39CCCC">
                        = {JSON.stringify(v.v)}
                      </Flex>
                    </Flex>
                  )
                })(examples)}
              </Box>
            </Flex>
          )}
        </>
      )}
      {nomore ? null : (
        <>
          <Flex
            mb={1}
            mx={6}
            sx={{ textDecoration: "underline" }}
            fontSize="12px"
          >
            Exercise
          </Flex>
          <Flex
            justify="center"
            mt={4}
            mb={10}
            wrap="wrap"
            fontSize="14px"
            sx={{ lineHeight: "200%" }}
          >
            {q === null ? null : (
              <Flex wrap="wrap" sx={{ fontFamily: "'Roboto Mono', monospace" }}>
                <Flex mr={2} wrap="wrap">
                  {Q.split(`"???"`)[0]}
                  <Box color="tomato">???</Box>
                  {Q.split(`"???"`)[1]}
                </Flex>
                <Flex wrap="wrap" ml={2} color="#39CCCC">
                  = {JSON.stringify(a)}
                </Flex>
              </Flex>
            )}
          </Flex>
          {true ? null : (
            <Input
              mx={2}
              placeholder="Enter Your Answer"
              my={4}
              textAlign="center"
              value={json}
              onChange={e => {
                setJson(e.target.value)
                try {
                  let fn = e.target.value
                  const res = fpjson(assocPath(p, fn, q), {})
                  setResult(res)
                } catch (err) {
                  setResult("-")
                }
              }}
            />
          )}
          <Flex justify="center" mb={4} w="100%">
            {map(v => (
              <Flex
                justify="center"
                flex={1}
                mx={2}
                py={2}
                px={4}
                color={json === v ? "white" : "#39CCCC"}
                bg={json === v ? "#39CCCC" : "white"}
                sx={{
                  border: `1px solid ${json === v ? "white" : "#39CCCC"}`,
                  cursor: "pointer",
                  borderRadius: "5px",
                  ":hover": {
                    opacity: 0.75,
                    bg: "#39CCCC",
                    color: "white",
                  },
                  fontFamily: "'Roboto Mono', monospace",
                }}
                onClick={async () => {
                  if (tab === "Exam") {
                    const json = v
                    if (!/^\s*$/.test(json)) {
                      const result = fpjson(assocPath(p, v, q), {})
                      const result2 = fpjson(o, {})
                      const ok = equals(result, result2)
                      let _cats = null
                      if (ok) {
                        let _stars = clone(starsE)
                        if (isNil(_stars[tabTutorial])) _stars[tabTutorial] = 0
                        if (
                          _stars[tabTutorial] < tmap[tabTutorial].funcs.length
                        ) {
                          _stars[tabTutorial] += 1
                          _cats = assoc(cf, true)(catsE)
                          await lf.setItem("exam-cats", _cats)
                          await lf.setItem("exam-stars", _stars)
                          setStarsE(_stars)
                          setCatsE(_cats)
                        }
                      }
                      setLastQ({
                        a,
                        o,
                        q,
                        p,
                        json: json,
                        ok,
                        val,
                      })
                      genQ(_cats)
                    }
                  } else {
                    setJson(v)
                    try {
                      const res = fpjson(assocPath(p, v, q), {})
                      console.log(res)
                      if (is(Function, res)) {
                        setResult("-")
                      } else {
                        setResult(res)
                      }
                    } catch (err) {
                      setResult("-")
                    }
                  }
                }}
              >
                {JSON.stringify(v)}
              </Flex>
            ))(funcOps)}
          </Flex>
        </>
      )}
      {tab === "Exam" ? null : (
        <>
          <Flex justify="center" mb={4} w="100%">
            <Flex
              mx={2}
              justify="center"
              flex={1}
              py={2}
              px={4}
              color={!/^\s*$/.test(json) ? "white" : "#666"}
              bg={!/^\s*$/.test(json) ? "#39CCCC" : "#ddd"}
              sx={{
                cursor: !/^\s*$/.test(json) ? "pointer" : "default",
                borderRadius: "5px",
                ":hover": { opacity: 0.75 },
              }}
              onClick={async () => {
                if (!/^\s*$/.test(json)) {
                  const result2 = fpjson(o, {})
                  const ok = equals(result, result2)
                  if (ok) {
                    let _stars = clone(stars)
                    if (isNil(_stars[selectedFunc])) _stars[selectedFunc] = 0
                    if (_stars[selectedFunc] < 3) {
                      _stars[selectedFunc] += 1
                      await lf.setItem("tutorial-stars", _stars)
                      setStars(_stars)
                    }
                  }
                  setLastQ({
                    a,
                    o,
                    q,
                    p,
                    json: json,
                    ok,
                    val,
                  })
                  genQ()
                }
              }}
            >
              Submit
            </Flex>
          </Flex>
          <Flex justify="center" mb={4} fontSize="14px">
            <Flex wrap="wrap" sx={{ lineHeight: "200%" }}>
              {q === null ? null : (
                <Flex
                  sx={{ fontFamily: "'Roboto Mono', monospace" }}
                  wrap="wrap"
                >
                  <Flex mr={2} wrap="wrap">
                    {Q.split(`"???"`)[0]}
                    <Box color="tomato">
                      {!isNil(json) ? JSON.stringify(json) : "???"}
                    </Box>
                    {Q.split(`"???"`)[1]}
                  </Flex>
                  <Flex wrap="wrap" ml={2} color="#39CCCC">
                    = {JSON.stringify(result)}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
      {isNil(lastQ) ? null : (
        <Flex
          fontSize="14px"
          mt={10}
          mb={4}
          bg="#eee"
          p={4}
          sx={{
            borderRadius: "10px",
            border: `3px solid ${lastQ.ok ? "#39CCCC" : "tomato"}`,
          }}
          mx={2}
        >
          <Box>
            <Flex mb={1} sx={{ textDecoration: "underline" }} fontSize="12px">
              Last Question
            </Flex>
            <Flex
              sx={{ fontFamily: "'Roboto Mono', monospace" }}
              mb={2}
              wrap="wrap"
            >
              <Flex mr={2} wrap="wrap">
                {JSON.stringify(lastQ.q).split(`"???"`)[0]}
                <Box color="tomato">{"???"}</Box>
                {JSON.stringify(lastQ.q).split(`"???"`)[1]}
              </Flex>
              = {JSON.stringify(lastQ.a)}
            </Flex>
            <Flex mb={1} sx={{ textDecoration: "underline" }} fontSize="12px">
              Last Possible Answer
            </Flex>
            <Flex
              sx={{ fontFamily: "'Roboto Mono', monospace" }}
              mb={2}
              wrap="wrap"
            >
              <Flex mr={2} wrap="wrap">
                {JSON.stringify(lastQ.o)}
              </Flex>{" "}
              = {JSON.stringify(lastQ.a)}
            </Flex>
            <Flex mb={1} align="center" fontSize="12px">
              <Box mr={2} sx={{ textDecoration: "underline" }}>
                Your Answer
              </Box>
            </Flex>
            <Flex
              sx={{ fontFamily: "'Roboto Mono', monospace" }}
              align="center"
            >
              <Box
                as="i"
                className={`${lastQ.ok ? "far fa-circle" : "fas fa-times"}`}
                color={lastQ.ok ? "#39CCCC" : "tomato"}
                mr={2}
              />
              <Flex>{JSON.stringify(lastQ.json)}</Flex>
              {lastQ.ok ? null : (
                <>
                  <Box
                    mx={2}
                    as="i"
                    className="fas fa-chevron-right"
                    color="#aaa"
                  />
                  <Box
                    as="i"
                    className={"far fa-circle"}
                    color={"#39CCCC"}
                    mx={2}
                  />
                  <Flex sx={{ fontFamily: "'Roboto Mono', monospace" }}>
                    {JSON.stringify(lastQ.val)}
                  </Flex>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      )}
      {!maxedout ? null : (
        <Flex
          justify="center"
          my={10}
          wrap="wrap"
          w="100%"
          fontSize="14px"
          sx={{ lineHeight: "200%" }}
          px={3}
        >
          <Flex
            justify="center"
            py={2}
            px={4}
            w="100%"
            color="white"
            align="center"
            sx={{
              bg: "#39CCCC",
              color: "white",
              borderRadius: "5px",
              border: "1px solid #39CCCC",
              ":hover": { opacity: 0.75 },
              cursor: "pointer",
            }}
            onClick={() => {
              if (tab === "Tutorial") {
                let _break = false
                for (let k in tmap) {
                  for (let v of tmap[k].funcs) {
                    if ((stars[v] || 0) < 3) {
                      setSelectedFunc(v)
                      _break = true
                      break
                    }
                  }
                  if (_break) break
                }
              } else {
                const _catsE = catsE
                let next = null
                for (let k in tmap) {
                  let funcs = compose(filter(v => isNil(_catsE[v])))(
                    tmap[k].funcs
                  )
                  if (funcs.length !== 0) {
                    next = k
                    setTabTutorial(next)
                    break
                  }
                }
              }
            }}
          >
            To Next
            <Box ml={3} as="i" className="fas fa-chevron-right" />
          </Flex>
        </Flex>
      )}
    </Box>
  )
  const imd = converter.makeHtml(intromd)
  const $ = cheerio.load(`<div id="outerHTML">${imd}</div>`)
  try {
    $("pre").each(function () {
      $(this)
        .find("code")
        .each(function () {
          let language
          try {
            const classes = $(this).attr("class").split(" ")
            for (let v of classes) {
              if (v.match(/language-/) !== null) {
                language = v.split("-").slice(1).join("-")
              }
            }
          } catch (e) {}
          $(this).addClass("hljs")
          try {
            $(this).html(
              isNil(language)
                ? hljs.highlightAuto(entities.decodeHTML($(this).html())).value
                : hljs.highlight(language, entities.decodeHTML($(this).html()))
                    .value
            )
          } catch (e) {}
        })
    })
  } catch (e) {
    console.log(e)
  }

  const intro = (
    <>
      <Box>
        <Box
          style={{ padding: "20px" }}
          maxW="700px"
          w="100%"
          className="markdown-body"
        >
          <Github />
          <Highlight />
          <Box dangerouslySetInnerHTML={{ __html: $("#outerHTML").html() }} />
          <Flex justify="center" mt={10} pb={8}>
            <Flex
              justify="center"
              flex={1}
              color="white"
              bg="#39CCCC"
              onClick={() => setTabIntro("dashboard")}
              py={2}
              px={4}
              mx={2}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                ":hover": {
                  opacity: 0.75,
                  bg: "#39CCCC",
                  color: "white",
                },
              }}
            >
              Dashboard
            </Flex>

            <Flex
              justify="center"
              flex={1}
              color="white"
              bg="#39CCCC"
              onClick={() => setTab("Tutorial")}
              py={2}
              px={4}
              mx={2}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                ":hover": {
                  opacity: 0.75,
                  bg: "#39CCCC",
                  color: "white",
                },
              }}
            >
              Tutorials
            </Flex>
            <Flex
              justify="center"
              flex={1}
              color="white"
              bg="#39CCCC"
              onClick={() => setTab("Tutorial")}
              py={2}
              px={4}
              mx={2}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                ":hover": {
                  opacity: 0.75,
                  bg: "#39CCCC",
                  color: "white",
                },
              }}
            >
              Exam
            </Flex>
            <Flex
              justify="center"
              flex={1}
              color="white"
              bg="#39CCCC"
              onClick={() => setTabIntro("playground")}
              py={2}
              px={4}
              mx={2}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                ":hover": {
                  opacity: 0.75,
                  bg: "#39CCCC",
                  color: "white",
                },
              }}
            >
              Playground
            </Flex>
          </Flex>
        </Box>
        <Flex justify="center" pb={6}>
          <Box
            as="a"
            target="_blank"
            href="https://twitter.com/weave_db"
            color="#39CCCC"
            sx={{ textDecoration: "none" }}
          >
            Built by WeaveDB
          </Box>
        </Flex>
      </Box>
    </>
  )
  const playground = (
    <Flex
      direction="column"
      align="center"
      style={{ paddingX: "20px", paddingBottom: "20px" }}
      w="100%"
    >
      <Flex fontWeight="bold" fontSize="25px" color="#39CCCC" mb={6}>
        Coming Soon...
      </Flex>
    </Flex>
  )
  const dashboard = (
    <Flex
      direction="column"
      align="center"
      style={{ paddingX: "20px", paddingBottom: "20px" }}
      w="100%"
    >
      <Flex fontWeight="bold" fontSize="25px" color="#39CCCC" mb={6}>
        Your Learning Progress ({dones} / {allstars})
      </Flex>
      <Flex wrap="wrap" justify="center">
        {compose(
          values,
          map(v => {
            const funcs = tmap[v.key].funcs
            const per = Math.floor(
              (compose(
                sum,
                map(v => stars[v] || 0)
              )(funcs) /
                (funcs.length * 3)) *
                100
            )
            const estars = starsE[v.key] || 0
            const pcolors = {
              math: "#0074D9",
              type: "#B10DC9",
              relation: "#F012BE",
              logic: "#FF4136",
              list: "#39CCCC",
              object: "#FF851B",
              function: "#3D9970",
              string: "#85144b",
            }
            return (
              <Flex p={3}>
                <Flex
                  sx={{ borderRadius: "10px" }}
                  width="300px"
                  bg={per === 100 ? "#3D9970" : "#39CCCC"}
                  color="white"
                  p={3}
                  direction="column"
                >
                  <Flex justify="center" mb={2} fontWeight="bold">
                    {v.title}
                  </Flex>
                  <Flex px={3}>
                    <Flex
                      align="center"
                      w="100%"
                      bg="white"
                      h="10px"
                      sx={{ borderRadius: "5px" }}
                    >
                      <Flex
                        fontSize="10px"
                        align="center"
                        w={per + "%"}
                        bg="white"
                        height="10px"
                        sx={{ borderRadius: "5px" }}
                        color="white"
                        justify="center"
                      ></Flex>
                      <Flex
                        flex={1}
                        fontSize="10px"
                        align="center"
                        height="10px"
                        bg="#CCC"
                        sx={{ borderRadius: "5px" }}
                        justify="center"
                      ></Flex>
                    </Flex>
                  </Flex>
                  <Box p={3}>
                    {map(v2 => {
                      const _stars = stars[v2] || 0
                      return (
                        <Flex
                          onClick={() => {
                            setTab("Tutorial")
                            setSelectedFunc(v2)
                          }}
                          align="center"
                          sx={{
                            cursor: "pointer",
                            ":hover": { opacity: 0.75 },
                          }}
                        >
                          <Box flex={1}>{v2}</Box>
                          <Flex fontSize="12px">
                            {addIndex(map)((v3, i) => {
                              return (
                                <Box
                                  mx={1}
                                  as="i"
                                  color={"white"}
                                  className={
                                    _stars > i ? "fas fa-star" : "far fa-star"
                                  }
                                />
                              )
                            })(range(0, 3))}
                          </Flex>
                        </Flex>
                      )
                    })(v.funcs)}
                  </Box>
                  <Box flex={1} />
                  <Flex
                    mt={4}
                    px={3}
                    align="center"
                    sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                    onClick={() => {
                      setTab("Exam")
                      setTabTutorial(v.key)
                    }}
                  >
                    <Box sx={{ textDecoration: "underline" }} flex={1} mr={6}>
                      Exam
                    </Box>
                    <Flex fontSize="12px" wrap="wrap" justify="flex-end">
                      {addIndex(map)((v3, i) => {
                        return (
                          <Box
                            sx={{ lineHeight: "150%" }}
                            mx={1}
                            as="i"
                            color={"white"}
                            className={
                              estars > i ? "fas fa-star" : "far fa-star"
                            }
                          />
                        )
                      })(range(0, tmap[v.key].funcs.length))}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            )
          })
        )(tmap)}
      </Flex>
    </Flex>
  )
  return (
    <ChakraProvider>
      {header}
      <Box
        color="#222"
        sx={{
          zIndex: 10,
          position: "fixed",
          w: "300px",
          h: "100%",
          overflowY: "auto",
        }}
        bg="#eee"
        py={4}
        display={[menuOpen ? "block" : "none", null, null, "block"]}
      >
        {sidetop}
        {sidemenu}
        {sidelist}
      </Box>
      <Box sx={{ ml: [0, null, null, "300px"] }}>
        {breadcrumb}
        <Flex justify="center">
          {tab === "Intro"
            ? tabIntro === "intro"
              ? intro
              : tabIntro === "dashboard"
              ? dashboard
              : playground
            : exam}
        </Flex>
      </Box>
      <Box
        display={menuOpen ? "block" : "none"}
        position="fixed"
        sx={{ top: 0, left: 0, opacity: 0.5, zIndex: 9, cursor: "pointer" }}
        bg="black"
        h="100%"
        w="100%"
        onClick={() => setMenuOpen(false)}
      />
    </ChakraProvider>
  )
}

export default App
