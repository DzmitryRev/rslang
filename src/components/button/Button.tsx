import styles from './Button.module.css';

type ButtonProps = {
  color: 'orange' | 'blue' | 'orange-gradient' | 'blue-gradient';
  size: 's' | 'm' | 'l' | 'xl';
  children: React.ReactNode;
};

export default function PrimaryButton({ color, size, children }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]} ${styles[size]}`}>{children}</button>
  );
}
// Примеры использования:

// <PrimaryButton color="blue" size="s">Войти</PrimaryButton>

// <PrimaryButton color="orange" size="m">Учить</PrimaryButton>

// <PrimaryButton color="orange" size="m">Зарегистрироваться</PrimaryButton>

// <PrimaryButton color="orange-gradient" size="l">Сложное</PrimaryButton>

// <PrimaryButton color="blue-gradient" size="l">Изучено</PrimaryButton>

// <PrimaryButton color="orange-gradient" size="xl">Неверно</PrimaryButton>

// <PrimaryButton color="blue-gradient" size="xl">Верно</PrimaryButton>
