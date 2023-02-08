import http from './http.ts'
import { Exercise } from '../utility/interface.tsx'

const apiEndpoint = 'http://localhost:3000/api/exercise'

interface PostExercise {
    title: string
    bodyPart: string
    type: string
}

export function getExercises() {
    return http.get(apiEndpoint)
}

export function getExercise(id: string) {
    return http.get(apiEndpoint + '/' + id)
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
