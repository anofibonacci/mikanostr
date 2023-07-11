<script>import Icon from '../Icon.svelte';
const iconNode = [["path", { "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }]];
</script>

<Icon name="triangle" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
