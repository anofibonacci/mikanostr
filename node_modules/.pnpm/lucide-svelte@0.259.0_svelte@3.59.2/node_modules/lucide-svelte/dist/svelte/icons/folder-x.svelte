<script>import Icon from '../Icon.svelte';
const iconNode = [["path", { "d": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" }], ["path", { "d": "m9.5 10.5 5 5" }], ["path", { "d": "m14.5 10.5-5 5" }]];
</script>

<Icon name="folder-x" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
