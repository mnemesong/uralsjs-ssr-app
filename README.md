# uralsjs-ssr-app
Server side rendering application

## API
```typescript
/**
 * Function renders static html by ModelSets Record 
 */
export const ssrApp = <Keys extends string | number>(
    modelSets: Record<Keys, ModelSet<unknown, unknown>>, 
    html: string
) => string
```

## Example
See example in ts/test folder

## Author
Anatoly Starodubtsev <tostar74@mail.ru>

## License MIT
