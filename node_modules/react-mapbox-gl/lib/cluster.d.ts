/// <reference types="react" />
/// <reference types="mapbox-gl" />
import * as React from 'react';
import { Map } from 'mapbox-gl';
import { Props as MarkerProps } from './marker';
import * as GeoJSON from 'geojson';
export interface Props {
    ClusterMarkerFactory(coordinates: GeoJSON.Position, pointCount: number, getLeaves: (limit?: number, offset?: number) => Array<React.ReactElement<MarkerProps>>): React.ReactElement<MarkerProps>;
    radius?: number;
    maxZoom?: number;
    minZoom?: number;
    extent?: number;
    nodeSize?: number;
    log?: boolean;
    zoomOnClick?: boolean;
    zoomOnClickPadding?: number;
    children?: Array<React.Component<MarkerProps, {}>>;
}
export interface State {
    superC: any;
    clusterPoints: Array<GeoJSON.Feature<GeoJSON.Point>>;
}
export interface Context {
    map: Map;
}
export default class Cluster extends React.Component<Props, State> {
    context: Context;
    static contextTypes: {
        map: any;
    };
    static defaultProps: {
        radius: number;
        minZoom: number;
        maxZoom: number;
        extent: number;
        nodeSize: number;
        log: boolean;
        zoomOnClick: boolean;
        zoomOnClickPadding: number;
    };
    state: State;
    private featureClusterMap;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    private childrenChange;
    private mapChange;
    private feature(coordinates);
    private childrenToFeatures;
    private getLeaves;
    zoomToClusterBounds: (event: React.MouseEvent<HTMLElement>) => void;
    private findMarkerElement(target, element);
    render(): JSX.Element;
}
