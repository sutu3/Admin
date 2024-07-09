import React from "react";
import { Infor } from "../Redux/selector";
import { useSelector } from "react-redux";
import { Image, User,Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faImages } from "@fortawesome/free-solid-svg-icons";
const Index = () => {
  const infor = useSelector(Infor);

  return (
    <div className="w-[1350px] h-full translate-x-10 flex flex-row mt-10">
      <div className="w-[30%] h-full flex flex-col p-4">
        <div className="pb-3">
          <Image
            width={150}
            height={150}
            radius="full"
            classNames={{ img: "rounded-full" }}
            src={infor.avatarString}
            fallbackSrc="https://via.placeholder.com/300x200"
            alt="NextUI Image with fallback"
          />
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Position</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {infor.role}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">UserName</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {infor.username}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Email</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {infor.email}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Contract No</div>
          <div className="text-slate-400 text-lg font-[200] font-mono">
            {infor.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start pl-5 pt-5">
          <div className="font-bold font-serif text-xl">Ardess</div>
          <div className="text-slate-400 text-lg font-[200] font-mono w-44 text-left ">
            {infor.addresses.length != 0
              ? `${infor.addresses[0].state},${infor.addresses[0].city},${infor.addresses[0].country}`
              : "--"}
          </div>
        </div>
      </div>
      <div className="w-[60%] h-full flex flex-col p-4 shadow-md border-slate-300 border-[2px] rounded-lg shadow-slate-300">
        <div className="flex flex-row w-full items-end justify-end">
          <div className="w-1/2 flex flex-row shadow-inner justify-around items-center shadow-slate-300 rounded-xl p-2">
            <User
              className="font-bold font-mono"
              avatarProps={{
                radius: "full",
                size: "lg",
                src: infor.avatarString
                  ? infor.avatarString
                  : "https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-admin-rolls-glyph-black-icon-png-image_691507.jpg",
              }}
              classNames={{
                description: "text-default-500",
              }}
              description={infor.email}
              name={infor.username}
            >
              {infor.email}
            </User>
            <Button
            startContent={<FontAwesomeIcon icon={faImages} style={{"--fa-primary-color": "#1a5bcb", "--fa-secondary-color": "#b61acb",}} />}
              radius="xl"
              className="bg-gradient-to-tr from-pink-500 to-blue-500 text-white shadow-lg"
            >
              Upload
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
