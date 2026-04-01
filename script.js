// CONTADOR
const numbers = document.querySelectorAll(".number");

numbers.forEach(num => {
  const update = () => {
    const target = +num.getAttribute("data-target");
    const current = +num.innerText;

    const increment = target / 40;

    if (current < target) {
      num.innerText = Math.ceil(current + increment);
      setTimeout(update, 30);
    } else {
      num.innerText = target + "+";
    }
  };
  update();
});