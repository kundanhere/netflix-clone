import { useAuthStore } from '../../store/authStore';

const Home = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
