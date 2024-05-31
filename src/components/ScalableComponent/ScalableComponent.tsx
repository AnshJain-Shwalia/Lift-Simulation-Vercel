import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

const ScalableComponent = ({ children }: Props) => {
    console.log("run");
    const [scale, setScale] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const adjustScale = () => {
            const { clientWidth, scrollWidth } = container;
            const scaleFactor = clientWidth / scrollWidth;
            setScale(scaleFactor < 1 ? scaleFactor : 1);
        };

        adjustScale();
        window.addEventListener("resize", adjustScale);

        return () => {
            window.removeEventListener("resize", adjustScale);
        };
    }, []);

    return (
        <Box ref={containerRef} overflowX="auto">
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                }}
            >
                {children}
            </div>
        </Box>
    );
};

export default ScalableComponent;
