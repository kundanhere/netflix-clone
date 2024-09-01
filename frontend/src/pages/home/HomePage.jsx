import Home from './Home';
import Guest from './Guest';

const HomePage = () => {
  const user = false;

  return <div>{user ? <Home /> : <Guest />}</div>;
};

export default HomePage;
