"use client";
import * as React from "react";
import { useState } from "react";

import { Head } from "@/components/head";
import { Clear } from "@/components/clear";
import { PromptSendBody } from "@/components/prompt-send-body";
import { PromptChat } from "@/components/prompt-chat";

export default function Home() {
  let [selectedVersion, setSelectedVersion] = useState(4);
  let [prompt, setPrompt] = useState("");
  const [promptList, setList] = useState(() => []);

  return (
    <div className="flex flex-col h-screen justify-center">
      <Head
        setSelectedVersion={setSelectedVersion}
        selectedVersion={selectedVersion}
      />
      <PromptChat promptList={promptList} />
      <PromptSendBody
        prompt={prompt}
        setPrompt={setPrompt}
        selectedVersion={selectedVersion}
        setList={setList}
        promptList={promptList}
      />
      <Clear setList={setList} />
    </div>
  );
}
