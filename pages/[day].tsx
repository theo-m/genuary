import Link from "next/link";
import { useEffect, useRef } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import days from "../days";

const Day = ({ day }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null || typeof window === "undefined") {
      return;
    }

    console.log(day);
    days.filter((d) => d.path === day.path)[0]?.sketch?.(ref.current);
    // day.sketch?.(ref.current);
  }, []);

  return (
    <div>
      <Link href="/">
        <a>back</a>
      </Link>
      <h1>{day.name}</h1>
      <div ref={ref}></div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { day: days.filter((d) => d.path === context.params?.day)[0] }, // will be passed to the page component as props
  };
};

export async function getStaticPaths() {
  return {
    paths: days.map((key) => ({ params: { day: key.path } })),
    fallback: "blocking", // See the "fallback" section below
  };
}

export default Day;
