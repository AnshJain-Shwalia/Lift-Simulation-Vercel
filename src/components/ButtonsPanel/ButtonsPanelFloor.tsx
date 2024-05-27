import { Box, Text } from "@chakra-ui/react";
import constants from "../../constants";
import UpDownButtons from "./UpDownButtons";

interface Props {
    floorNumber: number;
    updateButtonPanel: (floor: number, upDown: number) => void;
}

const ButtonsPanelFloor = ({ floorNumber, updateButtonPanel }: Props) => {
    return (
        <Box
            width={"100px"}
            height={constants.floorHeight}
            backgroundColor={"burlywood"}
        >
            <Box height={"25%"}></Box>
            <Box height={"50%"}>
                <UpDownButtons
                    updateButtonPanel={(upDown: number) => {
                        updateButtonPanel(floorNumber, upDown);
                    }}
                />
            </Box>
            <Box height={"25%"} textAlign={"center"}>
                <Text fontSize={"xs"}>floor {floorNumber}</Text>
            </Box>
        </Box>
    );
};

export default ButtonsPanelFloor;
