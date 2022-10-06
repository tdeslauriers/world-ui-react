import React from "react";
import "./About.css";

const About = () => {
  return (
    <div>
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
        you see now is <strong>Micronaut</strong> and <strong>React</strong>...
        mostly, so far.
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
      <h3>Front end:</h3>
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
      <h3>Back end:</h3>
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
            jwt tokens, and serves user profile content. Persistance layer is{" "}
            <strong>MariaDB Galera Cluster</strong>.
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
            images hosted by the site. Persistance layer is{" "}
            <strong>MariaDB Galera Cluster</strong>.
          </div>
        </li>
      </ul>
      <h3>Infrastructure:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <strong>Kubernetes (K8s)</strong> cluster running on various old,
          busted computers at my house.
        </li>
      </ul>
      <h3>Support:</h3>
      <ul className="list-about">
        <div className="list-about-item">
          <a
            href="https://github.com/tdeslauriers/stager"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ fontWeight: "bold" }}>Stager (GitHub):</span>
          </a>{" "}
          automated local <strong>Golang</strong> application that reads images
          from a staging directory, loads them to the gallery service database,
          and maps them for UI consumption.
        </div>
      </ul>
    </div>
  );
};

export default About;
