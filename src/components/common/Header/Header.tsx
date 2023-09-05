import { styled } from 'styled-components';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const moveToMain = () => {
    navigate('/');
  }
  return (
    <StyledHeader>
      <img src={logo} alt="logo.img" width={200} onClick={moveToMain} />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  padding: 1.25rem 0;
  display: flex;
  justify-content: center;
`;