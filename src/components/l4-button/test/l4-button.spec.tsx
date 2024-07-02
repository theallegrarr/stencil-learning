import { newSpecPage } from '@stencil/core/testing';
import { L4Button } from '../l4-button';

describe('l4-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [L4Button],
      html: `<l4-button></l4-button>`,
    });
    expect(page.root).toEqualHtml(`
      <l4-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </l4-button>
    `);
  });
});
