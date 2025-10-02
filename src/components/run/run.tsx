import { MouseEventHandler } from "react";

import "@/components/run/run.scss";

type RunButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  running: boolean;
};

export default function RunButton({ onClick, running }: RunButtonProps) {
  return running ? (
    <div className="run-loader"></div>
  ) : (
    <button className="run-button" onClick={onClick}>
      ▷ Run
    </button>
  );
}