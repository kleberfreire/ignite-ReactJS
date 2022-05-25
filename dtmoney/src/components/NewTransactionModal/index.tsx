import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import CloseImg from "../../assets/close.svg";
import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransections";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  const { createTransactions } = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const transaction = {
      title,
      amount,
      category,
      type,
    };

    await createTransactions(transaction);

    setAmount(0);
    setTitle("");
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={CloseImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Nova transação</h2>
          <input
            placeholder="Título"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <input
            type="number"
            placeholder="Valor"
            onChange={(event) => setAmount(Number(event.target.value))}
            value={amount ? amount : ""}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
              }}
              isActive={type === "deposit"}
              activeColor={"green"}
            >
              <img src={Income} alt="entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => {
                setType("withdraw");
              }}
              isActive={type === "withdraw"}
              activeColor={"red"}
            >
              <img src={Outcome} alt="entrada" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            placeholder="Categoria"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
