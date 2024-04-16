import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Otp  {
  @Prop()
  otp:string

  @Prop()
  verficationtoken:string

  @Prop({ required: true })
  expirationTime: Date;
}


export const OtpSchema = SchemaFactory.createForClass(Otp);
