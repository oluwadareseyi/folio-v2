import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Home from "./pages/home";

gsap.registerPlugin(ScrollTrigger);

const scrollEl = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollEl,
  smooth: true,
});

setTimeout(() => {
  scroll.update();
}, 1000);

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scroll.el, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

export default class Home {
  constructor() {
    this.heroTextAnimation();
  }

  homeIntroAnimation() {}

  heroTextAnimation() {
    gsap.to(".hero__title__dash", {
      scrollTrigger: {
        trigger: ".hero__title",
        scroller: "[data-scroll-container]",
        scrub: true,
        start: "-8% 9%",
        end: "110% 20%",
      },
      scaleX: 4,
      ease: "none",
    });
  }
}

new Home();
