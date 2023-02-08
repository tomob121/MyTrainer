import React, { useState, useEffect, useRef } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import DialogConfirmation from './DialogConfirmation.tsx'
import { getTrainingLines } from '../service/trainingLineService.tsx'
import { Training, TrainingLine } from '../utility/interface.tsx'
import {
  deleteTraining,
  postTraining,
  getTrainings,
} from '../service/trainingService.tsx'
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query'

const TrainingCourses: React.FC = ({}) => {
  const styles = {
    cardStyle: {
      width: '18rem',
      cursor: 'pointer',
      color: 'white',
    },
    cardTextStyle: {
      maxHeight: 200,
    },
  }
  const navigate = useNavigate()
  const [trainings, setTrainings] = useState<Training[]>([])
  const [trainingLines, setTrainingLines] = useState<TrainingLine[]>([])
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  })
  const currentId = useRef<any>()
  const queryClient = useQueryClient()

  const [trainingLinesQuery, trainingsQuery] = useQueries({
    queries: [
      {
        queryKey: ['trainingLines', 'trainingCourses'],
        queryFn: () =>
          getTrainingLines().then((data) => {
            return data.data
          }),
        onSuccess(data: TrainingLine[]) {
          setTrainingLines(data)
        },
      },
      {
        queryKey: ['trainings', 'trainingCourses'],
        queryFn: () =>
          getTrainings().then((data) => {
            return data.data
          }),
        onSuccess(data: Training[]) {
          setTrainings(data)
        },
      },
    ],
  })


  async function handleDeleteTraining(trainingId: string, stringValue: string) {
    let trainingLinesFiltered = trainingLines.filter(
      (trl) => trl.trainingId._id === trainingId
    )
    currentId.current = trainingId
    if (stringValue !== 'yes')
      if (trainingLinesFiltered.length > 0) {
        setDialog({
          message: 'Are you sure you want to delete',
          isLoading: true,
        })
        return
      }
    setDialog({
      message: '',
      isLoading: false,
    })
    let filtered = trainings.filter((training) => training._id !== trainingId)
    setTrainings(filtered)
    await deleteTraining(trainingId)
  }

  const handleCancleDelete = () => {
    setDialog({ message: '', isLoading: false })
  }

  const addTrainingMutation = useMutation({
    mutationFn: (training: Training) => {
      return postTraining(training)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trainings'])
    },
  })

  function convertHMS(value: string) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60) // get minutes
    let seconds = sec - hours * 3600 - minutes * 60 //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = parseInt('0') + hours
    }
    if (minutes < 10) {
      minutes = parseInt('0') + minutes
    }
    if (seconds < 10) {
      seconds = parseInt('0') + seconds
    }

    return minutes + ':' + seconds // Return is MM : SS
  }

  function handleAvrageTrainingDuration(trainingID: string) {
    let filteredTraining = trainings.filter(
      (training) => training._id === trainingID
    )

    let sum = filteredTraining[0].timer.reduce(
      (partialSum, a) => partialSum + a,
      0
    )
    sum = sum / filteredTraining[0].timer.length

    if (!sum) sum = 0

    return convertHMS(sum.toString())
  }

  if (trainingLinesQuery.isError || trainingsQuery.isError) {
    console.log(trainingLinesQuery.error || trainingsQuery.error)
    return <h1>Error</h1>
  }
  if (trainingLinesQuery.isLoading || trainingsQuery.isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Container>
      <div className="row mt-3">
        <div className="col">
          {trainings.map((training) => (
            <Card
              className="p-2 m-2 bg-primary card"
              key={training._id}
              style={styles.cardStyle}
            >
              <Card.Title
                onClick={() => navigate(`/trainingCourses/${training._id}`)}
              >
                {training.title}
              </Card.Title>
              <SimpleBar
                onClick={() => navigate(`/trainingCourses/${training._id}`)}
                autoHide={false}
                style={styles.cardTextStyle}
              >
                {trainingLines.map((trainingLine) => (
                  <Card.Text key={trainingLine._id}>
                    {trainingLine.trainingId._id === training._id
                      ? trainingLine.exerciseId.title
                      : null}
                  </Card.Text>
                ))}
              </SimpleBar>
              <div className="row mt-2 ">
                <div className="col">
                  <Button
                    className="btn btn-danger "
                    onClick={() => handleDeleteTraining(training._id!, '')}
                  >
                    Delete
                  </Button>
                </div>
                {trainingLines.length > 0 && (
                  <div className="col-7" style={{ textAlign: 'end' }}>
                    Avg. Duration: {handleAvrageTrainingDuration(training._id!)}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="col">
          <Button
            className="btn btn-success"
            onClick={() =>
              addTrainingMutation.mutate({
                title: 'MyTraining',
                duration: 0,
                timer: [],
              })
            }
          >
            Add Trainig
          </Button>
        </div>
      </div>
      {dialog.isLoading && (
        <DialogConfirmation
          usingDeleteTrainign={() =>
            handleDeleteTraining(currentId.current, 'yes')
          }
          usingCancelDelete={handleCancleDelete}
          message={dialog.message}
        />
      )}
    </Container>
  )
}

export default TrainingCourses
