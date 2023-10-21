import postgres from "postgres";

export const sql = postgres(process.env["DATABASE_URL"]!, {
  types: {
    bigint: postgres.BigInt,
  },
  transform: {
    column: postgres.toCamel,
  },
});
