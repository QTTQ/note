global.webpackJsonp([2],{

/***/ 125:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromNow", function() { return fromNow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js_basic__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/*
 * @Author: jaxQin
 * @Date:   2018-03-29 11:03:43
 * @Last Modified by:   jaxQin
 * @Last Modified time: 2018-03-29 15:20:55
 */






var listMap = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.keyBy(__WEBPACK_IMPORTED_MODULE_0__common_js_basic__["b" /* navList */], 'type');

// 格式化时间
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return format;
};
var getTimeInfo = function getTimeInfo(str) {
    if (!str) {
        return '';
    }
    var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if (time / 60000 < 60) {
        return parseInt(time / 60000) + '分钟前';
    } else if (time / 3600000 < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if (time / 86400000 < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if (time / 2592000000 < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
};
var filters = {
    install: function install(Vue, val) {
        Vue.prototype.getTopicType = function () {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'share';
            //全局函数1
            return listMap[val].title;
        };
    }
};
var formatTime = {
    install: function install(Vue, val) {
        Vue.prototype.formatTime = function (val) {
            //全局函数1
            val = new Date(val);
            return val.format('yyyy-MM-dd hh:mm:ss');
        };
    }
};
var fromNow = {
    install: function install(Vue, val) {
        Vue.prototype.fromNow = function (val) {
            //全局函数1
            return getTimeInfo(val);
        };
    }
};



/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon_vue__ = __webpack_require__(21);
/*
 * @Author: jaxQin
 * @Date:   2018-03-29 22:19:21
 * @Last Modified by:   jaxQin
 * @Last Modified time: 2018-03-29 22:20:13
 */




/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
  Vue.component("icon", __WEBPACK_IMPORTED_MODULE_0__icon_vue__["a" /* default */]);
});

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex_persistedstate__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__action__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getters__ = __webpack_require__(72);









__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["e" /* default */]);

var state = {
  indexData: 0,
  indexData1: {}
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["e" /* default */].Store({
  state: state,
  getters: __WEBPACK_IMPORTED_MODULE_5__getters__["a" /* default */],
  actions: __WEBPACK_IMPORTED_MODULE_4__action__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_3__mutations__["a" /* default */],
  plugins: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex_persistedstate__["a" /* default */])({
    storage: {
      getItem: function getItem(key) {
        return wx.getStorageSync(key);
      },
      setItem: function setItem(key, value) {
        return wx.setStorageSync(key, value);
      },
      removeItem: function removeItem(key) {
        return wx.clearStorage();
      }
    }
  })]
}));

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(89);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75284dc4", Component.options)
  } else {
    hotAPI.reload("data-v-75284dc4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_icons_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_js_filters__ = __webpack_require__(58);





// 字体组件

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4__components_icons_js__["a" /* default */]);

// 导入过滤器


__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(__WEBPACK_IMPORTED_MODULE_5__common_js_filters__).forEach(function (key) {
    __WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5__common_js_filters__[key]);
});
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5__common_js_filters__);

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */].mpType = 'app';

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */];
var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a(__WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['^pages/index/main', 'pages/article/main', 'pages/user/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '心语',
            navigationBarTextStyle: 'black'
        }
    }
});

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutation_types_js__ = __webpack_require__(29);



var getData = function getData() {
    return Math.random() + 10;
};
var getOtherData = function getOtherData(e) {
    return e;
};
/* harmony default export */ __webpack_exports__["a"] = ({
    indexAction: function indexAction(_ref) {
        var _this = this;

        var commit = _ref.commit;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.t0 = commit;
                            _context.t1 = __WEBPACK_IMPORTED_MODULE_2__mutation_types_js__["a" /* INDEX */];
                            _context.next = 4;
                            return getData();

                        case 4:
                            _context.t2 = _context.sent;
                            (0, _context.t0)(_context.t1, _context.t2);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    indexAction1: function indexAction1(_ref2, e) {
        var _this2 = this;

        var dispatch = _ref2.dispatch,
            commit = _ref2.commit;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return dispatch('indexAction');

                        case 2:
                            _context2.t0 = commit;
                            _context2.t1 = __WEBPACK_IMPORTED_MODULE_2__mutation_types_js__["b" /* INDEX1 */];
                            _context2.next = 6;
                            return getOtherData(e);

                        case 6:
                            _context2.t2 = _context2.sent;
                            (0, _context2.t0)(_context2.t1, _context2.t2);

                        case 8:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
});

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  count: function count(state) {
    return state.indexData;
  },
  getOdd: function getOdd(state) {
    return state.indexData % 2 == 0 ? '偶数' : '奇数';
  }

  // const getters = {
  // 	count(state) {
  // 		return state.count;
  // 	},
  // 	getOdd(state) {
  // 		return state.count % 2 == 0 ? '偶数' : '奇数';
  // 	}
  // };
  // export default{
  // 	getters
  // }

});

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutation_types_js__ = __webpack_require__(29);


var _INDEX$INDEX;



/* harmony default export */ __webpack_exports__["a"] = (_INDEX$INDEX = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_INDEX$INDEX, __WEBPACK_IMPORTED_MODULE_1__mutation_types_js__["a" /* INDEX */], function (state, v) {
  console.log(v, 'V');
  state.indexData = v;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_INDEX$INDEX, __WEBPACK_IMPORTED_MODULE_1__mutation_types_js__["b" /* INDEX1 */], function (state, v) {
  state.indexData1 = v;
  console.log(state.indexData1, 'state.indexData1');
}), _INDEX$INDEX);

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
  }
});

/***/ })

},[66]);
//# sourceMappingURL=app.js.map