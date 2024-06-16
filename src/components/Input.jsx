/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <>
      <div className="w-full">
        {label /* if label is given then label will be displayed */ && (
          <label htmlFor={id} className={`inline-block mb-1 pl-1`}>
            {label}
          </label>
        )}
        <input
          type={type}
          value=""
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          id={id}
          ref={ref} /* IMPORTANT */
        />
      </div>
    </>
  );
});

export default Input;
