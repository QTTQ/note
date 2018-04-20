global.webpackJsonp([3],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_fly__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_type_block__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_icon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_slider_nav__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_avatar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_mpvue_wxparse__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_minapp_api_promise__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_minapp_api_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_minapp_api_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_simple_article__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash__);



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











var navList = [{
    title: '最近回复',
    type: 'reply'
}, {
    title: '最新发布',
    type: 'topic'
}, {
    title: '话题收藏',
    type: 'collect'
}];
/* harmony default export */ __webpack_exports__["a"] = ({
    name: "article",
    data: function data() {
        return {
            articleList: [],
            height: 220,
            winHeight: null,
            navList: navList,
            article: null,
            user: null,
            author: null,
            currentTab: 0,
            userId: null
        };
    },

    methods: {
        toUp: function toUp() {
            this.height = 220;
        },
        scrollFn: function scrollFn(e) {
            // if (this.height = 0) return
            var top = e.mp.detail.scrollTop;
            console.log(top);
            if (top > 60) {
                this.height = 0;
            }
        },
        swiperChange: function swiperChange(e) {
            var current = e.target.current;

            this.currentTab = current;
        },

        // 获取用户信息
        getUserInfo: function getUserInfo(id) {
            var _this = this;

            return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var res, create_at;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                res = void 0;
                                _context.prev = 1;
                                _context.next = 4;
                                return __WEBPACK_IMPORTED_MODULE_3__utils_fly__["a" /* default */].get('user/' + id);

                            case 4:
                                res = _context.sent;
                                _context.next = 10;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](1);

                                console.log(_context.t0);

                            case 10:
                                if (res.success) {
                                    //处理注册时间
                                    create_at = res.data.create_at;

                                    create_at = _this.fromNow(create_at);
                                    _this.user = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(res.data, {
                                        create_at: create_at
                                    });
                                }
                                _this.articleList = _this.user.recent_replies;
                                _this.author = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_lodash__["pick"])(_this.user, ['loginname', 'avatar_url']);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[1, 7]]);
            }))();
        },

        // 获取用户收藏的主题
        getUserCollect: function getUserCollect() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                _context2.prev = 1;
                                _context2.next = 4;
                                return __WEBPACK_IMPORTED_MODULE_3__utils_fly__["a" /* default */].get('/topic_collect/' + _this2.userId);

                            case 4:
                                res = _context2.sent;

                                if (res.success && res.data && res.data.length) {
                                    _this2.articleList = res.data.map(function (item) {
                                        item.author = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_lodash__["pick"])(_this2.user, ['loginname', 'avatar_url']);
                                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_lodash__["pick"])(item, ['title', 'id', 'last_reply_at', 'author']);
                                    });
                                }
                                _context2.next = 10;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);

                            case 10:
                                wx.hideLoading();

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2, [[1, 8]]);
            }))();
        }
    },
    watch: {
        currentTab: function currentTab(newVal, oldVal) {
            switch (newVal) {
                case 0:
                    this.articleList = this.user.recent_replies;
                    break;
                case 1:
                    this.articleList = this.user.recent_topics;
                    break;
                default:
                    this.getUserCollect();
            }
        }
    },
    computed: {
        contentHeight: function contentHeight() {
            if (this.winHeight) {
                return this.winHeight - 44 - this.height + 'px';
            }
        }
    },
    components: {
        typeBlock: __WEBPACK_IMPORTED_MODULE_4__components_type_block__["a" /* default */],
        icon: __WEBPACK_IMPORTED_MODULE_5__components_icon__["a" /* default */],
        wxParse: __WEBPACK_IMPORTED_MODULE_8_mpvue_wxparse__["a" /* default */],
        avatar: __WEBPACK_IMPORTED_MODULE_7__components_avatar__["a" /* default */],
        sliderNav: __WEBPACK_IMPORTED_MODULE_6__components_slider_nav__["a" /* default */],
        simpleArticle: __WEBPACK_IMPORTED_MODULE_10__components_simple_article__["a" /* default */]
    },
    onLoad: function onLoad() {
        var _this3 = this;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
            var info;
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return __WEBPACK_IMPORTED_MODULE_9_minapp_api_promise___default.a.getSystemInfo();

                        case 2:
                            info = _context3.sent;

                            _this3.winHeight = info.windowHeight;
                            _this3.userId = _this3.$root.$mp.query.id;
                            wx.showLoading({
                                title: '加载中'
                            });
                            _this3.height = 220;
                            _this3.currentTab = 0;
                            _this3.getUserInfo(_this3.userId);
                            wx.hideLoading();

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    }
});

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_simple_article_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_37fc77f7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_simple_article_vue__ = __webpack_require__(155);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-37fc77f7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_simple_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_37fc77f7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_simple_article_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\simple-article.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] simple-article.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37fc77f7", Component.options)
  } else {
    hotAPI.reload("data-v-37fc77f7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-wrap"
  }, [_c('div', {
    staticClass: "user-head-wrap",
    style: ('height:' + _vm.height + 'px')
  }, [_c('div', {
    staticClass: "avatar"
  }, [(_vm.author) ? _c('avatar', {
    attrs: {
      "user": _vm.author,
      "size": 90,
      "mpcomid": '0'
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.user) ? _c('div', {
    staticClass: "name-wrap"
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v("\n                " + _vm._s(_vm.user.loginname) + "\n            ")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("\n                " + _vm._s(_vm.user.githubUsername) + "@github.com\n            ")])]) : _vm._e(), _vm._v(" "), (_vm.user) ? _c('div', {
    staticClass: "info"
  }, [_vm._v("\n            注册时间：" + _vm._s(_vm.user.create_at) + "\n            "), _c('span', [_vm._v("积分：" + _vm._s(_vm.user.score))])]) : _vm._e()]), _vm._v(" "), _c('slider-nav', {
    attrs: {
      "navList": _vm.navList,
      "currentTab": _vm.currentTab,
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "update:currentTab": function($event) {
        _vm.currentTab = $event
      }
    }
  }), _vm._v(" "), _c('swiper', {
    staticClass: "swiper-box",
    style: ('height:' + _vm.contentHeight),
    attrs: {
      "current": _vm.currentTab,
      "duration": "300",
      "eventid": '2'
    },
    on: {
      "change": _vm.swiperChange
    }
  }, _vm._l((_vm.navList), function(item, index) {
    return _c('swiper-item', {
      key: index,
      attrs: {
        "mpcomid": '3-' + index
      }
    }, [(_vm.articleList.length) ? _c('scroll-view', {
      staticStyle: {
        "height": "100%"
      },
      attrs: {
        "scroll-y": "",
        "eventid": '1-' + index
      },
      on: {
        "scroll": _vm.scrollFn,
        "scrolltoupper": _vm.toUp
      }
    }, _vm._l((_vm.articleList), function(item, i) {
      return _c('simple-article', {
        key: i,
        attrs: {
          "article": item,
          "mpcomid": '2-' + index + '-' + i
        }
      })
    })) : _c('p', {
      staticStyle: {
        "text-align": "center"
      }
    }, [_vm._v("暂无数据")])], 1)
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-18d9b0c7", esExports)
  }
}

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "feed-content",
    attrs: {
      "eventid": '0'
    },
    on: {
      "tap": _vm.goArticle
    }
  }, [(_vm.article) ? _c('avatar', {
    attrs: {
      "user": _vm.article.author,
      "mpcomid": '0'
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "feed-right"
  }, [_c('div', {
    staticClass: "feed-right-top"
  }, [_c('div', {
    staticClass: "feed-title"
  }, [_c('p', [_vm._v(_vm._s(_vm.article.title))])], 1)]), _vm._v(" "), (_vm.article) ? _c('div', {
    staticClass: "feed-right-bottom"
  }, [_c('div', {
    staticClass: "feed-time"
  }, [_c('span', [_vm._v(_vm._s(_vm.article.author.loginname))])]), _vm._v(" "), _c('div', {
    staticClass: "feed-pass"
  }, [_vm._v("\n                1个月前\n            ")])]) : _vm._e()])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-37fc77f7", esExports)
  }
}

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_user_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_18d9b0c7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_user_vue__ = __webpack_require__(150);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(106)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-18d9b0c7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_user_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_18d9b0c7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_user_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\user\\user.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18d9b0c7", Component.options)
  } else {
    hotAPI.reload("data-v-18d9b0c7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(65);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_avatar__ = __webpack_require__(12);
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
    props: ['article'],
    components: {
        avatar: __WEBPACK_IMPORTED_MODULE_0__components_avatar__["a" /* default */]
    },
    methods: {
        goArticle: function goArticle() {
            wx.navigateTo({
                url: '/pages/article/main?id=' + this.article.id
            });
        }
    }
});

/***/ })

},[70]);
//# sourceMappingURL=main.js.map