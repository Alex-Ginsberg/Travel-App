/// <reference types="react" />
import { Component } from 'react';
export interface Props {
    coordinates: number[] | number[][] | number[][][] | number[][][][];
    properties?: any;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    draggable?: boolean;
    onDragEnd?: React.MouseEventHandler<HTMLElement>;
}
declare class Feature extends Component<Props, {}> {
    render(): null;
}
export default Feature;
