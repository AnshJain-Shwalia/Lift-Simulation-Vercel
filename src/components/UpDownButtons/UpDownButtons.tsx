import { Button, Stack } from "@chakra-ui/react";

const UpDownButtons = () => {
    return (
        <Stack>
            <Button width={"100%"} height={"50%"}>
                Up
            </Button>
            <Button width={"100%"} height={"50%"}>
                Down
            </Button>
        </Stack>
    );
};

export default UpDownButtons;
