import mongoose, { Schema, Types } from 'mongoose';

export interface IWorkout {
  userId: Types.ObjectId;
  workoutDate: string;
  list: Types.Array<{
    setsId: Types.ObjectId;
  }>;
}
const WorkoutSchema = new mongoose.Schema<IWorkout>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
  workoutDate: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  list: [
    {
      setsId: {
        type: Schema.Types.ObjectId,
        ref: 'sets',
      },
    },
  ],
});
export default mongoose.model('workout', WorkoutSchema);
