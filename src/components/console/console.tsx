import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';

import { IExecuteResponse } from '@/app/lib/models/execute.response';
import { ExecuteInputRequest } from '@/app/lib/requests';

import '@/components/console/console.scss'

export default function Console({ output, setOutput, response, setResponse, errors, setErrors, setRunning }: { output: string, setOutput: Dispatch<SetStateAction<string>>, response?: IExecuteResponse, setResponse: Dispatch<SetStateAction<IExecuteResponse | undefined>>, errors: any[], setErrors: Dispatch<SetStateAction<any[]>>, setRunning: Dispatch<SetStateAction<boolean>> }) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [prompt, setPrompt] = useState<string | null>('')
    const [input, setInput] = useState<string>('')
    const [focus, setFocus] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (response) {
                ExecuteInputRequest(
                    input,
                    response,
                    setOutput,
                    setErrors,
                    setResponse,
                    setRunning
                )
            }
            setInput('')
        }
    };

    const clearAll = () => {
        setOutput('')
        setErrors([])
    };

    const getLineNumbers = () => {
        return output.split("\n");
    };

    const getErrors = () => {
        var return_error: any[] = []
        errors.map((item, index) => {
            if (Array.isArray(item)) {
                item.forEach((value) => {
                    return_error.push(
                        `Syntax error '${value[0]}' on line: ${value[1]}`
                    )
                });
            } else {
                return_error.push(item)
            }
        });
        return return_error
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
            { (output || (errors && errors.length > 0)) &&
                <button className="console-hover-button" onClick={ clearAll }>Clear</button>
            }
            <h2 className="console-title">Console output</h2>
            <div className="console-output-container">
                { getLineNumbers().map((line, index) => (
                    <div key={`output-${index}`} className="console-output-line">
                        {line}
                    </div>
                ))}
                {
                    getErrors().map((item, index) => (
                        <div key={`error-${index}`} className="console-output-line console-error">{String(item)}</div>
                    ))
                }
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