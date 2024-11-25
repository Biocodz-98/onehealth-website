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
        <div className="space-y-2 relative">
            <select
                {...props}
                id={id}
                disabled={disabled}
                required={required}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background appearance-none px-3 py-2  pr-12 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    props.className
                )}
            >
                {children}

            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

                <svg xmlns="http://www.w3.org/2000/svg"
                     className="w-4 h-4 text-gray-400"
                     viewBox="0 0 448 512"
                     fill="currentColor"
                >
                    <path
                        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>

            </div>
        </div>
    );
};

export default SelectInput;
