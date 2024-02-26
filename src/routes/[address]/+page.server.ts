import { TAPTOOLS_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ params }) => {
	const response1 = await fetch(`https://openapi.taptools.io/api/v1/wallet/portfolio/positions?address=${params.address}`, {
		headers: { 'x-api-key': TAPTOOLS_API_KEY }
	});

	const response2 = await fetch(`https://openapi.taptools.io/api/v1/wallet/trades/tokens?address=${params.address}`, {
		headers: { 'x-api-key': TAPTOOLS_API_KEY }
	});

	const walletData = await response1.json();
	const trades = await response2.json();

	return { walletData, trades };
};
