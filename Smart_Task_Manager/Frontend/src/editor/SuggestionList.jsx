import React, { forwardRef, useImperativeHandle, useState } from "react";

const SuggestionList = forwardRef((props, ref) => {
  const [index, setIndex] = useState(0);

  const selectItem = (i) => {
    const item = props.items[i];
    if (item) props.command({ id: item.id, label: item.name });
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowDown") {
        setIndex((prev) => (prev + 1) % props.items.length);
        return true;
      }

      if (event.key === "ArrowUp") {
        setIndex((prev) =>
          (prev - 1 + props.items.length) % props.items.length
        );
        return true;
      }

      if (event.key === "Enter") {
        selectItem(index);
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="bg-white border shadow rounded w-52">
      {props.items.map((item, i) => (
        <div
          key={item.id}
          onClick={() => selectItem(i)}
          className={`p-2 cursor-pointer ${
            i === index ? "bg-gray-200" : ""
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});

export default SuggestionList;