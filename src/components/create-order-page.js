"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { OrderHeader } from "@/components/order-header";
import { CustomerInfoFormHook } from "@/components/customer-info-form-hook";
import { PaymentMethodFormHook } from "@/components/payment-method-form-hook";
import { OrderSummaryHook } from "@/components/order-summary-hook";
import { OrderSuccessDialog } from "@/components/order-success-dialog";

export function CreateOrderPage({ branchInfo, onLogout }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      paymentMethod: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, watch, reset, formState: { isSubmitting, isValid } } = form;
  const formValues = watch();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newOrderId = `ORD-${branchInfo.branchId}-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    setSubmittedOrder(data);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSubmittedOrder(null);
    reset();
  };

  const allFieldsFilled = formValues.firstName && formValues.lastName && formValues.email && formValues.phone && formValues.paymentMethod;

  return (
    <div className="min-h-screen bg-background">
      <OrderHeader branchInfo={branchInfo} onLogout={onLogout} />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <CustomerInfoFormHook control={control} />
              
              <Controller
                name="paymentMethod"
                control={control}
                rules={{ required: "Please select a payment method" }}
                render={({ field }) => (
                  <PaymentMethodFormHook
                    selectedMethod={field.value}
                    onMethodChange={field.onChange}
                  />
                )}
              />
            </div>
            
            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <OrderSummaryHook
                formValues={formValues}
                isSubmitting={isSubmitting}
                isComplete={!!allFieldsFilled}
              />
            </div>
          </div>
        </form>
      </main>

      {submittedOrder && (
        <OrderSuccessDialog
          open={showSuccess}
          onClose={handleCloseSuccess}
          orderDetails={{
            ...submittedOrder,
            orderId,
            branchName: branchInfo.branchName,
            assistantName: branchInfo.assistantName,
          }}
        />
      )}
      
    </div>
  );
}
