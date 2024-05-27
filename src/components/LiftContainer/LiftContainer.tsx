import { Box, Button, HStack } from "@chakra-ui/react";
import ButtonsPanel from "../ButtonsPanel";
import Lift from "../Lift/Lift";
import { useState } from "react";

interface Props {
    floors: number;
}

const LiftContainer = ({ floors }: Props) => {
    const [animation, setAnimation] = useState({
        action: 0,
        floor: 1,
        subaction: 1,
    });
    return (
        <>
            {/* <Button
                onClick={() => {
                    setAnimation({ action: 1, floor: 1, subaction: 1 });
                }}
            /> */}
            <HStack wrap={"wrap"}>
                <Lift
                    action={animation.action}
                    floor={animation.floor}
                    subaction={animation.subaction}
                    totalFloors={floors}
                />
            </HStack>
        </>
    );
};

export default LiftContainer;
