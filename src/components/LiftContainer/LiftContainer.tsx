import { liftState } from "../Controller/Controller";
import Lift from "../Lift/Lift";

interface Props {
    liftStates: liftState[];
    floors: number;
}

const LiftContainer = ({ liftStates, floors }: Props) => {
    return (
        <div>
            {liftStates.map((value) => (
                <Lift liftS={value} floors={floors} />
            ))}
        </div>
    );
};

export default LiftContainer;
