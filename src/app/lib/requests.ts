import { Dispatch, SetStateAction } from "react";

import { IExecuteRequest } from "./models/execute.request";
import { IExecuteInputRequest } from "./models/executeinput.request";
import { IExecuteResponse } from "./models/execute.response";
import { ROUTE_API_BASE } from "./routes/routes";

export async function ExecuteRequest(
    code: string,
    setOutput: Dispatch<SetStateAction<string>>,
    setErrors: Dispatch<SetStateAction<any[]>>,
    setResponse: Dispatch<SetStateAction<IExecuteResponse | undefined>>,
    setRunning: Dispatch<SetStateAction<boolean>>,
) {
    const data: IExecuteRequest = {
        source_code: code,
    };

    setRunning(true);

    await handleRequest(
        `${ROUTE_API_BASE}/execute`,
        data,
        setOutput,
        setErrors,
        setResponse
    );

    setRunning(false);
}

export async function ExecuteInputRequest(
    input: string,
    response: IExecuteResponse,
    setOutput: Dispatch<SetStateAction<string>>,
    setErrors: Dispatch<SetStateAction<any[]>>,
    setResponse: Dispatch<SetStateAction<IExecuteResponse | undefined>>,
    setRunning: Dispatch<SetStateAction<boolean>>,
) {
    const data: IExecuteInputRequest = {
        session_code: response.session_code,
        input: input,
    };

    setRunning(true);

    await handleRequest(
        `${ROUTE_API_BASE}/execute/input`,
        data,
        setOutput,
        setErrors,
        setResponse
    );

    setRunning(false);

}


async function handleRequest(
    url: string,
    data: IExecuteInputRequest | IExecuteRequest,
    setOutput: Dispatch<SetStateAction<string>>,
    setErrors: Dispatch<SetStateAction<any[]>>,
    setResponse: Dispatch<SetStateAction<IExecuteResponse | undefined>>,
) {
    await fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    )
    .then(async (response) => {
        const responseData: IExecuteResponse = await response.json()

        if (response.status == 400) {
            setErrors(["Input Timeout: your response was not received within the allowed time"]);
            setResponse(undefined);
            return;
        }

        setOutput(responseData.output);

        if (responseData.status === "waiting") {
            setResponse(responseData);
        } else {
            setResponse(undefined);
        }

        setErrors(responseData.errors);
    })
    .catch((error) => {
        setOutput("Moon service temporarily unavailable, please try again later.")
    })
}