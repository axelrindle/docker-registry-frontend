import { ReactElement } from 'react';

export interface Props {
    children: ReactElement|ReactElement[]
}

export default function NavItems({ children }: Props) {
    return (
        <div className="flex ml-6">
            {children}
        </div>
    )
}
