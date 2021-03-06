import Link from "next/link";
import { useEffect, useRef } from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import days from "../days";

const Id = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  const d = days.filter((d) => d.id === id)[0];
  useEffect(() => {
    if (ref.current === null || typeof window === "undefined") {
      return;
    }

    d?.sketch?.(ref.current);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <Head>
        <title>{d?.name}</title>
      </Head>

      <div className="mx-auto p-2">
        <Link href="/">
          <a className="text-blue-500 hover:text-blue-300 underline">back</a>
        </Link>
        <h1>{d?.name}</h1>
        <p>{d?.comment}</p>
      </div>

      <div ref={ref} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { id: context.params?.id }, // will be passed to the page component as props
  };
};

export async function getStaticPaths() {
  return {
    paths: days.map(({ id }) => ({ params: { id } })),
    fallback: "blocking",
  };
}

export default Id;
