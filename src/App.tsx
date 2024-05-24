import { Box, Grid, GridItem } from "@chakra-ui/react";
import InputBar from "./components/InputBar";
import { useState } from "react";
import Controller from "./components/Controller";
function App() {
    const [floors, setFloors] = useState(3);
    const [lifts, setLifts] = useState(3);
    return (
        <Grid templateColumns={"1fr 6fr"} templateAreas={'"input main"'}>
            <GridItem area={"input"}>
                <Box marginX={3}>
                    <InputBar
                        setValues={(floors: number, lifts: number) => {
                            setFloors(floors);
                            setLifts(lifts);
                        }}
                    />
                </Box>
            </GridItem>
            <GridItem area={"main"}>
                <Controller floors={floors} lifts={lifts}></Controller>
            </GridItem>
        </Grid>
    );
}

export default App;
