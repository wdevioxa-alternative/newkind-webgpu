"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*! For license information please see main.bundle.js.LICENSE.txt */
(function () {
  var t = {
      7182: function _(t, e, r) {
        r(4530), t.exports = r(8080).RegExp.escape;
      },
      666: function _(t) {
        t.exports = function (t) {
          if ("function" != typeof t) throw TypeError(t + " is not a function!");
          return t;
        };
      },
      8479: function _(t, e, r) {
        var n = r(2380);
        t.exports = function (t, e) {
          if ("number" != typeof t && "Number" != n(t)) throw TypeError(e);
          return +t;
        };
      },
      7296: function _(t, e, r) {
        var n = r(4410)("unscopables"),
          i = Array.prototype;
        null == i[n] && r(4461)(i, n, {}), t.exports = function (t) {
          i[n][t] = !0;
        };
      },
      990: function _(t, e, r) {
        "use strict";

        var n = r(5454)(!0);
        t.exports = function (t, e, r) {
          return e + (r ? n(t, e).length : 1);
        };
      },
      269: function _(t) {
        t.exports = function (t, e, r, n) {
          if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(r + ": incorrect invocation!");
          return t;
        };
      },
      5075: function _(t, e, r) {
        var n = r(9708);
        t.exports = function (t) {
          if (!n(t)) throw TypeError(t + " is not an object!");
          return t;
        };
      },
      3697: function _(t, e, r) {
        "use strict";

        var n = r(6040),
          i = r(9519),
          o = r(5263);
        t.exports = [].copyWithin || function (t, e) {
          var r = n(this),
            a = o(r.length),
            u = i(t, a),
            c = i(e, a),
            s = arguments.length > 2 ? arguments[2] : void 0,
            f = Math.min((void 0 === s ? a : i(s, a)) - c, a - u),
            l = 1;
          for (c < u && u < c + f && (l = -1, c += f - 1, u += f - 1); f-- > 0;) {
            c in r ? r[u] = r[c] : delete r[u], u += l, c += l;
          }
          return r;
        };
      },
      2378: function _(t, e, r) {
        "use strict";

        var n = r(6040),
          i = r(9519),
          o = r(5263);
        t.exports = function (t) {
          for (var e = n(this), r = o(e.length), a = arguments.length, u = i(a > 1 ? arguments[1] : void 0, r), c = a > 2 ? arguments[2] : void 0, s = void 0 === c ? r : i(c, r); s > u;) {
            e[u++] = t;
          }
          return e;
        };
      },
      9315: function _(t, e, r) {
        var n = r(4036);
        t.exports = function (t, e) {
          var r = [];
          return n(t, !1, r.push, r, e), r;
        };
      },
      4513: function _(t, e, r) {
        var n = r(6282),
          i = r(5263),
          o = r(9519);
        t.exports = function (t) {
          return function (e, r, a) {
            var u,
              c = n(e),
              s = i(c.length),
              f = o(a, s);
            if (t && r != r) {
              for (; s > f;) {
                if ((u = c[f++]) != u) return !0;
              }
            } else for (; s > f; f++) {
              if ((t || f in c) && c[f] === r) return t || f || 0;
            }
            return !t && -1;
          };
        };
      },
      3635: function _(t, e, r) {
        var n = r(1550),
          i = r(5945),
          o = r(6040),
          a = r(5263),
          u = r(2143);
        t.exports = function (t, e) {
          var r = 1 == t,
            c = 2 == t,
            s = 3 == t,
            f = 4 == t,
            l = 6 == t,
            h = 5 == t || l,
            v = e || u;
          return function (e, u, p) {
            for (var d, g, y = o(e), m = i(y), x = n(u, p, 3), b = a(m.length), w = 0, S = r ? v(e, b) : c ? v(e, 0) : void 0; b > w; w++) {
              if ((h || w in m) && (g = x(d = m[w], w, y), t)) if (r) S[w] = g;else if (g) switch (t) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return w;
                case 2:
                  S.push(d);
              } else if (f) return !1;
            }
            return l ? -1 : s || f ? f : S;
          };
        };
      },
      6574: function _(t, e, r) {
        var n = r(666),
          i = r(6040),
          o = r(5945),
          a = r(5263);
        t.exports = function (t, e, r, u, c) {
          n(e);
          var s = i(t),
            f = o(s),
            l = a(s.length),
            h = c ? l - 1 : 0,
            v = c ? -1 : 1;
          if (r < 2) for (;;) {
            if (h in f) {
              u = f[h], h += v;
              break;
            }
            if (h += v, c ? h < 0 : l <= h) throw TypeError("Reduce of empty array with no initial value");
          }
          for (; c ? h >= 0 : l > h; h += v) {
            h in f && (u = e(u, f[h], h, s));
          }
          return u;
        };
      },
      920: function _(t, e, r) {
        var n = r(9708),
          i = r(3623),
          o = r(4410)("species");
        t.exports = function (t) {
          var e;
          return i(t) && ("function" != typeof (e = t.constructor) || e !== Array && !i(e.prototype) || (e = void 0), n(e) && null === (e = e[o]) && (e = void 0)), void 0 === e ? Array : e;
        };
      },
      2143: function _(t, e, r) {
        var n = r(920);
        t.exports = function (t, e) {
          return new (n(t))(e);
        };
      },
      7240: function _(t, e, r) {
        "use strict";

        var n = r(666),
          i = r(9708),
          o = r(1671),
          a = [].slice,
          u = {},
          c = function c(t, e, r) {
            if (!(e in u)) {
              for (var n = [], i = 0; i < e; i++) {
                n[i] = "a[" + i + "]";
              }
              u[e] = Function("F,a", "return new F(" + n.join(",") + ")");
            }
            return u[e](t, r);
          };
        t.exports = Function.bind || function (t) {
          var e = n(this),
            r = a.call(arguments, 1),
            u = function u() {
              var n = r.concat(a.call(arguments));
              return this instanceof u ? c(e, n.length, n) : o(e, n, t);
            };
          return i(e.prototype) && (u.prototype = e.prototype), u;
        };
      },
      6347: function _(t, e, r) {
        var n = r(2380),
          i = r(4410)("toStringTag"),
          o = "Arguments" == n(function () {
            return arguments;
          }());
        t.exports = function (t) {
          var e, r, a;
          return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = function (t, e) {
            try {
              return t[e];
            } catch (t) {}
          }(e = Object(t), i)) ? r : o ? n(e) : "Object" == (a = n(e)) && "function" == typeof e.callee ? "Arguments" : a;
        };
      },
      2380: function _(t) {
        var e = {}.toString;
        t.exports = function (t) {
          return e.call(t).slice(8, -1);
        };
      },
      7647: function _(t, e, r) {
        "use strict";

        var n = r(4213).f,
          i = r(6088),
          o = r(3227),
          a = r(1550),
          u = r(269),
          c = r(4036),
          s = r(5706),
          f = r(4257),
          l = r(2373),
          h = r(3144),
          v = r(8648).fastKey,
          p = r(1554),
          d = h ? "_s" : "size",
          g = function g(t, e) {
            var r,
              n = v(e);
            if ("F" !== n) return t._i[n];
            for (r = t._f; r; r = r.n) {
              if (r.k == e) return r;
            }
          };
        t.exports = {
          getConstructor: function getConstructor(t, e, r, s) {
            var f = t(function (t, n) {
              u(t, f, e, "_i"), t._t = e, t._i = i(null), t._f = void 0, t._l = void 0, t[d] = 0, null != n && c(n, r, t[s], t);
            });
            return o(f.prototype, {
              clear: function clear() {
                for (var t = p(this, e), r = t._i, n = t._f; n; n = n.n) {
                  n.r = !0, n.p && (n.p = n.p.n = void 0), delete r[n.i];
                }
                t._f = t._l = void 0, t[d] = 0;
              },
              "delete": function _delete(t) {
                var r = p(this, e),
                  n = g(r, t);
                if (n) {
                  var i = n.n,
                    o = n.p;
                  delete r._i[n.i], n.r = !0, o && (o.n = i), i && (i.p = o), r._f == n && (r._f = i), r._l == n && (r._l = o), r[d]--;
                }
                return !!n;
              },
              forEach: function forEach(t) {
                p(this, e);
                for (var r, n = a(t, arguments.length > 1 ? arguments[1] : void 0, 3); r = r ? r.n : this._f;) {
                  for (n(r.v, r.k, this); r && r.r;) {
                    r = r.p;
                  }
                }
              },
              has: function has(t) {
                return !!g(p(this, e), t);
              }
            }), h && n(f.prototype, "size", {
              get: function get() {
                return p(this, e)[d];
              }
            }), f;
          },
          def: function def(t, e, r) {
            var n,
              i,
              o = g(t, e);
            return o ? o.v = r : (t._l = o = {
              i: i = v(e, !0),
              k: e,
              v: r,
              p: n = t._l,
              n: void 0,
              r: !1
            }, t._f || (t._f = o), n && (n.n = o), t[d]++, "F" !== i && (t._i[i] = o)), t;
          },
          getEntry: g,
          setStrong: function setStrong(t, e, r) {
            s(t, e, function (t, r) {
              this._t = p(t, e), this._k = r, this._l = void 0;
            }, function () {
              for (var t = this, e = t._k, r = t._l; r && r.r;) {
                r = r.p;
              }
              return t._t && (t._l = r = r ? r.n : t._t._f) ? f(0, "keys" == e ? r.k : "values" == e ? r.v : [r.k, r.v]) : (t._t = void 0, f(1));
            }, r ? "entries" : "values", !r, !0), l(e);
          }
        };
      },
      2935: function _(t, e, r) {
        var n = r(6347),
          i = r(9315);
        t.exports = function (t) {
          return function () {
            if (n(this) != t) throw TypeError(t + "#toJSON isn't generic");
            return i(this);
          };
        };
      },
      8348: function _(t, e, r) {
        "use strict";

        var n = r(3227),
          i = r(8648).getWeak,
          o = r(5075),
          a = r(9708),
          u = r(269),
          c = r(4036),
          s = r(3635),
          f = r(3050),
          l = r(1554),
          h = s(5),
          v = s(6),
          p = 0,
          d = function d(t) {
            return t._l || (t._l = new g());
          },
          g = function g() {
            this.a = [];
          },
          y = function y(t, e) {
            return h(t.a, function (t) {
              return t[0] === e;
            });
          };
        g.prototype = {
          get: function get(t) {
            var e = y(this, t);
            if (e) return e[1];
          },
          has: function has(t) {
            return !!y(this, t);
          },
          set: function set(t, e) {
            var r = y(this, t);
            r ? r[1] = e : this.a.push([t, e]);
          },
          "delete": function _delete(t) {
            var e = v(this.a, function (e) {
              return e[0] === t;
            });
            return ~e && this.a.splice(e, 1), !!~e;
          }
        }, t.exports = {
          getConstructor: function getConstructor(t, e, r, o) {
            var s = t(function (t, n) {
              u(t, s, e, "_i"), t._t = e, t._i = p++, t._l = void 0, null != n && c(n, r, t[o], t);
            });
            return n(s.prototype, {
              "delete": function _delete(t) {
                if (!a(t)) return !1;
                var r = i(t);
                return !0 === r ? d(l(this, e))["delete"](t) : r && f(r, this._i) && delete r[this._i];
              },
              has: function has(t) {
                if (!a(t)) return !1;
                var r = i(t);
                return !0 === r ? d(l(this, e)).has(t) : r && f(r, this._i);
              }
            }), s;
          },
          def: function def(t, e, r) {
            var n = i(o(e), !0);
            return !0 === n ? d(t).set(e, r) : n[t._i] = r, t;
          },
          ufstore: d
        };
      },
      8107: function _(t, e, r) {
        "use strict";

        var n = r(4405),
          i = r(1693),
          o = r(9593),
          a = r(3227),
          u = r(8648),
          c = r(4036),
          s = r(269),
          f = r(9708),
          l = r(496),
          h = r(3229),
          v = r(5572),
          p = r(7856);
        t.exports = function (t, e, r, d, g, y) {
          var m = n[t],
            x = m,
            b = g ? "set" : "add",
            w = x && x.prototype,
            S = {},
            E = function E(t) {
              var e = w[t];
              o(w, t, "delete" == t || "has" == t ? function (t) {
                return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
              } : "get" == t ? function (t) {
                return y && !f(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
              } : "add" == t ? function (t) {
                return e.call(this, 0 === t ? 0 : t), this;
              } : function (t, r) {
                return e.call(this, 0 === t ? 0 : t, r), this;
              });
            };
          if ("function" == typeof x && (y || w.forEach && !l(function () {
            new x().entries().next();
          }))) {
            var _ = new x(),
              P = _[b](y ? {} : -0, 1) != _,
              O = l(function () {
                _.has(1);
              }),
              k = h(function (t) {
                new x(t);
              }),
              M = !y && l(function () {
                for (var t = new x(), e = 5; e--;) {
                  t[b](e, e);
                }
                return !t.has(-0);
              });
            k || ((x = e(function (e, r) {
              s(e, x, t);
              var n = p(new m(), e, x);
              return null != r && c(r, g, n[b], n), n;
            })).prototype = w, w.constructor = x), (O || M) && (E("delete"), E("has"), g && E("get")), (M || P) && E(b), y && w.clear && delete w.clear;
          } else x = d.getConstructor(e, t, g, b), a(x.prototype, r), u.NEED = !0;
          return v(x, t), S[t] = x, i(i.G + i.W + i.F * (x != m), S), y || d.setStrong(x, t, g), x;
        };
      },
      8080: function _(t) {
        var e = t.exports = {
          version: "2.6.12"
        };
        "number" == typeof __e && (__e = e);
      },
      2559: function _(t, e, r) {
        "use strict";

        var n = r(4213),
          i = r(3388);
        t.exports = function (t, e, r) {
          e in t ? n.f(t, e, i(0, r)) : t[e] = r;
        };
      },
      1550: function _(t, e, r) {
        var n = r(666);
        t.exports = function (t, e, r) {
          if (n(t), void 0 === e) return t;
          switch (r) {
            case 1:
              return function (r) {
                return t.call(e, r);
              };
            case 2:
              return function (r, n) {
                return t.call(e, r, n);
              };
            case 3:
              return function (r, n, i) {
                return t.call(e, r, n, i);
              };
          }
          return function () {
            return t.apply(e, arguments);
          };
        };
      },
      9496: function _(t, e, r) {
        "use strict";

        var n = r(496),
          i = Date.prototype.getTime,
          o = Date.prototype.toISOString,
          a = function a(t) {
            return t > 9 ? t : "0" + t;
          };
        t.exports = n(function () {
          return "0385-07-25T07:06:39.999Z" != o.call(new Date(-50000000000001));
        }) || !n(function () {
          o.call(new Date(NaN));
        }) ? function () {
          if (!isFinite(i.call(this))) throw RangeError("Invalid time value");
          var t = this,
            e = t.getUTCFullYear(),
            r = t.getUTCMilliseconds(),
            n = e < 0 ? "-" : e > 9999 ? "+" : "";
          return n + ("00000" + Math.abs(e)).slice(n ? -6 : -4) + "-" + a(t.getUTCMonth() + 1) + "-" + a(t.getUTCDate()) + "T" + a(t.getUTCHours()) + ":" + a(t.getUTCMinutes()) + ":" + a(t.getUTCSeconds()) + "." + (r > 99 ? r : "0" + a(r)) + "Z";
        } : o;
      },
      2967: function _(t, e, r) {
        "use strict";

        var n = r(5075),
          i = r(3825),
          o = "number";
        t.exports = function (t) {
          if ("string" !== t && t !== o && "default" !== t) throw TypeError("Incorrect hint");
          return i(n(this), t != o);
        };
      },
      1083: function _(t) {
        t.exports = function (t) {
          if (null == t) throw TypeError("Can't call method on  " + t);
          return t;
        };
      },
      3144: function _(t, e, r) {
        t.exports = !r(496)(function () {
          return 7 != Object.defineProperty({}, "a", {
            get: function get() {
              return 7;
            }
          }).a;
        });
      },
      7339: function _(t, e, r) {
        var n = r(9708),
          i = r(4405).document,
          o = n(i) && n(i.createElement);
        t.exports = function (t) {
          return o ? i.createElement(t) : {};
        };
      },
      5985: function _(t) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
      },
      6522: function _(t, e, r) {
        var n = r(1126),
          i = r(8910),
          o = r(2806);
        t.exports = function (t) {
          var e = n(t),
            r = i.f;
          if (r) for (var a, u = r(t), c = o.f, s = 0; u.length > s;) {
            c.call(t, a = u[s++]) && e.push(a);
          }
          return e;
        };
      },
      1693: function _(t, e, r) {
        var n = r(4405),
          i = r(8080),
          o = r(4461),
          a = r(9593),
          u = r(1550),
          c = "prototype",
          s = function s(t, e, r) {
            var f,
              l,
              h,
              v,
              p = t & s.F,
              d = t & s.G,
              g = t & s.S,
              y = t & s.P,
              m = t & s.B,
              x = d ? n : g ? n[e] || (n[e] = {}) : (n[e] || {})[c],
              b = d ? i : i[e] || (i[e] = {}),
              w = b[c] || (b[c] = {});
            for (f in d && (r = e), r) {
              h = ((l = !p && x && void 0 !== x[f]) ? x : r)[f], v = m && l ? u(h, n) : y && "function" == typeof h ? u(Function.call, h) : h, x && a(x, f, h, t & s.U), b[f] != h && o(b, f, v), y && w[f] != h && (w[f] = h);
            }
          };
        n.core = i, s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s;
      },
      528: function _(t, e, r) {
        var n = r(4410)("match");
        t.exports = function (t) {
          var e = /./;
          try {
            "/./"[t](e);
          } catch (r) {
            try {
              return e[n] = !1, !"/./"[t](e);
            } catch (t) {}
          }
          return !0;
        };
      },
      496: function _(t) {
        t.exports = function (t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      },
      7925: function _(t, e, r) {
        "use strict";

        r(7515);
        var n = r(9593),
          i = r(4461),
          o = r(496),
          a = r(1083),
          u = r(4410),
          c = r(2562),
          s = u("species"),
          f = !o(function () {
            var t = /./;
            return t.exec = function () {
              var t = [];
              return t.groups = {
                a: "7"
              }, t;
            }, "7" !== "".replace(t, "$<a>");
          }),
          l = function () {
            var t = /(?:)/,
              e = t.exec;
            t.exec = function () {
              return e.apply(this, arguments);
            };
            var r = "ab".split(t);
            return 2 === r.length && "a" === r[0] && "b" === r[1];
          }();
        t.exports = function (t, e, r) {
          var h = u(t),
            v = !o(function () {
              var e = {};
              return e[h] = function () {
                return 7;
              }, 7 != ""[t](e);
            }),
            p = v ? !o(function () {
              var e = !1,
                r = /a/;
              return r.exec = function () {
                return e = !0, null;
              }, "split" === t && (r.constructor = {}, r.constructor[s] = function () {
                return r;
              }), r[h](""), !e;
            }) : void 0;
          if (!v || !p || "replace" === t && !f || "split" === t && !l) {
            var d = /./[h],
              g = r(a, h, ""[t], function (t, e, r, n, i) {
                return e.exec === c ? v && !i ? {
                  done: !0,
                  value: d.call(e, r, n)
                } : {
                  done: !0,
                  value: t.call(r, e, n)
                } : {
                  done: !1
                };
              }),
              y = g[0],
              m = g[1];
            n(String.prototype, t, y), i(RegExp.prototype, h, 2 == e ? function (t, e) {
              return m.call(t, this, e);
            } : function (t) {
              return m.call(t, this);
            });
          }
        };
      },
      5660: function _(t, e, r) {
        "use strict";

        var n = r(5075);
        t.exports = function () {
          var t = n(this),
            e = "";
          return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
        };
      },
      4225: function _(t, e, r) {
        "use strict";

        var n = r(3623),
          i = r(9708),
          o = r(5263),
          a = r(1550),
          u = r(4410)("isConcatSpreadable");
        t.exports = function t(e, r, c, s, f, l, h, v) {
          for (var p, d, g = f, y = 0, m = !!h && a(h, v, 3); y < s;) {
            if (y in c) {
              if (p = m ? m(c[y], y, r) : c[y], d = !1, i(p) && (d = void 0 !== (d = p[u]) ? !!d : n(p)), d && l > 0) g = t(e, r, p, o(p.length), g, l - 1) - 1;else {
                if (g >= 9007199254740991) throw TypeError();
                e[g] = p;
              }
              g++;
            }
            y++;
          }
          return g;
        };
      },
      4036: function _(t, e, r) {
        var n = r(1550),
          i = r(8226),
          o = r(2193),
          a = r(5075),
          u = r(5263),
          c = r(6882),
          s = {},
          f = {},
          l = t.exports = function (t, e, r, l, h) {
            var v,
              p,
              d,
              g,
              y = h ? function () {
                return t;
              } : c(t),
              m = n(r, l, e ? 2 : 1),
              x = 0;
            if ("function" != typeof y) throw TypeError(t + " is not iterable!");
            if (o(y)) {
              for (v = u(t.length); v > x; x++) {
                if ((g = e ? m(a(p = t[x])[0], p[1]) : m(t[x])) === s || g === f) return g;
              }
            } else for (d = y.call(t); !(p = d.next()).done;) {
              if ((g = i(d, m, p.value, e)) === s || g === f) return g;
            }
          };
        l.BREAK = s, l.RETURN = f;
      },
      9769: function _(t, e, r) {
        t.exports = r(7104)("native-function-to-string", Function.toString);
      },
      4405: function _(t) {
        var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = e);
      },
      3050: function _(t) {
        var e = {}.hasOwnProperty;
        t.exports = function (t, r) {
          return e.call(t, r);
        };
      },
      4461: function _(t, e, r) {
        var n = r(4213),
          i = r(3388);
        t.exports = r(3144) ? function (t, e, r) {
          return n.f(t, e, i(1, r));
        } : function (t, e, r) {
          return t[e] = r, t;
        };
      },
      7727: function _(t, e, r) {
        var n = r(4405).document;
        t.exports = n && n.documentElement;
      },
      748: function _(t, e, r) {
        t.exports = !r(3144) && !r(496)(function () {
          return 7 != Object.defineProperty(r(7339)("div"), "a", {
            get: function get() {
              return 7;
            }
          }).a;
        });
      },
      7856: function _(t, e, r) {
        var n = r(9708),
          i = r(1794).set;
        t.exports = function (t, e, r) {
          var o,
            a = e.constructor;
          return a !== r && "function" == typeof a && (o = a.prototype) !== r.prototype && n(o) && i && i(t, o), t;
        };
      },
      1671: function _(t) {
        t.exports = function (t, e, r) {
          var n = void 0 === r;
          switch (e.length) {
            case 0:
              return n ? t() : t.call(r);
            case 1:
              return n ? t(e[0]) : t.call(r, e[0]);
            case 2:
              return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
            case 3:
              return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
            case 4:
              return n ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3]);
          }
          return t.apply(r, e);
        };
      },
      5945: function _(t, e, r) {
        var n = r(2380);
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
          return "String" == n(t) ? t.split("") : Object(t);
        };
      },
      2193: function _(t, e, r) {
        var n = r(7985),
          i = r(4410)("iterator"),
          o = Array.prototype;
        t.exports = function (t) {
          return void 0 !== t && (n.Array === t || o[i] === t);
        };
      },
      3623: function _(t, e, r) {
        var n = r(2380);
        t.exports = Array.isArray || function (t) {
          return "Array" == n(t);
        };
      },
      8645: function _(t, e, r) {
        var n = r(9708),
          i = Math.floor;
        t.exports = function (t) {
          return !n(t) && isFinite(t) && i(t) === t;
        };
      },
      9708: function _(t) {
        t.exports = function (t) {
          return "object" == _typeof(t) ? null !== t : "function" == typeof t;
        };
      },
      939: function _(t, e, r) {
        var n = r(9708),
          i = r(2380),
          o = r(4410)("match");
        t.exports = function (t) {
          var e;
          return n(t) && (void 0 !== (e = t[o]) ? !!e : "RegExp" == i(t));
        };
      },
      8226: function _(t, e, r) {
        var n = r(5075);
        t.exports = function (t, e, r, i) {
          try {
            return i ? e(n(r)[0], r[1]) : e(r);
          } catch (e) {
            var o = t["return"];
            throw void 0 !== o && n(o.call(t)), e;
          }
        };
      },
      9614: function _(t, e, r) {
        "use strict";

        var n = r(6088),
          i = r(3388),
          o = r(5572),
          a = {};
        r(4461)(a, r(4410)("iterator"), function () {
          return this;
        }), t.exports = function (t, e, r) {
          t.prototype = n(a, {
            next: i(1, r)
          }), o(t, e + " Iterator");
        };
      },
      5706: function _(t, e, r) {
        "use strict";

        var n = r(4925),
          i = r(1693),
          o = r(9593),
          a = r(4461),
          u = r(7985),
          c = r(9614),
          s = r(5572),
          f = r(8539),
          l = r(4410)("iterator"),
          h = !([].keys && "next" in [].keys()),
          v = "keys",
          p = "values",
          d = function d() {
            return this;
          };
        t.exports = function (t, e, r, g, y, m, x) {
          c(r, e, g);
          var b,
            w,
            S,
            E = function E(t) {
              if (!h && t in k) return k[t];
              switch (t) {
                case v:
                case p:
                  return function () {
                    return new r(this, t);
                  };
              }
              return function () {
                return new r(this, t);
              };
            },
            _ = e + " Iterator",
            P = y == p,
            O = !1,
            k = t.prototype,
            M = k[l] || k["@@iterator"] || y && k[y],
            F = M || E(y),
            L = y ? P ? E("entries") : F : void 0,
            j = "Array" == e && k.entries || M;
          if (j && (S = f(j.call(new t()))) !== Object.prototype && S.next && (s(S, _, !0), n || "function" == typeof S[l] || a(S, l, d)), P && M && M.name !== p && (O = !0, F = function F() {
            return M.call(this);
          }), n && !x || !h && !O && k[l] || a(k, l, F), u[e] = F, u[_] = d, y) if (b = {
            values: P ? F : E(p),
            keys: m ? F : E(v),
            entries: L
          }, x) for (w in b) {
            w in k || o(k, w, b[w]);
          } else i(i.P + i.F * (h || O), e, b);
          return b;
        };
      },
      3229: function _(t, e, r) {
        var n = r(4410)("iterator"),
          i = !1;
        try {
          var o = [7][n]();
          o["return"] = function () {
            i = !0;
          }, Array.from(o, function () {
            throw 2;
          });
        } catch (t) {}
        t.exports = function (t, e) {
          if (!e && !i) return !1;
          var r = !1;
          try {
            var o = [7],
              a = o[n]();
            a.next = function () {
              return {
                done: r = !0
              };
            }, o[n] = function () {
              return a;
            }, t(o);
          } catch (t) {}
          return r;
        };
      },
      4257: function _(t) {
        t.exports = function (t, e) {
          return {
            value: e,
            done: !!t
          };
        };
      },
      7985: function _(t) {
        t.exports = {};
      },
      4925: function _(t) {
        t.exports = !1;
      },
      8651: function _(t) {
        var e = Math.expm1;
        t.exports = !e || e(10) > 22025.465794806718 || e(10) < 22025.465794806718 || -2e-17 != e(-2e-17) ? function (t) {
          return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Math.exp(t) - 1;
        } : e;
      },
      8961: function _(t, e, r) {
        var n = r(9439),
          i = Math.pow,
          o = i(2, -52),
          a = i(2, -23),
          u = i(2, 127) * (2 - a),
          c = i(2, -126);
        t.exports = Math.fround || function (t) {
          var e,
            r,
            i = Math.abs(t),
            s = n(t);
          return i < c ? s * (i / c / a + 1 / o - 1 / o) * c * a : (r = (e = (1 + a / o) * i) - (e - i)) > u || r != r ? s * (1 / 0) : s * r;
        };
      },
      8738: function _(t) {
        t.exports = Math.log1p || function (t) {
          return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : Math.log(1 + t);
        };
      },
      4917: function _(t) {
        t.exports = Math.scale || function (t, e, r, n, i) {
          return 0 === arguments.length || t != t || e != e || r != r || n != n || i != i ? NaN : t === 1 / 0 || t === -1 / 0 ? t : (t - e) * (i - n) / (r - e) + n;
        };
      },
      9439: function _(t) {
        t.exports = Math.sign || function (t) {
          return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1;
        };
      },
      8648: function _(t, e, r) {
        var n = r(7767)("meta"),
          i = r(9708),
          o = r(3050),
          a = r(4213).f,
          u = 0,
          c = Object.isExtensible || function () {
            return !0;
          },
          s = !r(496)(function () {
            return c(Object.preventExtensions({}));
          }),
          f = function f(t) {
            a(t, n, {
              value: {
                i: "O" + ++u,
                w: {}
              }
            });
          },
          l = t.exports = {
            KEY: n,
            NEED: !1,
            fastKey: function fastKey(t, e) {
              if (!i(t)) return "symbol" == _typeof(t) ? t : ("string" == typeof t ? "S" : "P") + t;
              if (!o(t, n)) {
                if (!c(t)) return "F";
                if (!e) return "E";
                f(t);
              }
              return t[n].i;
            },
            getWeak: function getWeak(t, e) {
              if (!o(t, n)) {
                if (!c(t)) return !0;
                if (!e) return !1;
                f(t);
              }
              return t[n].w;
            },
            onFreeze: function onFreeze(t) {
              return s && l.NEED && c(t) && !o(t, n) && f(t), t;
            }
          };
      },
      380: function _(t, e, r) {
        var n = r(9164),
          i = r(1693),
          o = r(7104)("metadata"),
          a = o.store || (o.store = new (r(6189))()),
          u = function u(t, e, r) {
            var i = a.get(t);
            if (!i) {
              if (!r) return;
              a.set(t, i = new n());
            }
            var o = i.get(e);
            if (!o) {
              if (!r) return;
              i.set(e, o = new n());
            }
            return o;
          };
        t.exports = {
          store: a,
          map: u,
          has: function has(t, e, r) {
            var n = u(e, r, !1);
            return void 0 !== n && n.has(t);
          },
          get: function get(t, e, r) {
            var n = u(e, r, !1);
            return void 0 === n ? void 0 : n.get(t);
          },
          set: function set(t, e, r, n) {
            u(r, n, !0).set(t, e);
          },
          keys: function keys(t, e) {
            var r = u(t, e, !1),
              n = [];
            return r && r.forEach(function (t, e) {
              n.push(e);
            }), n;
          },
          key: function key(t) {
            return void 0 === t || "symbol" == _typeof(t) ? t : String(t);
          },
          exp: function exp(t) {
            i(i.S, "Reflect", t);
          }
        };
      },
      2583: function _(t, e, r) {
        var n = r(4405),
          i = r(1597).set,
          o = n.MutationObserver || n.WebKitMutationObserver,
          a = n.process,
          u = n.Promise,
          c = "process" == r(2380)(a);
        t.exports = function () {
          var t,
            e,
            r,
            s = function s() {
              var n, i;
              for (c && (n = a.domain) && n.exit(); t;) {
                i = t.fn, t = t.next;
                try {
                  i();
                } catch (n) {
                  throw t ? r() : e = void 0, n;
                }
              }
              e = void 0, n && n.enter();
            };
          if (c) r = function r() {
            a.nextTick(s);
          };else if (!o || n.navigator && n.navigator.standalone) {
            if (u && u.resolve) {
              var f = u.resolve(void 0);
              r = function r() {
                f.then(s);
              };
            } else r = function r() {
              i.call(n, s);
            };
          } else {
            var l = !0,
              h = document.createTextNode("");
            new o(s).observe(h, {
              characterData: !0
            }), r = function r() {
              h.data = l = !l;
            };
          }
          return function (n) {
            var i = {
              fn: n,
              next: void 0
            };
            e && (e.next = i), t || (t = i, r()), e = i;
          };
        };
      },
      2219: function _(t, e, r) {
        "use strict";

        var n = r(666);
        function i(t) {
          var e, r;
          this.promise = new t(function (t, n) {
            if (void 0 !== e || void 0 !== r) throw TypeError("Bad Promise constructor");
            e = t, r = n;
          }), this.resolve = n(e), this.reject = n(r);
        }
        t.exports.f = function (t) {
          return new i(t);
        };
      },
      2075: function _(t, e, r) {
        "use strict";

        var n = r(3144),
          i = r(1126),
          o = r(8910),
          a = r(2806),
          u = r(6040),
          c = r(5945),
          s = Object.assign;
        t.exports = !s || r(496)(function () {
          var t = {},
            e = {},
            r = Symbol(),
            n = "abcdefghijklmnopqrst";
          return t[r] = 7, n.split("").forEach(function (t) {
            e[t] = t;
          }), 7 != s({}, t)[r] || Object.keys(s({}, e)).join("") != n;
        }) ? function (t, e) {
          for (var r = u(t), s = arguments.length, f = 1, l = o.f, h = a.f; s > f;) {
            for (var v, p = c(arguments[f++]), d = l ? i(p).concat(l(p)) : i(p), g = d.length, y = 0; g > y;) {
              v = d[y++], n && !h.call(p, v) || (r[v] = p[v]);
            }
          }
          return r;
        } : s;
      },
      6088: function _(t, e, r) {
        var n = r(5075),
          i = r(2390),
          o = r(5985),
          a = r(1145)("IE_PROTO"),
          u = function u() {},
          c = "prototype",
          _s = function s() {
            var t,
              e = r(7339)("iframe"),
              n = o.length;
            for (e.style.display = "none", r(7727).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _s = t.F; n--;) {
              delete _s[c][o[n]];
            }
            return _s();
          };
        t.exports = Object.create || function (t, e) {
          var r;
          return null !== t ? (u[c] = n(t), r = new u(), u[c] = null, r[a] = t) : r = _s(), void 0 === e ? r : i(r, e);
        };
      },
      4213: function _(t, e, r) {
        var n = r(5075),
          i = r(748),
          o = r(3825),
          a = Object.defineProperty;
        e.f = r(3144) ? Object.defineProperty : function (t, e, r) {
          if (n(t), e = o(e, !0), n(r), i) try {
            return a(t, e, r);
          } catch (t) {}
          if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
          return "value" in r && (t[e] = r.value), t;
        };
      },
      2390: function _(t, e, r) {
        var n = r(4213),
          i = r(5075),
          o = r(1126);
        t.exports = r(3144) ? Object.defineProperties : function (t, e) {
          i(t);
          for (var r, a = o(e), u = a.length, c = 0; u > c;) {
            n.f(t, r = a[c++], e[r]);
          }
          return t;
        };
      },
      2296: function _(t, e, r) {
        "use strict";

        t.exports = r(4925) || !r(496)(function () {
          var t = Math.random();
          __defineSetter__.call(null, t, function () {}), delete r(4405)[t];
        });
      },
      9015: function _(t, e, r) {
        var n = r(2806),
          i = r(3388),
          o = r(6282),
          a = r(3825),
          u = r(3050),
          c = r(748),
          s = Object.getOwnPropertyDescriptor;
        e.f = r(3144) ? s : function (t, e) {
          if (t = o(t), e = a(e, !0), c) try {
            return s(t, e);
          } catch (t) {}
          if (u(t, e)) return i(!n.f.call(t, e), t[e]);
        };
      },
      3233: function _(t, e, r) {
        var n = r(6282),
          i = r(7173).f,
          o = {}.toString,
          a = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        t.exports.f = function (t) {
          return a && "[object Window]" == o.call(t) ? function (t) {
            try {
              return i(t);
            } catch (t) {
              return a.slice();
            }
          }(t) : i(n(t));
        };
      },
      7173: function _(t, e, r) {
        var n = r(3872),
          i = r(5985).concat("length", "prototype");
        e.f = Object.getOwnPropertyNames || function (t) {
          return n(t, i);
        };
      },
      8910: function _(t, e) {
        e.f = Object.getOwnPropertySymbols;
      },
      8539: function _(t, e, r) {
        var n = r(3050),
          i = r(6040),
          o = r(1145)("IE_PROTO"),
          a = Object.prototype;
        t.exports = Object.getPrototypeOf || function (t) {
          return t = i(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;
        };
      },
      3872: function _(t, e, r) {
        var n = r(3050),
          i = r(6282),
          o = r(4513)(!1),
          a = r(1145)("IE_PROTO");
        t.exports = function (t, e) {
          var r,
            u = i(t),
            c = 0,
            s = [];
          for (r in u) {
            r != a && n(u, r) && s.push(r);
          }
          for (; e.length > c;) {
            n(u, r = e[c++]) && (~o(s, r) || s.push(r));
          }
          return s;
        };
      },
      1126: function _(t, e, r) {
        var n = r(3872),
          i = r(5985);
        t.exports = Object.keys || function (t) {
          return n(t, i);
        };
      },
      2806: function _(t, e) {
        e.f = {}.propertyIsEnumerable;
      },
      9870: function _(t, e, r) {
        var n = r(1693),
          i = r(8080),
          o = r(496);
        t.exports = function (t, e) {
          var r = (i.Object || {})[t] || Object[t],
            a = {};
          a[t] = e(r), n(n.S + n.F * o(function () {
            r(1);
          }), "Object", a);
        };
      },
      2133: function _(t, e, r) {
        var n = r(3144),
          i = r(1126),
          o = r(6282),
          a = r(2806).f;
        t.exports = function (t) {
          return function (e) {
            for (var r, u = o(e), c = i(u), s = c.length, f = 0, l = []; s > f;) {
              r = c[f++], n && !a.call(u, r) || l.push(t ? [r, u[r]] : u[r]);
            }
            return l;
          };
        };
      },
      2275: function _(t, e, r) {
        var n = r(7173),
          i = r(8910),
          o = r(5075),
          a = r(4405).Reflect;
        t.exports = a && a.ownKeys || function (t) {
          var e = n.f(o(t)),
            r = i.f;
          return r ? e.concat(r(t)) : e;
        };
      },
      5995: function _(t, e, r) {
        var n = r(4405).parseFloat,
          i = r(5480).trim;
        t.exports = 1 / n(r(1176) + "-0") != -1 / 0 ? function (t) {
          var e = i(String(t), 3),
            r = n(e);
          return 0 === r && "-" == e.charAt(0) ? -0 : r;
        } : n;
      },
      7252: function _(t, e, r) {
        var n = r(4405).parseInt,
          i = r(5480).trim,
          o = r(1176),
          a = /^[-+]?0[xX]/;
        t.exports = 8 !== n(o + "08") || 22 !== n(o + "0x16") ? function (t, e) {
          var r = i(String(t), 3);
          return n(r, e >>> 0 || (a.test(r) ? 16 : 10));
        } : n;
      },
      4552: function _(t) {
        t.exports = function (t) {
          try {
            return {
              e: !1,
              v: t()
            };
          } catch (t) {
            return {
              e: !0,
              v: t
            };
          }
        };
      },
      9894: function _(t, e, r) {
        var n = r(5075),
          i = r(9708),
          o = r(2219);
        t.exports = function (t, e) {
          if (n(t), i(e) && e.constructor === t) return e;
          var r = o.f(t);
          return (0, r.resolve)(e), r.promise;
        };
      },
      3388: function _(t) {
        t.exports = function (t, e) {
          return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
          };
        };
      },
      3227: function _(t, e, r) {
        var n = r(9593);
        t.exports = function (t, e, r) {
          for (var i in e) {
            n(t, i, e[i], r);
          }
          return t;
        };
      },
      9593: function _(t, e, r) {
        var n = r(4405),
          i = r(4461),
          o = r(3050),
          a = r(7767)("src"),
          u = r(9769),
          c = "toString",
          s = ("" + u).split(c);
        r(8080).inspectSource = function (t) {
          return u.call(t);
        }, (t.exports = function (t, e, r, u) {
          var c = "function" == typeof r;
          c && (o(r, "name") || i(r, "name", e)), t[e] !== r && (c && (o(r, a) || i(r, a, t[e] ? "" + t[e] : s.join(String(e)))), t === n ? t[e] = r : u ? t[e] ? t[e] = r : i(t, e, r) : (delete t[e], i(t, e, r)));
        })(Function.prototype, c, function () {
          return "function" == typeof this && this[a] || u.call(this);
        });
      },
      6798: function _(t, e, r) {
        "use strict";

        var n = r(6347),
          i = RegExp.prototype.exec;
        t.exports = function (t, e) {
          var r = t.exec;
          if ("function" == typeof r) {
            var o = r.call(t, e);
            if ("object" != _typeof(o)) throw new TypeError("RegExp exec method returned something other than an Object or null");
            return o;
          }
          if ("RegExp" !== n(t)) throw new TypeError("RegExp#exec called on incompatible receiver");
          return i.call(t, e);
        };
      },
      2562: function _(t, e, r) {
        "use strict";

        var n,
          i,
          o = r(5660),
          a = RegExp.prototype.exec,
          u = String.prototype.replace,
          c = a,
          s = "lastIndex",
          f = (n = /a/, i = /b*/g, a.call(n, "a"), a.call(i, "a"), 0 !== n[s] || 0 !== i[s]),
          l = void 0 !== /()??/.exec("")[1];
        (f || l) && (c = function c(t) {
          var e,
            r,
            n,
            i,
            c = this;
          return l && (r = new RegExp("^" + c.source + "$(?!\\s)", o.call(c))), f && (e = c[s]), n = a.call(c, t), f && n && (c[s] = c.global ? n.index + n[0].length : e), l && n && n.length > 1 && u.call(n[0], r, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              void 0 === arguments[i] && (n[i] = void 0);
            }
          }), n;
        }), t.exports = c;
      },
      2950: function _(t) {
        t.exports = function (t, e) {
          var r = e === Object(e) ? function (t) {
            return e[t];
          } : e;
          return function (e) {
            return String(e).replace(t, r);
          };
        };
      },
      1366: function _(t) {
        t.exports = Object.is || function (t, e) {
          return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
        };
      },
      578: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(666),
          o = r(1550),
          a = r(4036);
        t.exports = function (t) {
          n(n.S, t, {
            from: function from(t) {
              var e,
                r,
                n,
                u,
                c = arguments[1];
              return i(this), (e = void 0 !== c) && i(c), null == t ? new this() : (r = [], e ? (n = 0, u = o(c, arguments[2], 2), a(t, !1, function (t) {
                r.push(u(t, n++));
              })) : a(t, !1, r.push, r), new this(r));
            }
          });
        };
      },
      147: function _(t, e, r) {
        "use strict";

        var n = r(1693);
        t.exports = function (t) {
          n(n.S, t, {
            of: function of() {
              for (var t = arguments.length, e = new Array(t); t--;) {
                e[t] = arguments[t];
              }
              return new this(e);
            }
          });
        };
      },
      1794: function _(t, e, r) {
        var n = r(9708),
          i = r(5075),
          o = function o(t, e) {
            if (i(t), !n(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
          };
        t.exports = {
          set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, n) {
            try {
              (n = r(1550)(Function.call, r(9015).f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
            } catch (t) {
              e = !0;
            }
            return function (t, r) {
              return o(t, r), e ? t.__proto__ = r : n(t, r), t;
            };
          }({}, !1) : void 0),
          check: o
        };
      },
      2373: function _(t, e, r) {
        "use strict";

        var n = r(4405),
          i = r(4213),
          o = r(3144),
          a = r(4410)("species");
        t.exports = function (t) {
          var e = n[t];
          o && e && !e[a] && i.f(e, a, {
            configurable: !0,
            get: function get() {
              return this;
            }
          });
        };
      },
      5572: function _(t, e, r) {
        var n = r(4213).f,
          i = r(3050),
          o = r(4410)("toStringTag");
        t.exports = function (t, e, r) {
          t && !i(t = r ? t : t.prototype, o) && n(t, o, {
            configurable: !0,
            value: e
          });
        };
      },
      1145: function _(t, e, r) {
        var n = r(7104)("keys"),
          i = r(7767);
        t.exports = function (t) {
          return n[t] || (n[t] = i(t));
        };
      },
      7104: function _(t, e, r) {
        var n = r(8080),
          i = r(4405),
          o = "__core-js_shared__",
          a = i[o] || (i[o] = {});
        (t.exports = function (t, e) {
          return a[t] || (a[t] = void 0 !== e ? e : {});
        })("versions", []).push({
          version: n.version,
          mode: r(4925) ? "pure" : "global",
          copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
        });
      },
      3611: function _(t, e, r) {
        var n = r(5075),
          i = r(666),
          o = r(4410)("species");
        t.exports = function (t, e) {
          var r,
            a = n(t).constructor;
          return void 0 === a || null == (r = n(a)[o]) ? e : i(r);
        };
      },
      9718: function _(t, e, r) {
        "use strict";

        var n = r(496);
        t.exports = function (t, e) {
          return !!t && n(function () {
            e ? t.call(null, function () {}, 1) : t.call(null);
          });
        };
      },
      5454: function _(t, e, r) {
        var n = r(4058),
          i = r(1083);
        t.exports = function (t) {
          return function (e, r) {
            var o,
              a,
              u = String(i(e)),
              c = n(r),
              s = u.length;
            return c < 0 || c >= s ? t ? "" : void 0 : (o = u.charCodeAt(c)) < 55296 || o > 56319 || c + 1 === s || (a = u.charCodeAt(c + 1)) < 56320 || a > 57343 ? t ? u.charAt(c) : o : t ? u.slice(c, c + 2) : a - 56320 + (o - 55296 << 10) + 65536;
          };
        };
      },
      1452: function _(t, e, r) {
        var n = r(939),
          i = r(1083);
        t.exports = function (t, e, r) {
          if (n(e)) throw TypeError("String#" + r + " doesn't accept regex!");
          return String(i(t));
        };
      },
      7742: function _(t, e, r) {
        var n = r(1693),
          i = r(496),
          o = r(1083),
          a = /"/g,
          u = function u(t, e, r, n) {
            var i = String(o(t)),
              u = "<" + e;
            return "" !== r && (u += " " + r + '="' + String(n).replace(a, "&quot;") + '"'), u + ">" + i + "</" + e + ">";
          };
        t.exports = function (t, e) {
          var r = {};
          r[t] = e(u), n(n.P + n.F * i(function () {
            var e = ""[t]('"');
            return e !== e.toLowerCase() || e.split('"').length > 3;
          }), "String", r);
        };
      },
      6687: function _(t, e, r) {
        var n = r(5263),
          i = r(3874),
          o = r(1083);
        t.exports = function (t, e, r, a) {
          var u = String(o(t)),
            c = u.length,
            s = void 0 === r ? " " : String(r),
            f = n(e);
          if (f <= c || "" == s) return u;
          var l = f - c,
            h = i.call(s, Math.ceil(l / s.length));
          return h.length > l && (h = h.slice(0, l)), a ? h + u : u + h;
        };
      },
      3874: function _(t, e, r) {
        "use strict";

        var n = r(4058),
          i = r(1083);
        t.exports = function (t) {
          var e = String(i(this)),
            r = "",
            o = n(t);
          if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
          for (; o > 0; (o >>>= 1) && (e += e)) {
            1 & o && (r += e);
          }
          return r;
        };
      },
      5480: function _(t, e, r) {
        var n = r(1693),
          i = r(1083),
          o = r(496),
          a = r(1176),
          u = "[" + a + "]",
          c = RegExp("^" + u + u + "*"),
          s = RegExp(u + u + "*$"),
          f = function f(t, e, r) {
            var i = {},
              u = o(function () {
                return !!a[t]() || "​" != "​"[t]();
              }),
              c = i[t] = u ? e(l) : a[t];
            r && (i[r] = c), n(n.P + n.F * u, "String", i);
          },
          l = f.trim = function (t, e) {
            return t = String(i(t)), 1 & e && (t = t.replace(c, "")), 2 & e && (t = t.replace(s, "")), t;
          };
        t.exports = f;
      },
      1176: function _(t) {
        t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      },
      1597: function _(t, e, r) {
        var n,
          i,
          o,
          a = r(1550),
          u = r(1671),
          c = r(7727),
          s = r(7339),
          f = r(4405),
          l = f.process,
          h = f.setImmediate,
          v = f.clearImmediate,
          p = f.MessageChannel,
          d = f.Dispatch,
          g = 0,
          y = {},
          m = "onreadystatechange",
          x = function x() {
            var t = +this;
            if (y.hasOwnProperty(t)) {
              var e = y[t];
              delete y[t], e();
            }
          },
          b = function b(t) {
            x.call(t.data);
          };
        h && v || (h = function h(t) {
          for (var e = [], r = 1; arguments.length > r;) {
            e.push(arguments[r++]);
          }
          return y[++g] = function () {
            u("function" == typeof t ? t : Function(t), e);
          }, n(g), g;
        }, v = function v(t) {
          delete y[t];
        }, "process" == r(2380)(l) ? n = function n(t) {
          l.nextTick(a(x, t, 1));
        } : d && d.now ? n = function n(t) {
          d.now(a(x, t, 1));
        } : p ? (o = (i = new p()).port2, i.port1.onmessage = b, n = a(o.postMessage, o, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (n = function n(t) {
          f.postMessage(t + "", "*");
        }, f.addEventListener("message", b, !1)) : n = m in s("script") ? function (t) {
          c.appendChild(s("script"))[m] = function () {
            c.removeChild(this), x.call(t);
          };
        } : function (t) {
          setTimeout(a(x, t, 1), 0);
        }), t.exports = {
          set: h,
          clear: v
        };
      },
      9519: function _(t, e, r) {
        var n = r(4058),
          i = Math.max,
          o = Math.min;
        t.exports = function (t, e) {
          return (t = n(t)) < 0 ? i(t + e, 0) : o(t, e);
        };
      },
      4423: function _(t, e, r) {
        var n = r(4058),
          i = r(5263);
        t.exports = function (t) {
          if (void 0 === t) return 0;
          var e = n(t),
            r = i(e);
          if (e !== r) throw RangeError("Wrong length!");
          return r;
        };
      },
      4058: function _(t) {
        var e = Math.ceil,
          r = Math.floor;
        t.exports = function (t) {
          return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t);
        };
      },
      6282: function _(t, e, r) {
        var n = r(5945),
          i = r(1083);
        t.exports = function (t) {
          return n(i(t));
        };
      },
      5263: function _(t, e, r) {
        var n = r(4058),
          i = Math.min;
        t.exports = function (t) {
          return t > 0 ? i(n(t), 9007199254740991) : 0;
        };
      },
      6040: function _(t, e, r) {
        var n = r(1083);
        t.exports = function (t) {
          return Object(n(t));
        };
      },
      3825: function _(t, e, r) {
        var n = r(9708);
        t.exports = function (t, e) {
          if (!n(t)) return t;
          var r, i;
          if (e && "function" == typeof (r = t.toString) && !n(i = r.call(t))) return i;
          if ("function" == typeof (r = t.valueOf) && !n(i = r.call(t))) return i;
          if (!e && "function" == typeof (r = t.toString) && !n(i = r.call(t))) return i;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      3412: function _(t, e, r) {
        "use strict";

        if (r(3144)) {
          var n = r(4925),
            i = r(4405),
            o = r(496),
            a = r(1693),
            u = r(6331),
            c = r(7050),
            s = r(1550),
            f = r(269),
            l = r(3388),
            h = r(4461),
            v = r(3227),
            p = r(4058),
            d = r(5263),
            g = r(4423),
            y = r(9519),
            m = r(3825),
            x = r(3050),
            b = r(6347),
            w = r(9708),
            S = r(6040),
            E = r(2193),
            _ = r(6088),
            P = r(8539),
            O = r(7173).f,
            k = r(6882),
            M = r(7767),
            F = r(4410),
            L = r(3635),
            j = r(4513),
            B = r(3611),
            I = r(6172),
            T = r(7985),
            A = r(3229),
            R = r(2373),
            N = r(2378),
            C = r(3697),
            G = r(4213),
            U = r(9015),
            Y = G.f,
            X = U.f,
            D = i.RangeError,
            V = i.TypeError,
            W = i.Uint8Array,
            z = "ArrayBuffer",
            H = "Shared" + z,
            q = "BYTES_PER_ELEMENT",
            $ = "prototype",
            J = Array[$],
            K = c.ArrayBuffer,
            Z = c.DataView,
            Q = L(0),
            tt = L(2),
            et = L(3),
            rt = L(4),
            nt = L(5),
            it = L(6),
            ot = j(!0),
            at = j(!1),
            ut = I.values,
            ct = I.keys,
            st = I.entries,
            ft = J.lastIndexOf,
            lt = J.reduce,
            ht = J.reduceRight,
            vt = J.join,
            pt = J.sort,
            dt = J.slice,
            gt = J.toString,
            yt = J.toLocaleString,
            mt = F("iterator"),
            xt = F("toStringTag"),
            bt = M("typed_constructor"),
            wt = M("def_constructor"),
            St = u.CONSTR,
            Et = u.TYPED,
            _t = u.VIEW,
            Pt = "Wrong length!",
            Ot = L(1, function (t, e) {
              return jt(B(t, t[wt]), e);
            }),
            kt = o(function () {
              return 1 === new W(new Uint16Array([1]).buffer)[0];
            }),
            Mt = !!W && !!W[$].set && o(function () {
              new W(1).set({});
            }),
            Ft = function Ft(t, e) {
              var r = p(t);
              if (r < 0 || r % e) throw D("Wrong offset!");
              return r;
            },
            Lt = function Lt(t) {
              if (w(t) && Et in t) return t;
              throw V(t + " is not a typed array!");
            },
            jt = function jt(t, e) {
              if (!w(t) || !(bt in t)) throw V("It is not a typed array constructor!");
              return new t(e);
            },
            Bt = function Bt(t, e) {
              return It(B(t, t[wt]), e);
            },
            It = function It(t, e) {
              for (var r = 0, n = e.length, i = jt(t, n); n > r;) {
                i[r] = e[r++];
              }
              return i;
            },
            Tt = function Tt(t, e, r) {
              Y(t, e, {
                get: function get() {
                  return this._d[r];
                }
              });
            },
            At = function At(t) {
              var e,
                r,
                n,
                i,
                o,
                a,
                u = S(t),
                c = arguments.length,
                f = c > 1 ? arguments[1] : void 0,
                l = void 0 !== f,
                h = k(u);
              if (null != h && !E(h)) {
                for (a = h.call(u), n = [], e = 0; !(o = a.next()).done; e++) {
                  n.push(o.value);
                }
                u = n;
              }
              for (l && c > 2 && (f = s(f, arguments[2], 2)), e = 0, r = d(u.length), i = jt(this, r); r > e; e++) {
                i[e] = l ? f(u[e], e) : u[e];
              }
              return i;
            },
            Rt = function Rt() {
              for (var t = 0, e = arguments.length, r = jt(this, e); e > t;) {
                r[t] = arguments[t++];
              }
              return r;
            },
            Nt = !!W && o(function () {
              yt.call(new W(1));
            }),
            Ct = function Ct() {
              return yt.apply(Nt ? dt.call(Lt(this)) : Lt(this), arguments);
            },
            Gt = {
              copyWithin: function copyWithin(t, e) {
                return C.call(Lt(this), t, e, arguments.length > 2 ? arguments[2] : void 0);
              },
              every: function every(t) {
                return rt(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              fill: function fill(t) {
                return N.apply(Lt(this), arguments);
              },
              filter: function filter(t) {
                return Bt(this, tt(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0));
              },
              find: function find(t) {
                return nt(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              findIndex: function findIndex(t) {
                return it(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              forEach: function forEach(t) {
                Q(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              indexOf: function indexOf(t) {
                return at(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              includes: function includes(t) {
                return ot(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              join: function join(t) {
                return vt.apply(Lt(this), arguments);
              },
              lastIndexOf: function lastIndexOf(t) {
                return ft.apply(Lt(this), arguments);
              },
              map: function map(t) {
                return Ot(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              reduce: function reduce(t) {
                return lt.apply(Lt(this), arguments);
              },
              reduceRight: function reduceRight(t) {
                return ht.apply(Lt(this), arguments);
              },
              reverse: function reverse() {
                for (var t, e = this, r = Lt(e).length, n = Math.floor(r / 2), i = 0; i < n;) {
                  t = e[i], e[i++] = e[--r], e[r] = t;
                }
                return e;
              },
              some: function some(t) {
                return et(Lt(this), t, arguments.length > 1 ? arguments[1] : void 0);
              },
              sort: function sort(t) {
                return pt.call(Lt(this), t);
              },
              subarray: function subarray(t, e) {
                var r = Lt(this),
                  n = r.length,
                  i = y(t, n);
                return new (B(r, r[wt]))(r.buffer, r.byteOffset + i * r.BYTES_PER_ELEMENT, d((void 0 === e ? n : y(e, n)) - i));
              }
            },
            Ut = function Ut(t, e) {
              return Bt(this, dt.call(Lt(this), t, e));
            },
            Yt = function Yt(t) {
              Lt(this);
              var e = Ft(arguments[1], 1),
                r = this.length,
                n = S(t),
                i = d(n.length),
                o = 0;
              if (i + e > r) throw D(Pt);
              for (; o < i;) {
                this[e + o] = n[o++];
              }
            },
            Xt = {
              entries: function entries() {
                return st.call(Lt(this));
              },
              keys: function keys() {
                return ct.call(Lt(this));
              },
              values: function values() {
                return ut.call(Lt(this));
              }
            },
            Dt = function Dt(t, e) {
              return w(t) && t[Et] && "symbol" != _typeof(e) && e in t && String(+e) == String(e);
            },
            Vt = function Vt(t, e) {
              return Dt(t, e = m(e, !0)) ? l(2, t[e]) : X(t, e);
            },
            Wt = function Wt(t, e, r) {
              return !(Dt(t, e = m(e, !0)) && w(r) && x(r, "value")) || x(r, "get") || x(r, "set") || r.configurable || x(r, "writable") && !r.writable || x(r, "enumerable") && !r.enumerable ? Y(t, e, r) : (t[e] = r.value, t);
            };
          St || (U.f = Vt, G.f = Wt), a(a.S + a.F * !St, "Object", {
            getOwnPropertyDescriptor: Vt,
            defineProperty: Wt
          }), o(function () {
            gt.call({});
          }) && (gt = yt = function yt() {
            return vt.call(this);
          });
          var zt = v({}, Gt);
          v(zt, Xt), h(zt, mt, Xt.values), v(zt, {
            slice: Ut,
            set: Yt,
            constructor: function constructor() {},
            toString: gt,
            toLocaleString: Ct
          }), Tt(zt, "buffer", "b"), Tt(zt, "byteOffset", "o"), Tt(zt, "byteLength", "l"), Tt(zt, "length", "e"), Y(zt, xt, {
            get: function get() {
              return this[Et];
            }
          }), t.exports = function (t, e, r, c) {
            var s = t + ((c = !!c) ? "Clamped" : "") + "Array",
              l = "get" + t,
              v = "set" + t,
              p = i[s],
              y = p || {},
              m = p && P(p),
              x = !p || !u.ABV,
              S = {},
              E = p && p[$],
              k = function k(t, r) {
                Y(t, r, {
                  get: function get() {
                    return function (t, r) {
                      var n = t._d;
                      return n.v[l](r * e + n.o, kt);
                    }(this, r);
                  },
                  set: function set(t) {
                    return function (t, r, n) {
                      var i = t._d;
                      c && (n = (n = Math.round(n)) < 0 ? 0 : n > 255 ? 255 : 255 & n), i.v[v](r * e + i.o, n, kt);
                    }(this, r, t);
                  },
                  enumerable: !0
                });
              };
            x ? (p = r(function (t, r, n, i) {
              f(t, p, s, "_d");
              var o,
                a,
                u,
                c,
                l = 0,
                v = 0;
              if (w(r)) {
                if (!(r instanceof K || (c = b(r)) == z || c == H)) return Et in r ? It(p, r) : At.call(p, r);
                o = r, v = Ft(n, e);
                var y = r.byteLength;
                if (void 0 === i) {
                  if (y % e) throw D(Pt);
                  if ((a = y - v) < 0) throw D(Pt);
                } else if ((a = d(i) * e) + v > y) throw D(Pt);
                u = a / e;
              } else u = g(r), o = new K(a = u * e);
              for (h(t, "_d", {
                b: o,
                o: v,
                l: a,
                e: u,
                v: new Z(o)
              }); l < u;) {
                k(t, l++);
              }
            }), E = p[$] = _(zt), h(E, "constructor", p)) : o(function () {
              p(1);
            }) && o(function () {
              new p(-1);
            }) && A(function (t) {
              new p(), new p(null), new p(1.5), new p(t);
            }, !0) || (p = r(function (t, r, n, i) {
              var o;
              return f(t, p, s), w(r) ? r instanceof K || (o = b(r)) == z || o == H ? void 0 !== i ? new y(r, Ft(n, e), i) : void 0 !== n ? new y(r, Ft(n, e)) : new y(r) : Et in r ? It(p, r) : At.call(p, r) : new y(g(r));
            }), Q(m !== Function.prototype ? O(y).concat(O(m)) : O(y), function (t) {
              t in p || h(p, t, y[t]);
            }), p[$] = E, n || (E.constructor = p));
            var M = E[mt],
              F = !!M && ("values" == M.name || null == M.name),
              L = Xt.values;
            h(p, bt, !0), h(E, Et, s), h(E, _t, !0), h(E, wt, p), (c ? new p(1)[xt] == s : xt in E) || Y(E, xt, {
              get: function get() {
                return s;
              }
            }), S[s] = p, a(a.G + a.W + a.F * (p != y), S), a(a.S, s, {
              BYTES_PER_ELEMENT: e
            }), a(a.S + a.F * o(function () {
              y.of.call(p, 1);
            }), s, {
              from: At,
              of: Rt
            }), q in E || h(E, q, e), a(a.P, s, Gt), R(s), a(a.P + a.F * Mt, s, {
              set: Yt
            }), a(a.P + a.F * !F, s, Xt), n || E.toString == gt || (E.toString = gt), a(a.P + a.F * o(function () {
              new p(1).slice();
            }), s, {
              slice: Ut
            }), a(a.P + a.F * (o(function () {
              return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString();
            }) || !o(function () {
              E.toLocaleString.call([1, 2]);
            })), s, {
              toLocaleString: Ct
            }), T[s] = F ? M : L, n || F || h(E, mt, L);
          };
        } else t.exports = function () {};
      },
      7050: function _(t, e, r) {
        "use strict";

        var n = r(4405),
          i = r(3144),
          o = r(4925),
          a = r(6331),
          u = r(4461),
          c = r(3227),
          s = r(496),
          f = r(269),
          l = r(4058),
          h = r(5263),
          v = r(4423),
          p = r(7173).f,
          d = r(4213).f,
          g = r(2378),
          y = r(5572),
          m = "ArrayBuffer",
          x = "DataView",
          b = "prototype",
          w = "Wrong index!",
          _S2 = n[m],
          _E = n[x],
          _ = n.Math,
          P = n.RangeError,
          O = n.Infinity,
          k = _S2,
          M = _.abs,
          F = _.pow,
          L = _.floor,
          j = _.log,
          B = _.LN2,
          I = "buffer",
          T = "byteLength",
          A = "byteOffset",
          R = i ? "_b" : I,
          N = i ? "_l" : T,
          C = i ? "_o" : A;
        function G(t, e, r) {
          var n,
            i,
            o,
            a = new Array(r),
            u = 8 * r - e - 1,
            c = (1 << u) - 1,
            s = c >> 1,
            f = 23 === e ? F(2, -24) - F(2, -77) : 0,
            l = 0,
            h = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
          for ((t = M(t)) != t || t === O ? (i = t != t ? 1 : 0, n = c) : (n = L(j(t) / B), t * (o = F(2, -n)) < 1 && (n--, o *= 2), (t += n + s >= 1 ? f / o : f * F(2, 1 - s)) * o >= 2 && (n++, o /= 2), n + s >= c ? (i = 0, n = c) : n + s >= 1 ? (i = (t * o - 1) * F(2, e), n += s) : (i = t * F(2, s - 1) * F(2, e), n = 0)); e >= 8; a[l++] = 255 & i, i /= 256, e -= 8) {
            ;
          }
          for (n = n << e | i, u += e; u > 0; a[l++] = 255 & n, n /= 256, u -= 8) {
            ;
          }
          return a[--l] |= 128 * h, a;
        }
        function U(t, e, r) {
          var n,
            i = 8 * r - e - 1,
            o = (1 << i) - 1,
            a = o >> 1,
            u = i - 7,
            c = r - 1,
            s = t[c--],
            f = 127 & s;
          for (s >>= 7; u > 0; f = 256 * f + t[c], c--, u -= 8) {
            ;
          }
          for (n = f & (1 << -u) - 1, f >>= -u, u += e; u > 0; n = 256 * n + t[c], c--, u -= 8) {
            ;
          }
          if (0 === f) f = 1 - a;else {
            if (f === o) return n ? NaN : s ? -O : O;
            n += F(2, e), f -= a;
          }
          return (s ? -1 : 1) * n * F(2, f - e);
        }
        function Y(t) {
          return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
        }
        function X(t) {
          return [255 & t];
        }
        function D(t) {
          return [255 & t, t >> 8 & 255];
        }
        function V(t) {
          return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
        }
        function W(t) {
          return G(t, 52, 8);
        }
        function z(t) {
          return G(t, 23, 4);
        }
        function H(t, e, r) {
          d(t[b], e, {
            get: function get() {
              return this[r];
            }
          });
        }
        function q(t, e, r, n) {
          var i = v(+r);
          if (i + e > t[N]) throw P(w);
          var o = t[R]._b,
            a = i + t[C],
            u = o.slice(a, a + e);
          return n ? u : u.reverse();
        }
        function $(t, e, r, n, i, o) {
          var a = v(+r);
          if (a + e > t[N]) throw P(w);
          for (var u = t[R]._b, c = a + t[C], s = n(+i), f = 0; f < e; f++) {
            u[c + f] = s[o ? f : e - f - 1];
          }
        }
        if (a.ABV) {
          if (!s(function () {
            _S2(1);
          }) || !s(function () {
            new _S2(-1);
          }) || s(function () {
            return new _S2(), new _S2(1.5), new _S2(NaN), _S2.name != m;
          })) {
            for (var J, K = (_S2 = function S(t) {
                return f(this, _S2), new k(v(t));
              })[b] = k[b], Z = p(k), Q = 0; Z.length > Q;) {
              (J = Z[Q++]) in _S2 || u(_S2, J, k[J]);
            }
            o || (K.constructor = _S2);
          }
          var tt = new _E(new _S2(2)),
            et = _E[b].setInt8;
          tt.setInt8(0, 2147483648), tt.setInt8(1, 2147483649), !tt.getInt8(0) && tt.getInt8(1) || c(_E[b], {
            setInt8: function setInt8(t, e) {
              et.call(this, t, e << 24 >> 24);
            },
            setUint8: function setUint8(t, e) {
              et.call(this, t, e << 24 >> 24);
            }
          }, !0);
        } else _S2 = function _S(t) {
          f(this, _S2, m);
          var e = v(t);
          this._b = g.call(new Array(e), 0), this[N] = e;
        }, _E = function E(t, e, r) {
          f(this, _E, x), f(t, _S2, x);
          var n = t[N],
            i = l(e);
          if (i < 0 || i > n) throw P("Wrong offset!");
          if (i + (r = void 0 === r ? n - i : h(r)) > n) throw P("Wrong length!");
          this[R] = t, this[C] = i, this[N] = r;
        }, i && (H(_S2, T, "_l"), H(_E, I, "_b"), H(_E, T, "_l"), H(_E, A, "_o")), c(_E[b], {
          getInt8: function getInt8(t) {
            return q(this, 1, t)[0] << 24 >> 24;
          },
          getUint8: function getUint8(t) {
            return q(this, 1, t)[0];
          },
          getInt16: function getInt16(t) {
            var e = q(this, 2, t, arguments[1]);
            return (e[1] << 8 | e[0]) << 16 >> 16;
          },
          getUint16: function getUint16(t) {
            var e = q(this, 2, t, arguments[1]);
            return e[1] << 8 | e[0];
          },
          getInt32: function getInt32(t) {
            return Y(q(this, 4, t, arguments[1]));
          },
          getUint32: function getUint32(t) {
            return Y(q(this, 4, t, arguments[1])) >>> 0;
          },
          getFloat32: function getFloat32(t) {
            return U(q(this, 4, t, arguments[1]), 23, 4);
          },
          getFloat64: function getFloat64(t) {
            return U(q(this, 8, t, arguments[1]), 52, 8);
          },
          setInt8: function setInt8(t, e) {
            $(this, 1, t, X, e);
          },
          setUint8: function setUint8(t, e) {
            $(this, 1, t, X, e);
          },
          setInt16: function setInt16(t, e) {
            $(this, 2, t, D, e, arguments[2]);
          },
          setUint16: function setUint16(t, e) {
            $(this, 2, t, D, e, arguments[2]);
          },
          setInt32: function setInt32(t, e) {
            $(this, 4, t, V, e, arguments[2]);
          },
          setUint32: function setUint32(t, e) {
            $(this, 4, t, V, e, arguments[2]);
          },
          setFloat32: function setFloat32(t, e) {
            $(this, 4, t, z, e, arguments[2]);
          },
          setFloat64: function setFloat64(t, e) {
            $(this, 8, t, W, e, arguments[2]);
          }
        });
        y(_S2, m), y(_E, x), u(_E[b], a.VIEW, !0), e[m] = _S2, e[x] = _E;
      },
      6331: function _(t, e, r) {
        for (var n, i = r(4405), o = r(4461), a = r(7767), u = a("typed_array"), c = a("view"), s = !(!i.ArrayBuffer || !i.DataView), f = s, l = 0, h = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); l < 9;) {
          (n = i[h[l++]]) ? (o(n.prototype, u, !0), o(n.prototype, c, !0)) : f = !1;
        }
        t.exports = {
          ABV: s,
          CONSTR: f,
          TYPED: u,
          VIEW: c
        };
      },
      7767: function _(t) {
        var e = 0,
          r = Math.random();
        t.exports = function (t) {
          return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36));
        };
      },
      7860: function _(t, e, r) {
        var n = r(4405).navigator;
        t.exports = n && n.userAgent || "";
      },
      1554: function _(t, e, r) {
        var n = r(9708);
        t.exports = function (t, e) {
          if (!n(t) || t._t !== e) throw TypeError("Incompatible receiver, " + e + " required!");
          return t;
        };
      },
      4519: function _(t, e, r) {
        var n = r(4405),
          i = r(8080),
          o = r(4925),
          a = r(3438),
          u = r(4213).f;
        t.exports = function (t) {
          var e = i.Symbol || (i.Symbol = o ? {} : n.Symbol || {});
          "_" == t.charAt(0) || t in e || u(e, t, {
            value: a.f(t)
          });
        };
      },
      3438: function _(t, e, r) {
        e.f = r(4410);
      },
      4410: function _(t, e, r) {
        var n = r(7104)("wks"),
          i = r(7767),
          o = r(4405).Symbol,
          a = "function" == typeof o;
        (t.exports = function (t) {
          return n[t] || (n[t] = a && o[t] || (a ? o : i)("Symbol." + t));
        }).store = n;
      },
      6882: function _(t, e, r) {
        var n = r(6347),
          i = r(4410)("iterator"),
          o = r(7985);
        t.exports = r(8080).getIteratorMethod = function (t) {
          if (null != t) return t[i] || t["@@iterator"] || o[n(t)];
        };
      },
      4530: function _(t, e, r) {
        var n = r(1693),
          i = r(2950)(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        n(n.S, "RegExp", {
          escape: function escape(t) {
            return i(t);
          }
        });
      },
      9440: function _(t, e, r) {
        var n = r(1693);
        n(n.P, "Array", {
          copyWithin: r(3697)
        }), r(7296)("copyWithin");
      },
      6075: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(4);
        n(n.P + n.F * !r(9718)([].every, !0), "Array", {
          every: function every(t) {
            return i(this, t, arguments[1]);
          }
        });
      },
      5588: function _(t, e, r) {
        var n = r(1693);
        n(n.P, "Array", {
          fill: r(2378)
        }), r(7296)("fill");
      },
      8931: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(2);
        n(n.P + n.F * !r(9718)([].filter, !0), "Array", {
          filter: function filter(t) {
            return i(this, t, arguments[1]);
          }
        });
      },
      5294: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(6),
          o = "findIndex",
          a = !0;
        o in [] && Array(1)[o](function () {
          a = !1;
        }), n(n.P + n.F * a, "Array", {
          findIndex: function findIndex(t) {
            return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), r(7296)(o);
      },
      6233: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(5),
          o = "find",
          a = !0;
        o in [] && Array(1)[o](function () {
          a = !1;
        }), n(n.P + n.F * a, "Array", {
          find: function find(t) {
            return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), r(7296)(o);
      },
      9946: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(0),
          o = r(9718)([].forEach, !0);
        n(n.P + n.F * !o, "Array", {
          forEach: function forEach(t) {
            return i(this, t, arguments[1]);
          }
        });
      },
      9731: function _(t, e, r) {
        "use strict";

        var n = r(1550),
          i = r(1693),
          o = r(6040),
          a = r(8226),
          u = r(2193),
          c = r(5263),
          s = r(2559),
          f = r(6882);
        i(i.S + i.F * !r(3229)(function (t) {
          Array.from(t);
        }), "Array", {
          from: function from(t) {
            var e,
              r,
              i,
              l,
              h = o(t),
              v = "function" == typeof this ? this : Array,
              p = arguments.length,
              d = p > 1 ? arguments[1] : void 0,
              g = void 0 !== d,
              y = 0,
              m = f(h);
            if (g && (d = n(d, p > 2 ? arguments[2] : void 0, 2)), null == m || v == Array && u(m)) for (r = new v(e = c(h.length)); e > y; y++) {
              s(r, y, g ? d(h[y], y) : h[y]);
            } else for (l = m.call(h), r = new v(); !(i = l.next()).done; y++) {
              s(r, y, g ? a(l, d, [i.value, y], !0) : i.value);
            }
            return r.length = y, r;
          }
        });
      },
      9209: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4513)(!1),
          o = [].indexOf,
          a = !!o && 1 / [1].indexOf(1, -0) < 0;
        n(n.P + n.F * (a || !r(9718)(o)), "Array", {
          indexOf: function indexOf(t) {
            return a ? o.apply(this, arguments) || 0 : i(this, t, arguments[1]);
          }
        });
      },
      2550: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Array", {
          isArray: r(3623)
        });
      },
      6172: function _(t, e, r) {
        "use strict";

        var n = r(7296),
          i = r(4257),
          o = r(7985),
          a = r(6282);
        t.exports = r(5706)(Array, "Array", function (t, e) {
          this._t = a(t), this._i = 0, this._k = e;
        }, function () {
          var t = this._t,
            e = this._k,
            r = this._i++;
          return !t || r >= t.length ? (this._t = void 0, i(1)) : i(0, "keys" == e ? r : "values" == e ? t[r] : [r, t[r]]);
        }, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries");
      },
      5956: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6282),
          o = [].join;
        n(n.P + n.F * (r(5945) != Object || !r(9718)(o)), "Array", {
          join: function join(t) {
            return o.call(i(this), void 0 === t ? "," : t);
          }
        });
      },
      2733: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6282),
          o = r(4058),
          a = r(5263),
          u = [].lastIndexOf,
          c = !!u && 1 / [1].lastIndexOf(1, -0) < 0;
        n(n.P + n.F * (c || !r(9718)(u)), "Array", {
          lastIndexOf: function lastIndexOf(t) {
            if (c) return u.apply(this, arguments) || 0;
            var e = i(this),
              r = a(e.length),
              n = r - 1;
            for (arguments.length > 1 && (n = Math.min(n, o(arguments[1]))), n < 0 && (n = r + n); n >= 0; n--) {
              if (n in e && e[n] === t) return n || 0;
            }
            return -1;
          }
        });
      },
      2369: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(1);
        n(n.P + n.F * !r(9718)([].map, !0), "Array", {
          map: function map(t) {
            return i(this, t, arguments[1]);
          }
        });
      },
      745: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(2559);
        n(n.S + n.F * r(496)(function () {
          function t() {}
          return !(Array.of.call(t) instanceof t);
        }), "Array", {
          of: function of() {
            for (var t = 0, e = arguments.length, r = new ("function" == typeof this ? this : Array)(e); e > t;) {
              i(r, t, arguments[t++]);
            }
            return r.length = e, r;
          }
        });
      },
      3565: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6574);
        n(n.P + n.F * !r(9718)([].reduceRight, !0), "Array", {
          reduceRight: function reduceRight(t) {
            return i(this, t, arguments.length, arguments[1], !0);
          }
        });
      },
      9662: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6574);
        n(n.P + n.F * !r(9718)([].reduce, !0), "Array", {
          reduce: function reduce(t) {
            return i(this, t, arguments.length, arguments[1], !1);
          }
        });
      },
      6149: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(7727),
          o = r(2380),
          a = r(9519),
          u = r(5263),
          c = [].slice;
        n(n.P + n.F * r(496)(function () {
          i && c.call(i);
        }), "Array", {
          slice: function slice(t, e) {
            var r = u(this.length),
              n = o(this);
            if (e = void 0 === e ? r : e, "Array" == n) return c.call(this, t, e);
            for (var i = a(t, r), s = a(e, r), f = u(s - i), l = new Array(f), h = 0; h < f; h++) {
              l[h] = "String" == n ? this.charAt(i + h) : this[i + h];
            }
            return l;
          }
        });
      },
      4135: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(3635)(3);
        n(n.P + n.F * !r(9718)([].some, !0), "Array", {
          some: function some(t) {
            return i(this, t, arguments[1]);
          }
        });
      },
      2106: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(666),
          o = r(6040),
          a = r(496),
          u = [].sort,
          c = [1, 2, 3];
        n(n.P + n.F * (a(function () {
          c.sort(void 0);
        }) || !a(function () {
          c.sort(null);
        }) || !r(9718)(u)), "Array", {
          sort: function sort(t) {
            return void 0 === t ? u.call(o(this)) : u.call(o(this), i(t));
          }
        });
      },
      5324: function _(t, e, r) {
        r(2373)("Array");
      },
      2330: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Date", {
          now: function now() {
            return new Date().getTime();
          }
        });
      },
      2943: function _(t, e, r) {
        var n = r(1693),
          i = r(9496);
        n(n.P + n.F * (Date.prototype.toISOString !== i), "Date", {
          toISOString: i
        });
      },
      6665: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6040),
          o = r(3825);
        n(n.P + n.F * r(496)(function () {
          return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
            toISOString: function toISOString() {
              return 1;
            }
          });
        }), "Date", {
          toJSON: function toJSON(t) {
            var e = i(this),
              r = o(e);
            return "number" != typeof r || isFinite(r) ? e.toISOString() : null;
          }
        });
      },
      1002: function _(t, e, r) {
        var n = r(4410)("toPrimitive"),
          i = Date.prototype;
        n in i || r(4461)(i, n, r(2967));
      },
      8616: function _(t, e, r) {
        var n = Date.prototype,
          i = "Invalid Date",
          o = "toString",
          a = n[o],
          u = n.getTime;
        new Date(NaN) + "" != i && r(9593)(n, o, function () {
          var t = u.call(this);
          return t == t ? a.call(this) : i;
        });
      },
      7442: function _(t, e, r) {
        var n = r(1693);
        n(n.P, "Function", {
          bind: r(7240)
        });
      },
      7998: function _(t, e, r) {
        "use strict";

        var n = r(9708),
          i = r(8539),
          o = r(4410)("hasInstance"),
          a = Function.prototype;
        o in a || r(4213).f(a, o, {
          value: function value(t) {
            if ("function" != typeof this || !n(t)) return !1;
            if (!n(this.prototype)) return t instanceof this;
            for (; t = i(t);) {
              if (this.prototype === t) return !0;
            }
            return !1;
          }
        });
      },
      6278: function _(t, e, r) {
        var n = r(4213).f,
          i = Function.prototype,
          o = /^\s*function ([^ (]*)/,
          a = "name";
        a in i || r(3144) && n(i, a, {
          configurable: !0,
          get: function get() {
            try {
              return ("" + this).match(o)[1];
            } catch (t) {
              return "";
            }
          }
        });
      },
      9164: function _(t, e, r) {
        "use strict";

        var n = r(7647),
          i = r(1554),
          o = "Map";
        t.exports = r(8107)(o, function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        }, {
          get: function get(t) {
            var e = n.getEntry(i(this, o), t);
            return e && e.v;
          },
          set: function set(t, e) {
            return n.def(i(this, o), 0 === t ? 0 : t, e);
          }
        }, n, !0);
      },
      6367: function _(t, e, r) {
        var n = r(1693),
          i = r(8738),
          o = Math.sqrt,
          a = Math.acosh;
        n(n.S + n.F * !(a && 710 == Math.floor(a(Number.MAX_VALUE)) && a(1 / 0) == 1 / 0), "Math", {
          acosh: function acosh(t) {
            return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1));
          }
        });
      },
      7345: function _(t, e, r) {
        var n = r(1693),
          i = Math.asinh;
        n(n.S + n.F * !(i && 1 / i(0) > 0), "Math", {
          asinh: function t(e) {
            return isFinite(e = +e) && 0 != e ? e < 0 ? -t(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e;
          }
        });
      },
      9471: function _(t, e, r) {
        var n = r(1693),
          i = Math.atanh;
        n(n.S + n.F * !(i && 1 / i(-0) < 0), "Math", {
          atanh: function atanh(t) {
            return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
          }
        });
      },
      5890: function _(t, e, r) {
        var n = r(1693),
          i = r(9439);
        n(n.S, "Math", {
          cbrt: function cbrt(t) {
            return i(t = +t) * Math.pow(Math.abs(t), 1 / 3);
          }
        });
      },
      8299: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          clz32: function clz32(t) {
            return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
          }
        });
      },
      9286: function _(t, e, r) {
        var n = r(1693),
          i = Math.exp;
        n(n.S, "Math", {
          cosh: function cosh(t) {
            return (i(t = +t) + i(-t)) / 2;
          }
        });
      },
      8240: function _(t, e, r) {
        var n = r(1693),
          i = r(8651);
        n(n.S + n.F * (i != Math.expm1), "Math", {
          expm1: i
        });
      },
      1050: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          fround: r(8961)
        });
      },
      8246: function _(t, e, r) {
        var n = r(1693),
          i = Math.abs;
        n(n.S, "Math", {
          hypot: function hypot(t, e) {
            for (var r, n, o = 0, a = 0, u = arguments.length, c = 0; a < u;) {
              c < (r = i(arguments[a++])) ? (o = o * (n = c / r) * n + 1, c = r) : o += r > 0 ? (n = r / c) * n : r;
            }
            return c === 1 / 0 ? 1 / 0 : c * Math.sqrt(o);
          }
        });
      },
      9349: function _(t, e, r) {
        var n = r(1693),
          i = Math.imul;
        n(n.S + n.F * r(496)(function () {
          return -5 != i(4294967295, 5) || 2 != i.length;
        }), "Math", {
          imul: function imul(t, e) {
            var r = 65535,
              n = +t,
              i = +e,
              o = r & n,
              a = r & i;
            return 0 | o * a + ((r & n >>> 16) * a + o * (r & i >>> 16) << 16 >>> 0);
          }
        });
      },
      5159: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          log10: function log10(t) {
            return Math.log(t) * Math.LOG10E;
          }
        });
      },
      3158: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          log1p: r(8738)
        });
      },
      7521: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          log2: function log2(t) {
            return Math.log(t) / Math.LN2;
          }
        });
      },
      2565: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          sign: r(9439)
        });
      },
      8337: function _(t, e, r) {
        var n = r(1693),
          i = r(8651),
          o = Math.exp;
        n(n.S + n.F * r(496)(function () {
          return -2e-17 != !Math.sinh(-2e-17);
        }), "Math", {
          sinh: function sinh(t) {
            return Math.abs(t = +t) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
          }
        });
      },
      8582: function _(t, e, r) {
        var n = r(1693),
          i = r(8651),
          o = Math.exp;
        n(n.S, "Math", {
          tanh: function tanh(t) {
            var e = i(t = +t),
              r = i(-t);
            return e == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (e - r) / (o(t) + o(-t));
          }
        });
      },
      2310: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          trunc: function trunc(t) {
            return (t > 0 ? Math.floor : Math.ceil)(t);
          }
        });
      },
      5434: function _(t, e, r) {
        "use strict";

        var n = r(4405),
          i = r(3050),
          o = r(2380),
          a = r(7856),
          u = r(3825),
          c = r(496),
          s = r(7173).f,
          f = r(9015).f,
          l = r(4213).f,
          h = r(5480).trim,
          v = "Number",
          _p = n[v],
          d = _p,
          g = _p.prototype,
          y = o(r(6088)(g)) == v,
          m = ("trim" in String.prototype),
          x = function x(t) {
            var e = u(t, !1);
            if ("string" == typeof e && e.length > 2) {
              var r,
                n,
                i,
                o = (e = m ? e.trim() : h(e, 3)).charCodeAt(0);
              if (43 === o || 45 === o) {
                if (88 === (r = e.charCodeAt(2)) || 120 === r) return NaN;
              } else if (48 === o) {
                switch (e.charCodeAt(1)) {
                  case 66:
                  case 98:
                    n = 2, i = 49;
                    break;
                  case 79:
                  case 111:
                    n = 8, i = 55;
                    break;
                  default:
                    return +e;
                }
                for (var a, c = e.slice(2), s = 0, f = c.length; s < f; s++) {
                  if ((a = c.charCodeAt(s)) < 48 || a > i) return NaN;
                }
                return parseInt(c, n);
              }
            }
            return +e;
          };
        if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
          _p = function p(t) {
            var e = arguments.length < 1 ? 0 : t,
              r = this;
            return r instanceof _p && (y ? c(function () {
              g.valueOf.call(r);
            }) : o(r) != v) ? a(new d(x(e)), r, _p) : x(e);
          };
          for (var b, w = r(3144) ? s(d) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), S = 0; w.length > S; S++) {
            i(d, b = w[S]) && !i(_p, b) && l(_p, b, f(d, b));
          }
          _p.prototype = g, g.constructor = _p, r(9593)(n, v, _p);
        }
      },
      4412: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Number", {
          EPSILON: Math.pow(2, -52)
        });
      },
      7993: function _(t, e, r) {
        var n = r(1693),
          i = r(4405).isFinite;
        n(n.S, "Number", {
          isFinite: function isFinite(t) {
            return "number" == typeof t && i(t);
          }
        });
      },
      1755: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Number", {
          isInteger: r(8645)
        });
      },
      5390: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Number", {
          isNaN: function isNaN(t) {
            return t != t;
          }
        });
      },
      352: function _(t, e, r) {
        var n = r(1693),
          i = r(8645),
          o = Math.abs;
        n(n.S, "Number", {
          isSafeInteger: function isSafeInteger(t) {
            return i(t) && o(t) <= 9007199254740991;
          }
        });
      },
      526: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Number", {
          MAX_SAFE_INTEGER: 9007199254740991
        });
      },
      708: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Number", {
          MIN_SAFE_INTEGER: -9007199254740991
        });
      },
      2360: function _(t, e, r) {
        var n = r(1693),
          i = r(5995);
        n(n.S + n.F * (Number.parseFloat != i), "Number", {
          parseFloat: i
        });
      },
      5114: function _(t, e, r) {
        var n = r(1693),
          i = r(7252);
        n(n.S + n.F * (Number.parseInt != i), "Number", {
          parseInt: i
        });
      },
      7967: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4058),
          o = r(8479),
          a = r(3874),
          u = 1..toFixed,
          c = Math.floor,
          s = [0, 0, 0, 0, 0, 0],
          f = "Number.toFixed: incorrect invocation!",
          l = "0",
          h = function h(t, e) {
            for (var r = -1, n = e; ++r < 6;) {
              n += t * s[r], s[r] = n % 1e7, n = c(n / 1e7);
            }
          },
          v = function v(t) {
            for (var e = 6, r = 0; --e >= 0;) {
              r += s[e], s[e] = c(r / t), r = r % t * 1e7;
            }
          },
          p = function p() {
            for (var t = 6, e = ""; --t >= 0;) {
              if ("" !== e || 0 === t || 0 !== s[t]) {
                var r = String(s[t]);
                e = "" === e ? r : e + a.call(l, 7 - r.length) + r;
              }
            }
            return e;
          },
          d = function d(t, e, r) {
            return 0 === e ? r : e % 2 == 1 ? d(t, e - 1, r * t) : d(t * t, e / 2, r);
          };
        n(n.P + n.F * (!!u && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !r(496)(function () {
          u.call({});
        })), "Number", {
          toFixed: function toFixed(t) {
            var e,
              r,
              n,
              u,
              c = o(this, f),
              s = i(t),
              g = "",
              y = l;
            if (s < 0 || s > 20) throw RangeError(f);
            if (c != c) return "NaN";
            if (c <= -1e21 || c >= 1e21) return String(c);
            if (c < 0 && (g = "-", c = -c), c > 1e-21) if (e = function (t) {
              for (var e = 0, r = t; r >= 4096;) {
                e += 12, r /= 4096;
              }
              for (; r >= 2;) {
                e += 1, r /= 2;
              }
              return e;
            }(c * d(2, 69, 1)) - 69, r = e < 0 ? c * d(2, -e, 1) : c / d(2, e, 1), r *= 4503599627370496, (e = 52 - e) > 0) {
              for (h(0, r), n = s; n >= 7;) {
                h(1e7, 0), n -= 7;
              }
              for (h(d(10, n, 1), 0), n = e - 1; n >= 23;) {
                v(1 << 23), n -= 23;
              }
              v(1 << n), h(1, 1), v(2), y = p();
            } else h(0, r), h(1 << -e, 0), y = p() + a.call(l, s);
            return s > 0 ? g + ((u = y.length) <= s ? "0." + a.call(l, s - u) + y : y.slice(0, u - s) + "." + y.slice(u - s)) : g + y;
          }
        });
      },
      3552: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(496),
          o = r(8479),
          a = 1..toPrecision;
        n(n.P + n.F * (i(function () {
          return "1" !== a.call(1, void 0);
        }) || !i(function () {
          a.call({});
        })), "Number", {
          toPrecision: function toPrecision(t) {
            var e = o(this, "Number#toPrecision: incorrect invocation!");
            return void 0 === t ? a.call(e) : a.call(e, t);
          }
        });
      },
      2680: function _(t, e, r) {
        var n = r(1693);
        n(n.S + n.F, "Object", {
          assign: r(2075)
        });
      },
      7031: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Object", {
          create: r(6088)
        });
      },
      3073: function _(t, e, r) {
        var n = r(1693);
        n(n.S + n.F * !r(3144), "Object", {
          defineProperties: r(2390)
        });
      },
      8892: function _(t, e, r) {
        var n = r(1693);
        n(n.S + n.F * !r(3144), "Object", {
          defineProperty: r(4213).f
        });
      },
      230: function _(t, e, r) {
        var n = r(9708),
          i = r(8648).onFreeze;
        r(9870)("freeze", function (t) {
          return function (e) {
            return t && n(e) ? t(i(e)) : e;
          };
        });
      },
      476: function _(t, e, r) {
        var n = r(6282),
          i = r(9015).f;
        r(9870)("getOwnPropertyDescriptor", function () {
          return function (t, e) {
            return i(n(t), e);
          };
        });
      },
      8899: function _(t, e, r) {
        r(9870)("getOwnPropertyNames", function () {
          return r(3233).f;
        });
      },
      7771: function _(t, e, r) {
        var n = r(6040),
          i = r(8539);
        r(9870)("getPrototypeOf", function () {
          return function (t) {
            return i(n(t));
          };
        });
      },
      2395: function _(t, e, r) {
        var n = r(9708);
        r(9870)("isExtensible", function (t) {
          return function (e) {
            return !!n(e) && (!t || t(e));
          };
        });
      },
      1263: function _(t, e, r) {
        var n = r(9708);
        r(9870)("isFrozen", function (t) {
          return function (e) {
            return !n(e) || !!t && t(e);
          };
        });
      },
      2875: function _(t, e, r) {
        var n = r(9708);
        r(9870)("isSealed", function (t) {
          return function (e) {
            return !n(e) || !!t && t(e);
          };
        });
      },
      4177: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Object", {
          is: r(1366)
        });
      },
      950: function _(t, e, r) {
        var n = r(6040),
          i = r(1126);
        r(9870)("keys", function () {
          return function (t) {
            return i(n(t));
          };
        });
      },
      5695: function _(t, e, r) {
        var n = r(9708),
          i = r(8648).onFreeze;
        r(9870)("preventExtensions", function (t) {
          return function (e) {
            return t && n(e) ? t(i(e)) : e;
          };
        });
      },
      585: function _(t, e, r) {
        var n = r(9708),
          i = r(8648).onFreeze;
        r(9870)("seal", function (t) {
          return function (e) {
            return t && n(e) ? t(i(e)) : e;
          };
        });
      },
      6548: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Object", {
          setPrototypeOf: r(1794).set
        });
      },
      6268: function _(t, e, r) {
        "use strict";

        var n = r(6347),
          i = {};
        i[r(4410)("toStringTag")] = "z", i + "" != "[object z]" && r(9593)(Object.prototype, "toString", function () {
          return "[object " + n(this) + "]";
        }, !0);
      },
      4212: function _(t, e, r) {
        var n = r(1693),
          i = r(5995);
        n(n.G + n.F * (parseFloat != i), {
          parseFloat: i
        });
      },
      5291: function _(t, e, r) {
        var n = r(1693),
          i = r(7252);
        n(n.G + n.F * (parseInt != i), {
          parseInt: i
        });
      },
      2229: function _(t, e, r) {
        "use strict";

        var n,
          i,
          o,
          a,
          u = r(4925),
          c = r(4405),
          s = r(1550),
          f = r(6347),
          l = r(1693),
          h = r(9708),
          v = r(666),
          p = r(269),
          d = r(4036),
          g = r(3611),
          y = r(1597).set,
          m = r(2583)(),
          x = r(2219),
          b = r(4552),
          w = r(7860),
          S = r(9894),
          E = "Promise",
          _ = c.TypeError,
          P = c.process,
          O = P && P.versions,
          k = O && O.v8 || "",
          _M = c[E],
          F = "process" == f(P),
          L = function L() {},
          j = i = x.f,
          B = !!function () {
            try {
              var t = _M.resolve(1),
                e = (t.constructor = {})[r(4410)("species")] = function (t) {
                  t(L, L);
                };
              return (F || "function" == typeof PromiseRejectionEvent) && t.then(L) instanceof e && 0 !== k.indexOf("6.6") && -1 === w.indexOf("Chrome/66");
            } catch (t) {}
          }(),
          I = function I(t) {
            var e;
            return !(!h(t) || "function" != typeof (e = t.then)) && e;
          },
          T = function T(t, e) {
            if (!t._n) {
              t._n = !0;
              var r = t._c;
              m(function () {
                for (var n = t._v, i = 1 == t._s, o = 0, a = function a(e) {
                    var r,
                      o,
                      a,
                      u = i ? e.ok : e.fail,
                      c = e.resolve,
                      s = e.reject,
                      f = e.domain;
                    try {
                      u ? (i || (2 == t._h && N(t), t._h = 1), !0 === u ? r = n : (f && f.enter(), r = u(n), f && (f.exit(), a = !0)), r === e.promise ? s(_("Promise-chain cycle")) : (o = I(r)) ? o.call(r, c, s) : c(r)) : s(n);
                    } catch (t) {
                      f && !a && f.exit(), s(t);
                    }
                  }; r.length > o;) {
                  a(r[o++]);
                }
                t._c = [], t._n = !1, e && !t._h && A(t);
              });
            }
          },
          A = function A(t) {
            y.call(c, function () {
              var e,
                r,
                n,
                i = t._v,
                o = R(t);
              if (o && (e = b(function () {
                F ? P.emit("unhandledRejection", i, t) : (r = c.onunhandledrejection) ? r({
                  promise: t,
                  reason: i
                }) : (n = c.console) && n.error && n.error("Unhandled promise rejection", i);
              }), t._h = F || R(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;
            });
          },
          R = function R(t) {
            return 1 !== t._h && 0 === (t._a || t._c).length;
          },
          N = function N(t) {
            y.call(c, function () {
              var e;
              F ? P.emit("rejectionHandled", t) : (e = c.onrejectionhandled) && e({
                promise: t,
                reason: t._v
              });
            });
          },
          C = function C(t) {
            var e = this;
            e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), T(e, !0));
          },
          G = function G(t) {
            var e,
              r = this;
            if (!r._d) {
              r._d = !0, r = r._w || r;
              try {
                if (r === t) throw _("Promise can't be resolved itself");
                (e = I(t)) ? m(function () {
                  var n = {
                    _w: r,
                    _d: !1
                  };
                  try {
                    e.call(t, s(G, n, 1), s(C, n, 1));
                  } catch (t) {
                    C.call(n, t);
                  }
                }) : (r._v = t, r._s = 1, T(r, !1));
              } catch (t) {
                C.call({
                  _w: r,
                  _d: !1
                }, t);
              }
            }
          };
        B || (_M = function M(t) {
          p(this, _M, E, "_h"), v(t), n.call(this);
          try {
            t(s(G, this, 1), s(C, this, 1));
          } catch (t) {
            C.call(this, t);
          }
        }, (n = function n(t) {
          this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
        }).prototype = r(3227)(_M.prototype, {
          then: function then(t, e) {
            var r = j(g(this, _M));
            return r.ok = "function" != typeof t || t, r.fail = "function" == typeof e && e, r.domain = F ? P.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && T(this, !1), r.promise;
          },
          "catch": function _catch(t) {
            return this.then(void 0, t);
          }
        }), o = function o() {
          var t = new n();
          this.promise = t, this.resolve = s(G, t, 1), this.reject = s(C, t, 1);
        }, x.f = j = function j(t) {
          return t === _M || t === a ? new o(t) : i(t);
        }), l(l.G + l.W + l.F * !B, {
          Promise: _M
        }), r(5572)(_M, E), r(2373)(E), a = r(8080)[E], l(l.S + l.F * !B, E, {
          reject: function reject(t) {
            var e = j(this);
            return (0, e.reject)(t), e.promise;
          }
        }), l(l.S + l.F * (u || !B), E, {
          resolve: function resolve(t) {
            return S(u && this === a ? _M : this, t);
          }
        }), l(l.S + l.F * !(B && r(3229)(function (t) {
          _M.all(t)["catch"](L);
        })), E, {
          all: function all(t) {
            var e = this,
              r = j(e),
              n = r.resolve,
              i = r.reject,
              o = b(function () {
                var r = [],
                  o = 0,
                  a = 1;
                d(t, !1, function (t) {
                  var u = o++,
                    c = !1;
                  r.push(void 0), a++, e.resolve(t).then(function (t) {
                    c || (c = !0, r[u] = t, --a || n(r));
                  }, i);
                }), --a || n(r);
              });
            return o.e && i(o.v), r.promise;
          },
          race: function race(t) {
            var e = this,
              r = j(e),
              n = r.reject,
              i = b(function () {
                d(t, !1, function (t) {
                  e.resolve(t).then(r.resolve, n);
                });
              });
            return i.e && n(i.v), r.promise;
          }
        });
      },
      9757: function _(t, e, r) {
        var n = r(1693),
          i = r(666),
          o = r(5075),
          a = (r(4405).Reflect || {}).apply,
          u = Function.apply;
        n(n.S + n.F * !r(496)(function () {
          a(function () {});
        }), "Reflect", {
          apply: function apply(t, e, r) {
            var n = i(t),
              c = o(r);
            return a ? a(n, e, c) : u.call(n, e, c);
          }
        });
      },
      8545: function _(t, e, r) {
        var n = r(1693),
          i = r(6088),
          o = r(666),
          a = r(5075),
          u = r(9708),
          c = r(496),
          s = r(7240),
          f = (r(4405).Reflect || {}).construct,
          l = c(function () {
            function t() {}
            return !(f(function () {}, [], t) instanceof t);
          }),
          h = !c(function () {
            f(function () {});
          });
        n(n.S + n.F * (l || h), "Reflect", {
          construct: function construct(t, e) {
            o(t), a(e);
            var r = arguments.length < 3 ? t : o(arguments[2]);
            if (h && !l) return f(t, e, r);
            if (t == r) {
              switch (e.length) {
                case 0:
                  return new t();
                case 1:
                  return new t(e[0]);
                case 2:
                  return new t(e[0], e[1]);
                case 3:
                  return new t(e[0], e[1], e[2]);
                case 4:
                  return new t(e[0], e[1], e[2], e[3]);
              }
              var n = [null];
              return n.push.apply(n, e), new (s.apply(t, n))();
            }
            var c = r.prototype,
              v = i(u(c) ? c : Object.prototype),
              p = Function.apply.call(t, v, e);
            return u(p) ? p : v;
          }
        });
      },
      3451: function _(t, e, r) {
        var n = r(4213),
          i = r(1693),
          o = r(5075),
          a = r(3825);
        i(i.S + i.F * r(496)(function () {
          Reflect.defineProperty(n.f({}, 1, {
            value: 1
          }), 1, {
            value: 2
          });
        }), "Reflect", {
          defineProperty: function defineProperty(t, e, r) {
            o(t), e = a(e, !0), o(r);
            try {
              return n.f(t, e, r), !0;
            } catch (t) {
              return !1;
            }
          }
        });
      },
      3735: function _(t, e, r) {
        var n = r(1693),
          i = r(9015).f,
          o = r(5075);
        n(n.S, "Reflect", {
          deleteProperty: function deleteProperty(t, e) {
            var r = i(o(t), e);
            return !(r && !r.configurable) && delete t[e];
          }
        });
      },
      6012: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(5075),
          o = function o(t) {
            this._t = i(t), this._i = 0;
            var e,
              r = this._k = [];
            for (e in t) {
              r.push(e);
            }
          };
        r(9614)(o, "Object", function () {
          var t,
            e = this,
            r = e._k;
          do {
            if (e._i >= r.length) return {
              value: void 0,
              done: !0
            };
          } while (!((t = r[e._i++]) in e._t));
          return {
            value: t,
            done: !1
          };
        }), n(n.S, "Reflect", {
          enumerate: function enumerate(t) {
            return new o(t);
          }
        });
      },
      3806: function _(t, e, r) {
        var n = r(9015),
          i = r(1693),
          o = r(5075);
        i(i.S, "Reflect", {
          getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, e) {
            return n.f(o(t), e);
          }
        });
      },
      9063: function _(t, e, r) {
        var n = r(1693),
          i = r(8539),
          o = r(5075);
        n(n.S, "Reflect", {
          getPrototypeOf: function getPrototypeOf(t) {
            return i(o(t));
          }
        });
      },
      9849: function _(t, e, r) {
        var n = r(9015),
          i = r(8539),
          o = r(3050),
          a = r(1693),
          u = r(9708),
          c = r(5075);
        a(a.S, "Reflect", {
          get: function t(e, r) {
            var a,
              s,
              f = arguments.length < 3 ? e : arguments[2];
            return c(e) === f ? e[r] : (a = n.f(e, r)) ? o(a, "value") ? a.value : void 0 !== a.get ? a.get.call(f) : void 0 : u(s = i(e)) ? t(s, r, f) : void 0;
          }
        });
      },
      1111: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Reflect", {
          has: function has(t, e) {
            return e in t;
          }
        });
      },
      2413: function _(t, e, r) {
        var n = r(1693),
          i = r(5075),
          o = Object.isExtensible;
        n(n.S, "Reflect", {
          isExtensible: function isExtensible(t) {
            return i(t), !o || o(t);
          }
        });
      },
      7098: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Reflect", {
          ownKeys: r(2275)
        });
      },
      2294: function _(t, e, r) {
        var n = r(1693),
          i = r(5075),
          o = Object.preventExtensions;
        n(n.S, "Reflect", {
          preventExtensions: function preventExtensions(t) {
            i(t);
            try {
              return o && o(t), !0;
            } catch (t) {
              return !1;
            }
          }
        });
      },
      6938: function _(t, e, r) {
        var n = r(1693),
          i = r(1794);
        i && n(n.S, "Reflect", {
          setPrototypeOf: function setPrototypeOf(t, e) {
            i.check(t, e);
            try {
              return i.set(t, e), !0;
            } catch (t) {
              return !1;
            }
          }
        });
      },
      9920: function _(t, e, r) {
        var n = r(4213),
          i = r(9015),
          o = r(8539),
          a = r(3050),
          u = r(1693),
          c = r(3388),
          s = r(5075),
          f = r(9708);
        u(u.S, "Reflect", {
          set: function t(e, r, u) {
            var l,
              h,
              v = arguments.length < 4 ? e : arguments[3],
              p = i.f(s(e), r);
            if (!p) {
              if (f(h = o(e))) return t(h, r, u, v);
              p = c(0);
            }
            if (a(p, "value")) {
              if (!1 === p.writable || !f(v)) return !1;
              if (l = i.f(v, r)) {
                if (l.get || l.set || !1 === l.writable) return !1;
                l.value = u, n.f(v, r, l);
              } else n.f(v, r, c(0, u));
              return !0;
            }
            return void 0 !== p.set && (p.set.call(v, u), !0);
          }
        });
      },
      1544: function _(t, e, r) {
        var n = r(4405),
          i = r(7856),
          o = r(4213).f,
          a = r(7173).f,
          u = r(939),
          c = r(5660),
          _s2 = n.RegExp,
          f = _s2,
          l = _s2.prototype,
          h = /a/g,
          v = /a/g,
          p = new _s2(h) !== h;
        if (r(3144) && (!p || r(496)(function () {
          return v[r(4410)("match")] = !1, _s2(h) != h || _s2(v) == v || "/a/i" != _s2(h, "i");
        }))) {
          _s2 = function s(t, e) {
            var r = this instanceof _s2,
              n = u(t),
              o = void 0 === e;
            return !r && n && t.constructor === _s2 && o ? t : i(p ? new f(n && !o ? t.source : t, e) : f((n = t instanceof _s2) ? t.source : t, n && o ? c.call(t) : e), r ? this : l, _s2);
          };
          for (var d = function d(t) {
              (t in _s2) || o(_s2, t, {
                configurable: !0,
                get: function get() {
                  return f[t];
                },
                set: function set(e) {
                  f[t] = e;
                }
              });
            }, g = a(f), y = 0; g.length > y;) {
            d(g[y++]);
          }
          l.constructor = _s2, _s2.prototype = l, r(9593)(n, "RegExp", _s2);
        }
        r(2373)("RegExp");
      },
      7515: function _(t, e, r) {
        "use strict";

        var n = r(2562);
        r(1693)({
          target: "RegExp",
          proto: !0,
          forced: n !== /./.exec
        }, {
          exec: n
        });
      },
      5155: function _(t, e, r) {
        r(3144) && "g" != /./g.flags && r(4213).f(RegExp.prototype, "flags", {
          configurable: !0,
          get: r(5660)
        });
      },
      4675: function _(t, e, r) {
        "use strict";

        var n = r(5075),
          i = r(5263),
          o = r(990),
          a = r(6798);
        r(7925)("match", 1, function (t, e, r, u) {
          return [function (r) {
            var n = t(this),
              i = null == r ? void 0 : r[e];
            return void 0 !== i ? i.call(r, n) : new RegExp(r)[e](String(n));
          }, function (t) {
            var e = u(r, t, this);
            if (e.done) return e.value;
            var c = n(t),
              s = String(this);
            if (!c.global) return a(c, s);
            var f = c.unicode;
            c.lastIndex = 0;
            for (var l, h = [], v = 0; null !== (l = a(c, s));) {
              var p = String(l[0]);
              h[v] = p, "" === p && (c.lastIndex = o(s, i(c.lastIndex), f)), v++;
            }
            return 0 === v ? null : h;
          }];
        });
      },
      1983: function _(t, e, r) {
        "use strict";

        var n = r(5075),
          i = r(6040),
          o = r(5263),
          a = r(4058),
          u = r(990),
          c = r(6798),
          s = Math.max,
          f = Math.min,
          l = Math.floor,
          h = /\$([$&`']|\d\d?|<[^>]*>)/g,
          v = /\$([$&`']|\d\d?)/g;
        r(7925)("replace", 2, function (t, e, r, p) {
          return [function (n, i) {
            var o = t(this),
              a = null == n ? void 0 : n[e];
            return void 0 !== a ? a.call(n, o, i) : r.call(String(o), n, i);
          }, function (t, e) {
            var i = p(r, t, this, e);
            if (i.done) return i.value;
            var l = n(t),
              h = String(this),
              v = "function" == typeof e;
            v || (e = String(e));
            var g = l.global;
            if (g) {
              var y = l.unicode;
              l.lastIndex = 0;
            }
            for (var m = [];;) {
              var x = c(l, h);
              if (null === x) break;
              if (m.push(x), !g) break;
              "" === String(x[0]) && (l.lastIndex = u(h, o(l.lastIndex), y));
            }
            for (var b, w = "", S = 0, E = 0; E < m.length; E++) {
              x = m[E];
              for (var _ = String(x[0]), P = s(f(a(x.index), h.length), 0), O = [], k = 1; k < x.length; k++) {
                O.push(void 0 === (b = x[k]) ? b : String(b));
              }
              var M = x.groups;
              if (v) {
                var F = [_].concat(O, P, h);
                void 0 !== M && F.push(M);
                var L = String(e.apply(void 0, F));
              } else L = d(_, h, P, O, M, e);
              P >= S && (w += h.slice(S, P) + L, S = P + _.length);
            }
            return w + h.slice(S);
          }];
          function d(t, e, n, o, a, u) {
            var c = n + t.length,
              s = o.length,
              f = v;
            return void 0 !== a && (a = i(a), f = h), r.call(u, f, function (r, i) {
              var u;
              switch (i.charAt(0)) {
                case "$":
                  return "$";
                case "&":
                  return t;
                case "`":
                  return e.slice(0, n);
                case "'":
                  return e.slice(c);
                case "<":
                  u = a[i.slice(1, -1)];
                  break;
                default:
                  var f = +i;
                  if (0 === f) return r;
                  if (f > s) {
                    var h = l(f / 10);
                    return 0 === h ? r : h <= s ? void 0 === o[h - 1] ? i.charAt(1) : o[h - 1] + i.charAt(1) : r;
                  }
                  u = o[f - 1];
              }
              return void 0 === u ? "" : u;
            });
          }
        });
      },
      6285: function _(t, e, r) {
        "use strict";

        var n = r(5075),
          i = r(1366),
          o = r(6798);
        r(7925)("search", 1, function (t, e, r, a) {
          return [function (r) {
            var n = t(this),
              i = null == r ? void 0 : r[e];
            return void 0 !== i ? i.call(r, n) : new RegExp(r)[e](String(n));
          }, function (t) {
            var e = a(r, t, this);
            if (e.done) return e.value;
            var u = n(t),
              c = String(this),
              s = u.lastIndex;
            i(s, 0) || (u.lastIndex = 0);
            var f = o(u, c);
            return i(u.lastIndex, s) || (u.lastIndex = s), null === f ? -1 : f.index;
          }];
        });
      },
      2467: function _(t, e, r) {
        "use strict";

        var n = r(939),
          i = r(5075),
          o = r(3611),
          a = r(990),
          u = r(5263),
          c = r(6798),
          s = r(2562),
          f = r(496),
          l = Math.min,
          h = [].push,
          v = "split",
          p = "length",
          d = "lastIndex",
          g = 4294967295,
          y = !f(function () {
            RegExp(g, "y");
          });
        r(7925)("split", 2, function (t, e, r, f) {
          var m;
          return m = "c" == "abbc"[v](/(b)*/)[1] || 4 != "test"[v](/(?:)/, -1)[p] || 2 != "ab"[v](/(?:ab)*/)[p] || 4 != "."[v](/(.?)(.?)/)[p] || "."[v](/()()/)[p] > 1 || ""[v](/.?/)[p] ? function (t, e) {
            var i = String(this);
            if (void 0 === t && 0 === e) return [];
            if (!n(t)) return r.call(i, t, e);
            for (var o, a, u, c = [], f = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), l = 0, v = void 0 === e ? g : e >>> 0, y = new RegExp(t.source, f + "g"); (o = s.call(y, i)) && !((a = y[d]) > l && (c.push(i.slice(l, o.index)), o[p] > 1 && o.index < i[p] && h.apply(c, o.slice(1)), u = o[0][p], l = a, c[p] >= v));) {
              y[d] === o.index && y[d]++;
            }
            return l === i[p] ? !u && y.test("") || c.push("") : c.push(i.slice(l)), c[p] > v ? c.slice(0, v) : c;
          } : "0"[v](void 0, 0)[p] ? function (t, e) {
            return void 0 === t && 0 === e ? [] : r.call(this, t, e);
          } : r, [function (r, n) {
            var i = t(this),
              o = null == r ? void 0 : r[e];
            return void 0 !== o ? o.call(r, i, n) : m.call(String(i), r, n);
          }, function (t, e) {
            var n = f(m, t, this, e, m !== r);
            if (n.done) return n.value;
            var s = i(t),
              h = String(this),
              v = o(s, RegExp),
              p = s.unicode,
              d = (s.ignoreCase ? "i" : "") + (s.multiline ? "m" : "") + (s.unicode ? "u" : "") + (y ? "y" : "g"),
              x = new v(y ? s : "^(?:" + s.source + ")", d),
              b = void 0 === e ? g : e >>> 0;
            if (0 === b) return [];
            if (0 === h.length) return null === c(x, h) ? [h] : [];
            for (var w = 0, S = 0, E = []; S < h.length;) {
              x.lastIndex = y ? S : 0;
              var _,
                P = c(x, y ? h : h.slice(S));
              if (null === P || (_ = l(u(x.lastIndex + (y ? 0 : S)), h.length)) === w) S = a(h, S, p);else {
                if (E.push(h.slice(w, S)), E.length === b) return E;
                for (var O = 1; O <= P.length - 1; O++) {
                  if (E.push(P[O]), E.length === b) return E;
                }
                S = w = _;
              }
            }
            return E.push(h.slice(w)), E;
          }];
        });
      },
      223: function _(t, e, r) {
        "use strict";

        r(5155);
        var n = r(5075),
          i = r(5660),
          o = r(3144),
          a = "toString",
          u = /./[a],
          c = function c(t) {
            r(9593)(RegExp.prototype, a, t, !0);
          };
        r(496)(function () {
          return "/a/b" != u.call({
            source: "a",
            flags: "b"
          });
        }) ? c(function () {
          var t = n(this);
          return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0);
        }) : u.name != a && c(function () {
          return u.call(this);
        });
      },
      9594: function _(t, e, r) {
        "use strict";

        var n = r(7647),
          i = r(1554);
        t.exports = r(8107)("Set", function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        }, {
          add: function add(t) {
            return n.def(i(this, "Set"), t = 0 === t ? 0 : t, t);
          }
        }, n);
      },
      3583: function _(t, e, r) {
        "use strict";

        r(7742)("anchor", function (t) {
          return function (e) {
            return t(this, "a", "name", e);
          };
        });
      },
      4234: function _(t, e, r) {
        "use strict";

        r(7742)("big", function (t) {
          return function () {
            return t(this, "big", "", "");
          };
        });
      },
      6853: function _(t, e, r) {
        "use strict";

        r(7742)("blink", function (t) {
          return function () {
            return t(this, "blink", "", "");
          };
        });
      },
      5165: function _(t, e, r) {
        "use strict";

        r(7742)("bold", function (t) {
          return function () {
            return t(this, "b", "", "");
          };
        });
      },
      730: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(5454)(!1);
        n(n.P, "String", {
          codePointAt: function codePointAt(t) {
            return i(this, t);
          }
        });
      },
      3948: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(5263),
          o = r(1452),
          a = "endsWith",
          u = ""[a];
        n(n.P + n.F * r(528)(a), "String", {
          endsWith: function endsWith(t) {
            var e = o(this, t, a),
              r = arguments.length > 1 ? arguments[1] : void 0,
              n = i(e.length),
              c = void 0 === r ? n : Math.min(i(r), n),
              s = String(t);
            return u ? u.call(e, s, c) : e.slice(c - s.length, c) === s;
          }
        });
      },
      4050: function _(t, e, r) {
        "use strict";

        r(7742)("fixed", function (t) {
          return function () {
            return t(this, "tt", "", "");
          };
        });
      },
      7868: function _(t, e, r) {
        "use strict";

        r(7742)("fontcolor", function (t) {
          return function (e) {
            return t(this, "font", "color", e);
          };
        });
      },
      1191: function _(t, e, r) {
        "use strict";

        r(7742)("fontsize", function (t) {
          return function (e) {
            return t(this, "font", "size", e);
          };
        });
      },
      3684: function _(t, e, r) {
        var n = r(1693),
          i = r(9519),
          o = String.fromCharCode,
          a = String.fromCodePoint;
        n(n.S + n.F * (!!a && 1 != a.length), "String", {
          fromCodePoint: function fromCodePoint(t) {
            for (var e, r = [], n = arguments.length, a = 0; n > a;) {
              if (e = +arguments[a++], i(e, 1114111) !== e) throw RangeError(e + " is not a valid code point");
              r.push(e < 65536 ? o(e) : o(55296 + ((e -= 65536) >> 10), e % 1024 + 56320));
            }
            return r.join("");
          }
        });
      },
      4487: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(1452),
          o = "includes";
        n(n.P + n.F * r(528)(o), "String", {
          includes: function includes(t) {
            return !!~i(this, t, o).indexOf(t, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      5220: function _(t, e, r) {
        "use strict";

        r(7742)("italics", function (t) {
          return function () {
            return t(this, "i", "", "");
          };
        });
      },
      1872: function _(t, e, r) {
        "use strict";

        var n = r(5454)(!0);
        r(5706)(String, "String", function (t) {
          this._t = String(t), this._i = 0;
        }, function () {
          var t,
            e = this._t,
            r = this._i;
          return r >= e.length ? {
            value: void 0,
            done: !0
          } : (t = n(e, r), this._i += t.length, {
            value: t,
            done: !1
          });
        });
      },
      1644: function _(t, e, r) {
        "use strict";

        r(7742)("link", function (t) {
          return function (e) {
            return t(this, "a", "href", e);
          };
        });
      },
      6373: function _(t, e, r) {
        var n = r(1693),
          i = r(6282),
          o = r(5263);
        n(n.S, "String", {
          raw: function raw(t) {
            for (var e = i(t.raw), r = o(e.length), n = arguments.length, a = [], u = 0; r > u;) {
              a.push(String(e[u++])), u < n && a.push(String(arguments[u]));
            }
            return a.join("");
          }
        });
      },
      2778: function _(t, e, r) {
        var n = r(1693);
        n(n.P, "String", {
          repeat: r(3874)
        });
      },
      4609: function _(t, e, r) {
        "use strict";

        r(7742)("small", function (t) {
          return function () {
            return t(this, "small", "", "");
          };
        });
      },
      1390: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(5263),
          o = r(1452),
          a = "startsWith",
          u = ""[a];
        n(n.P + n.F * r(528)(a), "String", {
          startsWith: function startsWith(t) {
            var e = o(this, t, a),
              r = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)),
              n = String(t);
            return u ? u.call(e, n, r) : e.slice(r, r + n.length) === n;
          }
        });
      },
      1627: function _(t, e, r) {
        "use strict";

        r(7742)("strike", function (t) {
          return function () {
            return t(this, "strike", "", "");
          };
        });
      },
      8942: function _(t, e, r) {
        "use strict";

        r(7742)("sub", function (t) {
          return function () {
            return t(this, "sub", "", "");
          };
        });
      },
      8325: function _(t, e, r) {
        "use strict";

        r(7742)("sup", function (t) {
          return function () {
            return t(this, "sup", "", "");
          };
        });
      },
      2067: function _(t, e, r) {
        "use strict";

        r(5480)("trim", function (t) {
          return function () {
            return t(this, 3);
          };
        });
      },
      107: function _(t, e, r) {
        "use strict";

        var n = r(4405),
          i = r(3050),
          o = r(3144),
          a = r(1693),
          u = r(9593),
          c = r(8648).KEY,
          s = r(496),
          f = r(7104),
          l = r(5572),
          h = r(7767),
          v = r(4410),
          p = r(3438),
          d = r(4519),
          g = r(6522),
          y = r(3623),
          m = r(5075),
          x = r(9708),
          b = r(6040),
          w = r(6282),
          S = r(3825),
          E = r(3388),
          _ = r(6088),
          P = r(3233),
          O = r(9015),
          k = r(8910),
          M = r(4213),
          F = r(1126),
          L = O.f,
          j = M.f,
          B = P.f,
          _I = n.Symbol,
          T = n.JSON,
          A = T && T.stringify,
          R = "prototype",
          N = v("_hidden"),
          C = v("toPrimitive"),
          G = {}.propertyIsEnumerable,
          U = f("symbol-registry"),
          Y = f("symbols"),
          X = f("op-symbols"),
          D = Object[R],
          V = "function" == typeof _I && !!k.f,
          W = n.QObject,
          z = !W || !W[R] || !W[R].findChild,
          H = o && s(function () {
            return 7 != _(j({}, "a", {
              get: function get() {
                return j(this, "a", {
                  value: 7
                }).a;
              }
            })).a;
          }) ? function (t, e, r) {
            var n = L(D, e);
            n && delete D[e], j(t, e, r), n && t !== D && j(D, e, n);
          } : j,
          q = function q(t) {
            var e = Y[t] = _(_I[R]);
            return e._k = t, e;
          },
          $ = V && "symbol" == _typeof(_I.iterator) ? function (t) {
            return "symbol" == _typeof(t);
          } : function (t) {
            return t instanceof _I;
          },
          J = function J(t, e, r) {
            return t === D && J(X, e, r), m(t), e = S(e, !0), m(r), i(Y, e) ? (r.enumerable ? (i(t, N) && t[N][e] && (t[N][e] = !1), r = _(r, {
              enumerable: E(0, !1)
            })) : (i(t, N) || j(t, N, E(1, {})), t[N][e] = !0), H(t, e, r)) : j(t, e, r);
          },
          K = function K(t, e) {
            m(t);
            for (var r, n = g(e = w(e)), i = 0, o = n.length; o > i;) {
              J(t, r = n[i++], e[r]);
            }
            return t;
          },
          Z = function Z(t) {
            var e = G.call(this, t = S(t, !0));
            return !(this === D && i(Y, t) && !i(X, t)) && (!(e || !i(this, t) || !i(Y, t) || i(this, N) && this[N][t]) || e);
          },
          Q = function Q(t, e) {
            if (t = w(t), e = S(e, !0), t !== D || !i(Y, e) || i(X, e)) {
              var r = L(t, e);
              return !r || !i(Y, e) || i(t, N) && t[N][e] || (r.enumerable = !0), r;
            }
          },
          tt = function tt(t) {
            for (var e, r = B(w(t)), n = [], o = 0; r.length > o;) {
              i(Y, e = r[o++]) || e == N || e == c || n.push(e);
            }
            return n;
          },
          et = function et(t) {
            for (var e, r = t === D, n = B(r ? X : w(t)), o = [], a = 0; n.length > a;) {
              !i(Y, e = n[a++]) || r && !i(D, e) || o.push(Y[e]);
            }
            return o;
          };
        V || (u((_I = function I() {
          if (this instanceof _I) throw TypeError("Symbol is not a constructor!");
          var t = h(arguments.length > 0 ? arguments[0] : void 0),
            e = function e(r) {
              this === D && e.call(X, r), i(this, N) && i(this[N], t) && (this[N][t] = !1), H(this, t, E(1, r));
            };
          return o && z && H(D, t, {
            configurable: !0,
            set: e
          }), q(t);
        })[R], "toString", function () {
          return this._k;
        }), O.f = Q, M.f = J, r(7173).f = P.f = tt, r(2806).f = Z, k.f = et, o && !r(4925) && u(D, "propertyIsEnumerable", Z, !0), p.f = function (t) {
          return q(v(t));
        }), a(a.G + a.W + a.F * !V, {
          Symbol: _I
        });
        for (var rt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), nt = 0; rt.length > nt;) {
          v(rt[nt++]);
        }
        for (var it = F(v.store), ot = 0; it.length > ot;) {
          d(it[ot++]);
        }
        a(a.S + a.F * !V, "Symbol", {
          "for": function _for(t) {
            return i(U, t += "") ? U[t] : U[t] = _I(t);
          },
          keyFor: function keyFor(t) {
            if (!$(t)) throw TypeError(t + " is not a symbol!");
            for (var e in U) {
              if (U[e] === t) return e;
            }
          },
          useSetter: function useSetter() {
            z = !0;
          },
          useSimple: function useSimple() {
            z = !1;
          }
        }), a(a.S + a.F * !V, "Object", {
          create: function create(t, e) {
            return void 0 === e ? _(t) : K(_(t), e);
          },
          defineProperty: J,
          defineProperties: K,
          getOwnPropertyDescriptor: Q,
          getOwnPropertyNames: tt,
          getOwnPropertySymbols: et
        });
        var at = s(function () {
          k.f(1);
        });
        a(a.S + a.F * at, "Object", {
          getOwnPropertySymbols: function getOwnPropertySymbols(t) {
            return k.f(b(t));
          }
        }), T && a(a.S + a.F * (!V || s(function () {
          var t = _I();
          return "[null]" != A([t]) || "{}" != A({
            a: t
          }) || "{}" != A(Object(t));
        })), "JSON", {
          stringify: function stringify(t) {
            for (var e, r, n = [t], i = 1; arguments.length > i;) {
              n.push(arguments[i++]);
            }
            if (r = e = n[1], (x(e) || void 0 !== t) && !$(t)) return y(e) || (e = function e(t, _e) {
              if ("function" == typeof r && (_e = r.call(this, t, _e)), !$(_e)) return _e;
            }), n[1] = e, A.apply(T, n);
          }
        }), _I[R][C] || r(4461)(_I[R], C, _I[R].valueOf), l(_I, "Symbol"), l(Math, "Math", !0), l(n.JSON, "JSON", !0);
      },
      7955: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6331),
          o = r(7050),
          a = r(5075),
          u = r(9519),
          c = r(5263),
          s = r(9708),
          f = r(4405).ArrayBuffer,
          l = r(3611),
          h = o.ArrayBuffer,
          v = o.DataView,
          p = i.ABV && f.isView,
          d = h.prototype.slice,
          g = i.VIEW,
          y = "ArrayBuffer";
        n(n.G + n.W + n.F * (f !== h), {
          ArrayBuffer: h
        }), n(n.S + n.F * !i.CONSTR, y, {
          isView: function isView(t) {
            return p && p(t) || s(t) && g in t;
          }
        }), n(n.P + n.U + n.F * r(496)(function () {
          return !new h(2).slice(1, void 0).byteLength;
        }), y, {
          slice: function slice(t, e) {
            if (void 0 !== d && void 0 === e) return d.call(a(this), t);
            for (var r = a(this).byteLength, n = u(t, r), i = u(void 0 === e ? r : e, r), o = new (l(this, h))(c(i - n)), s = new v(this), f = new v(o), p = 0; n < i;) {
              f.setUint8(p++, s.getUint8(n++));
            }
            return o;
          }
        }), r(2373)(y);
      },
      4879: function _(t, e, r) {
        var n = r(1693);
        n(n.G + n.W + n.F * !r(6331).ABV, {
          DataView: r(7050).DataView
        });
      },
      7117: function _(t, e, r) {
        r(3412)("Float32", 4, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      1370: function _(t, e, r) {
        r(3412)("Float64", 8, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      157: function _(t, e, r) {
        r(3412)("Int16", 2, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      2634: function _(t, e, r) {
        r(3412)("Int32", 4, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      5275: function _(t, e, r) {
        r(3412)("Int8", 1, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      2099: function _(t, e, r) {
        r(3412)("Uint16", 2, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      3463: function _(t, e, r) {
        r(3412)("Uint32", 4, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      3411: function _(t, e, r) {
        r(3412)("Uint8", 1, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        });
      },
      9163: function _(t, e, r) {
        r(3412)("Uint8", 1, function (t) {
          return function (e, r, n) {
            return t(this, e, r, n);
          };
        }, !0);
      },
      6189: function _(t, e, r) {
        "use strict";

        var n,
          i = r(4405),
          o = r(3635)(0),
          a = r(9593),
          u = r(8648),
          c = r(2075),
          s = r(8348),
          f = r(9708),
          l = r(1554),
          h = r(1554),
          v = !i.ActiveXObject && "ActiveXObject" in i,
          p = "WeakMap",
          d = u.getWeak,
          g = Object.isExtensible,
          y = s.ufstore,
          m = function m(t) {
            return function () {
              return t(this, arguments.length > 0 ? arguments[0] : void 0);
            };
          },
          x = {
            get: function get(t) {
              if (f(t)) {
                var e = d(t);
                return !0 === e ? y(l(this, p)).get(t) : e ? e[this._i] : void 0;
              }
            },
            set: function set(t, e) {
              return s.def(l(this, p), t, e);
            }
          },
          b = t.exports = r(8107)(p, m, x, s, !0, !0);
        h && v && (c((n = s.getConstructor(m, p)).prototype, x), u.NEED = !0, o(["delete", "has", "get", "set"], function (t) {
          var e = b.prototype,
            r = e[t];
          a(e, t, function (e, i) {
            if (f(e) && !g(e)) {
              this._f || (this._f = new n());
              var o = this._f[t](e, i);
              return "set" == t ? this : o;
            }
            return r.call(this, e, i);
          });
        }));
      },
      6937: function _(t, e, r) {
        "use strict";

        var n = r(8348),
          i = r(1554),
          o = "WeakSet";
        r(8107)(o, function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        }, {
          add: function add(t) {
            return n.def(i(this, o), t, !0);
          }
        }, n, !1, !0);
      },
      3570: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4225),
          o = r(6040),
          a = r(5263),
          u = r(666),
          c = r(2143);
        n(n.P, "Array", {
          flatMap: function flatMap(t) {
            var e,
              r,
              n = o(this);
            return u(t), e = a(n.length), r = c(n, 0), i(r, n, n, e, 0, 1, t, arguments[1]), r;
          }
        }), r(7296)("flatMap");
      },
      1625: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4225),
          o = r(6040),
          a = r(5263),
          u = r(4058),
          c = r(2143);
        n(n.P, "Array", {
          flatten: function flatten() {
            var t = arguments[0],
              e = o(this),
              r = a(e.length),
              n = c(e, 0);
            return i(n, e, e, r, 0, void 0 === t ? 1 : u(t)), n;
          }
        }), r(7296)("flatten");
      },
      8347: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4513)(!0);
        n(n.P, "Array", {
          includes: function includes(t) {
            return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), r(7296)("includes");
      },
      8553: function _(t, e, r) {
        var n = r(1693),
          i = r(2583)(),
          o = r(4405).process,
          a = "process" == r(2380)(o);
        n(n.G, {
          asap: function asap(t) {
            var e = a && o.domain;
            i(e ? e.bind(t) : t);
          }
        });
      },
      826: function _(t, e, r) {
        var n = r(1693),
          i = r(2380);
        n(n.S, "Error", {
          isError: function isError(t) {
            return "Error" === i(t);
          }
        });
      },
      3499: function _(t, e, r) {
        var n = r(1693);
        n(n.G, {
          global: r(4405)
        });
      },
      5865: function _(t, e, r) {
        r(578)("Map");
      },
      8920: function _(t, e, r) {
        r(147)("Map");
      },
      5745: function _(t, e, r) {
        var n = r(1693);
        n(n.P + n.R, "Map", {
          toJSON: r(2935)("Map")
        });
      },
      3588: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          clamp: function clamp(t, e, r) {
            return Math.min(r, Math.max(e, t));
          }
        });
      },
      4607: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          DEG_PER_RAD: Math.PI / 180
        });
      },
      2641: function _(t, e, r) {
        var n = r(1693),
          i = 180 / Math.PI;
        n(n.S, "Math", {
          degrees: function degrees(t) {
            return t * i;
          }
        });
      },
      5657: function _(t, e, r) {
        var n = r(1693),
          i = r(4917),
          o = r(8961);
        n(n.S, "Math", {
          fscale: function fscale(t, e, r, n, a) {
            return o(i(t, e, r, n, a));
          }
        });
      },
      9252: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          iaddh: function iaddh(t, e, r, n) {
            var i = t >>> 0,
              o = r >>> 0;
            return (e >>> 0) + (n >>> 0) + ((i & o | (i | o) & ~(i + o >>> 0)) >>> 31) | 0;
          }
        });
      },
      3548: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          imulh: function imulh(t, e) {
            var r = 65535,
              n = +t,
              i = +e,
              o = n & r,
              a = i & r,
              u = n >> 16,
              c = i >> 16,
              s = (u * a >>> 0) + (o * a >>> 16);
            return u * c + (s >> 16) + ((o * c >>> 0) + (s & r) >> 16);
          }
        });
      },
      9295: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          isubh: function isubh(t, e, r, n) {
            var i = t >>> 0,
              o = r >>> 0;
            return (e >>> 0) - (n >>> 0) - ((~i & o | ~(i ^ o) & i - o >>> 0) >>> 31) | 0;
          }
        });
      },
      6577: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          RAD_PER_DEG: 180 / Math.PI
        });
      },
      5914: function _(t, e, r) {
        var n = r(1693),
          i = Math.PI / 180;
        n(n.S, "Math", {
          radians: function radians(t) {
            return t * i;
          }
        });
      },
      4100: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          scale: r(4917)
        });
      },
      598: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          signbit: function signbit(t) {
            return (t = +t) != t ? t : 0 == t ? 1 / t == 1 / 0 : t > 0;
          }
        });
      },
      7151: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "Math", {
          umulh: function umulh(t, e) {
            var r = 65535,
              n = +t,
              i = +e,
              o = n & r,
              a = i & r,
              u = n >>> 16,
              c = i >>> 16,
              s = (u * a >>> 0) + (o * a >>> 16);
            return u * c + (s >>> 16) + ((o * c >>> 0) + (s & r) >>> 16);
          }
        });
      },
      4255: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6040),
          o = r(666),
          a = r(4213);
        r(3144) && n(n.P + r(2296), "Object", {
          __defineGetter__: function __defineGetter__(t, e) {
            a.f(i(this), t, {
              get: o(e),
              enumerable: !0,
              configurable: !0
            });
          }
        });
      },
      1346: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6040),
          o = r(666),
          a = r(4213);
        r(3144) && n(n.P + r(2296), "Object", {
          __defineSetter__: function __defineSetter__(t, e) {
            a.f(i(this), t, {
              set: o(e),
              enumerable: !0,
              configurable: !0
            });
          }
        });
      },
      3788: function _(t, e, r) {
        var n = r(1693),
          i = r(2133)(!0);
        n(n.S, "Object", {
          entries: function entries(t) {
            return i(t);
          }
        });
      },
      9872: function _(t, e, r) {
        var n = r(1693),
          i = r(2275),
          o = r(6282),
          a = r(9015),
          u = r(2559);
        n(n.S, "Object", {
          getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
            for (var e, r, n = o(t), c = a.f, s = i(n), f = {}, l = 0; s.length > l;) {
              void 0 !== (r = c(n, e = s[l++])) && u(f, e, r);
            }
            return f;
          }
        });
      },
      8987: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6040),
          o = r(3825),
          a = r(8539),
          u = r(9015).f;
        r(3144) && n(n.P + r(2296), "Object", {
          __lookupGetter__: function __lookupGetter__(t) {
            var e,
              r = i(this),
              n = o(t, !0);
            do {
              if (e = u(r, n)) return e.get;
            } while (r = a(r));
          }
        });
      },
      6605: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6040),
          o = r(3825),
          a = r(8539),
          u = r(9015).f;
        r(3144) && n(n.P + r(2296), "Object", {
          __lookupSetter__: function __lookupSetter__(t) {
            var e,
              r = i(this),
              n = o(t, !0);
            do {
              if (e = u(r, n)) return e.set;
            } while (r = a(r));
          }
        });
      },
      2094: function _(t, e, r) {
        var n = r(1693),
          i = r(2133)(!1);
        n(n.S, "Object", {
          values: function values(t) {
            return i(t);
          }
        });
      },
      1071: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(4405),
          o = r(8080),
          a = r(2583)(),
          u = r(4410)("observable"),
          c = r(666),
          s = r(5075),
          f = r(269),
          l = r(3227),
          h = r(4461),
          v = r(4036),
          p = v.RETURN,
          d = function d(t) {
            return null == t ? void 0 : c(t);
          },
          g = function g(t) {
            var e = t._c;
            e && (t._c = void 0, e());
          },
          y = function y(t) {
            return void 0 === t._o;
          },
          m = function m(t) {
            y(t) || (t._o = void 0, g(t));
          },
          x = function x(t, e) {
            s(t), this._c = void 0, this._o = t, t = new b(this);
            try {
              var r = e(t),
                n = r;
              null != r && ("function" == typeof r.unsubscribe ? r = function r() {
                n.unsubscribe();
              } : c(r), this._c = r);
            } catch (e) {
              return void t.error(e);
            }
            y(this) && g(this);
          };
        x.prototype = l({}, {
          unsubscribe: function unsubscribe() {
            m(this);
          }
        });
        var b = function b(t) {
          this._s = t;
        };
        b.prototype = l({}, {
          next: function next(t) {
            var e = this._s;
            if (!y(e)) {
              var r = e._o;
              try {
                var n = d(r.next);
                if (n) return n.call(r, t);
              } catch (t) {
                try {
                  m(e);
                } finally {
                  throw t;
                }
              }
            }
          },
          error: function error(t) {
            var e = this._s;
            if (y(e)) throw t;
            var r = e._o;
            e._o = void 0;
            try {
              var n = d(r.error);
              if (!n) throw t;
              t = n.call(r, t);
            } catch (t) {
              try {
                g(e);
              } finally {
                throw t;
              }
            }
            return g(e), t;
          },
          complete: function complete(t) {
            var e = this._s;
            if (!y(e)) {
              var r = e._o;
              e._o = void 0;
              try {
                var n = d(r.complete);
                t = n ? n.call(r, t) : void 0;
              } catch (t) {
                try {
                  g(e);
                } finally {
                  throw t;
                }
              }
              return g(e), t;
            }
          }
        });
        var w = function w(t) {
          f(this, w, "Observable", "_f")._f = c(t);
        };
        l(w.prototype, {
          subscribe: function subscribe(t) {
            return new x(t, this._f);
          },
          forEach: function forEach(t) {
            var e = this;
            return new (o.Promise || i.Promise)(function (r, n) {
              c(t);
              var i = e.subscribe({
                next: function next(e) {
                  try {
                    return t(e);
                  } catch (t) {
                    n(t), i.unsubscribe();
                  }
                },
                error: n,
                complete: r
              });
            });
          }
        }), l(w, {
          from: function from(t) {
            var e = "function" == typeof this ? this : w,
              r = d(s(t)[u]);
            if (r) {
              var n = s(r.call(t));
              return n.constructor === e ? n : new e(function (t) {
                return n.subscribe(t);
              });
            }
            return new e(function (e) {
              var r = !1;
              return a(function () {
                if (!r) {
                  try {
                    if (v(t, !1, function (t) {
                      if (e.next(t), r) return p;
                    }) === p) return;
                  } catch (t) {
                    if (r) throw t;
                    return void e.error(t);
                  }
                  e.complete();
                }
              }), function () {
                r = !0;
              };
            });
          },
          of: function of() {
            for (var t = 0, e = arguments.length, r = new Array(e); t < e;) {
              r[t] = arguments[t++];
            }
            return new ("function" == typeof this ? this : w)(function (t) {
              var e = !1;
              return a(function () {
                if (!e) {
                  for (var n = 0; n < r.length; ++n) {
                    if (t.next(r[n]), e) return;
                  }
                  t.complete();
                }
              }), function () {
                e = !0;
              };
            });
          }
        }), h(w.prototype, u, function () {
          return this;
        }), n(n.G, {
          Observable: w
        }), r(2373)("Observable");
      },
      7752: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(8080),
          o = r(4405),
          a = r(3611),
          u = r(9894);
        n(n.P + n.R, "Promise", {
          "finally": function _finally(t) {
            var e = a(this, i.Promise || o.Promise),
              r = "function" == typeof t;
            return this.then(r ? function (r) {
              return u(e, t()).then(function () {
                return r;
              });
            } : t, r ? function (r) {
              return u(e, t()).then(function () {
                throw r;
              });
            } : t);
          }
        });
      },
      4243: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(2219),
          o = r(4552);
        n(n.S, "Promise", {
          "try": function _try(t) {
            var e = i.f(this),
              r = o(t);
            return (r.e ? e.reject : e.resolve)(r.v), e.promise;
          }
        });
      },
      7551: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = n.key,
          a = n.set;
        n.exp({
          defineMetadata: function defineMetadata(t, e, r, n) {
            a(t, e, i(r), o(n));
          }
        });
      },
      6157: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = n.key,
          a = n.map,
          u = n.store;
        n.exp({
          deleteMetadata: function deleteMetadata(t, e) {
            var r = arguments.length < 3 ? void 0 : o(arguments[2]),
              n = a(i(e), r, !1);
            if (void 0 === n || !n["delete"](t)) return !1;
            if (n.size) return !0;
            var c = u.get(e);
            return c["delete"](r), !!c.size || u["delete"](e);
          }
        });
      },
      9493: function _(t, e, r) {
        var n = r(9594),
          i = r(9315),
          o = r(380),
          a = r(5075),
          u = r(8539),
          c = o.keys,
          s = o.key,
          f = function f(t, e) {
            var r = c(t, e),
              o = u(t);
            if (null === o) return r;
            var a = f(o, e);
            return a.length ? r.length ? i(new n(r.concat(a))) : a : r;
          };
        o.exp({
          getMetadataKeys: function getMetadataKeys(t) {
            return f(a(t), arguments.length < 2 ? void 0 : s(arguments[1]));
          }
        });
      },
      929: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = r(8539),
          a = n.has,
          u = n.get,
          c = n.key,
          s = function s(t, e, r) {
            if (a(t, e, r)) return u(t, e, r);
            var n = o(e);
            return null !== n ? s(t, n, r) : void 0;
          };
        n.exp({
          getMetadata: function getMetadata(t, e) {
            return s(t, i(e), arguments.length < 3 ? void 0 : c(arguments[2]));
          }
        });
      },
      314: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = n.keys,
          a = n.key;
        n.exp({
          getOwnMetadataKeys: function getOwnMetadataKeys(t) {
            return o(i(t), arguments.length < 2 ? void 0 : a(arguments[1]));
          }
        });
      },
      3440: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = n.get,
          a = n.key;
        n.exp({
          getOwnMetadata: function getOwnMetadata(t, e) {
            return o(t, i(e), arguments.length < 3 ? void 0 : a(arguments[2]));
          }
        });
      },
      9352: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = r(8539),
          a = n.has,
          u = n.key,
          c = function c(t, e, r) {
            if (a(t, e, r)) return !0;
            var n = o(e);
            return null !== n && c(t, n, r);
          };
        n.exp({
          hasMetadata: function hasMetadata(t, e) {
            return c(t, i(e), arguments.length < 3 ? void 0 : u(arguments[2]));
          }
        });
      },
      8285: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = n.has,
          a = n.key;
        n.exp({
          hasOwnMetadata: function hasOwnMetadata(t, e) {
            return o(t, i(e), arguments.length < 3 ? void 0 : a(arguments[2]));
          }
        });
      },
      2541: function _(t, e, r) {
        var n = r(380),
          i = r(5075),
          o = r(666),
          a = n.key,
          u = n.set;
        n.exp({
          metadata: function metadata(t, e) {
            return function (r, n) {
              u(t, e, (void 0 !== n ? i : o)(r), a(n));
            };
          }
        });
      },
      8906: function _(t, e, r) {
        r(578)("Set");
      },
      5127: function _(t, e, r) {
        r(147)("Set");
      },
      7225: function _(t, e, r) {
        var n = r(1693);
        n(n.P + n.R, "Set", {
          toJSON: r(2935)("Set")
        });
      },
      5747: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(5454)(!0),
          o = r(496)(function () {
            return "𠮷" !== "𠮷".at(0);
          });
        n(n.P + n.F * o, "String", {
          at: function at(t) {
            return i(this, t);
          }
        });
      },
      5707: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(1083),
          o = r(5263),
          a = r(939),
          u = r(5660),
          c = RegExp.prototype,
          s = function s(t, e) {
            this._r = t, this._s = e;
          };
        r(9614)(s, "RegExp String", function () {
          var t = this._r.exec(this._s);
          return {
            value: t,
            done: null === t
          };
        }), n(n.P, "String", {
          matchAll: function matchAll(t) {
            if (i(this), !a(t)) throw TypeError(t + " is not a regexp!");
            var e = String(this),
              r = "flags" in c ? String(t.flags) : u.call(t),
              n = new RegExp(t.source, ~r.indexOf("g") ? r : "g" + r);
            return n.lastIndex = o(t.lastIndex), new s(n, e);
          }
        });
      },
      1409: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6687),
          o = r(7860),
          a = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        n(n.P + n.F * a, "String", {
          padEnd: function padEnd(t) {
            return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !1);
          }
        });
      },
      304: function _(t, e, r) {
        "use strict";

        var n = r(1693),
          i = r(6687),
          o = r(7860),
          a = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        n(n.P + n.F * a, "String", {
          padStart: function padStart(t) {
            return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !0);
          }
        });
      },
      7066: function _(t, e, r) {
        "use strict";

        r(5480)("trimLeft", function (t) {
          return function () {
            return t(this, 1);
          };
        }, "trimStart");
      },
      3255: function _(t, e, r) {
        "use strict";

        r(5480)("trimRight", function (t) {
          return function () {
            return t(this, 2);
          };
        }, "trimEnd");
      },
      4757: function _(t, e, r) {
        r(4519)("asyncIterator");
      },
      7414: function _(t, e, r) {
        r(4519)("observable");
      },
      1178: function _(t, e, r) {
        var n = r(1693);
        n(n.S, "System", {
          global: r(4405)
        });
      },
      6006: function _(t, e, r) {
        r(578)("WeakMap");
      },
      9676: function _(t, e, r) {
        r(147)("WeakMap");
      },
      1743: function _(t, e, r) {
        r(578)("WeakSet");
      },
      9026: function _(t, e, r) {
        r(147)("WeakSet");
      },
      9635: function _(t, e, r) {
        for (var n = r(6172), i = r(1126), o = r(9593), a = r(4405), u = r(4461), c = r(7985), s = r(4410), f = s("iterator"), l = s("toStringTag"), h = c.Array, v = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
          }, p = i(v), d = 0; d < p.length; d++) {
          var g,
            y = p[d],
            m = v[y],
            x = a[y],
            b = x && x.prototype;
          if (b && (b[f] || u(b, f, h), b[l] || u(b, l, y), c[y] = h, m)) for (g in n) {
            b[g] || o(b, g, n[g], !0);
          }
        }
      },
      7761: function _(t, e, r) {
        var n = r(1693),
          i = r(1597);
        n(n.G + n.B, {
          setImmediate: i.set,
          clearImmediate: i.clear
        });
      },
      9736: function _(t, e, r) {
        var n = r(4405),
          i = r(1693),
          o = r(7860),
          a = [].slice,
          u = /MSIE .\./.test(o),
          c = function c(t) {
            return function (e, r) {
              var n = arguments.length > 2,
                i = !!n && a.call(arguments, 2);
              return t(n ? function () {
                ("function" == typeof e ? e : Function(e)).apply(this, i);
              } : e, r);
            };
          };
        i(i.G + i.B + i.F * u, {
          setTimeout: c(n.setTimeout),
          setInterval: c(n.setInterval)
        });
      },
      7931: function _(t, e, r) {
        r(107), r(7031), r(8892), r(3073), r(476), r(7771), r(950), r(8899), r(230), r(585), r(5695), r(1263), r(2875), r(2395), r(2680), r(4177), r(6548), r(6268), r(7442), r(6278), r(7998), r(5291), r(4212), r(5434), r(7967), r(3552), r(4412), r(7993), r(1755), r(5390), r(352), r(526), r(708), r(2360), r(5114), r(6367), r(7345), r(9471), r(5890), r(8299), r(9286), r(8240), r(1050), r(8246), r(9349), r(5159), r(3158), r(7521), r(2565), r(8337), r(8582), r(2310), r(3684), r(6373), r(2067), r(1872), r(730), r(3948), r(4487), r(2778), r(1390), r(3583), r(4234), r(6853), r(5165), r(4050), r(7868), r(1191), r(5220), r(1644), r(4609), r(1627), r(8942), r(8325), r(2330), r(6665), r(2943), r(8616), r(1002), r(2550), r(9731), r(745), r(5956), r(6149), r(2106), r(9946), r(2369), r(8931), r(4135), r(6075), r(9662), r(3565), r(9209), r(2733), r(9440), r(5588), r(6233), r(5294), r(5324), r(6172), r(1544), r(7515), r(223), r(5155), r(4675), r(1983), r(6285), r(2467), r(2229), r(9164), r(9594), r(6189), r(6937), r(7955), r(4879), r(5275), r(3411), r(9163), r(157), r(2099), r(2634), r(3463), r(7117), r(1370), r(9757), r(8545), r(3451), r(3735), r(6012), r(9849), r(3806), r(9063), r(1111), r(2413), r(7098), r(2294), r(9920), r(6938), r(8347), r(3570), r(1625), r(5747), r(304), r(1409), r(7066), r(3255), r(5707), r(4757), r(7414), r(9872), r(2094), r(3788), r(4255), r(1346), r(8987), r(6605), r(5745), r(7225), r(8920), r(5127), r(9676), r(9026), r(5865), r(8906), r(6006), r(1743), r(3499), r(1178), r(826), r(3588), r(4607), r(2641), r(5657), r(9252), r(9295), r(3548), r(6577), r(5914), r(4100), r(7151), r(598), r(7752), r(4243), r(7551), r(6157), r(929), r(9493), r(3440), r(314), r(9352), r(8285), r(2541), r(8553), r(1071), r(9736), r(7761), r(9635), t.exports = r(8080);
      },
      5666: function _(t, e, r) {
        !function (e) {
          "use strict";

          var r,
            n = Object.prototype,
            i = n.hasOwnProperty,
            o = "function" == typeof Symbol ? Symbol : {},
            a = o.iterator || "@@iterator",
            u = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag",
            s = e.regeneratorRuntime;
          if (s) t.exports = s;else {
            (s = e.regeneratorRuntime = t.exports).wrap = x;
            var f = "suspendedStart",
              l = "suspendedYield",
              h = "executing",
              v = "completed",
              p = {},
              d = {};
            d[a] = function () {
              return this;
            };
            var g = Object.getPrototypeOf,
              y = g && g(g(L([])));
            y && y !== n && i.call(y, a) && (d = y);
            var m = E.prototype = w.prototype = Object.create(d);
            S.prototype = m.constructor = E, E.constructor = S, E[c] = S.displayName = "GeneratorFunction", s.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return !!e && (e === S || "GeneratorFunction" === (e.displayName || e.name));
            }, s.mark = function (t) {
              return Object.setPrototypeOf ? Object.setPrototypeOf(t, E) : (t.__proto__ = E, c in t || (t[c] = "GeneratorFunction")), t.prototype = Object.create(m), t;
            }, s.awrap = function (t) {
              return {
                __await: t
              };
            }, _(P.prototype), P.prototype[u] = function () {
              return this;
            }, s.AsyncIterator = P, s.async = function (t, e, r, n) {
              var i = new P(x(t, e, r, n));
              return s.isGeneratorFunction(e) ? i : i.next().then(function (t) {
                return t.done ? t.value : i.next();
              });
            }, _(m), m[c] = "Generator", m[a] = function () {
              return this;
            }, m.toString = function () {
              return "[object Generator]";
            }, s.keys = function (t) {
              var e = [];
              for (var r in t) {
                e.push(r);
              }
              return e.reverse(), function r() {
                for (; e.length;) {
                  var n = e.pop();
                  if (n in t) return r.value = n, r.done = !1, r;
                }
                return r.done = !0, r;
              };
            }, s.values = L, F.prototype = {
              constructor: F,
              reset: function reset(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(M), !t) for (var e in this) {
                  "t" === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = r);
                }
              },
              stop: function stop() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function dispatchException(t) {
                if (this.done) throw t;
                var e = this;
                function n(n, i) {
                  return u.type = "throw", u.arg = t, e.next = n, i && (e.method = "next", e.arg = r), !!i;
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    u = a.completion;
                  if ("root" === a.tryLoc) return n("end");
                  if (a.tryLoc <= this.prev) {
                    var c = i.call(a, "catchLoc"),
                      s = i.call(a, "finallyLoc");
                    if (c && s) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    } else if (c) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    } else {
                      if (!s) throw new Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function abrupt(t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var n = this.tryEntries[r];
                  if (n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                    var o = n;
                    break;
                  }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                var a = o ? o.completion : {};
                return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, p) : this.complete(a);
              },
              complete: function complete(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), p;
              },
              finish: function finish(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), M(r), p;
                }
              },
              "catch": function _catch(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      M(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function delegateYield(t, e, n) {
                return this.delegate = {
                  iterator: L(t),
                  resultName: e,
                  nextLoc: n
                }, "next" === this.method && (this.arg = r), p;
              }
            };
          }
          function x(t, e, r, n) {
            var i = e && e.prototype instanceof w ? e : w,
              o = Object.create(i.prototype),
              a = new F(n || []);
            return o._invoke = function (t, e, r) {
              var n = f;
              return function (i, o) {
                if (n === h) throw new Error("Generator is already running");
                if (n === v) {
                  if ("throw" === i) throw o;
                  return j();
                }
                for (r.method = i, r.arg = o;;) {
                  var a = r.delegate;
                  if (a) {
                    var u = O(a, r);
                    if (u) {
                      if (u === p) continue;
                      return u;
                    }
                  }
                  if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
                    if (n === f) throw n = v, r.arg;
                    r.dispatchException(r.arg);
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  n = h;
                  var c = b(t, e, r);
                  if ("normal" === c.type) {
                    if (n = r.done ? v : l, c.arg === p) continue;
                    return {
                      value: c.arg,
                      done: r.done
                    };
                  }
                  "throw" === c.type && (n = v, r.method = "throw", r.arg = c.arg);
                }
              };
            }(t, r, a), o;
          }
          function b(t, e, r) {
            try {
              return {
                type: "normal",
                arg: t.call(e, r)
              };
            } catch (t) {
              return {
                type: "throw",
                arg: t
              };
            }
          }
          function w() {}
          function S() {}
          function E() {}
          function _(t) {
            ["next", "throw", "return"].forEach(function (e) {
              t[e] = function (t) {
                return this._invoke(e, t);
              };
            });
          }
          function P(t) {
            function r(e, n, o, a) {
              var u = b(t[e], t, n);
              if ("throw" !== u.type) {
                var c = u.arg,
                  s = c.value;
                return s && "object" == _typeof(s) && i.call(s, "__await") ? Promise.resolve(s.__await).then(function (t) {
                  r("next", t, o, a);
                }, function (t) {
                  r("throw", t, o, a);
                }) : Promise.resolve(s).then(function (t) {
                  c.value = t, o(c);
                }, a);
              }
              a(u.arg);
            }
            var n;
            "object" == _typeof(e.process) && e.process.domain && (r = e.process.domain.bind(r)), this._invoke = function (t, e) {
              function i() {
                return new Promise(function (n, i) {
                  r(t, e, n, i);
                });
              }
              return n = n ? n.then(i, i) : i();
            };
          }
          function O(t, e) {
            var n = t.iterator[e.method];
            if (n === r) {
              if (e.delegate = null, "throw" === e.method) {
                if (t.iterator["return"] && (e.method = "return", e.arg = r, O(t, e), "throw" === e.method)) return p;
                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
              }
              return p;
            }
            var i = b(n, t.iterator, e.arg);
            if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, p;
            var o = i.arg;
            return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = r), e.delegate = null, p) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p);
          }
          function k(t) {
            var e = {
              tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
          }
          function M(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e;
          }
          function F(t) {
            this.tryEntries = [{
              tryLoc: "root"
            }], t.forEach(k, this), this.reset(!0);
          }
          function L(t) {
            if (t) {
              var e = t[a];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length;) {
                      if (i.call(t, n)) return e.value = t[n], e.done = !1, e;
                    }
                    return e.value = r, e.done = !0, e;
                  };
                return o.next = o;
              }
            }
            return {
              next: j
            };
          }
          function j() {
            return {
              value: r,
              done: !0
            };
          }
        }("object" == _typeof(r.g) ? r.g : "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) ? self : this);
      }
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var o = e[n] = {
      exports: {}
    };
    return t[n].call(o.exports, o, o.exports, r), o.exports;
  }
  r.g = function () {
    if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
    }
  }(), function () {
    "use strict";

    if (r(7931), r(5666), r(7182), r.g._babelPolyfill) throw new Error("only one instance of babel-polyfill is allowed");
    function t(t, e, r) {
      t[e] || Object.defineProperty(t, e, {
        writable: !0,
        configurable: !0,
        value: r
      });
    }
    r.g._babelPolyfill = !0, t(String.prototype, "padLeft", "".padStart), t(String.prototype, "padRight", "".padEnd), "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (e) {
      [][e] && t(Array, e, Function.call.bind([][e]));
    });
  }(), function () {
    "use strict";

    function t(e) {
      return t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      }, t(e);
    }
    function e(e, r) {
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, (void 0, o = function (e, r) {
          if ("object" !== t(e) || null === e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var i = n.call(e, "string");
            if ("object" !== t(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(i.key), "symbol" === t(o) ? o : String(o)), i);
      }
      var o;
    }
    var r = function () {
      function t(e, r, n, i) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.setX(e), this.setY(r), this.setWidth(n), this.setHeight(i), this.setDuty(!0);
      }
      var r, n;
      return r = t, (n = [{
        key: "setDuty",
        value: function value(t) {
          this.objectDuty = t;
        }
      }, {
        key: "isDuty",
        value: function value() {
          return this.getDuty();
        }
      }, {
        key: "getDuty",
        value: function value() {
          return this.objectDuty;
        }
      }, {
        key: "getX",
        value: function value() {
          return this.x;
        }
      }, {
        key: "setX",
        value: function value(t) {
          this.x = t;
        }
      }, {
        key: "getY",
        value: function value() {
          return this.y;
        }
      }, {
        key: "setY",
        value: function value(t) {
          this.y = t;
        }
      }, {
        key: "getWidth",
        value: function value() {
          return this.width;
        }
      }, {
        key: "setWidth",
        value: function value(t) {
          this.width = t;
        }
      }, {
        key: "getHeight",
        value: function value() {
          return this.height;
        }
      }, {
        key: "setHeight",
        value: function value(t) {
          this.height = t;
        }
      }]) && e(r.prototype, n), Object.defineProperty(r, "prototype", {
        writable: !1
      }), t;
    }();
    function n(t) {
      return n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      }, n(t);
    }
    function i() {
      i = function i() {
        return t;
      };
      var t = {},
        e = Object.prototype,
        r = e.hasOwnProperty,
        o = Object.defineProperty || function (t, e, r) {
          t[e] = r.value;
        },
        a = "function" == typeof Symbol ? Symbol : {},
        u = a.iterator || "@@iterator",
        c = a.asyncIterator || "@@asyncIterator",
        s = a.toStringTag || "@@toStringTag";
      function f(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }
      try {
        f({}, "");
      } catch (t) {
        f = function f(t, e, r) {
          return t[e] = r;
        };
      }
      function l(t, e, r, n) {
        var i = e && e.prototype instanceof p ? e : p,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", {
          value: E(t, r, u)
        }), a;
      }
      function h(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      t.wrap = l;
      var v = {};
      function p() {}
      function d() {}
      function g() {}
      var y = {};
      f(y, u, function () {
        return this;
      });
      var m = Object.getPrototypeOf,
        x = m && m(m(M([])));
      x && x !== e && r.call(x, u) && (y = x);
      var b = g.prototype = p.prototype = Object.create(y);
      function w(t) {
        ["next", "throw", "return"].forEach(function (e) {
          f(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function S(t, e) {
        function i(o, a, u, c) {
          var s = h(t[o], t, a);
          if ("throw" !== s.type) {
            var f = s.arg,
              l = f.value;
            return l && "object" == n(l) && r.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
              i("next", t, u, c);
            }, function (t) {
              i("throw", t, u, c);
            }) : e.resolve(l).then(function (t) {
              f.value = t, u(f);
            }, function (t) {
              return i("throw", t, u, c);
            });
          }
          c(s.arg);
        }
        var a;
        o(this, "_invoke", {
          value: function value(t, r) {
            function n() {
              return new e(function (e, n) {
                i(t, r, e, n);
              });
            }
            return a = a ? a.then(n, n) : n();
          }
        });
      }
      function E(t, e, r) {
        var n = "suspendedStart";
        return function (i, o) {
          if ("executing" === n) throw new Error("Generator is already running");
          if ("completed" === n) {
            if ("throw" === i) throw o;
            return {
              value: void 0,
              done: !0
            };
          }
          for (r.method = i, r.arg = o;;) {
            var a = r.delegate;
            if (a) {
              var u = _(a, r);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw n = "completed", r.arg;
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var c = h(t, e, r);
            if ("normal" === c.type) {
              if (n = r.done ? "completed" : "suspendedYield", c.arg === v) continue;
              return {
                value: c.arg,
                done: r.done
              };
            }
            "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg);
          }
        };
      }
      function _(t, e) {
        var r = e.method,
          n = t.iterator[r];
        if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator["return"] && (e.method = "return", e.arg = void 0, _(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), v;
        var i = h(n, t.iterator, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, v;
        var o = i.arg;
        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, v) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, v);
      }
      function P(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function O(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function k(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(P, this), this.reset(!0);
      }
      function M(t) {
        if (t) {
          var e = t[u];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var n = -1,
              i = function e() {
                for (; ++n < t.length;) {
                  if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                }
                return e.value = void 0, e.done = !0, e;
              };
            return i.next = i;
          }
        }
        return {
          next: F
        };
      }
      function F() {
        return {
          value: void 0,
          done: !0
        };
      }
      return d.prototype = g, o(b, "constructor", {
        value: g,
        configurable: !0
      }), o(g, "constructor", {
        value: d,
        configurable: !0
      }), d.displayName = f(g, s, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, g) : (t.__proto__ = g, f(t, s, "GeneratorFunction")), t.prototype = Object.create(b), t;
      }, t.awrap = function (t) {
        return {
          __await: t
        };
      }, w(S.prototype), f(S.prototype, c, function () {
        return this;
      }), t.AsyncIterator = S, t.async = function (e, r, n, i, o) {
        void 0 === o && (o = Promise);
        var a = new S(l(e, r, n, i), o);
        return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, w(b), f(b, s, "Generator"), f(b, u, function () {
        return this;
      }), f(b, "toString", function () {
        return "[object Generator]";
      }), t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) {
          r.push(n);
        }
        return r.reverse(), function t() {
          for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t;
          }
          return t.done = !0, t;
        };
      }, t.values = M, k.prototype = {
        constructor: k,
        reset: function reset(t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !t) for (var e in this) {
            "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
          }
        },
        stop: function stop() {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(t) {
          if (this.done) throw t;
          var e = this;
          function n(r, n) {
            return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var o = this.tryEntries[i],
              a = o.completion;
            if ("root" === o.tryLoc) return n("end");
            if (o.tryLoc <= this.prev) {
              var u = r.call(o, "catchLoc"),
                c = r.call(o, "finallyLoc");
              if (u && c) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              } else if (u) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
              } else {
                if (!c) throw new Error("try statement without catch or finally");
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n];
            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
              var o = i;
              break;
            }
          }
          o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
          var a = o ? o.completion : {};
          return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(a);
        },
        complete: function complete(t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), v;
        },
        finish: function finish(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), v;
          }
        },
        "catch": function _catch(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var i = n.arg;
                O(r);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(t, e, r) {
          return this.delegate = {
            iterator: M(t),
            resultName: e,
            nextLoc: r
          }, "next" === this.method && (this.arg = void 0), v;
        }
      }, t;
    }
    function o(t, e, r, n, i, o, a) {
      try {
        var u = t[o](a),
          c = u.value;
      } catch (t) {
        return void r(t);
      }
      u.done ? e(c) : Promise.resolve(c).then(n, i);
    }
    function a(t, e) {
      for (var r = 0; r < e.length; r++) {
        var i = e[r];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, o = function (t, e) {
          if ("object" !== n(t) || null === t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var i = r.call(t, "string");
            if ("object" !== n(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t);
        }(i.key), "symbol" === n(o) ? o : String(o)), i);
      }
      var o;
    }
    function u(t, e) {
      return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t;
      }, u(t, e);
    }
    function c(t, e) {
      if (e && ("object" === n(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t);
    }
    function s(t) {
      return s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      }, s(t);
    }
    var f = function (t) {
      !function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e && u(t, e);
      }(p, t);
      var e,
        r,
        n,
        f,
        l,
        h,
        v = (l = p, h = function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
          } catch (t) {
            return !1;
          }
        }(), function () {
          var t,
            e = s(l);
          if (h) {
            var r = s(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return c(this, t);
        });
      function p(t, e, r, n, i, o, a) {
        var u;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, p), (u = v.call(this, n, i, o, a)).setFontWeight(t), u.setFontSize(e), u.setFontFamily(r), u.setImageBitmap(null), u.setTextureImage(null), u.setPositionsBuffer(null), u.setFragUVBuffer(null), u.setTextureBindGroup(null), u.setDuty(!1), u;
      }
      return e = p, r = [{
        key: "destroy",
        value: function value() {
          this.setImageBitmap(null), this.setTextureImage(null), this.setPositionsBuffer(null), this.setFragUVBuffer(null), this.setTextureBindGroup(null), this.setDuty(!0);
        }
      }, {
        key: "setTextureBindGroup",
        value: function value(t) {
          this.textureBindGroup = t;
        }
      }, {
        key: "getTextureBindGroup",
        value: function value() {
          return this.textureBindGroup;
        }
      }, {
        key: "setTextureImage",
        value: function value(t) {
          this.textureImage = t;
        }
      }, {
        key: "getTextureImage",
        value: function value() {
          return this.textureImage;
        }
      }, {
        key: "setPositionsBuffer",
        value: function value(t) {
          null == t && null != this.positionsBuffer && this.positionsBuffer.destroy(), this.positionsBuffer = t;
        }
      }, {
        key: "getPositionsBuffer",
        value: function value() {
          return this.positionsBuffer;
        }
      }, {
        key: "getFragUVBuffer",
        value: function value() {
          return this.fragUVBuffer;
        }
      }, {
        key: "setFragUVBuffer",
        value: function value(t) {
          null == t && null != this.fragUVBuffer && this.fragUVBuffer.destroy(), this.fragUVBuffer = t;
        }
      }, {
        key: "setImageBitmap",
        value: function value(t) {
          this.imageBitmap = t;
        }
      }, {
        key: "getImageBitmap",
        value: function value() {
          return this.imageBitmap;
        }
      }, {
        key: "setFontWeight",
        value: function value(t) {
          this.fontWeight = t;
        }
      }, {
        key: "getFontWeight",
        value: function value() {
          return this.fontWeight;
        }
      }, {
        key: "setFontSize",
        value: function value(t) {
          this.fontSize = t;
        }
      }, {
        key: "getFontSize",
        value: function value() {
          return this.fontSize;
        }
      }, {
        key: "setFontFamily",
        value: function value(t) {
          this.fontFamily = t;
        }
      }, {
        key: "getFontFamily",
        value: function value() {
          return this.fontFamily;
        }
      }, {
        key: "draw",
        value: (n = i().mark(function t(e, r, n, o, a) {
          var u,
            c,
            s,
            f,
            l,
            h,
            v,
            p,
            d,
            g,
            y,
            m,
            x,
            b,
            w,
            S = arguments;
          return i().wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  if (u = S.length > 5 && void 0 !== S[5] && S[5], 1 == this.isDuty() && (this.setTextureImage(null), this.setImageBitmap(null), this.setTextureBindGroup(null), this.setPositionsBuffer(null), this.setFragUVBuffer(null), this.setDuty(!1)), null != (c = this.getTextureImage())) {
                    t.next = 26;
                    break;
                  }
                  return s = document.createElement("canvas"), (f = s.getContext("2d")).font = this.getFontWeight().toString() + " " + this.getFontSize().toString() + "px " + this.getFontFamily(), l = this.getHeight(), h = this.getWidth(), v = 0, p = 0, 1 == a ? (d = f.measureText(o), l = d.fontBoundingBoxAscent + d.fontBoundingBoxDescent, h = d.width, this.setWidth(Math.ceil(h)), this.setHeight(Math.ceil(l)), l = this.getHeight(), h = this.getWidth(), v = 0, p = this.getFontSize()) : (g = f.measureText(o), l = g.fontBoundingBoxAscent + g.fontBoundingBoxDescent, h = g.width, v = (this.getWidth() - h) / 2, p = this.getHeight() - (this.getHeight() - l) / 2), s.height = this.getHeight(), s.width = this.getWidth(), f.font = this.getFontWeight().toString() + " " + this.getFontSize().toString() + "px " + this.getFontFamily(), f.fillStyle = n, f.fillRect(0, 0, this.getWidth(), this.getHeight()), f.fillStyle = r, f.fillText(o, v, p, h), t.next = 22, createImageBitmap(s);
                case 22:
                  y = t.sent, this.setImageBitmap(y), c = e.webGPUTextureFromImageBitmapOrCanvas(e.device, this.getImageBitmap(), !0), this.setTextureImage(c);
                case 26:
                  if (1 != u) {
                    t.next = 31;
                    break;
                  }
                  if (null != (m = this.getImageBitmap())) {
                    t.next = 30;
                    break;
                  }
                  return t.abrupt("return", null);
                case 30:
                  return t.abrupt("return", {
                    x: this.getX(),
                    y: this.getY(),
                    width: m.width,
                    height: m.height
                  });
                case 31:
                  null == (x = this.getTextureBindGroup()) && (x = e.device.createBindGroup({
                    layout: e.texturePipeline.getBindGroupLayout(0),
                    entries: [{
                      binding: 0,
                      resource: e.sampler
                    }, {
                      binding: 1,
                      resource: c.createView({
                        baseMipLevel: 0,
                        mipLevelCount: 5
                      })
                    }]
                  }), this.setTextureBindGroup(x)), null == (b = this.getPositionsBuffer()) && (b = e.createBuffer(this.getPositions(e), GPUBufferUsage.VERTEX, e.device), this.setPositionsBuffer(b)), null == (w = this.getFragUVBuffer()) && (w = e.createBuffer(this.getFragUV(e), GPUBufferUsage.VERTEX, e.device), this.setFragUVBuffer(w)), e.passEncoder.setPipeline(e.texturePipeline), e.passEncoder.setBindGroup(0, x), e.passEncoder.setVertexBuffer(0, b), e.passEncoder.setVertexBuffer(1, w), e.passEncoder.draw(6, 1, 0, 0), e.passEncoder.setPipeline(e.linePipeline);
                case 44:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }), f = function f() {
          var t = this,
            e = arguments;
          return new Promise(function (r, i) {
            var a = n.apply(t, e);
            function u(t) {
              o(a, r, i, u, c, "next", t);
            }
            function c(t) {
              o(a, r, i, u, c, "throw", t);
            }
            u(void 0);
          });
        }, function (t, e, r, n, i) {
          return f.apply(this, arguments);
        })
      }, {
        key: "getColors",
        value: function value(t) {
          return new Float32Array([1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1]);
        }
      }, {
        key: "getFragUV",
        value: function value(t) {
          return new Float32Array([1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1]);
        }
      }, {
        key: "getPositions",
        value: function value(t) {
          var e = this.getWidth(),
            r = this.getHeight(),
            n = this.getX() + 1,
            i = this.getY() + 1;
          return new Float32Array([t.calcX(e + n - 1), t.calcY(r + i), t.calcX(e + n), t.calcY(i), t.calcX(n), t.calcY(i), t.calcX(e + n), t.calcY(r + i), t.calcX(n), t.calcY(i), t.calcX(n), t.calcY(r + i)]);
        }
      }], r && a(e.prototype, r), Object.defineProperty(e, "prototype", {
        writable: !1
      }), p;
    }(r);
    function l(t) {
      return l = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      }, l(t);
    }
    function h() {
      h = function h() {
        return t;
      };
      var t = {},
        e = Object.prototype,
        r = e.hasOwnProperty,
        n = Object.defineProperty || function (t, e, r) {
          t[e] = r.value;
        },
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        a = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function c(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }
      try {
        c({}, "");
      } catch (t) {
        c = function c(t, e, r) {
          return t[e] = r;
        };
      }
      function s(t, e, r, i) {
        var o = e && e.prototype instanceof p ? e : p,
          a = Object.create(o.prototype),
          u = new k(i || []);
        return n(a, "_invoke", {
          value: E(t, r, u)
        }), a;
      }
      function f(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      t.wrap = s;
      var v = {};
      function p() {}
      function d() {}
      function g() {}
      var y = {};
      c(y, o, function () {
        return this;
      });
      var m = Object.getPrototypeOf,
        x = m && m(m(M([])));
      x && x !== e && r.call(x, o) && (y = x);
      var b = g.prototype = p.prototype = Object.create(y);
      function w(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function S(t, e) {
        function i(n, o, a, u) {
          var c = f(t[n], t, o);
          if ("throw" !== c.type) {
            var s = c.arg,
              h = s.value;
            return h && "object" == l(h) && r.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
              i("next", t, a, u);
            }, function (t) {
              i("throw", t, a, u);
            }) : e.resolve(h).then(function (t) {
              s.value = t, a(s);
            }, function (t) {
              return i("throw", t, a, u);
            });
          }
          u(c.arg);
        }
        var o;
        n(this, "_invoke", {
          value: function value(t, r) {
            function n() {
              return new e(function (e, n) {
                i(t, r, e, n);
              });
            }
            return o = o ? o.then(n, n) : n();
          }
        });
      }
      function E(t, e, r) {
        var n = "suspendedStart";
        return function (i, o) {
          if ("executing" === n) throw new Error("Generator is already running");
          if ("completed" === n) {
            if ("throw" === i) throw o;
            return {
              value: void 0,
              done: !0
            };
          }
          for (r.method = i, r.arg = o;;) {
            var a = r.delegate;
            if (a) {
              var u = _(a, r);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw n = "completed", r.arg;
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var c = f(t, e, r);
            if ("normal" === c.type) {
              if (n = r.done ? "completed" : "suspendedYield", c.arg === v) continue;
              return {
                value: c.arg,
                done: r.done
              };
            }
            "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg);
          }
        };
      }
      function _(t, e) {
        var r = e.method,
          n = t.iterator[r];
        if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator["return"] && (e.method = "return", e.arg = void 0, _(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), v;
        var i = f(n, t.iterator, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, v;
        var o = i.arg;
        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, v) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, v);
      }
      function P(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function O(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function k(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(P, this), this.reset(!0);
      }
      function M(t) {
        if (t) {
          var e = t[o];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var n = -1,
              i = function e() {
                for (; ++n < t.length;) {
                  if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                }
                return e.value = void 0, e.done = !0, e;
              };
            return i.next = i;
          }
        }
        return {
          next: F
        };
      }
      function F() {
        return {
          value: void 0,
          done: !0
        };
      }
      return d.prototype = g, n(b, "constructor", {
        value: g,
        configurable: !0
      }), n(g, "constructor", {
        value: d,
        configurable: !0
      }), d.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, g) : (t.__proto__ = g, c(t, u, "GeneratorFunction")), t.prototype = Object.create(b), t;
      }, t.awrap = function (t) {
        return {
          __await: t
        };
      }, w(S.prototype), c(S.prototype, a, function () {
        return this;
      }), t.AsyncIterator = S, t.async = function (e, r, n, i, o) {
        void 0 === o && (o = Promise);
        var a = new S(s(e, r, n, i), o);
        return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, w(b), c(b, u, "Generator"), c(b, o, function () {
        return this;
      }), c(b, "toString", function () {
        return "[object Generator]";
      }), t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) {
          r.push(n);
        }
        return r.reverse(), function t() {
          for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t;
          }
          return t.done = !0, t;
        };
      }, t.values = M, k.prototype = {
        constructor: k,
        reset: function reset(t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !t) for (var e in this) {
            "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
          }
        },
        stop: function stop() {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(t) {
          if (this.done) throw t;
          var e = this;
          function n(r, n) {
            return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var o = this.tryEntries[i],
              a = o.completion;
            if ("root" === o.tryLoc) return n("end");
            if (o.tryLoc <= this.prev) {
              var u = r.call(o, "catchLoc"),
                c = r.call(o, "finallyLoc");
              if (u && c) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              } else if (u) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
              } else {
                if (!c) throw new Error("try statement without catch or finally");
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n];
            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
              var o = i;
              break;
            }
          }
          o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
          var a = o ? o.completion : {};
          return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(a);
        },
        complete: function complete(t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), v;
        },
        finish: function finish(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), v;
          }
        },
        "catch": function _catch(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var i = n.arg;
                O(r);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(t, e, r) {
          return this.delegate = {
            iterator: M(t),
            resultName: e,
            nextLoc: r
          }, "next" === this.method && (this.arg = void 0), v;
        }
      }, t;
    }
    function v(t, e, r, n, i, o, a) {
      try {
        var u = t[o](a),
          c = u.value;
      } catch (t) {
        return void r(t);
      }
      u.done ? e(c) : Promise.resolve(c).then(n, i);
    }
    function p(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = t.apply(e, r);
          function a(t) {
            v(o, n, i, a, u, "next", t);
          }
          function u(t) {
            v(o, n, i, a, u, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function d(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, (void 0, i = function (t, e) {
          if ("object" !== l(t) || null === t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var n = r.call(t, "string");
            if ("object" !== l(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t);
        }(n.key), "symbol" === l(i) ? i : String(i)), n);
      }
      var i;
    }
    function g(t, e) {
      return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t;
      }, g(t, e);
    }
    function y(t, e) {
      if (e && ("object" === l(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t);
    }
    function m(t) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      }, m(t);
    }
    var x = function (t) {
      !function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e && g(t, e);
      }(l, t);
      var e,
        r,
        n,
        i,
        o,
        a,
        u,
        c,
        s = (u = l, c = function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
          } catch (t) {
            return !1;
          }
        }(), function () {
          var t,
            e = m(u);
          if (c) {
            var r = m(this).constructor;
            t = Reflect.construct(e, arguments, r);
          } else t = e.apply(this, arguments);
          return y(this, t);
        });
      function l(t, e, r, n) {
        var i;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, l), (i = s.call(this, t, e, r, n)).clearItems(), i.setColorsBuffer(null), i.setPositionsBuffer(null), i.setMaxX(+Math.PI), i.setMinX(-Math.PI), i.setItX(58), i.setMaxY(1), i.setMinY(-1), i.setItY(20), i.setDuty(!1), i.objectLabels = [], i;
      }
      return e = l, r = [{
        key: "destroy",
        value: function value() {
          for (var t = this.objectLabels.length - 1; t >= 0; t--) {
            this.objectLabels[t].destroy();
          }
          this.objectLabels = [], this.setBorderPositionsBuffer(null), this.setBorderColorsBuffer(null), this.setPositionsBuffer(null), this.setColorsBuffer(null), this.setAxisPositionsBuffer(null), this.setAxisColorsBuffer(null), this.setDuty(!0);
        }
      }, {
        key: "setItX",
        value: function value(t) {
          this.itX = t;
        }
      }, {
        key: "getItX",
        value: function value() {
          return this.itX;
        }
      }, {
        key: "setItY",
        value: function value(t) {
          this.itY = t;
        }
      }, {
        key: "getItY",
        value: function value() {
          return this.itY;
        }
      }, {
        key: "setMinX",
        value: function value(t) {
          this.minX = t;
        }
      }, {
        key: "getMinX",
        value: function value() {
          return this.minX;
        }
      }, {
        key: "setMaxX",
        value: function value(t) {
          this.maxX = t;
        }
      }, {
        key: "getMaxX",
        value: function value() {
          return this.maxX;
        }
      }, {
        key: "setMinY",
        value: function value(t) {
          this.minY = t;
        }
      }, {
        key: "getMinY",
        value: function value() {
          return this.minY;
        }
      }, {
        key: "setMaxY",
        value: function value(t) {
          this.maxY = t;
        }
      }, {
        key: "getMaxY",
        value: function value() {
          return this.maxY;
        }
      }, {
        key: "setBorderPositionsBuffer",
        value: function value(t) {
          null == t && null != this.borderPositionsBuffer && this.borderPositionsBuffer.destroy(), this.borderPositionsBuffer = t;
        }
      }, {
        key: "getBorderPositionsBuffer",
        value: function value() {
          return this.borderPositionsBuffer;
        }
      }, {
        key: "setBorderColorsBuffer",
        value: function value(t) {
          null == t && null != this.borderColorsBuffer && this.borderColorsBuffer.destroy(), this.borderColorsBuffer = t;
        }
      }, {
        key: "getBorderColorsBuffer",
        value: function value() {
          return this.borderColorsBuffer;
        }
      }, {
        key: "setAxisPositionsBuffer",
        value: function value(t) {
          null == t && null != this.axisPositionsBuffer && this.axisPositionsBuffer.destroy(), this.axisPositionsBuffer = t;
        }
      }, {
        key: "getAxisPositionsBuffer",
        value: function value() {
          return this.axisPositionsBuffer;
        }
      }, {
        key: "setAxisColorsBuffer",
        value: function value(t) {
          null == t && null != this.axisColorsBuffer && this.axisColorsBuffer.destroy(), this.axisColorsBuffer = t;
        }
      }, {
        key: "getAxisColorsBuffer",
        value: function value() {
          return this.axisColorsBuffer;
        }
      }, {
        key: "setPositionsBuffer",
        value: function value(t) {
          null == t && null != this.positionsBuffer && this.positionsBuffer.destroy(), this.positionsBuffer = t;
        }
      }, {
        key: "getPositionsBuffer",
        value: function value() {
          return this.positionsBuffer;
        }
      }, {
        key: "setColorsBuffer",
        value: function value(t) {
          null == t && null != this.colorsBuffer && this.colorsBuffer.destroy(), this.colorsBuffer = t;
        }
      }, {
        key: "getColorsBuffer",
        value: function value() {
          return this.colorsBuffer;
        }
      }, {
        key: "appendItem",
        value: function value(t, e, r) {
          for (var n = new Float32Array(this.positions.length + e.length), i = 0; i < this.positions.length; i++) {
            n[i] = this.positions[i];
          }
          n[0 + this.positions.length] = e[0], n[1 + this.positions.length] = e[1], n[2 + this.positions.length] = e[2], this.positions = n;
          for (var o = new Float32Array(this.colors.length + r.length), a = 0; a < this.colors.length; a++) {
            o[a] = this.colors[a];
          }
          o[0 + this.colors.length] = r[0], o[1 + this.colors.length] = r[1], o[2 + this.colors.length] = r[2], o[3 + this.colors.length] = r[3], this.colors = o;
        }
      }, {
        key: "clearItems",
        value: function value() {
          this.positions = new Float32Array(), this.colors = new Float32Array();
        }
      }, {
        key: "getLabelsCount",
        value: function value() {
          return this.objectLabels.length;
        }
      }, {
        key: "getLabelAt",
        value: function value(t) {
          return this.objectLabels[t];
        }
      }, {
        key: "appendLabel",
        value: function value(t) {
          return this.objectLabels.push(t), this.objectLabels.length - 1;
        }
      }, {
        key: "getPositions",
        value: function value(t) {
          for (var e = new Float32Array(this.positions.length), r = 0; r < this.positions.length; r += 3) {
            var n = this.getX() + this.positions[r + 0] + 2;
            n < this.getX() + 2 && (n = this.getX() + 2), n > this.getX() + this.getWidth() - 1 && (n = this.getX() + this.getWidth() - 1);
            var i = this.getY() + this.positions[r + 1] + 2;
            i < this.getY() + 2 && (i = this.getY() + 2), i > this.getY() + this.getHeight() - 1 && (i = this.getY() + this.getHeight() - 1), e[r + 0] = t.calcX(0 == r ? n - 1 : n), e[r + 1] = t.calcY(i), e[r + 2] = this.positions[r + 2];
          }
          return e;
        }
      }, {
        key: "getColors",
        value: function value(t) {
          return this.colors;
        }
      }, {
        key: "getBorderPositions",
        value: function value(t) {
          var e = this.getWidth() - 1,
            r = this.getHeight() - 1,
            n = this.getX() + 1,
            i = this.getY() + 1;
          return new Float32Array([t.calcX(n - 1), t.calcY(i), 0, t.calcX(e + n), t.calcY(i), 0, t.calcX(e + n), t.calcY(i), 0, t.calcX(e + n), t.calcY(r + i), 0, t.calcX(e + n), t.calcY(r + i), 0, t.calcX(n), t.calcY(r + i), 0, t.calcX(n), t.calcY(r + i), 0, t.calcX(n), t.calcY(i), 0]);
        }
      }, {
        key: "getBorderColors",
        value: function value(t) {
          for (var e = Date.now(), r = [.5 * (Math.cos(e / 1e3) + 1), 0, 0, 1], n = [0, .5 * (Math.cos(e / 1e3 + Math.PI / 2) + 1), 0, 1], i = [0, 0, .5 * (Math.cos(e / 1e3 + Math.PI) + 1), 1], o = [0, .5 * (Math.cos(e / 1e3 + 3 * Math.PI / 2) + 1), 0, 1], a = 0, u = new Float32Array(32), c = 0; c < 4; c++) {
            u[a++] = r[c];
          }
          for (var s = 0; s < 4; s++) {
            u[a++] = n[s];
          }
          for (var f = 0; f < 4; f++) {
            u[a++] = n[f];
          }
          for (var l = 0; l < 4; l++) {
            u[a++] = i[l];
          }
          for (var h = 0; h < 4; h++) {
            u[a++] = i[h];
          }
          for (var v = 0; v < 4; v++) {
            u[a++] = o[v];
          }
          for (var p = 0; p < 4; p++) {
            u[a++] = o[p];
          }
          for (var d = 0; d < 4; d++) {
            u[a++] = r[d];
          }
          return u;
        }
      }, {
        key: "getAxisPositions",
        value: function value(t, e, r) {
          for (var n = 1 | e, i = 1 | r, o = this.getWidth() - 3, a = this.getHeight() - 3, u = this.getX() + 2, c = this.getY() + 2, s = o / (n - 1), f = a / (i - 1), l = 0, h = new Float32Array(2 * (n + i + 2) * 3), v = 0; v < 12; v++) {
            h[l++] = [t.calcX(0 == l ? u - 1 : u), t.calcY(c + a / 2), 0, t.calcX(o + u), t.calcY(c + a / 2), 0, t.calcX(o / 2 + u), t.calcY(c), 0, t.calcX(o / 2 + u), t.calcY(a + c), 0][v];
          }
          for (var p = 0; p < n; p++) {
            for (var d = 0; d < 6; d++) {
              h[l++] = [t.calcX(p * s + u), t.calcY(a / 2 + c - 1), 0, t.calcX(p * s + u), t.calcY(a / 2 + c + 2), 0][d];
            }
          }
          for (var g = 0; g < i; g++) {
            for (var y = 0; y < 6; y++) {
              h[l++] = [t.calcX(o / 2 + u - 1), t.calcY(g * f + c), 0, t.calcX(o / 2 + u + 2), t.calcY(g * f + c), 0][y];
            }
          }
          return h;
        }
      }, {
        key: "getAxisColors",
        value: function value(t, e, r) {
          for (var n = e, i = new Float32Array(2 * (n + 2) * 4), o = 0, a = 0; a < 2 * (n + 2); a++) {
            for (var u = 0; u < 4; u++) {
              i[o++] = r[u];
            }
          }
          return i;
        }
      }, {
        key: "draw",
        value: (a = p(h().mark(function t(e) {
          var r, n;
          return h().wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  1 == this.isDuty() && (this.setPositionsBuffer(null), this.setColorsBuffer(null), this.setBorderPositionsBuffer(null), this.setBorderColorsBuffer(null), this.setAxisPositionsBuffer(null), this.setAxisColorsBuffer(null), this.setDuty(!1)), null == (r = this.getBorderPositionsBuffer()) && (r = e.createBuffer(this.getBorderPositions(e), GPUBufferUsage.VERTEX, e.device), this.setBorderPositionsBuffer(r)), this.setBorderColorsBuffer(null), null == (n = this.getBorderColorsBuffer()) && (n = e.createBuffer(this.getBorderColors(e), GPUBufferUsage.VERTEX, e.device), this.setBorderColorsBuffer(n)), e.passEncoder.setPipeline(e.linePipeline), e.passEncoder.setVertexBuffer(0, r), e.passEncoder.setVertexBuffer(1, n), e.passEncoder.draw(8, 1, 0, 0);
                case 11:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        })), function (t) {
          return a.apply(this, arguments);
        })
      }, {
        key: "axisDraw",
        value: (o = p(h().mark(function t(e, r, n, i, o, a, u) {
          var c,
            s,
            l,
            v,
            p,
            d,
            g,
            y,
            m,
            x,
            b,
            w,
            S,
            E,
            _,
            P,
            O,
            k,
            M,
            F,
            L,
            j,
            B,
            I,
            T,
            A,
            R,
            N,
            C,
            G,
            U,
            Y,
            X,
            D = arguments;
          return h().wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  if (c = D.length > 7 && void 0 !== D[7] ? D[7] : [1, 1, 1, 1], this.setMinX(r), this.setMaxX(n), this.setItX(i), this.setMinY(o), this.setMaxY(a), this.setItY(u), v = (n - r) / ((s = 1 | i) - 1), p = (a - o) / ((l = 1 | u) - 1), d = this.getAxisPositions(e, s, l), g = this.getAxisColors(e, s + l, c), 0 == this.getLabelsCount()) {
                    for (y = 0; y < s; y++) {
                      (m = new f("lighter", 10, "UL Segoe UI Light", 0, 0, 128, 128)).setX(e.calcRX(d[12 + 6 * y + 0])), m.setY(e.calcRY(d[12 + 6 * y + 1]) + 4), m.setDuty(!0), this.appendLabel(m);
                    }
                    for (x = 0; x < l; x++) {
                      (b = new f("lighter", 10, "UL Segoe UI Light", 0, 0, 128, 128)).setX(e.calcRX(d[12 + 6 * (s + x) + 0]) + 4), b.setY(e.calcRY(d[12 + 6 * (s + x) + 1])), b.setDuty(!0), this.appendLabel(b);
                    }
                  }
                  w = 0, S = null, E = 0;
                case 18:
                  if (!(E < s)) {
                    t.next = 41;
                    break;
                  }
                  if (_ = "", _ = (P = r + v * E) > 0 ? "+" : "", E == (s - 1) / 2) {
                    t.next = 37;
                    break;
                  }
                  return O = S, k = _ + P.toFixed(2).toString(), M = "rgba(255, 255, 255, 0.6)", F = "rgba(0, 0, 0, 1.0)", L = this.getLabelAt(w), t.next = 30, L.draw(e, M, F, k, !0, !0);
                case 30:
                  if (null == (j = t.sent)) {
                    t.next = 37;
                    break;
                  }
                  if (null == O && (O = j), !(O == j || j.x - O.x > 2 * j.width && j.x + j.width < this.getX() + this.getWidth())) {
                    t.next = 37;
                    break;
                  }
                  return t.next = 36, L.draw(e, M, F, k, !0, !1);
                case 36:
                  S = j;
                case 37:
                  w++;
                case 38:
                  E++, t.next = 18;
                  break;
                case 41:
                  S = null, B = 0;
                case 43:
                  if (!(B < l)) {
                    t.next = 67;
                    break;
                  }
                  if (I = "", I = (T = a - p * B) > 0 ? "+" : "", B == (l - 1) / 2) {
                    t.next = 63;
                    break;
                  }
                  return A = I + T.toFixed(2).toString(), R = "rgba(255, 255, 255, 0.6)", N = "rgba(0, 0, 0, 1.0)", C = this.getLabelAt(w), t.next = 55, C.draw(e, R, N, A, !0, !0);
                case 55:
                  if (null == (G = t.sent)) {
                    t.next = 63;
                    break;
                  }
                  if (!(G.y - this.getY() > G.height && this.getHeight() + this.getY() - G.y > G.height)) {
                    t.next = 63;
                    break;
                  }
                  return C.setY(G.y - G.height / 2 - 1), t.next = 61, C.draw(e, R, N, A, !0, !1);
                case 61:
                  C.setY(G.y), S = G;
                case 63:
                  w++;
                case 64:
                  B++, t.next = 43;
                  break;
                case 67:
                  null == (U = this.getAxisPositionsBuffer()) && (U = e.createBuffer(d, GPUBufferUsage.VERTEX, e.device), this.setAxisPositionsBuffer(U)), null == (Y = this.getAxisColorsBuffer()) && (Y = e.createBuffer(g, GPUBufferUsage.VERTEX, e.device), this.setAxisColorsBuffer(Y)), X = d.length / 3, e.passEncoder.setPipeline(e.linePipeline), e.passEncoder.setVertexBuffer(0, U), e.passEncoder.setVertexBuffer(1, Y), e.passEncoder.draw(X, 1, 0, 0);
                case 76:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        })), function (t, e, r, n, i, a, u) {
          return o.apply(this, arguments);
        })
      }, {
        key: "functionSimpleDraw",
        value: (i = p(h().mark(function t(e, r, n) {
          var i,
            o = arguments;
          return h().wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return i = o.length > 3 && void 0 !== o[3] ? o[3] : [1, 1, 1, 1], t.next = 3, this.functionDraw(e, this.getMinX(), this.getMaxX(), this.getItX(), r, n, i);
                case 3:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        })), function (t, e, r) {
          return i.apply(this, arguments);
        })
      }, {
        key: "functionDraw",
        value: (n = p(h().mark(function t(e, r, n, i, o, a) {
          var u,
            c,
            s,
            f,
            l,
            v,
            p,
            d,
            g,
            y,
            m,
            x,
            b,
            w,
            S,
            E,
            _,
            P,
            O,
            k,
            M,
            F,
            L = arguments;
          return h().wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  for (u = L.length > 6 && void 0 !== L[6] ? L[6] : [1, 1, 1, 1], c = this.getWidth() - 2, s = this.getHeight() - 2, f = n < this.getMaxX() ? n : this.getMaxX(), l = r > this.getMinX() ? r : this.getMinX(), v = f - l, p = this.getMaxX() - this.getMinX(), d = this.getMaxY() - this.getMinY(), y = v / ((g = 1 | i) - 1), m = 0, x = 0, this.clearItems(), b = 0; b < g - 1; b++) {
                    x = o(m = b * y + l), w = m - this.getMinX(), S = x - this.getMinY(), E = e.calcScale(c, p, w), _ = s - e.calcScale(s, d, S), this.appendItem(e, [E, _, 0], u), x = o(m = (b + 1) * y + l), w = m - this.getMinX(), S = x - this.getMinY(), E = e.calcScale(c, p, w), _ = s - e.calcScale(s, d, S), this.appendItem(e, [E, _, 0], u), a && (this.appendItem(e, [E - 1, _ + 1, 0], u), this.appendItem(e, [E - 1, _ - 1, 0], u), this.appendItem(e, [E - 1, _ - 1, 0], u), this.appendItem(e, [E + 1, _ - 1, 0], u), this.appendItem(e, [E + 1, _ - 1, 0], u), this.appendItem(e, [E + 1, _ + 1, 0], u), this.appendItem(e, [E + 1, _ + 1, 0], u), this.appendItem(e, [E - 1, _ + 1, 0], u));
                  }
                  P = this.getPositions(e), O = this.getColors(e), k = e.createBuffer(P, GPUBufferUsage.VERTEX, e.device), e.GPUbuffers.push(k), M = e.createBuffer(O, GPUBufferUsage.VERTEX, e.device), e.GPUbuffers.push(M), F = P.length / 3, e.passEncoder.setPipeline(e.linePipeline), e.passEncoder.setVertexBuffer(0, k), e.passEncoder.setVertexBuffer(1, M), e.passEncoder.draw(F, 1, 0, 0);
                case 25:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        })), function (t, e, r, i, o, a) {
          return n.apply(this, arguments);
        })
      }], r && d(e.prototype, r), Object.defineProperty(e, "prototype", {
        writable: !1
      }), l;
    }(r);
    var b = "\r\nstruct lineOut {\r\n    @builtin(position) outPosition: vec4<f32>,\r\n    @location(0) outColor : vec4<f32>\r\n}\r\n\r\nstruct triangleOut {\r\n    @builtin(position) outPosition: vec4<f32>,\r\n    @location(0) outFragUV : vec2<f32>\r\n}\r\n\r\n@vertex\r\nfn main( @location(0) inPosition: vec3<f32>, @location(1) inColor : vec4<f32> ) -> lineOut {\r\n    var vertex: lineOut;\r\n    vertex.outPosition = vec4<f32>(inPosition, 1.0);\r\n    vertex.outColor = inColor;\r\n    return vertex;\r\n}\r\n\r\n@vertex\r\nfn drawTexture( @location(0) inPosition: vec2<f32>, @location(1) inFragUV : vec2<f32> ) -> triangleOut {\r\n    var vertex: triangleOut;\r\n    vertex.outPosition = vec4<f32>(inPosition, 0.0, 1.0);\r\n    vertex.outFragUV = inFragUV;\r\n    return vertex;\r\n}\r\n\r\n",
      w = "\r\n@group(0) @binding(0) var bindSampler : sampler;\r\n@group(0) @binding(1) var bindTexture : texture_2d<f32>;\r\n\r\n@fragment\r\nfn main(@location(0) inColor : vec4<f32>) -> @location(0) vec4<f32> \r\n{\r\n   return inColor;\r\n} \r\n\r\n@fragment\r\nfn drawTexture(@location(0) inFragUV : vec2<f32>) -> @location(0) vec4<f32> \r\n{\r\n   return textureSample(bindTexture, bindSampler, inFragUV);\r\n}    \r\n";
    function S(t) {
      return S = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      }, S(t);
    }
    function E() {
      E = function E() {
        return t;
      };
      var t = {},
        e = Object.prototype,
        r = e.hasOwnProperty,
        n = Object.defineProperty || function (t, e, r) {
          t[e] = r.value;
        },
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        a = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function c(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }
      try {
        c({}, "");
      } catch (t) {
        c = function c(t, e, r) {
          return t[e] = r;
        };
      }
      function s(t, e, r, i) {
        var o = e && e.prototype instanceof h ? e : h,
          a = Object.create(o.prototype),
          u = new k(i || []);
        return n(a, "_invoke", {
          value: w(t, r, u)
        }), a;
      }
      function f(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      t.wrap = s;
      var l = {};
      function h() {}
      function v() {}
      function p() {}
      var d = {};
      c(d, o, function () {
        return this;
      });
      var g = Object.getPrototypeOf,
        y = g && g(g(M([])));
      y && y !== e && r.call(y, o) && (d = y);
      var m = p.prototype = h.prototype = Object.create(d);
      function x(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function b(t, e) {
        function i(n, o, a, u) {
          var c = f(t[n], t, o);
          if ("throw" !== c.type) {
            var s = c.arg,
              l = s.value;
            return l && "object" == S(l) && r.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
              i("next", t, a, u);
            }, function (t) {
              i("throw", t, a, u);
            }) : e.resolve(l).then(function (t) {
              s.value = t, a(s);
            }, function (t) {
              return i("throw", t, a, u);
            });
          }
          u(c.arg);
        }
        var o;
        n(this, "_invoke", {
          value: function value(t, r) {
            function n() {
              return new e(function (e, n) {
                i(t, r, e, n);
              });
            }
            return o = o ? o.then(n, n) : n();
          }
        });
      }
      function w(t, e, r) {
        var n = "suspendedStart";
        return function (i, o) {
          if ("executing" === n) throw new Error("Generator is already running");
          if ("completed" === n) {
            if ("throw" === i) throw o;
            return {
              value: void 0,
              done: !0
            };
          }
          for (r.method = i, r.arg = o;;) {
            var a = r.delegate;
            if (a) {
              var u = _(a, r);
              if (u) {
                if (u === l) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw n = "completed", r.arg;
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var c = f(t, e, r);
            if ("normal" === c.type) {
              if (n = r.done ? "completed" : "suspendedYield", c.arg === l) continue;
              return {
                value: c.arg,
                done: r.done
              };
            }
            "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg);
          }
        };
      }
      function _(t, e) {
        var r = e.method,
          n = t.iterator[r];
        if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator["return"] && (e.method = "return", e.arg = void 0, _(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), l;
        var i = f(n, t.iterator, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, l;
        var o = i.arg;
        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l);
      }
      function P(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function O(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function k(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(P, this), this.reset(!0);
      }
      function M(t) {
        if (t) {
          var e = t[o];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var n = -1,
              i = function e() {
                for (; ++n < t.length;) {
                  if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                }
                return e.value = void 0, e.done = !0, e;
              };
            return i.next = i;
          }
        }
        return {
          next: F
        };
      }
      function F() {
        return {
          value: void 0,
          done: !0
        };
      }
      return v.prototype = p, n(m, "constructor", {
        value: p,
        configurable: !0
      }), n(p, "constructor", {
        value: v,
        configurable: !0
      }), v.displayName = c(p, u, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, c(t, u, "GeneratorFunction")), t.prototype = Object.create(m), t;
      }, t.awrap = function (t) {
        return {
          __await: t
        };
      }, x(b.prototype), c(b.prototype, a, function () {
        return this;
      }), t.AsyncIterator = b, t.async = function (e, r, n, i, o) {
        void 0 === o && (o = Promise);
        var a = new b(s(e, r, n, i), o);
        return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, x(m), c(m, u, "Generator"), c(m, o, function () {
        return this;
      }), c(m, "toString", function () {
        return "[object Generator]";
      }), t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) {
          r.push(n);
        }
        return r.reverse(), function t() {
          for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t;
          }
          return t.done = !0, t;
        };
      }, t.values = M, k.prototype = {
        constructor: k,
        reset: function reset(t) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !t) for (var e in this) {
            "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
          }
        },
        stop: function stop() {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(t) {
          if (this.done) throw t;
          var e = this;
          function n(r, n) {
            return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var o = this.tryEntries[i],
              a = o.completion;
            if ("root" === o.tryLoc) return n("end");
            if (o.tryLoc <= this.prev) {
              var u = r.call(o, "catchLoc"),
                c = r.call(o, "finallyLoc");
              if (u && c) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              } else if (u) {
                if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
              } else {
                if (!c) throw new Error("try statement without catch or finally");
                if (this.prev < o.finallyLoc) return n(o.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n];
            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
              var o = i;
              break;
            }
          }
          o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
          var a = o ? o.completion : {};
          return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, l) : this.complete(a);
        },
        complete: function complete(t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l;
        },
        finish: function finish(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), l;
          }
        },
        "catch": function _catch(t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var i = n.arg;
                O(r);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(t, e, r) {
          return this.delegate = {
            iterator: M(t),
            resultName: e,
            nextLoc: r
          }, "next" === this.method && (this.arg = void 0), l;
        }
      }, t;
    }
    function _(t, e, r, n, i, o, a) {
      try {
        var u = t[o](a),
          c = u.value;
      } catch (t) {
        return void r(t);
      }
      u.done ? e(c) : Promise.resolve(c).then(n, i);
    }
    function P(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = t.apply(e, r);
          function a(t) {
            _(o, n, i, a, u, "next", t);
          }
          function u(t) {
            _(o, n, i, a, u, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function O(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, k(n.key), n);
      }
    }
    function k(t) {
      var e = function (t, e) {
        if ("object" !== S(t) || null === t) return t;
        var r = t[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(t, "string");
          if ("object" !== S(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      }(t);
      return "symbol" === S(e) ? e : String(e);
    }
    var M = function () {
        function t(e) {
          var r,
            n,
            i,
            o = this;
          !function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, t), r = this, n = "render", i = P(E().mark(function t() {
            var e, r, n, i;
            return E().wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    return o.colorTexture = o.context.getCurrentTexture(), o.colorTextureView = o.colorTexture.createView(), o.encodeCreate(), o.passEncoder.setPipeline(o.linePipeline), e = window.getDrawParams.call(), t.next = 7, o.spline.draw(o);
                  case 7:
                    r = 0;
                  case 8:
                    if (!(r < e.draw.length)) {
                      t.next = 16;
                      break;
                    }
                    if (!e.draw[r].coords.visibility) {
                      t.next = 13;
                      break;
                    }
                    return t.next = 12, o.spline.axisDraw(o, e.draw[r].coords.x.min, e.draw[r].coords.x.max, e.draw[r].coords.x.repeats, e.draw[r].coords.y.min, e.draw[r].coords.y.max, e.draw[r].coords.y.repeats, e.draw[r].coords.color);
                  case 12:
                    return t.abrupt("break", 16);
                  case 13:
                    r++, t.next = 8;
                    break;
                  case 16:
                    n = 0;
                  case 17:
                    if (!(n < e.draw.length)) {
                      t.next = 30;
                      break;
                    }
                    if (i = !1, i = "undefined" !== e.draw[n].drawpoints && e.draw[n].drawpoints, !e.draw[n].range) {
                      t.next = 25;
                      break;
                    }
                    return t.next = 23, o.spline.functionDraw(o, e.draw[n].range.min, e.draw[n].range.max, e.draw[n].range.repeats, e.draw[n].func, i, e.draw[n].color);
                  case 23:
                    t.next = 27;
                    break;
                  case 25:
                    return t.next = 27, o.spline.functionSimpleDraw(o, e.draw[n].func, i, e.draw[n].color);
                  case 27:
                    n++, t.next = 17;
                    break;
                  case 30:
                    o.encodeFinish(), requestAnimationFrame(o.render);
                  case 32:
                  case "end":
                    return t.stop();
                }
              }
            }, t);
          })), (n = k(n)) in r ? Object.defineProperty(r, n, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : r[n] = i, this.canvas = e;
        }
        var e, r, n, i, o, a;
        return e = t, r = [{
          key: "getCanvas",
          value: function value() {
            return this.canvas;
          }
        }, {
          key: "getCanvasWidth",
          value: function value() {
            return this.canvas.width;
          }
        }, {
          key: "getCanvasHeight",
          value: function value() {
            return this.canvas.height;
          }
        }, {
          key: "calcRX",
          value: function value(t) {
            var e = 1 / Math.fround(this.getCanvasWidth() / 2);
            return Math.round((t + 1) / e);
          }
        }, {
          key: "calcRY",
          value: function value(t) {
            var e = 1 / Math.fround(this.getCanvasHeight() / 2);
            return this.getCanvasHeight() - Math.round((t + 1) / e);
          }
        }, {
          key: "calcX",
          value: function value(t) {
            var e = 1 / Math.fround(this.getCanvasWidth() / 2);
            return Math.fround(t) * e - 1;
          }
        }, {
          key: "calcY",
          value: function value(t) {
            var e = this.getCanvasHeight() - t,
              r = 1 / Math.fround(this.getCanvasHeight() / 2);
            return Math.fround(e) * r - 1;
          }
        }, {
          key: "calcScale",
          value: function value(t, e, r) {
            return t * r / e;
          }
        }, {
          key: "start",
          value: (a = P(E().mark(function t() {
            return E().wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, this.initializeAPI();
                  case 2:
                    if (!t.sent) {
                      t.next = 7;
                      break;
                    }
                    return this.resizeBackings(), t.next = 6, this.initializeResources();
                  case 6:
                    this.render();
                  case 7:
                  case "end":
                    return t.stop();
                }
              }
            }, t, this);
          })), function () {
            return a.apply(this, arguments);
          })
        }, {
          key: "restart",
          value: (o = P(E().mark(function t() {
            return E().wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    return this.resizeBackings(), t.next = 3, this.initializeResources();
                  case 3:
                    this.render();
                  case 4:
                  case "end":
                    return t.stop();
                }
              }
            }, t, this);
          })), function () {
            return o.apply(this, arguments);
          })
        }, {
          key: "webGPUTextureFromImageBitmapOrCanvas",
          value: function value(t, e) {
            var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
              n = {
                size: {
                  width: e.width,
                  height: e.height,
                  depth: 1
                },
                format: "rgba8unorm",
                usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
              };
            r && (n.mipLevelCount = Math.floor(Math.log2(Math.max(e.width, e.height))) + 1, n.usage |= GPUTextureUsage.RENDER_ATTACHMENT);
            var i = t.createTexture(n);
            return t.queue.copyExternalImageToTexture({
              source: e
            }, {
              texture: i
            }, n.size), r && this.webGPUGenerateMipmap(t, i, n), i;
          }
        }, {
          key: "webGPUGenerateMipmap",
          value: function value(t, e, r) {
            for (var n = t.createShaderModule({
                code: "\n            var<private> pos : array<vec2<f32>, 4> = array<vec2<f32>, 4>(\n              vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, 1.0),\n              vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0));\n      \n            struct vertexOutput {\n              @builtin(position) position : vec4<f32>,\n              @location(0) texCoord : vec2<f32>\n            };\n      \n            @stage(vertex)\n            fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> vertexOutput {\n              var output : vertexOutput;\n              output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);\n              output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);\n              return output;\n            }\n      \n            @group(0) @binding(0) var bindSampler : sampler;\n            @group(0) @binding(1) var bindTexture : texture_2d<f32>;\n      \n            @stage(fragment)\n            fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {\n              return textureSample(bindTexture, bindSampler, texCoord);\n            }\n          "
              }), i = t.createRenderPipeline({
                vertex: {
                  module: n,
                  entryPoint: "vertexMain"
                },
                fragment: {
                  module: n,
                  entryPoint: "fragmentMain",
                  targets: [{
                    format: r.format
                  }]
                },
                primitive: {
                  topology: "triangle-strip",
                  stripIndexFormat: "uint32"
                }
              }), o = t.createSampler({
                minFilter: "linear"
              }), a = e.createView({
                baseMipLevel: 0,
                mipLevelCount: 1
              }), u = t.createCommandEncoder({}), c = 1; c < r.mipLevelCount; ++c) {
              var s = e.createView({
                  baseMipLevel: c,
                  mipLevelCount: 1
                }),
                f = u.beginRenderPass({
                  colorAttachments: [{
                    view: s,
                    loadOp: "clear",
                    storeOp: "store"
                  }]
                }),
                l = t.createBindGroup({
                  layout: i.getBindGroupLayout(0),
                  entries: [{
                    binding: 0,
                    resource: o
                  }, {
                    binding: 1,
                    resource: a
                  }]
                });
              f.setPipeline(i), f.setBindGroup(0, l), f.draw(4), f.end(), a = s;
            }
            t.queue.submit([u.finish()]);
          }
        }, {
          key: "createBuffer",
          value: function value(t, e, r) {
            var n = r.createBuffer({
                mappedAtCreation: !0,
                size: t.byteLength,
                usage: e
              }),
              i = n.getMappedRange();
            return t instanceof Uint16Array ? new Uint16Array(i).set(t) : new Float32Array(i).set(t), n.unmap(), n;
          }
        }, {
          key: "initializeAPI",
          value: (i = P(E().mark(function t() {
            return E().wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, navigator.gpu) {
                      t.next = 3;
                      break;
                    }
                    throw "Your browser does`t support WebGPU or it is not enabled.";
                  case 3:
                    return t.next = 5, navigator.gpu.requestAdapter();
                  case 5:
                    return this.adapter = t.sent, t.next = 8, this.adapter.requestDevice();
                  case 8:
                    this.device = t.sent, this.queue = this.device.queue, t.next = 16;
                    break;
                  case 12:
                    return t.prev = 12, t.t0 = t["catch"](0), console.error(t.t0), t.abrupt("return", !1);
                  case 16:
                    return t.abrupt("return", !0);
                  case 17:
                  case "end":
                    return t.stop();
                }
              }
            }, t, this, [[0, 12]]);
          })), function () {
            return i.apply(this, arguments);
          })
        }, {
          key: "resizeBackings",
          value: function value() {
            if (window.devicePixelRatio, !this.context) {
              this.context = this.canvas.getContext("webgpu");
              var t = this.context.getPreferredFormat(this.adapter);
              this.context.configure({
                device: this.device,
                format: t,
                size: [this.getCanvasWidth(), this.getCanvasHeight(), 1],
                compositingAlphaMode: "opaque",
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
              });
            }
          }
        }, {
          key: "initializeResources",
          value: (n = P(E().mark(function t() {
            return E().wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    this.texturePipeline = this.device.createRenderPipeline({
                      vertex: {
                        module: this.device.createShaderModule({
                          code: b
                        }),
                        entryPoint: "drawTexture",
                        buffers: [{
                          attributes: [{
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x2"
                          }],
                          arrayStride: 8,
                          stepMode: "vertex"
                        }, {
                          attributes: [{
                            shaderLocation: 1,
                            offset: 0,
                            format: "float32x2"
                          }],
                          arrayStride: 8,
                          stepMode: "vertex"
                        }]
                      },
                      fragment: {
                        module: this.device.createShaderModule({
                          code: w
                        }),
                        entryPoint: "drawTexture",
                        targets: [{
                          format: "bgra8unorm"
                        }]
                      },
                      primitive: {
                        topology: "triangle-list"
                      }
                    }), this.linePipeline = this.device.createRenderPipeline({
                      vertex: {
                        module: this.device.createShaderModule({
                          code: b
                        }),
                        entryPoint: "main",
                        buffers: [{
                          attributes: [{
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x3"
                          }],
                          arrayStride: 12,
                          stepMode: "vertex"
                        }, {
                          attributes: [{
                            shaderLocation: 1,
                            offset: 0,
                            format: "float32x4"
                          }],
                          arrayStride: 16,
                          stepMode: "vertex"
                        }]
                      },
                      fragment: {
                        module: this.device.createShaderModule({
                          code: w
                        }),
                        entryPoint: "main",
                        targets: [{
                          format: "bgra8unorm"
                        }]
                      },
                      primitive: {
                        topology: "line-list"
                      }
                    }), this.sampler = this.device.createSampler({
                      magFilter: "linear",
                      minFilter: "linear"
                    }), this.spline = new x(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
                  case 4:
                  case "end":
                    return t.stop();
                }
              }
            }, t, this);
          })), function () {
            return n.apply(this, arguments);
          })
        }, {
          key: "encodeFinish",
          value: function value() {
            this.passEncoder.end(), this.queue.submit([this.commandEncoder.finish()]);
            for (var t = this.GPUbuffers.length - 1; t >= 0; t--) {
              this.GPUbuffers[t].destroy();
            }
          }
        }, {
          key: "encodeCreate",
          value: function value() {
            this.GPUbuffers = [], this.commandEncoder = this.device.createCommandEncoder(), this.passEncoder = this.commandEncoder.beginRenderPass({
              colorAttachments: [{
                view: this.colorTextureView,
                clearValue: {
                  r: 0,
                  g: 0,
                  b: 0,
                  a: 0
                },
                loadOp: "clear",
                storeOp: "store"
              }]
            }), this.passEncoder.setViewport(0, 0, this.getCanvasWidth(), this.getCanvasHeight(), 0, 1), this.passEncoder.setScissorRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
          }
        }], r && O(e.prototype, r), Object.defineProperty(e, "prototype", {
          writable: !1
        }), t;
      }(),
      F = document.getElementById("gfx");
    !function (t) {
      var e = window.devicePixelRatio || 1,
        r = window.innerWidth * e & -2;
      t.width = window.innerWidth * e - r / 6 & -2, t.height = window.innerHeight * e - r / 6 & -2;
    }(F), new M(F).start();
  }();
})();