<script lang="ts">
  import Header from '$lib/components/header.svelte'

  export let data
</script>

<div class="relative flex min-h-screen flex-col">
  <Header session={data.session} />
  <main class="flex-1">
    <slot />
  </main>
</div>
