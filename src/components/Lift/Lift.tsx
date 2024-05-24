import { liftState } from "../Controller/Controller";
import constants from "../../constants";
import { Box } from "@chakra-ui/react";
import Floor from "../Floor";
import LiftBox from "../LiftBox";

interface Props {
    liftS: liftState;
    floors: number;
}

// export type liftState = {
//     floor: number;
//     state: number;
//     movement: number;
//     ohc: number;
//     ohcSubState: number;
//     movementSubState: number;
// };

const Lift = ({ liftS, floors }: Props) => {
    const floorArray: number[] = new Array(floors).fill(0);
    return (
        <Box
            position={"relative"}
            height={(constants.floorHeight * floors).toString() + "px"}
            width={constants.floorWidthInPx}
        >
            {floorArray.map((value, index) => {
                return <Floor key={index} floorNumber={floors - index} />;
            })}
            <LiftBox liftS={liftS} floors={floors} />
        </Box>
    );
};

export default Lift;
