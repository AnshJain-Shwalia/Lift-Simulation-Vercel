import { useState } from "react";
import LiftContainer from "../LiftContainer";

interface Props {
    floors: number;
    lifts: number;
}

export type liftState = {
    floor: number;
    state: number;
    movement: number;
    ohc: number;
    ohcSubState: number;
    movementSubState: number;
};
// state=> 0> stationary 1> moving 2> opening and closing doors
// movement=> 0> not moving in either direction 1> moving up -1> moving down
// ohc=> 0> closed 1>opening 2> hold 3> closing
// floor=> what floor the lift is on
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

const generateLiftStates = (lifts: number): liftState[] => {
    const defaultLiftState: liftState = {
        floor: 0,
        state: 0,
        movement: 0,
        ohc: 0,
        ohcSubState: 0,
        movementSubState: 0,
    };
    let result: liftState[] = [];
    for (let i = 0; i < lifts; i++) {
        result.push(JSON.parse(JSON.stringify(defaultLiftState)) as liftState);
    }
    return result;
};

const Controller = ({ floors, lifts }: Props) => {
    const [liftStates, setLiftStates] = useState(generateLiftStates(lifts));

    return (
        <>
            <div>
                floors:{floors}, lifts{lifts}
            </div>
            <LiftContainer liftStates={liftStates} floors={floors} />
        </>
    );
};

export default Controller;

// Reminders->
// Before updating the states make sure to check if we are updating it to be the same value.
//      if we are updating to the same value, then don't update.
//      we can use JSON.stringify to compare.
