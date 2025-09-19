//TESTIMONIAL
// console.log(InertiaPlugin)
// gsap.registerPlugin(InertiaPlugin)

const testimonials = Array(8)
  .fill(null)
  .map((_) => ({
    content:
      "Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod. Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod. Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod. Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod. Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod. Id leo in vitae turpis. Libero nunc consequat interdum varius. Eget mauris pharetra et ultrices neque ornare aenean euismod.",
    name: "John Doe",
    role: "CEO, ABC corp"
  }));

loadContent(testimonials);

function loadContent(testimonials) {
  const buildTemplate = (template, data) => {
    for (const key in data) {
      const reg = new RegExp(`{${key}}`, "ig");
      template = template.replace(reg, data[key]);
    }
    return template;
  };
  const ChatBubble = function (data) {
    const elem = document.createElement("div");
    elem.classList.add("chat-bubble");
    elem.style.setProperty("--rotation", data.rotation + "deg");
    elem.innerHTML = buildTemplate(
      `
    <div class='chat-bubble-header'>
        <i class='fa fa-quote-left'></i>
      </div>
      <div class='content'>{content}</div>
      <div class='person'>
        <img class='img' src='https://i.pravatar.cc/150?img=68'>
        <div class='name'>{name}</div>
        <div class='role'>{role}</div>
      </div>
    `,
      data
    );
    setTimeout(() => {
      if (elem.children[2].scrollHeight > elem.children[2].clientHeight) {
        elem.classList.add("truncated");
      }
    }, 100);
    return elem;
  };

  const rotationAmt = 360 / testimonials.length;
  let focused = 0;
  const tElem = document.querySelector(".testimonial");
  const testimonialsElem = document.querySelector(".testimonials");
  const navElem = document.querySelector(".navigation");
  const dragElem = document.getElementById("dragelem");

  let paused = false;
  tElem.addEventListener("mouseenter", () => {
    paused = true;
    console.log(paused);
  });

  tElem.addEventListener("mouseleave", () => (paused = false));

  window.onblur = () => {
    paused = true;
    console.log(paused);
  };
  window.onfocus = () => {
    paused = false;
  };

  function getFocusedIndex() {
    return mod(focused, testimonials.length);
  }

  const radius = 400 / (2 * Math.sin(Math.PI / testimonials.length));
  const distToEdge = Math.round(Math.sqrt(radius ** 2 - 200 ** 2) + 30);
  testimonialsElem.style.setProperty("--distance", distToEdge + "px");

  testimonials.forEach((testimonial, i) => {
    testimonialsElem.appendChild(
      ChatBubble({
        ...testimonial,
        rotation: i * rotationAmt
      })
    );

    const navBtn = document.createElement("div");
    navBtn.classList.add("nav-dot");
    navBtn.addEventListener("click", () => {
      select(i);
    });
    navElem.appendChild(navBtn);
  });

  let xPos, dragStartPos;
  Draggable.create(tElem, {
    onDragStart: (e) => {
      if (e.touches) e.clientX = e.touches[0].clientX;
      xPos = dragStartPos = Math.round(e.clientX);
    },

    onDrag: (e) => {
      if (e.touches) e.clientX = e.touches[0].clientX;

      gsap.to(testimonialsElem, {
        rotationY: "+=" + ((Math.round(e.clientX) - xPos) % 360)
      });

      xPos = Math.round(e.clientX);
    },

    onDragEnd: () => {
      const currentRotation =
        gsap.getProperty(testimonialsElem, "rotationY") * -1;
      const index = mod(
        Math.round(currentRotation / rotationAmt),
        testimonials.length
      );
      console.log(xPos, dragStartPos);
      select(index, xPos < dragStartPos ? 1 : -1);
      gsap.set(tElem, { x: 0, y: 0 });
    }
  });

  let timeout;
  function update() {
    gsap.to(testimonialsElem, {
      rotationY: -focused * rotationAmt,
      duration: 1
    });
    const { children } = testimonialsElem;
    for (var i = 0; i < children.length; i++) {
      if (getFocusedIndex() === i) {
        children[i].classList.add("focused");
        navElem.children[i].classList.add("focused");
      } else {
        children[i].classList.remove("focused");
        navElem.children[i].classList.remove("focused");
      }
    }
    if (timeout) clearTimeout(timeout);
    const nextTimeout = (cb) => {
      timeout = setTimeout(() => {
        cb();
      }, 5000);
    };
    nextTimeout(() => {
      if (paused) {
        update();
      } else {
        focused++;
        update();
      }
    });
  }
  function mod(a, b) {
    return ((a % b) + b) % b;
  }
  function diff(a, b, c, d) {
    return d === -1 ? mod(b - a, c) : mod(a - b, c);
  }
  function select(index, dir) {
    index = mod(index, testimonials.length);
    // dir = null

    if (dir) {
      focused += diff(index, getFocusedIndex(), testimonials.length, dir) * dir;
    } else {
      focused += index - getFocusedIndex();
    }
    update();
  }
  update();

  document.querySelector(".arrow-right").addEventListener("click", () => {
    focused++;
    update();
  });

  document.querySelector(".arrow-left").addEventListener("click", () => {
    focused--;
    update();
  });
}