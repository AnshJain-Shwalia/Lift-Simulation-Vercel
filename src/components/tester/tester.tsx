// MyComponent.js
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./MyComponent.css";

const MyComponent = () => {
    const [inProp, setInProp] = useState(false);

    const handleEnter = () => {
        console.log("Enter transition started");
    };

    const handleEntered = () => {
        console.log("Enter transition completed");
        // Functionality after the transition is complete
    };

    return (
        <div>
            <button onClick={() => setInProp(!inProp)}>
                Toggle Transition
            </button>
            <CSSTransition
                in={inProp}
                timeout={0}
                classNames="my-node"
                onEnter={handleEnter}
                onEntered={handleEntered}
                onExiting={() => {
                    console.log("onExiting");
                }}
                onExit={() => {
                    console.log("onExit");
                }}
                onExited={() => {
                    console.log("onExited");
                }}
                unmountOnExit
            >
                <div className="my-node">This is a transition element</div>
            </CSSTransition>
        </div>
    );
};

export default MyComponent;
