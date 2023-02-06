
export interface TrainingLine {
    _id: string,
    trainingId: {  
      _id: string,
      title: string,
      bodyPart: string,
      type: string
    },
    exerciseId: {  
      _id: string,
      title: string,
      bodyPart: string,
      type: string
    },
    reps: number,
    restTime: number,
    note: string
  }

export interface Training {
    _id: string,
    title: string,
    duration: number,
    timer: number[]
  }

export interface Exercise {
    _id: string,
    title: string,
    bodyPart: string,
    type: string
  }