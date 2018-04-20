global.webpackJsonp([1],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_fly__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_minapp_api_promise__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_minapp_api_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_minapp_api_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_content__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_content1__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_slider_nav__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_slider_list1__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_js_basic__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vuex__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__store_mutation_types__ = __webpack_require__(29);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["a"] = ({
  name: "index",
  data: function data() {
    return {
      navList: __WEBPACK_IMPORTED_MODULE_9__common_js_basic__["b" /* navList */],
      winWidth: 0,
      winHeight: 0,
      // tab切换
      currentTab: 0
    };
  },

  methods: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({
    swiperChange: function swiperChange(e) {
      var current = e.target.current;

      this.currentTab = current;
    }
  }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_vuex__["a" /* mapActions */])(["indexAction", // 将 `this.[INDEX]()` 映射为 `this.$store.dispatch(INDEX)
  "indexAction1"
  //   'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
  // // `mapActions` 也支持载荷：
  // 'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
  ]), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_vuex__["b" /* mapMutations */])([__WEBPACK_IMPORTED_MODULE_11__store_mutation_types__["a" /* INDEX */], __WEBPACK_IMPORTED_MODULE_11__store_mutation_types__["b" /* INDEX1 */]]), {
    // 发送事件  this.$store.commit(INDEX,data)
    //调用mutation发送事件
    handleClickmapMutations: function handleClickmapMutations() {
      this[__WEBPACK_IMPORTED_MODULE_11__store_mutation_types__["a" /* INDEX */]](Math.random()); // 调用mutation
    }
  }),
  computed: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_vuex__["c" /* mapState */])(["indexData", "indexData1"]), {
    contentHeight: function contentHeight() {
      return this.winHeight - 62 + "px";
    }
  }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_vuex__["d" /* mapGetters */])(["count", "getOdd"])),

  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_7__components_slider_nav__["a" /* default */],
    contentV: __WEBPACK_IMPORTED_MODULE_5__components_content__["a" /* default */],
    sliderNav1: __WEBPACK_IMPORTED_MODULE_8__components_slider_list1__["a" /* default */],
    contentV1: __WEBPACK_IMPORTED_MODULE_6__components_content1__["a" /* default */]
  },
  onLoad: function onLoad() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      var info;
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return __WEBPACK_IMPORTED_MODULE_4_minapp_api_promise___default.a.getSystemInfo();

            case 2:
              info = _context.sent;

              _this.winWidth = info.windowWidth;
              _this.winHeight = info.windowHeight;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_content_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_20ce840d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_content_vue__ = __webpack_require__(151);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(107)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20ce840d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_content_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_20ce840d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_content_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20ce840d", Component.options)
  } else {
    hotAPI.reload("data-v-20ce840d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_content1_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_0de8e118_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_content1_vue__ = __webpack_require__(148);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0de8e118"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_content1_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_0de8e118_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_content1_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\content1.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content1.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0de8e118", Component.options)
  } else {
    hotAPI.reload("data-v-0de8e118", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_slider_list1_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_27c6b683_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_slider_list1_vue__ = __webpack_require__(152);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(108)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-27c6b683"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_slider_list1_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_27c6b683_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_slider_list1_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\slider-list1.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] slider-list1.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27c6b683", Component.options)
  } else {
    hotAPI.reload("data-v-27c6b683", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content"
  }, [_c('scroll-view', {
    staticStyle: {
      "height": "100%"
    },
    attrs: {
      "scroll-y": "",
      "eventid": '0'
    },
    on: {
      "scroll": _vm.scrollFn,
      "scrolltolower": _vm.tolow,
      "scrolltoupper": _vm.test
    }
  }, [_c('div', {
    staticClass: "feed-title"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('a', {
      key: index,
      staticClass: "feed-li",
      attrs: {
        "href": '/pages/article1/main?id=' + item.id
      }
    }, [_c('div', {
      staticClass: "feed-title"
    }, [_c('type-block', {
      attrs: {
        "item": item,
        "mpcomid": '0-' + index
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.title))])], 1), _vm._v(" "), _c('div', {
      staticClass: "feed-content"
    }, [_c('avatar', {
      attrs: {
        "user": item.aythor,
        "mpcomid": '1-' + index
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "feed-right"
    }, [_c('div', {
      staticClass: "feed-right-top"
    }, [_c('div', {
      staticClass: "avatar-name"
    }, [_vm._v(_vm._s(item.author.loginname))]), _vm._v(" "), _c('div', {
      staticClass: "count"
    }, [_c('span', [_vm._v(_vm._s(item.last_reply_count))])])]), _vm._v(" "), _c('div', {
      staticClass: "feed-right-bottom"
    }, [_c('div', {
      staticClass: "feed-time"
    }, [_vm._v(_vm._s(item.createTime))]), _vm._v(" "), _c('div', {
      staticClass: "feed-pass"
    }, [_vm._v(_vm._s(item.lassReplyTime))])])])], 1)])
  }))])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0de8e118", esExports)
  }
}

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content"
  }, [_c('scroll-view', {
    staticStyle: {
      "height": "100%"
    },
    attrs: {
      "scroll-y": "",
      "eventid": '0'
    },
    on: {
      "scroll": _vm.scrollFn,
      "scrolltolower": _vm.toLow,
      "scrolltoupper": _vm.test
    }
  }, _vm._l((_vm.list), function(item, index) {
    return _c('a', {
      key: index,
      staticClass: "feed-li",
      attrs: {
        "href": '/pages/article/main?id=' + item.id
      }
    }, [_c('div', {
      staticClass: "feed-title"
    }, [_c('type-block', {
      attrs: {
        "item": item,
        "mpcomid": '0-' + index
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.title))])], 1), _vm._v(" "), _c('div', {
      staticClass: "feed-content"
    }, [_c('avatar', {
      attrs: {
        "user": item.author,
        "mpcomid": '1-' + index
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "feed-right"
    }, [_c('div', {
      staticClass: "feed-right-top"
    }, [_c('div', {
      staticClass: "avatar-name"
    }, [_vm._v("\n                            " + _vm._s(item.author.loginname) + "\n                        ")]), _vm._v(" "), _c('div', {
      staticClass: "count"
    }, [_c('span', [_vm._v(_vm._s(item.reply_count))]), _vm._v(" / " + _vm._s(item.visit_count) + "\n                        ")])]), _vm._v(" "), _c('div', {
      staticClass: "feed-right-bottom"
    }, [_c('div', {
      staticClass: "feed-time"
    }, [_vm._v("\n                            " + _vm._s(item.createTime) + "\n                        ")]), _vm._v(" "), _c('div', {
      staticClass: "feed-pass"
    }, [_vm._v("\n                            " + _vm._s(item.lastReplyTime) + "\n                        ")])])])], 1)])
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-20ce840d", esExports)
  }
}

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroll-view', {
    staticClass: "swiper-tab",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "scroll-x": ""
    }
  }, [_vm._l((_vm.navList), function(item, index) {
    return _c('view', {
      key: index,
      staticClass: "swiper-tab-item",
      style: (_vm.menuStyle),
      attrs: {
        "data-current": index,
        "eventid": '0-' + index
      },
      on: {
        "tap": _vm.swichNav
      }
    }, [_vm._v(_vm._s(item.title))])
  }), _vm._v(" "), _c('view', {
    staticClass: "block",
    style: (_vm.blockStyle)
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-27c6b683", esExports)
  }
}

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('slider-nav1', {
    attrs: {
      "menuWidth": 60,
      "currentTab": _vm.currentTab,
      "navList": this.navList,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "update:currentTab": function($event) {
        _vm.currentTab = $event
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "border-box",
    attrs: {
      "eventid": '1'
    },
    on: {
      "tap": _vm.handleClickmapMutations
    }
  }, [_vm._v("mapMutations结果：" + _vm._s(_vm.indexData))]), _vm._v(" "), _c('div', {
    staticClass: "border-box",
    attrs: {
      "eventid": '2'
    },
    on: {
      "tap": _vm.indexAction
    }
  }, [_vm._v("mapActions结果：" + _vm._s(_vm.indexData))]), _vm._v(" "), _c('div', {
    staticClass: "border-box",
    attrs: {
      "eventid": '3'
    },
    on: {
      "tap": function($event) {
        _vm.indexAction1({
          n: '000'
        })
      }
    }
  }, [_vm._v("mapActions异步结果：" + _vm._s(_vm.indexData1.n))]), _vm._v(" "), _c('div', {
    staticClass: "border-box"
  }, [_vm._v("mapGetters结果：" + _vm._s(_vm.count)), _c('br'), _vm._v("mapGetters筛选结果：" + _vm._s(_vm.getOdd))], 1), _vm._v(" "), _c('swiper', {
    staticClass: "swiper-box",
    style: ('height:' + _vm.contentHeight),
    attrs: {
      "current": _vm.currentTab,
      "duration": "300",
      "eventid": '4'
    },
    on: {
      "change": _vm.swiperChange
    }
  }, _vm._l((_vm.navList), function(item, index) {
    return _c('swiper-item', {
      key: index,
      attrs: {
        "mpcomid": '2-' + index
      }
    }, [(index == _vm.currentTab) ? _c('content-v1', {
      attrs: {
        "currentTab": item,
        "mpcomid": '1-' + index
      }
    }) : _vm._e()], 1)
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-55aa0f8d", esExports)
  }
}

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_55aa0f8d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(167);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(123)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-55aa0f8d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_55aa0f8d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55aa0f8d", Component.options)
  } else {
    hotAPI.reload("data-v-55aa0f8d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(64);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_fly__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_type_block__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_avatar__ = __webpack_require__(12);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: "",
  data: function data() {
    return {
      articleList: [],
      page: 1
    };
  },

  props: ["currentTab"],
  methods: {
    test: function test() {
      console.log("test");
    },
    getList: function getList() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wx.showLoading({
                  title: "加载中"
                });
                _context.next = 3;
                return __WEBPACK_IMPORTED_MODULE_3__utils_fly__["a" /* default */].get("topics", {
                  tab: _this.currentTab.type,
                  page: page,
                  limit: 20
                });

              case 3:
                res = _context.sent;

                if (res.success) {
                  _this.articleList = _this.articleList.concat(res.data);
                }
                wx.hideLoading();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    goArticle: function goArticle(item) {
      wx.navigateTo({
        url: "/pages/article/main?id=" + item.id
      });
    },
    scrollFn: function scrollFn(e) {
      // console.log(e)
    },
    getA: function getA() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", "a");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    toLow: function toLow(e) {
      // 这里就是滚动到底部了
      this.page++;
      this.getList(this.page);
    }
  },
  computed: {
    list: function list() {
      var _this3 = this;

      return this.articleList.map(function (item) {
        delete item.content;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(item, {
          createTime: _this3.formatTime(item.create_at),
          lastReplyTime: _this3.fromNow(item.last_reply_at)
        });
      });
    }
  },
  components: {
    typeBlock: __WEBPACK_IMPORTED_MODULE_4__components_type_block__["a" /* default */],
    avatar: __WEBPACK_IMPORTED_MODULE_5__components_avatar__["a" /* default */]
  },
  created: function created() {
    var _this4 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this4.getList();

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this4);
    }))();
  }
});

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_fly__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_type_block__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_avatar__ = __webpack_require__(12);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: "content1",
  data: function data() {
    return {
      articleList: [],
      page: 1
    };
  },

  props: ["currentTab"],
  methods: {
    scrollFn: function scrollFn(e) {
      console.log(e, "scrollFn");
    },
    tolow: function tolow(e) {
      this.page++;
      this.getList(this.page);
      console.log(e, "tolow");
    },
    test: function test(e) {
      console.log(e, "test");
    },
    getList: function getList() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wx.showLoading({ title: "加载中。。。" });
                _context.next = 3;
                return __WEBPACK_IMPORTED_MODULE_3__utils_fly__["a" /* default */].get("topics", {
                  tab: _this.currentTab.type,
                  page: page,
                  limit: 20
                });

              case 3:
                res = _context.sent;

                if (res.success) {
                  _this.articleList = _this.articleList.concat(res.data);
                }
                wx.hideLoading();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  },
  computed: {
    list: function list() {
      var _this2 = this;

      return this.articleList.map(function (item) {
        delete item.content;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(item, {
          createTime: _this2.formatTime(item.c),
          lastReplyTime: _this2.fromNow(item.last_reply_at)
        });
      });
    }
  },
  components: {
    typeBlock: __WEBPACK_IMPORTED_MODULE_4__components_type_block__["a" /* default */]
  },
  created: function created() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this3.getList();

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this3);
    }))();
  }
});

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_js_basic__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_minapp_api_promise__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_minapp_api_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_minapp_api_promise__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "slider-nav",
  data: function data() {
    return {
      winWidth: null,
      winHeight: null,
      navWidth: null
    };
  },

  props: {
    navList: {
      type: Array
    },
    menuWidth: {
      type: Number
    },
    currentTab: {
      type: Number,
      default: 0
    },
    font: {
      type: Number,
      default: 14
    }
  },
  computed: {
    blockStyle: function blockStyle() {
      // let leftWidth=(this.winWidth-this.navList.length*this.navWidth)/2
      var leftWidth = (this.winWidth - this.navList.length * this.navWidth) / 2;
      var width = this.navWidth + "px";
      var left = leftWidth + this.navWidth * this.currentTab + "px";
      var style = {
        left: left,
        width: width
      };
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_js_basic__["a" /* obj2style */])(style);
    },
    menuStyle: function menuStyle() {
      var style = {};
      style["font-size"] = this.font + "px";
      style["width"] = this.navWidth + "px";
      console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_js_basic__["a" /* obj2style */])(style));
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_js_basic__["a" /* obj2style */])(style);
    }
  },
  methods: {
    swichNav: function swichNav(e) {
      var current = e.target.dataset.current;

      if (this.currentTab === current) {
        return false;
      } else {
        this.$emit("update:currentTab", current);
      }
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      var info;
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return __WEBPACK_IMPORTED_MODULE_3_minapp_api_promise___default.a.getSystemInfo();

            case 2:
              info = _context.sent;

              _this.winWidth = info.windowWidth;
              _this.winHeight = info.windowHeight;
              if (!_this.menuWidth) {
                _this.navWidth = _this.windowWidth / _this.navList.length;
              } else {
                _this.navWidth = _this.menuWidth;
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});

/***/ })

},[69]);
//# sourceMappingURL=main.js.map