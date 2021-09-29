import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Counter.module.css'

interface Props {
    count: number,
    highScore: number
}

const Counter: NextPage<Props> = ({count, highScore}) => {
  return (
    <>
        <div className={styles.counter}>
            {count}
        </div>
        <div className={styles.highscore}>
            Best: {highScore}
        </div>
    </>
  )
}

export default Counter
