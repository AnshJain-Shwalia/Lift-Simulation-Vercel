import { HStack } from "@chakra-ui/react";
import Lift from "../Lift/Lift";
import { useState } from "react";
import { liftState } from "../Controller/Controller";
import { liftState2AR } from "./liftAnimationControl";
import { signalReceiver } from "./signalReceiver";

interface Props {
    floors: number;
    liftStates: liftState[];
    updateLiftState: (newLS: liftState, index: number) => void;
}

const LiftContainer = ({ floors, liftStates, updateLiftState }: Props) => {
    return (
        <HStack wrap={"wrap"}>
            {liftStates.map((value, index) => {
                let RA = liftState2AR(value);
                let newValue = { ...value, perLiftButtonPanelState: null };
                let item =
                    value.state === 0 ? value.perLiftButtonPanelState : null;
                return (
                    <Lift
                        action={RA.action}
                        floor={RA.floor}
                        subaction={RA.subaction}
                        totalFloors={floors}
                        completionSignal={() => {
                            signalReceiver(value, (newLS: liftState) => {
                                updateLiftState(newLS, index);
                            });
                        }}
                        key={
                            JSON.stringify(newValue) +
                            JSON.stringify(index) +
                            JSON.stringify(item)
                        }
                    />
                );
            })}
        </HStack>
    );
};

export default LiftContainer;
