// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Tour dates: move anything before today into "Earlier this year".
(function () {
  const today = new Date().toISOString().slice(0, 10);
  const pastList = document.getElementById("past");
  const pastWrap = document.getElementById("past-wrap");
  document.querySelectorAll("#upcoming .date").forEach((row) => {
    if (row.dataset.date >= today) return;
    const li = document.createElement("li");
    const when = document.createElement("b");
    when.textContent = row.querySelector(".date__day").textContent + " " + row.querySelector(".date__month").textContent.split(" ")[0];
    const what = document.createElement("span");
    what.textContent = row.querySelector("h3").textContent;
    li.append(when, what);
    pastList.append(li);
    row.remove();
  });
  if (pastList.children.length) pastWrap.hidden = false;
})();

// Photo gallery: "see all" button and a simple lightbox.
(function () {
  const grid = document.getElementById("photo-grid");
  if (!grid) return;
  const more = document.getElementById("show-all-photos");
  if (more) more.addEventListener("click", () => { grid.classList.add("show-all"); more.parentElement.remove(); });

  const buttons = [...grid.querySelectorAll("button")];
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const count = document.getElementById("lightbox-count");
  let current = -1, opener = null;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    const b = buttons[current];
    img.src = b.dataset.full;
    img.alt = b.querySelector("img").alt;
    count.textContent = (current + 1) + " / " + buttons.length;
  }
  function open(i) { opener = buttons[i]; show(i); box.hidden = false; box.querySelector(".lightbox__close").focus(); }
  function close() { box.hidden = true; current = -1; if (opener) opener.focus(); }

  buttons.forEach((b, i) => b.addEventListener("click", () => open(i)));
  box.addEventListener("click", (e) => { if (e.target === box || e.target === img) close(); });
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });
})();
