import "../assets/Page404.css";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>
          Error <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="output">
          Please try to <a onClick={() => navigate(-1)}>go back</a> or{" "}
          <Link to="/">return to the homepage</Link>.
        </p>
        <p className="output">Good luck.</p>
      </div>
    </>
  );
};

export default Page404;
