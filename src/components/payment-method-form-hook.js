"use client";

import { CreditCard, Banknote, Smartphone, Building2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "credit_card",
    label: "Credit Card",
    description: "Visa, Mastercard, Amex",
    icon: CreditCard,
  },
  {
    id: "debit_card",
    label: "Debit Card",
    description: "Direct bank debit",
    icon: CreditCard,
  },
  {
    id: "cash",
    label: "Cash",
    description: "Pay at pickup",
    icon: Banknote,
  },
  {
    id: "mobile_payment",
    label: "Mobile Payment",
    description: "Apple Pay, Google Pay",
    icon: Smartphone,
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    description: "Direct deposit",
    icon: Building2,
  },
];

export function PaymentMethodFormHook({
  selectedMethod,
  onMethodChange,
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            2
          </div>
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select the payment method used by the customer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onMethodChange(method.id)}
                className={cn(
                  "relative flex flex-col items-start p-4 rounded-lg border-2 transition-all text-left",
                  "hover:border-primary/50 hover:bg-muted/50",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 mb-2",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-sm",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {method.label}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {method.description}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
