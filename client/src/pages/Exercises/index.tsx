import { useCallback, useState } from 'react';
import AddExercise from '../../features/exercise/components/AddExercise';
import ExerciseList from '../../features/exercise/components/ExerciseList';
import PageLayout from '../../layouts/PageLayout';

const Exercises = () => {
  const [addOpen, setAddOpen] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setAddOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setAddOpen(false);
  }, []);
  return (
    <PageLayout>
      <button onClick={handleOpenModal}>운동 생성</button>
      <ExerciseList />
      {addOpen && (
        <AddExercise
          open={addOpen}
          onCancel={handleCloseModal}
          onCloseModal={handleCloseModal}
        />
      )}
    </PageLayout>
  );
};

export default Exercises;
