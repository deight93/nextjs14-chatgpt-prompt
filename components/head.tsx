import { SelectBox } from "@/components/ui/selectbox";

export function Head(props: any) {
  return (
    <header className="p-4 border-b relative">
      <h1 className="inline-block text-2xl font-semibold">ChatGPT</h1>
      <div className="inline-block items-center gap-2 ml-5">
        <SelectBox
          selectedVersion={props.selectedVersion}
          setSelectedVersion={props.setSelectedVersion}
        />
      </div>
    </header>
  );
}
