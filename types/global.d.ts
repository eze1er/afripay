// types/global.d.ts
import type { NextRequest, NextResponse } from 'next/server';

declare global {
  interface NextResponse {
    cookies: {
      set: (name: string, value: string, options?: any) => void;
      get: (name: string) => { value: string } | undefined;
      delete: (name: string) => void;
    };
  }
}