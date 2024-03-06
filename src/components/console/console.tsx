import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';

import { IExecuteResponse } from '@/app/lib/models/execute.response';
import { ROUTE_API_BASE } from '@/app/lib/routes/routes';

import '@/components/console/console.scss'
import { IExecuteInputRequest } from '@/app/lib/models/executeinput.request';

export default function Console({ output, setOutput, response, setResponse }: { output: string, setOutput: Dispatch<SetStateAction<string>>, response?: IExecuteResponse, setResponse: Dispatch<SetStateAction<IExecuteResponse | undefined>> }) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [prompt, setPrompt] = useState<string | null>('')
    const [input, setInput] = useState<string>('')
    const [focus, setFocus] = useState<string>('')

    async function executeInput() {
        if (response) {
            const data: IExecuteInputRequest = {
                session_code: response.session_code,
                input: input,
            };
    
            const fetch_response = await fetch(
                `${ROUTE_API_BASE}/execute/input`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
    
            if (!fetch_response.ok) {
                // error handling
            }

            const responseData: IExecuteResponse = await fetch_response.json();

            if (responseData.status === "waiting") {
                setResponse(responseData)
            } else {
                setResponse(undefined)
            }

            if (responseData.output === '') {
                setOutput('');
            } else {
                setOutput(responseData.output);
            }
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            executeInput()
            setInput('')
        }
    };

    const clearAll = () => {
        setOutput('')
    };

    const getLineNumbers = () => {
        return output.split("\n");
    };

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output])

    useEffect(() => {
        if (response) {
            setPrompt(response.prompt)
            if (inputRef.current) {
                inputRef.current.focus();
                setFocus("input-highlight")
                setTimeout(() => {
                    setFocus('')
                }, 2500);
            }
        }
    }, [response])

    return (
        <div className="console-container">
            { output &&
                <button className="console-hover-button" onClick={ clearAll }>Clear</button>
            }
            <h2 className="console-title">Console output</h2>
            <div className="console-output-container">
                { getLineNumbers().map((line, index) => (
                    <div key={index} className="console-output-line">
                        {line}
                    </div>
                ))}
                { response &&
                    <div className="console-input-container">
                        <span className="console-input-prompt">
                            { prompt }
                        </span>
                        <input
                            className={`console-input ${focus}`}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            spellCheck="false"
                            ref={inputRef}
                        />
                    </div>
                }
                <div ref={bottomRef}></div>
            </div>
        </div>
    );
}