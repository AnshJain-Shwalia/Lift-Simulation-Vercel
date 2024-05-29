import { useEffect, useState } from "react";
import LiftContainer from "../LiftContainer";
import MyComponent from "../tester/tester";
import ButtonsPanel from "../ButtonsPanel";
import { Button, HStack } from "@chakra-ui/react";

interface Props {
    floors: number;
    lifts: number;
}

// export type liftState = {
//     floor: number;
//     state: number;
//     movement: number;
//     ohc: number;
//     ohcSubState: number;
//     movementSubState: number;
//     busy: boolean;
// };
// state=> 0> stationary 1> moving 2> opening and closing doors
// movement=> 0> not moving in either direction 1> moving up -1> moving down
// ohc=> 0> closed 1>opening 2> hold 3> closing
// floor=> what floor the lift is on, this can be b/w 1 and whatever the maximum floor is.
// ohcSubState=> this represents the state of the doors of the lift,
//               for every frame of the animation there is a state
//               0-> closed and constants.liftOpeningFramesTotal-1 as closed,
//               in b/w 0 and constants.liftOpeningFramesTotal-1 are the intermediary frames

// movementSubState=> this represents the state of the lift's movement in the vertical direction.
//                    for every frame of animation of the lift's vertical movement there is a state
//                    0> for when the lift is at rest at liftState.floor,
//                    constants.liftVerticalFramesTotal - 1> for when the lift is at the rest point of the liftState.floor +- 1

// Create {lifts} number of default lift states.
// Create the outsideButton states array.
// for every lift there should be a liftFloorToBeServicedState array.
// pass these lift states to LiftContainer component to be displayed.
// create

// const generateLiftStates = (lifts: number): liftState[] => {
//     const defaultLiftState: liftState = {
//         floor: 1,
//         state: 0,
//         movement: 0,
//         ohc: 0,
//         ohcSubState: 0,
//         movementSubState: 0,
//         busy: true,
//     };
//     let result: liftState[] = [];
//     for (let i = 0; i < lifts; i++) {
//         result.push(JSON.parse(JSON.stringify(defaultLiftState)) as liftState);
//     }
//     return result;
// };

export type liftState = {
    state: number;
    movement: number;
    ohc: number;
    floor: number;
    //busy: boolean;
    perLiftButtonPanelState: boolean[][];
};

const generateDefaultLiftStates = (num: number, floors: number) => {
    return new Array(num).fill({
        state: 0,
        movement: 0,
        ohc: 0,
        floor: 0,
        perLiftButtonPanelState: new Array(floors).fill([
            false,
            false,
        ]) as boolean[][],
    }) as liftState[];
};

const calcReachabilityFactor = (floor: number, liftS: liftState) => {
    if (liftS.movement === 1) {
        if (floor > liftS.floor) {
            return Math.abs(floor - liftS.floor);
        } else {
            // find the highest floor that needs to be serviced by liftS.
            let i: number = floor + 1;
            let lastFloor: number = floor + 1;
            while (i < liftS.perLiftButtonPanelState.length) {
                if (
                    liftS.perLiftButtonPanelState[i][1] === true ||
                    liftS.perLiftButtonPanelState[i][0] === true
                ) {
                    lastFloor = i;
                }
                i += 1;
            }
            return (
                Math.abs(lastFloor - liftS.floor) * 2 +
                Math.abs(liftS.floor - floor)
            );
        }
    } else if (liftS.movement === -1) {
        if (floor < liftS.floor) {
            return Math.abs(liftS.floor - floor);
        } else {
            // find the lowest floor that needs to be serviced by the liftS.
            let i: number = floor - 1;
            let lastFloor: number = floor - 1;
            while (i >= 0) {
                if (
                    liftS.perLiftButtonPanelState[i][1] === true ||
                    liftS.perLiftButtonPanelState[i][0] === true
                ) {
                    lastFloor = i;
                }
                i -= 1;
            }
            return (
                Math.abs(lastFloor - liftS.floor) * 2 +
                Math.abs(liftS.floor - floor)
            );
        }
    } else {
        return Math.abs(floor - liftS.floor);
    }
};

const Controller = ({ floors, lifts }: Props) => {
    const [buttonPanelState, setButtonPanelState] = useState(
        new Array(floors).fill([false, false]) as boolean[][]
    );
    const [liftStates, setLiftStates] = useState(
        generateDefaultLiftStates(lifts, floors)
    );
    if (buttonPanelState.length != floors || liftStates.length != lifts) {
        setButtonPanelState(
            new Array(floors).fill([false, false]) as boolean[][]
        );
        setLiftStates(generateDefaultLiftStates(lifts, floors));
    }

    const updateButtonPanel = (floor: number, upDown: number) => {
        setButtonPanelState((prevState: boolean[][]) => {
            const newState = prevState.map((innerArray) => innerArray.slice());
            newState[floor - 1][upDown] = true; // floor argument is 1-indexed.
            return newState;
        });
    };

    const assignLift = () => {
        // from the buttonPanelState assign the buttonPresses to the lifts.
        for (let i = 0; i < buttonPanelState.length; i++) {
            if (
                buttonPanelState[i][0] == true ||
                buttonPanelState[i][1] == true
            ) {
                let minLiftIndex = 0;
                let minLiftRF = calcReachabilityFactor(i, liftStates[0]);
                for (let j = 1; j < lifts; j++) {
                    let LiftRF = calcReachabilityFactor(i, liftStates[j]);
                    if (LiftRF < minLiftRF) {
                        minLiftIndex = j;
                        minLiftRF = j;
                    }
                }
                if (buttonPanelState[i][0] == true) {
                    setLiftStates((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as liftState[];
                        newState[minLiftIndex].perLiftButtonPanelState[i][0] =
                            true;
                        return newState;
                    });
                    buttonPanelState[i][0] = false;
                } else {
                    setLiftStates((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as liftState[];
                        newState[minLiftIndex].perLiftButtonPanelState[i][1] =
                            true;
                        return newState;
                    });
                    buttonPanelState[i][1] = false;
                }
            }
        }
    };
    assignLift();
    // console.log(buttonPanelState);
    // console.log(liftStates);
    const updateLiftState = (newLiftState: liftState, index: number) => {
        setLiftStates((prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState)) as liftState[];
            newState[index] = newLiftState;
            return newState;
        });
    };

    return (
        <>
            <div>
                floors:{floors}, lifts{lifts}
            </div>
            <HStack>
                <ButtonsPanel
                    floors={floors}
                    updateButtonPanel={updateButtonPanel}
                />
                <LiftContainer
                    floors={floors}
                    liftStates={liftStates}
                    updateLiftState={updateLiftState}
                />
            </HStack>
        </>
    );
};
export default Controller;
