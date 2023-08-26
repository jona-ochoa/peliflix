const Footer = () => {
  return (
    <footer className="bg-black">
      <nav className="container-fluid">
        <ul className="nav nav-pills nav-fill mb-light">
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://github.com/jona-ochoa"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://linkedin.com/in/jona-ochoa"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </li>
        </ul>
        <div>
          <p className="text-light text-center">
            © 2023 Copyright Jona challenge
          </p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
