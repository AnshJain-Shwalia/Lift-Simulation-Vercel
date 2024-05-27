import { Stack, VStack } from "@chakra-ui/react";
import ButtonsPanelFloor from "./ButtonsPanelFloor";

interface Props {
    floors: number;
    updateButtonPanel: (floor: number, upDown: number) => void;
}

const ButtonsPanel = ({ floors, updateButtonPanel }: Props) => {
    const floorArr = new Array(floors).fill(0);
    return (
        <Stack spacing={0} direction={"column"} alignSelf={"start"}>
            {floorArr.map((value, index) => {
                return (
                    <ButtonsPanelFloor
                        key={index}
                        floorNumber={floors - index}
                        updateButtonPanel={updateButtonPanel}
                    />
                );
            })}
        </Stack>
    );
};

export default ButtonsPanel;
