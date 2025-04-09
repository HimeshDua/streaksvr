'use client';

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
    <section className="py-16 md:py-24 pl-0 md:pl-[80px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 px-4 sm:px-6 lg:px-8">
        {/* Text */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-center lg:text-left">
            {heading}{' '}
            <span className="text-muted-foreground">{subheading}</span>
          </h1>
          <p className="mt-2 text-base md:text-lg lg:text-xl text-muted-foreground max-w-prose mx-auto lg:mx-0 text-center lg:text-left">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
            <Button asChild>
              <a
                href={buttons.primary?.url}
                className="flex items-center whitespace-nowrap"
              >
                <span>{buttons.primary?.text}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="link">
              <a href={buttons.secondary?.url}>{buttons.secondary?.text}</a>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/3 lg:pl-10">
          <img src="/iphone.png" alt="Hero Image" />
        </div>
      </div>
    </section>
  );
};

export {HeroPage};
