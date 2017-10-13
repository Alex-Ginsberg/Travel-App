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
var PropTypes = require('prop-types');
var uid_1 = require("./util/uid");
var layerMouseTouchEvents = function (WrappedComponent) {
    return (_a = (function (_super) {
            __extends(EnhancedLayer, _super);
            function EnhancedLayer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.getChildren = function () {
                    return [].concat(_this.props.children);
                };
                _this.onClick = function (evt) {
                    var features = evt.features;
                    var children = _this.getChildren();
                    var map = _this.context.map;
                    if (features) {
                        features.forEach(function (feature) {
                            var id = feature.properties.id;
                            if (children) {
                                var child = children[id];
                                var onClick = child && child.props.onClick;
                                if (onClick) {
                                    onClick(__assign({}, evt, { feature: feature, map: map }));
                                }
                            }
                        });
                    }
                };
                return _this;
            }
            EnhancedLayer.prototype.componentWillMount = function () {
                var map = this.context.map;
                map.on('click', this.props.id, this.onClick);
            };
            EnhancedLayer.prototype.componentWillUnmount = function () {
                var map = this.context.map;
                map.off('click', this.onClick);
            };
            EnhancedLayer.prototype.render = function () {
                return (React.createElement(WrappedComponent, __assign({}, this.props)));
            };
            return EnhancedLayer;
        }(React.Component)),
        _a.contextTypes = {
            map: PropTypes.object
        },
        _a.defaultProps = {
            id: "layer-" + uid_1.generateID()
        },
        _a);
    var _a;
};
exports.default = layerMouseTouchEvents;
//# sourceMappingURL=layer-hoc.js.map