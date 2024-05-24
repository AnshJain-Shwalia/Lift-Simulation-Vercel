import { Stack, VStack } from "@chakra-ui/react";
import ButtonsPanelFloor from "./ButtonsPanelFloor";

interface Props {
    floors: number;
}

const ButtonsPanel = ({ floors }: Props) => {
    const floorArr = new Array(floors).fill(0);
    return (
        <Stack spacing={0} direction={"column"} alignSelf={"start"}>
            {floorArr.map((value, index) => {
                return (
                    <ButtonsPanelFloor
                        key={index}
                        floorNumber={floors - index}
                    />
                );
            })}
        </Stack>
    );
};

export default ButtonsPanel;
