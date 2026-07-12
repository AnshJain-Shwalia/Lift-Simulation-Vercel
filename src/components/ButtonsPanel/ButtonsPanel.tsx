import { Stack } from "@chakra-ui/react";
import ButtonsPanelFloor from "./ButtonsPanelFloor";

interface Props {
    floors: number;
    buttonPanelState: boolean[][];
    updateButtonPanel: (floor: number, upDown: number) => void;
}

const ButtonsPanel = ({ floors, buttonPanelState, updateButtonPanel }: Props) => {
    const floorArr = new Array(floors).fill(0);
    return (
        <Stack spacing={0} direction={"column"} alignSelf={"start"}>
            {floorArr.map((_, index) => {
                const floorIdx = floors - index - 1; // 0-indexed floor
                return (
                    <ButtonsPanelFloor
                        key={index}
                        floorNumber={floors - index}
                        isActiveUp={buttonPanelState[floorIdx]?.[1] ?? false}
                        isActiveDown={buttonPanelState[floorIdx]?.[0] ?? false}
                        updateButtonPanel={updateButtonPanel}
                    />
                );
            })}
        </Stack>
    );
};

export default ButtonsPanel;
