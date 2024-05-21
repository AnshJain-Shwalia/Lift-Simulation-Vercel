import {
    Button,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
} from "@chakra-ui/react";
import { useRef } from "react";

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
        <Stack spacing={6} paddingY={5}>
            <Stack>
                <Heading size={"md"}>Number of Floors.</Heading>
                <NumberInput
                    variant={"filled"}
                    defaultValue={3}
                    min={2}
                    max={7}
                >
                    <NumberInputField ref={floorRef} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Stack>
            <Stack>
                <Heading size={"md"}>Number of Lifts.</Heading>
                <NumberInput
                    defaultValue={3}
                    min={2}
                    max={5}
                    variant={"filled"}
                >
                    <NumberInputField ref={liftRef} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Stack>
            <Button onClick={onClick}>Submit</Button>
        </Stack>
    );
};

export default InputBar;
