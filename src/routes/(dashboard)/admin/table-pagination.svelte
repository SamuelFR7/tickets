<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/button/button.svelte'

  export let totalCount: number
  export let currentPage: number

  const hasNextPage = currentPage < Math.ceil(totalCount / 10)

  function previousPage() {
    const q = new URLSearchParams($page.url.searchParams.toString())
    q.set('page', String(currentPage - 1))
    goto(`/admin?${q}`, {
      keepFocus: true,
    })
  }

  function nextPage() {
    const q = new URLSearchParams($page.url.searchParams.toString())
    q.set('page', String(currentPage + 1))
    goto(`/admin?${q}`)
  }
</script>

<div class="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    on:click={previousPage}
    disabled={currentPage === 1}>Anterior</Button
  >
  <Button
    variant="outline"
    size="sm"
    disabled={!hasNextPage}
    on:click={nextPage}>Próxima</Button
  >
</div>
