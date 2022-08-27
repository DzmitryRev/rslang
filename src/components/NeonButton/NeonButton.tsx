import styles from './ssss.module.css';

type NeonButtonProps = {
  onClick: () => void;
  title: string;
};

export default function NeonButton({ onClick, title }: NeonButtonProps) {
  return (
    <button
      className={styles.neonBtn}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </button>
  );
}
