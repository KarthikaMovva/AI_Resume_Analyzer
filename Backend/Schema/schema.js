const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = graphql;

const Resume = require("../Models/Resume");

const ResumeType = new GraphQLObjectType({
    name: "Resume",
    fields: () => ({
        id: { type: GraphQLString },
        fileName: { type: GraphQLString },
        atsScore: { type: GraphQLInt },
        skills: { type: new GraphQLList(GraphQLString) },
        missingSkills: { type: new GraphQLList(GraphQLString) },
        suggestions: { type: new GraphQLList(GraphQLString) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        resumes: {
            type: new GraphQLList(ResumeType),
            resolve() {
                return Resume.find();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});