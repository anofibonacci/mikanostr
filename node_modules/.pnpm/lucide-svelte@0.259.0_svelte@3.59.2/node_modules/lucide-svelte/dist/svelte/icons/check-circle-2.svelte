<script>import Icon from '../Icon.svelte';
const iconNode = [["path", { "d": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" }], ["path", { "d": "m9 12 2 2 4-4" }]];
</script>

<Icon name="check-circle-2" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
