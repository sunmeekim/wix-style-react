# MultiSelect Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| delimiters | array | [','] (also Enter and Tab) | - | Delimiters that will trigger a Submit action (call to `onTagsAdded`).|
| disabled | bool | false | - | When set to true this component is disabled |
| maxNumRows | number | - | - | Max number of visible lines |
| mode | string | - | - | passing `'select'`  will render a readOnly input with menuArrow suffix
| onRemoveTag | func | - | + | A callback function to be called when a tag should be removed. The expected callback signature is `onRemoveTag(tagId: number | string) => void`. |
| onReorder | func | - | - | When this callback function is set, tags can be reordered. The expected callback signature is `onReorder({addedIndex: number, removedIndex: number}) => void`|
| onSelect | func | - | - | A callback which is called when the user selects an option from the list. The expected callback signature is`onSelect(option: Option)=> void` - Option is the original option from the provided `options` prop. |
| onTagsAdded | func | - | - | A callback which is called when the user performs a Submit-Action. Submit-Action triggers are: "Enter", "Tab", [typing any defined delimiters], Paste action. The expected callback signature is `onTagsAdded(values: Array<string>) => void` - The array of strings is the result of splitting the input value by the given delimiters |
| predicate | func | () => true | - | Callback predicate for the filtering options function |
| tags | array of objects | - | + | The tags. tags are just set of selected suggestions|
| autoSizeInput | bool | false | - | When set to true input size is auto calculated by it's value length|
| ***All of the InputWithOptions Props are also available for this component* (Excluding: selectedId, closeOnSelect, selectedHighlight)** | | | | |

## Option Object

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Whether this option is disabled or not |

>See DropdownLayout Component docs for more details.
