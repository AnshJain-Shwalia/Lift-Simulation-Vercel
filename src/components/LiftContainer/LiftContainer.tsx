import { Box, HStack } from "@chakra-ui/react";
import { liftState } from "../Controller/Controller";
import ButtonsPanel from "../ButtonsPanel";

interface Props {
    liftStates: liftState[];
    floors: number;
}

const LiftContainer = ({ liftStates, floors }: Props) => {
    return (
        <HStack>
            <ButtonsPanel floors={floors} />
        </HStack>
    );
};

export default LiftContainer;
