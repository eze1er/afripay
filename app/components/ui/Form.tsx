"use client";

import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils"; // Ou supprime cn() et remplace par concat en template string si absent

interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  children: React.ReactNode;
}

export function Form<TFieldValues extends FieldValues>({
  form,
  children,
}: FormProps<TFieldValues>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// Accepte className + autres props valides sur <div>
export function FormItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

// Accepte className + autres props valides sur <label>
export function FormLabel({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("block text-sm font-medium", className)} {...props}>
      {children}
    </label>
  );
}

// Accepte className + autres props valides sur <div>
export function FormControl({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

// Accepte className + autres props valides sur <p>
export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return children ? (
    <p className={cn("text-sm text-red-500", className)} {...props}>
      {children}
    </p>
  ) : null;
}
