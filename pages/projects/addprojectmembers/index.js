import Head from "next/head";
import Image from "next/image";

import ProjectMembers from "../../../src/pages/projetcs/projectmembers/ProjectMembers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Members</title>
        <meta name="Project Members" content="Project Members" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <ProjectMembers />
      </div>
    </>
  );
}
