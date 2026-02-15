import Navbar from '../../components/layout/Navbar';
import {InputField} from '../../components/ui/InputField';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <InputField label="Email" placeholder="Enter your email" />
      
      </div>
    
    );
};

export default LoginPage;