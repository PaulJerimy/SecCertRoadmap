export const showToast = (title: string, message: string, href: string): void => {
  let overlay = document.querySelector(".overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");

  const heading = document.createElement("h3");
  heading.textContent = title;
  toast.appendChild(heading);

  const text = document.createElement("p");
  text.textContent = message;
  toast.appendChild(text);

  const link = document.createElement("a");
  link.href = href;
  link.textContent = href;
  toast.appendChild(link);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-btn");
  closeButton.innerHTML = "&times;"; // '×' symbol
  toast.appendChild(closeButton);

  document.body.appendChild(toast);

  setTimeout(() => {
    overlay.classList.add("show");
    toast.classList.add("show");
  }, 100);

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bubbling to the body
    closeToast(toast, overlay);
  });

  overlay.addEventListener(
    "click",
    () => {
      closeToast(toast, overlay);
    },
    { once: true }
  );
};

export const closeToast = (toast: HTMLDivElement, overlay: Element): void => {
  toast.classList.remove("show");
  overlay.classList.remove("show");

  setTimeout(() => {
    document.body.removeChild(toast);
    document.body.removeChild(overlay);
  }, 400);
};
