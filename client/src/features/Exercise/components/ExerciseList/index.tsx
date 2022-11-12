import { useEffect, useState } from 'react';
import ExerciseService, {
  ExerciseDataType,
} from '../../services/ExerciseService';
import Exercise from '../Exercise';

const ExerciseList = () => {
  const [list, setList] = useState<ExerciseDataType[]>([]);

  useEffect(() => {
    const getAllExercise = async () => {
      try {
        const response = await ExerciseService.getAll();
        const data: ExerciseDataType[] = response.data;

        setList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllExercise();
  }, []);

  if (!list.length) {
    return <span>운동 목록이 없습니다.</span>;
  }
  return (
    <div>
      <ul className="list-none m-0 p-0">
        {list.map((exercise, index) => {
          const { exerciseName, exerciseType, parts, recordTypes, isAssist } =
            exercise;
          return (
            <li
              key={index}
              className="py-4 border-0 border-t border-gray-200 border-solid first:border-0"
            >
              <Exercise
                exerciseName={exerciseName}
                exerciseType={exerciseType}
                parts={parts}
                recordTypes={recordTypes}
                isAssist={isAssist}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExerciseList;
