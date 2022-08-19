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
        dont post photos of us on social media generally. Over the years, the
        site has become my Frankenstein's monster or as my friend Mike said,{" "}
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
          rel="noreferrer"
        >
          my resume
        </a>
        .
      </p>
      <h2>Tech Stack:</h2>
      <h3>Front end:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <div className="list-about-item" style={{ fontWeight: "bold" }}>
            world-ui:{" "}
            <a
              href="https://github.com/tdeslauriers/world-ui-react"
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ fontWeight: "normal" }}>source code (GitHub)</span>
            </a>
          </div>
        </li>
        <ul>
          <li>Web client serving the user interface/user experience.</li>
          <li>
            <strong>ReactJS:</strong> single page application (SPA) framework
            developed by Facebook and open-sourced.
          </li>
          <li>
            Implemented in <strong>Java Script</strong>.
          </li>
          <li>
            It looks like Material-UI, but it isn't: all plain{" "}
            <strong>CSS</strong>.
          </li>
        </ul>
      </ul>
      <h3>Back end:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <div className="list-about-item" style={{ fontWeight: "bold" }}>
            auth service:{" "}
            <a
              href="https://github.com/tdeslauriers/world-auth-java"
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ fontWeight: "normal" }}>source code (GitHub)</span>
            </a>
          </div>
          <ul>
            <li>
              This registers users, validates authentication credentials,
              manages roles/scopes, and mints jwt tokens.
            </li>
            <li>Serves user-profile content.</li>
            <li>
              <strong>Micronaut</strong>: a JVM-based microservice framework
              created by Grails.
            </li>
            <li>
              Implemented in <strong>Java 17</strong>.
            </li>
            <li>
              Persistance layer is <strong>MariaDB Galera Cluster</strong>: open
              source relational database (sql) fork of MySql; includes virutally
              synchronous data replication.
            </li>
          </ul>
        </li>
        <li className="list-about-item">
          <div className="list-about-item" style={{ fontWeight: "bold" }}>
            gallery service:{" "}
            <a
              href="https://github.com/tdeslauriers/gallery"
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ fontWeight: "normal" }}>source code (GitHub)</span>
            </a>
          </div>
          <ul>
            <li>This serves the images hosted by the site.</li>
            <li>
              <strong>Micronaut</strong>: a JVM-based microservice framework
              created by Grails.
            </li>
            <li>
              Implmented in <strong>Java 17</strong>.
            </li>
            <li>
              Persistance layer is <strong>MariaDB Galera Cluster</strong>: open
              source relational database (sql) fork of MySql; includes virutally
              synchronous data replication.
            </li>
          </ul>
        </li>
      </ul>
      <h3>Infrastructure:</h3>
      <ul className="list-about">
        <li className="list-about-item">
          <strong>Kubernetes (K8s)</strong>: open-source system for automating
          deployment, scaling, and management of containerized applications.
        </li>
        <li className="list-about-item">
          <strong>Istio</strong>: extends Kubernetes to establish a
          programmable, application-aware network (service mesh) using{" "}
          <strong>Envoy</strong> service proxies.
        </li>
        <li className="list-about-item">
          Hosting: various old, busted computers at my house.
        </li>
      </ul>
      <h3>Support:</h3>
      <ul className="list-about">
        <div className="list-about-item" style={{ fontWeight: "bold" }}>
          Stager:{" "}
          <a
            href="https://github.com/tdeslauriers/stager"
            target="_blank"
            rel="noreferrer"
          >
            <span style={{ fontWeight: "normal" }}>source code (GitHub)</span>
          </a>
        </div>
        <ul>
          <li>
            Automated local <strong>Golang</strong> application that reads
            images from a staging directory, loads them to the gallery service
            database, and maps them therein for UI consumption.
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default About;
