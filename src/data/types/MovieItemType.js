import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as Float,
} from 'graphql';

export default new ObjectType({
  name: 'MovieItem',
  fields: {
    title: { type: new NonNull(StringType) },
    rating: { type: new NonNull(Float) },
    release: { type: new NonNull(StringType) },
  },
});
