import Head from "next/head";
import Image from "next/image";

import Admins from "../../../src/pages/admin/Admins";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admins</title>
        <meta name="Admins" content="Admins" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <Admins />
      </div>
    </>
  );
}
