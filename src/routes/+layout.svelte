<script>
	import Header from '$lib/components/header.svelte';
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Header />
<main class="w-full max-w-4xl mx-auto">
	<slot />
</main>
