import Head from "next/head";
import Image from "next/image";

import CreateAdmin from "../../../src/pages/admin/create/CreateAdmin";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Admin</title>
        <meta name="Create Admin" content="Create Admin" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <CreateAdmin />
      </div>
    </>
  );
}
