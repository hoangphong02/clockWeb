import React from 'react'
import { WrapperAbout, WrapperAboutContainer, WrapperButton, WrapperCategory, WrapperCategoryCard, WrapperCategoryContainer, WrapperCategoryDescription, WrapperCategoryImage, WrapperCategoryStar, WrapperCategoryTitle, WrapperClassHome, WrapperHomDescription, WrapperHome, WrapperHomeData, WrapperHomeImg, WrapperHomeTitle, WrapperHomeTitleImg1, WrapperHomeTitleImg2, WrapperHomeTree1, WrapperHomeTree2, WrapperItemCart, WrapperItemImg, WrapperItemsButton, WrapperItemsName, WrapperItemsPrice, WrapperMain, WrapperParky, WrapperParkyContainer, WrapperParkyData, WrapperParkyDescription, WrapperParkyStar1, WrapperParkyStar2, WrapperSectionTitle, WrapperShapeBig, WrapperShapeSmall } from './style'

const TestPage = () => {
	const handleDoc =()=>{
	var msg = new SpeechSynthesisUtterance();
	msg.lang = "vi-VI"; 
	msg.text = "Con yến giang khùng điên";
	msg.volume = 1;
                msg.rate = 0.6;
                msg.pitch = 1;
	window.speechSynthesis.speak(msg); 
	console.log("msg",msg.text)
	}

  return (
    
    <WrapperMain className="main">
			<div><button onClick={handleDoc}>Mic</button></div>
            <WrapperClassHome className="home section" id="home">
							<WrapperShapeSmall className="shape__small"></WrapperShapeSmall>
							<WrapperShapeBig className="shape__big"></WrapperShapeBig>
            	<WrapperHome className="home__container container grid" >
            		<WrapperHomeData className="home__data">
            			<WrapperHomeTitle className="home__title">
            				<span>Halloween Party!</span>Trick or Treat!!!            
								      <WrapperHomeTitleImg1 src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="home image" className="home__title-img-1"/>
										<WrapperHomeTitleImg2 src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="home image" className="home__title-img-2"/>
            			</WrapperHomeTitle>
									<WrapperHomDescription className="home__description">
										This Halloween, enjoy trick-or-treating with your friends and spend a terrifying night under the full moon.		
									</WrapperHomDescription>
									<WrapperButton href="#" className="button">Explore Now!!</WrapperButton>
            		</WrapperHomeData>
								<WrapperHomeImg src="https://cdn.pixabay.com/photo/2013/07/12/16/38/pumpkin-151302_1280.png" alt="home image"className="home__img"/>
								<WrapperHomeTree1 src="https://cdn.pixabay.com/photo/2022/10/12/00/04/cat-7515377_1280.jpg" alt="home image" className="home__tree-1"/>
								<WrapperHomeTree2 src="https://cdn.pixabay.com/photo/2022/10/12/00/04/cat-7515377_1280.jpg" alt="home image" className="home__tree-2"/>
            	</WrapperHome>
            </WrapperClassHome>
	 
       <WrapperCategory className="category section">
				     <WrapperShapeSmall className="shape__small" style={{top: "25rem",left: "-4rem"}}></WrapperShapeSmall>
                <WrapperSectionTitle className="section__title">
                	Choose your <br></br>
									spooky category
                </WrapperSectionTitle>
				 <WrapperCategoryContainer className="category__container container grid">
				 	    <WrapperCategoryCard className="category__card">
				 	    	<WrapperCategoryImage src="https://cdn.pixabay.com/photo/2012/04/01/16/39/halloween-23439_1280.png" alt="category image" className="category__img"/>
								<WrapperCategoryTitle className="category__title">Pumpkins</WrapperCategoryTitle>
								<WrapperCategoryDescription className="category__description">
										Light up horror pumpkins to scare at night
								</WrapperCategoryDescription>
								<WrapperCategoryStar src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" className="category__star"/>
				 	    </WrapperCategoryCard>
					  <div className="category__card">
				 	    	<WrapperCategoryImage src="https://cdn.pixabay.com/photo/2014/04/02/16/26/ghost-307267_1280.png" alt="category image" className="category__img"/>
								<WrapperCategoryTitle className="category__title">Ghost</WrapperCategoryTitle>
								<WrapperCategoryDescription className="category__description">
									Spooky ghosts to scare in the most haunted houses
								</WrapperCategoryDescription>
								<WrapperCategoryStar src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" className="category__star"/>
				 	    </div>
					  <div className="category__card">
				 	    	<WrapperCategoryImage src="https://cdn.pixabay.com/photo/2016/03/31/20/29/hat-1295801_1280.png" alt="category image" className="category__img"/>
								<WrapperCategoryTitle className="category__title">Witch Hat</WrapperCategoryTitle>
								<WrapperCategoryDescription className="category__description">
								  The most elegant witch hats you can wear and scare
								</WrapperCategoryDescription>
								<WrapperCategoryStar src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" className="category__star"/>
				 	    </div>
				 </WrapperCategoryContainer>
        </WrapperCategory>

           
            <WrapperAbout className="about section" id="about">
							<WrapperShapeSmall className="shape__small" style={{top: "2rem",right: "-3rem"}}></WrapperShapeSmall>
							<WrapperShapeBig className="shape__big" style={{bottom: "0",left: "-8rem"}} ></WrapperShapeBig>
                <WrapperAboutContainer className="about__container container grid">
                	<div className="about__data" style={{textAlign:"center"}}>
                		 <WrapperSectionTitle className="section__title" style={{marginBottom: "1rem"}}>
                		 	  About The Night <br></br>
											   Of Terror
                		 </WrapperSectionTitle>
										<p className="about__description" style={{marginBottom: "2rem"}}>
											Halloween is celebrated every October 31 at night, walk around the city with your friends and trick or treat, enjoy this celebration under the full moon.
										</p>
										<WrapperButton href="#" className="button">Know More!!!</WrapperButton>
                	</div>
									<img src="https://cdn.pixabay.com/photo/2014/12/21/23/58/scarecrow-576497_1280.png" alt="about image" className="about__img" style={{width: "300px",justifySelf: "center"}}/>
                </WrapperAboutContainer>
            </WrapperAbout>

        
            <section className="items section" id="items" style={{position:"relative"}}>
								<WrapperShapeBig className="shape__big" style={{bottom:"-8rem",right: "-8rem"}}></WrapperShapeBig>
                <WrapperSectionTitle className="section__title">
                	Select your <br></br>
									lost item
                </WrapperSectionTitle>
							<div className="items__container container grid" style={{paddingTop: "2rem",gridTemplateColumns: 'repeat(2, 1fr)',justifyContent: "center",gap: "4rem 1.5rem"}}>
								<WrapperItemCart className="items__card">
									<WrapperItemImg src="https://cdn.pixabay.com/photo/2012/04/13/11/07/candied-apples-31871_1280.png" alt="items image" className="items__img"/>
									<WrapperItemsName className="items__name">Candy Apple</WrapperItemsName>
									<WrapperItemsPrice className="items__price">$4.99</WrapperItemsPrice>
									<WrapperItemsButton className="items__button">
										<i className="ri-heart-3-line" style={{fontSize: "1.25rem"}}></i>
									</WrapperItemsButton>
								</WrapperItemCart>
								<WrapperItemCart className="items__card">
									<WrapperItemImg src="https://cdn.pixabay.com/photo/2016/06/01/06/45/broom-1428449_1280.png" alt="items image" className="items__img"/>
									<WrapperItemsName className="items__name">Witch Broom</WrapperItemsName>
									<WrapperItemsPrice className="items__price">$10.99</WrapperItemsPrice>
									<WrapperItemsButton className="items__button">
										<i className="ri-heart-3-line" style={{fontSize: "1.25rem"}}></i>
									</WrapperItemsButton>
								</WrapperItemCart>
								<WrapperItemCart className="items__card">
									<WrapperItemImg src="https://cdn.pixabay.com/photo/2012/04/01/16/39/halloween-23439_1280.png" alt="items image" className="items__img"/>
									<WrapperItemsName className="items__name">Pumpkin</WrapperItemsName>
									<WrapperItemsPrice className="items__price">$7.99</WrapperItemsPrice>
									<WrapperItemsButton className="items__button">
										<i className="ri-heart-3-line" style={{fontSize: "1.25rem"}}></i>
									</WrapperItemsButton>
								</WrapperItemCart>
								<WrapperItemCart className="items__card">
									<WrapperItemImg src="https://cdn.pixabay.com/photo/2013/07/12/18/59/garden-spider-154125_1280.png" alt="items image" className="items__img"/>
									<WrapperItemsName className="items__name">Spider</WrapperItemsName>
									<WrapperItemsPrice className="items__price">$9.99</WrapperItemsPrice>
									<WrapperItemsButton className="items__button">
										<i className="ri-heart-3-line" style={{fontSize: "1.25rem"}}></i>
									</WrapperItemsButton>
								</WrapperItemCart>
								<WrapperItemCart className="items__card">
									<WrapperItemImg src="https://cdn.pixabay.com/photo/2022/09/04/23/08/witch-hat-7432914_1280.png" alt="items image" className="items__img"/>
									<WrapperItemsName className="items__name">Witch Hat</WrapperItemsName>
									<WrapperItemsPrice className="items__price">$15.99</WrapperItemsPrice>
									<WrapperItemsButton className="items__button">
										<i className="ri-heart-3-line" style={{fontSize: "1.25rem"}}></i>
									</WrapperItemsButton>
								</WrapperItemCart>
							</div>
            </section>

           
            <WrapperParky className="party section" id="party">
							<WrapperParkyContainer className="party__container container grid">
                <WrapperParkyData className="party__data">
                	<WrapperSectionTitle className="section__title" style={{marginBottom: '1rem'}}> 
                		  Halloween <br></br>
										  party 31 October
                	</WrapperSectionTitle>
									<WrapperParkyDescription className="party__description">
										Organize a great halloween party and enjoy the creepiest 
										night of terror with all your friends.
									</WrapperParkyDescription>
									<WrapperButton href="#" className="button">
										Start The Party!!!
									</WrapperButton>
                </WrapperParkyData>
								<div className="party__images" style={{position: "relative",justifySelf: "center"}}>
									  <img src="https://cdn.pixabay.com/photo/2017/01/30/23/52/bubble-2022390_1280.png" alt="party image" className="party__img" style={{width: "400px"}}/>
									<WrapperParkyStar1 src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="party image" className="party__star-1"/>
									<WrapperParkyStar2 src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="party image" className="party__star-2"/>
								</div>
								</WrapperParkyContainer>
            </WrapperParky>
</WrapperMain>
 
  )
}

export default TestPage