import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface User {
  id: number;
  name: string;
  stars: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 28px;
  text-align: center;
  font-weight: bold;
`;

const LeaderboardList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LeaderboardItem = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme, isCurrentUser }) => 
    isCurrentUser ? theme.colors.primary + '15' : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Rank = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const UserAvatar = styled.div<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.md};
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  font-size: 18px;
  
  &::after {
    content: '⭐️';
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

// Функция для генерации цвета на основе имени
const generateColor = (name: string): string => {
  const colors = [
    '#1E88E5', // Blue
    '#43A047', // Green
    '#E53935', // Red
    '#FB8C00', // Orange
    '#8E24AA', // Purple
    '#00ACC1', // Cyan
    '#3949AB', // Indigo
    '#7CB342', // Light Green
    '#C0CA33', // Lime
    '#FFB300', // Amber
  ];
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// Функция для получения инициалов
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2);
};

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentUser = window.Telegram.WebApp.initDataUnsafe.user;

  useEffect(() => {
    // In a real application, this would fetch from an API
    const mockUsers: User[] = [
      {
        id: currentUser?.id || 0,
        name: currentUser?.first_name || 'Аноним',
        stars: parseInt(localStorage.getItem('userStars') || '0'),
      },
      { id: 1, name: 'Иван Петров', stars: 1000 },
      { id: 2, name: 'Мария Иванова', stars: 750 },
      { id: 3, name: 'Александр Сидоров', stars: 500 },
      { id: 4, name: 'Елена Смирнова', stars: 250 },
    ];

    const sortedUsers = mockUsers.sort((a, b) => b.stars - a.stars);
    setUsers(sortedUsers);
  }, []);

  return (
    <Container>
      <Title>Рейтинг СКУФ</Title>
      <LeaderboardList>
        {users.map((user, index) => (
          <LeaderboardItem
            key={user.id}
            isCurrentUser={user.id === currentUser?.id}
          >
            <Rank>{index + 1}</Rank>
            <UserAvatar backgroundColor={generateColor(user.name)}>
              {getInitials(user.name)}
            </UserAvatar>
            <UserInfo>
              <UserName>{user.name}</UserName>
            </UserInfo>
            <Stars>{user.stars}</Stars>
          </LeaderboardItem>
        ))}
      </LeaderboardList>
    </Container>
  );
};

export default Leaderboard; 