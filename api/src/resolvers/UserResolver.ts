// src/resolvers/UserResolver.ts
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UserModel } from '../models/User'; // Your Mongoose user model
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class UserType {
    @Field(() => ID)
    id?: string;

    @Field()
    name?: string;

    @Field()
    email?: string;
}

@Resolver()
export class UserResolver {
    @Query(() => [UserType])
    async users() {
        return UserModel.find().exec();
    }

    @Mutation(() => UserType)
    async createUser(
        @Arg('name') name: string,
        @Arg('email') email: string
    ): Promise<UserType> {
        const user = new UserModel({ name, email });
        await user.save();
        return user.toObject(); // Convert Mongoose document to plain object
    }
}
