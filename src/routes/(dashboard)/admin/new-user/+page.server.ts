import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from '../../$types'
import { inviteUserSchema } from '$lib/validations/auth'
import { fail, type Actions } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { whitelist } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { resend } from '$lib/resend'
import { InviteUserTemplate } from '$lib/mail/templates/invite-user'

export const load: PageServerLoad = () => {
  return {
    form: superValidate(inviteUserSchema),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, inviteUserSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const userAlredyInvitedQuery = await db
      .select()
      .from(whitelist)
      .where(eq(whitelist.email, form.data.email))

    const userAlreadyInvited = userAlredyInvitedQuery[0]

    if (userAlreadyInvited) {
      return fail(400, {
        form,
        error: 'User already invited',
      })
    }

    await db.insert(whitelist).values({
      email: form.data.email,
    })

    await resend.emails.send({
      from: `Tickets <${process.env.MAIL_FROM}>`,
      to: form.data.email,
      subject: 'You have been invited to Tickets',
      react: InviteUserTemplate({
        inviteLink: `${process.env.BASE_URL}/auth/sign-in`,
      }),
    })

    return {
      form,
    }
  },
}
