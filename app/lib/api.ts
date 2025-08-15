import { NextResponse } from "next/server";
import { ZodError } from "zod";
import connectDB from "./db";
import type { NextRequest } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string>;
};

export const apiHandler = async <T>(
  handler: (req: NextRequest, params?: any) => Promise<T>,
  req: NextRequest,
  params?: any
): Promise<NextResponse<ApiResponse<T>>> => {
  try {
    await connectDB();
    const data = await handler(req, params);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API Error:", error);

    if (error instanceof ZodError) {
      const validationErrors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        validationErrors[path] = issue.message;
      });
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 }
      );
    }

    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return NextResponse.json({ success: false, error: message }, { status });
  }
};

export const validateRequest = (schema: any) => {
  return async (req: NextRequest) => {
    try {
      let data = {};
      if (req.method !== "GET") {
        data = await req.json();
      }
      return schema.parse({
        body: data,
        query: Object.fromEntries(req.nextUrl.searchParams),
        params: req.nextUrl.pathname.split("/").pop(),
      });
    } catch (error) {
      throw error;
    }
  };
};

// Limiteur de requêtes
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export const rateLimiter = (
  identifier: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number } => {
  const now = Date.now();
  const key = `rate-limit:${identifier}`;

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return { allowed: true, remaining: limit - 1 };
  }

  const entry = rateLimitMap.get(key)!;

  // Réinitialiser le compteur si la fenêtre est expirée
  if (now - entry.lastReset > windowMs) {
    entry.count = 1;
    entry.lastReset = now;
    return { allowed: true, remaining: limit - 1 };
  }

  // Vérifier la limite
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Incrémenter le compteur
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
};

// Formateur de données pour le frontend
export const formatCurrency = (
  amount: number,
  currency: string = "XOF"
): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const sanitizeUser = (user: any) => {
  const { password, accounts, ...sanitized } = user.toObject
    ? user.toObject()
    : user;
  return sanitized;
};
