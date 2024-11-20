import React, { SelectHTMLAttributes } from "react";
import {cn} from "@/lib/utils.ts";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    disabled?: boolean;
    required?: boolean;
    errors?: string;
    children: React.ReactNode;
}

const SelectInput: React.FC<SelectInputProps> = ({
     children,
     id,
     disabled = false,
     required = false,
     ...props
 }) => {
    return (
        <div className="space-y-2">
            <select
                {...props}
                id={id}
                disabled={disabled}
                required={required}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    props.className
                )}
            >
                {children}
            </select>
        </div>
    );
};

export default SelectInput;
