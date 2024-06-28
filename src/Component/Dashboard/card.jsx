import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Progress from './Progress'
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function App({ text,icon,number ,value, content, bg, color}) {
  return (
    <Card className={`w-[400px] border-2 bg-${bg} text-${text} border-slate-400 rounded-xl p-2 shadow-lg`}> 
      <CardHeader className="flex gap-3 justify-between h-[60px]">
        
        <div className="flex flex-col">
          <p className="text-2xl font-bold flex justify-start">{number}</p>
          <p className="text-sm text-slate-500 font-mono flex text-default-500 justify-start ">{content}</p>
        </div>
        <FontAwesomeIcon icon={icon} className={`${color} p-2 rounded-lg`} size="lg" style={{color: 'black',}} />
      </CardHeader>
      <CardFooter>
        <Progress value={value}/>
      </CardFooter>
    </Card>
  );
}