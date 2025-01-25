import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Purchase {
  @Field(() => Int)
  id: number;

  @Field()
  itemName: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  totalAmount: number;
}