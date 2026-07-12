import { useState, useEffect } from "react";
import constants from "../constants";

export interface Lift {
    id: number;
    currentFloor: number;      // 0-indexed integer floor
    targetFloor: number | null; // Next immediate floor destination
    direction: "UP" | "DOWN" | "IDLE";
    doorState: "CLOSED" | "OPENING" | "OPEN" | "CLOSING";
    queue: number[];           // Floors scheduled for this lift
    stateTimer: number;        // ms remaining in the current state/animation
}

// Cost function to allocate elevator calls
export const calculateAllocationCost = (
    lift: Lift,
    targetFloor: number,
    direction: "UP" | "DOWN"
): number => {
    let cost = Math.abs(lift.currentFloor - targetFloor);

    // If lift is idle, its cost is just the distance
    if (lift.direction === "IDLE") {
        return cost;
    }

    const isMovingUp = lift.direction === "UP";
    const isTargetAbove = targetFloor > lift.currentFloor;

    // Add penalty if the lift is moving in the opposite direction
    if (isMovingUp && !isTargetAbove) {
        cost += 5; // Moving up but target is below
    } else if (!isMovingUp && isTargetAbove) {
        cost += 5; // Moving down but target is above
    }

    // Add penalty if the call is in the opposite direction of lift travel
    if (lift.direction !== direction) {
        cost += 2;
    }

    // Add penalty for each stop already queued
    cost += lift.queue.length * 2;

    return cost;
};

// Queue sorter based on the elevator SCAN algorithm
export const insertAndSortQueue = (
    queue: number[],
    newFloor: number,
    currentFloor: number,
    direction: "UP" | "DOWN" | "IDLE"
): number[] => {
    if (queue.includes(newFloor)) return queue;
    const newQueue = [...queue, newFloor];

    let effDir = direction;
    if (effDir === "IDLE" && newQueue.length > 0) {
        effDir = newQueue[0] >= currentFloor ? "UP" : "DOWN";
    }

    if (effDir === "UP") {
        const ups = newQueue.filter(f => f >= currentFloor).sort((a, b) => a - b);
        const downs = newQueue.filter(f => f < currentFloor).sort((a, b) => b - a);
        return [...ups, ...downs];
    } else {
        const downs = newQueue.filter(f => f <= currentFloor).sort((a, b) => b - a);
        const ups = newQueue.filter(f => f > currentFloor).sort((a, b) => a - b);
        return [...downs, ...ups];
    }
};

export const useLiftSystem = (numLifts: number, numFloors: number) => {
    const [state, setState] = useState<{
        lifts: Lift[];
        calls: boolean[][];
    }>({
        lifts: [],
        calls: []
    });

    // Initialize/reset simulation state when config changes
    useEffect(() => {
        setState({
            lifts: Array.from({ length: numLifts }, (_, i) => ({
                id: i,
                currentFloor: 0,
                targetFloor: null,
                direction: "IDLE",
                doorState: "CLOSED",
                queue: [],
                stateTimer: 0
            })),
            calls: Array.from({ length: numFloors }, () => [false, false])
        });
    }, [numLifts, numFloors]);

    // Core simulation tick interval
    useEffect(() => {
        const tickRate = 100; // 100ms ticks
        const interval = setInterval(() => {
            setState(prevState => {
                const nextCalls = prevState.calls.map(call => [...call]);
                
                const nextLifts = prevState.lifts.map(lift => {
                    const updatedLift = { ...lift, queue: [...lift.queue] };

                    if (updatedLift.stateTimer > 0) {
                        updatedLift.stateTimer -= tickRate;
                        if (updatedLift.stateTimer > 0) {
                            return updatedLift; // Still in current animation state
                        }
                    }

                    // Process state transitions
                    if (updatedLift.doorState === "OPENING") {
                        updatedLift.doorState = "OPEN";
                        updatedLift.stateTimer = constants.liftHoldingTimeInSec * 1000;
                    } else if (updatedLift.doorState === "OPEN") {
                        updatedLift.doorState = "CLOSING";
                        updatedLift.stateTimer = constants.liftOpeningTimeInSec * 1000;
                    } else if (updatedLift.doorState === "CLOSING") {
                        updatedLift.doorState = "CLOSED";
                        updatedLift.queue = updatedLift.queue.filter(f => f !== updatedLift.currentFloor);

                        if (updatedLift.queue.length === 0) {
                            updatedLift.direction = "IDLE";
                            updatedLift.targetFloor = null;
                        } else {
                            const nextTarget = updatedLift.queue[0];
                            updatedLift.targetFloor = nextTarget;
                            updatedLift.direction = nextTarget > updatedLift.currentFloor ? "UP" : "DOWN";
                            updatedLift.stateTimer = constants.liftPerFloorMovementTimeInSec * 1000;
                        }
                    } else {
                        // doorState === "CLOSED"
                        if (updatedLift.direction !== "IDLE") {
                            // Completed moving 1 floor towards target
                            const nextFloor = updatedLift.direction === "UP" 
                                ? updatedLift.currentFloor + 1 
                                : updatedLift.currentFloor - 1;
                            
                            updatedLift.currentFloor = nextFloor;

                            // Stop at this floor if:
                            // 1. It is directly in this lift's queue
                            // 2. OR there is an outside call in the direction of movement
                            const isAtTarget = updatedLift.queue.includes(nextFloor);
                            const hasMatchingCall = (updatedLift.direction === "UP" && nextCalls[nextFloor]?.[1]) ||
                                                    (updatedLift.direction === "DOWN" && nextCalls[nextFloor]?.[0]);

                            if (isAtTarget || hasMatchingCall) {
                                updatedLift.doorState = "OPENING";
                                updatedLift.stateTimer = constants.liftOpeningTimeInSec * 1000;

                                // Clear the caller's request
                                if (updatedLift.direction === "UP" && nextCalls[nextFloor]?.[1]) {
                                    nextCalls[nextFloor][1] = false;
                                } else if (updatedLift.direction === "DOWN" && nextCalls[nextFloor]?.[0]) {
                                    nextCalls[nextFloor][0] = false;
                                }
                                updatedLift.queue = updatedLift.queue.filter(f => f !== nextFloor);
                            } else {
                                // Continue moving
                                if (updatedLift.queue.length === 0) {
                                    updatedLift.direction = "IDLE";
                                    updatedLift.targetFloor = null;
                                } else {
                                    const nextTarget = updatedLift.queue[0];
                                    updatedLift.targetFloor = nextTarget;
                                    updatedLift.direction = nextTarget > updatedLift.currentFloor ? "UP" : "DOWN";
                                    updatedLift.stateTimer = constants.liftPerFloorMovementTimeInSec * 1000;
                                }
                            }
                        } else {
                            // IDLE and CLOSED: Check queue
                            if (updatedLift.queue.length > 0) {
                                const nextTarget = updatedLift.queue[0];
                                if (nextTarget === updatedLift.currentFloor) {
                                    updatedLift.doorState = "OPENING";
                                    updatedLift.stateTimer = constants.liftOpeningTimeInSec * 1000;
                                    // Clear both up/down calls at this floor
                                    if (nextCalls[updatedLift.currentFloor]?.[0]) {
                                        nextCalls[updatedLift.currentFloor][0] = false;
                                    }
                                    if (nextCalls[updatedLift.currentFloor]?.[1]) {
                                        nextCalls[updatedLift.currentFloor][1] = false;
                                    }
                                    updatedLift.queue = updatedLift.queue.filter(f => f !== updatedLift.currentFloor);
                                } else {
                                    updatedLift.targetFloor = nextTarget;
                                    updatedLift.direction = nextTarget > updatedLift.currentFloor ? "UP" : "DOWN";
                                    updatedLift.stateTimer = constants.liftPerFloorMovementTimeInSec * 1000;
                                }
                            }
                        }
                    }

                    return updatedLift;
                });

                return { lifts: nextLifts, calls: nextCalls };
            });
        }, tickRate);

        return () => clearInterval(interval);
    }, [numFloors]);

    const callLift = (floorIndex: number, upDown: number) => {
        setState(prevState => {
            // Prevent redundant call updates
            if (prevState.calls[floorIndex]?.[upDown]) {
                return prevState;
            }

            const nextCalls = prevState.calls.map((call, idx) => 
                idx === floorIndex ? (upDown === 1 ? [call[0], true] : [true, call[1]]) : call
            );

            // Determine the optimal lift using our cost allocation algorithm
            let minCost = Infinity;
            let selectedLiftIdx = -1;

            prevState.lifts.forEach((lift, idx) => {
                const cost = calculateAllocationCost(lift, floorIndex, upDown === 1 ? "UP" : "DOWN");
                if (cost < minCost) {
                    minCost = cost;
                    selectedLiftIdx = idx;
                }
            });

            if (selectedLiftIdx !== -1) {
                const nextLifts = prevState.lifts.map((lift, idx) => {
                    if (idx === selectedLiftIdx) {
                        const newQueue = insertAndSortQueue(lift.queue, floorIndex, lift.currentFloor, lift.direction);
                        return {
                            ...lift,
                            queue: newQueue
                        };
                    }
                    return lift;
                });
                return { lifts: nextLifts, calls: nextCalls };
            }

            return { ...prevState, calls: nextCalls };
        });
    };

    return {
        lifts: state.lifts,
        calls: state.calls,
        callLift
    };
};
