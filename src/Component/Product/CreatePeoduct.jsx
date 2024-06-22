import React, { useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);
  const options = ["buenos-aires", "sydney", "san-francisco", "london", "tokyo"];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedValues(options);
    } else {
      setSelectedValues([]);
    }
  };

  const handleCheckboxChange = (values) => {
    setSelectedValues(values);
  };

  const isAllSelected = selectedValues.length === options.length;
  return (
    <div>
      <Checkbox 
        isSelected={isAllSelected}
        onChange={handleSelectAll}
        
      >
        Select All
      </Checkbox>
      <CheckboxGroup
        label="Select cities"
        value={selectedValues}
        onChange={handleCheckboxChange}
         orientation="horizontal"
      color="secondary"
      >
        {options.map((option) => (
          <Checkbox key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1).replace("-", " ")}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
