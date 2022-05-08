import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class TrCourseClass extends Component {
  state = {
    training: {
      id: 0,
      title: '',
      exercises: [{ bodyPart: '', id: 0, reps: 0, title: '', type: '' }],
      duration: 0,
    },
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

  handleChange = (e) => {};

  render() {
    const { training, isEditing } = this.state;

    return (
      <Container>
        <div className='row pt-3'>
          <div className='col'>
            <h1 className='pb-5'>This is {training.title}</h1>
            {training.exercises.map((exercise) => (
              <p key={exercise.id}>
                {exercise.title}:{' '}
                {isEditing ? (
                  <input onChange={this.handleChange()} value={exercise.reps} />
                ) : (
                  exercise.reps
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
