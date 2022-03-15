import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ];

  const displayLinks = links
    .filter((link) => link)
    .map((link) => (
      <li key={link.href} className="nav-item">
        <Link href={link.href}>
          <a className="nav-link">{link.label}</a>
        </Link>
      </li>
    ));

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">Tickets</a>
        </Link>

        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">{displayLinks}</ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
