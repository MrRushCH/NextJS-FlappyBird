import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Bird.module.css'

interface Props {
    onDeath: Function;
}

const Bird: NextPage<Props> = ({onDeath}) => {
    const [birdRef, setBirdRef] = useState<HTMLDivElement | null>();
    const [birdTop, setBirdTop] = useState(50);
    const [spacePressed, setSpacePressed] = useState(false);
    const [jumpActive, setJumpActive] = useState(false);
    const [dead, setDead] = useState(false);
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
    }, [ , dead])

    useEffect(() => {
        if(dead && birdRef) {
            birdRef.style.backgroundColor = "#dd2222";
            onDeath();
        }
    }, [dead])

    useEffect(() => {
        if(spacePressed && !dead) {
            if(jumpActive) {
                birdRef?.animate([
                    {transform: "rotate(-30deg)"},
                    {transform: "rotate(0deg"}
                ], {
                    duration: msPerPxJump*jumpHeight*2,
                    iterations: 1
                })
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
        const obstacle = document.querySelector(".obstacle-container");
        const obstaclePos = obstacle?.getBoundingClientRect();
        const birdPos = birdRef?.getBoundingClientRect();
        if(obstaclePos && birdPos) {
            if(obstaclePos.x < birdPos.x+birdPos.width && obstaclePos.x+obstaclePos.width > birdPos.x){
                const obstacleTopPos = document.querySelector(".obstacle__top")?.getBoundingClientRect();
                const obstacleBottomPos = document.querySelector(".obstacle__bottom")?.getBoundingClientRect();
                if(obstacleTopPos && obstacleBottomPos) {
                    if(obstacleBottomPos.y < birdPos.y || obstacleTopPos.height > birdPos.y) {
                        setDead(true);
                    }
                }
            }
        }
        if((!jumpActive || dead) && birdRef && birdTop < 97) {
            birdRef?.animate([
                {transform: "rotate(10deg)"},
                {transform: "rotate(0deg"}
            ], {
                duration: msPerPxJump*jumpHeight,
                iterations: 1
            })
            setTimeout(() => {
                setBirdTop(birdTop+pxPerGrav);
            }, msPerPxGrav);
        }
        if(birdRef) {
            birdRef.style.top = `${birdTop}vh`;
        }
    }, [birdTop])


  return (
      <div className={`${styles.bird} bird`} ref={(ref)=>setBirdRef(ref)}>
          <div className={styles.beek}></div>
          <div className={styles.eye}></div>
          <div className={styles.wings}></div>
      </div>
  )
}

export default Bird
