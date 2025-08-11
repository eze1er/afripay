import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import type { NextResponse as NextResponseType } from 'next/server';
// Vérification des variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET as string;
const CRYPTO_SECRET = process.env.CRYPTO_SECRET as string;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1d';

if (!JWT_SECRET || !CRYPTO_SECRET) {
  throw new Error('Missing security environment variables');
}

// Chiffrement AES-256-CBC
export function encryptData(data: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(CRYPTO_SECRET, 'hex'),
    iv
  );
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptData(encryptedData: string): string {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts.shift()!, 'hex');
  const encryptedText = parts.join(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(CRYPTO_SECRET, 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Gestion des tokens JWT
// Solution robuste et vérifiée
export function generateToken(userId: string, role: string): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    return jwt.sign(
      { id: userId, role },
      JWT_SECRET,
      { 
        expiresIn: TOKEN_EXPIRY,
        algorithm: 'HS256' 
      } as jwt.SignOptions // Assertion de type pour contourner le problème
    );
  } catch (error) {
    console.error('Token generation failed:', error);
    throw new Error('Failed to generate authentication token');
  }
}
export function verifyToken(token: string): { id: string; role: string } {
  return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
}

// Gestion des cookies HTTP-Only
// export function setAuthCookie(res: NextResponse, token: string): void {
//   res.cookies.set('token', token, {
//     path: '/',
//     httpOnly: true,
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24, // 1 jour en secondes
//   });
// }

export function setAuthCookie(res: NextResponseType, token: string): void {
  // Utilisez 'res' comme instance de NextResponse
  res.cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });
}
export function getAuthToken(req: NextRequest): string | null {
  return req.cookies.get('token')?.value || null;
}

// Sécurité des mots de passe
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Middleware d'authentification pour Next.js
export async function authenticate(req: NextRequest, roles: string[] = []) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      throw { statusCode: 401, message: 'Authentication required' };
    }

    const decoded = verifyToken(token);
    
    // Vérification des rôles
    if (roles.length > 0 && !roles.includes(decoded.role)) {
      throw { statusCode: 403, message: 'Insufficient permissions' };
    }

    return decoded;
  } catch (error: any) {
    console.error('Authentication error:', error);
    throw { 
      statusCode: 401, 
      message: 'Invalid or expired token' 
    };
  }
}

// Export explicite pour résoudre les problèmes d'import
export default {
  encryptData,
  decryptData,
  generateToken,
  verifyToken,
  setAuthCookie,
  // clearAuthCookie,
  getAuthToken,
  hashPassword,
  verifyPassword,
  authenticate
};

