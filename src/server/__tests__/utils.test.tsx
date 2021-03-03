/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleReactRouterRedirection } from '../utils';

describe('handleReactRouterRedirection', () => {
  it('redirects to /fi/home 308', () => {
    const redirect = jest.fn();
    const req: any = { path: '/fi' };
    const res: any = { redirect };
    handleReactRouterRedirection(req, res, '/fi/home');

    expect(redirect).toHaveBeenLastCalledWith(308, '/fi/home');
  });

  it('redirects to /fi/home 302', () => {
    const redirect = jest.fn();
    const req: any = { path: '/' };
    const res: any = { redirect };
    handleReactRouterRedirection(req, res, '/fi/home');

    expect(redirect).toHaveBeenLastCalledWith(302, '/fi/home');
  });
});
