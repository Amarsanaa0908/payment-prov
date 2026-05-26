"use client";

import { CreditCard, Banknote, Smartphone, Building2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "toki",
    label: "TOKI",
    description: "TOKI Апп ашиглан төлөх",
    icon: CreditCard,
  },
  {
    id: "cash",
    label: "Бэлэн",
    description: "Бэлнээр төлөх",
    icon: Banknote,
  },
  {
    id: "storepay",
    label: "Storepay",
    description: "Storepay Апп ашиглан төлөх",
    icon: Smartphone,
  },
  {
    id: "bank_transfer",
    label: "Данс",
    description: "Дансаар шилжүүлсэн",
    icon: Building2,
  },
];


export function PaymentMethodForm({
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
          Төлбөр
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Төлбөрийн хэрэгсэл
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
