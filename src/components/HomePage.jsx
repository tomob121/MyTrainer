import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getExercises } from '../service/fakeExerciseService';

class HomePage extends Component {
  state = {
    exercises: [],
    searchValue: '',
  };

  componentDidMount() {
    const exercises = [...getExercises()];

    this.setState({ exercises });
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  // handleDelete(exercise) {
  //   let exercises = this.state.exercises;
  //   let exerciseLoc = exercises.find(
  //     (exercises) => exercises.title === exercise
  //   );
  //   exercises.splice(exercises.indexOf(exerciseLoc), 1);

  //   this.setState({ exercises });
  // }

  renderTable(exercises) {
    const myStyle = {
      borderLeft: 'solid',
      borderRight: 'solid',
      borderTop: 'solid',
      borderBottom: 'solid',
      borderWidth: '1px',
    };
    return (
      <Table className='table table-outlined' style={myStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Body Part</th>
            <th>Type</th>
          </tr>
        </thead>
        {exercises.map((exercise) => (
          <tbody key={exercise.id}>
            <tr>
              <th scope='row'>{exercise.id}</th>
              <td>{exercise.title}</td>
              <td>{exercise.bodyPart}</td>
              <td>{exercise.type}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    );
  }

  render() {
    const handleSearch = () => {
      let searchedItem = [];
      for (const iterator of this.state.exercises) {
        if (
          iterator.title
            .toLowerCase()
            .includes(this.state.searchValue.toLocaleLowerCase())
        ) {
          searchedItem.push(iterator);
        }
      }
      return searchedItem;
    };

    let searchedExercises = handleSearch();

    return (
      <Container className='container'>
        <div className='row justify-content-center'>
          <input
            autoFocus
            className='m-3 col-8'
            value={this.state.searchValue}
            onChange={this.handleChange}
            type='text'
            placeholder='Title'
          />

          <div className='col-8'>{this.renderTable(searchedExercises)}</div>
        </div>
      </Container>
    );
  }
}

export default HomePage;
