import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ComplaintCategory  {
  @Prop()
  name:String
}


export const ComplaintsCategorySchema = SchemaFactory.createForClass(ComplaintCategory );
