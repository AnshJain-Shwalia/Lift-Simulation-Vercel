interface Props {
    floors: number;
    lifts: number;
}

const LiftsContainer = ({ floors, lifts }: Props) => {
    return (
        <div>
            floors:{floors}, lifts{lifts}
        </div>
    );
};

export default LiftsContainer;
