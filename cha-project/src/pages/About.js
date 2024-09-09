import React, { useRef } from 'react';
import styles from '../styles/About.module.css';
import { IoIosArrowDropdown } from "react-icons/io";
import { PiCertificateFill } from "react-icons/pi";
import { PiShirtFoldedFill  } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const About = () => {
    const scrollToRef = useRef(null);

    // Custom smooth scrolling
    const smoothScrollTo = (target, duration) => {
        const start = window.scrollY;   // Find your current vertical scroll position
        const targetPosition = target.current.getBoundingClientRect().top + window.scrollY;  //Find your target's vertical position
        const distance = targetPosition - start;    // Calculate scroll distance required
        const startTime = performance.now();    // Time when the scrolling animation starts. Used to calculate elapsed time

        const scroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, start + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(scroll);
            }
        };

        // Smooth transition
        const easeInOutQuad = (t) => {
            return t < 0.5
                ? 2 * t * t
                : -1 + (4 - 2 * t) * t;
        };

        requestAnimationFrame(scroll);
    };

    const handleScroll = () => {
        if (scrollToRef.current) {
            smoothScrollTo(scrollToRef, 1000); // Adjust duration (in milliseconds) as needed
        }
    };

    return (
        <main>
            <div className={styles.titleContainer}>
                <div className={styles.titleText}>THE STORY OF</div>
                <div className={styles.brandText}>BrandTailors Co.</div>
                <div className={styles.scrollSection} onMouseEnter={handleScroll} onClick={handleScroll}>
                    <div className={styles.scrollText}>About Us</div>
                    <IoIosArrowDropdown className={styles.downArrowIcon} />
                </div>
            </div>
            <div className={styles.beliefContainer} ref={scrollToRef}>
                <p>True professionalism is rooted in enduring values, and
                    custom-tailored uniforms is the very embodiment of this
                    ethos. By merging classic elegance with modern
                    craftsmanship, we empower teams to project a
                    unified, distinguished image while embracing the core
                    principles of professionalism and sophistication.
                </p>
            </div>
            <div className={styles.visionMissionContainer}>
                <p className={styles.visionMissionHeader}>Our Vision & Mission</p>
                <p className={styles.visionMissionContent}>
                    At BrandTailors, our vision is to set a new standard in
                    uniform customization, making high-quality, tailored uniforms
                    effortlessly accessible to businesses. Our mission is to streamline
                    and simplify the uniform process, allowing companies to focus on their
                    core operations while we handle all aspects of custom tailoring.
                    Through exceptional service and precision, we aim to enhance our
                    clients' professional image and ease their workload.
                </p>
            </div>
            <div className={styles.founderContainer}>
                <p className={styles.founderHeader}>Our Founder</p>
                <img src={require("../assets/ceoImg.webp")} />
                <p className={styles.founderName}>John Doe</p>
                <p className={styles.founderContent}>
                    "One day, I realized how crucial the right uniform is in creating a professional
                    image and boosting team morale. Driven by a passion for quality and a keen eye
                    for detail, I decided to open this business to provide companies with uniforms
                    that blend style, comfort, and functionality. Our goal is to help businesses make
                    a lasting impression while ensuring their teams look and feel their best."
                </p>
            </div>
            <div className={styles.valuesContainer}>
                <div>
                    <PiCertificateFill className={styles.valuesIcon}/>
                    <p className={styles.valuesTitle}>Quality</p>
                    <p className={styles.valuesDescription}>Top-notch materials and craftsmanship in every uniform.</p>
                </div>
                <div>
                    <PiShirtFoldedFill className={styles.valuesIcon}/>
                    <p className={styles.valuesTitle}>Comfort</p>
                    <p className={styles.valuesDescription}>Designed for a perfect fit and all-day comfort at work.</p>
                </div>
                <div>
                    <RiMoneyDollarCircleFill className={styles.valuesIcon}/>
                    <p className={styles.valuesTitle}>Affordability</p>
                    <p className={styles.valuesDescription}>High-quality uniforms at the prices that work for you.</p>
                </div>
            </div>
            <div className={styles.conclusionContainer}>
                <p>
                    At the heart of our mission is the belief that every uniform should enhance your
                    professional experience. By staying true to our core values, we help you put your
                    best foot forward every day.
                </p>
            </div>
        </main>
    );
};
