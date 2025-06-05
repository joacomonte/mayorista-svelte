<script lang="ts">
	import { goto } from '$app/navigation';
	
	import { MessageCircle, Music, Mail, Instagram } from '@lucide/svelte';

	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	function goBack() {
		// Go back to previous page in history, or to root if no history
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/');
		}
	}

	// Handle keyboard events for accessibility
	function handleLogoKeydown(event: any) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			scrollToTop();
		}
	}
</script>
<main>
	<div class="navBar">
		<div class="navBar__tortuLogoContainer">
			<button
				class="logo-button"
				onclick={scrollToTop}
				onkeydown={handleLogoKeydown}
				aria-label="Scroll to top"
			>
				<img src="/logoTortu.png" alt="Tortu Logo" />
			</button>
		</div>
		<button class="navBar__Button" onclick={goBack}> Volver </button>
	</div>

	<div class="contact-container">
		<h1>Contacto</h1>

		<a
			href="https://www.instagram.com/marlimsorbetes/"
			target="_blank"
			rel="noopener noreferrer"
			class="contact-link"
		>
			<Instagram size={16} />
			<span>Instagram</span>
		</a>

		<a
			href="https://api.whatsapp.com/send?phone=5491173663259"
			target="_blank"
			rel="noopener noreferrer"
			class="contact-link"
		>
			<MessageCircle size={16} />
			<span>WhatsApp</span>
		</a>

		<a
			href="https://www.tiktok.com/@marlimsorbetes"
			target="_blank"
			rel="noopener noreferrer"
			class="contact-link"
		>
			<Music size={16} />
			<span>TikTok</span>
		</a>

		<a href="mailto:contactomarlim@gmail.com" class="contact-link">
			<Mail size={16} />
			<span>Email</span>
		</a>
	</div>
</main>

<style>
	.contact-container {
		padding-top: 100px;
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}

	h1 {
		font-size: 40px;
		padding-bottom: 40px;
	}

	.contact-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		cursor: pointer;
		gap: 8px;
	}
</style>
