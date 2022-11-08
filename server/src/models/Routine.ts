import mongoose, { Types, Schema } from 'mongoose';

export interface IRoutine {
  userId: Types.ObjectId;
  routineName: string;
  craetedAt?: Date;
}

const RoutineSchema = new mongoose.Schema<IRoutine>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  routineName: {
    type: String,
    unique: true,
    required: true,
  },
  craetedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('routine', RoutineSchema);
