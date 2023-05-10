import React from "react";

const Error = ({ messages }) => {
  console.log(messages);
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-red-800">
        Something went wrong
      </strong>

      <ul>
        {messages.map((message) => (
          <ul className="mt-2 text-sm text-red-700" key={message}>
            {message}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Error;
