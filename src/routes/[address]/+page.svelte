<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	type Trade = {
		action: string;
		exchange: string;
		time: number;
		tokenA: string;
		tokenAAmount: number;
		tokenAName: string;
		tokenB: string;
		tokenBAmount: number;
		tokenBName: string;
	};

	type PositionFt = {
		'24h': number;
		'30d': number;
		'7d': number;
		adaValue: number;
		balance: number;
		fingerprint: string;
		liquidBalance: number;
		liquidValue: number;
		price?: number;
		ticker: string;
		unit: string;
	};

	type PositionNft = {
		'24h': number;
		'30d': number;
		'7d': number;
		adaValue: number;
		balance: number;
		floorPrice: number;
		liquidValue: number;
		listings: number;
		name: string;
		policy: string;
	};

	type Portfolio = {
		adaBalance: number;
		adaValue: number;
		liquidValue: number;
		numFTs: number;
		numNFTs: number;
		positionsFt: PositionFt[];
		positionsLp: any[];
		positionsNft: PositionNft[];
	};

	export let data: { walletData: Portfolio; trades: Trade[] };

	const sourceData = data.walletData.positionsFt;
	const tradesData = data.trades;

	const formatNumber = (value: number): string => '₳  ' + value.toFixed(2);

	const formattedData = sourceData.map((position) => ({
		ticker: position.ticker,
		balance: formatNumber(position.balance),
		price: position.price ? formatNumber(position.price) : '1', // Fallback for undefined price
		adaValue: formatNumber(position.adaValue)
	}));

	const formattedTrades = tradesData.map((trade) => ({
		action: trade.action,
		exchange: trade.exchange,
		time: new Date(trade.time).toLocaleString(),
		tokenA: trade.tokenAName,
		tokenAAmount: trade.tokenAAmount.toFixed(2),
		tokenB: trade.tokenBName,
		tokenBAmount: trade.tokenBAmount.toFixed(2),
	}));

	const tableSimple: TableSource = {
		head: ['Ticker', 'Balance', 'Preis', 'ADA-Wert'],
		body: tableMapperValues(formattedData, ['ticker', 'balance', 'price', 'adaValue']),
	};

	const tableTrades: TableSource = {
		head: ['Aktion', 'Börse', 'Zeit', 'Token A', 'Menge A', 'Token B', 'Menge B'],
		body: tableMapperValues(formattedTrades, ['action', 'exchange', 'time', 'tokenA', 'tokenAAmount', 'tokenB', 'tokenBAmount']),
	};
</script>

<div class="max-w-7xl mx-auto flex flex-col gap-8 mt-6 px-6 pb-6">
	<div class="flex gap-6">
		<div class="flex flex-col p-2 border rounded-2xl">
			<p>ADA Balance: ₳</p>
			<p>{data.walletData.adaBalance.toFixed(2)}</p>
		</div>

		<div class="flex flex-col p-2 border rounded-2xl">
			<p>Wallet Value: ₳</p>
			<p>{data.walletData.adaValue.toFixed(2)}</p>
		</div>
	</div>

    <div>
        <h3 class="text-2xl mb-2">Portfolio:</h3>
        <Table source={tableSimple} />
    </div>

    <div class="">        
        <h3 class="text-2xl mb-2">Trades:</h3>
        <Table source={tableTrades} />
    </div>

</div>
