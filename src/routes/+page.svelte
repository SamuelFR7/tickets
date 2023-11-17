<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'
  import { buttonVariants } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card'
  import { formatDate } from '$lib/utils.js'

  export let data
</script>

<main class="max-w-4xl mx-auto w-full py-20">
  {#each data.tickets as ticket}
    <Card.Root>
      <Card.Header>
        <Card.Title>{ticket.title}</Card.Title>
        <Card.Description
          >{ticket.description ?? 'Sem descrição'}</Card.Description
        >
      </Card.Header>
      <Card.Content>
        <div>
          <span class="font-medium">Status:</span>
          {ticket.status}
        </div>
        <div>
          <span class="font-medium">Aberto em:</span>
          {formatDate(ticket.createdAt)}
        </div>
        <div>
          <span class="font-medium">Ultima atualização:</span>
          {formatDate(ticket.updatedAt)}
        </div>
        <div class="justify-end flex space-x-4">
          <a href={`/ticket/${ticket.id}`} class={buttonVariants()}
            >Visualizar</a
          >
          <Button variant="destructive">Cancelar</Button>
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</main>
