import Head from "next/head";
import Image from "next/image";

import CreateMember from "../../../src/pages/members/create/CreateMembers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Member</title>
        <meta name="Create Member" content="Create Member" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <CreateMember />
      </div>
    </>
  );
}
