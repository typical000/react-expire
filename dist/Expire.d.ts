import * as React from 'react';
interface ExpireProps {
    /**
     * Used as identifier of what was expired. Usefull if you have parent component
     * that renders "list" of "expirable" components, and you need to identify them in some way.
     * If not set - just "onExpire" will be called without any params.
     */
    id?: number | string;
    /**
     * Lifetime in milliseconds. If set 0 - this means that widget will never expire.
     * When widget will expire - 'onExpire' property will be triggered.
     */
    until: number;
    /**
     * Untouched children components. Not obbligatory at all.
     */
    children?: React.ReactNode;
    /**
     * Callback, that will be called when 'until' prop countdown will finish
     */
    onExpire?(id?: number | string): void;
}
interface ExpireState {
    expired: boolean;
}
/**
 * @class Expire
 * @classdesc "React component for managing time expiration
 */
export default class Expire extends React.Component<ExpireProps, ExpireState> {
    state: {
        expired: boolean;
    };
    private expireTimer;
    constructor(props: ExpireProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ExpireProps): void;
    componentWillUnmount(): void;
    render(): any;
    private startExpiration;
    private cancelExpiration;
}
export {};
