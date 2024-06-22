import React from "react";
import { Progress } from "@nextui-org/react";

export default function App({value}) {
  return (
    <Progress
      size="md"
      radius="md"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
        
      }}
      label="0%"
      value={value}
      showValueLabel={true}
    />
  );
}
