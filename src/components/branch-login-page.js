"use client";

import { useForm } from "react-hook-form";
import { Building2, User, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const branches = [
  { name: "shangrila", password: "shangrila123"}
];

export function BranchLoginPage({ onLogin }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      branchId: "",
      username: "",
    },
  });

  const selectedBranchId = watch("branchId");

  const onSubmit = async (data) => {
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(data);

    // Find branch by username + password
    const branch = branches.find(
    (b) =>
        b.username === data.username &&
        b.password === data.password
    );

    if (branch) {
    onLogin({
        branchId: branch.id,
        branchName: branch.name || "",
        username: data.username,
    });
    } else {
    alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Sales Portal</h1>
          <p className="text-muted-foreground mt-1">Sign in to create orders</p>
        </div>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    {...register("username", { 
                      required: "Please enter your name",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    className={`pl-10 h-11 ${errors.username ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                  type={"password"}
                    id="password"
                    placeholder="Enter password"
                    {...register("password", { 
                      required: "Please enter your name",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    className={`pl-10 h-11 ${errors.username ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 mt-2" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Signing in..."
                ) : (
                  <>
                    Continue to Orders
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Need help? Contact your branch manager.
        </p>
      </div>
    </div>
  );
}
