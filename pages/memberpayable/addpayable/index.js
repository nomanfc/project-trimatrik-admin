import Head from "next/head";
import Image from "next/image";

import AddPayable from "../../../src/pages/memberPayable/AddPayable";

export default function Home() {
  return (
    <>
      <Head>
        <title>Add Payable</title>
        <meta name="Add Payable" content="Add Payable" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
       <AddPayable/>
      </div>
    </>
  );
}
