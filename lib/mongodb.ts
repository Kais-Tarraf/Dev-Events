import mongoose, { Mongoose } from "mongoose";

/**
 * The MongoDB connection URI string.
 * Ensure this is set in your .env.local file.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local",
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
interface MongooseCache {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

declare global {
	// eslint-disable-next-line no-var
	var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB using Mongoose and returns the connection.
 * Caches the connection in development to prevent multiple connections.
 */
async function dbConnect(): Promise<Mongoose> {
	if (cached!.conn) {
		return cached!.conn;
	}

	if (!cached!.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached!.promise = mongoose
			.connect(MONGODB_URI!, opts)
			.then((mongooseInstance) => {
				return mongooseInstance;
			});
	}

	try {
		cached!.conn = await cached!.promise;
	} catch (e) {
		cached!.promise = null;
		throw e;
	}

	return cached!.conn;
}

export default dbConnect;
