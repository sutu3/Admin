import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function App() {
  const [value, setValue] = React.useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({ dateStyle: "long" });

  return (
    <div className="flex flex-row">
      <div className="w-full flex flex-col">
        <DateRangePicker
          // onBlur={blur}
          label="Select Order Date"
          onBlur={'lg'}
          
          value={value}
          onChange={setValue}
          className="shadow-slate-800 shadow-inner rounded-lg "
          classNames={{
            calendar:
              "bg-slate-100 backdrop-blur-lg rounded-lg shadow-inner",
            input: "w-full rounded-md border border-slate-300 focus:border-slate-500",
            inputWrapper:"hover:bg-slate-400"
          }}
        />
      </div>
    </div>
  );
}
