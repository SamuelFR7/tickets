<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import { authSchema, type AuthSchema } from '$lib/validations/auth'
  import type { SuperValidated } from 'sveltekit-superforms'
  import type { FormOptions } from 'formsnap'
  import { goto } from '$app/navigation'
  import * as Form from '$lib/components/ui/form'
  import { buttonVariants } from '$lib/components/ui/button'

  export let form: SuperValidated<AuthSchema>

  const options: FormOptions<AuthSchema> = {
    validators: authSchema,
    onResult: async ({ result }) => {
      if (result.type === 'success') {
        await goto('/')
      }
    },
  }
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Card.Root>
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl">Sign In</Card.Title>
      <Card.Description>Choose your favorite sign-in method</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <Form.Root {form} method="POST" {options} schema={authSchema} let:config>
        <Form.Field {config} name="username">
          <Form.Item>
            <Form.Label>Username</Form.Label>
            <Form.Input />
            <Form.Validation />
          </Form.Item></Form.Field
        >
        <Form.Field {config} name="password">
          <Form.Item>
            <Form.Label>Password</Form.Label>
            <Form.Input type="password" />
            <Form.Validation />
          </Form.Item></Form.Field
        >
        <div class="flex items-center justify-end space-x-4">
          <a href="/" class={buttonVariants({ variant: 'secondary' })}>Cancel</a
          >
          <Form.Button type="submit">Sign In</Form.Button>
        </div>
      </Form.Root>
    </Card.Content>
  </Card.Root>
</div>
