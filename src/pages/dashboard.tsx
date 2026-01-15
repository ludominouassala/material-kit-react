import { useEffect } from "react";

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView as DashboardView } from 'src/sections/overview/view';

import { api } from "../api/axios";

// ----------------------------------------------------------------------

export default function Page() {

  useEffect(() => {
    api.get("/api/perfumes")
      .then(res => console.log("API OK:", res.data))
      .catch(err => console.error("API ERRO:", err));
  }, []);

  return (
    <>
      <title>{`Dashboard - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
      />
      <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

      <DashboardView />
    </>
  );
}
