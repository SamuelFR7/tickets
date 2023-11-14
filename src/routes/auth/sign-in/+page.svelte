<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import * as Card from '$lib/components/ui/card'
  import GoogleIcon from '$lib/components/icons/google.svelte'
  import { authSchema, type AuthSchema } from '$lib/validations/auth'
  import type { SuperValidated } from 'sveltekit-superforms'
  import type { FormOptions } from 'formsnap'
  import { goto } from '$app/navigation'
  import Button from '$lib/components/ui/button/button.svelte'
  import Separator from '$lib/components/ui/separator/separator.svelte'

  export let form: SuperValidated<AuthSchema>

  const options: FormOptions<AuthSchema> = {
    validators: authSchema,
    onUpdated: ({ form }) => {
      if (form.valid) {
        goto('/')
      }
    },
  }
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Card.Root>
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl">Login</Card.Title>
      <Card.Description>Escolha seu método de login preferido</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <a href="/auth/sign-in/google">
        <Button class="w-full"
          ><GoogleIcon className="mr-2 h-4 w-4" />Entrar com Google</Button
        >
      </a>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <Form.Root
        class="space-y-2"
        {options}
        method="POST"
        {form}
        schema={authSchema}
        let:config
      >
        <Form.Field {config} name="username">
          <Form.Item>
            <Form.Label>Usuário</Form.Label>
            <Form.Input />
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="password">
          <Form.Item>
            <Form.Label>Senha</Form.Label>
            <Form.Input type="password" />
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Button class="w-full" type="submit">Entrar</Form.Button>
      </Form.Root>
    </Card.Content>
  </Card.Root>
</div>
