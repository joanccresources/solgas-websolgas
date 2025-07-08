import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
type SliderProps = React.ComponentProps<typeof Slider>;

export default function SliderCustom({
  className,
  onChange,
  value,
  max = 100,
  min = 0,
  step = 1,
}: SliderProps) {
  return (
    <Slider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      defaultValue={[value]}
      max={max}
      min={min}
      step={step}
      className={cn(className)}
      onChange={onChange}
    />
  );
}
