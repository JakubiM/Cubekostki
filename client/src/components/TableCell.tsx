import React from "react";
import { Text } from "react-native";

type TableCellProps = {
  placeholder: number;
  value: number | undefined;
};

const TableCell = ({ placeholder, value }: TableCellProps) => {
  return (
    <Text
      style={{
        fontSize: 15,
        fontWeight: "bold",
        color: value != undefined ? "black" : "grey",
      }}
    >
      {value != undefined ? value : placeholder}
    </Text>
  );
};

export default TableCell;
