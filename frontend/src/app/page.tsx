import { lecturesRoutes } from '@/config/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {lecturesRoutes.map(({ name, path }, i) => (
        <Link href={path} key={i}>
          {name}
        </Link>
      ))}
    </main>
  );
}
