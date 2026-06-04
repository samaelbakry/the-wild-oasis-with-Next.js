import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex gap-3 items-center"
            >
              <img
                src={session.user.image}
                className="size-7 rounded-full object-cover"
                referrerPolicy='no-referrer'
              />
              <span>{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
