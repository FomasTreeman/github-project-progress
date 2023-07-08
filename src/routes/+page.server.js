import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  const session = cookies.get('session');
  console.log(session);
  // fetch repos and issues and add them to the props
  if (!session) return { user: null };
  if (session?.user) throw redirect(308, '/repos');
  return JSON.parse(session);
}
