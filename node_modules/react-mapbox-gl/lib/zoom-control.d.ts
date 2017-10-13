/// <reference types="mapbox-gl" />
/// <reference types="react" />
import * as React from 'react';
import { Map } from 'mapbox-gl';
export interface Props {
    zoomDiff?: number;
    onControlClick?: (map: Map, zoomDiff: number) => void;
    position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    style?: React.CSSProperties;
    className?: string;
}
export interface State {
    hover?: number;
}
export interface Context {
    map: Map;
}
export default class ZoomControl extends React.Component<Props, State> {
    context: Context;
    static defaultProps: {
        position: string;
        zoomDiff: number;
        onControlClick: (map: Map, zoomDiff: number) => void;
    };
    state: {
        hover: undefined;
    };
    static contextTypes: {
        map: any;
    };
    private onMouseOut;
    private plusOver;
    private minusOver;
    private onClickPlus;
    private onClickMinus;
    render(): JSX.Element;
}
