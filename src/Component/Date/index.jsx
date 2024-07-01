import React from "react";
import {DateRangePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  const [value, setValue] = React.useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({dateStyle: "long"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2 ">
        <DateRangePicker
        // onBlur={blur}
          label="Date range (controlled)"
          value={value}
          onChange={setValue}
          className="shadow-slate-800 shadow-inner rounded-lg bg-slate-500"
        />
       
      </div>
      
    </div>
  );
}
