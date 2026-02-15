import Navbar from '../../components/layout/Navbar';
import {InputField} from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <InputField label="Email" placeholder="Enter your email" />
      <AuthButton variant="primary" isLoading={false}>Login</AuthButton>
      
      </div>
    
    );
};

export default LoginPage;