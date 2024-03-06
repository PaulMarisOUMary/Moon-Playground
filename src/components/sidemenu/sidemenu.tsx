import { Dispatch, SetStateAction } from 'react';

import { fizzbuzz, guess_game, guess_game_recursive } from '@/app/lib/moon-templates/templates';

import '@/components/sidemenu/sidemenu.scss'

export default function SideMenu({ setCode }: { setCode: Dispatch<SetStateAction<string>> }) {
    return (
        <div className="home-sidemenu">
            <h2>Menu</h2>
            <div className="home-sidemenu-embeded">
                <h3>Templates</h3>
                <div className="home-sidemenu-embeded">
                    <button className="home-sidemenu-button-template" onClick={() => setCode(fizzbuzz)}>FizzBuzz</button>
                    <button className="home-sidemenu-button-template" onClick={() => setCode(guess_game)}>GuessGame</button>
                    <button className="home-sidemenu-button-template" onClick={() => setCode(guess_game_recursive)}>GuessGame-Recursive</button>
                </div>
            </div>
        </div>
    );
}