import Link from 'next/link';
import { MouseEventHandler } from 'react';

import '@/components/banner/banner.scss'

export default function Banner({runFunc}: {runFunc: MouseEventHandler<HTMLButtonElement>}) {
    return (
        <div className="home-banner">
            <div className="home-banner-left">
                <Link href='/' className="home-banner-root">/</Link>
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