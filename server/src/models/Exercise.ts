import mongoose from 'mongoose';

export interface IExercise {
  // 운동 타입 (웨이트, 맨몸, 유산소)
  exerciseType: string;
  // 운동 부위
  parts: string;
  // 운동명
  exerciseName: string;
  // 기록 타입 무게+개수 / 시간 기록 / 개수만 기록
  recordTypes: ('weight' | 'reps' | 'time')[];
  // 어시스트 머신
  isAssist: boolean;
  createdAt?: Date;
}

const ExerciseSchema = new mongoose.Schema<IExercise>({
  exerciseType: {
    type: String,
    default: '',
  },
  parts: {
    type: String,
    default: '',
  },
  exerciseName: {
    type: String,
    unique: true,
    required: true,
  },
  recordTypes: [
    {
      type: String,
      required: true,
    },
  ],
  isAssist: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('exercises', ExerciseSchema);
