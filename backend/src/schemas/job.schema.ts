import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

export enum JobStatus {
  Validating = 'Validating',
  Valid = 'Valid',
  Invalid = 'Invalid',
}

@Schema({ timestamps: true })
export class Job {
  @Prop()
  input: string;

  @Prop()
  regex: string;

  @Prop({ enum: JobStatus, default: JobStatus.Validating })
  status: JobStatus;

  @Prop({ required: false })
  error: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
