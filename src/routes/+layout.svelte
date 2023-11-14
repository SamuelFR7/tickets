<script>
  import Header from '$lib/components/header.svelte'
  import '../app.postcss'
  import { ModeWatcher } from 'mode-watcher'

  export let data
</script>

<ModeWatcher />
<Header session={data.session} />
<main class="w-full max-w-4xl mx-auto">
  <slot />
</main>
