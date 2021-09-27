import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import styles from '../styles/ObstacleContainer.module.css'
import Obstacle from './obstacle';

const ObstacleContainer: NextPage = () => {
	const [obstacles, setObstacles] = useState<number[]>(generateObstacles(10));
	const [obstacleContainerRef, setObstacleContainerRef] = useState<HTMLDivElement|null>(null);
	const [obstacleContainerXPos, setObstacleContainerXPos] = useState(50);
	const [spacePressed, setSpacePressed] = useState(false);
  
	useEffect(() => {
		let xPosInitialized = false;
	  document.addEventListener("keydown", (e) => {
		if(e.key===" " && !spacePressed) {
			setSpacePressed(true);
			if(!xPosInitialized) {
				setObstacleContainerXPos(obstacleContainerXPos-0.1);
				xPosInitialized = true;
			}
		} 
	  })
	}, [])

    useEffect(() => {
        if(spacePressed && obstacleContainerRef) {
            setTimeout(() => {
				setObstacleContainerXPos(obstacleContainerXPos-0.1);
				const obstacleContainer = document.querySelector(".obstacle-container");
				if(obstacleContainer?.getBoundingClientRect().x && obstacleContainer?.getBoundingClientRect().x <= -200) {
					console.log(obstacleContainer.getBoundingClientRect().x)
					const reactDomNode = ReactDOM.findDOMNode(obstacleContainer);
					reactDomNode?.remove();
					const newObstacles = [...obstacles];
					newObstacles.push(generateObstacles(1)[0]);
					setObstacles(newObstacles);
				}

            }, 10);
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
