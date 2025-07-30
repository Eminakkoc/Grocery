'use client';

import InfoModal from '@/components/InfoModal';
import React from 'react';

type LoginErrorBoundaryProps = {
    children: React.ReactNode;
};

type LoginErrorBoundaryState = {
    error: string | null;
};

export default class LoginErrorBoundary extends React.Component<
    LoginErrorBoundaryProps,
    LoginErrorBoundaryState
> {
    constructor(props: LoginErrorBoundaryProps) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error(error);
        console.error(info);
    }

    handleClose = () => {
        this.setState({ error: null });
    };

    render() {
        if (this.state.error) {
            return (
                <InfoModal
                    open
                    onClose={this.handleClose}
                    message={this.state.error}
                    buttonLabel={'OK'}
                />
            );
        }
        return this.props.children;
    }
}
