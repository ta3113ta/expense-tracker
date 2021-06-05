import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'users/schemas/users.schema';
import * as mongoose from 'mongoose';

export type TransectionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ trim: true, required: [true, 'Plase add some text'] })
  text: string;

  @Prop({ required: [true, 'Please add a positive or negative number'] })
  amount: number;

  @Prop()
  date: Date;

  @Prop({ default: Date.now })
  createAt: Date;
}

export const TransectionSchema = SchemaFactory.createForClass(Transaction);
