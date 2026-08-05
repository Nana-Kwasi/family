import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

// The line chart is drawn in a fixed coordinate space and scaled by CSS; `non-scaling-stroke`
// keeps stroke weights at their intended pixel width whatever the rendered size is.
const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 240;
const PAD_LEFT = 40;
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 26;
const GRID_LINES = 4;

export interface SeriesPoint {
  label: string;
  values: number[];
}

/**
 * Rounds the axis maximum up so every gridline lands on a whole number — an axis reading
 * 0 / 3 / 5 / 8 / 10 is harder to read off than 0 / 4 / 8 / 12.
 */
function niceMax(value: number): number {
  const rawStep = value / GRID_LINES;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep) ?? 10 * magnitude;
  return step * GRID_LINES;
}

interface LineChartProps {
  points: SeriesPoint[];
  seriesNames: [string, string];
  formatValue?: (value: number) => string;
}

/**
 * Two-series line chart on a single shared axis — both series are counts, so a second scale
 * would misrepresent their relationship.
 */
export function LineChart({ points, seriesNames, formatValue = (v) => v.toLocaleString() }: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const max = niceMax(Math.max(1, ...points.flatMap((point) => point.values)));
  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

  const x = (index: number) =>
    PAD_LEFT + (points.length <= 1 ? plotWidth / 2 : (index / (points.length - 1)) * plotWidth);
  const y = (value: number) => PAD_TOP + plotHeight - (value / max) * plotHeight;

  const path = (seriesIndex: number) =>
    points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(point.values[seriesIndex])}`).join(' ');

  const ticks = Array.from({ length: GRID_LINES + 1 }, (_, i) => (max / GRID_LINES) * i);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const ratio = (event.clientX - bounds.left) / bounds.width;
    const plotRatio = (ratio * VIEW_WIDTH - PAD_LEFT) / plotWidth;
    setHovered(Math.min(points.length - 1, Math.max(0, Math.round(plotRatio * (points.length - 1)))));
  };

  const active = hovered === null ? null : points[hovered];

  return (
    <div className="viz">
      <Legend
        items={[
          { name: seriesNames[0], color: 'var(--series-1)' },
          { name: seriesNames[1], color: 'var(--series-2)' },
        ]}
      />

      <div
        ref={containerRef}
        className="relative mt-3"
        onMouseMove={handleMove}
        onMouseLeave={() => setHovered(null)}
      >
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="h-auto w-full" role="img"
             aria-label={`${seriesNames[0]} and ${seriesNames[1]} per day`}>
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT} x2={VIEW_WIDTH - PAD_RIGHT} y1={y(tick)} y2={y(tick)}
                stroke="var(--viz-grid)" strokeWidth={1} vectorEffect="non-scaling-stroke"
              />
              <text
                x={PAD_LEFT - 8} y={y(tick) + 4} textAnchor="end"
                fill="var(--viz-muted)" fontSize={11}
              >
                {tick}
              </text>
            </g>
          ))}

          <line
            x1={PAD_LEFT} x2={VIEW_WIDTH - PAD_RIGHT} y1={y(0)} y2={y(0)}
            stroke="var(--viz-axis)" strokeWidth={1} vectorEffect="non-scaling-stroke"
          />

          {[0, 1].map((seriesIndex) => (
            <path
              key={seriesIndex}
              d={path(seriesIndex)}
              fill="none"
              stroke={seriesIndex === 0 ? 'var(--series-1)' : 'var(--series-2)'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {hovered !== null && (
            <>
              <line
                x1={x(hovered)} x2={x(hovered)} y1={PAD_TOP} y2={y(0)}
                stroke="var(--viz-axis)" strokeWidth={1} vectorEffect="non-scaling-stroke"
              />
              {[0, 1].map((seriesIndex) => (
                <circle
                  key={seriesIndex}
                  cx={x(hovered)}
                  cy={y(points[hovered].values[seriesIndex])}
                  r={5}
                  fill={seriesIndex === 0 ? 'var(--series-1)' : 'var(--series-2)'}
                  stroke="var(--color-white)"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </>
          )}

          {points.length > 1 && (
            <>
              <text x={PAD_LEFT} y={VIEW_HEIGHT - 6} fill="var(--viz-muted)" fontSize={11}>
                {points[0].label}
              </text>
              <text
                x={VIEW_WIDTH - PAD_RIGHT} y={VIEW_HEIGHT - 6} textAnchor="end"
                fill="var(--viz-muted)" fontSize={11}
              >
                {points[points.length - 1].label}
              </text>
            </>
          )}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-800"
            style={{ left: `${(x(hovered!) / VIEW_WIDTH) * 100}%` }}
          >
            <p className="mb-1 font-medium whitespace-nowrap">{active.label}</p>
            <p className="flex items-center gap-1.5 whitespace-nowrap">
              <Swatch color="var(--series-1)" />
              {seriesNames[0]}: <strong>{formatValue(active.values[0])}</strong>
            </p>
            <p className="flex items-center gap-1.5 whitespace-nowrap">
              <Swatch color="var(--series-2)" />
              {seriesNames[1]}: <strong>{formatValue(active.values[1])}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Legend({ items }: { items: { name: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <span key={item.name} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <Swatch color={item.color} />
          {item.name}
        </span>
      ))}
    </div>
  );
}

function Swatch({ color }: { color: string }) {
  return <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden />;
}

export interface BarDatum {
  label: string;
  count: number;
  /** Optional reserved status colour. Always paired with the visible label beside it. */
  color?: string;
}

/**
 * Horizontal bars for a single measure across categories. One hue by default — the bar length
 * carries the magnitude, so colour has no second job to do.
 */
export function BarList({ data, emptyLabel = 'No data yet' }: { data: BarDatum[]; emptyLabel?: string }) {
  if (data.length === 0) {
    return <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">{emptyLabel}</p>;
  }

  const max = Math.max(...data.map((datum) => datum.count), 1);

  return (
    <ul className="viz space-y-2">
      {data.map((datum) => (
        <li key={datum.label} className="grid grid-cols-[minmax(6rem,9rem)_1fr_auto] items-center gap-3">
          <span className="truncate text-sm text-slate-700 dark:text-slate-300" title={datum.label}>
            {datum.label}
          </span>
          <span className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
            <span
              className="block h-2.5 rounded-r-[4px] rounded-l-full"
              style={{
                width: `${Math.max((datum.count / max) * 100, datum.count > 0 ? 3 : 0)}%`,
                background: datum.color ?? 'var(--series-1)',
              }}
            />
          </span>
          <span className="text-sm font-medium tabular-nums">{datum.count.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}

/** A single headline number. Some measures are not a chart. */
export function StatTile({ label, value, hint }: { label: string; value: string; hint?: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

export function ChartCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('surface p-5', className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
