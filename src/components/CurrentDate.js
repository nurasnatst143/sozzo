"use client";
import { useState, useEffect } from "react";

const CurrentDate = () => {
	const [state, setState] = useState("");

	useEffect(() => {
		getCurrentDate(setState);
		// eslint-disable-next-line
	}, []);

	return (
		<div className='absolute w-full '>
			{state && (
				<div className='flex justify-center'>
					<h1 className='px-8 py-2 bg-black dark:bg-red-700 text-white dark:text-white rounded-b-lg'>
						{state}
					</h1>
				</div>
			)}
		</div>
	);
};

export default CurrentDate;

function getCurrentDate(cb) {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const monthsOfYear = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const currentDate = new Date();
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	const dayOfMonth = currentDate.getDate();
	const month = monthsOfYear[currentDate.getMonth()];
	const year = currentDate.getFullYear();

	const formatedDate = `${dayOfWeek} | ${dayOfMonth} ${month} ${year}`;
	cb(formatedDate);
}
