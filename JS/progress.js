document.addEventListener("DOMContentLoaded", () => {
  const progresses = document.querySelectorAll(".progress");
  progresses.forEach(bar => {
    const target = bar.getAttribute("data-progress");
    bar.style.width = target + "%";
  });
});