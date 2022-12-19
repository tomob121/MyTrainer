import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {
  getExercises,
  getExercise,
  getExerciseByTitle,
} from '../service/fakeExerciseService';
import RightSideBar from './RightSideBar';
import RenderRestTime from './RenderRestTime';
import RenderRepChangeAndDelete from './RenderRepChangeAndDelete';

import {
  addTrainingLine,
  deleteEmptyLines,
  trainingLineData,
  updateLineData,
} from '../service/fakeTrainingCourses';
import axios from 'axios';

class TrCourseClass extends Component {
  state = {
    training: {
      _id: 0,
      title: '',
      duration: 0,
      timer: [],
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
    trainingLines: [],
  };

  handleFocus = (e) => e.target.select();

  async componentDidMount() {
    let trainingLine = await axios.get(
      `http://localhost:3000/api/trainingLine/${this.state.training._id}`
    );
    let allExercises = await axios.get(`http://localhost:3000/api/exercise`);
    this.setState({ training: this.props.training });
    this.setState({ allExercises });
    this.setState({ trainingLines: trainingLine.data });
    
  }

  componentWillUnmount() {
    let { trainingLines } = this.state;
    let filteredTrainingLine = trainingLines.filter(
      (line) => line.exerciseId !== 0
    );
    trainingLines = filteredTrainingLine;
    deleteEmptyLines();
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
    this.setState({ trainingLines: trainingLine });
  };

  funkkcija() {}
  funkcija = () => {};
  a = function () {};

  handleDelete(e) {
    let trainingLines = this.state.trainingLines;
    trainingLines = trainingLines.filter((line) => line.id !== e.id);

    this.setState({ trainingLines });
  }

  handleAddTimer() {}

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

    if (!isEditing) {
      updateLineData(this.state.training);
    }

    this.setState({ isEditing });
    this.setState({ training });
  };

  handleStart(training) {
    if (training.trainingLines.length === 0) {
      alert('No exercises in the training');
      return;
    }
    const numb = this.props.id;
    this.handleAddTimer();
    setTimeout(
      () => training.timer.push(0),
      this.props.navigate(`/trainingCourses/${numb}/start`)
    );
  }

  handleTitleChange(e) {
    let training = this.state.training;
    let targetValue = e.target.value;
    training.title = targetValue;

    this.setState({ training });
  }

  render() {
    const { training, isEditing, allExercises } = this.state;

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

    return (
      <Container>
      {  console.log(this.state.training)}
        <div className='row pt-3'>
          <div className='col'>
            {isEditing ? (
              <h1 className='pb-5'>
                <input
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
                    onChange={(e) => this.handleSelect(e, trainingLine.id)}
                  >
                    {allExercises.map((exercise) => (
                      <option key={exercise._id}>{exercise.title}</option>
                    ))}
                  </select>
                )}
                {isEditing === false && (
                  <div className='col-auto' style={style.exerciseTitleStyle}>
                    {trainingLine.exercise.title}
                  </div>
                )}
                <RenderRepChangeAndDelete
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                  handleFocus={this.handleFocus}
                  handleLineChange={this.handleLineChange}
                  handleDelete={(e) => this.handleDelete(trainingLine)}
                />
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
                  handleLineChange={(e) =>
                    this.handleLineChange(e, trainingLine.id, 'restTime')
                  }
                />
              </div>
            ))}
          </div>
          <RightSideBar
            training={training}
            handleEdit={() => this.handleEdit()}
            handleAddExercise={() => this.handleAddExercise()}
            handleStart={() => this.handleStart(training)}
            isEditing={isEditing}
          />
        </div>
      </Container>
    );
  }
}

export default TrCourseClass;
