import { Checkbox } from "@/components/ui/checkbox";

export function PromptCheckbox(props: any) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="messageCheckbox"
        onCheckedChange={(checked) => {
          if (typeof checked === "boolean") {
            props.setIsChecked(checked);
          }
        }}
      />
      <span className="text-sm text-gray-500">
        프롬프트 옵티마이저 기능을 사용하려면 체크해주세요!😝
      </span>
    </div>
  );
}
