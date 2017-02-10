require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./node_modules/vitaminjs/config/build/webpack.config.client.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************************************!*\
  !*** ./~/vitaminjs/config/build/webpack.config.client.js ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack__ = __webpack_require__(/*! webpack */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__ = __webpack_require__(/*! ./webpack.config.common.js */ "./node_modules/vitaminjs/config/build/webpack.config.common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");
/* harmony export (immutable) */ __webpack_exports__["a"] = clientConfig;








function clientConfig(options) {
    const hotMiddlewareEntry = `webpack-hot-middleware/client?path=${options.publicPath}/__webpack_hmr`;
    return __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["a" /* config */])(options), {
        entry: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* vitaminResolve */])('src', 'client', 'index.jsx'), ...(options.hot ? [hotMiddlewareEntry] : [])],
        output: {
            path: options.client.buildPath,
            filename: options.client.filename
        },
        module: {
            rules: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["b" /* createBabelLoader */])('client'), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["c" /* createResolveConfigLoader */])()]
        },
        plugins: [...(options.hot ? [new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.NoErrorsPlugin(), new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.optimize.OccurrenceOrderPlugin()] : []), ...(!options.dev ? [new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.optimize.UglifyJsPlugin({ minimize: true })] : []), new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.DefinePlugin({
            'process.env.NODE_ENV': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(undefined)
        }), ...(options.client.serviceWorker ? [new __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin___default.a({
            entry: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* appResolve */])(options.client.serviceWorker)
        })] : [])]
    }, __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* concat */]);
}

/***/ })

};
//# sourceMappingURL=0.80f737f9e14e019215a6.hot-update.js.map