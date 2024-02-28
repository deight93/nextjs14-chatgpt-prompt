import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PromptMsgInput(props: any) {
  const assistantMessageIndex = useRef(0);

  const handleChange = (e: any) => {
    props.setPrompt(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let prompts = [
      ...props.promptList,
      { role: "user", content: props.prompt },
    ];
    props.setList(prompts);

    assistantMessageIndex.current = prompts.length;
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompts: prompts,
          gptVersion: props.gptVersion,
          isChecked: props.isChecked,
        }),
      });

      if (response.ok) {
        let data = response.body;
        if (!data) {
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let currentResponse: string[] = [];

        while (!done) {
          const { value, done: doneValue } = await reader.read();
          done = doneValue;
          const chunkValue = decoder.decode(value);
          currentResponse.push(chunkValue);
          props.setList((prevList: any) => [
            ...prevList.slice(0, assistantMessageIndex.current),
            {
              role: "assistant",
              content: currentResponse.join(""),
            },
          ]);
        }
      } else {
        console.error("Failed to send request:", response);
      }
      props.setPrompt("");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleButtonClick = (e: any) => {
    handleSubmit(e);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key !== "Enter") return;
    handleButtonClick(e);
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex items-center space-x-2 flex-1">
        <Input
          className="flex-1 rounded-full"
          placeholder="Type a message..."
          type="text"
          value={props.prompt}
          onChange={handleChange}
          onKeyDown={handleOnKeyPress}
        />
      </div>
      <div className="border-white border rounded p-0">
        <Button onClick={handleButtonClick}>Send</Button>
      </div>
    </div>
  );
}
