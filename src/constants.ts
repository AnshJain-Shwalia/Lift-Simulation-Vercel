const fps = 25;
const frameTime = 1000 / 25;
const liftOpeningTime = 1000;
const liftPerFloorMovementTime = 2500;
const liftOpeningFramesTotal = liftOpeningTime / frameTime;
const liftVerticalFramesTotal = liftPerFloorMovementTime / frameTime;

const constants = {
    fps: fps,
    frameTime: frameTime,
    liftOpeningFramesTotal: liftOpeningFramesTotal,
    liftVerticalFramesTotal: liftVerticalFramesTotal,
};

export default constants;
