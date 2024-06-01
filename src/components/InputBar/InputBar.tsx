import {
    Button,
    Heading,
    Hide,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Show,
    Stack,
} from "@chakra-ui/react";
import { useRef } from "react";
import InputBarMobile from "./InputBarMobile";

interface Props {
    setValues: (floors: number, lifts: number) => void;
}

const InputBar = ({ setValues }: Props) => {
    const floorRef = useRef<HTMLInputElement>(null);
    const liftRef = useRef<HTMLInputElement>(null);

    const onClick = () => {
        setValues(
            parseInt(floorRef.current?.value as string),
            parseInt(liftRef.current?.value as string)
        );
    };

    return (
        <>
            <Stack spacing={6} paddingY={5}>
                <Show above="md">
                    <Stack>
                        <Heading size={{ base: "sm", md: "md" }}>
                            Number of Floors.
                        </Heading>
                        <NumberInput
                            variant={"filled"}
                            defaultValue={3}
                            min={2}
                            max={30}
                        >
                            <NumberInputField ref={floorRef} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                    <Stack>
                        <Heading size={{ base: "sm", md: "md" }}>
                            Number of Lifts.
                        </Heading>
                        <NumberInput
                            defaultValue={3}
                            min={2}
                            max={11}
                            variant={"filled"}
                        >
                            <NumberInputField ref={liftRef} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                    <Button
                        width={{ base: "50%", md: "100%" }}
                        alignSelf={"center"}
                        onClick={onClick}
                    >
                        Submit
                    </Button>
                </Show>
                <Hide above="md">
                    <InputBarMobile setValues={setValues} />
                </Hide>
            </Stack>
        </>
    );
};

export default InputBar;
