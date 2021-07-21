import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
// import { ObjectID } from "mongodb";
import { ObjectId } from "mongodb";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  // id: ObjectID;
  id: ObjectId;
  
  @Field()
  @Column() //6
  productName: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  numberInStock: number
}
