"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const Navbar = () => {
	const handleCreateEvent = () => {
		if (
			process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
			process.env.NEXT_PUBLIC_POSTHOG_HOST
		) {
			posthog.capture("event_creation_started", {
				source: "primary_navigation",
			});
		}
	};

	return (
		<header>
			<nav>
				<Link href={"/"} className="logo">
					<Image src="/icons/logo.png" alt="logo" width={24} height={24} />
					<p>DevEvent</p>
				</Link>
                <ul>
                    <Link href='/'>Home</Link>
                    <Link href='/events'>Events</Link>
                    <Link href='/create' onClick={handleCreateEvent}>Create Event</Link>
                </ul>
			</nav>
		</header>
	);
};

export default Navbar;
