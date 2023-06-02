"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssrApp = void 0;
var uralsjs_app_abstractions_1 = require("uralsjs-app-abstractions");
var node_html_parser_1 = require("node-html-parser");
var uralsjs_map_record_1 = require("uralsjs-map-record");
var nodeSsrRenderer = function (getElements, getRootSelector, elWidget, renderId, inputHtml) {
    var renderEl = function (el) {
        return elWidget(el.model, renderId(el.id));
    };
    var grouped = (0, uralsjs_app_abstractions_1.regroup)(getElements(), getRootSelector);
    var groupedWidgets = Object.keys(grouped)
        .map(function (k) { return ({ sel: k, arr: grouped[k].map(function (el) { return renderEl(el); }) }); });
    var html = (0, node_html_parser_1.parse)(inputHtml);
    groupedWidgets.forEach(function (el) {
        var selectedHtml = html.querySelector(el.sel).innerHTML =
            el.arr.join("");
    });
    return html.toString();
};
var ssrApp = function (modelSets, html) {
    var state = (0, uralsjs_map_record_1.mapRecordVals)(modelSets, function (el) { return el.stor; });
    Object.keys(state)
        .forEach(function (i) { return state[i].setReactiveFunc(function (recs) {
        html = nodeSsrRenderer(function () { return recs; }, modelSets[i].rootSelector, modelSets[i].widget, function (id) { return modelSets[i].idTool.renderId(id); }, html);
    }); });
    Object.keys(state)
        .forEach(function (i) { return state[i].reinit(modelSets[i].initData); });
    return html;
};
exports.ssrApp = ssrApp;
