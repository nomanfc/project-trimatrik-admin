import Head from "next/head";
import Image from "next/image";

import MemberDetails from "../../../src/pages/members/details/MemberDetails";

export default function Home() {
  return (
    <>
      <Head>
        <title>Member Details</title>
        <meta name="Member Details" content="Member Details" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <MemberDetails />
      </div>
    </>
  );
}
