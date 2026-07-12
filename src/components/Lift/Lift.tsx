import { Box } from "@chakra-ui/react";
import constants from "../../constants";
import LiftBox from "../LiftBox";

interface Props {
    currentFloor: number;
    doorState: "CLOSED" | "OPENING" | "OPEN" | "CLOSING";
    direction: "UP" | "DOWN" | "IDLE";
    totalFloors: number;
}

const Lift = ({
    currentFloor,
    doorState,
    direction,
    totalFloors,
}: Props) => {
    const floorLines = Array.from({ length: totalFloors });

    return (
        <Box
            position={"relative"}
            width={constants.floorWidthInPx}
            height={(constants.floorHeight * totalFloors).toString() + "px"}
            borderLeft={"1px dashed rgba(255, 255, 255, 0.15)"}
            borderRight={"1px dashed rgba(255, 255, 255, 0.15)"}
            backgroundColor={"rgba(10, 10, 15, 0.25)"}
            overflow="hidden"
        >
            {/* Horizontal floor grid lines to represent levels in the shaft */}
            {floorLines.map((_, i) => (
                <Box
                    key={i}
                    position="absolute"
                    top={(i * constants.floorHeight).toString() + "px"}
                    width="100%"
                    height="1px"
                    backgroundColor="rgba(255, 255, 255, 0.08)"
                />
            ))}

            <LiftBox
                currentFloor={currentFloor}
                doorState={doorState}
                direction={direction}
                totalFloors={totalFloors}
            />
        </Box>
    );
};

export default Lift;
