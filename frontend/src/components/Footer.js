import { useEffect, useState } from "react";

function Footer() {
  const [years, setYears] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      const year = new Date();
      setYears(year.getFullYear());
    });
  }, []);

  return (
    <footer className="footer">
      <p className="footer__author">&copy; {years} Mesto Russia</p>
    </footer>
  );
}
export default Footer;
