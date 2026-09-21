"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface EventCardProps {
	title: string;
	image: string;
	slug: string;
	location: string;
	date: string;
	time: string;
}
const EventCard = ({
	title,
	image,
	slug,
	location,
	date,
	time,
}: EventCardProps) => {
	const handleEventSelection = () => {
		if (
			process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
			process.env.NEXT_PUBLIC_POSTHOG_HOST
		) {
			posthog.capture("event_selected", {
				event_slug: slug,
				event_date: date,
				event_time: time,
			});
		}
	};

	return (
		<Link href={`/events/${slug}`} id="event-card" onClick={handleEventSelection}>
			<Image
				src={image}
				alt={title}
				width={410}
				height={300}
				className="poster"
			/>
			<div className="flex flex-row gap-2">
				<Image src="/icons/pin.svg" alt="location" width={14} height={14} />
				<p>{location}</p>
			</div>
			<p className="title">{title}</p>
			<div className="datetime">
				<div>
					<Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
					<p>{date}</p>
				</div>
				<div>
					<Image src="/icons/clock.svg" alt="time" width={14} height={14} />
					<p>{time}</p>
				</div>
			</div>
		</Link>
	);
};

export default EventCard;
