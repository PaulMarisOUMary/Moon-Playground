'use client'

import Banner from "@/components/banner/banner";
import SideMenu from "@/components/sidemenu/sidemenu";
import Console from "@/components/console/console";
import TextEditor from "@/components/texteditor/texteditor";

import { IExecuteResponse } from "./lib/models/execute.response";
import { ExecuteRequest } from "./lib/requests";

import { useState } from "react";

import "@/app/styles/home.scss";

export default function Home() {

    const [menu, setMenu] = useState<boolean>(true);
    const [running, setRunning] = useState<boolean>(false);

	const [code, setCode] = useState('')
	const [output, setOutput] = useState('')
	const [errors, setErrors] = useState<any[]>([])
	const [response, setResponse] = useState<IExecuteResponse | undefined>(undefined)

	async function sendExecute() {
		ExecuteRequest(code, setOutput, setErrors, setResponse, setRunning);
	}

	return (
		<>
			<Banner
				runFunc={sendExecute}
				menu={menu}
				setMenu={setMenu}
				running={running}
			/>
			<div className="home-container">
				<div className="home-playground-container">
					<SideMenu 
						setCode={setCode} 
						menu={menu}
					/>
					<div className="home-playground-ide">
						<div className="home-playground-ide-containers">
							<TextEditor code={code} setCode={setCode}/>
						</div>
						<div className="home-playground-ide-containers">
							<Console 
								output={output} 
								setOutput={setOutput}
								errors={errors}
								setErrors={setErrors}
								response={response}
								setResponse={setResponse}
								setRunning={setRunning}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
