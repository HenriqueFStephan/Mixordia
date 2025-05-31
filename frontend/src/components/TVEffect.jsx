import { useEffect } from "react";
import "../styles/TVEffect.scss";
import "../styles/Buttom.css"

const TVEffect = ({setShowForm, setShowImages}) => {

  useEffect(() => {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    class ScreenEffect {
      constructor(parent, options) {
        this.parent = typeof parent === "string" ? document.querySelector(parent) : parent;
        this.config = { ...options };
        this.effects = {};
        window.addEventListener("resize", this.onResize.bind(this));
        this.render();
      }

      render() {
        const container = document.createElement("div");
        container.classList.add("screen-container");

        const wrapper1 = document.createElement("div");
        wrapper1.classList.add("screen-wrapper");

        const wrapper2 = document.createElement("div");
        wrapper2.classList.add("screen-wrapper");

        const wrapper3 = document.createElement("div");
        wrapper3.classList.add("screen-wrapper");

        wrapper1.appendChild(wrapper2);
        wrapper2.appendChild(wrapper3);
        container.appendChild(wrapper1);

        this.parent.parentNode.insertBefore(container, this.parent);
        wrapper3.appendChild(this.parent);

        this.nodes = { container, wrapper1, wrapper2, wrapper3 };
        this.onResize();
      }

      onResize() {
        this.rect = this.parent.getBoundingClientRect();
        if (this.effects.vcr?.enabled) this.generateVCRNoise();
      }

      add(type, options) {
        const config = { fps: 30, blur: 1, ...options };
        const wrapper = this.nodes.wrapper2;
        let node = null;

        switch (type) {
          case "snow":
            node = document.createElement("canvas");
            const ctx = node.getContext("2d");
            node.classList.add("snow");
            node.width = this.rect.width / 2;
            node.height = this.rect.height / 2;
            wrapper.appendChild(node);

            const animateSnow = () => {
              this.generateSnow(ctx);
              this.snowframe = requestAnimationFrame(animateSnow);
            };
            animateSnow();
            break;

          case "vcr":
            node = document.createElement("canvas");
            node.classList.add("vcr");
            wrapper.appendChild(node);
            node.width = this.rect.width;
            node.height = this.rect.height;
            this.effects[type] = {
              node,
              ctx: node.getContext("2d"),
              config,
              enabled: true,
              wrapper,
            };
            this.generateVCRNoise();
            return;

          case "scanlines":
          case "wobbley":
          case "wobblex":
            wrapper.classList.add(type);
            break;

          case "vignette":
            node = document.createElement("div");
            node.classList.add("vignette");
            this.nodes.container.appendChild(node);
            break;

          case "image":
            node = document.createElement("img");
            node.classList.add("image");
            node.src = config.src;
            this.parent.appendChild(node);
            break;

          default:
            return;
        }

        if (node) wrapper.appendChild(node);

        this.effects[type] = {
          node,
          wrapper,
          config,
          enabled: true,
        };
      }

      generateSnow(ctx) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const d = ctx.createImageData(w, h);
        const b = new Uint32Array(d.data.buffer);
        for (let i = 0; i < b.length; i++) {
          b[i] = ((255 * Math.random()) | 0) << 24;
        }
        ctx.putImageData(d, 0, 0);
      }

      generateVCRNoise() {

        const draw = () => {
          this.renderTrackingNoise();
          this.vcrInterval = requestAnimationFrame(draw);
        };

        cancelAnimationFrame(this.vcrInterval);
        draw();
      }

      renderTrackingNoise(radius = 2, xmax, ymax) {
        const { node: canvas, ctx, config } = this.effects.vcr;
        xmax = xmax ?? canvas.width;
        ymax = ymax ?? canvas.height;

        canvas.style.filter = `blur(${config.blur}px)`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";

        const num = config.num || 20;
        let posy1 = config.miny || 0;
        let posy3 = config.miny2 || 0;

        ctx.beginPath();
        for (let i = 0; i <= num; i++) {
          const x = Math.random() * xmax;
          const y1 = getRandomInt((posy1 += 3), ymax);
          const y2 = getRandomInt(0, (posy3 -= 3));
          ctx.fillRect(x, y1, radius, radius);
          ctx.fillRect(x, y2, radius, radius);
          this.renderTail(ctx, x, y1, radius);
          this.renderTail(ctx, x, y2, radius);
        }
        ctx.closePath();
      }

      renderTail(ctx, x, y, radius) {
        const n = getRandomInt(1, 50);
        const dirs = [1, -1];
        let rd = radius;
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        for (let i = 0; i < n; i++) {
          const step = 0.01;
          const r = getRandomInt((rd -= step), radius);
          let dx = getRandomInt(1, 4) * dir;
          radius -= 0.1;
          ctx.fillRect((x += dx), y, r, r);
        }
      }
    }

    const screen = new ScreenEffect("#screen");

    // Add the desired effects manually:
    screen.add("snow", { opacity: 0.2 });
    screen.add("vcr", { fps: 60, miny: 220, miny2: 220, num: 70, blur: 1 });
    screen.add("vignette");
    screen.add("scanlines");
    screen.add("wobbley");
    screen.add("image", {
      src: "https://images.unsplash.com/photo-1505977404378-3a0e28ec6488?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      blur: 1.2,
    });

    // Clean up animation on unmount
    return () => {
      cancelAnimationFrame(screen.snowframe);
      cancelAnimationFrame(screen.vcrInterval);
    };
  }, []);

  return (
    <>
    <div className="screen-wrapper-container">
        <div id="screen">
          <div className="buttom-wrapper">
            <button
              className="main-button"
              onClick={() => {
              setShowForm(true);
              }} 
              >
              Subscribe to Our Newsletter
            </button>
            <button
              className="main-button"
              onClick={() => {
              setShowImages(true);
              }} 
              >
              Images
            </button>
          </div>
        </div>
    </div>
    </>
  )
};

export default TVEffect;
