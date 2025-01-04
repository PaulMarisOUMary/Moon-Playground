import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import { fizzbuzz, guess_game, guess_game_recursive, is_prime } from '@/app/lib/moon-templates/templates';
import { builtin, comments, conditional, expressions, function_examples, primitives, while_loop } from '@/app/lib/moon-templates/syntax';

import '@/components/sidemenu/sidemenu.scss'

export default function SideMenu({ setCode, menu }: { setCode: Dispatch<SetStateAction<string>>, menu: boolean }) {
    return (
        <div 
            className={`home-sidemenu ${!menu && "hidden"}`}
        >
            <div>Menu</div>
            <div className="home-sidemenu-embeded">
                <h3>Documentation</h3>
                <div className="home-sidemenu-embeded">
                    <Link 
                        className="home-sidemenu-hover" 
                        href="https://github.com/PaulMarisOUMary/Moon" 
                        rel="noopener noreferrer" 
                        target="_blank"
                    >Github</Link>
                    <Link 
                        className="home-sidemenu-hover"
                        href="https://github.com/PaulMarisOUMary/Moon/blob/main/docs/SYNTAX_SEMANTICS.md"
                        rel="noopener noreferrer"
                        target="_blank"
                    >Syntax and Semantics</Link>
                    <div className="home-sidemenu-embeded">
                        <button className="home-sidemenu-hover" onClick={() => setCode(comments)}>Comments</button>
                        <button className="home-sidemenu-hover" onClick={() => setCode(primitives)}>Primitive Types</button>
                        <div className="home-sidemenu-notavailable">Composite Types</div>
                        <button className="home-sidemenu-hover" onClick={() => setCode(expressions)}>Expressions</button>
                        <div className="home-sidemenu-notavailable">Tabulation</div>
                        <button className="home-sidemenu-hover" onClick={() => setCode(conditional)}>Conditional Statements</button>
                        <button className="home-sidemenu-hover" onClick={() => setCode(while_loop)}>Looping Structure</button>
                        <div className="home-sidemenu-notavailable">Error Handling</div>
                        <button className="home-sidemenu-hover" onClick={() => setCode(function_examples)}>Functions</button>
                        <div className="home-sidemenu-notavailable">Classes</div>
                        <div className="home-sidemenu-notavailable">Modules</div>
                        <button className="home-sidemenu-hover" onClick={() => setCode(builtin)}>Built-in Functions</button>
                    </div>
                </div>
                <h3>Templates</h3>
                <div className="home-sidemenu-embeded">
                    <button className="home-sidemenu-hover" onClick={() => setCode(fizzbuzz)}>FizzBuzz</button>
                    <button className="home-sidemenu-hover" onClick={() => setCode(guess_game)}>GuessGame</button>
                    <button className="home-sidemenu-hover" onClick={() => setCode(guess_game_recursive)}>GuessGame (Recursive)</button>
                    <button className="home-sidemenu-hover" onClick={() => setCode(is_prime)}>Prime Numbers</button>
                </div>
                <h3>Related Projects</h3>
                <div className="home-sidemenu-embeded">
                    <Link 
                        className="home-sidemenu-hover" 
                        href="https://github.com/PaulMarisOUMary/Moon-API" 
                        rel="noopener noreferrer" 
                        target="_blank"
                    >Moon API</Link>
                    <Link 
                        className="home-sidemenu-hover" 
                        href="https://github.com/PaulMarisOUMary/Moon-Playground" 
                        rel="noopener noreferrer" 
                        target="_blank"
                    >Moon&apos;s Playground</Link>
                    <Link 
                        className="home-sidemenu-hover" 
                        href="https://github.com/PaulMarisOUMary/Moon-VSCode-Extension" 
                        rel="noopener noreferrer" 
                        target="_blank"
                    >VSCode Extension</Link>
                </div>
            </div>
        </div>
    );
}
