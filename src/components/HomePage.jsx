import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HomePage extends Component {
  state = {
    exercises: [],
    searchValue: '',
  };

  async componentDidMount() {
    const { data: exercises } = await axios.get('http://localhost:3000/api/exercise');

    this.setState({ exercises });
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  renderTable(exercises) {
    const myStyle = {
      borderLeft: 'solid',
      borderRight: 'solid',
      borderTop: 'solid',
      borderBottom: 'solid',
      borderWidth: '1px',
      borderRadius: '25px',
    };
    return (
      <Table style={myStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Body Part</th>
            <th>Type</th>
          </tr>
        </thead>
        {exercises.map((exercise) => (
          <tbody key={exercise._id}>
            <tr>
              <td>
                <Link to={`/exercises/${exercise._id}`}>{exercise.title}</Link>
              </td>
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
            style={{ borderRadius: '4px' }}
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
