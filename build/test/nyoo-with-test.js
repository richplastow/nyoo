// Generated by CoffeeScript 1.9.3

/*! Nyoo 0.0.3 //// MIT Licence //// http://nyoo.richplastow.com/ */

(function() {
  var Main, Thing, Tudor, Wrong1, Wrong10, Wrong11, Wrong12, Wrong13, Wrong2, Wrong3, Wrong4, Wrong5, Wrong6, Wrong7, Wrong8, Wrong9, brittlize, nyoo, parseMethodSignature, parsePropSignature, tudor, ª, ªA, ªB, ªC, ªE, ªF, ªN, ªO, ªR, ªS, ªU, ªV, ªX, ªex, ªhas, ªredefine, ªtype, ªuid,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ªC = 'Nyoo';

  ªV = '0.0.3';

  ªA = 'array';

  ªB = 'boolean';

  ªE = 'error';

  ªF = 'function';

  ªN = 'number';

  ªO = 'object';

  ªR = 'regexp';

  ªS = 'string';

  ªU = 'undefined';

  ªX = 'null';

  ª = console.log.bind(console);

  ªex = function(x, a, b) {
    var pos;
    if (-1 === (pos = a.indexOf(x))) {
      return x;
    } else {
      return b.charAt(pos);
    }
  };

  ªhas = function(h, n, t, f) {
    if (t == null) {
      t = true;
    }
    if (f == null) {
      f = false;
    }
    if (-1 !== h.indexOf(n)) {
      return t;
    } else {
      return f;
    }
  };

  ªtype = function(x) {
    return {}.toString.call(x).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  };

  ªuid = function(p) {
    return p + '_' + (Math.random() + '1111111111111111').slice(2, 18);
  };

  ªredefine = function(obj, name, value, kind) {
    switch (kind) {
      case 'constant':
        return Object.defineProperty(obj, name, {
          value: value,
          enumerable: true
        });
      case 'private':
        return Object.defineProperty(obj, name, {
          value: value,
          enumerable: false
        });
    }
  };

  Main = (function() {
    Main.prototype.C = ªC;

    Main.prototype.toString = function() {
      return "[object " + this.C + "]";
    };

    function Main(config) {
      if (config == null) {
        config = {};
      }
      this.classes = {};
    }

    Main.prototype.add = function(Orig, name) {
      var Brittle;
      if (ªF !== typeof Orig) {
        throw new Error("`Orig` is type " + (ªtype(Orig)) + ", not function");
      }
      if (ªU !== typeof name) {
        if (ªS !== typeof name) {
          throw new Error("`name` is type " + (ªtype(name)) + ", not string");
        }
        if (!/^[A-Z][_0-9A-Za-z]{0,23}$/.test(name)) {
          throw new Error("`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/");
        }
      } else {
        if (ªS !== ªtype(Orig.prototype.C)) {
          throw new Error("`Orig::C` is type " + (ªtype(Orig.prototype.C)) + ", not string");
        }
        if (!/^[A-Z][_0-9A-Za-z]{0,23}$/.test(Orig.prototype.C)) {
          throw new Error("`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/");
        }
        name = Orig.prototype.C;
      }
      Brittle = brittlize(Orig);
      this[name] = function() {
        var inst;
        inst = new Brittle;
        Object.seal(inst);
        return inst;
      };
      this.classes[name] = Brittle;
      return this;
    };

    return Main;

  })();

  brittlize = function(Orig) {
    var Brittle, fn1, fn2, init, key, memName, memType, memValue, method, methods, name, props, ref, ref1, ref2, signature, type, val;
    props = {};
    methods = {};
    ref = Orig.prototype;
    for (key in ref) {
      val = ref[key];
      if ('_public' === key.slice(-7)) {
        memName = key.slice(0, -7);
        memValue = Orig.prototype[memName];
        memType = ªtype(memValue);
        if (ªU === memType) {
          throw new Error("No such member as " + memName);
        }
        if (ªF === memType) {
          methods[memName] = parseMethodSignature(val, memName, memValue);
        } else {
          props[memName] = parsePropSignature(val, memName, memValue, memType);
        }
      }
    }
    Brittle = (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        var init, name, ref1, type;
        for (name in props) {
          ref1 = props[name], type = ref1[0], init = ref1[1];
          this[name + '_value'] = init;
        }
        _Class.__super__.constructor.call(this);
      }

      return _Class;

    })(Orig);
    fn1 = function(name, type, init) {
      return Object.defineProperty(Brittle.prototype, name, {
        get: function() {
          return this[name + '_value'];
        },
        set: function(v) {
          return this[name + '_value'] = v;
        }
      });
    };
    for (name in props) {
      ref1 = props[name], type = ref1[0], init = ref1[1];
      fn1(name, type, init);
    }
    fn2 = function(name, signature, method) {
      return Brittle.prototype[name] = function() {
        return method.apply(this, arguments);
      };
    };
    for (name in methods) {
      ref2 = methods[name], signature = ref2[0], method = ref2[1];
      fn2(name, signature, method);
    }
    return Brittle;
  };

  parsePropSignature = function(signature, memName, memValue, memType) {
    var j, len, match, memTypeOk, type, types;
    if (ªS !== typeof signature) {
      throw new Error("`signature` is type " + (ªtype(signature)) + ", not string");
    }
    match = signature.match(/^<([|A-Za-z0-9]{1,40})>\s+(.{1,40})$/);
    if (null === match) {
      throw new Error("`signature` is not valid");
    }
    types = match[1].split('|');
    memTypeOk = false;
    for (j = 0, len = types.length; j < len; j++) {
      type = types[j];
      if (type === memType) {
        memTypeOk = true;
        break;
      }
    }
    if (!memTypeOk) {
      throw new Error(memName + " is type " + memType + ", which fails " + types);
    }
    return [types, memValue];
  };

  parseMethodSignature = function(signature, memName, memValue) {
    return [[[false, ['string', 'number']], [true, ['string']]], memValue];
  };

  if (ªF === typeof define && define.amd) {
    define(function() {
      return Main;
    });
  } else if (ªO === typeof module && module && module.exports) {
    module.exports = Main;
  } else {
    this[ªC] = Main;
  }

  Tudor = (function() {
    Tudor.prototype.I = 'Tudor';

    Tudor.prototype.toString = function() {
      return "[object " + I + "]";
    };

    Tudor.prototype.articles = [];

    function Tudor(opt) {
      this.opt = opt != null ? opt : {};
      this["do"] = bind(this["do"], this);
      switch (this.opt.format) {
        case 'html':
          this.pageHead = function(summary) {
            return "<style>\n  body     { font-family: sans-serif; }\n  a        { outline: 0; }\n  b        { display: inline-block; width: .7em }\n\n  b.pass              { color: #393 }\n  b.fail              { color: #bbb }\n  article.fail b.pass { color: #bbb }\n  section.fail b.pass { color: #bbb }\n\n  pre      { padding: .5em; margin: .2em 0; border-radius: 4px; }\n  pre.fn   { background-color: #fde }\n  pre.pass { background-color: #cfc }\n  pre.fail { background-color: #d8e0e8 }\n\n  article  { margin-bottom: .5rem }\n  article h2 { padding-left:.5rem; margin:0; font-weight:normal }\n  article.pass { border-left: 5px solid #9c9 }\n  article.fail { border-left: 5px solid #9bf }\n  article.fail h2 { margin-bottom: .5rem }\n  article.pass >div { display: none }\n\n  section  { margin-bottom: .5rem }\n  section h3   { padding-left: .5rem; margin: 0; }\n  section.pass { border-left: 3px solid #9c9 }\n  section.fail { border-left: 3px solid #9bf }\n  section.fail h3 { margin-bottom: .5rem }\n  section.pass >div { display: none }\n\n  article.fail section.pass { border-left-color: #ccc }\n\n  div      { padding-left: .5em; }\n  div.fail { border-left: 3px solid #9bf; font-size: .8rem }\n  div h4   { margin: 0 }\n  div h4 { font: normal .8rem/1.2rem monaco, monospace }\n  div.fail, div.fail h4 { margin: .5rem 0 }\n\n</style>\n<h4><a href=\"#end\" id=\"top\">\u2b07</a>  " + summary + "</h4>";
          };
          this.pageFoot = function(summary) {
            return "<h4><a href=\"#top\" id=\"end\">\u2b06</a>  " + summary + "</h4>\n<script>\n  document.title='" + (summary.replace(/<\/?[^>]+>/g, '')) + "';\n</script>";
          };
          this.articleHead = function(heading, fail) {
            return ("<article class=\"" + (fail ? 'fail' : 'pass') + "\">") + ("<h2>" + (fail ? this.cross : this.tick) + heading + "</h2><div>");
          };
          this.articleFoot = '</div></article>';
          this.sectionHead = function(heading, fail) {
            return ("<section class=\"" + (fail ? 'fail' : 'pass') + "\">") + ("<h3>" + (fail ? this.cross : this.tick) + heading + "</h3><div>");
          };
          this.sectionFoot = '</div></section>';
          this.jobFormat = function(heading, result) {
            return ("<div class=\"" + (result ? 'fail' : 'pass') + "\">") + ("<h4>" + (result ? this.cross : this.tick) + heading + "</h4>") + ("" + (result ? this.formatError(result) : '')) + "</div>";
          };
          this.tick = '<b class="pass">\u2713</b> ';
          this.cross = '<b class="fail">\u2718</b> ';
          break;
        default:
          this.pageHead = function(summary) {
            return "" + summary;
          };
          this.pageFoot = function(summary) {
            return "\n" + summary;
          };
          this.articleHead = function(heading, fail) {
            return "\n" + (fail ? this.cross : this.tick) + " " + heading + "\n===" + (new Array(heading.length).join('=')) + "\n";
          };
          this.articleFoot = '';
          this.sectionHead = function(heading, fail) {
            return "\n" + (fail ? this.cross : this.tick) + " " + heading + "\n---" + (new Array(heading.length).join('-')) + "\n";
          };
          this.sectionFoot = '';
          this.jobFormat = function(heading, result) {
            return ((result ? this.cross : this.tick) + " " + heading) + ("" + (result ? '\n' + this.formatError(result) : ''));
          };
          this.jobFoot = '';
          this.tick = '\u2713';
          this.cross = '\u2718';
      }
    }

    Tudor.prototype.add = function(lines) {
      var article, i, line, runner, section;
      article = {
        sections: []
      };
      runner = null;
      section = null;
      if (ªA !== ªtype(lines)) {
        throw new Error("`lines` isn’t an array");
      }
      if (0 === lines.length) {
        throw new Error("`lines` has no elements");
      }
      if (ªS !== ªtype(lines[0])) {
        throw new Error("`lines[0]` isn’t a string");
      }
      article.heading = lines.shift();
      i = 0;
      while (i < lines.length) {
        line = lines[i];
        switch (ªtype(line)) {
          case ªO:
            if (!line.runner) {
              throw new Error("Errant object");
            }
            runner = line.runner;
            break;
          case ªF:
            section.jobs.push(line);
            break;
          case ªS:
            if (this.isAssertion(lines[i + 1], lines[i + 2])) {
              if (!section) {
                throw new Error("Cannot add an assertion here");
              }
              section.jobs.push([runner, line, lines[++i], lines[++i]]);
            } else {
              section = {
                heading: line,
                jobs: []
              };
              article.sections.push(section);
            }
        }
        i++;
      }
      return this.articles.push(article);
    };

    Tudor.prototype["do"] = function() {
      var actual, art, artFail, artPass, article, e, error, expect, heading, j, job, k, l, len, len1, len2, mock, pge, pgeFail, pgePass, ref, ref1, ref2, result, runner, sec, secFail, secPass, section, summary;
      pge = [];
      mock = null;
      pgePass = pgeFail = 0;
      ref = this.articles;
      for (j = 0, len = ref.length; j < len; j++) {
        article = ref[j];
        art = [];
        artPass = artFail = 0;
        ref1 = article.sections;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          section = ref1[k];
          sec = [];
          secPass = secFail = 0;
          ref2 = section.jobs;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            job = ref2[l];
            switch (ªtype(job)) {
              case ªF:
                try {
                  mock = job(mock);
                } catch (_error) {
                  e = _error;
                  error = e.message;
                }
                if (error) {
                  sec.push(this.formatMockModifierError(job, error));
                }
                break;
              case ªA:
                runner = job[0], heading = job[1], expect = job[2], actual = job[3];
                result = runner(expect, actual, mock);
                if (!result) {
                  sec.push(this.jobFormat("" + (this.sanitize(heading))));
                  pgePass++;
                  artPass++;
                  secPass++;
                } else {
                  sec.push(this.jobFormat("" + (this.sanitize(heading)), result));
                  pgeFail++;
                  artFail++;
                  secFail++;
                }
            }
          }
          sec.unshift(this.sectionHead("" + (this.sanitize(section.heading)), secFail));
          sec.push(this.sectionFoot);
          art = art.concat(sec);
        }
        art.unshift(this.articleHead("" + (this.sanitize(article.heading)), artFail));
        art.push(this.articleFoot);
        pge = pge.concat(art);
        summary = pgeFail ? this.cross + " FAILED " + pgeFail + "/" + (pgePass + pgeFail) : this.tick + " Passed " + pgePass + "/" + (pgePass + pgeFail);
      }
      pge.unshift(this.pageHead(summary));
      pge.push(this.pageFoot(summary));
      return pge.join('\n');
    };

    Tudor.prototype.formatError = function(result) {
      switch (result.length + "-" + this.opt.format) {
        case '2-html':
          return result[0] + "\n<pre class=\"fail\">" + (this.sanitize(result[1].message)) + "</pre>";
        case '2-plain':
          return result[0] + "\n" + (this.sanitize(result[1].message));
        case '3-html':
          return "<pre class=\"fail\">" + (this.sanitize(this.reveal(result[0]))) + "</pre>\n..." + result[1] + "...\n<pre class=\"pass\">" + (this.sanitize(this.reveal(result[2]))) + "</pre>";
        case '3-plain':
          return (this.sanitize(this.reveal(result[0]))) + "\n..." + result[1] + "...\n" + (this.sanitize(this.reveal(result[2])));
        case '4-html':
          return "<pre class=\"fail\">" + (this.sanitize(this.reveal(result[0]))) + " (" + (ªtype(result[0])) + ")</pre>\n..." + result[1] + "...\n<pre class=\"pass\">" + (this.sanitize(this.reveal(result[2]))) + " (" + (ªtype(result[2])) + ")</pre>";
        case '4-plain':
          return (this.sanitize(this.reveal(result[0]))) + " (" + (ªtype(result[0])) + ")\n..." + result[1] + "...\n" + (this.sanitize(this.reveal(result[2]))) + " (" + (ªtype(result[2])) + ")";
        default:
          throw new Error("Cannot process '" + result.length + "-" + this.opt.format + "'");
      }
    };

    Tudor.prototype.formatMockModifierError = function(fn, error) {
      switch (this.opt.format) {
        case 'html':
          return "<pre class=\"fn\">" + (this.sanitize(fn + '')) + "</pre>\n...encountered an exception:\n<pre class=\"fail\">" + (this.sanitize(error)) + "</pre>";
        default:
          return (this.sanitize(fn + '')) + "\n...encountered an exception:\n" + (this.sanitize(error));
      }
    };

    Tudor.prototype.reveal = function(value) {
      return value != null ? value.toString().replace(/^\s+|\s+$/g, function(match) {
        return '\u00b7' + (new Array(match.length)).join('\u00b7');
      }) : void 0;
    };

    Tudor.prototype.sanitize = function(value) {
      switch (this.opt.format) {
        case 'html':
          return value != null ? value.toString().replace(/</g, '&lt;') : void 0;
        default:
          return value;
      }
    };

    Tudor.prototype["throw"] = {
      runner: function(expect, actual, mock) {
        var e, error;
        error = false;
        try {
          actual(mock);
        } catch (_error) {
          e = _error;
          error = e;
        }
        if (!error) {
          return [
            'No exception thrown, expected', {
              message: expect
            }
          ];
        } else if (expect !== error.message) {
          return [error.message, 'was thrown, but expected', expect];
        }
      }
    };

    Tudor.prototype.equal = {
      runner: function(expect, actual, mock) {
        var e, error, result;
        error = false;
        try {
          result = actual(mock);
        } catch (_error) {
          e = _error;
          error = e;
        }
        if (error) {
          return ['Unexpected exception', error];
        } else if (expect !== result) {
          if (result + '' === expect + '') {
            return [result, 'was returned, but expected', expect, true];
          } else {
            return [result, 'was returned, but expected', expect];
          }
        }
      }
    };

    Tudor.prototype.is = {
      runner: function(expect, actual, mock) {
        var e, error, result;
        error = false;
        try {
          result = actual(mock);
        } catch (_error) {
          e = _error;
          error = e;
        }
        if (error) {
          return ['Unexpected exception', error];
        } else if (expect !== ªtype(result)) {
          return ["type " + (ªtype(result)), 'was returned, but expected', "type " + expect];
        }
      }
    };

    Tudor.prototype.match = {
      runner: function(expect, actual, mock) {
        var e, error, result;
        error = false;
        try {
          result = actual(mock);
        } catch (_error) {
          e = _error;
          error = e;
        }
        if (error) {
          return ['Unexpected exception', error];
        } else if (ªF !== typeof expect.test) {
          return [
            '`test()` is not a function', {
              message: expect
            }
          ];
        } else if (!expect.test('' + result)) {
          return ['' + result, 'failed test', expect];
        }
      }
    };

    Tudor.prototype.isAssertion = function(line1, line2) {
      if (ªF !== ªtype(line2)) {
        return false;
      }
      if ((ªO === ªtype(line1)) && ªF === ªtype(line1.runner)) {
        return false;
      }
      return true;
    };

    return Tudor;

  })();

  tudor = new Tudor({
    format: ªO === typeof window ? 'html' : 'plain'
  });

  Main.runTest = tudor["do"];

  tudor.add([
    "01 Nyoo Constructor Usage", "The class and instance are expected types", tudor.is, "The class is a function", ªF, function() {
      return Main;
    }
  ]);

  Wrong1 = (function() {
    function Wrong1() {}

    Wrong1.prototype.C = true;

    return Wrong1;

  })();

  Wrong2 = (function() {
    function Wrong2() {}

    Wrong2.prototype.C = '';

    return Wrong2;

  })();

  Wrong3 = (function() {
    function Wrong3() {}

    Wrong3.prototype.C = 'wrong3';

    return Wrong3;

  })();

  Wrong4 = (function() {
    function Wrong4() {}

    Wrong4.prototype.C = '4wrong';

    return Wrong4;

  })();

  Wrong5 = (function() {
    function Wrong5() {}

    Wrong5.prototype.C = 'Wrong5Wrong5Wrong5Wrong5X';

    Wrong5.prototype.toString = function() {
      return "[object " + this.C + "]";
    };

    return Wrong5;

  })();

  Wrong6 = (function() {
    function Wrong6() {}

    Wrong6.prototype.C = 'Wrong-6';

    return Wrong6;

  })();

  Wrong7 = (function() {
    function Wrong7() {}

    Wrong7.prototype.C = 'Wrong7';

    Wrong7.prototype.propNotDefined_public = '<string>  No such member as `propNotDefined`.';

    return Wrong7;

  })();

  Wrong8 = (function() {
    function Wrong8() {}

    Wrong8.prototype.C = 'Wrong8';

    Wrong8.prototype.badSignature_public = function() {
      return 'Signature cannot be a function';
    };

    Wrong8.prototype.badSignature = 123;

    return Wrong8;

  })();

  Wrong9 = (function() {
    function Wrong9() {}

    Wrong9.prototype.C = 'Wrong9';

    Wrong9.prototype.badSignature_public = '<number  Tag not completed.';

    Wrong9.prototype.badSignature = 123;

    return Wrong9;

  })();

  Wrong10 = (function() {
    function Wrong10() {}

    Wrong10.prototype.C = 'Wrong10';

    Wrong10.prototype.badSignature_public = '<Abc|null->  Type contains a dash.';

    Wrong10.prototype.badSignature = null;

    return Wrong10;

  })();

  Wrong11 = (function() {
    function Wrong11() {}

    return Wrong11;

  })();

  Wrong12 = (function() {
    function Wrong12() {}

    return Wrong12;

  })();

  Wrong13 = (function() {
    function Wrong13() {}

    Wrong13.prototype.C = 'Wrong13';

    Wrong13.prototype.badProperty_public = '<string|null>  Default is not valid type.';

    Wrong13.prototype.badProperty = 123;

    return Wrong13;

  })();

  Thing = (function() {
    var a, b;

    function _Class() {}

    a = 'Begin Thing definition';

    _Class.prototype.C = 'Thing';

    _Class.prototype.PI = 3.14;

    _Class.prototype.pubInstMeth_public = "a:      <number|string> The first argument.\nb:      <boolean>       The second argument.\nreturn: <string>        Public instance method returns a string. ";

    _Class.prototype.pubInstMeth = function(a, b) {
      return "pubInstMeth(): pubInstProp " + this.pubInstProp + " pubInstProp_value " + this.pubInstProp_value;
    };

    _Class.prototype.pubInstMethTwo_public = "return: <string>        Public instance method returns a string. ";

    _Class.prototype.pubInstMethTwo = function() {
      return "This is the second method";
    };

    b = 'End Thing definition';

    _Class.prototype.pubInstProp_public = '<string|number>  Property description here.';

    _Class.prototype.pubInstProp = 'Default public instance property value';

    return _Class;

  })();

  nyoo = new Main;

  tudor.add([
    "02 `add()` Usage", "`add()` works as expected", tudor.is, "`add()` is a function", ªF, function() {
      return nyoo.add;
    }, tudor.equal, "`add()` allows chaining", true, function() {
      return (nyoo.add(Thing)) === nyoo;
    }, tudor["throw"], "`add()` must be passed a class, so its `typeof` must be 'function'", '`Orig` is type number, not function', function() {
      return nyoo.add(123);
    }, "If `name` is passed, it must be a string", '`name` is type null, not string', function() {
      return nyoo.add(Thing, null);
    }, "If `name` is passed, it must not be a zero-length string", '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Thing, '');
    }, "If `name` is passed, it must not begin with a lowercase letter", '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Thing, 'thing');
    }, "If `name` is passed, it must not begin with a digit", '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Thing, '1Thing');
    }, "If `name` is passed, it must not be more than 24 characters", '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Thing, 'ThingThingThingThingThing');
    }, "If `name` is passed, the only punctuation allowed is underscore", '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Thing, 'Thíng');
    }, "If no `name` is passed, the class prototype must have a `.C` string", '`Orig::C` is type boolean, not string', function() {
      return nyoo.add(Wrong1);
    }, "If no `name` is passed, `Orig::C` must not be a zero-length string", '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Wrong2);
    }, "If no `name` is passed, `Orig::C` must not begin with a lowercase letter", '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Wrong3);
    }, "If no `name` is passed, `Orig::C` must not begin with a digit", '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Wrong4);
    }, "If no `name` is passed, `Orig::C` must not be more than 24 characters", '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Wrong5);
    }, "If no `name` is passed, the only punctuation allowed is underscore", '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/', function() {
      return nyoo.add(Wrong6);
    }, tudor.equal, "If `name` is passed, the class prototype `.C` string can be invalid", '[object Wrong5Wrong5Wrong5Wrong5X]', function() {
      nyoo.add(Wrong5, 'ValidNameArgument_123456');
      return '' + nyoo.ValidNameArgument_123456();
    }, "`nyoo.Thing()` brittlizes `new Thing()`", tudor.is, "After `nyoo.add Thing`, `nyoo.Thing` is a function", ªF, function() {
      return nyoo.Thing;
    }, function() {
      return nyoo.Thing();
    }, "`nyoo.Thing()` returns an object, `thing`", ªO, function(thing) {
      return thing;
    }, tudor.equal, "`thing.C` is the class name 'Thing'", 'Thing', function(thing) {
      return thing.C;
    }, "The class name 'Thing' is immutable", 'Thing', function(thing) {
      thing.C = 'whoops!';
      return thing.C;
    }, "`thing` is an `instanceof` the Thing class", true, function(thing) {
      return thing instanceof Thing;
    }, "`thing.constructor.__super__.C` is the original Thing class", 'Thing', function(thing) {
      return thing.constructor.__super__.C;
    }, "`thing` is sealed in theory", true, function(thing) {
      return Object.isSealed(thing);
    }, "`thing` really is sealed against adding properties", ªU, function(thing) {
      thing.abc = 123;
      return ªtype(thing.abc);
    }, "`thing.pubInstProp` returns the default value", 'Default public instance property value', function(thing) {
      return thing.pubInstProp;
    }, "`thing.pubInstProp = 9876` returns the updated value", 9876, function(thing) {
      return thing.pubInstProp = 9876;
    }, "`thing.pubInstProp` can see the update", 9876, function(thing) {
      return thing.pubInstProp;
    }, "`thing.pubInstMeth()` returns the expected value", 'pubInstMeth(): pubInstProp 9876 pubInstProp_value 9876', function(thing) {
      return thing.pubInstMeth();
    }, "A second instance starts life with the default value", 'Default public instance property value', function(thing) {
      var thing2;
      thing2 = nyoo.Thing();
      return thing2.pubInstProp;
    }, "A second instance does not share properties with the first", '9876 second pubInstMeth(): pubInstProp second pubInstProp_value second', function(thing) {
      var thing2;
      thing2 = nyoo.Thing();
      thing2.pubInstProp = 'second';
      return thing.pubInstProp + " " + thing2.pubInstProp + " " + (thing2.pubInstMeth());
    }, "`nyoo.add()` invalid class definitions", tudor["throw"], "A class with `propNotDefined_public` must also have `propNotDefined`", 'No such member as propNotDefined', function() {
      return nyoo.add(Wrong7);
    }, "A signature cannot be a function", '`signature` is type function, not string', function() {
      return nyoo.add(Wrong8);
    }, "'<number  Tag not completed.' is not a valid signature", '`signature` is not valid', function() {
      return nyoo.add(Wrong9);
    }, "'<Abc|null->  Type contains a dash.' is not a valid signature", '`signature` is not valid', function() {
      return nyoo.add(Wrong10);
    }, "Default property value must be one of the signature’s types", 'badProperty is type number, which fails string,null', function() {
      return nyoo.add(Wrong13);
    }
  ]);

}).call(this);
