import { cn } from '@/lib/utils';
import * as React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
    variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'lead'
    | 'muted'
    | 'small'
    | 'large';
    asChild?: boolean;
}

const Typography = React.forwardRef<
    HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement,
    TypographyProps
>(({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = variant?.startsWith('h') ? variant : variant === 'p' ? 'p' : 'span';
    const Element = asChild ? React.Fragment : Comp;

    const variantClasses = {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        p: 'leading-relaxed',
        lead: 'text-lg text-muted-foreground',
        muted: 'text-sm text-muted-foreground',
        small: 'text-xs text-muted-foreground',
        large: 'text-lg font-semibold',
    };

    return (
        <Element ref={ref} className={cn(variant && variantClasses[variant], className)} {...props}>
            {!asChild && Comp !== 'span' ? (
                props.children
            ) : (
                <Comp>{props.children}</Comp>
            )}
        </Element>
    );
});
Typography.displayName = 'Typography';

export { Typography, TypographyProps };