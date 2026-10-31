import { createRemoteJWKSet, jwtVerify } from 'jose';
import { UnauthorizedException } from '@nestjs/common';

const issuer = process.env.OIDC_ISSUER;
const audience = process.env.OIDC_AUDIENCE;
let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
export async function verifyBearer(authorization: string | undefined): Promise<string> {
  if (!issuer || !audience || !authorization?.startsWith('Bearer ')) throw new UnauthorizedException();
  try {
    const jwt = authorization.slice(7);
    if (!jwks) {
      const discoveryUrl = new URL('.well-known/openid-configuration', issuer.endsWith('/') ? issuer : issuer + '/');
      const discovery = await fetch(discoveryUrl, { signal: AbortSignal.timeout(5000) });
      if (!discovery.ok) throw new Error('OIDC discovery failed');
      const metadata = await discovery.json() as { issuer?: string; jwks_uri?: string };
      if (metadata.issuer !== issuer || !metadata.jwks_uri || !metadata.jwks_uri.startsWith('https://')) throw new Error('Invalid OIDC discovery');
      jwks = createRemoteJWKSet(new URL(metadata.jwks_uri));
    }
    const { payload } = await jwtVerify(jwt, jwks, { issuer, audience, algorithms: ['RS256'] });
    if (typeof payload.sub !== 'string' || !payload.sub) throw new Error('Missing subject');
    return payload.sub;
  } catch {
    throw new UnauthorizedException('Invalid identity token');
  }
}
