import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../Button/index";
import { Textarea } from "@nextui-org/react";

const size = ['M', 'S', 'L', 'XL'];

const Purchar = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [arr, setArr] = useState("");
    console.log(arr);
 const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="w-full h-[50px] bg-blue-300 flex flex-row justify-between">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShop} />
                    Import Product
                </div>
                <div className="flex flex-row h-full gap-2 mr-5 items-center">
                    <Button
                        style="bg-white text-red-400 border-[3px] border-red-400 hover:text-white hover:bg-red-400 hover:border-white text-sm"
                        content="Delete Import"
                    />
                    <Button
                        style="bg-white text-green-400 border-[3px] border-green-400 hover:text-white hover:bg-green-400 hover:border-white text-sm"
                        content="Add Import"
                    />
                </div>
            </div>
            <div className="flex flex-row w-[800px] h-full bg-red-300">
                <div className="bg-[#f9f9f9] w-[90%] h-full p-5 flex flex-col">
                    <div className="font-bold text-lg mb-2">General Information</div>
                    <div className="mb-4">
                        <div className="font-semibold">Name Product</div>
                        <div>Product A</div>
                    </div>
                    <div className="flex flex-col w-full mb-4">
                        <div className="text-left text-[#848588] font-mono">Description Product</div>
                        <Textarea
                            isDisabled
                            labelPlacement="outside"
                            placeholder="Enter your description"
                            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                            className="w-full text-[#878889] shadow-inner bg-[#eeeeee] rounded-xl text-left"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-1/2">
                            <div className="font-semibold">Size</div>
                        <div className="flex flex-row gap-3">
                            {size.map((el, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setArr(el);
                                    }}
                                    className={`w-14 h-14 ${arr==el ? "border-0 bg-green-300 text-white" : "outline-none bg-[#ededed]"} rounded`}
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                        </div>
                        <div className="w-1/2">
                            <div>Gender</div>
                            <div className="flex flex-row gap-4">
                            <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Nam"
                                checked={selectedOption === "Nam"}
                                onChange={handleChange}
                            />
                            <label htmlFor="male" className="cursor-pointer">Nam</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="demale"
                                name="gender"
                                value="Nữ"
                                checked={selectedOption === "Nữ"}
                                onChange={handleChange}
                            />
                            <label htmlFor="female" className="cursor-pointer">Nữ</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="Unisex"
                                name="gender"
                                value="Unisex"
                                checked={selectedOption === "Unisex"}
                                onChange={handleChange}
                            />
                            <label htmlFor="Unisex" className="cursor-pointer">Unisex</label>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Purchar;
