import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const { data, status } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (status !== "authenticated") {
      signIn("github");
      return;
    }

    if (data.activeSubscription) {
      console.log("antes do push");
      router.push("/posts");
      console.log("depois do push");
      return;
    }

    try {
      const response = await api.post(`/subscribe/`);

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (err: any) {
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
