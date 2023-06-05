"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var assert = __importStar(require("assert"));
var index_1 = require("../src/index");
var mocha_1 = require("mocha");
var sets_1 = require("./sets");
var run = function (html) { return (0, index_1.ssrApp)({
    el: sets_1.elModelSet,
    res: sets_1.resModelSet,
    formEl: sets_1.formElModelSet,
}, html, { getHelloMsg: function () { return "He-e-ll-o!"; } }); };
exports.run = run;
(0, mocha_1.describe)("test ssr", function () {
    (0, mocha_1.it)("test-ssr", function () {
        assert.equal("<body>\n<ol>\n<li id=\"el_0\" style=\"font-weight: bold;\">\n    el1<ol>\n<li id=\"res_0\" class='res-li'>\u041F\u0435\u0442\u0440\u043E\u0432</li>\n<li id=\"res_1\" class='res-li'>\u0421\u0438\u0434\u043E\u0440\u043E\u0432</li></ol>\n</li>\n<li id=\"el_1\" style=\"font-weight: normal;\">\n    el2<ol>\n<li id=\"res_2\" class='res-li'>\u041C\u0430\u043A\u0430\u0440\u0447\u0435\u043D\u043A\u043E</li></ol>\n</li></ol>\n<div id=\"formContainer\">\n<div id=\"elForm\" data-hello=\"He-e-ll-o!\"><h4>Form</h4><input type='text' value=''></div></div>\n</body>", (0, exports.run)('<body>\n<ol></ol>\n<div id="formContainer"></div>\n</body>'));
    });
});
