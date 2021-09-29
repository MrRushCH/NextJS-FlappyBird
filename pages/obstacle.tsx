import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Obstacle.module.css'

interface Props {
    spaceYPos: number;
}

const Obstacle: NextPage<Props> = ({spaceYPos}) => {
	const [obstacleTopRef, setObstacleTopRef] = useState<HTMLDivElement|null>();
	const [obstacleBottomRef, setObstacleBottomRef] = useState<HTMLDivElement|null>();

	useEffect(() => {
		if(obstacleTopRef) {
			obstacleTopRef.style.height = `${spaceYPos}vh`;
		}
	}, [obstacleTopRef])

	useEffect(() => {
		if(obstacleBottomRef) {
			obstacleBottomRef.style.height = `${100-spaceYPos-30}vh`;
		}
	}, [obstacleBottomRef])
    return (
    <div className={`${styles.container} obstacle-container`}>
        <div className={`${styles.obstacle__top} obstacle__top`} ref={(ref)=> setObstacleTopRef(ref)}></div>
        <div className={`${styles.obstacle__bottom} obstacle__bottom`} ref={(ref)=> setObstacleBottomRef(ref)}></div>
    </div>
    )
}

export default Obstacle
