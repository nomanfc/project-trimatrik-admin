import Head from "next/head";
import Image from "next/image";

import Members from "../../../src/pages/members/Members";

export default function Home() {
  return (
    <>
      <Head>
        <title>Members</title>
        <meta name="Members" content="Members" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <Members />
      </div>
    </>
  );
}
