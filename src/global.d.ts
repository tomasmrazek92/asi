"use strict";
(() => {
    var Ne = Object.create;
    var k = Object.defineProperty;
    var ke = Object.getOwnPropertyDescriptor;
    var Be = Object.getOwnPropertyNames;
    var He = Object.getPrototypeOf,
        De = Object.prototype.hasOwnProperty;
    var Me = (t, e, r) => e in t ? k(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : t[e] = r;
    var Pe = (t, e) => () => (e || t((e = {
        exports: {}
    }).exports, e), e.exports);
    var $e = (t, e, r, n) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let o of Be(e)) !De.call(t, o) && o !== r && k(t, o, {
                get: () => e[o],
                enumerable: !(n = ke(e, o)) || n.enumerable
            });
        return t
    };
    var Ve = (t, e, r) => (r = t != null ? Ne(He(t)) : {}, $e(e || !t || !t.__esModule ? k(r, "default", {
        value: t,
        enumerable: !0
    }) : r, t));
    var d = (t, e, r) => (Me(t, typeof e != "symbol" ? e + "" : e, r), r),
        Ke = (t, e, r) => {
            if (!e.has(t)) throw TypeError("Cannot " + r)
        };
    var z = (t, e, r) => {
        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
        e instanceof WeakSet ? e.add(t) : e.set(t, r)
    };
    var J = (t, e, r) => (Ke(t, e, "access private method"), r);
    var Se = Pe((q, X) => {
        (function(t, e, r) {
            typeof q == "object" ? (X.exports = r(), X.exports.default = r()) : typeof define == "function" && define.amd ? define(r) : e[t] = r()
        })("slugify", q, function() {
            var t = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E'","\u0538":"Y'","\u0539":"T'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C'","\u053F":"K","\u0540":"H","\u0541":"D'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P'","\u0554":"Q'","\u0555":"O''","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"'","\u2019":"'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}`),
                e = JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');

            function r(n, o) {
                if (typeof n != "string") throw new Error("slugify: string argument expected");
                o = typeof o == "string" ? {
                    replacement: o
                } : o || {};
                var s = e[o.locale] || {},
                    i = o.replacement === void 0 ? "-" : o.replacement,
                    c = o.trim === void 0 ? !0 : o.trim,
                    a = n.normalize().split("").reduce(function(p, l) {
                        var u = s[l] || t[l] || l;
                        return u === i && (u = " "), p + u.replace(o.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "")
                    }, "");
                return o.strict && (a = a.replace(/[^A-Za-z0-9\s]/g, "")), c && (a = a.trim()), a = a.replace(/\s+/g, i), o.lower && (a = a.toLowerCase()), a
            }
            return r.extend = function(n) {
                Object.assign(t, n)
            }, r
        })
    });
    var b = "fs-attributes";
    var Z = "cmsattribute";
    var Q = "richtext";
    var B = "support",
        x = "toc";
    var ee = async (...t) => {
        var r;
        let e = [];
        for (let n of t) {
            let o = await ((r = window.fsAttributes[n]) == null ? void 0 : r.loading);
            e.push(o)
        }
        return e
    };
    var I = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(e, r) {
            if (this.alertsActivated && window.alert(e), r === "error") throw new Error(e)
        }
    };
    d(I, "alertsActivated", !1);
    var _ = () => {};

    function H(t, e, r, n) {
        return t ? (t.addEventListener(e, r, n), () => t.removeEventListener(e, r, n)) : _
    }
    var te = t => t instanceof Element;
    var re = t => t instanceof HTMLAnchorElement;
    var D = t => t != null;
    var O = t => typeof t == "string";
    var oe = "w--current";
    var M = (t, e) => (Array.isArray(e) || (e = [e]), e.map(n => t.dispatchEvent(new Event(n, {
        bubbles: !0
    }))).every(n => n));
    var P = (t, e = !0) => t.cloneNode(e);
    var $ = t => {
        let e = t.split("-"),
            r = parseInt(e[e.length - 1]);
        if (!isNaN(r)) return r
    };
    var V = (t, e, r = document) => {
        let n = r.querySelector(t);
        if (n instanceof e) return n
    };
    var ne = t => new Promise(e => setTimeout(e, t));
    var w = class {
        constructor({
            element: e,
            duration: r
        }) {
            d(this, "element");
            d(this, "active", !1);
            d(this, "running", !1);
            d(this, "runningPromise");
            d(this, "duration");
            d(this, "isActive", () => this.active);
            d(this, "isRunning", () => this.running);
            d(this, "untilFinished", () => this.runningPromise);
            var n, o;
            this.element = typeof e == "string" ? V(e, HTMLElement) || I.alert(`No interaction with the ${e} selector was found.`, "error") : e, this.duration = {
                first: typeof r == "number" ? r : (n = r == null ? void 0 : r.first) != null ? n : 0,
                second: typeof r == "number" ? r : (o = r == null ? void 0 : r.second) != null ? o : 0
            }
        }
        async trigger(e) {
            return e === "first" && this.active || e === "second" && !this.active ? !1 : (e || (e = this.active ? "second" : "first"), M(this.element, "click"), this.running = !0, this.runningPromise = ne(this.duration[e]), await this.runningPromise, this.running = !1, this.active = e === "first", !0)
        }
    };
    var K = (t = document) => t.documentElement.getAttribute("data-wf-site");
    var G = async t => {
        var r, n;
        let {
            Webflow: e
        } = window;
        if (!(!e || !("destroy" in e) || !("ready" in e) || !("require" in e)) && !(t && !t.length)) {
            if (t || (e.destroy(), e.ready()), !t || t.includes("ix2")) {
                let o = e.require("ix2");
                if (o) {
                    let {
                        store: s,
                        actions: i
                    } = o, {
                        eventState: c
                    } = s.getState().ixSession, a = Object.entries(c);
                    t || o.destroy(), o.init(), await Promise.all(a.map(p => s.dispatch(i.eventStateChanged(...p))))
                }
            }
            if (!t || t.includes("commerce")) {
                let o = e.require("commerce"),
                    s = K();
                o && s && (o.destroy(), o.init({
                    siteId: s,
                    apiUrl: "https://render.webflow.com"
                }))
            }
            if (t != null && t.includes("lightbox") && ((r = e.require("lightbox")) == null || r.ready()), t != null && t.includes("slider")) {
                let o = e.require("slider");
                o && (o.redraw(), o.ready())
            }
            return t != null && t.includes("tabs") && ((n = e.require("tabs")) == null || n.redraw()), new Promise(o => e.push(() => o(void 0)))
        }
    };

    function se(t, e, r) {
        var o;
        let n = window.fsAttributes[t];
        return n.destroy = r || _, (o = n.resolve) == null || o.call(n, e), e
    }
    var ie = (t, e = "1", r = "iife") => {
        let o = `${t}${r==="esm"?".esm":""}.js`;
        return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${t}@${e}/${o}`
    };
    var Ge = `${b}-${B}`,
        ce = async () => {
            var o;
            let {
                fsAttributes: t,
                location: e
            } = window, {
                host: r,
                searchParams: n
            } = new URL(e.href);
            return !r.includes("webflow.io") || !n.has(Ge) ? !1 : (o = t.import) == null ? void 0 : o.call(t, B, "1")
        };
    var v = t => e => `${t}${e?`-${e}`:""}`,
        C = t => {
            let e = (o, s, i) => {
                let c = t[o],
                    {
                        key: a,
                        values: p
                    } = c,
                    l;
                if (!s) return `[${a}]`;
                let u = p == null ? void 0 : p[s];
                O(u) ? l = u : l = u(i && "instanceIndex" in i ? i.instanceIndex : void 0);
                let m = i && "caseInsensitive" in i && i.caseInsensitive ? "i" : "";
                if (!(i != null && i.operator)) return `[${a}="${l}"${m}]`;
                switch (i.operator) {
                    case "prefixed":
                        return `[${a}^="${l}"${m}]`;
                    case "suffixed":
                        return `[${a}$="${l}"${m}]`;
                    case "contains":
                        return `[${a}*="${l}"${m}]`
                }
            };

            function r(o, s) {
                let i = e("element", o, s),
                    c = (s == null ? void 0 : s.scope) || document;
                return s != null && s.all ? [...c.querySelectorAll(i)] : c.querySelector(i)
            }
            return [e, r, (o, s) => {
                let i = t[s];
                return i ? o.getAttribute(i.key) : null
            }]
        };
    var R = {
            preventLoad: {
                key: `${b}-preventload`
            },
            debugMode: {
                key: `${b}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${b}-dev`
            }
        },
        [F, or] = C(R);
    var ae = t => {
        let {
            currentScript: e
        } = document, r = {};
        if (!e) return {
            attributes: r,
            preventsLoad: !1
        };
        let o = {
            preventsLoad: O(e.getAttribute(R.preventLoad.key)),
            attributes: r
        };
        for (let s in t) {
            let i = e.getAttribute(t[s]);
            o.attributes[s] = i
        }
        return o
    };
    var le = ({
            scriptAttributes: t,
            attributeKey: e,
            version: r,
            init: n
        }) => {
            var c;
            Fe(), (c = window.fsAttributes)[e] || (c[e] = {});
            let {
                preventsLoad: o,
                attributes: s
            } = ae(t), i = window.fsAttributes[e];
            i.version = r, i.init = n, o || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => n(s)))
        },
        Fe = () => {
            let t = Ye();
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
                W(window.fsAttributes, t);
                return
            }
            let e = We(t);
            W(e, t), je(e), window.fsAttributes = e, window.FsAttributes = window.fsAttributes, ce()
        },
        We = t => {
            let e = {
                cms: {},
                push(...r) {
                    var n, o;
                    for (let [s, i] of r)(o = (n = this[s]) == null ? void 0 : n.loading) == null || o.then(i)
                },
                async
                import (r, n) {
                    let o = e[r];
                    return o || new Promise(s => {
                        let i = document.createElement("script");
                        i.src = ie(r, n), i.async = !0, i.onload = () => {
                            let [c] = W(e, [r]);
                            s(c)
                        }, document.head.append(i)
                    })
                },
                destroy() {
                    var r, n;
                    for (let o of t)(n = (r = window.fsAttributes[o]) == null ? void 0 : r.destroy) == null || n.call(r)
                }
            };
            return e
        },
        Ye = () => {
            let t = F("src", "finsweet", {
                    operator: "contains"
                }),
                e = F("dev");
            return [...document.querySelectorAll(`script${t}, script${e}`)].reduce((o, s) => {
                var c;
                let i = s.getAttribute(R.dev.key) || ((c = s.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : c[0]);
                return i && !o.includes(i) && o.push(i), o
            }, [])
        },
        W = (t, e) => e.map(n => {
            let o = t[n];
            return o || (t[n] = {}, o = t[n], o.loading = new Promise(s => {
                o.resolve = i => {
                    s(i), delete o.resolve
                }
            }), o)
        }),
        je = t => {
            let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            t.push(...e)
        };
    var pe = "1.2.4";
    var T = `fs-${x}`,
        Xe = "contents",
        ze = "table",
        Je = "link",
        Ze = "ix-trigger",
        Qe = "offsettop",
        et = "offsetbottom",
        tt = "hideurlhash",
        rt = {
            true: "true"
        },
        A = {
            element: {
                key: `${T}-element`,
                values: {
                    contents: v(Xe),
                    table: v(ze),
                    link: v(Je),
                    ixTrigger: Ze
                }
            },
            scrollMarginTop: {
                key: `${T}-${Qe}`
            },
            scrollMarginBottom: {
                key: `${T}-${et}`
            },
            hideURLHash: {
                key: `${T}-${tt}`,
                values: rt
            },
            linkText: { 
                key: `${T}-link-text` } 
        },
        [S, E] = C(A),
        ue = 2,
        g = `${T}-anchor`,
        me = "[2-6]",
        fe = "h2, h3, h4, h5, h6",
        Y = new RegExp(`^\\[${T}-omit\\]`, "i"),
        j = new RegExp(`^\\[${T}-h${me}\\]`, "i"),
        de = new RegExp(me),
        Ee = /[\u200B-\u200D\uFEFF]/g;
    var Te = (t, e) => {
            if (Object.values(e).some(Boolean)) {
                document.documentElement.style.scrollBehavior = "smooth";
                for (let r of t) r.setScrollOffset(e)
            }
        },
        Ae = () => {
            let {
                hash: t
            } = window.location;
            if (!t) return;
            let e = t.replace("#", ""),
                r = document.querySelector(`${S("element","contents",{operator:"prefixed"})} [id="${e}"]`);
            r && r.scrollIntoView({
                behavior: "smooth"
            })
        };
    var be = (t, e) => {
        let r = t.getAttribute(e);
        return r ? $(r) : void 0
    };
    var xe = t => {
        var n;
        let e = (n = t.match(de)) == null ? void 0 : n[0];
        if (!e) return;
        let r = parseInt(e);
        if (!isNaN(r)) return r
    };
    var he = Ve(Se(), 1);
    var ye = t => {
            let e = document.createElement("div"),
                {
                    id: r,
                    textContent: n
                } = t,
                o = n == null ? void 0 : n.trim().replace(Ee, "");
            if (!(!r && !o)) {
                if (r) t.removeAttribute("id"), e.id = ge(r);
                else if (o) {
                    let s = (0, he.default)(o, {
                        lower: !0,
                        strict: !0
                    });
                    e.id = ge(s)
                }
                return e
            }
        },
        ge = t => {
            let e = t,
                r = 2;
            for (; document.getElementById(e);) e = `${t}-${r}`, r += 1;
            return e
        };
    var Ie = ({
            children: t
        }) => {
            let e = [];
            for (let r = t.length - 1; r >= 0; r--) {
                let n = t[r];
                if (!n) continue;
                let o = n.closest(fe);
                if (!o) continue;
                let {
                    tagName: s,
                    textContent: i
                } = o;
                if (!i) continue;
                if (i.match(Y)) {
                    o.textContent = i.replace(Y, "").trim();
                    continue
                }
                let [a] = i.match(j) || [];
                a && (o.textContent = i.replace(j, "").trim());
                let p = xe(a || s);
                if (!p) continue;
                let l = ye(o);
                if (!l) continue;
                let {
                    id: u
                } = l, [m] = e;
                if (m != null && m.level) {
                    let f = m.level - 1;
                    if (p < f)
                        for (let y = 1; y <= f - p; y++) e.unshift({
                            level: m.level - y
                        })
                }
                o.insertAdjacentElement("beforebegin", l);
                let h = e.find(f => f.level <= p),
                    L = Array.from(t).slice(r + 1);
                for (let f of L) {
                    if (f === (h == null ? void 0 : h.headingWrapper)) break;
                    l.append(f)
                }
                e.unshift({
                    level: p,
                    headingElement: o,
                    headingWrapper: l,
                    id: u
                })
            }
            return e
        },
        _e = t => {
            let e = [],
                r = n => {
                    var u;
                    let o = n.closest("a");
                    if (!o) return;
                    let s = o.parentElement;
                    if (!s) return;
                    let i = (u = e[e.length - 1]) == null ? void 0 : u.level,
                        c = i ? i + 1 : ue;
                    e.push({
                        linkElement: o,
                        level: c,
                        component: s
                    });
                    let p = [...s.querySelectorAll(`* ${S("element","link")}`)].find(m => m !== n);
                    if (!p) return s;
                    let l = r(p);
                    if (l) {
                        let m = new Comment(g);
                        s.insertBefore(m, l), l.remove()
                    }
                    return s
                };
            return r(t), e
        };
    var we = (t, e) => H(t, "click", n => {
        !te(n.target) || !n.target.closest("a") || (n.stopPropagation(), e && window.setTimeout(() => {
            let {
                origin: s,
                pathname: i,
                search: c
            } = window.location;
            history.replaceState("", document.title, s + i + c)
        }))
    });
    var Re = (t, e) => {
        let r = new MutationObserver(n => {
            for (let {
                    target: o
                } of n) {
                if (!re(o)) continue;
                let s = e.find(({
                    linkElement: i
                }) => i === o);
                s && s.updateState()
            }
        });
        return r.observe(t, {
            attributes: !0,
            subtree: !0,
            attributeFilter: ["class"]
        }), r
    };
    var N, Le, U = class {
        constructor({
            level: e,
            component: r,
            linkElement: n,
            linkWrapper: o,
            headingElement: s,
            headingWrapper: i,
            id: c,
            ixTrigger: a,
            referenceNode: p,
            anchor: l
        }) {
            z(this, N);
            this.level = e, this.linkWrapper = o, this.referenceNode = p, this.anchor = l, this.component = r, this.linkElement = n, this.headingElement = s, this.headingWrapper = i, this.id = c, this.ixTrigger = a, this.interaction = a ? new w({
                element: a
            }) : void 0, J(this, N, Le).call(this)
        }
        setScrollOffset(e) {
            let {
                headingWrapper: r
            } = this;
            r && Object.assign(r.style, e)
        }
        updateState() {
            let {
                linkElement: e,
                interaction: r,
                currentState: n
            } = this, o = e.classList.contains(oe);
            o !== n && (r == null || r.trigger(o ? "first" : "second"), this.currentState = o)
        }
    };
    N = new WeakSet, Le = function() {
  let {headingElement:e, id:r, referenceNode:n, linkElement:o, linkWrapper:s, component:i, anchor:c} = this;
  if (e && r) {
    // Get custom link text if specified
    const customText = e.getAttribute(A.linkText.key);
    n.textContent = customText || e.textContent;
    o.href = `#${r}`;
  } else {
    o.remove();
  }
  s.insertBefore(i,c)
};
    var Oe = (t, e, r) => {
        let n = [],
            o = [];
        for (let s of t) {
            let i = e.find(f => f.level === s.level);
            if (!i) continue;
            for (let f = o.length - 1; f >= 0 && !(s.level > o[f].level); f--) o.pop();
            let c = o[o.length - 1],
                a = (c == null ? void 0 : c.component) || r,
                p = P(i.component),
                l = E("link", {
                    scope: p,
                    operator: "prefixed"
                });
            if (!l) continue;
            let u = l.closest("a");
            if (!u) continue;
            let m = [...a.childNodes].find(({
                nodeType: f,
                nodeValue: y
            }) => f === 8 && y === g);
            if (!m) continue;
            let h = p.querySelector(`:scope > ${S("element","ixTrigger",{operator:"prefixed"})}`),
                L = new U({
                    linkWrapper: a,
                    component: p,
                    referenceNode: l,
                    linkElement: u,
                    ixTrigger: h,
                    anchor: m,
                    ...s
                });
            (!c || s.level > c.level) && o.push(L), n.push(L)
        }
        return n
    };
    var ve = ([{
        component: t
    }], e) => {
        let r = E("table", {
            instanceIndex: e
        }) || t.parentElement;
        if (!r) return;
        let n = new Comment(g);
        return t.parentElement === r ? r.insertBefore(n, t) : r.append(n), t.remove(), r
    };
    var Ce = t => {
        let e = be(t, A.element.key),
            r = E("link", {
                instanceIndex: e
            });
        if (!r) return;
        let n = Ie(t),
            o = _e(r) || [];
        if (!n.length || !o.length) return;
        let s = ve(o, e);
        if (!s) return;
        let i = Oe(n, o, s),
            c = t.getAttribute(A.scrollMarginTop.key) || void 0,
            a = t.getAttribute(A.scrollMarginBottom.key) || void 0;
        Te(i, {
            scrollMarginTop: c,
            scrollMarginBottom: a
        });
        let p = t.getAttribute(A.hideURLHash.key) === A.hideURLHash.values.true,
            l = we(s, p),
            u = Re(s, i);
        return () => {
            l(), u.disconnect()
        }
    };
    var Ue = async () => {
        await ee(Z, Q);
        let e = E("contents", {
            operator: "prefixed",
            all: !0
        }).map(Ce).filter(D);
        return Ae(), e.length && await G(), se(x, void 0, () => {
            for (let r of e) r()
        })
    };
    le({
        init: Ue,
        version: pe,
        attributeKey: x
    });
})();