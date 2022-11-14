import { IExerciseResponse } from '../../../../api/exerciseApi';

const EXERCISE_TYPE_DATA: {
  [key: string]: string;
} = {
  '0': '웨이트',
  '1': '맨몸운동',
};

export type ExerciseInfoType = Omit<
  IExerciseResponse,
  '_id' | 'userId' | 'createdAt' | 'isAssist'
>;

export type ExerciseDataCustomProps = {
  info: ExerciseInfoType;
};
export type ExerciseDataAttributes = React.HTMLAttributes<HTMLDivElement>;
export type ExerciseDataProps = ExerciseDataCustomProps &
  ExerciseDataAttributes;
const ExerciseData: React.FC<ExerciseDataProps> = ({ info, ...props }) => {
  const { parts, exerciseName, exerciseType, recordTypes } = info;
  return (
    <div {...props}>
      {/* 운동 정보 */}
      <div className="pr-2">
        <div className="pb-2">
          <span className="text-lg font-bold break-all">
            {parts} {exerciseName}
          </span>
        </div>
        <div>
          <span>{exerciseType && EXERCISE_TYPE_DATA[exerciseType]}</span>
        </div>
        <div>
          <span>
            {recordTypes
              .reduce((arr: string[], type) => {
                if ('weight' === type) {
                  arr.push('무게');
                }
                if ('reps' === type) {
                  arr.push('횟수');
                }
                return arr;
              }, [])
              .join(' x ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseData;
