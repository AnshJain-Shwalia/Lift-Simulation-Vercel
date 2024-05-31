import { IconButton, Stack } from "@chakra-ui/react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

interface Props {
    updateButtonPanel: (upDown: number) => void;
}

const UpDownButtons = ({ updateButtonPanel }: Props) => {
    return (
        <Stack spacing={1} direction="column" align="stretch" height={"100%"}>
            {/* <Button
                height={"50%"}
                onClick={() => {
                    updateButtonPanel(1);
                }}
                margin={0}
                padding={0}
                border={0}
            >
                <FaArrowCircleUp />
            </Button> */}
            <IconButton
                aria-label="Up button."
                icon={<FaArrowCircleUp />}
                height={"50%"}
                size="lg"
                colorScheme="black"
                onClick={() => updateButtonPanel(1)}
            />
            <IconButton
                aria-label="Up button."
                icon={<FaArrowCircleDown />}
                height={"50%"}
                size="lg"
                colorScheme="black"
                onClick={() => updateButtonPanel(0)}
            />
        </Stack>
    );
};

export default UpDownButtons;
