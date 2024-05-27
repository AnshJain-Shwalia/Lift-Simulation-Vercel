import { Box, Center } from "@chakra-ui/react";
import constants from "../../constants";
import LiftBox from "../LiftBox";

interface Props {
    action: number;
    floor: number;
    subaction: number;
    // signal: someFunction
    totalFloors: number;
}

const Lift = ({ action, floor, subaction, totalFloors }: Props) => {
    return (
        <Box
            position={"relative"}
            width={constants.floorWidthInPx}
            height={(constants.floorHeight * totalFloors).toString() + "px"}
        >
            <LiftBox
                action={action}
                subaction={subaction}
                floor={floor}
                totalFloors={totalFloors}
            />
        </Box>
    );
};

export default Lift;
