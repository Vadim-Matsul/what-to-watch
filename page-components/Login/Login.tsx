import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header'
import { LoginForm } from '../../components/LoginForm/LoginForm';


export const Login: React.FC = () => {

  return (
    <div className="user-page">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};
