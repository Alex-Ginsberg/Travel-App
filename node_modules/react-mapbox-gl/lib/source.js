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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require('prop-types');
var Source = (function (_super) {
    __extends(Source, _super);
    function Source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id;
        _this.onStyleDataChange = function () {
            if (!_this.context.map.getLayer(_this.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.initialize = function () {
            var map = _this.context.map;
            var _a = _this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, onSourceAdded = _a.onSourceAdded;
            if (!map.getSource(_this.id) && (geoJsonSource || tileJsonSource)) {
                map.addSource(_this.id, (geoJsonSource || tileJsonSource));
                map.on('load', _this.onData);
                if (onSourceAdded) {
                    onSourceAdded(map.getSource(_this.id));
                }
            }
        };
        _this.onData = function (event) {
            var map = _this.context.map;
            var source = map.getSource(_this.props.id);
            var onSourceLoaded = _this.props.onSourceLoaded;
            if (source && onSourceLoaded) {
                onSourceLoaded(source);
            }
            if (source && _this.props.geoJsonSource && _this.props.geoJsonSource.data) {
                source.setData(_this.props.geoJsonSource.data);
            }
            map.off('load', _this.onData);
        };
        return _this;
    }
    Source.prototype.componentWillMount = function () {
        var map = this.context.map;
        map.on('styledata', this.onStyleDataChange);
        this.initialize();
    };
    Source.prototype.componentWillUnmount = function () {
        var map = this.context.map;
        if (!map || !map.getStyle()) {
            return;
        }
        map.off('styledata', this.onStyleDataChange);
        if (map.getSource(this.id)) {
            map.removeSource(this.id);
        }
    };
    Source.prototype.componentWillReceiveProps = function (props) {
        var _a = this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource;
        var map = this.context.map;
        if (tileJsonSource && props.tileJsonSource) {
            var hasNewTilesSource = tileJsonSource.url !== props.tileJsonSource.url ||
                tileJsonSource.tiles !== props.tileJsonSource.tiles ||
                tileJsonSource.minzoom !== props.tileJsonSource.minzoom ||
                tileJsonSource.maxzoom !== props.tileJsonSource.maxzoom;
            if (hasNewTilesSource) {
                map.removeSource(this.id);
                map.addSource(this.id, props.tileJsonSource);
            }
        }
        if (geoJsonSource &&
            props.geoJsonSource &&
            props.geoJsonSource.data !== geoJsonSource.data) {
            var source = map.getSource(this.id);
            source.setData(props.geoJsonSource.data);
        }
    };
    Source.prototype.render = function () {
        return null;
    };
    Source.contextTypes = {
        map: PropTypes.object
    };
    return Source;
}(React.Component));
exports.default = Source;
//# sourceMappingURL=source.js.map