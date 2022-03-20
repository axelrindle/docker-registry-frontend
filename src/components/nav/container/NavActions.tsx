import { ReactElement } from 'react';

export interface Props {
    children: ReactElement|ReactElement[]
}

export default function NavActions({ children }: Props) {
    return (
        <div className="flex ml-auto">
            {children}
        </div>
    )
}
