import Link from "next/link";
import {
  CalendarDaysIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowRightIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in gap-12 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 max-w-4xl px-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-xl" />
          <h1 className="relative font-extrabold text-5xl md:text-7xl tracking-tight text-stone-800 dark:text-stone-100">
            NHL Stats{" "}
            <span className="text-blue-600 dark:text-blue-400">Next</span>
          </h1>
        </div>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Your modern hub for real-time hockey scores, comprehensive standings,
          player leaderboards, and playoff brackets.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/schedule"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
          >
            View Schedule <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <Link
            href="/standings"
            className="px-8 py-3 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold hover:bg-stone-300 dark:hover:bg-stone-700 transition-all"
          >
            Check Standings
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-6">
        <FeatureCard
          href="/schedule"
          title="Schedule"
          description="Live scores, upcoming matchups, and game results."
          icon={
            <CalendarDaysIcon className="w-8 h-8 text-green-700 dark:text-green-500" />
          }
          delay="0s"
        />
        <FeatureCard
          href="/standings"
          title="Standings"
          description="Division, conference, and league-wide team rankings."
          icon={
            <ChartBarIcon className="w-8 h-8 text-orange-500 dark:text-orange-500" />
          }
          delay="0.1s"
        />
        <FeatureCard
          href="/leaderboard"
          title="Leaderboard"
          description="Top skaters and goalies stats for the current season."
          icon={
            <GlobeEuropeAfricaIcon className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          }
          delay="0.2s"
        />
        <FeatureCard
          href="/playoffs"
          title="Playoffs"
          description="Interactive bracket view for the post-season."
          icon={
            <TrophyIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
          }
          delay="0.3s"
        />
      </section>
    </div>
  );
}

type FeatureCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  delay?: string;
};

function FeatureCard({
  href,
  title,
  description,
  icon,
  delay,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      style={{ animationDelay: delay }}
      className={`group relative flex flex-col p-6 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-drop-down`}
    >
      <div className="mb-4 p-3 rounded-xl bg-stone-100 dark:bg-stone-900/50 w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
        {description}
      </p>
      <div className="mt-auto pt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore <ArrowRightIcon className="w-4 h-4 ml-1" />
      </div>
    </Link>
  );
}
