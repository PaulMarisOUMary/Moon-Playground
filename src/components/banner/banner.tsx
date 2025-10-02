import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

import RunButton from "@/components/run/run";

import '@/components/banner/banner.scss'

type BannerProps = {
  runFunc: MouseEventHandler<HTMLButtonElement>;
  running: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  menu: boolean;
};

export default function Banner({ runFunc, running, setMenu, menu }: BannerProps) {
    return (
        <div className="home-banner">
            <div className="home-banner-left">
                <button className="home-banner-root" onClick={() => setMenu(!menu)}>/</button>
            </div>
            <nav className="home-banner-nav">
                <h1 className="home-banner-title">Moon</h1>
            </nav>
            <div className="home-banner-right">
                <RunButton onClick={runFunc} running={running} />
            </div>
        </div>
    );
}