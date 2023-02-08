import React, { useState, useEffect } from 'react'
import { getTrainingLine } from '../service/trainingLineService.tsx'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import CountDown from '../utility/CountDown.tsx'
import { TrainingLine } from '../utility/interface.tsx'

function Exercise() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [trainingLines, setTrainingLines] = useState<TrainingLine[]>([])
    const [exerciseStage, setExerciseStage] = useState(0)
    const [isRenderingRest, setIsRenderingRest] = useState(false)
    const [exerciseDuration, setExerciseDuration] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTrainingLine(id!)
            setTrainingLines(data)
            setIsLoading(false)
        }
        fetchData()
        return () => {
            setIsLoading(true)
        }
    }, [])

    function nextExercise() {
        if (exerciseStage === trainingLines.length - 1)
            navigate(`/trainingCourses/${id}/end`)
        setExerciseStage(exerciseStage + 1)
        setIsRenderingRest(!isRenderingRest)
    }

    function nextExerciseSkipRest() {
        if (exerciseStage === trainingLines.length - 1)
            navigate(`/trainingCourses/${id}/end`)
        setExerciseStage(exerciseStage + 1)
        setIsRenderingRest(false)
    }

    const styles = {
        paragraphBorder: {
            border: 2,
            borderStyle: 'solid',
            borderColor: 'DarkSlateGrey',
            height: 52,
            backgroundColor: 'HoneyDew',
            color: 'black',
            borderRadius: 5,
        },
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <div className="row">
                <div className="col-5"></div>
                {isRenderingRest ? (
                    <div className="row col-3 mt-5">
                        <div className="col-auto">Rest</div>
                        <div className="col-auto">
                            <CountDown
                                time={trainingLines[exerciseStage].restTime}
                                afterCountDown={() => nextExercise()}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="row col-3 mt-5">
                        <div className="col-auto">
                            {trainingLines[exerciseStage].exerciseId.title}
                        </div>
                        <div className="pl-1 col-auto">
                            {trainingLines[exerciseStage].reps}
                        </div>
                    </div>
                )}

                <div className="col-auto mt-5">
                    <div className="col-auto">
                        <Button onClick={() => nextExerciseSkipRest()}>
                            Skip rest
                        </Button>
                    </div>
                    <div className="col-auto mt-2">
                        <Button
                            onClick={
                                isRenderingRest
                                    ? () => nextExercise()
                                    : () => setIsRenderingRest(!isRenderingRest)
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            {!isRenderingRest && (
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-3">
                        {trainingLines[exerciseStage].note.length === 0 ? (
                            ''
                        ) : (
                            <p style={styles.paragraphBorder}>
                                {trainingLines[exerciseStage].note}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </Container>
    )
}

export default Exercise
