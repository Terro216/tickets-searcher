import styles from './InputGroup.module.scss'
import { Input } from '../Input/Input'
import { SFPro } from '@/app/layout'
import Select from '../Select'

interface InputGroupProps {
  title: string
  type: 'input' | 'select'
  selectType?: 'genre' | 'cinema'
}

export function InputGroup({ title, type, selectType }: InputGroupProps) {
  return (
    <div className={`${styles.inputGroup} ${SFPro.className}`}>
      <span className={styles.header}>{title}</span>
      {type === 'input' && <Input />}
      {type === 'select' && <Select selectType={selectType} />}
    </div>
  )
}
