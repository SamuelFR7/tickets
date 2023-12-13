<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'
  import { buttonVariants } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card'
  import { formatDate, truncate } from '$lib/utils.js'

  export let data
</script>

<main class="max-w-6xl mx-auto w-full py-20 space-y-6">
  {#if data.tickets.length > 0}
    <div class="flex w-full items-center justify-between">
      <div>
        <h1 class="text-xl font-bold">My tickets</h1>
        <p class="text-sm text-muted-foreground">
          See all your tickets in one place.
        </p>
      </div>
      <a href="/ticket/new" class={buttonVariants()}>Open ticket</a>
    </div>
    <div class="grid grid-cols-3 gap-4">
      {#each data.tickets as ticket}
        <Card.Root>
          <Card.Header>
            <Card.Title>{truncate(ticket.title, 25)}</Card.Title>
            <Card.Description
              >{ticket.description
                ? truncate(ticket.description, 30)
                : 'Without description'}</Card.Description
            >
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="space-y-2">
              <div>
                <span class="font-medium">Status:</span>
                {ticket.status.toUpperCase()}
              </div>
              <div>
                <span class="font-medium">Opened on:</span>
                {formatDate(ticket.createdAt)}
              </div>
              {#if ticket.updatedAt}
                <div>
                  <span class="font-medium">Last update:</span>
                  {formatDate(ticket.updatedAt)}
                </div>
              {/if}
            </div>
            <div class="justify-end flex space-x-4">
              <a href={`/ticket/${ticket.id}`} class={buttonVariants()}>View</a>
              <form action="?/cancel" method="POST">
                <input type="hidden" name="id" value={ticket.id} />
                <Button type="submit" variant="destructive">Cancel</Button>
              </form>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  {:else}
    <div class="text-center">
      <h1 class="text-2xl font-bold">No ticket found</h1>
      <p class="text-lg">You don't have any open ticket yet</p>
      <div class="mt-4">
        <a href="/ticket/new" class={buttonVariants()}>Open ticket</a>
      </div>
    </div>
  {/if}
</main>
