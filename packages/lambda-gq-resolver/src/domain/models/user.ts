/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { attribute, table } from '@aws/dynamodb-data-mapper-annotations';
import _ from 'lodash';
import { Field, ObjectType, Root } from 'type-graphql';
import Identifiable from 'src/domain/abstract-models/identifiable';

// interface Deleteable {
//     deleteChildren: () => Promise<void>;
// }
@ObjectType()
@table('User')
class User extends Identifiable {
    @Field()
    @attribute()
    email: string;

    @Field()
    @attribute()
    firstName: string;

    @Field()
    @attribute({})
    lastName: string;

    @Field()
    fullName(@Root() parent: User): string {
        return parent.getFullName();
    }

    private getFullName(): string {
        const { firstName, lastName } = this;
        return `${firstName}${lastName ? ` ${lastName}` : ''}`;
    }
}

export default User;
