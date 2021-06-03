import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: [true, 'Please add some text'], trim: true })
  name: string;

  @Prop({
    trim: true,
    required: [true, 'Please add your email'],
    unique: true,
    length: 80,
  })
  email: string;

  @Prop({ required: true, length: 64, select: false })
  password: string;

  @Prop({ type: Date, default: Date.now })
  register_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
