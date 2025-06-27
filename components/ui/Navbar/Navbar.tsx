import s from './Navbar.module.css';
import Navlinks from './Navlinks';

export default async function Navbar() {
  let user = null;
  
  // Only try to get user if Supabase is configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      user = data?.user || null;
    } catch (error) {
      console.log('Supabase not configured, continuing without user auth');
      user = null;
    }
  }

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}
