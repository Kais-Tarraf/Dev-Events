"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import { posthog } from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: "string"; slug: string }) => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		const { success } = await createBooking({ eventId, slug, email });
		if (!success) {
			setSubmitted(true);

			posthog.capture("event_booked", { eventId, slug, email });
		} else {
			console.error("Booking Creation Failed");
			posthog.captureException("Booking Creation Failed");
		}
	};
	return (
		<div id="book-event">
			{submitted ? (
				<p className="text-sm">Thank you for signing up!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							placeholder="Enter you email address"
						/>
					</div>
					<button type="submit" className="button-submit">
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default BookEvent;
