// import { PrismaClient } from '@prisma/client';

// // Create a singleton instance of PrismaClient
// const prismaClientSingleton = () => {
// 	const connectionString = process.env.DIRECT_URL;

// 	return new PrismaClient({
// 		datasources: {
// 			db: {
// 				url: connectionString,
// 			},
// 		},
// 		log:
// 			process.env.NODE_ENV === 'development'
// 				? ['query', 'error', 'warn']
// 				: ['error'],
// 	});
// };

// // Define the global variable type
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// // Define globalThis interface extension
// declare global {
// 	var prisma: PrismaClientSingleton | undefined;
// }

// // Export the Prisma client instance
// export const prisma = globalThis.prisma ?? prismaClientSingleton();

// // In development, we want to keep the instance alive between reloads
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
	return new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
	});
};

// Define the global variable type
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Define globalThis interface extension
declare global {
	var prisma: PrismaClientSingleton | undefined;
}

// Export the Prisma client instance
export const prisma = globalThis.prisma ?? prismaClientSingleton();

// In development, keep the instance alive between reloads
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
