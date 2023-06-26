import styles from './Loader.module.scss'

export function MyLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  )
}
