import { useEffect, useRef } from "react";

export function PromptChat(props: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤을 항상 하단으로 이동시킵니다.
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [props.promptList]);

  return (
    <main
      className="flex-1 flex flex-col justify-end p-4"
      style={{
        height: "calc(80% - 70px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={chatContainerRef}
        className="flex flex-col gap-4"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          maxHeight: "100%",
          overflowY: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div className="flex flex-col items-end gap-1">
          {props.promptList.map((prompt: any, index: any) => (
            <div
              className={`rounded-lg p-4 ${
                prompt.role === "user"
                  ? "bg-blue-500 text-white self-start"
                  : "bg-gray-100 dark:bg-gray-600"
              } text-sm max-w-[75%]`}
              key={index}
            >
              {prompt.content}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
