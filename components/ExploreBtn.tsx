"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
	const handleExplore = () => {
		if (
			process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
			process.env.NEXT_PUBLIC_POSTHOG_HOST
		) {
			posthog.capture("events_explored", {
				source: "homepage_hero",
			});
		}
	};

	return (
		<button type="button" id="explore-btn" className="mt-7" onClick={handleExplore}>
			<a href="#events">Explore Events</a>
			<Image
				src={"/icons/arrow-down.svg"}
				alt="arrow-down"
				width={24}
				height={24}
			/>
		</button>
	);
};

export default ExploreBtn;
