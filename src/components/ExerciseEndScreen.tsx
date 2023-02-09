import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { getTrainingLine } from '../service/trainingLineService.tsx'
import { getTraining } from '../service/trainingService.tsx'
import { TrainingLine, Training } from '../utility/interface.tsx'
import { useQueries } from '@tanstack/react-query'

const ExerciseEndScreen = () => {
  const { id } = useParams()
  const [trainingLine, setTrainingLine] = useState<TrainingLine[]>([])
  const [training, setTraining] = useState<Training>({
    _id: '',
    title: 'string',
    duration: 0,
    timer: [],
  })

  const [trainingLineQuer, trainingQuery] = useQueries({
    queries: [
      {
        queryKey: ['trainingLine', 'exerciseEndScreen'],
        queryFn: () => getTrainingLine(id!).then((data) => data.data),
        onSuccess(data: TrainingLine[]) {
          setTrainingLine(data)
        },
      },
      {
        queryKey: ['training', 'exerciseEndScreen'],
        queryFn: () => getTraining(id!).then((data) => data.data),
        onSuccess(data: Training) {
          setTraining(data)
        },
      },
    ],
  })

  if (trainingLineQuer.isLoading || trainingQuery.isLoading)
    return <h1>Loading...</h1>

  return (
    <Container>
      <div>
        <h1>End of {training.title}</h1>
        {trainingLine.map((line) => (
          <li className="m-3" key={line._id}>
            {line.exerciseId.title}
          </li>
        ))}
      </div>
    </Container>
  )
}

export default ExerciseEndScreen
