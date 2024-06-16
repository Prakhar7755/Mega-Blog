/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
        {...props}
      >
        {children} {/* children contains all the text inside of button */}
      </button>
    </>
  );
};

export default Button;
