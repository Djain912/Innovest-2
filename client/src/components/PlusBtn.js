import React from 'react';
import '../Css/PlusBtn.css';
import { AiFillPlusCircle } from "react-icons/ai";
const PlusBtn = () => {
  return (
    <div className='Plus'>
      <AiFillPlusCircle onClick='' className='addbtn'></AiFillPlusCircle>
    </div>
  )
};

export default PlusBtn;
