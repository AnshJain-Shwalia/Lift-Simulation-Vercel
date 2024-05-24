import { Box, HStack } from "@chakra-ui/react";
import { liftState } from "../Controller/Controller";
import Lift from "../Lift/Lift";
import ButtonsPanel from "../ButtonsPanel";

interface Props {
    liftStates: liftState[];
    floors: number;
}

const LiftContainer = ({ liftStates, floors }: Props) => {
    return (
        <HStack>
            <ButtonsPanel floors={floors} />
            <HStack spacing={1} wrap={"wrap"}>
                {liftStates.map((value, index) => (
                    <Lift liftS={value} key={index} floors={floors} />
                ))}
            </HStack>
        </HStack>
    );
};

export default LiftContainer;
