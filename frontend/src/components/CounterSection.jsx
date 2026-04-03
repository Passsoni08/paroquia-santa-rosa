import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useIntersection } from '../hooks/useIntersection';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  padding: 60px 24px;
`;

const Grid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
`;

const Number = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 4px;
  opacity: 0.9;
`;

const COUNTERS = [
  { target: 90, label: 'Anos de história', suffix: '+' },
  { target: 2500, label: 'Famílias', suffix: '+' },
  { target: 12, label: 'Missas por semana', suffix: '' },
  { target: 8, label: 'Grupos de oração', suffix: '' },
];

function AnimatedCounter({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [active, target]);

  return <Number>{count}{suffix}</Number>;
}

export default function CounterSection() {
  const [ref, isVisible] = useIntersection();

  return (
    <Section ref={ref}>
      <Grid>
        {COUNTERS.map(({ target, label, suffix }) => (
          <Item key={label}>
            <AnimatedCounter target={target} suffix={suffix} active={isVisible} />
            <Label>{label}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
}
