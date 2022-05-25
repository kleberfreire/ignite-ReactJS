import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface ITransaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: "deposit" | "withdraw";
  createdAt: Date;
}

type ITransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransactions: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => {
      setTransactions(response.data.transactions);
      console.log("data -", response.data);
    });
  }, []);

  async function createTransactions(transactionInput: ITransactionInput) {
    const response = await api.post("transactions", transactionInput);
    const { transaction } = response.data;
    console.log("transaction -", transaction);
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
}
