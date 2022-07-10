import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import DialogConfirmation from './DialogConfirmation';

const TrainingCourses = ({ trainingsProps, deleteTraining, addTraining }) => {
  const styles = {
    cardStyle: {
      width: '18rem',
      cursor: 'pointer',
      color: 'white',
    },
    cardTextStyle: {
      maxHeight: 200,
    },
  };

  const [trainings, setTrainings] = useState(trainingsProps);
  const navigate = useNavigate();
  const [followUpdate, setFollowUpdate] = useState(0);
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  });
  const currentId = useRef();

  function handleDeleteTraining(trainingId, stringValue) {
    let confirmation = stringValue;
    currentId.current = trainingId;
    let exactTrainig = trainings.filter((tr) => tr.id === currentId.current)[0];
    if (confirmation !== 'yes')
      if (exactTrainig.trainingLines.length > 0) {
        setDialog({
          message: 'Are you sure you want to delete',
          isLoading: true,
        });
        return;
      }
    setDialog({
      message: '',
      isLoading: false,
    });
    let filtered = trainings.filter(
      (training) => training.id !== currentId.current
    );
    deleteTraining(currentId.current);
    setTrainings(filtered);
  }

  const handleCancleDelete = () => {
    setDialog({ message: '', isLoading: false });
  };

  useEffect(() => setTrainings(trainingsProps), [trainingsProps, followUpdate]);

  function handleAddTraining() {
    setFollowUpdate(followUpdate + 1);
    addTraining();
  }

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds; // Return is MM : SS
  }

  function handleAvrageTrainingDuration(trainingID) {
    let filteredTraining = trainings.filter(
      (training) => training.id === trainingID
    );

    let sum = filteredTraining[0].timer.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    sum = sum / filteredTraining[0].timer.length;

    if (!sum) sum = 0;

    return convertHMS(sum);
  }

  return (
    <Container>
      <div className='row mt-3'>
        <div className='col'>
          {trainings.map((training) => (
            <Card
              className='p-2 m-2 bg-primary card'
              key={training.id}
              style={styles.cardStyle}
            >
              <Card.Title
                onClick={() => navigate(`/trainingCourses/${training.id}`)}
              >
                {training.title}
              </Card.Title>
              <SimpleBar
                onClick={() => navigate(`/trainingCourses/${training.id}`)}
                autoHide={false}
                style={styles.cardTextStyle}
              >
                {training.trainingLines.map((trainingLine) => (
                  <Card.Text key={trainingLine.id}>
                    {trainingLine.exercise.title}
                  </Card.Text>
                ))}
              </SimpleBar>
              <div className='row mt-2 '>
                <div className='col'>
                  <Button
                    className='btn btn-danger '
                    onClick={() => handleDeleteTraining(training.id)}
                  >
                    Delete
                  </Button>
                </div>
                {training.trainingLines.length > 0 && (
                  <div className='col-7' style={{ textAlign: 'end' }}>
                    Avg. Duration: {handleAvrageTrainingDuration(training.id)}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className='col'>
          <Button
            className='btn btn-success'
            onClick={() => handleAddTraining()}
          >
            Add Trainig
          </Button>
        </div>
      </div>
      {dialog.isLoading && (
        <DialogConfirmation
          usingDeleteTrainign={() =>
            handleDeleteTraining(currentId.current, 'yes')
          }
          usingCancelDelete={handleCancleDelete}
          message={dialog.message}
        />
      )}
    </Container>
  );
};

export default TrainingCourses;
