import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import RightSideBar from './Components/RightSideBar'
import RestTime from './Components/RestTime'
import RenderRepDeleteNote from './Components/RenderRepDeleteNote'
import { getExercises } from '../../service/exerciseService'
import { getTraining, putTraining } from '../../service/trainingService'
import {
  deleteTrainingLine,
  postTrainingLine,
  getTrainingLine,
  putTrainingLineAll,
} from '../../service/trainingLineService'
import { Exercise, TrainingLine, Training } from '../../utility/interface'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateTrainingLine } from '../../utility/interface'
import EditingCourse from './EditingCourse'
import DisplayCourse from './DisplayCourse'

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
  const queryClient = useQueryClient()
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
      textAlign: '',
    },
    toolTipMessage: {
      paddingTop: 5,
      fontStyle: 'italic',
      opacity: 0.5,
    },
    h1element: {
      fontWeight: 500,
      fontSize: '39',
      borderRadius: 4,
    },
  }

  const [allExercisesQuery, trainingLinesQuery, trainingQuery] = useQueries({
    queries: [
      {
        queryKey: ['allExercises'],
        queryFn: () => getExercises(),
        onSuccess(data: Exercise[]) {
          setAllExercises(data)
        },
        // staleTime: Infinity,
      },
      {
        queryKey: ['trainingLines'],
        queryFn: () => getTrainingLine(id!).then((data: any) => data.data),
        onSuccess(data: TrainingLine[]) {
          setTrainingLines(data)
        },
        // staleTime: Infinity,
      },
      {
        queryKey: ['training'],
        queryFn: () => getTraining(id!).then((data: any) => data.data),
        onSuccess(data: Training) {
          setTraining(data)
        },
        // staleTime: Infinity,
        onError(err: any) {
          console.log(err)
          navigate('/trainingCourses')
          alert('No training course found with that id')
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
      updateExerciseMutation.mutate(putTrainingLines)
    }
  }

  const updateExerciseMutation = useMutation({
    mutationFn: (trainingLines: UpdateTrainingLine[]) => {
      return putTrainingLineAll(trainingLines)
    },
  })

  const addExerciseMutation = useMutation({
    mutationFn: (trainingLine: UpdateTrainingLine) => {
      return postTrainingLine(trainingLine)
    },
    onSuccess(data: any) {
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
    let { name, value, type } = e.target

    let trainingLinesData = trainingLines
    let trainingLine: any = trainingLines.find((trainingLine) => {
      return trainingLine._id === trainingLineId
    })
    const index: number = trainingLinesData.indexOf(trainingLine!)

    if (parseInt(value) > parseInt('999')) value = '999'
    if (name === 'reps' || name === 'restTime') if (value === '') value = '0'

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

  if (isEditing) {
    return (
      <Container className="container mt-3">
        <EditingCourse
          handleDelete={() => handleDelete(id!)}
          handleEnter={handleEnter}
          handleLineChange={handleLineChange}
          handleSelect={handleSelect}
          handleTitleChange={handleTitleChange}
          isEditing={isEditing}
          allExercises={allExercises}
          training={training}
          trainingLines={trainingLines}
          addExerciseMutation={addExerciseMutation}
          handleEdit={handleEdit}
          handleStart={handleStart}
        />
      </Container>
    )
  }

  return (
    <Container className="container mt-3">
      <DisplayCourse
        addExerciseMutation={addExerciseMutation}
        handleEdit={handleEdit}
        handleLineChange={handleLineChange}
        handleStart={handleStart}
        id={id!}
        isEditing={isEditing}
        style={style}
        training={training}
        trainingLines={trainingLines}
      />
    </Container>
  )
}

export default TrCourse
