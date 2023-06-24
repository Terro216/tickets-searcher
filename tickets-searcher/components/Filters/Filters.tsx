import InputGroup from '../InputGroup'
import styles from './filters.module.scss'

export function Filters() {
  return (
    <aside className={`${styles.filters}`}>
      <h3 className={styles.header}>Фильтр поиска</h3>
      <InputGroup title={'Название'} type={'input'} />
    </aside>
  )
}
