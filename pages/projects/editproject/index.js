import Head from "next/head";
import Image from "next/image";

import EditProject from "../../../src/pages/projetcs/edit/EditProject";

export default function Home() {
  return (
    <>
      <Head>
        <title>Edit project</title>
        <meta name="Edit project" content="Edit project" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <EditProject />
      </div>
    </>
  );
}
