/// <reference types="react" />
import * as React from 'react';
import { Anchor, PointDef } from './util/overlays';
import * as GeoJSON from 'geojson';
export interface Props {
    coordinates: GeoJSON.Position;
    anchor?: Anchor;
    offset?: number | number[] | PointDef;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    className?: string;
}
export declare const defaultClassName: string[];
export default class Popup extends React.Component<Props, {}> {
    static defaultProps: {
        anchor: "left" | "right" | "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top" | "bottom";
    };
    render(): JSX.Element;
}
