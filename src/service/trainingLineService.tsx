import http from './http'
import { TrainingLine, Exercise } from '../utility/interface'
import { UpdateTrainingLine } from '../utility/interface'


const apiEndpoint = 'http://localhost:3000/api/trainingLine'

export function getTrainingLines() {
  return http.get(apiEndpoint)
}

export function getTrainingLine(id: string) {
  return http.get(apiEndpoint + '/' + id)
}

export function postTrainingLine(training: UpdateTrainingLine) {
  return http.post(apiEndpoint, training)
}
export function postTrainingLineAll(training: UpdateTrainingLine[]) {
  return http.post(apiEndpoint + '/all', training)
}
export function putTrainingLineAll(training: UpdateTrainingLine[]) {
  return http.put(apiEndpoint + '/all', training)
}

export function putTrainingLine(trainingLineId: number, exercise: Exercise) {
  return http.put(apiEndpoint + '/' + trainingLineId, exercise)
}

export function deleteTrainingLine(id: string) {
  return http.delete(apiEndpoint + '/' + id)
}
