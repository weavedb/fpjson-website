# FPJSON

FPJSON is a programming language agnostic JSON-based functional programming language.

- The whole code is just a JSON array
- Functional Programming
- No overhead due to programming language implementation details

In other words, you don't have to worry about any programming language specifications.

Instead you can just focus on building pure logics for data manipuration.

Since it's just a JSON array, it can be ported to any programming language environment.

## Some examples

```javascript
/* addition */
["add", 1, 2] // = 3

/* map */
[["map", ["inc"]], [1, 2, 3]] // = [4, 5, 6]

/* difference */
["difference", [1, 2, 3], [2, 3, 4]] = [4]
```
There are more than 250 pre-defined functions. And you can even extend that library.
