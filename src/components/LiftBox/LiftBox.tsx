import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import constants from "../../constants";

interface Props {
    currentFloor: number;
    doorState: "CLOSED" | "OPENING" | "OPEN" | "CLOSING";
    direction: "UP" | "DOWN" | "IDLE";
    totalFloors: number;
}

const LiftBox = React.memo(({ currentFloor, doorState, direction, totalFloors }: Props) => {
    // 0-indexed top position calculation
    const topPosition = (totalFloors - 1 - currentFloor) * constants.floorHeight;

    // Door width determined by doorState directly
    const doorTargetWidth = (doorState === "OPEN" || doorState === "OPENING") 
        ? 0 
        : constants.liftWidth / 2 - 2;

    const directionText =
        direction === "UP"
            ? "▲"
            : direction === "DOWN"
            ? "▼"
            : "▬";

    return (
        <motion.div
            animate={{
                top: topPosition,
            }}
            transition={{
                duration: constants.liftPerFloorMovementTimeInSec,
                ease: "linear",
            }}
            style={{
                height: constants.liftHeight,
                width: constants.liftWidth,
                position: "absolute",
                left: constants.liftLeftOffSet,
                borderRadius: "6px",
                border: "2px solid #00E5FF",
                boxShadow: "0 0 12px rgba(0, 229, 255, 0.4)",
                background: "linear-gradient(135deg, #15161e 0%, #0d0e12 100%)",
                overflow: "hidden",
            }}
        >
            {/* Cabin LED Screen / Display */}
            <Flex
                direction="column"
                justify="center"
                align="center"
                height="100%"
                width="100%"
                position="absolute"
                zIndex={1}
            >
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                    fontFamily="monospace"
                    color="#00E5FF"
                    textShadow="0 0 8px rgba(0, 229, 255, 0.8)"
                >
                    {currentFloor + 1}
                </Text>
                <Text
                    fontSize="xs"
                    fontFamily="monospace"
                    color={direction !== "IDLE" ? "#00E5FF" : "gray.500"}
                    textShadow={direction !== "IDLE" ? "0 0 6px rgba(0, 229, 255, 0.8)" : "none"}
                    mt={-1}
                >
                    {directionText}
                </Text>
            </Flex>

            {/* Left Sliding Door */}
            <motion.div
                animate={{ width: doorTargetWidth }}
                transition={{
                    duration: constants.liftOpeningTimeInSec,
                    ease: "easeInOut",
                }}
                style={{
                    height: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    backgroundColor: "#3a3c4a",
                    borderRight: "1px solid #1a1b23",
                    background: "linear-gradient(90deg, #4b4d5e 0%, #2f313d 100%)",
                    boxShadow: "inset -2px 0 5px rgba(0,0,0,0.4)",
                    zIndex: 2,
                }}
            />

            {/* Right Sliding Door */}
            <motion.div
                animate={{ width: doorTargetWidth }}
                transition={{
                    duration: constants.liftOpeningTimeInSec,
                    ease: "easeInOut",
                }}
                style={{
                    height: "100%",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    backgroundColor: "#3a3c4a",
                    borderLeft: "1px solid #1a1b23",
                    background: "linear-gradient(270deg, #4b4d5e 0%, #2f313d 100%)",
                    boxShadow: "inset 2px 0 5px rgba(0,0,0,0.4)",
                    zIndex: 2,
                }}
            />
        </motion.div>
    );
});

export default LiftBox;
