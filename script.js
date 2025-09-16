import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const splitText = new SplitText(".intro p", { type: "chars" });
const bodyTag = document.querySelector("body");

// Flags para alternar dirección
let lastHorizontalDir = "left";
let lastVerticalDir = "top";

gsap.killTweensOf("*");
document.querySelectorAll(".char-wrapper, .block").forEach((el) => el.remove());
gsap.set(".intro, body", { clearProps: "all" });
gsap.set(".main", { clearProps: "all" });

splitText.chars.forEach((char) => {
  const wrapper = document.createElement("span");
  wrapper.classList.add("char-wrapper");

  const block = document.createElement("div");
  block.classList.add("block");

  const isHorizontal = Math.random() > 0.5;
  const rect = char.getBoundingClientRect();

  if (isHorizontal) {
    block.style.width = "100vw";
    block.style.height = `${char.offsetHeight}px`;
    block.style.top = `${rect.top}px`;

    if (lastHorizontalDir === "left") {
      block.style.left = "-100vw";
      block.dataset.direction = "left";
      lastHorizontalDir = "right";
    } else {
      block.style.left = "100vw";
      block.dataset.direction = "right";
      lastHorizontalDir = "left";
    }
  } else {
    block.style.height = "100vh";
    block.style.width = `${char.offsetWidth}px`;
    block.style.left = `${rect.left}px`;

    if (lastVerticalDir === "top") {
      block.style.top = "-100vh";
      block.dataset.direction = "top";
      lastVerticalDir = "bottom";
    } else {
      block.style.top = "100vh";
      block.dataset.direction = "bottom";
      lastVerticalDir = "top";
    }
  }

  char.classList.add("char");
  char.style.opacity = 0;
  char.style.color = "black";

  char.parentNode.insertBefore(wrapper, char);
  wrapper.appendChild(char);
  document.body.appendChild(block);
});

const tl = gsap.timeline({ delay: 0.5 });

splitText.chars.forEach((char, i) => {
  const block = document.querySelectorAll(".block")[i];
  const isHorizontal = block.style.width === "100vw";
  const dir = block.dataset.direction;

  if (isHorizontal) {
    const xFrom = dir === "left" ? "-100vw" : "100vw";
    const xTo = dir === "left" ? "100vw" : "-100vw";

    // Animamos bloque y char juntos
    tl.fromTo(
      block,
      { x: xFrom },
      {
        x: xTo,
        duration: 0.1,
        ease: "back.out",
      },
      i * 0.2
    );

    tl.fromTo(
      char,
      { opacity: 1, x: xFrom, color: "black" },
      {
        x: 0, // vuelve a su posición
        duration: 0.1,
        ease: "back.out",
      },
      i * 0.2
    );

    // Cuando termina → char se vuelve blanco, block desaparece
    // tl.to(
    //   char,
    //   {
    //     color: "white",
    //     duration: 0.3,
    //   },
    //   i * 0.2 + 0.9
    // );

    tl.to(
      block,
      {
        opacity: 0,
        duration: 0.3,
      },
      i * 0.2 + 0.9
    );
  } else {
    const yFrom = dir === "top" ? "-100vh" : "100vh";
    const yTo = dir === "top" ? "100vh" : "-100vh";

    tl.fromTo(
      block,
      { y: yFrom },
      {
        y: yTo,
        duration: 0.1,
        ease: "back.out",
      },
      i * 0.2
    );

    tl.fromTo(
      char,
      { opacity: 1, y: yFrom, color: "black" },
      {
        y: 0,
        duration: 0.1,
        ease: "back.out",
      },
      i * 0.2
    );

    // tl.to(
    //   char,
    //   {
    //     color: "white",
    //     duration: 0.3,
    //   },
    //   i * 0.2 + 0.9
    // );

    tl.to(
      block,
      {
        opacity: 0,
        duration: 0.3,
      },
      i * 0.2 + 0.9
    );
  }
});

tl.to(
  [".intro", bodyTag],
  {
    backgroundColor: "white",
    duration: 2,
  },
  "<"
);

tl.to(
  splitText.chars,
  {
    color: "black",
    duration: 1,
  },
  "<"
);

tl.to(".intro", {
  scale: 0.8,
  ease: "back.out",
  duration: 2,
});

tl.to(".intro", {
  scale: 200,
  ease: "power1",
  x: 1600,
  duration: 1,
  opacity: 0,
  display: "none",
});

tl.from(".canva-main", {
  opacity: 0,
});
