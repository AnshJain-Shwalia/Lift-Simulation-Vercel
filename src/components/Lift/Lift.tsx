import { Box } from "@chakra-ui/react";
import constants from "../../constants";
import LiftBox from "../LiftBox";

interface Props {
    action: number;
    floor: number;
    subaction: number;
    completionSignal: () => void;
    totalFloors: number;
}

const Lift = ({
    action,
    floor,
    subaction,
    totalFloors,
    completionSignal,
}: Props) => {
    // Array of size totalFloors to map out the horizontal floor markers
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
                action={action}
                subaction={subaction}
                floor={floor}
                totalFloors={totalFloors}
                completionSignal={completionSignal}
            />
        </Box>
    );
};

export default Lift;
