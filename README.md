This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


afripay/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── send/
│   │   │   │   └── page.tsx
│   │   │   ├── history/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── transactions/
│   │   │   ├── topup/
│   │   │   │   └── route.ts
│   │   │   ├── withdraw/
│   │   │   │   └── route.ts
│   │   │   └── transfer/
│   │   │       └── route.ts
│   │   ├── webhooks/
│   │   │   ├── mpesa/
│   │   │   │   └── route.ts
│   │   │   ├── orange/
│   │   │   │   └── route.ts
│   │   │   └── mtn/
│   │   │       └── route.ts
│   │   └── admin/
│   │       ├── users/
│   │       │   └── route.ts
│   │       └── transactions/
│   │           └── route.ts
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── api.ts
│   ├── components/
│   │   ├── auth/
│   │   │   ├── OTPForm.tsx
│   │   │   └── PhoneInput.tsx
│   │   ├── dashboard/
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── TransactionChart.tsx
│   │   │   └── TransferForm.tsx
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── providers/
│   │       └── AuthProvider.tsx
│   ├── models/
│   │   ├── User.ts
│   │   └── Transaction.ts
│   ├── locales/
│   │   ├── en.json
│   │   └── fr.json
│   ├── styles/
│   │   └── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── scripts/
│   ├── seed-db.ts
│   └── simulate-transactions.ts
├── public/
│   ├── logos/
│   └── locales/
├── .env.example
├── next.config.js
├── middleware.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json