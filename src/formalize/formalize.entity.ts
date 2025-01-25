import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Formalize {
  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  details: string;

  @Field()
  status: string;
}
