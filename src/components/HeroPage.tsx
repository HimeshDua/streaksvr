import {ArrowUpRight} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface HeroPageProps {
  heading?: string;
  subheading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const HeroPage = ({
  heading = 'Unleash Your Potential with Streaksvr',
  subheading = 'Built for Growth and Productivity',
  description = 'Track your progress, build habits, and stay motivated with Streaksvr. Achieve your goals, one streak at a time.',
  buttons = {
    primary: {
      text: 'Start Your Journey',
      url: '/signup'
    },
    secondary: {
      text: 'Explore Features',
      url: '/home'
    }
  }
}: HeroPageProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row lg:items-start lg:justify-between">
        {' '}
        {/* Use justify-between */}
        <div className="flex flex-col gap-7">
          {' '}
          {/* Removed lg:w-2/3 and lg:max-w-xl */}
          <h2
            className="font-semibold text-balance text-foreground text-center lg:text-left"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.2
            }}
          >
            <span>{heading}</span>{' '}
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
          <p className="text-base px-4 sm:px-12 lg:px-0 lg:mx-0 text-center lg:text-start max-w-[70ch] mx-auto text-muted-foreground md:text-lg lg:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 lg:gap-7 max-w-[70ch] mx-auto lg:mx-0">
            <Button asChild>
              <a href={buttons.primary?.url}>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="size-4" />
                </div>
                <span className="pr-6 pl-4 text-sm whitespace-nowrap lg:pr-8 lg:pl-6 lg:text-base">
                  {buttons.primary?.text}
                </span>
              </a>
            </Button>
            <Button asChild variant="link" className="underline">
              <a href={buttons.secondary?.url}>{buttons.secondary?.text}</a>
            </Button>
          </div>
        </div>
        {/* Optional: Add an image or visual element here for better balance */}
        <div className="lg:w-1/2 lg:pl-10">
          <img
            src="/iphone.png"
            alt="Hero Image"
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export {HeroPage};
