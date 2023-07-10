import { redirect } from "@sveltejs/kit";

export function load({ cookies }: {cookies: {get: (cookie: string) => string}}) {
  const session = cookies.get('session');
  if (!session) throw redirect(308, '/')
  const { user, token } = JSON.parse(session)
  return { token, user };
}
