import {
    Button,
    Collapse,
    HStack,
    Heading,
    Input,
    Stack,
    useDisclosure,
    useNumberInput,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface Props {
    setValues: (floors: number, lifts: number) => void;
}

const InputBarMobile = ({ setValues }: Props) => {
    const floorRef = useRef<HTMLInputElement>(null);
    const liftRef = useRef<HTMLInputElement>(null);
    const { isOpen, onToggle } = useDisclosure();

    const onClick = () => {
        setValues(
            parseInt(floorRef.current?.value as string),
            parseInt(liftRef.current?.value as string)
        );
        onToggle();
    };
    const {
        getInputProps: getInputPropsf,
        getIncrementButtonProps: getIncrementButtonPropsf,
        getDecrementButtonProps: getDecrementButtonPropsf,
    } = useNumberInput({
        step: 1,
        defaultValue: 3,
        min: 2,
        max: 30,
        precision: 0,
    });

    const incf = getIncrementButtonPropsf();
    const decf = getDecrementButtonPropsf();
    const inputf = getInputPropsf();

    const {
        getInputProps: getInputPropsl,
        getIncrementButtonProps: getIncrementButtonPropsl,
        getDecrementButtonProps: getDecrementButtonPropsl,
    } = useNumberInput({
        step: 1,
        defaultValue: 3,
        min: 2,
        max: 11,
        precision: 0,
    });

    const incl = getIncrementButtonPropsl();
    const decl = getDecrementButtonPropsl();
    const inputl = getInputPropsl();

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button onClick={onToggle}>Change Values.</Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                <Collapse
                    in={!isOpen}
                    transition={{
                        enter: { duration: 0.5, ease: "easeInOut" },
                        exit: { duration: 0.5, ease: "easeInOut" },
                    }}
                    animateOpacity
                >
                    <Stack spacing={6} paddingY={5}>
                        <Heading size={{ base: "sm", md: "md" }}>
                            Number of Floors.
                        </Heading>
                        <HStack>
                            <Button {...incf}>+</Button>
                            <Input
                                {...inputf}
                                fontWeight={"semibold"}
                                ref={floorRef}
                            />
                            <Button {...decf}>-</Button>
                        </HStack>
                        <Heading size={{ base: "sm", md: "md" }}>
                            Number of Lifts.
                        </Heading>
                        <HStack>
                            <Button {...incl}>+</Button>
                            <Input
                                {...inputl}
                                fontWeight={"semibold"}
                                ref={liftRef}
                            />
                            <Button {...decl}>-</Button>
                        </HStack>
                        <Button
                            width={{ base: "50%", md: "100%" }}
                            alignSelf={"center"}
                            onClick={onClick}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Collapse>
            </AnimatePresence>
        </>
    );
};

export default InputBarMobile;
