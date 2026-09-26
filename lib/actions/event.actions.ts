"use server";

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEvents = async (slug: string) => {
	try {
		await connectDB();
		const event = await Event.findOne({ slug });
		const similarEvents = await Event.find({
			_id: { $ne: event._id },
			tags: { $in: event.tags },
		}).lean();
		return similarEvents;
	} catch (e) {
		console.error(e);
		return [];
	}
};
