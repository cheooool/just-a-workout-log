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
      <div className="flex items-center">
        {/* 운동 부위 */}
        <div className="basis-[80px] text-center">
          <span className="font-bold px-4">{parts}</span>
        </div>

        {/* 운동 정보 */}
        <div className="grow basis-0 pr-2">
          <div className="pb-2">
            <span className="text-xl font-bold">{exerciseName}</span>
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
    </div>
  );
};

export default Exercise;
