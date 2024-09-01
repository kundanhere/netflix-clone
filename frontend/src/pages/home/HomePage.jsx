import Home from './Home';
import Guest from './Guest';
import { useAuthStore } from '../../store/authStore';

const HomePage = () => {
  const { user } = useAuthStore();

  return <div>{user ? <Home /> : <Guest />}</div>;
};

export default HomePage;
