import mongoose, { Schema, Types } from 'mongoose';

export type SetType = {
  weight: number;
  reps: number;
};

export interface ISets {
  userId: Types.ObjectId;
  exercise: Types.ObjectId;
  workoutDate: string;
  list: SetType[];
}

const SetsSchema = new mongoose.Schema<ISets>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'exercise',
    required: true,
  },
  workoutDate: {
    type: String,
    required: true,
  },
  list: [
    {
      weight: Number,
      reps: Number,
    },
  ],
});

export default mongoose.model('sets', SetsSchema);
