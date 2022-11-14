import { Button } from 'antd';
import { useState } from 'react';
import AddExerciseModal from '../../features/exercise/components/AddExerciseModal';
import ExerciseList from '../../features/exercise/components/ExerciseList';
import PageLayout from '../../layouts/PageLayout';

const Exercises = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleShowingModal = (value: boolean) => {
    setIsShowing(value);
  };

  return (
    <PageLayout
      pageHeaderProps={{
        title: '운동 목록',
        extra: (
          <Button
            className="px-0"
            type="link"
            onClick={() => handleShowingModal(true)}
          >
            새로운 운동 추가
          </Button>
        ),
      }}
    >
      <ExerciseList />
      {isShowing && (
        <AddExerciseModal
          open={isShowing}
          onClose={() => handleShowingModal(false)}
        />
      )}
    </PageLayout>
  );
};

export default Exercises;
