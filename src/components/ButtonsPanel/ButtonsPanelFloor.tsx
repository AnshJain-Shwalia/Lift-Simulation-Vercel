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
            width={"70px"}
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
            <Box
                height={"25%"}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Text
                    as={"b"}
                    fontSize={"sm"}
                    color={"black"}
                    overflow={"auto"}
                >
                    Floor {floorNumber}
                </Text>
            </Box>
        </Box>
    );
};

export default ButtonsPanelFloor;
