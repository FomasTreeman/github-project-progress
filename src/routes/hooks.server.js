// import { redirect } from '@sveltejs/kit';

// export async function handle({ event, resolve }) {
//   const session = event.cookies.get('session');
//   if (!session?.user) throw redirect(308, 'http://localhost:5173/');
//   event.locals.user = session.user;

//   const response = await resolve(event);
//   response.headers.set('Authentication', 'authenticated');
//   throw redirect(308, 'http://localhost:5173/repos');
// }
