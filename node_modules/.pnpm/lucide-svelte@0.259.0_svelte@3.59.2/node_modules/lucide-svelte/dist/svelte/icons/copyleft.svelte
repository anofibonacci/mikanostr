<script>import Icon from '../Icon.svelte';
const iconNode = [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M9 9.35a4 4 0 1 1 0 5.3" }]];
</script>

<Icon name="copyleft" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
