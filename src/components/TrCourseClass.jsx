import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getExercises, getExercise } from '../service/fakeExerciseService';
import { getExerciseByTitle } from './../service/fakeExerciseService';
import {
  addTrainingLine,
  changeTrainingExercise,
  deleteEmptyLines,
  deleteTrainingLine,
  trainingLineData,
} from '../service/fakeTrainingCourses';

class TrCourseClass extends Component {
  state = {
    training: {
      id: 0,
      title: '',
      trainingLines: [],
      duration: 0,
    },
    allExercises: [
      {
        id: 0,
        title: '',
        bodyPart: '',
        type: '',
      },
    ],
    counter: 0,
    isEditing: false,
  };

  handleFocus = (e) => e.target.select();

  componentDidMount() {
    this.setState({ training: this.props.training });
    this.setState({ allExercises: getExercises() });
  }
  handleAddExercise() {
    let training = this.state.training;
    training.trainingLines.push({
      id: trainingLineData[trainingLineData.length - 1].id + 1,
      trainingId: parseInt(this.props.id),
      exerciseId: 0,
      reps: 0,
      exercise: getExercise(0),
    });
    addTrainingLine(parseInt(this.props.id));
    this.setState({ training });
  }

  handleSelect(e, trainingLineId) {
    const { training } = this.state;
    let newExercise = getExerciseByTitle(e.target.value);
    let newTrainingLines = [];
    for (const iterator of training.trainingLines) {
      console.log(iterator);
      if (iterator.id === trainingLineId) {
        iterator.exercise = newExercise;
        newTrainingLines.push(iterator);
      } else {
        newTrainingLines.push(iterator);
      }
    }

    training.trainingLines[training.trainingLines.length - 1].exerciseId =
      newTrainingLines[newTrainingLines.length - 1].exercise.id;
    training.trainingLines = newTrainingLines;
    this.setState({ training });
    changeTrainingExercise(trainingLineId, e.target.value);
  }

  handleLineRepChange = (e, trainingLineId) => {
    let trainingLine = this.state.training.trainingLines.find(
      (trainingLine) => trainingLine.id === trainingLineId
    );
    let value = e.target.value;
    if (value > 999) value = 999;
    trainingLine.reps = value;
    this.setState({});
  };

  handleDelete(e) {
    let training = this.state.training;
    training.trainingLines = training.trainingLines.filter(
      (line) => line.id !== e.id
    );
    deleteTrainingLine(e.id);

    this.setState({ training });
  }

  handleEdit = () => {
    let training = this.state.training;
    let isEditing = false;
    if (this.state.isEditing) {
      isEditing = false;
    } else {
      isEditing = true;
    }
    let filteredTrainingLine = training.trainingLines.filter(
      (line) => line.exerciseId !== 0
    );
    training.trainingLines = filteredTrainingLine;
    deleteEmptyLines();

    this.setState({ isEditing });
    this.setState({ training });
  };

  render() {
    const { training, isEditing, allExercises } = this.state;
    const exerciseTitleStyle = {
      color: 'Black',
      fontSize: 20,
      fontWeight: 400,
    };
    const repNumberStyle = { padding: 0, fontSize: 19 };
    const toolTipMessage = {
      fontStyle: 'italic',
      opacity: 0.5,
    };

    return (
      <Container>
        <div className='row pt-3'>
          <div className='col'>
            <h1 className='pb-5'>This is {training.title}</h1>
            {training.trainingLines.map((trainingLine) => (
              <div
                className={isEditing ? 'm-3 row col-auto' : 'm-3 row col-auto '}
                key={trainingLine.id}
              >
                {isEditing ? (
                  <select
                    className='col-auto'
                    value={trainingLine.exercise.title}
                    onChange={(e) => this.handleSelect(e, trainingLine.id)}
                  >
                    {allExercises.map((exercise) => (
                      <option key={exercise.id}>{exercise.title}</option>
                    ))}
                  </select>
                ) : (
                  ''
                )}{' '}
                {isEditing ? (
                  ''
                ) : (
                  <div className='col-auto' style={exerciseTitleStyle}>
                    {trainingLine.exercise.title} :{' '}
                  </div>
                )}{' '}
                <div className='col-auto row'>
                  {isEditing ? (
                    <div className='col-auto'>
                      <input
                        onFocus={this.handleFocus}
                        min={0}
                        type={'number'}
                        max={999}
                        className='col-auto  '
                        style={{ textAlign: 'center' }}
                        key={trainingLine.id}
                        onChange={(e) =>
                          this.handleLineRepChange(e, trainingLine.id)
                        }
                        value={trainingLine.reps}
                      />
                      <Button
                        onClick={(e) => this.handleDelete(trainingLine)}
                        style={{ marginLeft: 30 }}
                        className='btn-danger'
                        disabled={
                          training.trainingLines.length >= 2 ? false : true
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <div className='col-auto' style={repNumberStyle}>
                      {trainingLine.reps}
                    </div>
                  )}
                  {isEditing ? (
                    ''
                  ) : (
                    <div className='col-auto pt-1' style={toolTipMessage}>
                      {trainingLine.exercise.type.toLowerCase() === 'endure'
                        ? 'Seconds'
                        : 'Reps'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='col-3'>
            <div>
              <Button className='col-5' onClick={() => this.handleEdit()}>
                {this.state.isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div>
              {this.state.isEditing ? (
                <Button
                  onClick={() => this.handleAddExercise()}
                  style={{ color: 'white' }}
                  className='btn btn-success mt-3 col-5'
                >
                  Add Exercise
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          Approximate duration {training.duration} min
        </div>
      </Container>
    );
  }
}

export default TrCourseClass;
