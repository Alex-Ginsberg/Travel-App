/// <reference types="react" />
/// <reference types="mapbox-gl" />
import * as React from 'react';
import { Map } from 'mapbox-gl';
export declare type Measurement = 'km' | 'mi';
export declare type Position = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
export interface Props {
    measurement?: Measurement;
    position?: Position;
    style?: React.CSSProperties;
}
export interface State {
    chosenScale: number;
    scaleWidth: number;
}
export interface Context {
    map: Map;
}
export default class ScaleControl extends React.Component<Props, State> {
    context: Context;
    static contextTypes: {
        map: any;
    };
    static defaultProps: {
        measurement: Measurement;
        position: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
    };
    state: {
        chosenScale: number;
        scaleWidth: number;
    };
    componentWillMount(): void;
    componentWillUnmount(): void;
    private setScale;
    private _getDistanceTwoPoints(x, y, measurement?);
    private _deg2rad(deg);
    private _displayMeasurement(measurement, chosenScale);
    render(): JSX.Element;
}
