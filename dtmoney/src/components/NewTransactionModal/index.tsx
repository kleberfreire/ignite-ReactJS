import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import CloseImg from "../../assets/close.svg";
import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import { FormEvent, useState } from "react";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    console.log("create new transaction");
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
          <input placeholder="Título" />
          <input type="number" placeholder="Valor" />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
                console.log(type);
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
                console.log(type);
              }}
              isActive={type === "withdraw"}
              activeColor={"red"}
            >
              <img src={Outcome} alt="entrada" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input placeholder="Categoria" />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
