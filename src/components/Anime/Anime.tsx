import { useEffect, useState } from "react";

function pauseExecution(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pause(ms: number) {
    await pauseExecution(ms);
}
// receive some sort of lift state and the displays it
// also need a useEffectHook that has [liftState] as a dependency
// this effectHook  update the state and then wait some time(this time will be calculated according to the expected fps.)
const Anime = () => {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    useEffect(() => {
        // increase the top
        // increase the left
        // wait 30ms.
        pause(30).then(() => {
            setLeft(left);
            setTop(top);
        });
    }, [top, left]);
    return (
        <div style={{ position: "relative", backgroundColor: "dodgerblue" }}>
            <div
                style={{
                    width: "60px",
                    height: "120px",
                    backgroundColor: "red",
                    position: "absolute",
                    top: top,
                    left: left,
                }}
            ></div>
        </div>
    );
};

export default Anime;
