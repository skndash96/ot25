// starfield-classes.ts

export const params = {
  maxDistFromCursor: 50,
  dotsSpeed: 0.5,
  backgroundSpeed: 0.5,
};

// Helper function to convert degrees to radians
export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

// These types are added to improve type safety
export type DotState = {
  dots: (Dot | null)[];
  mouseX: number;
  mouseY: number;
  WIDTH: number;
  HEIGHT: number;
};

export class Star {
  id: number;
  x: number;
  y: number;
  r: number;
  color: string;
  private ctx: CanvasRenderingContext2D;
  private HEIGHT: number;

  constructor(id: number, x: number, y: number, ctx: CanvasRenderingContext2D, HEIGHT: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = `rgba(255,255,255,${alpha})`;
    this.ctx = ctx;
    this.HEIGHT = HEIGHT;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = this.r * 2;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  move() {
    this.y -= 0.15 + params.backgroundSpeed / 100;
    if (this.y <= -10) this.y = this.HEIGHT + 10;
    this.draw();
  }
}

export class Dot {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
  a: number;
  aReduction: number;
  color: string;
  linkColor: string;
  dir: number;
  private ctx: CanvasRenderingContext2D;
  private dotState: DotState;

  constructor(id: number, x: number, y: number, ctx: CanvasRenderingContext2D, dotState: DotState) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 5) + 1;
    this.speed = 0.5;
    this.a = 0.5;
    this.aReduction = 0.005;
    this.color = `rgba(255,255,255,${this.a})`;
    this.linkColor = `rgba(255,255,255,${this.a / 4})`;
    this.dir = Math.floor(Math.random() * 140) + 200;
    this.ctx = ctx;
    this.dotState = dotState;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = this.r * 2;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  link() {
    if (this.id === 0) return;
    const previousDot1 = this.getPreviousDot(1);
    const previousDot2 = this.getPreviousDot(2);
    const previousDot3 = this.getPreviousDot(3);
    if (!previousDot1) return;
    this.ctx.strokeStyle = this.linkColor;
    this.ctx.beginPath();
    this.ctx.moveTo(previousDot1.x, previousDot1.y);
    this.ctx.lineTo(this.x, this.y);
    if (previousDot2) this.ctx.lineTo(previousDot2.x, previousDot2.y);
    if (previousDot3) this.ctx.lineTo(previousDot3.x, previousDot3.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  move() {
    this.a -= this.aReduction;
    if (this.a <= 0) {
      this.die();
      return;
    }
    this.color = `rgba(255,255,255,${this.a})`;
    this.linkColor = `rgba(255,255,255,${this.a / 4})`;
    this.x += Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);
    this.y += Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);
    this.draw();
    this.link();
  }

  die() {
    this.dotState.dots[this.id] = null;
    delete this.dotState.dots[this.id];
  }

  private getPreviousDot(stepback: number): Dot | false {
    if (this.id === 0 || this.id - stepback < 0) return false;
    return this.dotState.dots[this.id - stepback] ?? false;
  }
}