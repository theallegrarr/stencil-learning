import { newSpecPage } from '@stencil/core/testing';
import { CrudTable } from '../crud-table';

describe('crud-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CrudTable],
      html: `<crud-table></crud-table>`,
    });
    expect(page.root).toEqualHtml(`
      <crud-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crud-table>
    `);
  });
});
