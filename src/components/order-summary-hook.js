"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, User, CreditCard, Mail, Phone } from "lucide-react";


const paymentMethodLabels = {
  toki: "TOKI",
  storepay: "StorePay",
  cash: "Бэлэн",
  mobile_payment: "Mobile Payment",
  bank_transfer: "Данс",
};

export function OrderSummaryHook({
  formValues,
  isSubmitting,
  isComplete,
}) {
  const { firstName, lastName, email, phone, paymentMethod } = formValues;
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <ShoppingCart className="h-4 w-4" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Customer
              </p>
              <p className="text-sm text-foreground truncate">
                {fullName || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <p className="text-sm text-foreground truncate">
                {email || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone
              </p>
              <p className="text-sm text-foreground truncate">
                {phone || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Payment Method
              </p>
              <p className="text-sm text-foreground">
                {paymentMethodLabels[paymentMethod] || "—"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <Button
          type="submit"
          disabled={!isComplete || isSubmitting}
          className="w-full h-11 text-sm font-medium"
        >
          {isSubmitting ? "Creating Order..." : "Create Order"}
        </Button>

        {!isComplete && (
          <p className="text-xs text-muted-foreground text-center">
            Complete all fields to create the order
          </p>
        )}
      </CardContent>
    </Card>
  );
}
