# next-auth-mongo

NextAuth and MongoDB integration

## features

- start as an unauthenticated Guest
- login by Google or any email accessible by sendgrid
- register for set or edit username
- stored auth data by mongo
- delete info from db on user demand

## setup .env.local

```
NEXTAUTH_URL=http://localhost:3000/api/auth
EMAIL_SECRET=prettysecretemail
NEXTAUTH_SECRET=prettysecretauth
JWT_SECRET=prettysecretjwt

MONGODB_URI
MONGODB_DB
GOOGLE_ID
GOOGLE_SECRET
EMAIL_SERVER_HOST
EMAIL_SERVER_PORT
EMAIL_SERVER_USER
EMAIL_SERVER_PASSWORD
EMAIL_FROM
```

## running dev

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
