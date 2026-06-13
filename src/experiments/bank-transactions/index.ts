import { generate } from "rxjs";

type Transaction = {
  id: string;
  status: string;
  errorMessage?: string;
  completedAt?: Date;
  refundedAt?: Date;
};

enum EStatus {
  PENDING,
  COMLETED,
  FAILED,
  REFUNDED,
}

type TPending = {
  id: string;
  time: Date;
  status: EStatus.PENDING;
};

type TCompleted = {
  id: string;
  time: Date;
  status: EStatus.COMLETED;
};

type TFailed = {
  id: string;
  time: Date;
  status: EStatus.FAILED;
  errorMessage: string;
};

type TRefunded = {
  id: string;
  time: Date;
  status: EStatus.REFUNDED;
  refundedAt: string;
};

type TExtra = {
  id: string;
};

type TTransaction = TPending | TCompleted | TFailed | TRefunded | TExtra;

const generate = (_: never): never => {
  throw new Error("should not run");
};

const getStatusLabel = (transaction: TTransaction) => {
  switch (transaction.status) {
    case EStatus.PENDING:
      return "";
    case EStatus.COMLETED:
      return "";
    case EStatus.FAILED:
      return "";
    case EStatus.REFUNDED:
      return "";
    default:
      generate(transaction.status);
  }
};

getStatusLabel("asd");
