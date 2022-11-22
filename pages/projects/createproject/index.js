import Head from "next/head";
import Image from "next/image";

import CreateProject from "../../../src/pages/projetcs/create/CreateProject";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Project</title>
        <meta name="Create Project" content="Create Project" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <CreateProject />
      </div>
    </>
  );
}
