<script>import Icon from '../Icon.svelte';
const iconNode = [["path", { "d": "M14 11c5.333 0 5.333-8 0-8" }], ["path", { "d": "M6 11h8" }], ["path", { "d": "M6 15h8" }], ["path", { "d": "M9 21V3" }], ["path", { "d": "M9 3h5" }]];
</script>

<Icon name="russian-ruble" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
