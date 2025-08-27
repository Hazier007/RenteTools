import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = parseFloat(e.target.value) || 0;
      onChange?.(numValue);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        value={value || ""}
        onChange={handleChange}
        className={cn("text-right", className)}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
