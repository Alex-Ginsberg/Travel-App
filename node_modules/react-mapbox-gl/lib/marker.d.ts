/// <reference types="react" />
import * as React from 'react';
import * as GeoJSON from 'geojson';
import { Anchor, PointDef } from './util/overlays';
export interface Props {
    coordinates: GeoJSON.Position;
    anchor?: Anchor;
    offset?: number | number[] | PointDef;
    children?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    className?: string;
}
declare const Marker: React.StatelessComponent<Props>;
export default Marker;
