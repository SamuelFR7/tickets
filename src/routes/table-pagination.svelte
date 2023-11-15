<script lang="ts">
  import { goto } from '$app/navigation'
  import Button from '$lib/components/ui/button/button.svelte'

  export let totalCount: number
  export let currentPage: number

  function previousPage() {
    const q = new URLSearchParams()
    q.set('page', String(currentPage - 1))
    goto(`/?${q}`)
  }

  function nextPage() {
    const q = new URLSearchParams()
    q.set('page', String(currentPage + 1))
    goto(`/?${q}`)
  }
</script>

<div class="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    on:click={previousPage}
    disabled={currentPage === 1}>Previous</Button
  >
  <Button
    variant="outline"
    size="sm"
    disabled={currentPage === Math.ceil(totalCount / 10)}
    on:click={nextPage}>Next</Button
  >
</div>
