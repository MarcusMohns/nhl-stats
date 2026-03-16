import Link from "next/link";
import {
  CalendarDaysIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowRightIcon,
  GlobeEuropeAfricaIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import FeatureCard from "./ui/home/feature-card";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full gap-16 py-12 md:py-24 animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 max-w-4xl px-6">
        <h1 className="flex flex-row items-center justify-center group font-black text-6xl md:text-8xl tracking-tighter text-stone-900 dark:text-stone-50 drop-shadow-sm">
          NHL Stats
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-300 via-blue-600 to-cyan-900 opacity-20 blur-xl" />
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-medium">
          A modern lightweight app for real-time hockey scores, comprehensive
          standings, player leaderboards, and playoff brackets.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/schedule"
            className="group px-8 py-4 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
          >
            View Schedule{" "}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/standings"
            className="px-8 py-4 rounded-full bg-transparent border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold hover:border-stone-900 dark:hover:border-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all hover:scale-105"
          >
            Check Standings
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-6 pb-10">
        <FeatureCard
          href="/standings"
          title="Standings"
          description="Division, conference, and league-wide team rankings."
          icon={
            <ChartBarIcon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
          }
          delay="0.1s"
        />
        <FeatureCard
          href="/schedule"
          title="Schedule"
          description="Live scores, upcoming matchups, and game results."
          icon={
            <CalendarDaysIcon className="w-8 h-8 text-green-600 dark:text-green-500" />
          }
          delay="0.2s"
        />
        <FeatureCard
          href="/leaderboard"
          title="Leaderboard"
          description="Top skaters and goalies stats for the current season."
          icon={
            <GlobeEuropeAfricaIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          }
          delay="0.3s"
        />
        <FeatureCard
          href="/playoffs"
          title="Playoffs"
          description="Interactive bracket view for the post-season."
          icon={
            <TrophyIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          }
          delay="0.4s"
        />
      </section>
    </div>
  );
}
