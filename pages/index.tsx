import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import styles from '../styles/Home.module.css'
import Bird from './bird'
import Counter from './counter'
import Obstacle from './obstacle'
import ObstacleContainer from './obstacleContainer'

const Home: NextPage = () => {
  const [dead, setDead] = useState(false);
  const [count, setCount] = useState(0);

  const onCountIncrease = () => {
    setCount(count+1);
  }

  const onDeath = () => {
    setDead(true);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Flappy Bird</title>
        <meta name="description" content="Flappy Bird" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Bird onDeath={onDeath}/>
        <ObstacleContainer dead={dead} onCountIncrease={onCountIncrease}/>
        <Counter count={count}/>
      </main>
    </div>
  )
}

export default Home
