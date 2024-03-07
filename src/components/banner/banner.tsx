import Link from 'next/link';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

import '@/components/banner/banner.scss'

export default function Banner({ runFunc, menu, setMenu }: { runFunc: MouseEventHandler<HTMLButtonElement>, menu: boolean, setMenu: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="home-banner">
            <div className="home-banner-left">
                <button className="home-banner-root" onClick={() => setMenu(!menu)}>/</button>
            </div>
            <nav className="home-banner-nav">
                <h1 className="home-banner-title">Moon</h1>
            </nav>
            <div className="home-banner-right">
                <button className="home-banner-run" onClick={runFunc}>Run</button>
            </div>
        </div>
    );
}