import React, { useState, useEffect } from 'react'
import { getTrainingLine } from '../service/trainingLineService'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import CountDown from '../utility/CountDown'
import { TrainingLine } from '../utility/interface'
import { useQuery } from '@tanstack/react-query'

function Exercise() {
  const { id } = useParams()
  const [trainingLines, setTrainingLines] = useState<TrainingLine[]>([])
  const [exerciseStage, setExerciseStage] = useState(0)
  const [isRenderingRest, setIsRenderingRest] = useState(false)
  // const [exerciseDuration, setExerciseDuration] = useState(0)
  let navigate = useNavigate()

  const trainingLineQuery = useQuery({
    queryKey: ['trainingLines'],
    queryFn: () => getTrainingLine(id!).then((data: any) => data.data),
    onSuccess(data) {
      setTrainingLines(data)
    },
    staleTime: Infinity,
  })

  useEffect(() => {
    if (trainingLineQuery.data) setTrainingLines(trainingLineQuery.data)
  }, [trainingLineQuery.data])

  function nextExercise() {
    if (exerciseStage === trainingLines.length - 1)
      navigate(`/trainingCourses/${id}/end`)
    setExerciseStage(exerciseStage + 1)
    setIsRenderingRest(!isRenderingRest)
  }

  // function nextExerciseSkipRest() {
  //   if (exerciseStage === trainingLines.length - 1)
  //     navigate(`/trainingCourses/${id}/end`)
  //   setExerciseStage(exerciseStage + 1)
  //   setIsRenderingRest(false)
  // }

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

  if (trainingLineQuery.isLoading) {
    return <h1>Loading...</h1>
  }
  if (trainingLineQuery.isError) {
    console.log(trainingLineQuery.error)
    return <h1>Error</h1>
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
              {trainingLines[exerciseStage]?.exerciseId.title}
            </div>
            <div className="pl-1 col-auto">
              {trainingLines[exerciseStage]?.reps}
            </div>
          </div>
        )}

        <div className="col-auto mt-5">
          {/* <div className="col-auto">
            <Button onClick={() => nextExerciseSkipRest()}>Skip rest</Button>
          </div> */}
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
            {trainingLines[exerciseStage]?.note.length === 0 ? (
              ''
            ) : (
              <p style={styles.paragraphBorder}>
                {trainingLines[exerciseStage]?.note}
              </p>
            )}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Exercise
