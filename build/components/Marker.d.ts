import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Point } from '../interfaces';
export interface MarkerProps {
    children?: React.ReactElement;
    zIndex?: number;
    scale?: number;
    onPress?: () => void;
    point: Point;
    source?: ImageSourcePropType;
    anchor?: {
        x: number;
        y: number;
    };
    visible?: boolean;
}
interface State {
    recreateKey: boolean;
    children: any;
}
export declare class Marker extends React.Component<MarkerProps, State> {
    state: {
        recreateKey: boolean;
        children: (React.ReactElement<any, string | React.JSXElementConstructor<any>> & (boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null)) | undefined;
    };
    private getCommand;
    static getDerivedStateFromProps(nextProps: MarkerProps, prevState: State): Partial<State>;
    private resolveImageUri;
    private getProps;
    animatedMoveTo(coords: Point, duration: number): void;
    animatedRotateTo(angle: number, duration: number): void;
    render(): JSX.Element;
}
export {};
