import React, { useState } from 'react';
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

const Input = styled.input`
  width: 200px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 18px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<string>('');

  const handlePayment = () => {
    // Here you would integrate with Telegram's payment API
    // For now, we'll just simulate the payment and navigate
    localStorage.setItem('userStars', stars);
    navigate('/leaderboard');
  };

  return (
    <Container>
      <Title>Внесите свой вклад</Title>
      <Description>
        Выберите количество звезд, которое вы хотите внести.
        Помните, что ваш вклад определит ваше место в рейтинге и повлияет на ваше будущее.
      </Description>
      <Input
        type="number"
        min="1"
        placeholder="Количество звезд"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
      />
      <Button
        onClick={handlePayment}
        disabled={!stars || parseInt(stars) < 1}
      >
        Внести вклад
      </Button>
    </Container>
  );
};

export default Payment; 