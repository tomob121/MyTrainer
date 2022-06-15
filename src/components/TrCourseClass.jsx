import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getExercises, getExercise } from '../service/fakeExerciseService';
import { getExerciseByTitle } from './../service/fakeExerciseService';
import { lineDataChange } from './../service/fakeTrainingCourses';
import {
  addTrainingLine,
  changeTrainingExercise,
  deleteEmptyLines,
  deleteTrainingLine,
  trainingLineData,
} from '../service/fakeTrainingCourses';
import { type } from '@testing-library/user-event/dist/type';

class TrCourseClass extends Component {
  state = {
    training: {
      id: 0,
      title: '',
      trainingLines: [],
      duration: 0,
      note: '',
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
      restTime: 0,
      note: '',
    });

    addTrainingLine(parseInt(this.props.id));
    this.setState({ training });
  }

  handleSelect(e, trainingLineId) {
    const { training } = this.state;
    let newExercise = getExerciseByTitle(e.target.value);
    let newTrainingLines = [];
    for (const iterator of training.trainingLines) {
      iterator.exerciseId = iterator.exercise.id;
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

  handleLineChange = (e, trainingLineId, selectedLineChange) => {
    let trainingLine = this.state.training.trainingLines.find(
      (trainingLine) => trainingLine.id === trainingLineId
    );
    let value = e.target.value;
    if ((selectedLineChange === 'restTime') | (selectedLineChange === 'reps')) {
      if (value > 999) value = 999;
      if (value === '') value = 0;
      parseInt(value);
    }

    trainingLine[selectedLineChange] = value;
    lineDataChange(value, trainingLineId, selectedLineChange);
    this.setState({ trainingLines: trainingLine });
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
    const numb = this.props.id;

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
    };

    return (
      <Container>
        <div className='row pt-3'>
          <div className='col'>
            <h1 className='pb-5'>{training.title}</h1>
            {training.trainingLines.map((trainingLine) => (
              <div
                className={isEditing ? 'm-3 row' : 'm-3 row'}
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
                  <div className='col-auto' style={style.exerciseTitleStyle}>
                    {trainingLine.exercise.title} :{' '}
                  </div>
                )}{' '}
                <div className='col-auto row'>
                  {isEditing ? (
                    <div className='row'>
                      <div className='col-auto'>
                        <input
                          onFocus={this.handleFocus}
                          min={0}
                          type={'number'}
                          max={999}
                          style={style.repNumberStyle}
                          key={trainingLine.id}
                          onChange={(e) =>
                            this.handleLineChange(e, trainingLine.id, 'reps')
                          }
                          value={trainingLine.reps}
                        />
                        <Button
                          onClick={(e) => this.handleDelete(trainingLine)}
                          style={{ marginLeft: 30 }}
                          className='btn-danger'
                        >
                          Delete
                        </Button>
                      </div>
                      <div className='col-2'>
                        <input
                          onFocus={this.handleFocus}
                          maxlength='80'
                          style={style.repNumberStyle}
                          value={trainingLine.note}
                          placeholder={'Enter note here'}
                          onChange={(e) =>
                            this.handleLineChange(e, trainingLine.id, 'note')
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='col-auto row'>
                      <div className='col-auto' style={style.repNumberStyle}>
                        {trainingLine.reps}
                      </div>
                    </div>
                  )}
                  {isEditing ? (
                    ''
                  ) : (
                    <div className='col-auto pt-1' style={style.toolTipMessage}>
                      {trainingLine.exercise.type.toLowerCase() === 'endure'
                        ? 'Seconds'
                        : 'Reps'}
                    </div>
                  )}
                </div>
                {isEditing ? (
                  ''
                ) : (
                  <div className='col pt-1'>
                    {trainingLine.note ? 'Note: ' : ''} {trainingLine.note}
                  </div>
                )}
                <div className='row'>
                  {isEditing ? (
                    <div>
                      Rest time:
                      <input
                        onFocus={this.handleFocus}
                        className='col-1 m-1 '
                        style={style.repNumberStyle}
                        min={0}
                        type={'number'}
                        max={999}
                        value={trainingLine.restTime}
                        onChange={(e) =>
                          this.handleLineChange(e, trainingLine.id, 'restTime')
                        }
                      />
                    </div>
                  ) : (
                    <div className='row pt-1'>
                      <div className='col-auto'>
                        Rest Time: {trainingLine.restTime}
                      </div>
                      <div className='col-auto' style={style.toolTipMessage}>
                        Seconds
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='col-3'>
            <div>
              <Button className='col-5 m-1' onClick={() => this.handleEdit()}>
                {this.state.isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div className='col-auto'>
              {this.state.isEditing ? (
                <Button
                  onClick={() => this.handleAddExercise()}
                  style={{ color: 'white' }}
                  className='btn btn-secondary m-1 col-5'
                >
                  Add Exercise
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setTimeout(() =>
                      this.props.navigate(`/trainingCourses/${numb}/start`)
                    )
                  }
                  className='col-5 m-1 btn-success'
                >
                  Start
                </Button>
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
