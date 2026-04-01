// REVEAL AO SCROLL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("active");
    }
  });
});

// CONTADOR
const counters = document.querySelectorAll(".number");

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const inc = target / 50;

    if (current < target) {
      counter.innerText = Math.ceil(current + inc);
      setTimeout(update, 30);
    } else {
      counter.innerText = target + "+";
    }
  };
  update();
});