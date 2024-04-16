import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    email: string;
  
    @Prop()
    firstName: string;
  
    @Prop()
    lastName: string;
  
    @Prop()
    password: string;

    @Prop()
    isAdmin:boolean

    @Prop()
    isEmployee:boolean

    @Prop()
  isActive:boolean
}


export const userSchema = SchemaFactory.createForClass(User);