import { usaMapData } from "./Data.js";

const resolvers = {
  Query: {
    usaMapData: (parent, args, context) => {
      const { usaMapData } = context;
      if (!usaMapData) {
        throw new Error("usaMapData is not available");
      }
      const state = usaMapData.find(
        (state) => state.stateCode === args.stateCode
      );
      return state;
    },
  },
};

export default resolvers;
