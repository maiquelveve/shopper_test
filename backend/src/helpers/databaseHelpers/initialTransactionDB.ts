import { connectionSql } from "../../database/connectionSql";

export const initialTransactionDB = async () => await connectionSql.transaction();
