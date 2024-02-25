import React from 'react'
import { WrapperAbout, WrapperAboutContainer, WrapperButton, WrapperCategory, WrapperCategoryCard, WrapperCategoryContainer, WrapperCategoryDescription, WrapperCategoryImage, WrapperCategoryStar, WrapperCategoryTitle, WrapperclassNameHome, WrapperHomDescription, WrapperHome, WrapperHomeData, WrapperHomeImg, WrapperHomeTitle, WrapperHomeTitleImg1, WrapperHomeTitleImg2, WrapperHomeTree1, WrapperHomeTree2, WrapperItemCart, WrapperItemImg, WrapperItemsButton, WrapperItemsName, WrapperItemsPrice, WrapperMain, WrapperMainItem, WrapperNavbar, WrapperParky, WrapperParkyContainer, WrapperParkyData, WrapperParkyDescription, WrapperParkyStar1, WrapperParkyStar2, WrapperSectionTitle, WrapperShapeBig, WrapperShapeSmall, WrapperSidenav } from './style'

const TestPage = () => {
	const handleDoc =()=>{
	var msg = new SpeechSynthesisUtterance();
	msg.lang = "vi-VI"; 
	msg.text = "mở mic";
	msg.volume = 1;
                msg.rate = 0.6;
                msg.pitch = 1;
	window.speechSynthesis.speak(msg); 
	console.log("msg",msg.text)
	}

  return (
    
    <div>
		  <WrapperNavbar className="navbar-top">
        <div className="title">
            <h1>Profile</h1>
        </div>
    
    </WrapperNavbar>
   
    <WrapperSidenav className="sidenav">
        <div className="profile">
            <img src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png" alt="" width="100" height="100"/>

            <div className="name">
                ImDezCode
            </div>
            <div className="job">
                Web Developer
            </div>
        </div>

        <div className="sidenav-url">
            <div className="url">
                <a href="#profile" className="active">Profile</a>
                <hr align="center"/>
            </div>
            <div className="url">
                <a href="#settings">Settings</a>
                <hr align="center"/>
            </div>
        </div>
    </WrapperSidenav>
    
    <WrapperMainItem className="main">
        <h2>IDENTITY</h2>
        <div className="card">
            <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>ImDezCode</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>imdezcode@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>Bali, Indonesia</td>
                        </tr>
                        <tr>
                            <td>Hobbies</td>
                            <td>:</td>
                            <td>Diving, Reading Book</td>
                        </tr>
                        <tr>
                            <td>Job</td>
                            <td>:</td>
                            <td>Web Developer</td>
                        </tr>
                        <tr>
                            <td>Skill</td>
                            <td>:</td>
                            <td>PHP, HTML, CSS, Java</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </WrapperMainItem>
	</div>
 
  )
}

export default TestPage