import { Box, Text } from "@chakra-ui/react";
import constants from "../../constants";
import UpDownButtons from "../UpDownButtons";
interface Props {
    floorNumber: number;
}

const Floor = ({ floorNumber }: Props) => {
    return <Box height={constants.floorHeight} backgroundColor={"gray"}></Box>;
};

export default Floor;
