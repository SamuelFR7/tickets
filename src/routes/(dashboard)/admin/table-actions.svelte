<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import { Button } from '$lib/components/ui/button'
  import { MoreHorizontal, X } from 'lucide-svelte'
  import { invalidateAll } from '$app/navigation'
  export let id: string

  async function handleSubmit(event: {
    currentTarget: EventTarget & HTMLFormElement
  }) {
    const data = new FormData(event.currentTarget)

    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data,
    })

    if (response.status === 200) {
      await invalidateAll()
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative w-8 h-8 p-0"
    >
      <span class="sr-only">Open menu</span>
      <MoreHorizontal class="w-4 h-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <form
      action="?/close"
      on:submit|preventDefault={handleSubmit}
      method="POST"
    >
      <input type="hidden" name="id" value={id} />
      <DropdownMenu.Item>
        <button type="submit" class="flex items-center">
          <X class="text-red-700 h-4 w-4 mr-2" /> Close ticket
        </button>
      </DropdownMenu.Item>
    </form>
  </DropdownMenu.Content>
</DropdownMenu.Root>
