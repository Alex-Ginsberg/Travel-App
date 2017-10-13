/// <reference types="mapbox-gl" />
import { Point, Map } from 'mapbox-gl';
import { Props } from '../projected-layer';
export declare type Anchor = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface PointDef {
    x: number;
    y: number;
}
export interface OverlayProps {
    anchor?: Anchor;
    offset?: PointDef;
    position?: PointDef;
}
export declare const anchors: ("left" | "right" | "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top" | "bottom")[];
export declare const anchorTranslates: {
    center: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
    'top-left': string;
    'top-right': string;
    'bottom-left': string;
    'bottom-right': string;
};
export declare const overlayState: (props: Props, map: Map, container: HTMLElement) => {
    anchor: string;
    position: Point;
    offset: any;
};
export declare const overlayTransform: ({anchor, position, offset}: OverlayProps) => string[];
