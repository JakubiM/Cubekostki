import { Button } from "@react-native-material/core";
import { Image, TouchableOpacity, View } from "react-native";

export type DieProps = {
  dieValue: number;
  selected: boolean;
  onClick: any;
};

export default function Die(props: DieProps) {
  const DiceImage = [
    require("../../assets/dice/dice1.png"),
    require("../../assets/dice/dice2.png"),
    require("../../assets/dice/dice3.png"),
    require("../../assets/dice/dice4.png"),
    require("../../assets/dice/dice5.png"),
    require("../../assets/dice/dice6.png"),
  ];

  const getDiceImage = () => (
    <Image
      source={DiceImage[props.dieValue - 1]}
      style={{
        width: 50,
        height: 50,
        tintColor: props.selected ? "black" : "grey",
      }}
    />
  );

  return (
    <TouchableOpacity onPress={props.onClick}>
      {getDiceImage()}
    </TouchableOpacity>
  );
}
