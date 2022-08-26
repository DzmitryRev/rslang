import styles from './PetalButton.module.css';

type PetalButtonProps = {
  shadowColor: 'blue' | 'purple' | 'red' | 'light-purple' | 'yellow' | 'pink';
  size: 's' | 'm';
  active?: boolean;
  callback?: () => void;
  children: React.ReactNode;
};

export default function PetalButton({
  shadowColor,
  size,
  active = false,
  callback,
  children,
}: PetalButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[shadowColor]} ${styles[size]} ${
        active ? styles.active : ''
      }`}
      onClick={
        callback
          ? () => {
            callback();
          }
          : () => {}
      }
    >
      {children}
    </button>
  );
}

// Пример:
{
  /* <PetalButton shadowColor="blue" size="s" active={true}>A1</PetalButton>
<PetalButton shadowColor="light-purple" size="m">Привет</PetalButton>
<PetalButton shadowColor="purple" size="s">C2</PetalButton>
<PetalButton shadowColor="pink" size="m">Привет</PetalButton>
<PetalButton shadowColor="red" size="s">B1</PetalButton>
<PetalButton shadowColor="yellow" size="m">Привет</PetalButton> */
}
