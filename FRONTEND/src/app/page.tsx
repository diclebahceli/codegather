"use client"

import Image from "next/image";
import image7 from "./assets/12.jpg";
import compile from "./assets/compile1.jpg";
import competition from "./assets/competition.jpg";
import develop from "./assets/develop.jpg";
import logo from "./assets/logop.png";

import {Poppins} from "next/font/google";
import {StyleSheet, css} from "aphrodite";
import {slideInLeft, slideInRight} from "react-animations";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});


export default function Home() {

  const styles = StyleSheet.create({
    hover: {
      transition: 'transform 0.4s ease-in-out',
      ':hover': {
        transform: 'rotate(5deg)'
      }
    },
    slideIn: {
      animationName: slideInRight,
      animationDuration: '1s',
      animationTimingFunction: "cubic-bezier(0.2, 0.82, 0.165, 1)",
    }
  })

  return (
    <div className="d-flex flex-column bg-white h-100 bg-darker">
      <div className="overflow-hidden w-100 position-fixed" style={{height: "100%"}}>
        <Image
          src={image7}
          alt="Next.js logo"
          fill
          objectFit={"cover"}
          quality={100}
        >

        </Image>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center mb-5 overflow-hidden" style={{height: "50em"}}>
        <div className={`d-flex flex-column col-6 ms-auto ${css(styles.slideIn)}`}>
          <p className={`fs-m z-1 text-white fst-italic w-100 fw-bold text-center ${poppins.className}`}>
            Where code meets competition
          </p>
          <div className="fs-5 text-white z-1 w-100 text-center">
            Elevate your coding game and experience the thrill of coding challenges like never before
          </div>
        </div>
        <div className="col-1"> </div>

      </div>
      <div className="d-flex flex-column align-items-center" >
        <h1 className={`text-white z-1 ${poppins.className}`}>
          Out Features
        </h1>
        <hr className="w-50 border border-1 border-white opacity-75 mb-5" />
        <div className="d-flex flex-row justify-content-around mb-5 flex-wrap w-100">
          <div className={`card col-10 col-md-3 my-3 border border-2 border-white ${css(styles.hover)}`}>
            <div className=" position-relative overflow-hidden w-100" style={{height: "15em"}} >
              <Image
                src={compile}
                className="card-img-top"
                alt="..."
                fill
                objectFit="cover"
              ></Image>
            </div>
            <div className="card-body bg-darker">
              <h5 className={`card-title text-center text-white fw-bold ${poppins.className} `}>Online Compilation</h5>
            </div>
          </div>
          <div className={`card col-10 col-md-3 my-3 border border-2 border-white ${css(styles.hover)}`}>
            <div className=" position-relative overflow-hidden w-100" style={{height: "15em"}} >
              <Image
                src={competition}
                className="card-img-top"
                alt="..."
                fill
                objectFit="cover"
              ></Image>
            </div>
            <div className="card-body bg-darker">
              <h5 className={`text-white card-title text-center z-1 fw-bold ${poppins.className}`}>
                Friendly Competition
              </h5>
            </div>
          </div>

          <div className={`card col-10 col-md-3 my-3 border border-2 border-white ${css(styles.hover)}`}>
            <div className=" position-relative overflow-hidden w-100" style={{height: "15em"}} >
              <Image
                src={develop}
                className="card-img-top"
                alt="..."
                fill
                objectFit="cover"
              ></Image>
            </div>
            <div className="card-body bg-darker">
              <h5 className={`text-white text-center card-title z-1 fw-bold ${poppins.className}`}>
                Self Development
              </h5>
            </div>
          </div>
        </div>

        <div className="" style={{height: "12em"}}></div>
        <h1 className={`text-white  ${poppins.className} z-1 my-2`}>
          About Us
        </h1>
        <hr className="w-50 border border-1 border-white opacity-75 mb-5" />
        <div className="d-flex justify-content-center z-1">
          <Image
            src={logo}
            width={300}
            height={300}
            alt=""
            objectFit="contain"
          >
          </Image>
          <div className="col-1"></div>
          <p className="text-white col-3 mt-5">
            We are a team of developers who are passionate about coding and want to share our passion with the world. We believe that coding is a skill that can be developed and improved with practice. Our platform is designed to help you improve your coding skills through friendly competition and self-development. We hope you enjoy using our platform and look forward to seeing you at our next competition!
          </p>

        </div>
      </div>
    </div >
  );
}
