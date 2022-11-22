import Head from "next/head";
import Image from "next/image";

import AdminSettingMain from "../../../src/pages/settings/adminsetting/AdminSettingMain";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin Settings</title>
        <meta name="Admin Settings" content="Admin Settings" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <AdminSettingMain />
      </div>
    </>
  );
}
