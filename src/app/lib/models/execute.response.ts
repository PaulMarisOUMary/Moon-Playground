export declare interface IExecuteResponse {
    session_code: string,
    status: "completed" | "waiting" | "error",
    prompt: string | null,
    output: string,
    errors: any[],
}