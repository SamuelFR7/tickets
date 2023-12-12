<script lang="ts">
  import * as Table from '$lib/components/ui/table'
  import TableActions from './table-actions.svelte'
  import { page } from '$app/stores'
  import Input from '$lib/components/ui/input/input.svelte'
  import { goto } from '$app/navigation'
  import { formatDate, translateStatus } from '$lib/utils'
  import { ArrowUpDown } from 'lucide-svelte'
  import { buttonVariants } from '$lib/components/ui/button'
  import Button from '$lib/components/ui/button/button.svelte'

  export let data
  let search: string
  let timeout: ReturnType<typeof setTimeout>

  function searchByName() {
    const q = new URLSearchParams($page.url.searchParams.toString())
    q.set('search', search)
    goto(`/admin?${q}`, {
      keepFocus: true,
    })
  }

  function handleSearch() {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(searchByName, 300)
  }
</script>

<div class="grid items-center gap-4 pb-8 pt-6 md:py-8 container">
  <Input
    placeholder="Pesquisar pelo título"
    class="max-w-[15rem] w-full"
    type="text"
    bind:value={search}
    on:input={handleSearch}
  />

  <div>
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <a
                href={`/admin?page=1&search=${search ?? ''}&order_by=title.${
                  data.order === 'title.asc' ? 'desc' : 'asc'
                }`}
                data-sveltekit-preload-data="hover"
                class={buttonVariants({ variant: 'ghost' })}
                ><span>Título</span>
                <ArrowUpDown class={'ml-2 h-4 w-4'} />
              </a>
            </Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>
              <a
                href={`/admin?page=1&search=${
                  search ?? ''
                }&search=&order_by=createdAt.${
                  data.order === 'createdAt.asc' ? 'desc' : 'asc'
                }`}
                data-sveltekit-preload-data="hover"
                class={buttonVariants({ variant: 'ghost' })}
              >
                <span>Data de Abertura</span>
                <ArrowUpDown class={'ml-2 h-4 w-4'} />
              </a>
            </Table.Head>
            <Table.Head>Última de Atualização</Table.Head>

            <Table.Head>Ações</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.tickets as ticket}
            <Table.Row>
              <Table.Cell>{ticket.title}</Table.Cell>
              <Table.Cell>{translateStatus(ticket.status)}</Table.Cell>
              <Table.Cell>{formatDate(ticket.createdAt)}</Table.Cell>
              <Table.Cell>{formatDate(ticket.updatedAt)}</Table.Cell>
              <Table.Cell><TableActions id={ticket.id} /></Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
    <div class="flex items-center space-x-2 justify-end mt-2">
      {#if data.page > 1}
        <a
          data-sveltekit-preload-data="hover"
          href={`/admin?page=${data.page - 1}&search=${search ?? ''}&order_by=${
            data.order
          }`}
          class={buttonVariants({ variant: 'outline' })}
        >
          Anterior
        </a>
      {:else}
        <Button disabled variant="outline">Anterior</Button>
      {/if}
      {#if data.page > Math.ceil(data.totalCount / 10)}
        <a
          data-sveltekit-preload-data="hover"
          href={`/admin?page=${data.page + 1}&search=${search ?? ''}&order_by=${
            data.order
          }`}
          class={buttonVariants({ variant: 'outline' })}
        >
          Próxima
        </a>
      {:else}
        <Button disabled variant="outline">Próxima</Button>
      {/if}
    </div>
  </div>
</div>
