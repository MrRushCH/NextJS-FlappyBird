import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Counter.module.css'

interface Props {
    count: number
}

const Counter: NextPage<Props> = ({count}) => {
  return (
    <div className={styles.container}>
        {count}
    </div>
  )
}

export default Counter
