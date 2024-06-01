import constants from "../../constants";
import { liftState } from "./Controller";

const cRF = (floor: number, lS: liftState): number => {
    return calculateReachabilityFactorByDistToCover(floor, lS);
};

const calculateReachabilityFactorByTime = (
    floor: number,
    lS: liftState
): number => {
    // calculate the time required by the lS to reach the state
    // where it will service floor, "floor".
    // note that this function assumes that the service request
    // has already been added to lS.
    // and hence it is guaranteed that the lS will
    // eventually reach the floor, "floor".
    if (lS.floor === floor && lS.state == 2 && lS.ohc === 2) {
        return 0;
    }
    let lSCopy = {
        ...lS,
        perLiftButtonPanelState: lS.perLiftButtonPanelState.map((value) => {
            return [...value];
        }),
    };
    if (lS.state === 0) {
        // lift is stationary.
        if (lS.movement === 0) {
            // lift is stationary and was stationary.
            // check if the current floor needs to be serviced.
            if (
                lS.perLiftButtonPanelState[lS.floor][1] == true ||
                lS.perLiftButtonPanelState[lS.floor][0] == true
            ) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
            }

            // check if there are any floors that need to be visited above the floor.
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
                    return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
                }
            }
            // check if there are any floors that need to be visited below.
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
                }
            }
            return Infinity;
        } else if (lS.movement === 1) {
            // lift is stationary, but was moving up.
            // check if the current floor needs to be serviced.
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
            }
            // if there are still floors above that need to serviced
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
                    return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
        } else {
            // lift is stationary, but was moving down.
            // check if the current floor needs to be serviced.
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
            }
            // if there are still floors below that need to be serviced
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.state = 1;
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
        }
    } else if (lS.state === 1) {
        if (lS.movement === 1) {
            // the lift has completed the animation of moving one floor up.
            //      the state should be state=0,movement=1,ohc=0,floor+=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = 1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor + 1;
            return (
                calculateReachabilityFactorByTime(floor, lSCopy) +
                constants.liftPerFloorMovementTimeInSec
            );
        } else {
            // the lift has completed the animation of moving one floor down.
            //      the state should be state=0,movement=-1,ohc=0,floor-=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = -1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor - 1;
            return (
                calculateReachabilityFactorByTime(floor, lSCopy) +
                constants.liftPerFloorMovementTimeInSec
            );
        }
    } else {
        // lS.state===2
        if (lS.ohc === 0) {
            // the lift is closed and should open.
            //     the state should be set to state=2,movement=same,ohc=1,floor=same,pLBPS=same
            lSCopy.state = 2;
            lSCopy.ohc = 1;
            return calculateReachabilityFactorByTime(floor, lSCopy) + 0;
        } else if (lS.ohc === 1) {
            // the lift has been opening and the state should be set to opened.
            lSCopy.state = 2;
            lSCopy.ohc = 2;
            return (
                calculateReachabilityFactorByTime(floor, lSCopy) +
                constants.liftOpeningTimeInSec
            );
        } else if (lS.ohc === 2) {
            // the lift has been opened for the liftOpenHoldTime and should start closing.
            lSCopy.state = 2;
            lSCopy.ohc = 3;
            lSCopy.perLiftButtonPanelState[lSCopy.floor] = [false, false];
            return (
                calculateReachabilityFactorByTime(floor, lSCopy) +
                constants.liftHoldingTimeInSec
            );
        } else {
            // the lift has been closing and should switch the state to closed.
            lSCopy.state = 0;
            lSCopy.ohc = 0;
            return (
                calculateReachabilityFactorByTime(floor, lSCopy) +
                constants.liftOpeningTimeInSec
            );
        }
    }
};
const calculateReachabilityFactorByDistToCover = (
    floor: number,
    lS: liftState
): number => {
    // calculate the dist travel by the lS to reach the state
    // where it will service floor, "floor".
    // note that this function assumes that the service request
    // has already been added to lS.
    // and hence it is guaranteed that the lS will
    // eventually reach the floor, "floor".
    if (lS.floor === floor && lS.state == 2 && lS.ohc === 2) {
        return 0;
    }
    let lSCopy = {
        ...lS,
        perLiftButtonPanelState: lS.perLiftButtonPanelState.map((value) => {
            return [...value];
        }),
    };
    if (lS.state === 0) {
        // lift is stationary.
        if (lS.movement === 0) {
            // lift is stationary and was stationary.
            // check if the current floor needs to be serviced.
            if (
                lS.perLiftButtonPanelState[lS.floor][1] == true ||
                lS.perLiftButtonPanelState[lS.floor][0] == true
            ) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return (
                    calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0
                );
            }

            // check if there are any floors that need to be visited above the floor.
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
                    return (
                        calculateReachabilityFactorByDistToCover(
                            floor,
                            lSCopy
                        ) + 0
                    );
                }
            }
            // check if there are any floors that need to be visited below.
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    return (
                        calculateReachabilityFactorByDistToCover(
                            floor,
                            lSCopy
                        ) + 0
                    );
                }
            }
            return Infinity;
        } else if (lS.movement === 1) {
            // lift is stationary, but was moving up.
            // check if the current floor needs to be serviced.
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return (
                    calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0
                );
            }
            // if there are still floors above that need to serviced
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
                    return (
                        calculateReachabilityFactorByDistToCover(
                            floor,
                            lSCopy
                        ) + 0
                    );
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0;
        } else {
            // lift is stationary, but was moving down.
            // check if the current floor needs to be serviced.
            if (lS.perLiftButtonPanelState[lS.floor][1] == true) {
                lSCopy.state = 2;
                lSCopy.ohc = 0;
                return (
                    calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0
                );
            }
            // if there are still floors below that need to be serviced
            for (let i = lS.floor - 1; i >= 0; i--) {
                if (
                    lS.perLiftButtonPanelState[i][0] == true ||
                    lS.perLiftButtonPanelState[i][1] == true
                ) {
                    lSCopy.state = 1;
                    lSCopy.movement = -1;
                    lSCopy.ohc = 0;
                    return (
                        calculateReachabilityFactorByDistToCover(
                            floor,
                            lSCopy
                        ) + 0
                    );
                }
            }
            // if none of the above then switch the state to state=0,movement=0,ohc=0,floor=same,pLBPS=same.
            lSCopy.state = 0;
            lSCopy.movement = 0;
            lSCopy.ohc = 0;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0;
        }
    } else if (lS.state === 1) {
        if (lS.movement === 1) {
            // the lift has completed the animation of moving one floor up.
            //      the state should be state=0,movement=1,ohc=0,floor+=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = 1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor + 1;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 1;
        } else {
            // the lift has completed the animation of moving one floor down.
            //      the state should be state=0,movement=-1,ohc=0,floor-=1,pLBPS=same
            lSCopy.state = 0;
            lSCopy.movement = -1;
            lSCopy.ohc = 0;
            lSCopy.floor = lSCopy.floor - 1;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 1;
        }
    } else {
        // lS.state===2
        if (lS.ohc === 0) {
            // the lift is closed and should open.
            //     the state should be set to state=2,movement=same,ohc=1,floor=same,pLBPS=same
            lSCopy.state = 2;
            lSCopy.ohc = 1;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0;
        } else if (lS.ohc === 1) {
            // the lift has been opening and the state should be set to opened.
            lSCopy.state = 2;
            lSCopy.ohc = 2;
            return (
                calculateReachabilityFactorByDistToCover(floor, lSCopy) +
                constants.liftOpeningTimeInSec
            );
        } else if (lS.ohc === 2) {
            // the lift has been opened for the liftOpenHoldTime and should start closing.
            lSCopy.state = 2;
            lSCopy.ohc = 3;
            lSCopy.perLiftButtonPanelState[lSCopy.floor] = [false, false];
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0;
        } else {
            // the lift has been closing and should switch the state to closed.
            lSCopy.state = 0;
            lSCopy.ohc = 0;
            return calculateReachabilityFactorByDistToCover(floor, lSCopy) + 0;
        }
    }
};
export default cRF;
