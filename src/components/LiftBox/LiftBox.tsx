import { Box } from "@chakra-ui/react";
import { liftState } from "../Controller/Controller";
import constants from "../../constants";

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

const calculateTop = (liftS: liftState, floors: number): string => {
    let pos =
        (floors - liftS.floor + 1) * constants.floorHeight -
        constants.liftHeight -
        liftS.movementSubState *
            (constants.floorHeight / constants.liftVerticalFramesTotal);
    return pos.toString() + "px";
};

const calculateWidth = (liftS: liftState): string => {
    if (liftS.ohc === 0) {
        return constants.liftWidthInPx;
    }
    if (liftS.ohc === 2) {
        return "0px";
    }
    return (
        (
            (constants.liftOpeningFramesTotal - liftS.ohcSubState) *
            (constants.liftWidth / constants.liftOpeningFramesTotal)
        ).toString() + "px"
    );
};

const LiftBox = ({ liftS, floors }: Props) => {
    return (
        <Box
            position={"absolute"}
            top={calculateTop(liftS, floors)}
            left={constants.liftLeftOffSetInPx}
        >
            <Box
                bgColor={"red"}
                width={calculateWidth(liftS)}
                height={constants.liftHeightInPx}
            ></Box>
        </Box>
    );
};

export default LiftBox;
