import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";



export default function App({rows,columns}) {
  return (
    <div className=" mt-10 shadow-lg">
      <Table aria-label="Order List Table" className="border-2 border-slate-400 rounded-2xl">
        <TableHeader columns={columns}>
          {(column) => <TableColumn className="bg-slate-300 p-5" key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key} className="p-5">
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
