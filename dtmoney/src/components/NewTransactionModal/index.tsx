import Modal from "react-modal";
import { Container, TransectionTypeContainer } from "./styles";
import CloseImg from "../../assets/close.svg";
import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
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
        <Container>
          <h2>Nova transação</h2>
          <input placeholder="Título" />
          <input type="number" placeholder="Valor" />

          <TransectionTypeContainer>
            <button type="button">
              <img src={Income} alt="entrada" />
              <span>Entrada</span>
            </button>
            <button>
              <img src={Outcome} alt="entrada" />
              <span>Saída</span>
            </button>
          </TransectionTypeContainer>

          <input placeholder="Categoria" />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
