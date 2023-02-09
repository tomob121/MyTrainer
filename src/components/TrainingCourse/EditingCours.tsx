import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import { Exercise, TrainingLine, Training } from './../../utility/interface';



interface Props {
    handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    trainingFake: Training,
}

const EditingCourse: React.FC<Props> = ({ handleEnter, handleTitleChange, trainingFake }) => {
    const [training, setTraining] = useState < Training > ({
        _id: '1',
        title: 'Fake Training',
        duration: 0,
        timer: []
    })
    const [allExercvises, setAllExercises] = useState < Exercise[] > ([])
    const [trainingLine, setTrainingLines] = useState < TrainingLine[] > ([])

    const style = {
        exerciseTitleStyle: {
            color: 'Black',
            fontSize: 20,
            fontWeight: 400,
        },
        repNumberStyle: {
            padding: 0,
            fontSize: 19,
            borderRadius: '3px',
            borderWidth: 1,
            textAlign: 'center',
        },
        toolTipMessage: {
            fontStyle: 'italic',
            opacity: 0.5,
        },
        h1element: {
            fontWeight: 500,
            fontSize: '39',
            borderRadius: 4,
        },
    }
    return <Container>
        <form>
            <h1 className="">
                <input
                    onKeyDown={(e) => handleEnter(e)}
                    style={style.h1element}
                    maxLength={50}
                    value={training?.title}
                    onChange={(e) => handleTitleChange(e)}
                    name="title"
                />
            </h1>
        </form>
    </Container>;
}

export default EditingCourse;