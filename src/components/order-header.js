"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function OrderHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link
          href="#"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Create Order</h1>
          <p className="text-sm text-muted-foreground">
            Branch Sales Assistant Portal
          </p>
        </div>
      </div>
    </header>
  );
}
