import { cn } from "@/lib/utils";

/* "+" marker rendered at border intersections, blueprint style */
export function PlusMark({ className }: { className?: string }) {
    return (
        <span
            aria-hidden
            className={cn(
                "pointer-events-none absolute z-10 h-[17px] w-[17px] -translate-x-1/2 -translate-y-1/2",
                className
            )}
        >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted-foreground/50" />
            <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-muted-foreground/50" />
        </span>
    );
}

interface SectionProps {
    id?: string;
    label?: string;
    title?: React.ReactNode;
    description?: string;
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
}

/**
 * Blueprint section: hairline top border, bordered inner column with
 * "+" markers at the corners, mono eyebrow label and centered heading.
 */
export function Section({
    id,
    label,
    title,
    description,
    children,
    className,
    innerClassName,
}: SectionProps) {
    return (
        <section id={id} className={cn("relative ", className)}>
            <div
                className={cn(
                    "container relative mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28",
                    innerClassName
                )}
            >

                {(label || title) && (
                    <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                        
                        {title && (
                            <h2 className=" max-w-2xl text-3xl text-[#686868] leading-tight md:text-5xl">
                                {title}<br className="block"></br>
                                <span className="text-black">{label}</span>
                            </h2>
                        )}
                        {description && (
                            <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {children}
            </div>
        </section>
    );
}
