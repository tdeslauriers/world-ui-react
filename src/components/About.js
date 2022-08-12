import React from "react";
import "./About.css";

const About = () => {
  return (
    <div>
      <h2>
        About the <strong>deslauriers.world</strong> site:
      </h2>
      <p>
        I wanted a place to host family pictures of/for my family and friends
        since I dont post photos of us on social media generally. Over the
        years, the site has become my Frankenstein's monster or as my friend
        Mike said,{" "}
        <span style={{ fontStyle: "italic" }}>
          "the most over-engineered image server of all time."
        </span>
      </p>
      <p>
        When I want to learn about coding languages, frameworks,
        design-patterns, etc., I will read and/or take a course, and then use
        that tech to design new features or to rebuild a component herein. For
        me, hands-on experience is the only way to truely learn something. The
        site began as an <strong>AngularJS</strong> learning project, was
        rebuilt it as a <strong>Spring Boot</strong> monolith, rebuilt again as
        a <strong>Spring Cloud</strong> microservice cluster, and what you see
        now is <strong>Micronaut</strong> and <strong>React</strong>... mostly,
        so far.
      </p>
      <p>
        Relevant to my career as a <strong> data security professional</strong>,
        I build each part to the highest security spec I can, then I attack the
        site trying to beat my own controls. Why?
        <ul>
          <li>
            Hacking real websites is{" "}
            <span style={{ color: "#d45726", fontWeight: "bold" }}>crime</span>,
            a big one.
          </li>
          <li>
            <strong>Penetration testing </strong> labs are helpful for learning,
            but by being intentionally vulnerable, they don't emulate real
            scenarios. If you want that, you have to build it yourself.
          </li>
          <li>
            Playing both sides of the equation makes me much better at my job,
            especially the brass tacks where it matters most.
          </li>
        </ul>
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
        . If it is in the skills section, it is/was a component of this site.
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
              <span style={{ fontWeight: "normal" }}>code on github.</span>
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
            It looks like <strong>Material-UI</strong>, but it isn't. I really
            love MUI's aesthetic, but I wanted to learn how to do stylesheets au
            naturale, so this is all plain <strong>CSS</strong>.
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
              <span style={{ fontWeight: "normal" }}>code on github.</span>
            </a>
          </div>
          <ul>
            <li>
              This registers users, validates authentication credentials,
              manages roles/scopes, and mints <strong>jwt tokens</strong>.
            </li>
            <li>Serves user-profile content.</li>
            <li>
              <strong>Micronaut</strong>: a JVM-based microservice framework
              created by Grails.
            </li>
            <li>
              I have implmented this service in <strong>Java 17</strong>.
            </li>
            <li>
              Persistance layer is <strong>MariaDb</strong>: open source
              relational database (sql); a fork of MySql.
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
              <span style={{ fontWeight: "normal" }}>code on github.</span>
            </a>
          </div>
          <ul>
            <li>This serves the images hosted by the site.</li>
            <li>
              <strong>Micronaut</strong>: a JVM-based microservice framework
              created by Grails.
            </li>
            <li>
              I have implmented this service in <strong>Java 17</strong>.
            </li>
            <li>
              Persistance layer is <strong>MariaDb</strong>: open source
              relational database (sql); a fork of MySql.
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
          programmable, application-aware network using <strong>Envoy</strong>{" "}
          service proxies.
        </li>
        <li className="list-about-item">
          <strong>Docker</strong> containers: open source operating system
          virtualization and hub provider.
        </li>
        <li className="list-about-item">
          Hosting: various old, busted computers at my house.
        </li>
      </ul>
    </div>
  );
};

export default About;
