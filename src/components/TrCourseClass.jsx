import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class TrCourseClass extends Component {
  state = {
    training: {
      id: 0,
      title: '',
      trainingLines: [],
      duration: 0,
    },
    counter: 0,
    isEditing: false,
  };

  componentDidMount() {
    this.setState({ training: this.props.training });
  }

  handleEdit = () => {
    let isEditing = false;
    if (this.state.isEditing) {
      isEditing = false;
    } else {
      isEditing = true;
    }
    this.setState({ isEditing });
  };

  handleLineRepChange = (e, trainingLineId) => {
    let trainingLine = this.state.training.trainingLines.find(
      (trainingLine) => trainingLine.id === trainingLineId
    );
    let value = e.target.value;
    trainingLine.reps = value;
    this.setState({});
  };

  render() {
    const { training, isEditing } = this.state;

    return (
      <Container>
        <div className='row pt-3'>
          <div className='col'>
            <h1 className='pb-5'>This is {training.title}</h1>
            {training.trainingLines.map((trainingLine) => (
              <p key={trainingLine.id}>
                {trainingLine.exercise.title}:{' '}
                {isEditing ? (
                  <input
                    className='col-1'
                    key={trainingLine.id}
                    onChange={(e) =>
                      this.handleLineRepChange(e, trainingLine.id)
                    }
                    value={trainingLine.reps}
                  />
                ) : (
                  trainingLine.reps
                )}
              </p>
            ))}
          </div>
          <div className='col-5'>
            <Button className='col-2' onClick={() => this.handleEdit()}>
              {this.state.isEditing ? 'Save' : 'Edit'}
            </Button>
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
