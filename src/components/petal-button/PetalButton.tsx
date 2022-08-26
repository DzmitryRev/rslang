import styles from './PetalButton.module.css';

type PetalButtonProps = {
  shadow: 'a';
  size: 's' | 'l';
  children: React.ReactNode;
};

export default function PetalButton({ shadow, size, children }: PetalButtonProps) {
  return (
    <button className={`${styles.button} ${styles[shadow]} ${styles[size]}`}>{children}</button>
  );
}
