import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 24px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 16px;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Onboarding component mounted');
  }, []);

  const handleContinue = () => {
    console.log('Continue button clicked');
    navigate('/payment');
  };

  return (
    <Container>
      <Title>Добро пожаловать в СКУФ</Title>
      <Description>
        Это приложение позволит вам стать частью уникального сообщества.
        Ваш вклад определит ваше место в рейтинге и повлияет на ваше будущее.
      </Description>
      <Button onClick={handleContinue}>
        Продолжить
      </Button>
    </Container>
  );
};

export default Onboarding; 