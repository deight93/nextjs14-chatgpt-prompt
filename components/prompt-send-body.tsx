import { useState } from "react";
import { PromptMsgInput } from "@/components/prompt-msg-input";
import { PromptCheckbox } from "@/components/prompt-checkbox";

export function PromptSendBody(props: any) {
  let [isChecked, setIsChecked] = useState(false);
  let gptVersion;

  switch (props.selectedVersion) {
    case 3.5:
      gptVersion = "gpt-3.5-turbo";
      break;
    case 4:
      gptVersion = "gpt-4";
      break;
    default:
      gptVersion = "gpt-3.5-turbo";
      break;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <PromptCheckbox setIsChecked={setIsChecked} />
      <PromptMsgInput
        prompt={props.prompt}
        setPrompt={props.setPrompt}
        gptVersion={gptVersion}
        setList={props.setList}
        promptList={props.promptList}
        isChecked={isChecked}
      />
    </div>
  );
}
