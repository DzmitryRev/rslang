import styles from './Title.module.css';

type TitleProps = {
  align:'center'| 'start';
  width:'info'|'dictionary'|'video'|'team'|'user';
  children: React.ReactNode;
}


export default function Title({align,width, children}:TitleProps) {
  return (
    <h2 className={`${styles.titles} ${styles[align]} ${styles[width]}` }>
      {children}
    </h2>
  );
}

