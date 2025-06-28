/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'

const Otp = ({number}) => {

    const [isEnabled,setisEnabled]=useState(false)
    const ref=useRef(Array(number).fill(0))
    const [value,setValue]=useState("")
    const inputvalue=''
    console.log(value)
  return (
    <div className='flex justify-center p-6'>

        <div className='flex justify-center p-6'>
        {
            Array(number).fill(1).map((x,index)=>{
               return(
                <OtpSubBox 
                    key={index}
                    reference={(e)=> ref.current[index]=e} 
                    onDone={()=>{
                        if(index+1>=number) return
                        if(index==number) setisEnabled(true)
                        ref.current[index+1].focus()

                    }}
                    onBack={()=>{
                        if(index==0) return
                        const newValue = [...value];
                        if(newValue[index]!=""){
                            if(index<=number) setisEnabled(false)
                            ref.current[index].focus(); 
                        }else{
                            ref.current[index-1].focus()
                            
                        }
                    }}
                    value={value}
                    setValue={setValue}
                    index={index}
                    inputvalue={inputvalue}
                />
               )
            })
        }

        </div>
        {isEnabled?
        <div className=' bg-amber-400 text-amber-900 '>
            <button>Submit</button>
        </div>
        :
        <div className=' bg-amber-200 text-amber-900 '>
            <button>Submit</button>
        </div>
        }
        
    </div>
  )
}

const OtpSubBox = ({ reference, onDone, onBack, value, setValue, index }) => {
    return (
        <input
            type="text"
            ref={reference}
            className="w-[40px] h-[50px] bg-amber-700/10 p-4 rounded-xl m-2 text-amber-950 text-center"
            maxLength={1}
            value={value[index] || ""}
            onKeyDown={(e) => {
                if (e.key === "Backspace") {
                    const newValue = [...value];
                    newValue[index] = "";
                    setValue(newValue);
                    onBack();
                }
            }}
            onChange={(e) => {
                const val = e.target.value;

                if (/^\d$/.test(val)) {
                    const newValue = [...value];
                    newValue[index] = val;
                    setValue(newValue);
                    onDone();
                } else {
                    // Prevent invalid char from sticking
                    const newValue = [...value];
                    newValue[index] = "";
                    setValue(newValue);
                }
            }}
        />
    );
};


export default Otp