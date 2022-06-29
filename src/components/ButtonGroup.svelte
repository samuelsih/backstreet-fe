<script>
	import { indexClickedBtn } from '../routes/checker';

	const leftBtn =
		'h-10 px-5 text-gray-50 transition-colors duration-150 bg-gray-900 rounded-l-lg focus:shadow-outline hover:bg-gray-600';
	
    const rightBtn =
		'h-10 px-5 text-gray-50 transition-colors duration-150 bg-gray-900 rounded-r-lg focus:shadow-outline hover:bg-gray-600';

	/**
	 * @param {number} index
	 */
	function setIndexClickedBtn(index) {
		indexClickedBtn.set(index);
	}
</script>

<div class="inline-flex" role="group" aria-label="Button group">
	<button class={leftBtn} on:click={() => setIndexClickedBtn(0)}>Link</button>
	<button class={rightBtn} on:click={() => setIndexClickedBtn(1)}>File</button>
</div>
