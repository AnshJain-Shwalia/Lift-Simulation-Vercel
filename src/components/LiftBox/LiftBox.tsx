import { motion } from "framer-motion";
import React from "react";
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
        console.log(action, floor, subaction, totalFloors);
        if (action === 0) {
            if (subaction === 0) {
                // return a closed stationary lift at floor
                return (
                    <motion.div
                        animate={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        initial={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{ duration: 0 }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            } else if (subaction === 1) {
                // return a lift that is moving up from the floor
                return (
                    <motion.div
                        initial={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        animate={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - (floor + 1) + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{
                            duration: constants.liftPerFloorMovementTimeInSec,
                            ease: "linear",
                        }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            } else {
                // return a lift that is going down one level from floor
                return (
                    <motion.div
                        initial={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        animate={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - (floor - 1) + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{
                            duration: constants.liftPerFloorMovementTimeInSec,
                            ease: "linear",
                        }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            }
        } else if (action === 1) {
            if (subaction === 0) {
                // return a lift that is closed at the floor
                return (
                    <motion.div
                        animate={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        initial={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{ duration: 0 }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            } else if (subaction === 1) {
                // return a lift that is opening at the floor
                return (
                    <motion.div
                        animate={{
                            height: constants.liftHeight,
                            width: 0,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        initial={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{
                            duration: constants.liftOpeningTimeInSec,
                        }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            } else if (subaction === 2) {
                // return a lift that has open doors.
                return (
                    <motion.div
                        animate={{
                            height: constants.liftHeight,
                            width: 0,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        initial={{
                            height: constants.liftHeight,
                            width: 0,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{
                            duration: constants.liftHoldingTimeInSec,
                        }}
                        onAnimationComplete={() => {
                            setTimeout(
                                completionSignal,
                                constants.liftHoldingTimeInSec * 1000
                            );
                        }}
                    ></motion.div>
                );
            } else {
                // return a lift at floor that is closing.
                return (
                    <motion.div
                        animate={{
                            height: constants.liftHeight,
                            width: constants.liftWidth,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        initial={{
                            height: constants.liftHeight,
                            width: 0,
                            backgroundColor: "red",
                            top:
                                (totalFloors - floor + 1) *
                                    constants.floorHeight -
                                constants.liftHeight,
                            left: constants.liftLeftOffSet,
                            position: "absolute",
                        }}
                        transition={{
                            duration: constants.liftOpeningTimeInSec,
                        }}
                        onAnimationComplete={completionSignal}
                    ></motion.div>
                );
            }
        } else {
            console.log("Problem in LiftBox.tsx");
            return <h1>Helo, worudo!</h1>;
        }
    }
);

export default LiftBox;
