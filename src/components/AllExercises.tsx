import React, { useState, useMemo, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getExercises } from '../service/exerciseService'
import { Exercise } from '../utility/interface'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const AllExercises: React.FC = () => {
  const [exercises, setExercise] = useState<Exercise[]>([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

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
    queryKey: ['exercises'],
    queryFn: () => getExercises().then((data: any) => data.data),
    onSuccess(data: Exercise[]) {
      setExercise(data)
    },
    staleTime: Infinity,
  })

  useEffect(() => {
    if (exercisesQuery.data) setExercise(exercisesQuery.data!)
  }, [])

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
          className="m-3 col-8 "
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Enter name"
        />
        <div className="col-8">
          <Table className="table table-bordered table-hover border-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Body Part</th>
                <th>Type</th>
              </tr>
            </thead>
            {filtered
              .filter((exericse) => exericse._id !== '6384a9c95cc12ea42d040af2')
              .map((exercise) => (
                <tbody key={exercise._id}>
                  <tr
                    className="table-hover"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/exercises/${exercise._id}`)}
                  >
                    <td>{exercise.title}</td>
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
