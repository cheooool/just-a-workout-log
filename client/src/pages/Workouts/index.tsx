import { Button, Modal } from 'antd';
import { useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Calendar from '../../features/workout/components/Calendar';
import ExerciseList from '../../features/exercise/components/ExerciseList';
import SetsList from '../../features/sets/components/SetsList';

const Workouts = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleShowingModal = (value: boolean) => {
    setIsShowing(value);
  };

  return (
    <PageLayout
      headerProps={{
        title: '오늘의 운동',
        extra: (
          <Button
            type="link"
            className="px-0"
            onClick={() => handleShowingModal(true)}
          >
            운동 추가
          </Button>
        ),
      }}
    >
      <div>
        <Calendar />
        <SetsList />

        {isShowing && (
          <Modal
            className="top-0"
            open={isShowing}
            onCancel={() => handleShowingModal(false)}
          >
            <ExerciseList />
          </Modal>
        )}
      </div>
    </PageLayout>
  );
};

export default Workouts;
