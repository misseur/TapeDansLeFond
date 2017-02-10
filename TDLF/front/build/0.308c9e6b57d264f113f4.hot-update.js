require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/reducers.js":
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state == 0 ? state : state - 1;
        default:
            return state;
    }
};

/* harmony default export */ __webpack_exports__["a"] = { counter };

/***/ })

};
//# sourceMappingURL=0.308c9e6b57d264f113f4.hot-update.js.map