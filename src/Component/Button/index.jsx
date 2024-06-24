import React from "react";
import {Button} from "@nextui-org/react";

export default function App({style,content}) {
  return (
    <Button radius="full" className={`shadow-lg ${style}`}>
      {content}
    </Button>
  );
}