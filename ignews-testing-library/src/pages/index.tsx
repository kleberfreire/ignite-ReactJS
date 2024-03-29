import type { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface IHomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1L4mlYCcyPsjkE3qLezJQfKK", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount,
  };

  return {
    props: {
      product: {
        priceId: price.id,
        amount: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      },
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
