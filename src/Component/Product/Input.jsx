import React from 'react'
import { Find } from './Find'
import {Input} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const InputFind = () => {
  return (
    <Input
          type="email"
          className='border-2 border-slate-300 rounded-xl pl-2'
          placeholder="Search:Name product"
          labelPlacement="outside"
          startContent={
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          }
        />
  )
}

export default InputFind
