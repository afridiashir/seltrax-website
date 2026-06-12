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
        <section id={id} className={cn("relative border-t border-border", className)}>
            <div
                className={cn(
                    "container relative mx-auto max-w-6xl border-x border-border px-5 py-20 md:px-12 md:py-28",
                    innerClassName
                )}
            >
                <PlusMark className="left-0 top-0" />
                <PlusMark className="right-0 top-0 translate-x-1/2" />

                {(label || title) && (
                    <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                        {label && (
                            <p className="eyebrow mb-4 text-primary">[ {label} ]</p>
                        )}
                        {title && (
                            <h2 className="font-heading max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
                                {title}
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
