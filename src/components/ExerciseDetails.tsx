import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getExercise } from '../service/exerciseService.tsx'
import { Exercise } from '../utility/interface.tsx'

function ExerciseDetails() {
    const { id } = useParams()
    const [exercise, setExercise] = useState<Exercise>({
        _id: '',
        title: '',
        bodyPart: '',
        type: '',
    })

    useEffect(() => {
        const fetchExercise = async () => {
            const { data: exercise } = await getExercise(id!)
            setExercise(exercise)
        }
        fetchExercise()
    }, [id])

    const styles = {
        exerciseTitle: {
            textDecoration: 'underline',
            fontSize: 50,
            height: 80,
            borderRadius: 10,
        },
        listItem: { fontSize: 25 },
    }

    return (
        <div>
            <Container>
                <div className="row" style={{ height: '500px' }}>
                    <div className="col-4"></div>
                    <h1
                        style={styles.exerciseTitle}
                        className="text-center mt-5 col-4"
                    >
                        {exercise.title}
                    </h1>
                    <div className="row">
                        <p
                            className="col-6 text-center"
                            style={styles.listItem}
                        >
                            {exercise.type}
                        </p>
                        <p
                            className="col-6 text-center"
                            style={styles.listItem}
                        >
                            {exercise.bodyPart}
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ExerciseDetails
