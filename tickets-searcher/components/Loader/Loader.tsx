import styles from './Loader.module.scss'

export function MyLoader({ size }: { size?: 'small' }) {
  return (
    <div className={`${styles.loaderWrapper}`}>
      <div className={`${styles.loader} ${size === 'small' ? styles.small : ''}`}></div>
    </div>
  )
}
