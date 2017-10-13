"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var projected_layer_1 = require("./projected-layer");
var overlays_1 = require("./util/overlays");
var classname_1 = require("./util/classname");
exports.defaultClassName = ['mapboxgl-popup'];
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.render = function () {
        var anchorClass = "mapboxgl-popup-anchor-" + this.props.anchor;
        var props = __assign({}, this.props, { children: undefined });
        var className = classname_1.getClassName(exports.defaultClassName.concat(anchorClass), this.props.className);
        return (React.createElement(projected_layer_1.default, __assign({}, props, { className: className }),
            React.createElement("div", { className: "mapboxgl-popup-tip" }),
            React.createElement("div", { className: "mapboxgl-popup-content" }, this.props.children)));
    };
    Popup.defaultProps = {
        anchor: overlays_1.anchors[0]
    };
    return Popup;
}(React.Component));
exports.default = Popup;
//# sourceMappingURL=popup.js.map