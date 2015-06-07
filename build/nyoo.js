// Generated by CoffeeScript 1.9.3

/*! Nyoo 0.0.1 //// MIT Licence //// http://nyoo/richplastow.com */

(function() {
  var Main, ª, ªA, ªB, ªC, ªE, ªF, ªN, ªO, ªR, ªS, ªU, ªV, ªX, ªex, ªhas, ªredefine, ªtype, ªuid;

  ªC = 'Nyoo';

  ªV = '0.0.1';

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

    Main.prototype.add = function(classRef) {
      var k, member, name, private_signatures, public_signatures, ref, signature, v;
      if (ªF !== ªtype(classRef)) {
        throw new Error("`classRef` is type " + (ªtype(classRef)) + ", not function");
      }
      if (ªS !== ªtype(classRef.prototype.C)) {
        throw new Error("`classRef::C` is type " + (ªtype(classRef.prototype.C)) + ", not string");
      }
      public_signatures = {};
      private_signatures = {};
      ref = classRef.prototype;
      for (k in ref) {
        v = ref[k];
        if ('_public' === k.slice(-7)) {
          public_signatures[k] = v;
        } else if ('_private' === k.slice(-8)) {
          private_signatures[k] = v;
        }
      }
      for (k in public_signatures) {
        signature = public_signatures[k];
        name = k.slice(0, -7);
        member = classRef.prototype[name];
        if (ªF === ªtype(member)) {
          classRef.prototype[name] = function() {
            return member();
          };
        }
      }
      this[classRef.prototype.C] = function() {
        var inst;
        inst = new classRef;
        Object.seal(inst);
        return inst;
      };
      this.classes[classRef.prototype.C] = classRef;
      return this;
    };

    return Main;

  })();

  if (ªF === typeof define && define.amd) {
    define(function() {
      return Main;
    });
  } else if (ªO === typeof module && module && module.exports) {
    module.exports = Main;
  } else {
    this[ªC] = Main;
  }

}).call(this);
