<script>import Icon from '../Icon.svelte';
const iconNode = [["polyline", { "points": "20 6 9 17 4 12" }]];
</script>

<Icon name="check" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
