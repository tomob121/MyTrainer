import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import RightSideBar from './RightSideBar.tsx';
import RenderRestTime from './RenderRestTime.tsx';
import RenderRepChangeAndDelete from './RenderRepChangeAndDelete.tsx';
import { getExercises } from '../../service/exerciseService.tsx';
import { putTraining } from '../../service/trainingService.tsx';
import {
  deleteTrainingLine,
  postTrainingLine,
  getTrainingLine,
  postTrainingLineAll,
} from '../../service/trainingLineService.tsx';
import { Exercise, TrainingLine, Training } from '../../utility/interface.tsx'

type MyProps ={
  training: Training,
  id: string,
  navigate: (navigateLocation: string) => void
}


type MyState ={
  training: Training
  allExercises: Exercise[],
  counter: number,
  isEditing: boolean,
  trainingLines: TrainingLine[]
}

  
class TrCourse extends Component<MyProps> {
  state: MyState = {
    training: {
      _id: '',
      title: '',
      duration: 0,
      timer: [],
    },
    allExercises: [
      {
        _id: '',
        title: '',
        bodyPart: '',
        type: '',
      },
    ],
    counter: 0,
    isEditing: false,
    trainingLines: [],
  };

  handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => e.target.select();

  async componentDidMount() {
    const { data: allExercises } = await getExercises();
    const { data: trainingLines } = await getTrainingLine(
      this.props.id
      );
      this.deleteEmptyLines();
      this.setState({
        training: this.props.training,
        allExercises,
        trainingLines,
      });
      console.log(this.state);
  }

  componentWillUnmount() {
    this.deleteEmptyLines();
  }

  async deleteEmptyLines() {
    let trainingLines = this.state.trainingLines;
    let deletedEmptyTrainingLines: TrainingLine[] = [];
    for (const trainingLine of trainingLines) {
      if (trainingLine.exerciseId._id === '6384a9c95cc12ea42d040af2') {
        await deleteTrainingLine(trainingLine._id);
      } else {
        deletedEmptyTrainingLines.push(trainingLine);
      }
    }


    this.setState({trainingLines: deletedEmptyTrainingLines});
  }

  handleEdit = async () => {
    let training = this.state.training;
    let trainingLines = this.state.trainingLines;
    let isEditing = false;
    if (this.state.isEditing) {
      await this.deleteEmptyLines();
      isEditing = false;
    } else {
      isEditing = true;
    }

    let postTrainingLines = JSON.parse(JSON.stringify([...trainingLines]));

    if (postTrainingLines.length > 0 && !isEditing) {
      for (const trainingLine of postTrainingLines) {
        delete trainingLine._id;
        delete trainingLine.__v;
        trainingLine.trainingId =
          trainingLine.trainingId._id || trainingLine.trainingId;
        trainingLine.exerciseId =
          trainingLine.exerciseId._id || trainingLine.exerciseId;
      }
      await postTrainingLineAll(postTrainingLines);
    }

    this.setState({ isEditing });
  };

  async handleAddExercise() {
    const currentTrainingLines = this.state.trainingLines;

    const { data: newTrainingLine } = await postTrainingLine({
      trainingId: this.state.training._id,
      exerciseId: '6384a9c95cc12ea42d040af2',
      reps: 0,
      restTime: 0,
      note: '',
    });

    const newTrainingLines = [...currentTrainingLines, newTrainingLine];
    this.setState({ trainingLines: newTrainingLines });
  }

  async handleSelect(e: React.ChangeEvent<HTMLSelectElement>, trainingLine: TrainingLine) {
    const { trainingLines, allExercises } = this.state;
    let allTrainingLines = trainingLines;
    let newExercise = allExercises.filter(
      (exercise) => exercise.title === e.target.value
    )[0];
    trainingLine.exerciseId = newExercise;
    let spliceIndex = allTrainingLines.indexOf(trainingLine);
    allTrainingLines.splice(spliceIndex, 1, trainingLine);

    this.setState({ trainingLines: allTrainingLines });
  }

  handleLineChange = (e: React.ChangeEvent<HTMLInputElement>, trainingLineId: string, selectedLineChange: string) => {
    let trainingLines = this.state.trainingLines;
    let trainingLine: any = trainingLines.find(
      (trainingLine) => trainingLine._id === trainingLineId
    );
    const index: number = trainingLines.indexOf(trainingLine);
    let value:number = parseInt(e.target.value);

    if ((selectedLineChange === 'restTime') || (selectedLineChange === 'reps')) {
      if (value > 999) value = 999
    }
    trainingLine[selectedLineChange] = value;
    trainingLines.splice(index, 1, trainingLine);

    this.setState({ trainingLines });
  };

  handleDelete(e: React.ChangeEvent<HTMLInputElement>) {
    let trainingLines = this.state.trainingLines.filter((line) => line._id !== e.target.value);
    this.setState({ trainingLines });
  }

  async handleStart(trainingLines: TrainingLine[]) {
    if (trainingLines.length === 0) {
      alert('No exercises in the training');
      return;
    }
    const id = this.state.training._id;
    const training = this.state.training
    const data = {
      title: training.title,
      timer: training.timer,
      duration: training.duration
    }
    data.timer.push(0)
    console.log(data);
    await putTraining(id, data )
    setTimeout(() => this.props.navigate(`/trainingCourses/${id}/start`));
  }

  handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let training = this.state.training;
    let targetValue = e.target.value;
    training.title = targetValue;

    this.setState({ training });
  }

  handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.handleEdit();
    }
  }

  render() {
    const { training, isEditing, allExercises, trainingLines } = this.state;

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
    };



  try {
    return (
      <Container>
        <div className='row pt-3'>
          <div className='col'>
            {isEditing ? (
              <h1 className='pb-5'>
                <input
                  onKeyDown={(e) => this.handleEnter(e)}
                  style={style.h1element}
                  maxLength={50}
                  value={training.title}
                  onChange={(e) => this.handleTitleChange(e)}
                />
              </h1>
            ) : (
              <h1 className='pb-5'>{training.title}</h1>
            )}

            {this.state.trainingLines.map((trainingLine) => (
              <div
                className={isEditing ? 'm-3 row' : 'm-3 row'}
                key={trainingLine._id}
              >
                {isEditing && (
                  <select
                    className='col-auto'
                    value={trainingLine.exerciseId.title}
                    onChange={(e) => this.handleSelect(e , trainingLine)}
                  >
                    {allExercises.map((exercise) => (
                      <option key={exercise._id}>{exercise.title}</option>
                    ))}
                  </select>
                )}
                {isEditing === false && (
                  <div className='col-auto' style={style.exerciseTitleStyle}>
                    {trainingLine.exerciseId.title}
                  </div>
                )}
                {/* <RenderRepChangeAndDelete
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                  handleFocus={this.handleFocus}
                  handleLineChange={this.handleLineChange}
                  handleDelete={this.handleDelete}
                /> */}
                {!isEditing && (
                  <div className='col pt-1'>
                    {trainingLine.note && 'Note:'} {trainingLine.note}
                  </div>
                )}
                <RenderRestTime
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                  handleFocus={this.handleFocus}
                  handleLineChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleLineChange(e, trainingLine._id, 'restTime')
                  }
                />
              </div>
            ))}
          </div>
          <RightSideBar
            training={training}
            handleEdit={() => this.handleEdit()}
            handleAddExercise={() => this.handleAddExercise()}
            handleStart={() => this.handleStart(trainingLines)}
            isEditing={isEditing}
          />
        </div>
      </Container>
    );
  } catch (error) {
  
  }
  }
  
}

export default TrCourse;
