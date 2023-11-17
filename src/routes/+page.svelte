<script lang="ts">
  export let data
</script>

<main>
  {#each data.tickets as ticket}
    <h1>{ticket.title}</h1>
  {/each}
</main>
