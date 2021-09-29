import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import styles from '../styles/ObstacleContainer.module.css'
import Obstacle from './obstacle';

interface Props {
	dead: boolean;
	onCountIncrease: Function;
}

const ObstacleContainer: NextPage<Props> = ({dead, onCountIncrease}) => {
	const [obstacles, setObstacles] = useState<number[]>(generateObstacles(10));
	const [obstacleContainerRef, setObstacleContainerRef] = useState<HTMLDivElement|null>(null);
	const [obstacleContainerXPos, setObstacleContainerXPos] = useState(50);
	const [spacePressed, setSpacePressed] = useState(false);
  
	useEffect(() => {
		let xPosInitialized = false;
	  document.addEventListener("keydown", (e) => {
		if(e.key===" " && !spacePressed && !dead) {
			setSpacePressed(true);
			if(!xPosInitialized) {
				setObstacleContainerXPos(obstacleContainerXPos-0.1);
				xPosInitialized = true;
			}
		} 
	  })
	}, [])

    useEffect(() => {
		if(dead) {
			const birdPos = document.querySelector(".bird")?.getBoundingClientRect();
			if(birdPos && birdPos.y+birdPos.height+5 < window.innerHeight) {
				setTimeout(() => {
					setObstacleContainerXPos(obstacleContainerXPos-0.1);
				}, 10);
			}
		}
        if(spacePressed && obstacleContainerRef && !dead) {
            setTimeout(() => {
				setObstacleContainerXPos(obstacleContainerXPos-0.1);
				const obstacleContainer = document.querySelector(".obstacle-container");
				if(obstacleContainer?.getBoundingClientRect().x && obstacleContainer?.getBoundingClientRect().x <= -200) {
					const reactDomNode = ReactDOM.findDOMNode(obstacleContainer);
					reactDomNode?.remove();
					onCountIncrease();
					const newObstacles = [...obstacles];
					newObstacles.push(generateObstacles(1)[0]);
					setObstacles(newObstacles);
				}
				
            }, 5);
        }
        if(obstacleContainerRef) {
            obstacleContainerRef.style.left = `${obstacleContainerXPos}vw`;
        }
    }, [obstacleContainerXPos])
  
    return (
		<div className={styles.container} ref={(ref)=>setObstacleContainerRef(ref)}>
		  {obstacles.map((obstacle, index) => {
			return (
			  <div className={styles.area} key={`obstacle_${index}`}>
				<Obstacle spaceYPos={obstacle}/>
			  </div>
			)
		  })}
		</div>
    )
}

function generateObstacles(numOfObstacles: number) {
	const obstacles = [];
	for(let i = 0; i < numOfObstacles; i++) {
	  obstacles.push(Math.round(Math.random()*75));
	}
	return obstacles;
  }
  
export default ObstacleContainer
