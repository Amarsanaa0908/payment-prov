"use client";

import { useState } from "react";
import { BranchLoginPage } from "@/components/branch-login-page";
import { CreateOrderPage } from "@/components/create-order-page";


export default function Page() {
  const [branchInfo, setBranchInfo] = useState(null);

  const handleLogin = (info) => {
    setBranchInfo(info);
  };

  const handleLogout = () => {
    setBranchInfo(null);
  };

  if (!branchInfo) {
    return <BranchLoginPage onLogin={handleLogin} />;
  }

  return <CreateOrderPage branchInfo={branchInfo} onLogout={handleLogout} />;
}
