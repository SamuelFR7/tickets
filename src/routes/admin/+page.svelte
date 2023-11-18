<script lang="ts">
  import * as Table from '$lib/components/ui/table'
  import TableActions from './table-actions.svelte'
  import TablePagination from './table-pagination.svelte'
  import { page } from '$app/stores'
  import Input from '$lib/components/ui/input/input.svelte'
  import { goto } from '$app/navigation'
  import { formatDate, translateStatus } from '$lib/utils'

  export let data
  let search: string
  let timeout: ReturnType<typeof setTimeout>

  $: currentPage = $page.url.searchParams.get('page')

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
            <Table.Head>Titulo</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Data de Criacao</Table.Head>
            <Table.Head>Última de atualização</Table.Head>
            <Table.Head>Acoes</Table.Head>
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
    <TablePagination
      currentPage={typeof currentPage === 'string'
        ? parseInt(currentPage) > 0
          ? parseInt(currentPage)
          : 1
        : 1}
      totalCount={data.totalCount}
    />
  </div>
</div>
