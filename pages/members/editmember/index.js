import Head from "next/head";
import Image from "next/image";

import EditMember from "../../../src/pages/members/edit/EditMember";

export default function Home() {
  return (
    <>
      <Head>
        <title>Update Member</title>
        <meta name="update Member" content="Update Member" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <EditMember />
      </div>
    </>
  );
}
