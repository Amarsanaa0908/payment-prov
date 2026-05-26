"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function OrderSuccessDialog({
  open,
  onClose,
  orderDetails,
}) {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">Order Created Successfully</DialogTitle>
          <DialogDescription className="text-center">
            Order <span className="font-mono font-medium text-foreground">{orderId}</span> has been created for{" "}
            <span className="font-medium text-foreground">
              {orderDetails.firstName} {orderDetails.lastName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            A confirmation email will be sent to{" "}
            <span className="font-medium text-foreground">{orderDetails.email}</span>
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Create Another
          </Button>
          <Button onClick={onClose} className="flex-1">
            View Orders
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
