<script>import Icon from '../Icon.svelte';
const iconNode = [["polygon", { "points": "12 2 2 7 12 12 22 7 12 2" }], ["polyline", { "points": "2 17 12 22 22 17" }], ["polyline", { "points": "2 12 12 17 22 12" }]];
</script>

<Icon name="layers" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
