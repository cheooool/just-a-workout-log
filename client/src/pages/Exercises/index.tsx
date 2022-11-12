import AddExercise from '../../features/exercise/components/AddExercise';
import EditExercise from '../../features/exercise/components/EditExercise';
import ExerciseList from '../../features/exercise/components/ExerciseList';
import PageLayout from '../../layouts/PageLayout';

const Exercises = () => {
  return (
    <PageLayout>
      <ExerciseList />
      <AddExercise />
      <EditExercise />
    </PageLayout>
  );
};

export default Exercises;
