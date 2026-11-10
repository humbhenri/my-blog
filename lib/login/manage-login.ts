import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const jwtSecretKey = process.env.JWT_SECRET;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);
const loginExpSeconds = Number(process.env.LOGIN_EXP_SEC) || 86400;
const loginExpStr = process.env.LOGIN_EXP_STR || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';
type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const cookieStore = await cookies();
  const jwt = await signJWT({ username, expiresAt });
  cookieStore.set(loginCookieName, jwt, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.delete(loginCookieName);
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();
  if (jwtPayload === false) return false;
  return jwtPayload.username === process.env.LOGIN_USER;
}

export async function requireLoggedOrRedirect() {
  const isAuthenticated = await getLoginSession();
  if (!isAuthenticated) {
    redirect('/admim/login');
  }
}

export async function getLoginSession(): Promise<false | JWTPayload> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(loginCookieName)?.value;
  if (!jwt) return false;
  return await verifyJWT(jwt);
}

export async function signJWT(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function verifyJWT(jwt: string | undefined = ''): Promise<false | JWTPayload> {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, { algorithms: ['HS256'] });
    return payload;
  } catch (e) {
    return false;
  }
}
