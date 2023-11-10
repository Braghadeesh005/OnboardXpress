import React from 'react'
import './Home.css'
import slide1 from './images/a.jpg';
import slide2 from './images/b.jpg';
import slide3 from './images/c.jpg';
import slide4 from './images/d.jpg';
import slide5 from './images/e.jpg';
import slide6 from './images/f.jpg';
import slide7 from './images/g.jpg';

import Navbar from "../Navbar/Navbar";
import { NavLink } from 'react-router-dom';


const Home = () => {
  return (
        <>
            <Navbar/>

            <div className='panel1'>

              <div className='quote'>
                
              <div>Transforming technology into  </div>

              <div class="scroller">
              <div>
                Cool<br/>
                Art<br/>
                Intruiging<br/>
                Challenging
              </div>
              </div>
            
              <div>, one line of code at a time.</div>
            
              </div>

              <div className='explore'>
                <NavLink to='login' className='nav-menu'>
              <button class="button">
                <svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                Explore
              </button>
              </NavLink>
              </div>

            </div>

            <div className='panel2'>
               <div class="ticker">
                    <div class="ticker-title">
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                      <span>#OnboardXpress</span>
                    </div>
                </div>
            </div>

            <div className='panel3'>
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
              <div className='p3-title'>155+ Associates</div>
              <div className='p3-content'>In Our Organization</div>
              <div className='p3-content'>Discover the perfectly trained & unique individuals to conquer the world.</div>
              <div className='p3-content'>Power up your idea!</div>
              <NavLink to='/terms' className='nav-menu'><button className='viewmore'>View More</button></NavLink>
            </div>

            <div className='panel4'>
                    <div class="external">
                <div class="horizontal-scroll-wrapper">
                  
                  <div class="img-wrapper slower">
                    <a>
                  <img src={slide1} alt=""/>
                  </a>
                  </div>
              
                  <div class="img-wrapper faster">
                  <a>
                      <img src={slide2} alt=""/>
                  </a>
                  </div>
              
                  <div class="img-wrapper slower vertical">
                  <a>
                      <img src={slide3} alt=""/>
                  </a>
                  </div>
              
                  <div class="img-wrapper slower slower-down">
                  <a>
                      <img src={slide4} alt=""/>
                  </a>
                  </div>
              
                  <div class="img-wrapper">
                  <a>
                      <img src={slide5}/>
                  </a>
                  </div>
              
                  <div class="img-wrapper slower">
                  <a>
                      <img src={slide6} alt=""/>
                  </a>
                  </div>
              
                  <div class="img-wrapper faster1">
                  <a>
                      <img src={slide7} alt=""/>
                  </a>
                  </div>
                  
                  <div class="img-wrapper slower slower2">
                  <a>
                      <img src={slide1} alt=""/>
                  </a>
                  </div>
                  
                  <div class="img-wrapper">
                  <a>
                      <img src={slide2} alt=""/>
                  </a>
                  </div>
                  
                  <div class="img-wrapper slower">
                  <a>
                      <img src={slide3} alt=""/>
                  </a>
                  </div>
                  
                  <div class="img-wrapper slower last">
                  <a>
                      <img src={slide4} alt=""/>
                  </a>
                  </div>
                </div>
                

              </div>
            </div>

            <div className='panel5'>
              <div class="parent">
                <div class="card">
                    <div class="logo">
                        <span class="circle circle1"></span>
                        <span class="circle circle2"></span>
                        <span class="circle circle3"></span>
                        <span class="circle circle4"></span>
                        <span class="circle circle5">
                        </span>

                    </div>
                    <div class="glass"></div>
                    <div class="content">
                        <span class="title">Our Services</span>
                        <span class="text">Discover a range of services tailored to meet your [specific services, e.g., software development, IT consulting] needs. Our team of experts is committed to delivering exceptional results.</span>
                    </div>
                </div>
            </div>

            <div class="parent">
                <div class="card">
                    <div class="logo">
                        <span class="circle circle1"></span>
                        <span class="circle circle2"></span>
                        <span class="circle circle3"></span>
                        <span class="circle circle4"></span>
                        <span class="circle circle5">
                        </span>

                    </div>
                    <div class="glass"></div>
                    <div class="content">
                        <span class="title">Our Expertise</span>
                        <span class="text">Years of experience in [Your Key Areas] have honed our skills and knowledge. We bring a wealth of expertise to every project, ensuring success and customer satisfaction.</span>
                    </div>
                </div>
            </div>

            <div class="parent">
                <div class="card">
                    <div class="logo">
                        <span class="circle circle1"></span>
                        <span class="circle circle2"></span>
                        <span class="circle circle3"></span>
                        <span class="circle circle4"></span>
                        <span class="circle circle5">
                        </span>

                    </div>
                    <div class="glass"></div>
                    <div class="content">
                        <span class="title">Innovation at the Core</span>
                        <span class="text">Innovation is the heartbeat of our organization. We stay at the forefront of technology trends, ensuring our clients benefit from the latest advancements.</span>
                    </div>
                </div>
            </div>

            </div>

            {/* <div className='panel6'>
              <div className='p6-left'>
                <div className='p6-title'>A Trusted Digital</div>
                <div className='p6-title'> Identity Solution.</div>
                <div className='p6-content'>Developed by Lab45, Decentralized Identity and Credential Exchange
                      (DICE) ID lets users safely share and protect their data.</div>
              </div>
              <div className='p6-right'>
                 
              </div>
            </div> */}

            <div className='panel7'>
                <div className='cardbox1'>
                    <div className='p7-title'>
                    Cybersecurity Solutions
                    </div>
                    <div className='p7-content'>
                    In an increasingly interconnected world, protecting your digital assets is paramount. Our comprehensive cybersecurity solutions safeguard your organization from cyber threats, ensuring data integrity, privacy, and business continuity. 
                    </div>
                </div>

                <div className='cardbox2'>
                <div className='p7-title'>
                Cloud Services
                        </div>
                        <div className='p7-content'>
                        Unlock the power of the cloud with our scalable and secure cloud services. Whether you're migrating to the cloud, optimizing existing infrastructure, or building cloud-native applications, we provide the expertise and infrastructure you need. 
                        </div>
                </div>

                <div className='cardbox3'>

                <div className='p7-title'>
                Data Analytics and Insights
                        </div>
                        <div className='p7-content'>
                        In today's data-driven world, making informed decisions is key to success. Our data analytics and insights solutions help you harness the full potential of your data. We employ advanced analytics tools and techniques to turn raw data into actionable insights.
                        </div>

                </div>
                
            </div>
        </>
  )
}

export default Home