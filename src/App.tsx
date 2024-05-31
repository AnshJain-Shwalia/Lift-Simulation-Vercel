import { Box, Grid, GridItem, Hide, Show } from "@chakra-ui/react";
import InputBar from "./components/InputBar";
import { useState } from "react";
import Controller from "./components/Controller";
function App() {
    const [floors, setFloors] = useState(3);
    const [lifts, setLifts] = useState(3);
    return (
        <>
            <Show above="md">
                <Grid
                    templateColumns={"1fr 6fr"}
                    templateAreas={'"input main"'}
                >
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
            </Show>
            <Hide above="md">
                <Box marginX={3}>
                    <InputBar
                        setValues={(floors: number, lifts: number) => {
                            setFloors(floors);
                            setLifts(lifts);
                        }}
                    />
                </Box>
                <Controller floors={floors} lifts={lifts}></Controller>
            </Hide>
        </>
    );
}

export default App;
