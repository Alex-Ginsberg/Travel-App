/// <reference types="mapbox-gl" />
/// <reference types="react" />
import * as React from 'react';
import { Map, GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { TilesJson } from './util/types';
export interface Context {
    map: Map;
}
export interface Props {
    id: string;
    geoJsonSource?: GeoJSONSourceRaw;
    tileJsonSource?: TilesJson;
    onSourceAdded?: (source: GeoJSONSource | TilesJson) => any;
    onSourceLoaded?: (source: GeoJSONSource | TilesJson) => any;
}
export default class Source extends React.Component<Props, {}> {
    context: Context;
    static contextTypes: {
        map: any;
    };
    private id;
    private onStyleDataChange;
    componentWillMount(): void;
    private initialize;
    private onData;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: Props): void;
    render(): null;
}
