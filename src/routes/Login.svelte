<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import { NDKNip07Signer } from '@nostr-dev-kit/ndk'
	import { currentUser } from '$lib/stores/currentUser'
	import { userProfile } from '$lib/stores/userProfile'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import type { NDKUserProfile } from '@nostr-dev-kit/ndk'
	import { goto } from '$app/navigation'
	import { dateTomorrow } from '$lib/utils/helpers'

	async function login() {
		try {
			const signer = new NDKNip07Signer()
			$ndk.signer = signer
			console.log('signer.user(): ', signer.user())
			signer.user().then((user) => {
				user.ndk = $ndk
				$currentUser = user as NDKUser
				window.sessionStorage.setItem('feedstrCurrentUser', JSON.stringify(user))
				//document.cookie = `userNpub=${user.npub};
				//expires=${dateTomorrow()}; SameSite=Lax; Secure`
				user.fetchProfile().then((eventSet) => {
					console.log('user: ', user)
					userProfile.set(user.profile as NDKUserProfile)
				})
			})
		} catch (error: any) {
			console.error(error.message)
		}
	}

	function logout(e: Event) {
		e.preventDefault()
		currentUser.set(null)
		userProfile.set(null)
		window.sessionStorage.removeItem('feedstrCurrentUser')
		document.cookie = 'userNpub='
		goto('/')
	}
</script>

<div style="text-align:right;">
	{#if $userProfile}
		<img src={$userProfile.image} alt="avatar" width="54 px" height="54 px" /><br />
		<a href="#" on:click={logout}>logout</a>
	{:else}
		<button on:click={login}>Log In</button>
	{/if}
</div>
