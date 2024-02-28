"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UpdownIcon } from "@/components/ui/updown-icons";

export class SelectBox extends React.Component<{
  selectedVersion: number;
  setSelectedVersion: (input: number) => void;
}> {
  onSelected(version: number) {
    return (event: Event) => {
      this.props.setSelectedVersion(version);
    };
  }

  render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8" variant="outline">
            <UpdownIcon className="h-4 w-4" />
            <div className="text-lg font-light ml-2 mr-2">{`GPT-${this.props.selectedVersion}`}</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem onSelect={this.onSelected(4)}>GPT-4</DropdownMenuItem>
          <DropdownMenuItem onSelect={this.onSelected(3.5)}>GPT-3.5</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
