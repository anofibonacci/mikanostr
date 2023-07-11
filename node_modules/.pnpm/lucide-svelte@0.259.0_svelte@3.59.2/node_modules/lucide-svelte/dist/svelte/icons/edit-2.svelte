<script>import Icon from '../Icon.svelte';
const iconNode = [["path", { "d": "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }]];
</script>

<Icon name="edit-2" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
