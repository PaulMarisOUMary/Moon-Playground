'use client'

import Banner from "@/components/banner/banner";
import SideMenu from "@/components/sidemenu/sidemenu";
import Console from "@/components/console/console";
import TextEditor from "@/components/texteditor/texteditor";

import { IExecuteResponse } from "./lib/models/execute.response";
import { IExecuteRequest } from "./lib/models/execute.request";
import { ROUTE_API_BASE } from "./lib/routes/routes";

import { useState } from "react";

import "@/app/styles/home.scss";

export default function Home() {

	const [code, setCode] = useState('')
	const [output, setOutput] = useState('')
	const [response, setResponse] = useState<IExecuteResponse | undefined>(undefined)

	async function execute() {
		const data: IExecuteRequest = {
			source_code: code,
		};

		const fetch_response = await fetch(
			`${ROUTE_API_BASE}/execute`,
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
		}

		if (responseData.output === '') {
			setOutput('');
		} else {
			setOutput(responseData.output);
		}
	}

	return (
		<>
			<Banner runFunc={execute}/>
			<div className="home-container">
				<div className="home-playground-container">
					<SideMenu setCode={setCode}/>
					<div className="home-playground-ide">
						<div className="home-playground-ide-containers">
							<TextEditor code={code} setCode={setCode}/>
						</div>
						<div className="home-playground-ide-containers">
							<Console 
								output={output} 
								setOutput={setOutput}
								response={response}
								setResponse={setResponse}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
