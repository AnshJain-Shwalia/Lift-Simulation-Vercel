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

// type liftState = {};

const Controller = ({ floors, lifts }: Props) => {
    const [buttonPanelState, setButtonPanelState] = useState(
        new Array(floors).fill([false, false]) as boolean[][]
    );
    console.log(buttonPanelState);
    const updateButtonPanel = (floor: number, upDown: number) => {
        setButtonPanelState((prevState: boolean[][]) => {
            const newState = prevState.map((innerArray) => innerArray.slice());
            newState[floor][upDown] = true;
            console.log(newState);
            return newState;
        });
    };
    return (
        <>
            <div>
                floors:{floors}, lifts{lifts}
            </div>
            <HStack>
                <ButtonsPanel floors={floors} />
                <LiftContainer floors={floors} />
            </HStack>
        </>
    );
};
export default Controller;
