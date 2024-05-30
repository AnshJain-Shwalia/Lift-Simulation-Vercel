import { liftState } from "../Controller/Controller";

// export type liftState = {
//     state: number;
//     movement: number;
//     ohc: number;
//     floor: number;
//     //busy: boolean;
//     perLiftButtonPanelState: boolean[][];
// };

// export const signalReceiver = (
//     lS: liftState
//     // updateState: (newLS: liftState) => void
// ) => {
//     console.log(lS);
// };

export const signalReceiver = (
    lS: liftState,
    updateState: (newLS: liftState) => void
): void => {
    let lSCopy = JSON.parse(JSON.stringify(lS)) as liftState;
    // based on the state of the lift calculate the next state and set that next state
    if (lS.state === 0) {
        // lift is stationary.
        if (lS.movement === 0) {
            // lift is stationary and was stationary
            // check if the current floor needs to be serviced.
            if (
                lS.perLiftButtonPanelState[lS.floor][1] == true ||
                lS.perLiftButtonPanelState[lS.floor][0] == true
            ) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                updateState(lSCopy);
                return;
            }

            // check if there are any floors that need to be visited above the floor.
            //      if there are then change the state to state=0,movement=1,ohc=0,floor=same,perLiftButtonPanelState=same
            for (
                let i = lS.floor + 1;
                i < lS.perLiftButtonPanelState.length;
                i++
            ) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.movement = 1;
                    lSCopy.ohc = 0;
                    updateState(lSCopy);
                    return;
                }
            }
            // check if there are any floors that need to be visited below.
            //      if there are then change the state to state=0,movement=-1,ohc=0,floor=same,pLBPS=same
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    updateState(lSCopy);
                    return;
                }
            }
            return;
        } else if (lS.movement === 1) {
            // lift is stationary, but was moving up.
            // check if the current floor needs to be serviced.
            //      if so then change the state to state=2,movement=1,ohc=0,floor=same,pLBPS=same
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                updateState(lSCopy);
                return;
            }
            // if there are still floors above that need to serviced
            //      then change the state to state=1,movement=1,ohc=0,floor=same,pLBPS=same.
            for (
                let i = lS.floor + 1;
                i < lS.perLiftButtonPanelState.length;
                i++
            ) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.state = 1;
                    lSCopy.movement = 1;
                    lSCopy.ohc = 0;
                    updateState(lSCopy);
                    return;
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            updateState(lSCopy);
            return;
        } else {
            // lift is stationary, but was moving down.
            // check if the current floor needs to be serviced.
            //      if so then change the state to state=2,movement=-1,ohc=0,floor=same,pLBPS=same
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                updateState(lSCopy);
                return;
            }
            // if there are still floors below that need to be serviced
            //      then change the state to state=1,movement=-1,ohc=0,floor=same,plBPS=same.
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.state = 1;
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    updateState(lSCopy);
                    return;
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            updateState(lSCopy);
            return;
        }
    } else if (lS.state === 1) {
        if (lS.movement === 1) {
            // the lift has completed the animation of moving one floor up.
            //      the state should be state=0,movement=1,ohc=0,floor+=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = 1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor + 1;
            updateState(lSCopy);
            return;
        } else {
            // the lift has completed the animation of moving one floor down.
            //      the state should be state=0,movement=-1,ohc=0,floor-=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = -1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor - 1;
            updateState(lSCopy);
            return;
        }
    } else {
        // lS.state===2
        if (lS.ohc === 0) {
            // the lift is closed and should open.
            //     the state should be set to state=2,movement=same,ohc=1,floor=same,pLBPS=same
            lSCopy.state = 2;
            lSCopy.ohc = 1;
            updateState(lSCopy);
            return;
        } else if (lS.ohc === 1) {
            // the lift has been opening and the state should be set to opened.
            //      the state should be set to state=2,movement=same,ohc=2,floor=same,pLBPS=same
            lSCopy.state = 2;
            lSCopy.ohc = 2;
            updateState(lSCopy);
            return;
        } else if (lS.ohc === 2) {
            // the lift has been opened for the liftOpenHoldTime and should start closing.
            //      the state should be set to state=2,movement=same,ohc=3,floor=same,pLBPS=mark the liftButtonPress as visited.
            lSCopy.state = 2;
            lSCopy.ohc = 3;
            lSCopy.perLiftButtonPanelState[lSCopy.floor] = [false, false];
            updateState(lSCopy);
            return;
        } else {
            // the lift has been closed and should switch the state to
            //      state=0,movement=same,ohc=0,floor=same,pLBPS=same
            lSCopy.state = 0;
            lSCopy.ohc = 0;
            updateState(lSCopy);
            return;
        }
    }
};
