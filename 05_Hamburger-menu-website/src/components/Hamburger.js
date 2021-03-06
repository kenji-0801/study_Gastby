import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Hamburger = ({ state }) => {
  // Vars for our animated dom nodes
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      // Close our Menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.4
        }
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" }
      });
    } else if (state.clicked === true || state.clicked === true && state.initial === null){
      // Open our Menu
      gsap.to(menu, {
        duration: 0,
        css: { display: "block" }
      });
      gsap.to([revealMenuBackground,revealMenu], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal([revealMenuBackground, revealMenu]);
      fadeInUp(info);
      staggerText(line1, line2,line3)
    }
  },[state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",
      skewY: 3,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3
      }
    });
  }

  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: .6,
      opacity: 0,
      ease: "power3.inOut",
    });
  };

  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      y: 100,
      duration: .6,
      delay: .4,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3
      }
    });
  };

  // Hover on the link
  const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power1.inOut"
    });
  };

  // Hover off the link
  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power1.inOut"
    });
  };


return (
  <div ref={el => (menu = el)} className='hamburger-menu'>
    <div ref={el => (revealMenuBackground = el)} className='menu-secondary-background-color'></div>
    <div ref={el => (revealMenu = el)} className='menu-layer'>
      <div className='menu-city-background'></div>
      <div className='container'>
        <div className='wrapper'>
          <div className='menu-links'>
            <nav>
              <ul>
                <li><Link onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)} ref={el => (line1 = el)}  to='/opportunities'>Opportunities</Link></li>
                <li><Link onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)}ref={el => (line2 = el)}  to='/solutions'>Solutions</Link></li>
                <li><Link onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)}ref={el => (line3 = el)}  to='/contact-us'>Contact us</Link></li>
              </ul>
            </nav>
            <div ref={el => (info = el)} className='info'>
              <h3>Our Promise</h3>
              <p>
                The passage experienced a surge in popularity during the 1960s
                when Letraset used it on their dry-transfer sheets, and again
                during the 90s as desktop publishers bundled the text with
                their software.
                </p>
            </div>
            <div className='locations'>
              Locations:
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default Hamburger;
