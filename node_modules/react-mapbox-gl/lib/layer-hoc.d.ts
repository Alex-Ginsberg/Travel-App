/// <reference types="react" />
import * as React from 'react';
import { Context } from '../lib/util/types';
import { Props as FeatureProps } from './feature';
declare const layerMouseTouchEvents: (WrappedComponent: any) => {
    new (props?: any, context?: any): {
        context: Context;
        getChildren: () => React.ReactElement<FeatureProps>[];
        onClick: (evt: any) => void;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends string>(f: (prevState: any, props: any) => Pick<any, K>, callback?: (() => any) | undefined): void;
        setState<K extends string>(state: Pick<any, K>, callback?: (() => any) | undefined): void;
        forceUpdate(callBack?: (() => any) | undefined): void;
        props: any;
        state: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextTypes: {
        map: any;
    };
    defaultProps: {
        id: string;
    };
};
export default layerMouseTouchEvents;
