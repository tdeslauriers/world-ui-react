import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <h2>
        About the <strong>deslauriers.world</strong> site:
      </h2>
      <p>
        I wanted a place to host pictures of/for my family and friends since I
        don't post photos of us on social media generally. Over the years, the
        site has become my Frankenstein's monster or as a friend said,{" "}
        <span style={{ fontStyle: "italic" }}>
          "the most over-engineered image server of all time."
        </span>
      </p>
      <p>
        When I want to learn about coding languages, frameworks,
        design-patterns, etc., I will read and/or take a course, and then get
        practical experience by designing new features or rebuilding a component
        herein. The site began as an <strong>AngularJS</strong> learning
        project, was rebuilt as a <strong>Spring Boot</strong> monolith, rebuilt
        again as a <strong>Spring Cloud</strong> microservice cluster, and what
        you see now is <strong>Micronaut</strong> and <strong>ReactJS</strong>
        ... mostly, so far.
      </p>

      <p>
        Finally, this site represents a body of work, serving as validation of{" "}
        <a
          href="https://www.linkedin.com/in/tomdeslauriers/"
          target="_blank"
          rel="noopener noreferrer"
        >
          my resume
        </a>
        .
      </p>
      <h2>Tech Stack:</h2>

      {/* UI */}
      <h3>UI/UX:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/world-ui-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>world-ui (GitHub):</span>
            </a>{" "}
            <strong>ReactJS</strong> web client serving the user interface/user
            experience.
          </div>
        </li>
      </ul>

      {/* Microservices */}
      <h3>Microservices:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/world-auth-java"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>auth service (GitHub):</span>
            </a>{" "}
            <strong>Micronaut</strong> microservice which registers users,
            validates authentication credentials, manages roles/scopes, mints
            jwt tokens, and serves user profile content. Persistance layer is a{" "}
            <strong>MariaDB </strong>.
          </div>
        </li>
        <li className="list-about-item">
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/gallery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>
                gallery service (GitHub):
              </span>
            </a>{" "}
            <strong>Micronaut</strong> microservice that serves the albums and
            images hosted by the site. Persistance layer is a{" "}
            <strong>MariaDB </strong>.
          </div>
        </li>
        <li className="list-about-item">
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/world-gateway"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>
                gateway service (GitHub):
              </span>
            </a>{" "}
            <strong>Micronaut</strong> microservice that provides
            request-routing to the microservice cluster. However, it is not a
            reverse proxy (only), it contains business logic like token
            checking, service data collation, and input validation.
          </div>
        </li>
        <li className="list-about-item">
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/allowance-reactive-hibernate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>
                allowance service (GitHub):
              </span>
            </a>{" "}
            <strong>Micronaut</strong> microservice utilzing{" "}
            <strong>Hibernate Reactive</strong> to manage, automate, and track
            the allowance application data. Persistance layer is a{" "}
            <strong>MariaDB </strong>.
          </div>
        </li>
      </ul>

      {/* Infrastructure */}
      <h3>Infrastructure:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <strong>Kubernetes (K8s)</strong> cluster running on various old,
          busted computers at my house.
        </li>
      </ul>

      {/* Support */}
      <h3>Support:</h3>
      <ul className="list-about">
        <li>
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/stager"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>stager (GitHub):</span>
            </a>{" "}
            automated local <strong>Golang</strong> application that reads
            images from a staging directory, loads them to the gallery service
            database, and maps them for UI consumption.
          </div>
        </li>
        <li>
          <div className="list-about-item">
            <a
              href="https://github.com/tdeslauriers/chiller"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontWeight: "bold" }}>chiller (GitHub):</span>
            </a>{" "}
            automated local <strong>Golang</strong> application that calls the
            supporting persistance microservices nightly and backs up their data
            to an an offline database.
          </div>
        </li>
      </ul>
    </>
  );
};

export default About;
