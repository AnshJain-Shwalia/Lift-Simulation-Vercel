import { motion } from "framer-motion";
import React from "react";
import constants from "../../constants";

interface Props {
    action: number;
    floor: number;
    subaction: number;
    // signal: someSortOfFunction;
    totalFloors: number;
}

const LiftBox = React.memo(
    ({ action, floor, subaction, totalFloors }: Props) => {
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
                        transition={{ duration: constants.liftOpeningTime }}
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
                        transition={{ duration: constants.liftHoldingTime }}
                        onAnimationComplete={() => {
                            setTimeout(() => {},
                            constants.liftHoldingTime * 1000);
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
                        transition={{ duration: constants.liftOpeningTime }}
                    ></motion.div>
                );
            }
        }
    }
);

export default LiftBox;
