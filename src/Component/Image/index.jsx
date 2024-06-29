import React from "react";
import {Image} from "@nextui-org/react";

export default function App({width,src,title}) {
  return (
    <Image
      width={width}
      alt={title}
      src={src}
    />
  );
}
