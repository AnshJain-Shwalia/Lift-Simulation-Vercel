import { HStack } from "@chakra-ui/react";
import Lift from "../Lift/Lift";
import { Lift as LiftType } from "../../hooks/useLiftSystem";

interface Props {
    floors: number;
    lifts: LiftType[];
}

const LiftContainer = ({ floors, lifts }: Props) => {
    return (
        <HStack>
            {lifts.map((lift) => (
                <Lift
                    key={lift.id}
                    currentFloor={lift.currentFloor}
                    doorState={lift.doorState}
                    direction={lift.direction}
                    totalFloors={floors}
                />
            ))}
        </HStack>
    );
};

export default LiftContainer;
