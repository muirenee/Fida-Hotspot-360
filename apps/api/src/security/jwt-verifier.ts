import { createRemoteJWKSet, jwtVerify } from 'jose';
import { UnauthorizedException } from '@nestjs/common';

const issuer = process.env.OIDC_ISSUER;
const audience = process.env.OIDC_AUDIENCE;
let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
export async function verifyBearer(authorization: string | undefined): Promise<string> {
  if (!issuer || !audience || !authorization?.startsWith('Bearer ')) throw new UnauthorizedException();
  try {
    const jwt = authorization.slice(7);
    if (!jwks) jwks = createRemoteJWKSet(new URL('.well-known/jwks.json', issuer.endsWith('/') ? issuer : issuer + '/'));
    const { payload } = await jwtVerify(jwt, jwks, { issuer, audience, algorithms: ['RS256'] });
    if (typeof payload.sub !== 'string' || !payload.sub) throw new Error('Missing subject');
    return payload.sub;
  } catch {
    throw new UnauthorizedException('Invalid identity token');
  }
}
