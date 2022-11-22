import Head from "next/head";
import Image from "next/image";

import PaymentSettingMain from "../../../src/pages/settings/paymentsetting/PaymentSetting";

export default function Home() {
  return (
    <>
      <Head>
        <title>Member Payment</title>
        <meta name="Member Payment" content="Member Payment" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <PaymentSettingMain />
      </div>
    </>
  );
}
