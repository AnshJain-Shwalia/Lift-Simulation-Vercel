import { Box, Text } from "@chakra-ui/react";
import constants from "../../constants";
import UpDownButtons from "./UpDownButtons";

interface Props {
    floorNumber: number;
    isActiveUp: boolean;
    isActiveDown: boolean;
    updateButtonPanel: (floor: number, upDown: number) => void;
}

const ButtonsPanelFloor = ({
    floorNumber,
    isActiveUp,
    isActiveDown,
    updateButtonPanel,
}: Props) => {
    return (
        <Box
            width={"80px"}
            height={constants.floorHeight}
            borderBottom={"1px solid rgba(255, 255, 255, 0.08)"}
            borderRight={"2px solid rgba(255, 255, 255, 0.15)"}
            backgroundColor={"rgba(20, 20, 20, 0.85)"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            paddingY={2}
        >
            <Box height={"10%"} />
            <Box width="100%" px={2}>
                <UpDownButtons
                    isActiveUp={isActiveUp}
                    isActiveDown={isActiveDown}
                    updateButtonPanel={(upDown: number) => {
                        updateButtonPanel(floorNumber, upDown);
                    }}
                />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Text
                    as={"b"}
                    fontSize={"2xs"}
                    color={"gray.400"}
                    letterSpacing="wide"
                    textTransform="uppercase"
                >
                    Floor {floorNumber}
                </Text>
            </Box>
        </Box>
    );
};

export default ButtonsPanelFloor;
