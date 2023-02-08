import http from './http.ts'
import { Training } from '../utility/interface.tsx'

const apiEndpoint = 'http://localhost:3000/api/training'
const trainingLineApiEndpoint = 'http://localhost:3000/api/trainingLine'

interface PostTraining {
    title?: string
    duration?: number
    timer?: number[]
}

export function getTrainings() {
    return http.get(apiEndpoint)
}

export function getTraining(id: string) {
    return http.get(apiEndpoint + '/' + id)
}

export function postTraining(training: PostTraining) {
    return http.post(apiEndpoint, training)
}

export function putTraining(id: string, exercise: PostTraining) {
    return http.put(apiEndpoint + '/' + id, exercise)
}

export function deleteTraining(id: string) {
    http.delete(trainingLineApiEndpoint + '/all/' + id)
    return http.delete(apiEndpoint + '/' + id)
}
