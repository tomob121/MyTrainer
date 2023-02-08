import React, { useState, useMemo } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getExercises } from '../service/exerciseService.tsx'
import { Exercise } from '../utility/interface.tsx'
import { useQuery } from '@tanstack/react-query'

const AllExercises: React.FC = () => {
  const [exercises, setExercise] = useState<Exercise[]>([])
  const [searchValue, setSearchValue] = useState('')

  const filtered = useMemo(() => {
    return exercises.filter((exercise) => {
      return exercise.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    })
  }, [exercises, searchValue])

  const styles = {
    borderStyle: {
      borderLeft: 'solid',
      borderRight: 'solid',
      borderTop: 'solid',
      borderBottom: 'solid',
      borderWidth: '1px',
      borderRadius: '25px',
    },
  }

  const exercisesQuery = useQuery({
    queryKey: ['exercises', 'allExercises'],
    queryFn: () => getExercises().then((exercise) => exercise.data),
    onSuccess(data) {
      setExercise(data)
    },
  })

  if (exercisesQuery.isLoading) return <h1>Loading...</h1>
  if (exercisesQuery.isError) {
    console.log(exercisesQuery.error)
    return <h1>Faild to load data</h1>
  }

  return (
    <Container className="container">
      <div className="row justify-content-center">
        <input
          style={{
            borderRadius: '4px',
          }}
          autoFocus
          className="m-3 col-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <div className="col-8">
          <Table style={styles.borderStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Body Part</th>
                <th>Type</th>
              </tr>
            </thead>
            {filtered.map((exercise) => (
              <tbody key={exercise._id}>
                <tr>
                  <td>
                    <Link to={`/exercises/${exercise._id}`}>
                      {exercise.title}
                    </Link>
                  </td>
                  <td>{exercise.bodyPart}</td>
                  <td>{exercise.type}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </Container>
  )
}

export default AllExercises
