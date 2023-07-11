<script>import Icon from '../Icon.svelte';
const iconNode = [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M15 9.354a4 4 0 1 0 0 5.292" }]];
</script>

<Icon name="copyright" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
