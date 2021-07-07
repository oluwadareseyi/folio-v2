import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Home from "./pages/home";
const toContactButtons = document.querySelectorAll(".contact-scroll");
const footer = document.getElementById("js-footer");
import each from "lodash/each";

gsap.registerPlugin(ScrollTrigger);

const scrollEl = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollEl,
  smooth: true,
  lerp: 0.06,
  tablet: {
    breakpoint: 768,
  },
});

setTimeout(() => {
  scroll.update();
}, 1000);

let device = "tablet";

window.addEventListener("resize", () => {
  const width = window.innerWidth;

  if (width <= 768 && device !== "laptop") {
    scroll.destroy();
    scroll.init();
    device = "laptop";
  }

  if (width > 768 && device === "laptop") {
    scroll.destroy();
    scroll.init();
    device = "tablet";
  }
});

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
  constructor(scroll) {
    this.locomotive = scroll;
    this.heroTextAnimation();
    this.homeAnimations();
    this.homeActions();
  }

  homeActions() {
    each(toContactButtons, (button) => {
      button.onclick = () => {
        this.locomotive.scrollTo(footer);
      };
    });
  }

  homeAnimations() {}

  heroTextAnimation() {
    gsap.to(".hero__title__dash.desktop", {
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

new Home(scroll);
