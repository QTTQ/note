global.webpackJsonp([4],{

/***/ 128:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.article) ? _c('div', {
    staticClass: "article-wrap"
  }, [_c('div', {
    staticClass: "head-box"
  }, [_c('h2', {
    staticClass: "head-title"
  }, [_vm._v("\n            " + _vm._s(_vm.article.title) + "\n            ")]), _vm._v(" "), _c('div', {
    staticClass: "head-intro"
  }, [_c('avatar', {
    attrs: {
      "user": _vm.article.author,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "head-middle"
  }, [_c('div', {
    staticClass: "head-middle-top"
  }, [(_vm.article) ? _c('type-block', {
    attrs: {
      "item": _vm.article,
      "mpcomid": '1'
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "head-author-name"
  }, [_vm._v("jingsam")])], 1), _vm._v(" "), _c('div', {
    staticClass: "head-middle-bottom"
  }, [_vm._v("\n                        " + _vm._s(_vm.article.createTime) + " ·\n                        "), _c('span', [_vm._v(_vm._s(_vm.article.visit_count))]), _vm._v("次预览\n                        "), _c('div', {
    staticClass: "icon-eye-open"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "head-right"
  }, [_c('icon', {
    attrs: {
      "type": "heart",
      "size": 32
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "content-box"
  }, [(_vm.article) ? _c('wxParse', {
    attrs: {
      "content": _vm.article.content,
      "mpcomid": '2'
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "comment-box"
  }, [_c('div', {
    staticClass: "comment-count"
  }, [_vm._v("\n                " + _vm._s(_vm.article.reply_count) + " 条回复\n            ")]), _vm._v(" "), _vm._l((_vm.article.replies), function(reply, index) {
    return _c('div', {
      key: index,
      staticClass: "comment-item"
    }, [_c('div', {
      staticClass: "comment-head"
    }, [_c('avatar', {
      attrs: {
        "user": reply.author,
        "mpcomid": '3-' + index
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "comment-middle"
    }, [_c('div', {
      staticClass: "comment-middle-top"
    }, [_vm._v("\n                            " + _vm._s(reply.author.loginname) + "\n                        ")]), _vm._v(" "), _c('div', {
      staticClass: "comment-middle-bottom"
    }, [_c('span', [_vm._v(_vm._s(index + 1))]), _vm._v(" 楼· " + _vm._s(reply.createTime) + "\n                        ")])]), _vm._v(" "), _c('div', {
      staticClass: "comment-right"
    }, [_c('icon', {
      attrs: {
        "type": "heart"
      }
    })], 1)], 1), _vm._v(" "), _c('div', {
      staticClass: "comment-content"
    }, [_c('wxParse', {
      attrs: {
        "content": reply.content,
        "mpcomid": '4-' + index
      }
    })], 1)])
  })], 2)]) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bb7c69d6", esExports)
  }
}

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_article_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_bb7c69d6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_article_vue__ = __webpack_require__(171);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(128)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bb7c69d6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_script_index_0_article_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_template_compiler_index_id_data_v_bb7c69d6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_11_mpvue_loader_lib_selector_type_template_index_0_article_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\article\\article.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] article.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb7c69d6", Component.options)
  } else {
    hotAPI.reload("data-v-bb7c69d6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article__ = __webpack_require__(63);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__article__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 99:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_avatar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mpvue_wxparse__ = __webpack_require__(30);



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
    name: "article",
    data: function data() {
        return {
            article: null,
            test: '<span>sss</span>'
        };
    },

    components: {
        typeBlock: __WEBPACK_IMPORTED_MODULE_4__components_type_block__["a" /* default */],
        icon: __WEBPACK_IMPORTED_MODULE_5__components_icon__["a" /* default */],
        wxParse: __WEBPACK_IMPORTED_MODULE_7_mpvue_wxparse__["a" /* default */],
        avatar: __WEBPACK_IMPORTED_MODULE_6__components_avatar__["a" /* default */]
    },
    onLoad: function onLoad() {
        var _this = this;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var id, res;
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            id = _this.$root.$mp.query.id;

                            wx.showLoading({
                                title: '加载中'
                            });
                            _context.next = 4;
                            return __WEBPACK_IMPORTED_MODULE_3__utils_fly__["a" /* default */].get('topic/' + id);

                        case 4:
                            res = _context.sent;

                            if (res.success) {
                                _this.article = res.data;
                                _this.article = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(_this.article, {
                                    createTime: _this.fromNow(res.data.create_at)
                                });
                                if (_this.article.replies && _this.article.replies.length) {
                                    // 因为小程序不支持过滤器，所以在这里处理回复时间
                                    _this.article.replies = _this.article.replies.map(function (reply) {
                                        reply.createTime = _this.fromNow(reply.create_at);
                                        return reply;
                                    });
                                }
                                wx.hideLoading();
                            }

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
});

/***/ })

},[68]);
//# sourceMappingURL=main.js.map