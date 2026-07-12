import { HStack } from "@chakra-ui/react";
import LiftContainer from "../LiftContainer";
import ButtonsPanel from "../ButtonsPanel";
import { useLiftSystem } from "../../hooks/useLiftSystem";

interface Props {
    floors: number;
    lifts: number;
}

const Controller = ({ floors, lifts }: Props) => {
    const { lifts: liftStates, calls: buttonPanelState, callLift } = useLiftSystem(lifts, floors);

    const updateButtonPanel = (floor: number, upDown: number) => {
        // Map 1-indexed floor from buttons to 0-indexed logical floor
        callLift(floor - 1, upDown);
    };

    return (
        <HStack overflowX={"auto"} spacing={0} align="start" paddingY={5}>
            <ButtonsPanel
                floors={floors}
                buttonPanelState={buttonPanelState}
                updateButtonPanel={updateButtonPanel}
            />
            <LiftContainer
                floors={floors}
                lifts={liftStates}
            />
        </HStack>
    );
};

export default Controller;
