
import {
  getTokenService,
  setTokenService,
  JwtTokenService,
} from '../src/index.js';
new TextEncoder().encode('development-secret')
async function main() {
  setTokenService(
    new JwtTokenService({
      issuer: 'nexode',
      audience: 'nexode-services',
      accessTokenLifetime: 3600,
      refreshTokenLifetime: 604800,
      secret: new TextEncoder().encode(
        'development-secret'
      ),
    }),
  );

  const tokenService = getTokenService();

  const tokens = await tokenService.issue({
    id: '123',
    email: 'alice@example.com',
    roles: ['user'],
    permissions: [],
  });

  console.log('Access Token:');
  console.log(tokens.accessToken);

  console.log('\nRefresh Token:');
  console.log(tokens.refreshToken);

  const verified = await tokenService.verify(
    tokens.accessToken,
  );

  console.log('\nVerified Token:');
  console.log(verified);
}

main().catch(console.error);