import {
  ExerciseDataType,
  EXERCISE_TYPE_DATA,
} from '../../services/ExerciseService';

export type ExerciseCustomProps = ExerciseDataType;
export type ExerciseAttributes = React.HTMLAttributes<HTMLDivElement>;
export type ExerciseProps = ExerciseCustomProps & ExerciseAttributes;
const Exercise: React.FC<ExerciseProps> = ({
  exerciseName,
  exerciseType,
  parts,
  recordTypes,
  isAssist,
  ...props
}) => {
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

export default Exercise;
