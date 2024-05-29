import { liftState } from "../Controller/Controller";

interface animationRequest {
    action: number;
    floor: number;
    subaction: number;
}

export const liftState2AR = (lS: liftState) => {
    if (lS.state === 0) {
        // the lift is stationary at some floor
        if (lS.movement === 0) {
            let result: animationRequest = {
                action: 0,
                subaction: 0,
                floor: lS.floor + 1,
            }; // lS.floor + 1 is because liftBox accepts floors as 1-indexed
            console.log(1);
            return result;
        } else {
            let result: animationRequest = {
                action: 1,
                subaction: 0,
                floor: lS.floor + 1,
            };
            console.log(2);
            return result;
        }
    } else if (lS.state === 1) {
        // the lift is moving
        if (lS.movement === 1) {
            // moving upwards
            let result: animationRequest = {
                action: 0,
                subaction: 1,
                floor: lS.floor + 1,
            };
            return result;
        } else {
            // moving downwards
            let result: animationRequest = {
                action: 0,
                subaction: 2,
                floor: lS.floor + 1,
            };
            return result;
        }
    } else {
        // the lift is either closed, opening, opened or closing.
        if (lS.ohc === 0) {
            // lift is closed.
            let result: animationRequest = {
                action: 1,
                subaction: 0,
                floor: lS.floor + 1,
            };
            return result;
        } else if (lS.ohc === 1) {
            // lift is opening.
            let result: animationRequest = {
                action: 1,
                subaction: 1,
                floor: lS.floor + 1,
            };
            return result;
        } else if (lS.ohc === 2) {
            // lift has been opened
            let result: animationRequest = {
                action: 1,
                subaction: 2,
                floor: lS.floor + 1,
            };
            return result;
        } else {
            // lift is closing
            let result: animationRequest = {
                action: 1,
                subaction: 3,
                floor: lS.floor + 1,
            };
            return result;
        }
    }
};
