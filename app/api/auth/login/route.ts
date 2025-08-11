import { NextRequest, NextResponse } from 'next/server'; // Ajoutez NextResponse ici
import { apiHandler } from '@/lib/api';
import { 
  generateToken, 
  // setAuthCookie, 
  verifyPassword 
} from '@/lib';
import User from '@/models/User';
import { loginSchema } from '@/validations';

export const POST = (req: NextRequest) => 
  apiHandler(async (req: NextRequest) => {
    const { email, password } = await req.json();
    
    // Validation des entrées
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      throw {
        statusCode: 400,
        message: 'Validation error',
        errors: validation.error.issues
      };
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    // Vérification du mot de passe
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    // Génération du token JWT
    const token = generateToken(user._id.toString(), user.role);

    // Création de la réponse avec NextResponse
    const response = NextResponse.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

    // Définition du cookie d'authentification
    response.cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
    });

    return response;
  }, req);