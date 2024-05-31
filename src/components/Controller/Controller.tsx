import { useState } from "react";
import LiftContainer from "../LiftContainer";
import ButtonsPanel from "../ButtonsPanel";
import { HStack } from "@chakra-ui/react";
import calculateReachabilityFactor from "./cRF";
import ScalableComponent from "../ScalableComponent";

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

const copyLS = (lS: liftState): liftState => {
    return {
        ...lS,
        perLiftButtonPanelState: lS.perLiftButtonPanelState.map((value) => {
            return [...value];
        }),
    };
};

const markLS = (lS: liftState, floor: number, up: boolean, down: boolean) => {
    lS.perLiftButtonPanelState[floor] = [down, up];
    return lS;
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
        console.log("button Panel Updated.");
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
                let minLiftRF = calculateReachabilityFactor(
                    i,
                    markLS(
                        copyLS(liftStates[0]),
                        i,
                        buttonPanelState[i][1],
                        buttonPanelState[i][0]
                    )
                );
                for (let j = 1; j < lifts; j++) {
                    let LiftRF = calculateReachabilityFactor(
                        i,
                        markLS(
                            copyLS(liftStates[j]),
                            i,
                            buttonPanelState[i][1],
                            buttonPanelState[i][0]
                        )
                    );
                    if (LiftRF < minLiftRF) {
                        minLiftIndex = j;
                        minLiftRF = LiftRF;
                    }
                }
                console.log("minLiftIndex=>", minLiftIndex);
                console.log("minLiftRf=>", minLiftRF);
                if (buttonPanelState[i][0] == true) {
                    setLiftStates((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as liftState[];
                        newState[minLiftIndex].perLiftButtonPanelState[i][0] =
                            true;
                        return newState;
                    });
                    // buttonPanelState[i][0] = false;
                    setButtonPanelState((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as boolean[][];
                        newState[i][0] = false;
                        return newState;
                    });
                } else {
                    setLiftStates((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as liftState[];
                        newState[minLiftIndex].perLiftButtonPanelState[i][1] =
                            true;
                        return newState;
                    });
                    // buttonPanelState[i][1] = false;
                    setButtonPanelState((prevState) => {
                        let newState = JSON.parse(
                            JSON.stringify(prevState)
                        ) as boolean[][];
                        newState[i][1] = false;
                        return newState;
                    });
                }
            }
        }
    };
    assignLift();
    const updateLiftState = (newLiftState: liftState, index: number) => {
        setLiftStates((prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState)) as liftState[];
            newState[index] = newLiftState;
            return newState;
        });
    };

    return (
        <>
            {/* <div>
                floors:{floors}, lifts{lifts}
            </div> */}
            <ScalableComponent>
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
            </ScalableComponent>
            {/* <Button
                onClick={() => {
                    console.log(liftStates);
                }}
            >
                LiftStates
            </Button>
            <Button
                onClick={() => {
                    console.log(buttonPanelState);
                }}
            >
                ButtonStateArray
            </Button> */}
        </>
    );
};
export default Controller;
