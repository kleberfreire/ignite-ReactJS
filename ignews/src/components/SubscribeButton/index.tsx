import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

interface ISubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const { data, status } = useSession();

  async function handleSubscribe() {
    if (status !== "authenticated") {
      signIn("github");
      console.log("aqui");
      return;
    }

    try {
      const response = await api.post(`/subscribe/`);

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      console.log("aqui");
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
