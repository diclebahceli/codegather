import Image from "next/image";
import asset from "./assets/6.png";

import image from "./assets/7.jpg";
import image2 from "./assets/2.png";
import { Card } from "reactstrap";

export default function Home() {
  return (
    <div className="d-flex flex-column bg-dark">
      <div className="d-flex flex-row justify-content-around align-items-center">
        <div className="col-4 me-5 z-3">
          <Image
            src={asset}
            alt="Next.js logo"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className=" card col-3  text-darker fs-3 z-3">
          <div className="card-body">
            <h5 className="card-title">Disclaimer</h5>
            <p className="card-text fs-5">
              This is a simple example of a Next.js app that uses TypeScript,
              ESLint, Prettier, and Husky.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex flex-row justify-content-around mb-5">
          <div className="card col-3">
            <div className=" overflow-hidden">
              <Image
                src={image}
                className="card-img-top"
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <div className=" overflow-hidden ">
              <Image
                src={image}
                className="card-img-top "
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <div className=" overflow-hidden">
              <Image
                src={image}
                className="card-img-top"
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <div className="card col-3">
            <div className=" overflow-hidden">
              <Image
                src={image}
                className="card-img-top"
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <div className=" overflow-hidden ">
              <Image
                src={image}
                className="card-img-top "
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <div className=" overflow-hidden">
              <Image
                src={image}
                className="card-img-top"
                alt="..."
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
