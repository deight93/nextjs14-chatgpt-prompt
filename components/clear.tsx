import { Button } from "@/components/ui/button";

export function Clear(props: any) {
  const handleButtonClick = (e: any) => {
    props.setList([]);
  };

  return (
    <div className="p-4 border-t flex items-center justify-center">
      <Button onClick={handleButtonClick} variant="outline">
        Clear
      </Button>
    </div>
  );
}
