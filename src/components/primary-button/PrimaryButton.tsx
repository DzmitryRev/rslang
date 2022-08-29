import styles from './PrimaryButton.module.css';

type ButtonProps = {
  color: 'orange' | 'blue' | 'orange-gradient' | 'blue-gradient';
  size: 's' | 'm' | 'l' | 'xl';
  disabled?: boolean;
  callback?: () => void;
  children: React.ReactNode;
};

export default function PrimaryButton({
  color,
  size,
  disabled = false,
  callback = () => {},
  children,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[size]} ${
        disabled ? styles.disabled : ''
      }`}
      disabled={disabled}
      onClick={() => {
        callback();
      }}
    >
      {children}
    </button>
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
