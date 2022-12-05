import { t } from '../trpc';
import { z } from 'zod';

export const userRouter = t.router({
	all: t.procedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany();
	}),
	byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.prisma.user.findFirst({ where: { name: input } });
	}),
	create: t.procedure
		.input(
			z.object({
				name: z.string(),
				password: z.string().min(6),
				age: z.number().min(0).max(125),
				email: z.string().email(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.upsert({
				where: { email: input.email },
				update: input,
				create: input,
			});
		}),
	update: t.procedure
		.input(
			z.object({
				id: z.string(),
				distance: z.number().min(-1).max(1),
				elevation: z.number().min(-1).max(1),
				lit: z.number().min(-1).max(1),
				paved: z.number().min(-1).max(1),
				POI: z.number().min(-1).max(1),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.update({
				where: { id: input.id },
				data: {
					distance: input.distance,
					elevation: input.elevation,
					lit: input.lit,
					paved: input.paved,
					POI: input.POI,
				},
			});
		}),
});
