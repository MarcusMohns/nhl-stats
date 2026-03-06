"use client";

import { useMemo } from "react";

type FormattedDateProps = {
  date: string;
};

const FormattedDate = ({ date }: FormattedDateProps) => {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(undefined, options).format(dateObj);
  }, [date]);

  return <>{formattedDate}</>;
};

export default FormattedDate;
