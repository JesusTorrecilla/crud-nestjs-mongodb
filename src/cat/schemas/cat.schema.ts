import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop({ default: 'Siamés' })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
