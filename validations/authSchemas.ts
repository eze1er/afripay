import { z } from "zod";

// --- Login ---
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse email est obligatoire")
    .email("Adresse email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est obligatoire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// Type pour utiliser dans useForm<LoginSchemaType>
export type LoginSchemaType = z.infer<typeof loginSchema>;

// --- Register ---
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est obligatoire")
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z
    .string()
    .min(1, "Le nom est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z
    .string()
    .min(1, "L'adresse email est obligatoire")
    .email("Adresse email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est obligatoire")
    .regex(/^\d{9,}$/, "Numéro de téléphone invalide (au moins 9 chiffres)"),
  password: z
    .string()
    .min(1, "Le mot de passe est obligatoire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// Type pour useForm<RegisterSchemaType>
export type RegisterSchemaType = z.infer<typeof registerSchema>;
