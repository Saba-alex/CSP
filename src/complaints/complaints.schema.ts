import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Complaint {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({type:mongoose.Schema.Types.ObjectId})
  complaintCategoryId: String

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: string; 

  @Prop({
    enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;
}

export const ComplaintsSchema = SchemaFactory.createForClass(Complaint);
