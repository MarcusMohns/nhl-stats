import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type FeatureCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  delay?: string;
};

const FeatureCard = ({
  href,
  title,
  description,
  icon,
  delay,
}: FeatureCardProps) => {
  return (
    <Link
      href={href}
      style={{ animationDelay: delay }}
      className={`group relative flex flex-col p-6 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-drop-down`}
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
};

export default FeatureCard;
