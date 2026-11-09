import type { Lang } from '../content/types';

export interface QuoteContent {
  ar?: string;
  text: string;
  ref: string;
  lang: Lang;
}
export type CardFormat = 'story' | 'square';
export type CardTheme = 'day' | 'night';

const PALETTE = {
  day: { bg1: '#fdf3e2', bg2: '#f1dcbc', card: '#fffaf2', ink: '#3d2e26', soft: '#6e5a4c', gold: '#8a5f17', accent: '#c9973f', line: '#e6cfa8' },
  night: { bg1: '#1b2a52', bg2: '#0c1426', card: '#16213b', ink: '#f4eadb', soft: '#c5b9a8', gold: '#e5bc6a', accent: '#e5bc6a', line: '#33436b' },
};

const F_AR = '"Amiri Quran", "Amiri", serif';
const F_UR = '"Noto Nastaliq Urdu", serif';
const F_EN = '"Fraunces", Georgia, serif';
const F_UI = '"Nunito", system-ui, sans-serif';

async function ensureFonts(c: QuoteContent) {
  const loads = [
    document.fonts.load(`500 40px ${F_EN}`),
    document.fonts.load(`600 40px ${F_EN}`),
    document.fonts.load(`700 30px ${F_UI}`),
    document.fonts.load(`40px ${F_UR}`, 'درِ نجات'),
  ];
  if (c.ar) loads.push(document.fonts.load(`48px ${F_AR}`, c.ar));
  if (c.lang === 'ur') loads.push(document.fonts.load(`40px ${F_UR}`, c.text));
  await Promise.allSettled(loads);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  for (const rot of [0, Math.PI / 4]) {
    ctx.save();
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.rect(-r, -r, 2 * r, 2 * r);
    ctx.restore();
    ctx.stroke();
  }
  ctx.restore();
}

function filledStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  for (const rot of [0, Math.PI / 4]) {
    ctx.save();
    ctx.rotate(rot);
    ctx.fillRect(-r, -r, 2 * r, 2 * r);
    ctx.restore();
  }
  ctx.restore();
}

interface Block {
  lines: string[];
  font: string;
  lh: number;
  color: string;
  rtl: boolean;
}

/** Draw the card and return it as a PNG blob. */
export async function renderCard(c: QuoteContent, format: CardFormat, theme: CardTheme): Promise<Blob> {
  await ensureFonts(c);
  const W = 1080;
  const H = format === 'story' ? 1920 : 1080;
  const P = PALETTE[theme];
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background + star pattern
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, P.bg1);
  g.addColorStop(1, P.bg2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = P.accent;
  ctx.globalAlpha = theme === 'day' ? 0.12 : 0.08;
  ctx.lineWidth = 2;
  for (let y = 60; y < H; y += 140) for (let x = (y / 140) % 2 ? 130 : 60; x < W; x += 140) star(ctx, x, y, 22);
  ctx.globalAlpha = 1;

  // Arch card
  const margin = format === 'story' ? 90 : 70;
  const x = margin;
  const y = format === 'story' ? 210 : 70;
  const w = W - 2 * margin;
  const h = H - y - (format === 'story' ? 210 : 70);
  const ah = Math.min(w / 2, format === 'story' ? 300 : 200);
  const cx = W / 2;
  const archPath = (inset: number) => {
    const p = new Path2D();
    const r = 36 - inset / 2;
    p.moveTo(x + inset, y + ah);
    p.ellipse(cx, y + ah, w / 2 - inset, ah - inset, 0, Math.PI, 0);
    p.lineTo(x + w - inset, y + h - inset - r);
    p.quadraticCurveTo(x + w - inset, y + h - inset, x + w - inset - r, y + h - inset);
    p.lineTo(x + inset + r, y + h - inset);
    p.quadraticCurveTo(x + inset, y + h - inset, x + inset, y + h - inset - r);
    p.closePath();
    return p;
  };
  ctx.save();
  ctx.shadowColor = 'rgba(60, 35, 10, 0.18)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = P.card;
  ctx.fill(archPath(0));
  ctx.restore();
  ctx.strokeStyle = P.line;
  ctx.lineWidth = 3;
  ctx.stroke(archPath(0));
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = P.accent;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 2;
  ctx.stroke(archPath(22));
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Crown star
  ctx.fillStyle = P.accent;
  filledStar(ctx, cx, y + 70, 20);
  ctx.fillStyle = P.card;
  ctx.beginPath();
  ctx.arc(cx, y + 70, 8, 0, Math.PI * 2);
  ctx.fill();

  // Footer
  const footY = y + h - 70;
  ctx.textAlign = 'center';
  ctx.direction = 'ltr';
  ctx.fillStyle = P.gold;
  ctx.font = `600 34px ${F_EN}`;
  ctx.fillText('Dar-e-Nijaat', cx - 2, footY - 8);
  ctx.font = `24px ${F_UR}`;
  ctx.direction = 'rtl';
  ctx.fillStyle = P.soft;
  ctx.fillText('درِ نجات · لوٹنے کا دروازہ', cx, footY + 34);
  ctx.direction = 'ltr';

  // Content, auto-fitted between the arch crown and the footer
  const top = y + Math.max(140, ah * 0.55);
  const bottom = footY - 90;
  const maxW = w - 150;
  // Start a little large and shrink to fit, so short ayahs fill the card nicely.
  let scale = format === 'story' ? 1.35 : 1.12;
  let blocks: Block[] = [];
  let total = 0;
  const gap = 46;
  for (let i = 0; i < 30; i++) {
    blocks = [];
    if (c.ar) {
      const size = Math.round((format === 'story' ? 62 : 52) * scale);
      ctx.font = `${size}px ${F_AR}`;
      ctx.direction = 'rtl';
      blocks.push({ lines: wrap(ctx, c.ar, maxW), font: ctx.font, lh: size * 1.95, color: P.ink, rtl: true });
    }
    const tSize = Math.round((c.lang === 'ur' ? (format === 'story' ? 38 : 32) : format === 'story' ? 42 : 36) * scale);
    ctx.font = c.lang === 'ur' ? `${tSize}px ${F_UR}` : `500 ${tSize}px ${F_EN}`;
    ctx.direction = c.lang === 'ur' ? 'rtl' : 'ltr';
    blocks.push({ lines: wrap(ctx, c.text, maxW), font: ctx.font, lh: tSize * (c.lang === 'ur' ? 2.1 : 1.45), color: P.soft, rtl: c.lang === 'ur' });
    const rSize = Math.max(22, Math.round(30 * Math.sqrt(scale)));
    ctx.font = c.lang === 'ur' ? `${rSize}px ${F_UR}` : `700 ${rSize}px ${F_UI}`;
    blocks.push({ lines: [c.ref], font: ctx.font, lh: rSize * (c.lang === 'ur' ? 2 : 1.5), color: P.gold, rtl: c.lang === 'ur' });
    total = blocks.reduce((s, b) => s + b.lines.length * b.lh, 0) + gap * (blocks.length - 1);
    if (total <= bottom - top) break;
    scale *= 0.93;
  }

  let cy = top + (bottom - top - total) / 2;
  blocks.forEach((b, i) => {
    ctx.font = b.font;
    ctx.fillStyle = b.color;
    ctx.direction = b.rtl ? 'rtl' : 'ltr';
    ctx.textBaseline = 'middle';
    for (const line of b.lines) {
      ctx.fillText(line, cx, cy + b.lh / 2);
      cy += b.lh;
    }
    if (i < blocks.length - 1) {
      // small divider after the Arabic
      if (i === 0 && c.ar) {
        ctx.fillStyle = P.accent;
        ctx.globalAlpha = 0.7;
        filledStar(ctx, cx, cy + gap / 2, 7);
        ctx.globalAlpha = 1;
      }
      cy += gap;
    }
  });

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'));
}
