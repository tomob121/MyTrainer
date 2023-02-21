import http from './http'
import { Exercise } from '../utility/interface'
import { exercises } from './allExercises'

const apiEndpoint = 'http://localhost:3000/api/exercise'

interface PostExercise {
  title: string
  bodyPart: string
  type: string
}

export function getExercises() {
  return exercises
}

export function getExercise(id: string) {
  return exercises.filter((exercise) => exercise._id === id)
}

export function postExercise(exercise: PostExercise) {
  return http.post(apiEndpoint, exercise)
}

export function putExercise(exercise: Exercise) {
  return http.post(apiEndpoint, exercise)
}

export function deleteExercise(id: string) {
  return http.delete(apiEndpoint + id)
}
