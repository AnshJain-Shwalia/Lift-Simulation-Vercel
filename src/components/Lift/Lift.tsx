import { Box, Center } from "@chakra-ui/react";
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
                completionSignal={completionSignal}
            />
        </Box>
    );
};

export default Lift;
