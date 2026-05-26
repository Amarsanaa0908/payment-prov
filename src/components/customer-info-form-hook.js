"use client";

import { Control, Controller } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function CustomerInfoFormHook({ control }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            1
          </div>
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter the customer&apos;s details to associate with this order.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    {...field}
                    className={`pl-10 h-11 bg-card border-input focus:border-primary focus:ring-1 focus:ring-primary ${fieldState.error ? "border-destructive" : ""}`}
                  />
                </div>
                {fieldState.error && (
                  <p className="text-xs text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...field}
                    className={`pl-10 h-11 bg-card border-input focus:border-primary focus:ring-1 focus:ring-primary ${fieldState.error ? "border-destructive" : ""}`}
                  />
                </div>
                {fieldState.error && (
                  <p className="text-xs text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <Controller
          name="email"
          control={control}
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  {...field}
                  className={`pl-10 h-11 bg-card border-input focus:border-primary focus:ring-1 focus:ring-primary ${fieldState.error ? "border-destructive" : ""}`}
                />
              </div>
              {fieldState.error && (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...field}
                  className={`pl-10 h-11 bg-card border-input focus:border-primary focus:ring-1 focus:ring-primary ${fieldState.error ? "border-destructive" : ""}`}
                />
              </div>
              {fieldState.error && (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
