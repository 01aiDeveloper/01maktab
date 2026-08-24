import { describe, expect, it } from 'vitest';
import authReducer, { clearAuth, hydrateAuth, setTokens, setUser } from './auth-slice';

describe('user auth reducer', () => {
  it('hydrates the persisted token and user', () => {
    const state = authReducer(
      undefined,
      hydrateAuth({ accessToken: 'access', refreshToken: 'refresh', user: { id: 1 } }),
    );
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.id).toBe(1);
    expect(state.hydrated).toBe(true);
  });

  it('updates tokens and merges profile updates', () => {
    const withTokens = authReducer(
      undefined,
      setTokens({ accessToken: 'access', refreshToken: 'refresh', prompt: 'signup' }),
    );
    const withUser = authReducer(withTokens, setUser({ id: 1, firstname: 'Ali' }));
    const updated = authReducer(withUser, setUser({ id: 1, lastname: 'Valiyev' }));
    expect(updated.user).toMatchObject({ firstname: 'Ali', lastname: 'Valiyev' });
  });

  it('clears sensitive state while preserving hydration', () => {
    const hydrated = authReducer(undefined, hydrateAuth({ accessToken: 'access' }));
    const cleared = authReducer(hydrated, clearAuth());
    expect(cleared.accessToken).toBeNull();
    expect(cleared.user).toBeNull();
    expect(cleared.hydrated).toBe(true);
  });
});
