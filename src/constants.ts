const liftOpeningTime = 1000;
const liftHoldingTime = 1000;
const liftPerFloorMovementTime = 2500;

//
const floorHeight = 120;
const floorHeightInPx = floorHeight.toString() + "px";
const floorWidth = 120;
const floorWidthInPx = floorWidth.toString() + "px";
const floorBaseWidthInPx = floorWidthInPx;
const floorMdWidthInPx = floorWidthInPx;
const liftHeight = 100;
const liftHeightInPx = liftHeight.toString() + "px";
const liftWidth = 60;
const liftWidthInPx = liftWidth.toString() + "px";
const liftLeftOffSet = (floorWidth - liftWidth) / 2;
const liftLeftOffSetInPx = liftLeftOffSet.toString() + "px"; // (fw-lw)/2

const constants = {
    floorHeight: floorHeight,
    floorBaseWidthInPx: floorBaseWidthInPx,
    floorMdWidthInPx: floorMdWidthInPx,
    floorWidthInPx: floorWidthInPx,
    liftHeightInPx: liftHeightInPx,
    liftWidth: liftWidth,
    liftWidthInPx: liftWidthInPx,
    liftLeftOffSetInPx: liftLeftOffSetInPx,
    liftHeight: liftHeight,
};

export default constants;
