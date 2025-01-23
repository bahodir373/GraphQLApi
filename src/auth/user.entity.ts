import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
export class User {
  @Field(() => Int)
  ID: number;

  @Column()
  @Field()
  Username: string;

  @Column()
  @Field()
  Email: string;

  @Column()
  @Field()
  Password: string;
}
