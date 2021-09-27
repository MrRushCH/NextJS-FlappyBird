import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Bird.module.css'

const Bird: NextPage = () => {
    const [birdRef, setBirdRef] = useState<HTMLDivElement | null>();
    const [birdTop, setBirdTop] = useState(50);
    const [spacePressed, setSpacePressed] = useState(false);
    const [jumpActive, setJumpActive] = useState(false);
    const msPerPxJump = 10;
    const msPerPxGrav = 10;
    const pxPerJump = 0.75;
    const pxPerGrav = 0.5;
    const jumpHeight = 20;
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if(e.key== " ") {
                setSpacePressed(true);
                setJumpActive(true);
            }
        })
    }, [])

    useEffect(() => {
        if(spacePressed) {
            if(jumpActive) {
                for(let i = 0; i < jumpHeight; i++) {
                    setTimeout(() => {
                        if(i === jumpHeight-1) {
                            setJumpActive(false);
                        }
                        setBirdTop(birdTop-pxPerJump*i);
                    }, i*msPerPxJump);
                }
            }
        }
    }, [jumpActive])


    useEffect(() => {
        if(!jumpActive && birdRef) {
            setTimeout(() => {
                setBirdTop(birdTop+pxPerGrav);
            }, msPerPxGrav);
        }
        if(birdRef) {
            birdRef.style.top = `${birdTop}vh`;
        }
    }, [birdTop])


  return (
      <div className={styles.bird} ref={(ref)=>setBirdRef(ref)}>
      </div>
  )
}

export default Bird
