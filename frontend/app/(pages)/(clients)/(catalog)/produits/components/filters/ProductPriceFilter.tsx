"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type ProductPriceFilterProps = {
  minPrice: number | null;
  maxPrice: number | null;
  onChange: (payload: {
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
  minBound?: number;
  maxBound?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function normalizeRange(values: number[], minBound: number, maxBound: number) {
  const start = values[0] ?? minBound;
  const end = values[1] ?? maxBound;

  const safeStart = clamp(start, minBound, maxBound);
  const safeEnd = clamp(end, minBound, maxBound);

  return [Math.min(safeStart, safeEnd), Math.max(safeStart, safeEnd)] as const;
}

type PriceBoundInputProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onBlur: () => void;
};

function PriceBoundInput({
  id,
  label,
  value,
  min,
  max,
  onChange,
  onBlur,
}: PriceBoundInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="block text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="mt-1 flex h-9 items-center rounded-md border bg-background px-2">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            if (Number.isNaN(nextValue)) {
              return;
            }

            onChange(nextValue);
          }}
          onBlur={onBlur}
          className="h-full border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
        />

        <span className="ml-2 text-xs text-foreground/80">DZ</span>
      </div>
    </div>
  );
}

export default function ProductPriceFilter({
  minPrice,
  maxPrice,
  onChange,
  minBound = 0,
  maxBound = 3000,
}: ProductPriceFilterProps) {
  const [range, setRange] = useState<[number, number]>([
    minPrice ?? minBound,
    maxPrice ?? maxBound,
  ]);

  useEffect(() => {
    setRange([minPrice ?? minBound, maxPrice ?? maxBound]);
  }, [minPrice, maxPrice, minBound, maxBound]);

  const commitRange = (values: number[]) => {
    const [normalizedMin, normalizedMax] = normalizeRange(
      values,
      minBound,
      maxBound,
    );

    setRange([normalizedMin, normalizedMax]);

    onChange({
      minPrice: normalizedMin === minBound ? null : normalizedMin,
      maxPrice: normalizedMax === maxBound ? null : normalizedMax,
    });
  };

  const priceInputConfigs = [
    {
      id: "product-filter-min-price",
      label: "Min price",
      value: range[0],
      onChange: (nextValue: number) => {
        const nextMin = clamp(nextValue, minBound, range[1]);
        setRange([nextMin, range[1]]);
      },
    },
    {
      id: "product-filter-max-price",
      label: "Max price",
      value: range[1],
      onChange: (nextValue: number) => {
        const nextMax = clamp(nextValue, range[0], maxBound);
        setRange([range[0], nextMax]);
      },
    },
  ] as const;

  return (
    <section className="mt-6 border-t pt-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Price
      </h2>

      <div className="mt-5">
        <Slider
          min={minBound}
          max={maxBound}
          step={1}
          value={range}
          className="h-5 **:data-[slot=slider-track]:h-1 **:data-[slot=slider-track]:bg-primary/25 **:data-[slot=slider-range]:bg-primary **:data-[slot=slider-thumb]:size-4 **:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-thumb]:bg-background **:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:ring-0 **:data-[slot=slider-thumb]:hover:ring-0 **:data-[slot=slider-thumb]:focus-visible:ring-0"
          onValueChange={(values) => {
            const [nextMin, nextMax] = normalizeRange(
              values,
              minBound,
              maxBound,
            );
            setRange([nextMin, nextMax]);
          }}
          onValueCommit={commitRange}
          aria-label="Filtre par prix"
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {priceInputConfigs.map((item) => (
            <PriceBoundInput
              key={item.id}
              id={item.id}
              label={item.label}
              value={item.value}
              min={minBound}
              max={maxBound}
              onChange={item.onChange}
              onBlur={() => commitRange(range)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
