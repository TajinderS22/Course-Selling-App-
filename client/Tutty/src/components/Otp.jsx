/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";

const Otp = ({ number }) => {
  const [isEnabled, setisEnabled] = useState(false);
  const ref = useRef(Array(number).fill(0));
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex justify-center p-6">
        {Array(number)
          .fill(1)
          .map((x, index) => {
            return (
              <OtpSubBox
                key={index}
                reference={(e) => (ref.current[index] = e)}
                onDone={() => {
                  if (index + 1 >= number) return;
                  if (index == number) setisEnabled(true);
                  ref.current[index + 1].focus();
                }}
                onBack={() => {
                  if (index == 0) return;
                  const newValue = [...value];
                  if (newValue[index] != "") {
                    if (index <= number) setisEnabled(false);
                    ref.current[index].focus();
                  } else {
                    ref.current[index - 1].focus();
                  }
                }}
                value={value}
                setValue={setValue}
                index={index}
                inputvalue=""
              />
            );
          })}
      </div>
      <button
        className={`btn rounded-md px-6 ${
          isEnabled ? "btn-primary" : "btn-secondary cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

const OtpSubBox = ({ reference, onDone, onBack, value, setValue, index }) => {
  return (
    <input
      type="text"
      ref={reference}
      className="input-base mx-1.5 h-[50px] w-[44px] bg-primary-soft text-center text-lg font-bold text-ink"
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
          const newValue = [...value];
          newValue[index] = "";
          setValue(newValue);
        }
      }}
    />
  );
};

export default Otp;
