import React, {ReactNode} from 'react';
import Link from "next/link";
import Image from "next/image";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="root-layout">
            <nav>
                <Link href="/" className="flex gap-2 items-center">
                    <Image src="/logo.svg" width={25} height={25} alt="logo" />
                    <h2 className="font-bold">PrepView</h2>
                </Link>
            </nav>
            {children}
        </div>
    );
};

export default Layout;