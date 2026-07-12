import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import constants from "../../constants";

interface Props {
    action: number;
    floor: number;
    subaction: number;
    completionSignal: () => void;
    totalFloors: number;
}

const LiftBox = React.memo(
    ({ action, floor, subaction, totalFloors, completionSignal }: Props) => {
        const getTopPosition = (f: number) =>
            (totalFloors - f + 1) * constants.floorHeight - constants.liftHeight;

        // Determine top position and vertical transition duration
        let topTarget = getTopPosition(floor);
        let topInitial = getTopPosition(floor);
        let verticalDuration = 0;

        if (action === 0) {
            if (subaction === 1) {
                // Moving up
                topInitial = getTopPosition(floor);
                topTarget = getTopPosition(floor + 1);
                verticalDuration = constants.liftPerFloorMovementTimeInSec;
            } else if (subaction === 2) {
                // Moving down
                topInitial = getTopPosition(floor);
                topTarget = getTopPosition(floor - 1);
                verticalDuration = constants.liftPerFloorMovementTimeInSec;
            }
        }

        // Determine door animation parameters
        let doorTargetWidth = constants.liftWidth / 2 - 2; // Subtract border spacing
        let doorInitialWidth = constants.liftWidth / 2 - 2;
        let doorDuration = 0;

        if (action === 1) {
            if (subaction === 1) {
                // Opening
                doorInitialWidth = constants.liftWidth / 2 - 2;
                doorTargetWidth = 0;
                doorDuration = constants.liftOpeningTimeInSec;
            } else if (subaction === 2) {
                // Open (Hold)
                doorInitialWidth = 0;
                doorTargetWidth = 0;
                doorDuration = constants.liftHoldingTimeInSec;
            } else if (subaction === 3) {
                // Closing
                doorInitialWidth = 0;
                doorTargetWidth = constants.liftWidth / 2 - 2;
                doorDuration = constants.liftOpeningTimeInSec;
            }
        }

        // Handle timeouts and immediate transitions for static states
        useEffect(() => {
            if (action === 1 && subaction === 2) {
                // Open hold state - wait for hold time
                const timer = setTimeout(() => {
                    completionSignal();
                }, constants.liftHoldingTimeInSec * 1000);
                return () => clearTimeout(timer);
            } else if (
                (action === 0 && subaction === 0) ||
                (action === 1 && subaction === 0)
            ) {
                // Static states - complete immediately to trigger state checks
                completionSignal();
            }
        }, [action, subaction, completionSignal]);

        const handleParentAnimationComplete = () => {
            if (action === 0 && (subaction === 1 || subaction === 2)) {
                completionSignal();
            }
        };

        const handleDoorAnimationComplete = () => {
            if (action === 1 && (subaction === 1 || subaction === 3)) {
                completionSignal();
            }
        };

        // Determine direction arrow
        const directionText =
            action === 0 && subaction === 1
                ? "▲"
                : action === 0 && subaction === 2
                ? "▼"
                : "▬";

        return (
            <motion.div
                initial={{
                    top: topInitial,
                }}
                animate={{
                    top: topTarget,
                }}
                transition={{
                    duration: verticalDuration,
                    ease: "linear",
                }}
                onAnimationComplete={handleParentAnimationComplete}
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
                        {floor}
                    </Text>
                    <Text
                        fontSize="xs"
                        fontFamily="monospace"
                        color={directionText !== "▬" ? "#00E5FF" : "gray.500"}
                        textShadow={directionText !== "▬" ? "0 0 6px rgba(0, 229, 255, 0.8)" : "none"}
                        mt={-1}
                    >
                        {directionText}
                    </Text>
                </Flex>

                {/* Left Sliding Door */}
                <motion.div
                    initial={{ width: doorInitialWidth }}
                    animate={{ width: doorTargetWidth }}
                    transition={{
                        duration: doorDuration,
                        ease: "easeInOut",
                    }}
                    onAnimationComplete={handleDoorAnimationComplete}
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
                    initial={{ width: doorInitialWidth }}
                    animate={{ width: doorTargetWidth }}
                    transition={{
                        duration: doorDuration,
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
    }
);

export default LiftBox;
