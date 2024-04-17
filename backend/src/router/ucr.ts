import { createTRPCRouter, publicProcedure } from "../trpc";

const STUDENTS = [
  {
    name: "María Rojas",
    id: "B57275",
  },
  {
    name: "Octavio Jara",
    id: "C14165",
  },
  {
    name: "Sergio Aguero",
    id: "A54651",
  },
];

export const ucrRouter = createTRPCRouter({
  students: publicProcedure.query(() => {
    return STUDENTS;
  }),
  studentsDrizzle: publicProcedure.query(({ ctx }) => {
    return ctx.dbClient.query.studentTable.findMany();
  }),
});
