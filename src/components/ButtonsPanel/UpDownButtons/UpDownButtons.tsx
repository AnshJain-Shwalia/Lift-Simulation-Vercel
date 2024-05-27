import { Button, Stack } from "@chakra-ui/react";

interface Props {
    updateButtonPanel: (upDown: number) => void;
}

const UpDownButtons = ({ updateButtonPanel }: Props) => {
    return (
        <Stack>
            <Button
                width={"100%"}
                height={"50%"}
                onClick={() => {
                    updateButtonPanel(1);
                }}
            >
                Up
            </Button>
            <Button
                width={"100%"}
                height={"50%"}
                onClick={() => {
                    updateButtonPanel(0);
                }}
            >
                Down
            </Button>
        </Stack>
    );
};

export default UpDownButtons;
