import { useLocation } from 'react-router-dom';
import SignUpCard from '../components/SignupCard';
import SignUpOrgCard from '../components/SignupOrgCard';

  
  
function SignUpPage() {
const location = useLocation();
const isOrgSignUp = location.pathname === '/signuporg';

  return (
    isOrgSignUp ? <SignUpOrgCard/> : <SignUpCard/>
  )
}

export default SignUpPage
