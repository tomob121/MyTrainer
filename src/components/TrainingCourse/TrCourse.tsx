import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import RightSideBar from './RightSideBar.tsx'
import RenderRestTime from './RenderRestTime.tsx'
import RenderRepChangeAndDelete from './RenderRepChangeAndDelete.tsx'
import { getExercises } from '../../service/exerciseService.tsx'
import { getTraining, putTraining } from '../../service/trainingService.tsx'
import {
  deleteTrainingLine,
  postTrainingLine,
  getTrainingLine,
  putTrainingLineAll,
} from '../../service/trainingLineService.tsx'
import { Exercise, TrainingLine, Training } from '../../utility/interface.tsx'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateTrainingLine } from '../../utility/interface.tsx'

type LocationState = {
  isEditing: boolean
}

const TrCourse: React.FC = () => {
  const [training, setTraining] = useState<Training>({
    _id: '',
    title: '',
    duration: 0,
    timer: [],
  })
  const [allExercises, setAllExercises] = useState<Exercise[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [trainingLines, setTrainingLines] = useState<TrainingLine[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
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
  const queryClient = useQueryClient()

  const [allExercisesQuery, trainingLinesQuery, trainingQuery] = useQueries({
    queries: [
      {
        queryKey: ['allExercises', 'trCourse'],
        queryFn: () => getExercises().then((data) => data.data),
        onSuccess(data: Exercise[]) {
          setAllExercises(data)
        },
      },
      {
        queryKey: ['trainingLines', 'trCourse'],
        queryFn: () => getTrainingLine(id!).then((data) => data.data),
        onSuccess(data: TrainingLine[]) {
          setTrainingLines(data)
        },
      },
      {
        queryKey: ['training', 'trCourse'],
        queryFn: () => getTraining(id!).then((data) => data.data),
        onSuccess(data: Training) {
          setTraining(data)
        },
      },
    ],
  })

  useEffect(() => {
    if (location.state) {
      const { isEditing } = location?.state as LocationState
      if (isEditing) {
        setIsEditing(true)
      }
    }
    return () => {
      deleteEmptyLines()
    }
  }, [])

  async function deleteEmptyLines() {
    let deletedEmptyTrainingLines: TrainingLine[] = []
    for (const trainingLine of trainingLines) {
      if (trainingLine.exerciseId._id === '6384a9c95cc12ea42d040af2') {
        await deleteTrainingLine(trainingLine._id!)
      } else {
        deletedEmptyTrainingLines.push(trainingLine)
      }
    }
    setTrainingLines((prevState) =>
      prevState.filter(
        (state) => state.exerciseId._id !== '6384a9c95cc12ea42d040af2'
      )
    )
  }

  async function handleEdit() {
    if (isEditing) {
      deleteEmptyLines()
      setIsEditing(false)
      await putTraining(training._id!, { title: training.title })
    } else {
      setIsEditing(true)
    }

    let putTrainingLines = JSON.parse(JSON.stringify([...trainingLines]))

    if (isEditing) {
      for (const trainingLine of putTrainingLines) {
        delete trainingLine.__v
        trainingLine.trainingId = trainingLine.trainingId._id
        trainingLine.exerciseId = trainingLine.exerciseId._id
      }
      await putTrainingLineAll(putTrainingLines)
    }
  }
  const updateExerciseMutation = useMutation({
    mutationFn: (trainingLines: UpdateTrainingLine[]) => {
      return putTrainingLineAll(trainingLines)
    },
    onSuccess(data) {
      setTrainingLines((prevstate) => data.data)
    },
  })

  const addExerciseMutation = useMutation({
    mutationFn: (trainingLine: UpdateTrainingLine) => {
      return postTrainingLine(trainingLine)
    },
    onSuccess(data) {
      setTrainingLines((prevstate) => [...prevstate, data.data])
    },
  })

  async function handleDelete(id: string) {
    const trainingLineData = trainingLines.filter((line) => line._id !== id)
    await deleteTrainingLine(id)
    setTrainingLines(trainingLineData)
  }

  async function handleSelect(
    e: React.ChangeEvent<HTMLSelectElement>,
    trainingLine: TrainingLine
  ) {
    let allTrainingLines = trainingLines
    let newExercise = allExercises.filter(
      (exercise) => exercise.title === e.target.value
    )[0]
    trainingLine.exerciseId = newExercise
    let spliceIndex = allTrainingLines.indexOf(trainingLine)
    allTrainingLines.splice(spliceIndex, 1, trainingLine)
    setTrainingLines(
      (prevState) => (
        prevState.splice(spliceIndex, 1, trainingLine), [...prevState]
      )
    )
  }

  function handleLineChange(
    e: React.ChangeEvent<HTMLInputElement>,
    trainingLineId: string
  ) {
    let { name, value } = e.target

    let trainingLinesData = trainingLines
    let trainingLine: any = trainingLines.find((trainingLine) => {
      return trainingLine._id === trainingLineId
    })
    const index: number = trainingLinesData.indexOf(trainingLine!)

    if (parseInt(value) > parseInt('999')) value = '999'
    if (value === '') value = '0'

    trainingLine![name] = value
    trainingLinesData.splice(index, 1, trainingLine!)

    setTrainingLines(
      (prevstate) => (prevstate.splice(index, 1, trainingLine), [...prevstate])
    )
  }

  async function handleStart(trainingLines: TrainingLine[]) {
    if (trainingLines.length === 0) {
      alert('No exercises in the training')
      return
    }
    const id = training._id
    const data = {
      title: training.title,
      timer: training.timer,
      duration: training!.duration,
    }
    data.timer.push(0)

    await putTraining(id!, data)
    navigate(`/trainingCourses/${id}/start`)
  }

  async function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setTraining((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEdit()
  }

  if (
    allExercisesQuery.isLoading ||
    trainingLinesQuery.isLoading ||
    trainingQuery.isLoading
  )
    return <h1>Loading...</h1>

  return (
    <Container>
      <div className="row pt-3">
        <div className="col">
          {isEditing ? (
            <h1 className="pb-5">
              <input
                onKeyDown={(e) => handleEnter(e)}
                style={style.h1element}
                maxLength={50}
                value={training?.title}
                onChange={(e) => handleTitleChange(e)}
                name="title"
              />
            </h1>
          ) : (
            <h1 className="pb-5">{training?.title}</h1>
          )}

          {trainingLines.map((trainingLine) => (
            <div
              className={isEditing ? 'm-3 row' : 'm-3 row'}
              key={trainingLine._id}
            >
              {isEditing && (
                <select
                  className="col-auto"
                  value={trainingLine.exerciseId.title}
                  onChange={(e) => handleSelect(e, trainingLine)}
                >
                  {allExercises.map((exercise) => (
                    <option key={exercise._id}>{exercise.title}</option>
                  ))}
                </select>
              )}
              {isEditing === false && (
                <div className="col-auto" style={style.exerciseTitleStyle}>
                  {trainingLine.exerciseId.title}
                </div>
              )}
              <RenderRepChangeAndDelete
                isEditing={isEditing}
                style={style}
                trainingLine={trainingLine}
                handleFocus={(e) => e.target.select()}
                handleLineChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLineChange(e, trainingLine._id!)
                }
                handleDelete={handleDelete}
              />
              {!isEditing && (
                <div className="col pt-1">
                  {trainingLine.note && 'Note:'} {trainingLine.note}
                </div>
              )}
              <RenderRestTime
                isEditing={isEditing}
                style={style}
                trainingLine={trainingLine}
                handleFocus={(e) => e.target.select()}
                handleLineChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLineChange(e, trainingLine._id!)
                }
              />
            </div>
          ))}
        </div>
        <RightSideBar
          training={training}
          handleEdit={() => handleEdit()}
          handleAddExercise={addExerciseMutation.mutate}
          handleStart={() => handleStart(trainingLines)}
          isEditing={isEditing}
          id={id!}
        />
      </div>
    </Container>
  )
}

export default TrCourse
