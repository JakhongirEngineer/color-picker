import React from "react";

import { SortableContainer } from "react-sortable-hoc";

import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => {
        return (
          <DraggableColorBox
            index={i}
            color={color.color}
            name={color.name}
            deleteColor={deleteColor}
          />
        );
      })}
    </div>
  );
});

export default DraggableColorList;
