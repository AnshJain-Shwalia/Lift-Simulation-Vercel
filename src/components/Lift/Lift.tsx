import { liftState } from "../Controller/Controller";

interface Props {
    liftS: liftState;
    floors: number;
}

// export type liftState = {
//     floor: number;
//     state: number;
//     movement: number;
//     ohc: number;
//     ohcSubState: number;
//     movementSubState: number;
// };

const Lift = ({ liftS, floors }: Props) => {
    return (
        <div>
            {JSON.stringify(liftS)} {floors}
        </div>
    );
};

export default Lift;
