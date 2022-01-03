import Head from "next/head";
import Link from "next/link";

import days from "../days";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Théo's{" "}
          <a
            className="font-mono text-blue-500 hover:text-blue-300 underline"
            href="https://genuary.art"
          >
            2022 genuary
          </a>
        </h1>

        <p>
          I like generative art*, this is my first experience doing genuary. The
          sources are avalaible, I've cobbled together p5js and nextjs.
        </p>

        <ul className="flex flex-col mt-8">
          {days.map(({ path, name, comment }) => (
            <Link href={"/[day]"} as={`/${path}`} key={path}>
              <a className="flex space-x-2">
                <span className="text-blue-500 hover:text-blue-300 underline">
                  {name}
                </span>
                <span className="truncate text-gray-400 -underline">
                  {comment}
                </span>
              </a>
            </Link>
          ))}
        </ul>

        <p className="text-sm mt-16">
          [*] I'm keeping a twitter list{" "}
          <a
            className="text-blue-500 hover:text-blue-300 underline"
            href="https://twitter.com/i/lists/1229843989060255745"
          >
            here
          </a>
          .
        </p>

        <p className="text-xs mt-8 underline">
          <a href="https://github.com/theo-m/genuary">source</a>
        </p>
      </main>
    </div>
  );
}
