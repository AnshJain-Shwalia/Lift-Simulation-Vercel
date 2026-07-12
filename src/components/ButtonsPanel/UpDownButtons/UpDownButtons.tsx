import { IconButton, Stack } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
    isActiveUp: boolean;
    isActiveDown: boolean;
    updateButtonPanel: (upDown: number) => void;
}

const UpDownButtons = ({
    isActiveUp,
    isActiveDown,
    updateButtonPanel,
}: Props) => {
    return (
        <Stack spacing={2} direction="column" align="stretch">
            <IconButton
                aria-label="Call lift up"
                icon={<FaChevronUp />}
                size="sm"
                colorScheme={isActiveUp ? "cyan" : "gray"}
                variant={isActiveUp ? "solid" : "outline"}
                borderColor={isActiveUp ? "cyan.400" : "rgba(255,255,255,0.15)"}
                boxShadow={isActiveUp ? "0 0 10px rgba(0, 229, 255, 0.5)" : "none"}
                onClick={() => updateButtonPanel(1)}
                _active={{ bg: "cyan.400" }}
                transition="all 0.2s"
            />
            <IconButton
                aria-label="Call lift down"
                icon={<FaChevronDown />}
                size="sm"
                colorScheme={isActiveDown ? "cyan" : "gray"}
                variant={isActiveDown ? "solid" : "outline"}
                borderColor={isActiveDown ? "cyan.400" : "rgba(255,255,255,0.15)"}
                boxShadow={isActiveDown ? "0 0 10px rgba(0, 229, 255, 0.5)" : "none"}
                onClick={() => updateButtonPanel(0)}
                _active={{ bg: "cyan.400" }}
                transition="all 0.2s"
            />
        </Stack>
    );
};

export default UpDownButtons;
