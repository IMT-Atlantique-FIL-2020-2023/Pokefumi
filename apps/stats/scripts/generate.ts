import { generate, nameProviders, pathProviders, validator, writer, reader, prettierStringify, presets } from '@oats-ts/openapi';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Generates the server side code for the bookstore example
 * @param schemaPath The path of the input OpenAPI schema
 * @param sourcePath The path where you wanna put the generated output
 */
async function generateBookStoreSchema(schemaPath: string, sourcePath: string) {
  await fs.rm(path.resolve(sourcePath), { recursive: true, force: true });
  return generate({
    configuration: {
      log: true,
      name: nameProviders.default(),
      path: pathProviders.default(sourcePath),
    },
    validator: validator(),
    reader: reader({ path: schemaPath }),
    generators: presets.server(),
    writer: writer({
      stringify: prettierStringify({
        parser: 'typescript',
        printWidth: 150,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        arrowParens: 'avoid',
      }),
    }),
  });
}

generateBookStoreSchema(path.join(__dirname, '..', 'stats.schema.yaml'), path.join(__dirname, '..', 'src/app/generated-oats'));
