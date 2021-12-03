[![CI](https://github.com/bradhowes/remarkable-katex/workflows/CI/badge.svg)](https://github.com/bradhowes/remarkable-katex)
[![License: MIT](https://img.shields.io/badge/License-MIT-A31F34.svg)](https://opensource.org/licenses/MIT)

# Overview

This is a [Remarkable](https://github.com/jonschlinkert/remarkable) plugin that converts
[LaTeX math expressions](http://web.ift.uib.no/Teori/KURS/WRK/TeX/symALL.html) between `$...$` (inline) or
`$$...$$` (block) delimiters into math HTML. It should not interfere with any other Markdown processing.

I use this to perform server-side math expression rendering for my blog, [Keystroke
Countdown](https://keystrokecountdown.com).

# To Use

Install this package using `npm`:

```bash
% npm install [-s] remarkable-katex
```

Assuming you already have `Remarkable` installed, one way to use would be like so:

**CommonJS**
```javascript
var Remarkable = require('remarkable');
var plugin = require('remarkable-katex');
var md = new Remarkable();
md.use(plugin);
```

**ES6**
```javascript
import { Remarkable } from 'remarkable';
import rkatex from 'remarkable-katex';

var md = new Remarkable();
md.use(rkatex);
```

# Configuration

Accepts a `delimiter` option that defines the 1-character delimiter to use when recognizing KaTeX spans. Default
is the `$` character.

```
{delimiter: '$'}
```

# Dependencies

* [KaTeX](https://github.com/Khan/KaTeX) -- performs the rendering of the LaTeX commands.

# Tests

There are a set of [Vows](http://vowsjs.org) in [index.test.js](index.test.js). To run:

```bash
% npm test
```

> **NOTE**: if this fails, there may be a path issue with `vows` executable. See [package.json](package.json).
